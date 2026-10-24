"""Real backend tests: routing, identity, validation, isolation and refresh rotation."""
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy.pool import StaticPool
from app.db import Base, get_db
from app.main import app

@pytest.fixture()
def client():
    engine = create_engine("sqlite://", connect_args={"check_same_thread": False}, poolclass=StaticPool)
    Base.metadata.create_all(engine)
    def isolated_db():
        with Session(engine) as db:
            yield db
    app.dependency_overrides[get_db] = isolated_db
    try:
        with TestClient(app) as c:
            yield c
    finally:
        app.dependency_overrides.clear()
        engine.dispose()

def register_and_login(client: TestClient, username: str):
    registered = client.post('/auth/register', json={'username': username,'password':'secure-example-123'})
    assert registered.status_code == 201, registered.text
    response = client.post('/auth/token', data={'username':username, 'password':'secure-example-123'})
    assert response.status_code == 200, response.text
    return response.json()

def auth(token):
    return {'Authorization': f"Bearer {token}"}

def test_routes_and_openapi(client):
    assert client.get('/health').json() == {'status':'ok'}
    assert client.get('/ready').status_code == 200
    assert client.get('/openapi.json').status_code == 200
    assert client.get('/missing').status_code == 404
    assert client.patch('/health').status_code == 405

def test_unauthenticated_and_validation(client):
    assert client.get('/api/items').status_code == 401
    t = register_and_login(client, 'alice')
    assert client.post('/api/items', json={'name':'A','price':-1},headers=auth(t['access_token'])).status_code == 422
    assert client.get('/api/items/wrong',headers=auth(t['access_token'])).status_code == 422
    assert client.get('/api/admin/users',headers=auth(t['access_token'])).status_code == 403

def test_crud_and_owner_isolation(client):
    alice=register_and_login(client,'alice')
    bob=register_and_login(client,'bob')
    a=auth(alice['access_token']);b=auth(bob['access_token'])
    item=client.post('/api/items',json={'name':'Notebook','price':14.5},headers=a)
    assert item.status_code == 201
    item_id=item.json()['id']
    assert client.get('/api/items',headers=a).json()[0]['name']=='Notebook'
    assert client.get('/api/items',headers=b).json()==[]
    assert client.get(f'/api/items/{item_id}',headers=b).status_code==404
    assert client.patch(f'/api/items/{item_id}',json={'price':17},headers=b).status_code==404
    assert client.delete(f'/api/items/{item_id}',headers=b).status_code==404
    assert client.patch(f'/api/items/{item_id}',json={'price':19.9},headers=a).json()['price']==19.9
    assert client.patch(f'/api/items/{item_id}',json={'price':None},headers=a).status_code==422
    assert client.delete(f'/api/items/{item_id}',headers=a).status_code==204
    assert client.get(f'/api/items/{item_id}',headers=a).status_code==404

def test_refresh_rotation_reuse_and_logout(client):
    t=register_and_login(client,'carol')
    refreshed=client.post('/auth/refresh',json={'refresh_token':t['refresh_token']})
    assert refreshed.status_code==200
    next_t=refreshed.json()
    assert next_t['refresh_token']!=t['refresh_token']
    assert client.post('/auth/refresh',json={'refresh_token':t['refresh_token']}).status_code==401
    assert client.get('/auth/me',headers=auth(next_t['access_token'])).json()['username']=='carol'
    assert client.post('/auth/logout',json={'refresh_token':next_t['refresh_token']}).status_code==204
    assert client.post('/auth/refresh',json={'refresh_token':next_t['refresh_token']}).status_code==401

def test_duplicate_registration_and_bad_login(client):
    register_and_login(client,'alice')
    assert client.post('/auth/register',json={'username':'alice','password':'secure-example-123'}).status_code==409
    assert client.post('/auth/token',data={'username':'alice','password':'wrong'}).status_code==401
    assert client.get('/auth/me',headers=auth('tampered-jwt')).status_code==401
