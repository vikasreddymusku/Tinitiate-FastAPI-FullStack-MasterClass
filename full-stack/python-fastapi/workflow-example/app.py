"""Runnable companion to Topic 00. Local learning example, NOT financial/payment software.

Run: uvicorn app:app --reload
Read: http://127.0.0.1:8000/docs
"""
from __future__ import annotations

import os
import sqlite3
from pathlib import Path
from typing import Annotated

from fastapi import BackgroundTasks, Depends, FastAPI, Header, HTTPException, status
from pydantic import BaseModel, Field


class Transfer(BaseModel):
    amount: int = Field(gt=0, description="Positive integer number of rupees")


class Cart(BaseModel):
    quantity: int = Field(gt=0)
    # This is deliberately NOT a real card number or payment integration.
    payment_approved: bool = True


class FoodOrder(BaseModel):
    meal: str = Field(min_length=1)


def current_user(authorization: Annotated[str | None, Header()] = None) -> str:
    """Demo-only credentials. Do not use this pattern as real JWT verification."""
    if authorization not in {'Bearer demo-customer', 'Bearer demo-viewer'}:
        raise HTTPException(status_code=401, detail='Sign in with a valid demo credential')
    if authorization == 'Bearer demo-viewer':
        raise HTTPException(status_code=403, detail='This demo role cannot change records')
    return 'customer'


def create_app(db_path: str | None = None) -> FastAPI:
    database = db_path or os.environ.get('TOPIC00_DB', str(Path(__file__).with_name('topic00-demo.db')))
    app = FastAPI(title='Topic 00 · FastAPI Workflow', description='Local examples; no real money or payments')
    app.state.notifications = []

    def connect() -> sqlite3.Connection:
        return sqlite3.connect(database, timeout=8)

    with connect() as connection:
        connection.executescript('''
        CREATE TABLE IF NOT EXISTS accounts(name TEXT PRIMARY KEY, balance INTEGER NOT NULL);
        INSERT OR IGNORE INTO accounts VALUES ('customer', 1500),('friend', 200);
        CREATE TABLE IF NOT EXISTS inventory(sku TEXT PRIMARY KEY, stock INTEGER NOT NULL);
        INSERT OR IGNORE INTO inventory VALUES ('sneakers', 5);
        CREATE TABLE IF NOT EXISTS orders(id INTEGER PRIMARY KEY AUTOINCREMENT, quantity INTEGER NOT NULL);
        CREATE TABLE IF NOT EXISTS deliveries(id INTEGER PRIMARY KEY AUTOINCREMENT, meal TEXT NOT NULL, status TEXT NOT NULL);
        ''')

    @app.get('/demo-state', tags=['Learning'])
    def demo_state():
        """Show the before/after values used by the demos."""
        with connect() as conn:
            accounts = dict(conn.execute('SELECT name, balance FROM accounts').fetchall())
            shoes = conn.execute("SELECT stock FROM inventory WHERE sku='sneakers'").fetchone()[0]
            order_count = conn.execute('SELECT COUNT(*) FROM orders').fetchone()[0]
            delivery_count = conn.execute('SELECT COUNT(*) FROM deliveries').fetchone()[0]
        return {'accounts': accounts, 'sneakers_in_stock': shoes, 'orders': order_count,
                'deliveries': delivery_count, 'notifications': list(app.state.notifications)}

    @app.post('/transfers', tags=['Banking'])
    def transfer(data: Transfer, _user: Annotated[str, Depends(current_user)], simulate_db_failure: bool = False):
        """Two updates inside ONE SQLite transaction; failure rolls both back."""
        if simulate_db_failure:
            raise HTTPException(status_code=503, detail='Database temporarily unavailable (simulated)')
        conn = connect()
        try:
            conn.execute('BEGIN IMMEDIATE')  # acquire a write lock before checking balance
            amount_available = conn.execute("SELECT balance FROM accounts WHERE name='customer'").fetchone()[0]
            if data.amount > amount_available:
                raise HTTPException(status_code=409, detail='Not enough money')
            conn.execute("UPDATE accounts SET balance = balance - ? WHERE name='customer'", (data.amount,))
            conn.execute("UPDATE accounts SET balance = balance + ? WHERE name='friend'", (data.amount,))
            conn.commit()
        except Exception:
            conn.rollback()
            raise
        finally:
            conn.close()
        return {'message': 'Transfer complete', 'transferred': data.amount, 'currency': 'INR'}

    @app.post('/orders', status_code=status.HTTP_201_CREATED, tags=['Shopping'])
    def create_order(cart: Cart, _user: Annotated[str, Depends(current_user)], payment_gateway_down: bool = False):
        if payment_gateway_down:
            raise HTTPException(status_code=502, detail='Payment provider unavailable (simulated)')
        with connect() as conn:
            conn.execute('BEGIN IMMEDIATE')
            stock = conn.execute("SELECT stock FROM inventory WHERE sku='sneakers'").fetchone()[0]
            if cart.quantity > stock:
                raise HTTPException(status_code=409, detail='Out of stock')
            if not cart.payment_approved:
                raise HTTPException(status_code=409, detail='Payment rejected (simulated)')
            conn.execute("UPDATE inventory SET stock = stock - ? WHERE sku='sneakers'", (cart.quantity,))
            order_id = conn.execute('INSERT INTO orders(quantity) VALUES (?)', (cart.quantity,)).lastrowid
            conn.commit()
        return {'order_id': order_id, 'status': 'created', 'pairs': cart.quantity}

    def send_confirmation(delivery_id: int) -> None:
        # Runs AFTER the response. A production system would use durable job storage for critical tasks.
        app.state.notifications.append(f'Confirmation sent for order {delivery_id}')

    @app.post('/deliveries', status_code=status.HTTP_202_ACCEPTED, tags=['Delivery'])
    def order_food(order: FoodOrder, tasks: BackgroundTasks,
                   _user: Annotated[str, Depends(current_user)], restaurant_closed: bool = False):
        if restaurant_closed:
            raise HTTPException(status_code=409, detail='Restaurant closed (simulated)')
        with connect() as conn:
            delivery_id = conn.execute('INSERT INTO deliveries(meal,status) VALUES (?,?)',
                                       (order.meal, 'accepted')).lastrowid
            conn.commit()
        tasks.add_task(send_confirmation, delivery_id)
        return {'order_id': delivery_id, 'status': 'accepted'}

    return app


app = create_app()
