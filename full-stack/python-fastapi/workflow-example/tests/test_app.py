import pytest
from fastapi.testclient import TestClient
from app import create_app

AUTH={'Authorization':'Bearer demo-customer'}
VIEWER={'Authorization':'Bearer demo-viewer'}

@pytest.fixture
def api(tmp_path):
    return TestClient(create_app(str(tmp_path/'test.db')))


def test_beginner_success_paths(api):
    state=api.get('/demo-state').json()
    assert state['accounts']=={'customer':1500,'friend':200}
    r=api.post('/transfers',headers=AUTH,json={'amount':500})
    assert r.status_code==200
    assert api.get('/demo-state').json()['accounts']=={'customer':1000,'friend':700}
    r=api.post('/orders',headers=AUTH,json={'quantity':1})
    assert r.status_code==201
    assert api.get('/demo-state').json()['sneakers_in_stock']==4
    r=api.post('/deliveries',headers=AUTH,json={'meal':'pizza'})
    assert r.status_code==202
    assert api.get('/demo-state').json()['deliveries']==1
    assert api.get('/demo-state').json()['notifications']==['Confirmation sent for order 1']


def test_no_half_transfer(api):
    assert api.post('/transfers',headers=AUTH,json={'amount':2500}).status_code==409
    assert api.get('/demo-state').json()['accounts']=={'customer':1500,'friend':200}
    assert api.post('/transfers',headers=AUTH,json={'amount':500},params={'simulate_db_failure':'true'}).status_code==503
    assert api.get('/demo-state').json()['accounts']=={'customer':1500,'friend':200}


def test_route_method_and_validation(api):
    assert api.post('/transfers-removed',headers=AUTH,json={'amount':500}).status_code==404
    assert api.get('/transfers',headers=AUTH).status_code==405
    assert api.post('/transfers',headers=AUTH,json={'amount':-10}).status_code==422
    assert api.post('/orders',headers=AUTH,json={'quantity':0}).status_code==422
    assert api.post('/deliveries',headers=AUTH,json={}).status_code==422


def test_permissions(api):
    assert api.post('/transfers',json={'amount':10}).status_code==401
    assert api.post('/transfers',headers=VIEWER,json={'amount':10}).status_code==403
    assert api.post('/transfers',headers={'Authorization':'Bearer expired'},json={'amount':10}).status_code==401


def test_shopping_and_delivery_failures_no_commit(api):
    assert api.post('/orders',headers=AUTH,json={'quantity':9}).status_code==409
    assert api.post('/orders',headers=AUTH,json={'quantity':1,'payment_approved':False}).status_code==409
    assert api.post('/orders',headers=AUTH,json={'quantity':1},params={'payment_gateway_down':'true'}).status_code==502
    assert api.get('/demo-state').json()['sneakers_in_stock']==5
    assert api.post('/deliveries',headers=AUTH,json={'meal':'pizza'},params={'restaurant_closed':'true'}).status_code==409
    assert api.get('/demo-state').json()['deliveries']==0
