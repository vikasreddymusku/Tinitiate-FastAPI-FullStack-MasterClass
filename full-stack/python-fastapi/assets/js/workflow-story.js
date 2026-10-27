
(() => {
'use strict';
const E = window.FastAPIWorkflowEngine;
if(!E){console.error('Workflow engine missing');return;}
const $ = (id)=>document.getElementById(id);
const $$ = (sel,root=document)=>Array.from(root.querySelectorAll(sel));
const clone = (v)=>JSON.parse(JSON.stringify(v));
const mini = [
  ['You click a button','The customer does something simple in the app.'],
  ['A request starts moving','The app sends a request toward the backend.'],
  ['FastAPI receives and checks it','The route, data and identity are checked in order.'],
  ['Python applies the real rules','Money, stock or restaurant rules decide what happens next.'],
  ['The answer returns to the app','The user sees a success message or a helpful error.']
];
const scenes = {
  bank:{avatar:'👩🏽', person:'Anita', app:'Bank app', action:'Wants to send ₹500 to Rahul.'},
  shop:{avatar:'🧑🏽‍💻', person:'Arjun', app:'Shop app', action:'Wants to buy a pair of sneakers.'},
  delivery:{avatar:'👨🏽‍🦱', person:'Ravi', app:'Food app', action:'Wants to order biryani.'}
};
let scene='bank';
let config=clone(E.definitions[scene].defaults);
let result=E.outcome(scene,config);
let current=0;
let playing=false;
let timer=null;
let speed=1300;
let pathData='';

function initMini(){
  const dots=$('miniDots');
  mini.forEach((_,i)=>{const b=document.createElement('button');b.type='button';if(i===0)b.classList.add('active');b.addEventListener('click',()=>setMini(i));dots.appendChild(b);});
  $('heroNext').addEventListener('click',()=>setMini((Number($('miniIndex').textContent)%mini.length)));
  $('heroStart').addEventListener('click',()=>{window.scrollTo({top:$('labRoot').offsetTop-80,behavior:'smooth'});play();});
  setMini(0);
}
function setMini(i){
  $('miniIndex').textContent=String(i+1);$('miniTitle').textContent=mini[i][0];$('miniDesc').textContent=mini[i][1];
  $$('#miniDots button').forEach((b,idx)=>b.classList.toggle('active',idx===i));
}

function bind(){
  $$('.wf2-scenario-tab').forEach(btn=>btn.addEventListener('click',()=>loadScene(btn.dataset.scene)));
  $('prevStep').addEventListener('click',()=>{stop();go(Math.max(0,current-1));});
  $('nextStep').addEventListener('click',()=>{stop();stepForward();});
  $('resetFlow').addEventListener('click',()=>{stop();current=0;render();});
  $('playPause').addEventListener('click',()=> playing ? stop() : play());
  $('scenarioPreset').addEventListener('change',()=>applyPreset($('scenarioPreset').value));
  $$('[data-anchor]').forEach(el=>{
    const idx=Number(el.dataset.anchor);
    if(idx>0 && idx<8){el.addEventListener('click',()=>{stop();go(idx);});}
  });
  window.addEventListener('resize', ()=>{drawPath();positionRocket();});
}

function loadScene(name){
  stop();
  scene=name; config=clone(E.definitions[scene].defaults); result=E.outcome(scene,config); current=0;
  $$('.wf2-scenario-tab').forEach(btn=>{const active=btn.dataset.scene===scene;btn.classList.toggle('active',active);btn.setAttribute('aria-selected',String(active));});
  const meta=scenes[scene];
  $('heroAvatar').textContent=meta.avatar;$('heroAction').textContent=scene==='bank'?'Sending money to a friend':scene==='shop'?'Buying sneakers online':'Ordering food from a restaurant';$('heroSubtext').textContent=scene==='delivery'?'A simple order starts a bigger workflow':'Customer action starts the journey';
  $('heroBubbleA').textContent=scene==='bank'?'Amount ₹500':scene==='shop'?'1 pair of shoes':'1 chicken biryani';
  $('heroBubbleB').textContent=scene==='bank'?'Tap Send':scene==='shop'?'Tap Buy Now':'Tap Place Order';
  $('customerAvatar').textContent=meta.avatar;$('customerName').textContent=meta.person;$('appName').textContent=meta.app;
  $('sceneTitle').textContent=E.definitions[scene].title;
  $('sceneSummary').textContent=E.definitions[scene].summary;
  $('requestMethod').textContent=E.definitions[scene].method;
  buildConfig();
  buildPresets();
  render();
}

function buildPresets(){
  const sel=$('scenarioPreset'); sel.innerHTML='';
  E.definitions[scene].presets.forEach(([key,label])=>{const opt=document.createElement('option'); opt.value=key; opt.textContent=label; sel.appendChild(opt);});
  sel.value='success';
}
function applyPreset(key){
  const preset = E.definitions[scene].presets.find(p=>p[0]===key);
  config = clone(E.definitions[scene].defaults);
  if(preset && preset[2]) Object.assign(config,preset[2]);
  result = E.outcome(scene,config); current=0; buildConfig(); render();
}
function buildConfig(){
  const grid=$('configGrid'); grid.innerHTML='';
  E.definitions[scene].controls.forEach(field=>{
    const wrap=document.createElement('div'); wrap.className='wf2-config-item';
    const label=document.createElement('label'); label.htmlFor='cfg-'+field.id; label.textContent=field.label; wrap.appendChild(label);
    let input;
    if(field.type==='select'){
      input=document.createElement('select');
      field.options.forEach(([val,text])=>{const o=document.createElement('option'); o.value=val; o.textContent=text; input.appendChild(o);});
    } else {
      input=document.createElement('input'); input.type='number'; input.min=field.min; input.max=field.max; input.step=field.step||1;
    }
    input.id='cfg-'+field.id; input.value=config[field.id];
    input.addEventListener('change',()=>{
      config[field.id]=field.type==='select'?input.value:Number(input.value);
      result=E.outcome(scene,config); current=0; render();
      // reset preset if manual change diverges
      $('scenarioPreset').value='';
    });
    wrap.appendChild(input);
    if(field.hint){ const small=document.createElement('small'); small.textContent=field.hint; wrap.appendChild(small); }
    grid.appendChild(wrap);
  });
}

function play(){
  if(playing) return; playing=true; $('playPause').textContent='❚❚ Pause'; schedule();
}
function stop(){ if(timer){ clearTimeout(timer); timer=null; } playing=false; $('playPause').textContent='▶ Play slowly'; }
function schedule(){ timer = setTimeout(()=>{ stepForward(); if(playing) schedule(); }, speed); }
function stepForward(){ if(current < result.at){ current += 1; render(); } else { stop(); } }
function go(i){ current=Math.max(0,Math.min(i,result.at)); render(); }

function render(){
  result = E.outcome(scene,config);
  const info = E.stepInfo(result,current);
  renderText(info); renderScene(info); renderNodes(); renderRequest(); renderCode(info); renderData(); renderResponse(); drawPath(); positionRocket();
}
function renderText(info){
  $('stepBadge').textContent=`STEP ${current+1} OF 9`;
  $('stepTitle').textContent=info.title;
  $('stepExplain').textContent=info.explain;
  $('stepWhy').textContent=info.why;
  $('fixBox').hidden=!info.fix; $('fixBox').innerHTML=info.fix?`<strong>How to fix it</strong><p>${info.fix}</p>`:'';
  if(current>=result.at){ $('httpChip').textContent=String(result.status); $('httpChip').className='wf2-http-chip '+(result.ok?'success':'error'); }
  else { $('httpChip').textContent='IN PROGRESS'; $('httpChip').className='wf2-http-chip'; }
}
function renderScene(info){
  const c=result.c; const meta=scenes[scene];
  $('customerAction').textContent = scene==='bank' ? `${meta.person} wants to send ₹${c.amount} to Rahul.` : scene==='shop' ? `${meta.person} wants ${c.quantity} pair(s) of sneakers.` : `${meta.person} wants to order ${c.meal==='empty'?'a meal':c.meal}.`;
  if(scene==='bank'){
    $('fromLabel').textContent='Anita'; $('toLabel').textContent='Rahul'; $('fromValue').textContent=`₹${c.balance}`; $('toValue').textContent=`₹${c.recipient}`; $('scenePayload').textContent=`Transfer ₹${c.amount}`;
    $('sceneCaption').textContent = current<6 ? 'The customer taps Send. FastAPI now checks whether this transfer is allowed.' : result.ok && current>=7 ? 'The transfer rules passed. The balances can be updated safely together.' : 'The backend is deciding whether the transfer can continue.';
    $('sceneArrow').textContent = result.ok && current>=7 ? '💸' : '➜';
  } else if(scene==='shop'){
    $('fromLabel').textContent='Sneakers'; $('toLabel').textContent='Cart'; $('fromValue').textContent=`${c.stock} in stock`; $('toValue').textContent=`${c.quantity} requested`; $('scenePayload').textContent=`Buy ${c.quantity} pair(s)`;
    $('sceneCaption').textContent = current<6 ? 'The shopper taps Buy Now. The store must check stock and payment.' : result.ok && current>=7 ? 'Payment and stock checks passed. The order can be created.' : 'The backend is deciding whether the purchase can continue.';
    $('sceneArrow').textContent = result.ok && current>=7 ? '🧾' : '🛒';
  } else {
    $('fromLabel').textContent='Restaurant'; $('toLabel').textContent='Order'; $('fromValue').textContent=c.restaurant==='open'?'Open':'Closed'; $('toValue').textContent=c.meal==='empty'?'Meal missing':c.meal; $('scenePayload').textContent=c.meal==='empty'?'No meal selected':`Order ${c.meal}`;
    $('sceneCaption').textContent = current<6 ? 'The customer taps Place Order. The app must check the restaurant and the order data.' : result.ok && current>=7 ? 'The order was accepted. Live updates or notifications can happen next.' : 'The backend is deciding whether the order can continue.';
    $('sceneArrow').textContent = result.ok && current>=7 ? '🍱' : '➜';
  }
  if(result.ok && current>=result.at){
    if(scene==='bank'){$('fromValue').textContent=`₹${c.balance-c.amount}`; $('toValue').textContent=`₹${c.recipient+c.amount}`;}
    if(scene==='shop'){$('fromValue').textContent=`${c.stock-c.quantity} left`; $('toValue').textContent='Order created';}
    if(scene==='delivery'){$('fromValue').textContent='Accepted'; $('toValue').textContent=c.worker==='online'?'Notifier queued':'Notification waiting';}
  }
  const tag = scene==='bank' ? `POST /transfer` : scene==='shop' ? `POST /orders` : `POST /food/orders`;
  $('rocketTag').textContent = current>=result.at ? `Response ${result.status}` : tag;
}
function renderNodes(){
  for(let i=1;i<=7;i++){
    const node=$('anchor'+i); node.classList.remove('current','done','fail','blocked');
    if(i<current) node.classList.add('done');
    if(i===current && current<8) node.classList.add(result.ok || current!==result.at ? 'current' : 'fail');
    if(i>result.at) node.classList.add('blocked');
    if(!result.ok && i===result.at) node.classList.add('fail');
  }
}
function renderRequest(){
  const c=result.c; const body = scene==='bank' ? {amount:c.amount, to:'Rahul'} : scene==='shop' ? {quantity:c.quantity, sku:'SNKR-77'} : c.meal==='empty' ? {} : {meal:c.meal};
  const auth = c.identity==='valid' ? 'Bearer <valid demo token>' : c.identity==='missing' ? '(not sent)' : c.identity==='expired' ? 'Bearer <expired demo token>' : 'Bearer <limited demo token>';
  $('requestPreview').textContent = `${c.method} ${E.definitions[scene].path}\nAuthorization: ${auth}\nContent-Type: application/json\n\n${JSON.stringify(body,null,2)}`;
}
function renderCode(info){
  const lines = E.code[scene];
  const highlights = new Set(info.lines);
  $('codeTip').textContent = current===0 ? 'We show only the Python lines that matter for this moment.' : !result.ok && current===result.at ? 'The highlighted code shows where the request stopped.' : 'Follow the highlighted Python while the rocket moves through the system.';
  $('codeWindow').innerHTML = lines.map((line,idx)=>`<span class="${highlights.has(idx)?'hl':''}">${String(idx+1).padStart(2,'0')}  ${escapeHtml(line)}</span>`).join('\n');
}
function renderData(){
  const left = result.before.map(([k,v])=>`<div class="wf2-data-row"><span>${escapeHtml(k)}</span><b>${escapeHtml(v)}</b></div>`).join('');
  const showAfter = result.ok && current>=result.at;
  const rightData = showAfter ? result.after : result.before;
  const right = rightData.map(([k,v])=>`<div class="wf2-data-row ${showAfter?'after':''}"><span>${escapeHtml(k)}</span><b>${escapeHtml(v)}</b></div>`).join('');
  $('dataCompare').innerHTML = `<div class="wf2-data-col">${left}</div><div class="wf2-data-arrow">→</div><div class="wf2-data-col">${right}</div>`;
  $('dataExplain').textContent = current<result.at ? 'Nothing is committed yet. The backend is still checking the request.' : result.ok ? (scene==='delivery' ? 'The order was accepted. Extra work can continue after the response.' : 'The checks passed, so the new values are now committed.') : 'The request failed before the final commit. The business data stays safe.';
}
function renderResponse(){
  const status=$('responseStatus');
  if(current<result.at){ status.textContent='⏳ Waiting for result'; status.className='wf2-response-status'; $('responseJson').textContent=JSON.stringify({message:'Continue the journey…'},null,2); $('responseExplain').textContent='The answer appears after the backend finishes or stops the request.'; return; }
  status.textContent = `${result.ok?'✓':'✕'} ${result.status} ${result.ok ? (result.status===201?'Created':result.status===202?'Accepted':'OK') : statusText(result.status)}`;
  status.className='wf2-response-status '+(result.ok?'is-success':'is-error');
  $('responseJson').textContent = JSON.stringify(result.result,null,2);
  $('responseExplain').textContent = result.ok ? (scene==='bank' ? 'The banking app can now show the transfer success and the new balance.' : scene==='shop' ? 'The shop can now show the receipt and order ID.' : 'The food app can show that the order was accepted and continue with updates.') : 'The app receives a clear error instead of pretending the action succeeded.';
}
function statusText(code){return ({401:'Unauthorized',403:'Forbidden',404:'Not Found',405:'Method Not Allowed',409:'Conflict',422:'Unprocessable Content',502:'Bad Gateway',503:'Service Unavailable'})[code]||'';}
function escapeHtml(s){return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');}

function drawPath(){
  const shell=$('stageShell'); const svg=$('flightMap');
  const bb=shell.getBoundingClientRect();
  svg.setAttribute('viewBox',`0 0 ${bb.width} ${bb.height}`);
  ensureDefs();
  const points=[];
  for(let i=0;i<=8;i++){
    const el=$('anchor'+i); if(!el) continue;
    const eb=el.getBoundingClientRect();
    points.push({x:eb.left-bb.left+eb.width/2,y:eb.top-bb.top+eb.height/2});
  }
  let d='';
  points.forEach((p,idx)=>{
    if(idx===0)d=`M ${p.x} ${p.y}`;
    else {
      const prev=points[idx-1];
      const cx=(prev.x+p.x)/2;
      d += ` C ${cx} ${prev.y}, ${cx} ${p.y}, ${p.x} ${p.y}`;
    }
  });
  pathData=d;
  $('flightBase').setAttribute('d',d);
  $('flightProgress').setAttribute('d',d);
  const path=$('flightProgress');
  const len=path.getTotalLength();
  const progress=((current)/(8))*len;
  path.style.strokeDasharray = `${progress} ${len-progress+8}`;
  path.style.strokeDashoffset = '0';
  const dots=$('flightDots'); dots.innerHTML='';
  points.forEach((p,idx)=>{const c=document.createElementNS('http://www.w3.org/2000/svg','circle'); c.setAttribute('cx',p.x); c.setAttribute('cy',p.y); c.setAttribute('r',idx===current?7:4); c.setAttribute('fill',idx<=current?'#7df1e4':'rgba(190,220,245,.38)'); dots.appendChild(c);});
}
function ensureDefs(){
  const svg=$('flightMap'); if(svg.querySelector('defs')) return;
  const defs=document.createElementNS('http://www.w3.org/2000/svg','defs');
  const grad=document.createElementNS('http://www.w3.org/2000/svg','linearGradient'); grad.setAttribute('id','gradFlow'); grad.setAttribute('x1','0%'); grad.setAttribute('x2','100%'); grad.setAttribute('y1','0%'); grad.setAttribute('y2','0%');
  const s1=document.createElementNS('http://www.w3.org/2000/svg','stop'); s1.setAttribute('offset','0%'); s1.setAttribute('stop-color','#7df1e4');
  const s2=document.createElementNS('http://www.w3.org/2000/svg','stop'); s2.setAttribute('offset','100%'); s2.setAttribute('stop-color','#7aa9ff');
  grad.appendChild(s1); grad.appendChild(s2); defs.appendChild(grad); svg.prepend(defs);
}
function positionRocket(){
  if(window.innerWidth<760) return;
  const path=$('flightBase'); if(!pathData||!path) return;
  const rocket=$('rocket');
  const len=path.getTotalLength();
  const point=path.getPointAtLength((current/8)*len);
  const ahead=path.getPointAtLength(Math.min(len,(current/8)*len+3));
  const angle=Math.atan2(ahead.y-point.y,ahead.x-point.x)*180/Math.PI;
  rocket.style.transform=`translate(${point.x-20}px,${point.y-10}px) rotate(${angle}deg)`;
}

initMini(); bind(); loadScene('bank');
})();
