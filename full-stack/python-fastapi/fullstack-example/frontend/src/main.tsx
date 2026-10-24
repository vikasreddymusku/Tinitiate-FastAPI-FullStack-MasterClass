import React, { useState, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';
type Item = { id: number; name: string; price: number; owner_id: number };
type Tokens = { access_token: string; refresh_token: string; token_type: string; expires_in: number };
type ApiError = { detail?: string | { msg: string }[] };

async function parseResponse<T>(response: Response): Promise<T> {
  if (response.status === 204) return undefined as T;
  const body: T | ApiError = await response.json().catch(() => ({}));
  if (!response.ok) {
    const detail = (body as ApiError).detail;
    throw new Error(typeof detail === 'string' ? detail : Array.isArray(detail) ? detail.map(e => e.msg).join('; ') : `HTTP ${response.status}`);
  }
  return body as T;
}
function App() {
  const [username, setUsername] = useState('learner');
  const [password, setPassword] = useState('learning-demo-password');
  const [tokens, setTokens] = useState<Tokens | null>(null); // Access and refresh tokens intentionally MEMORY ONLY.
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState('Notebook');
  const [price, setPrice] = useState(24.5);
  const [message, setMessage] = useState('Register once, then log in. Watch how access tokens protect CRUD routes.');
  const [busy, setBusy] = useState(false);
  const [trace, setTrace] = useState<string[]>([]);
  const access = tokens?.access_token;
  const record = (method: string, path: string, status: number) => setTrace(old => [`${new Date().toLocaleTimeString()} · ${method} ${path} → HTTP ${status}`, ...old].slice(0, 9));
  const request = useCallback(async <T,>(path: string, options: RequestInit = {}, token = access): Promise<T> => {
    const response = await fetch(`${API}${path}`, { ...options, headers: { ...(options.body && !(options.body instanceof FormData) ? {'Content-Type':'application/json'} : {}), ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers } });
    record(options.method || 'GET', path, response.status);
    return parseResponse<T>(response);
  }, [access]);
  const execute = async (fn: () => Promise<void>) => { setBusy(true); try { await fn(); } catch(e) { setMessage(`Error: ${(e as Error).message}`); } finally { setBusy(false); } };
  const refreshList = async (token?: string) => { setItems(await request<Item[]>('/api/items', {}, token ?? access)); };
  const register = () => execute(async () => { await request('/auth/register', { method:'POST', body:JSON.stringify({username,password}) }, ''); setMessage('Registered. Sign in to receive an access token.'); });
  const login = () => execute(async () => { const body = new URLSearchParams({username,password}); const next = await request<Tokens>('/auth/token', {method:'POST', body,headers:{'Content-Type':'application/x-www-form-urlencoded'}}, ''); setTokens(next); setItems(await request<Item[]>('/api/items',{},next.access_token)); setMessage('Signed in: authenticated requests now include a bearer access token.'); });
  const rotate = () => execute(async () => { if(!tokens) return; const next = await request<Tokens>('/auth/refresh', {method:'POST',body:JSON.stringify({refresh_token:tokens.refresh_token})},''); setTokens(next); setMessage('Refresh rotated. The previous refresh credential cannot be reused.'); });
  const logout = () => execute(async () => { if(tokens) await request('/auth/logout',{method:'POST',body:JSON.stringify({refresh_token:tokens.refresh_token})},'');setTokens(null);setItems([]);setMessage('Refresh credential revoked; local tokens cleared. Existing access JWTs remain valid until expiry unless you add access-token revocation.'); });
  const create = () => execute(async () => { await request<Item>('/api/items',{method:'POST',body:JSON.stringify({name,price})});await refreshList();setMessage('Created in database and refetched into React state.'); });
  const remove = (id:number) => execute(async () => { await request(`/api/items/${id}`,{method:'DELETE'});await refreshList();setMessage('Deleted, committed, then refreshed the item list.'); });
  return <main className="shell">
    <header><div className="eyebrow">TINITIATE AI ACADEMY · RUNNABLE FULL-STACK CAPSTONE</div><h1>React <span>→</span> FastAPI <span>→</span> SQLAlchemy</h1><p>Register, log in, create and delete records. Inspect real backend status codes; no fake responses.</p><a href={`${API}/docs`} target="_blank" rel="noreferrer">Open FastAPI Swagger UI ↗</a></header>
    <section className="layout"><div className="panel"><div className="kicker">01 / IDENTITY</div><h2>User session</h2><label>Username<input value={username} onChange={e=>setUsername(e.target.value)} /></label><label>Password<input value={password} type="password" onChange={e=>setPassword(e.target.value)} /></label><div className="buttons"><button disabled={busy} onClick={register}>Register</button><button disabled={busy} onClick={login}>Log in</button><button disabled={!tokens || busy} onClick={rotate}>Rotate refresh</button><button disabled={!tokens || busy} onClick={logout}>Log out</button></div><p className="note">Passwords are hashed on the server with Argon2. JWTs are validated by the API; credentials are kept in component memory only. Use secure HttpOnly cookies/CSRF protections and hardened session management for production.</p><div className="token">{tokens ? `Bearer token acquired · expires in ${tokens.expires_in}s` : 'No active access token'}</div></div>
    <div className="panel"><div className="kicker">02 / PERSISTENCE</div><h2>Manage your items</h2><label>Name<input value={name} onChange={e=>setName(e.target.value)} /></label><label>Price<input type="number" min="0.01" step="0.01" value={price} onChange={e=>setPrice(Number(e.target.value))} /></label><div className="buttons"><button disabled={!tokens || busy} onClick={create}>Create item</button><button disabled={!tokens || busy} onClick={()=>execute(async()=>{await refreshList();setMessage('List refetched.');})}>Refresh list</button></div><ul className="items">{items.map(it=><li key={it.id}><span>#{it.id} · {it.name} · ${it.price.toFixed(2)}</span><button disabled={busy} onClick={()=>remove(it.id)}>Delete</button></li>)}{items.length===0&&<li>No items loaded for this user.</li>}</ul></div></section>
    <section className="panel bottom"><div><div className="kicker">03 / NETWORK FORENSICS</div><h2>What happened?</h2><p role="status" aria-live="polite">{message}</p></div><div className="logs" aria-label="Recent requests">{trace.length?trace.map((entry,i)=><code key={i}>{entry}</code>):<code>No requests yet.</code>}</div></section>
  </main>;
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
