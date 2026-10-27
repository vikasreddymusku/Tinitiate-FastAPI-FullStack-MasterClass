/* V4 Developer Learning Studio: deterministic educational simulator. No network, token verification or payments. */
(()=>{
'use strict';
const E=window.FastAPIWorkflowEngine;
if(!E){console.error('V4 model was not loaded');return;}
const $=id=>document.getElementById(id), $$=(q,el=document)=>Array.from(el.querySelectorAll(q));
const clone=v=>JSON.parse(JSON.stringify(v));
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
const cash=n=>'₹'+Number(n).toLocaleString('en-IN');
const sceneData={
 bank:{headline:'Banking: Money Transfer',brand:'NOVA BANK',customer:'Good morning, Anita 👋',metric:'YOUR AVAILABLE BALANCE',person:'Rahul Sharma',photo:'👨🏽',personSub:'Friend • verified recipient',item:'Transfer amount',button:'Send Money',defaultBalance:400,send:'transfer',target:'Friend',route:'POST /transfers',codeTitle:'app/transfers.py',action:'Transfer',icon:'🏦'},
 shop:{headline:'Shopping: Checkout',brand:'SNEAKER LAB',customer:'Welcome back, Arjun 👋',metric:'SNEAKERS IN STOCK',person:'Velocity Runner 02',photo:'👟',personSub:'Available for purchase',item:'Pairs to buy',button:'Buy Now',send:'order',target:'Stock',route:'POST /orders',codeTitle:'app/orders.py',action:'Checkout',icon:'🛍️'},
 delivery:{headline:'Food Ordering: Place an Order',brand:'FOOD STREET',customer:'Hungry, Ravi? 🍜',metric:'RESTAURANT STATUS',person:'Your dinner order',photo:'🍲',personSub:'Choose a meal to order',item:'Meal',button:'Place Order',send:'food order',target:'Kitchen',route:'POST /deliveries',codeTitle:'app/deliveries.py',action:'Order',icon:'🍔'}
};
const reasons=[
 'The customer action creates the HTTP request. A browser cannot safely change server-side data itself.',
 'Uvicorn handles the HTTP connection and forwards it to the ASGI application; it does not decide whether a transfer is allowed.',
 'Middleware can apply shared tasks, such as a request ID or timer, before and after the route. It is not the bank’s balance checker.',
 'FastAPI maps the HTTP method and path to a Python path-operation function. The same URL with a different method may require a different route.',
 'Pydantic request models check the incoming fields. A missing or invalid required value normally triggers FastAPI request validation with HTTP 422.',
 'Protected endpoints need proof of identity and permission. A signed JWT is one possible bearer credential; decoding its payload alone does not prove it is valid.',
 'Python business rules decide whether a valid, authenticated request is allowed by the application’s rules. A balance or stock check belongs here.',
 'The code reads or changes durable state and may call other services. Real transactions and concurrent updates need careful design.',
 'An HTTP status and response body tell the frontend what happened. A response is returned through the middleware and web server.'
];
const names=['Customer','Web server','Middleware','Router','Validation','Identity','Python rules','Data + services','Response'];
const apiMethods={GET:['Read existing data','GET /accounts/8342 fetches an account balance. GET should not change a transfer.'],POST:['Create or perform an action','POST /transfers creates a transfer operation. A bank transfer changes state and needs server-side checks.'],PUT:['Replace a resource','PUT /profiles/1 can replace an editable profile. It does not normally mean transfer money.'],PATCH:['Update selected fields','PATCH /profiles/1 changes only selected profile fields.'],DELETE:['Remove a resource','DELETE /cart/items/9 removes a cart entry, not a bank ledger transaction.']};
const stageTitles={
 bank:['You tap Send Money','A request reaches Uvicorn','Middleware prepares tracing','FastAPI chooses the transfer route','Pydantic checks the transfer amount','The app checks the login credential','Python checks the money rules','The bank commits both balance changes','The phone receives the transfer result'],
 shop:['You tap Buy Now','The shop server receives the request','Shared request checks run','FastAPI chooses the orders route','The cart quantity is validated','The customer identity is checked','Python checks inventory','Payment and order services run','The receipt returns to the phone'],
 delivery:['You tap Place Order','The food server receives the request','Middleware prepares tracing','FastAPI finds the deliveries route','The meal data is checked','The app checks the customer identity','Python checks the restaurant','The order is stored and work is queued','The customer sees order acceptance']};
const microLabels={
 1:['HTTP connection received','Read the method and path','Forward to ASGI application'],
 2:['Assign request ID','Begin request timing','Pass through the middleware'],
 3:['Read method + path','Compare registered routes','Select route or return 404 / 405'],
 4:['Read JSON fields','Check required fields / types','Return clean model or validation error'],
 5:['Find bearer credential','Verify expiry, signature and claims','Check required permission'],
 6:['Read business state','Compare against rules','Allow action or raise HTTP error'],
 7:['Connect to storage/services','Perform protected changes','Commit or handle failure']
};
const active={scene:'bank', config:{...clone(E.definitions.bank.defaults),balance:400},result:null,step:-1,inspected:null,playing:false,delivered:false,busy:false,runId:0,flight:null,speed:'slow',mode:'code',logFilter:'all',method:'POST',authIndex:0,micro:0};
active.result=E.outcome(active.scene,active.config);
let timer=null,microTimer=null;
function stopTimers(){if(timer!==null)clearTimeout(timer);timer=null;if(microTimer!==null)clearInterval(microTimer);microTimer=null;}
function cancelFlight(){if(active.flight?.raf)cancelAnimationFrame(active.flight.raf);active.flight=null;active.busy=false;$('v4Plane').style.opacity='0';$('v4FlightTag').style.opacity='0';$('v4FlightTrail').setAttribute('d','');$('v4FlightGuide').setAttribute('d','');}
function reset(preserve=false){stopTimers();active.runId++;cancelFlight();active.step=-1;active.inspected=null;active.playing=false;active.delivered=false;active.micro=0;if(!preserve)active.result=E.outcome(active.scene,active.config);render();}
function switchScene(scene){if(!sceneData[scene])return;active.scene=scene;active.config=clone(E.definitions[scene].defaults);if(scene==='bank')active.config.balance=400;active.result=E.outcome(scene,active.config);active.mode='code';$$('[data-v4-scene]').forEach(b=>{let selected=b.dataset.v4Scene===scene;b.classList.toggle('selected',selected);b.setAttribute('aria-selected',String(selected));});renderControls();renderPresets();reset(true);}
function setConfig(key,value){active.config[key]=value;active.result=E.outcome(active.scene,active.config);reset(true);renderControls();}
function applyPreset(key){const p=E.definitions[active.scene].presets.find(a=>a[0]===key);if(!p)return;active.config=clone(E.definitions[active.scene].defaults);if(active.scene==='bank'&&key==='no-money'){active.config.balance=400;active.config.amount=500;}else if(active.scene==='bank'&&key==='success'){active.config.balance=1500;active.config.amount=500;}Object.assign(active.config,p[2]);active.result=E.outcome(active.scene,active.config);renderControls();reset(true);}
function start(auto=true){reset(true);active.playing=auto;active.step=0;render();if(auto)schedule(400);}
function pace(){return {slow:1,normal:.70,fast:.42}[active.speed]||1;}
function schedule(ms=1800){stopTimers();if(!active.playing)return;timer=setTimeout(()=>{timer=null;advance(true);},Math.max(220,ms*pace()));}
function play(){if(active.playing){active.playing=false;stopTimers();renderPlayer();return;}if(active.delivered){start(true);return;}active.playing=true;if(active.step===-1){active.step=0;render();}renderPlayer();schedule(320);}
function next(){if(active.busy)return;active.playing=false;stopTimers();if(active.step<0){active.step=0;render();return;}advance(false);}
function prev(){active.playing=false;stopTimers();active.runId++;cancelFlight();active.delivered=false;active.step=Math.max(-1,active.step-1);active.inspected=null;active.micro=0;render();}
function advance(auto){if(active.busy)return;if(active.step<0){active.step=0;render();if(auto)schedule();return;}
 if(active.step>=active.result.at){finish(auto);return;}
 const nextStep=active.step+1;const from=active.step===0?$('v4Phone'):$(`[data-v4-step="${active.step}"]`),to=$(`[data-v4-step="${nextStep}"]`);
 active.busy=true;fly(from,to,false,()=>{active.step=nextStep;active.inspected=null;active.micro=0;active.busy=false;render();startMicro();if(active.playing)schedule(2600);});}
function finish(auto){if(active.delivered)return;active.busy=true;const from=active.step<=0?$('v4Phone'):$(`[data-v4-step="${active.step}"]`);fly(from,$('v4Phone'),true,()=>{active.busy=false;active.delivered=true;active.playing=false;stopTimers();render();});}
function point(el){const root=$('v4AnimationRoot').getBoundingClientRect();const rect=el.getBoundingClientRect();return {x:rect.left-root.left+rect.width/2,y:rect.top-root.top+rect.height/2};}
function cubic(a,b,c,d,t){const u=1-t;return {x:u*u*u*a.x+3*u*u*t*b.x+3*u*t*t*c.x+t*t*t*d.x,y:u*u*u*a.y+3*u*u*t*b.y+3*u*t*t*c.y+t*t*t*d.y};}
function fly(from,to,reply,done){const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;if(!from||!to||window.innerWidth<830||reduce){done();return;}
 const root=$('v4AnimationRoot').getBoundingClientRect();$('v4FlightSvg').setAttribute('viewBox',`0 0 ${root.width} ${root.height}`);
 const a=point(from),d=point(to);const lift=Math.min(100,Math.max(36,Math.abs(d.x-a.x)*.16));const b={x:a.x+(d.x-a.x)*.36,y:a.y-lift},c={x:a.x+(d.x-a.x)*.66,y:d.y-lift};
 $('v4FlightGuide').setAttribute('d',`M${a.x},${a.y} C${b.x},${b.y} ${c.x},${c.y} ${d.x},${d.y}`);
 const ticket=++active.runId;const duration=1000*pace(),begin=performance.now();active.flight={raf:null};$('v4Plane').style.opacity='1';$('v4FlightTag').textContent=reply?`${active.result.status} RESPONSE`:`${active.config.method} ${E.definitions[active.scene].path}`;$('v4FlightTag').style.opacity='1';
 function frame(now){if(ticket!==active.runId)return;const t=Math.min(1,(now-begin)/duration);const eased=t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;const p=cubic(a,b,c,d,eased),forward=cubic(a,b,c,d,Math.min(1,eased+.004));const angle=Math.atan2(forward.y-p.y,forward.x-p.x)*180/Math.PI;
 $('v4Plane').setAttribute('transform',`translate(${p.x} ${p.y}) rotate(${angle})`);$('v4FlightTag').style.transform=`translate(${p.x+12}px,${p.y-32}px)`;
 let trail='';for(let i=0;i<=15;i++){const q=cubic(a,b,c,d,eased*i/15);trail+=(i?' L':'M')+q.x+' '+q.y;}$('v4FlightTrail').setAttribute('d',trail);
 if(t<1){active.flight.raf=requestAnimationFrame(frame);}else{cancelFlight();done();}}
 active.flight.raf=requestAnimationFrame(frame);
}
function startMicro(){if(microTimer!==null)clearInterval(microTimer);if(active.step<1||active.step>7)return;microTimer=setInterval(()=>{if(active.inspected!==null)return;if(active.micro>=2){clearInterval(microTimer);microTimer=null;return;}active.micro++;renderFocus();},650*pace());}
function inspect(i){stopTimers();active.playing=false;active.inspected=i;active.micro=0;render();}
function simpleWhy(stage){return E.stepInfo(active.result,Math.min(stage,active.result.at));}
function stageCode(stage){return E.stepLines[active.scene][stage]||[];}
function showStatus(){const r=active.result;return active.step>=r.at? r.status:'IN PROGRESS';}
function render(){renderPhone();renderMachines();renderFocus();renderCode();renderLogs();renderTimeline();renderPlayer();renderMethod();renderAuth();renderCompare();renderTop();}
function renderTop(){const s=sceneData[active.scene];$('v4Headline').textContent=s.headline;$('v4RouteChip').textContent=active.config.method+' '+E.definitions[active.scene].path;const mode=active.step<=0?'Request':active.delivered?'Result':'Process';['Request','Process','Result'].forEach(m=>$('v4Mode'+m).classList.toggle('selected',m===mode));}
function renderPhone(){const c=active.config,s=sceneData[active.scene];const end=active.delivered,r=active.result;const status=end?(r.ok?'ok':'fail'):'';const message=end?(r.ok?(active.scene==='bank'?`Transfer complete. ${cash(c.amount)} sent safely.`:active.scene==='shop'?'Order created. Your receipt is ready.':'Order accepted. Watch for updates.'):`${r.status}: ${r.reason}`):active.step>=0?'⏳ Sending request through the backend…':'Ready to send. Tap the action button.';
 let metric=active.scene==='bank'?cash(c.balance-(end&&r.ok?c.amount:0)):active.scene==='shop'?`${c.stock-(end&&r.ok?c.quantity:0)} pairs`:c.restaurant==='open'?'OPEN FOR ORDERS':'CLOSED';
 let chooser=active.scene==='delivery'?`<select id="v4PhoneMeal" class="v4-app-field" aria-label="Choose a meal">${[['pizza','Pizza 🍕'],['rice','Rice bowl 🍚'],['salad','Salad 🥗'],['empty','No meal selected']].map(([v,l])=>`<option value="${v}" ${v===c.meal?'selected':''}>${l}</option>`).join('')}</select>`:`<input id="v4PhoneValue" class="v4-app-field" type="number" value="${active.scene==='bank'?c.amount:c.quantity}" step="${active.scene==='bank'?100:1}" aria-label="${esc(s.item)}">`;
 $('v4PhoneApp').innerHTML=`<div class="v4-app-head"><b>${s.brand}</b><span>${s.customer}</span></div><div class="v4-app-body"><div class="v4-balance"><span>${s.metric}</span><b>${esc(metric)}</b><small>${active.scene==='bank'?'•• 8342 · Savings account':active.scene==='shop'?'Updated after successful checkout':'Orders accepted during opening hours'}</small></div><label>${active.scene==='bank'?'SEND TO':active.scene==='shop'?'PRODUCT':'ORDER FROM'}</label><div class="v4-contact"><span>${s.photo}</span><div><b>${esc(s.person)}</b><small>${esc(s.personSub)}</small></div><em>✓</em></div><label>${s.item.toUpperCase()}</label>${chooser}<div class="v4-customer-result ${status}" id="v4PhoneMessage">${esc(message)}</div><button type="button" id="v4PhoneSend" class="v4-app-action">${end?'Try again ↻':s.button+' ➜'}</button></div>`;
 $('v4PhoneSend').onclick=()=>{if(end){reset(true);}start(true);};
 const phoneInput=$('v4PhoneValue'),meal=$('v4PhoneMeal');if(phoneInput)phoneInput.addEventListener('change',e=>setConfig(active.scene==='bank'?'amount':'quantity',Number(e.target.value)));if(meal)meal.addEventListener('change',e=>setConfig('meal',e.target.value));
}
function renderMachines(){const r=active.result;$$('[data-v4-step]').forEach(btn=>{const i=Number(btn.dataset.v4Step);btn.classList.toggle('active',i===active.step);btn.classList.toggle('done',i<active.step&&i<=r.at);btn.classList.toggle('failed',i===active.step&&!r.ok&&i===r.at);btn.classList.toggle('future',i>active.step);btn.querySelector('.v4-state').textContent=i===active.step?(i===r.at&&!r.ok?'✕ Stopped':'● Inspecting'):i<active.step?'✓ Passed':i>r.at?'Not reached':'Waiting';});}
function detailsFor(stage){const r=active.result,c=r.c,s=sceneData[active.scene],name=names[stage];const bad=!r.ok&&stage===r.at;let left='',right='',leftTitle='',rightTitle='';const route=E.definitions[active.scene].path;
 switch(stage){
 case 1:left='📨';leftTitle=c.method+' '+route;right='🖥️';rightTitle='Uvicorn → ASGI';break;
 case 2:left='📨';leftTitle='Incoming request';right='⚙️';rightTitle='ID + timer + log';break;
 case 3:left='🗂️';leftTitle=c.method+' '+route;right=bad?'⛔':'🧭';rightTitle=bad?'No matching handler':'Route matched';break;
 case 4:left='{}';leftTitle=active.scene==='bank'?`amount: ${c.amount}`:active.scene==='shop'?`quantity: ${c.quantity}`:`meal: ${c.meal}`;right=bad?'⛔':'📋';rightTitle=bad?'Invalid field':'Pydantic model';break;
 case 5:left='🔑';leftTitle=c.identity==='valid'?'Bearer credential':c.identity==='missing'?'No credential':c.identity==='expired'?'Expired token':'Limited access';right=bad?'⛔':'🛡️';rightTitle=bad?'Access rejected':'Permission approved';break;
 case 6:left=active.scene==='bank'?'🏦':active.scene==='shop'?'👟':'🍽️';leftTitle=active.scene==='bank'?`Balance: ${cash(c.balance)}`:active.scene==='shop'?`Stock: ${c.stock}`:`Restaurant: ${c.restaurant}`;right=bad?'✕':'⚖️';rightTitle=active.scene==='bank'?`Requested: ${cash(c.amount)}`:active.scene==='shop'?`Buy: ${c.quantity}`:`Meal: ${c.meal}`;break;
 case 7:left=active.scene==='bank'?'🏦':active.scene==='shop'?'💳':'🛵';leftTitle=active.scene==='bank'?'Sender + recipient':active.scene==='shop'?'Payment + stock':'Order + notifications';right=bad?'⛔':'💾';rightTitle=bad?'Operation cancelled':'Committed / accepted';break;
 default:left='📲';leftTitle='Customer phone';right='📨';rightTitle='Request';}
 const info=simpleWhy(stage);const micro=microLabels[stage]||[];
 const explanation=bad?`${r.reason} ${r.fix}`:info.explain;
 return {name,explanation,why:reasons[stage],left,leftTitle,right,rightTitle,bad,micro};}
function machineIllustration(stage,d){
 const c=active.config,r=active.result,fail=d.bad && active.step>=stage;
 const tag=(t)=>esc(t);
 if(stage===1)return `<div class="v4-mech v4-mech-server"><div class="v4-request-envelope">✉<small>${tag(c.method)} ${tag(r.path)}</small></div><div class="v4-mech-stream"><span></span><span></span><span></span></div><div class="v4-server-rack"><b>UVICORN</b><i></i><i></i><i></i><small>ASGI entry</small></div></div><span class="v4-visual-status">HTTP request handed to application</span>`;
 if(stage===2)return `<div class="v4-mech v4-mech-conveyor"><div class="v4-belt-card">✉ <small>request</small></div><div class="v4-scanner"><b>⚙</b><small>MIDDLEWARE</small></div><div class="v4-log-stamp">✓ <small>request ID</small><small>timer</small></div></div><span class="v4-visual-status">Shared tracing applied</span>`;
 if(stage===3)return `<div class="v4-mech v4-mech-router"><div class="v4-route-arrival">${tag(c.method)} ${tag(r.path)}</div><div class="v4-route-branches"><div class="${c.method==='GET'?'matching':''}">GET /accounts</div><div class="${!fail?'matching':''}">POST ${tag(r.path)}</div><div>GET /health</div></div></div><span class="v4-visual-status ${fail?'error':''}">${fail?'Route not found or method not allowed':'Matching route selected'}</span>`;
 if(stage===4){const label=active.scene==='bank'?'amount':active.scene==='shop'?'quantity':'meal';const val=tag(c[label]);return `<div class="v4-mech v4-mech-validation"><div class="v4-json-card"><b>JSON BODY</b><span>{</span><span>  "${label}": ${typeof c[label]==='number'?val:'"'+val+'"'}</span><span>}</span></div><div class="v4-field-checks"><span>${fail?'✕':'✓'} Required field</span><span>${fail?'✕':'✓'} Correct type</span><span>${fail?'✕':'✓'} Allowed value</span></div></div><span class="v4-visual-status ${fail?'error':''}">${fail?'HTTP 422 · Invalid input':'Pydantic validation passed'}</span>`;}
 if(stage===5)return `<div class="v4-mech v4-mech-auth"><div class="v4-jwt-card"><b>JWT</b><span>Header</span><span>Payload</span><span>Signature</span></div><div class="v4-auth-scanner"><div class="v4-auth-ray"></div><b>${fail?'🔒':'✓'}</b><small>${fail?'DENIED':'VERIFIED'}</small></div><div class="v4-auth-claims"><span>exp</span><span>issuer</span><span>scope</span></div></div><span class="v4-visual-status ${fail?'error':''}">${fail?'401 or 403 · Check token / permissions':'Example credential accepted'}</span>`;
 if(stage===6){let v1=active.scene==='bank'?cash(c.balance):active.scene==='shop'?`${c.stock} pairs`:`${c.restaurant}`,v2=active.scene==='bank'?cash(c.amount):active.scene==='shop'?`${c.quantity} pairs`:tag(c.meal),label1=active.scene==='bank'?'AVAILABLE BALANCE':active.scene==='shop'?'STOCK AVAILABLE':'RESTAURANT',label2=active.scene==='bank'?'TRANSFER REQUEST':active.scene==='shop'?'CUSTOMER WANTS':'ORDER PLACED';return `<div class="v4-mech v4-mech-rules"><div class="v4-money-side"><small>${label1}</small><b>${tag(v1)}</b></div><div class="v4-decision-core"><span class="v4-logic-symbol">🐍</span><strong>${active.scene==='bank'?(c.balance>=c.amount?'≥':'<'):active.scene==='shop'?(c.stock>=c.quantity?'≥':'<'):(c.restaurant==='open'?'✓':'✕')}</strong></div><div class="v4-money-side"><small>${label2}</small><b>${tag(v2)}</b></div></div><span class="v4-visual-status ${fail?'error':''}">${fail?'✕ Business rule rejected the action':'✓ Business rules passed'}</span>`;}
 if(stage===7)return `<div class="v4-mech v4-mech-db"><div class="v4-db-stack"><span></span><span></span><span></span><b>${active.scene==='bank'?'Account A':active.scene==='shop'?'Inventory':'Order row'}</b></div><div class="v4-db-transaction"><b>${fail?'ROLLBACK':'COMMIT'}</b><div class="v4-db-progress"></div><small>${fail?'No partial changes':active.scene==='bank'?'Debit + credit together':'Save durable state'}</small></div><div class="v4-db-stack"><span></span><span></span><span></span><b>${active.scene==='bank'?'Account B':active.scene==='shop'?'Order row':'Queue'}</b></div></div><span class="v4-visual-status ${fail?'error':''}">${fail?'Failure · changes not committed':'Data and services completed'}</span>`;
 return '';
}
function renderFocus(){const stage=active.inspected!==null?active.inspected:active.step;const preview=stage>active.step,show=stage>=1&&stage<=7;if(!show){$('v4FocusTitle').textContent=active.delivered?'The answer is back on the phone':'You make a request — then the backend begins';$('v4FocusSubtitle').textContent='Each machine will perform a visible job and explain why.';$('v4ActiveNumber').textContent=stage===8?'↩':'00';$('v4MachineBadge').textContent=active.delivered?'FINISHED':'READY';$('v4WhyTitle').textContent=stage===8?'The app understands the answer':'First, what is FastAPI?';$('v4WhyText').textContent=stage===8?'The HTTP status and JSON tell the phone whether to show success or an error.':reasons[0];$('v4MachineVisual').innerHTML='<div class="v4-welcome-visual">📲 <span>➜</span> 🛩️ <span>➜</span> 🐍</div>';$('v4Checks').innerHTML='<div class="v4-check-row"><span>01</span>Press the customer app’s action button to start</div>';}
 else{const d=detailsFor(stage),failed=d.bad&&!preview;
 $('v4ActiveNumber').textContent=String(stage).padStart(2,'0');$('v4MachineBadge').textContent=preview?'PREVIEW':failed?'STOPPED':active.step===stage?'PROCESSING':'INSPECT';$('v4FocusTitle').textContent=d.name+' — '+stageTitles[active.scene][stage];$('v4FocusSubtitle').textContent=preview?'This is what this machine would do if the request reaches it.':'Step '+stage+' of 7 · Click another machine to look inside';$('v4WhyTitle').textContent=failed?'Why the request stopped':stageTitles[active.scene][stage];$('v4WhyText').textContent=d.explanation;
 $('v4MachineVisual').innerHTML=machineIllustration(stage,d);
 $('v4Checks').innerHTML=d.micro.map((line,i)=>`<div class="v4-check-row ${!preview&&active.step>stage||(!preview&&active.step===stage&&i<=active.micro)?i===2&&failed?'failed':'passed':''}"><span>${i<active.micro+1&&!preview?'✓':i+1}</span>${esc(line)}</div>`).join('');}
 const at=active.result.at,complete=active.step>=at;if(complete){const r=active.result;$('v4ResultBand').classList.toggle('failed',!r.ok);$('v4ResultText').textContent=r.ok?`✓ ${r.status} — ${active.scene==='bank'?'Transfer approved':active.scene==='shop'?'Order created':'Order accepted'}`:`✕ ${r.status} — ${r.reason}`;$('v4SmallOutcome').textContent=r.ok?'Business data updated when appropriate':'No changes committed';}
 else{$('v4ResultBand').classList.remove('failed');$('v4ResultText').textContent=active.step<0?'Ready — no request sent yet.':`Processing: ${names[Math.max(0,active.step)]}`;$('v4SmallOutcome').textContent='Simulated request in progress';}
}
function renderPlayer(){let i=active.step;const title=i<0?'Start by doing something familiar.':stageTitles[active.scene][Math.min(i,8)];$('v4StepLabel').textContent=i<0?'BEFORE THE REQUEST':`STEP ${i+1} OF 9`; $('v4TeacherTitle').textContent=title;$('v4TeacherText').textContent=i<0?'Tap Send Money, Buy Now or Place Order. Then follow the request into Python.':E.stepInfo(active.result,Math.min(i,active.result.at)).why;$('v4Play').textContent=active.playing?'Ⅱ Pause':'▶ Play';$('v4Play').disabled=active.busy;}
function renderTimeline(){$('v4Timeline').innerHTML=names.map((n,i)=>`<button type="button" data-v4-timeline="${i}" class="${i<active.step?'done':''} ${i===active.step?'current':''} ${i===active.result.at&&i===active.step&&!active.result.ok?'failed':''}" aria-label="Inspect ${esc(n)}"><span>${i===0?'⌁':i===8?'↩':i}</span>${esc(n)}</button>`).join('');$$('[data-v4-timeline]').forEach(b=>b.onclick=()=>{const i=Number(b.dataset.v4Timeline);if(i>=1&&i<=7){inspect(i);}else if(i===0){active.inspected=null;render();}else{active.inspected=null;render();}});}
function highlightCodeLine(line,stage){return stageCode(stage).includes(line);}
function syntax(s){
 const token=/(#.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|\b(async|def|if|return|raise|class|with|from|import|await)\b/g;
 let html='',end=0,match;
 while((match=token.exec(s))){
  html+=esc(s.slice(end,match.index));
  const cls=match[1]?'v4-code-comment':match[2]?'v4-code-string':'v4-code-keyword';
  html+=`<span class="${cls}">${esc(match[0])}</span>`;
  end=match.index+match[0].length;
 }
 return html+esc(s.slice(end));
}
function responseJson(){return JSON.stringify(active.result.result,null,2);}
function renderCode(){const i=active.inspected!==null?active.inspected:active.step,s=active.scene,mode=active.mode;
 $$('[data-v4-dev]').forEach(b=>b.classList.toggle('selected',b.dataset.v4Dev===mode));
 const code=E.code[s],dir=stageCode(Math.max(0,i));$('v4CodeFilename').textContent=mode==='code'?sceneData[s].codeTitle+' • illustrative teaching pattern':mode==='request'?'HTTP request / response • simulated':'Pydantic request model • teaching illustration';
 if(mode==='code')$('v4Code').innerHTML=code.map((line,j)=>`<span class="v4-code-line ${dir.includes(j)?'glow':''}"><b>${String(j+1).padStart(2,'0')}</b>${syntax(line)}</span>`).join('');
 else if(mode==='request'){$('v4Code').textContent=active.config.method+' '+E.definitions[s].path+' HTTP/1.1\nAuthorization: '+(active.config.identity==='valid'?'Bearer <redacted demo token>':active.config.identity==='missing'?'(missing)':active.config.identity==='expired'?'Bearer <expired demo token>':'Bearer <restricted demo token>')+'\nContent-Type: application/json\n\n'+JSON.stringify(s==='bank'?{to:'Rahul',amount:active.config.amount}:s==='shop'?{sku:'SNKR-02',quantity:active.config.quantity}:active.config.meal==='empty'?{}:{meal:active.config.meal},null,2)+'\n\n--- RESPONSE '+(active.step>=active.result.at?active.result.status:'PENDING')+' ---\n'+(active.step>=active.result.at?responseJson():'Response not received yet');}
 else{$('v4Code').textContent=code.filter((line,j)=>j<=5).join('\n')+'\n\n# FastAPI uses the type annotation and Pydantic\n# to check requests and produce useful errors.';}
 $('v4CodeReason').textContent=i<0?'POST creates or performs an operation that changes data. The backend then checks the request safely.':reasons[Math.min(i,8)];}
function logEntries(){const r=active.result,s=active.scene,c=r.c,at=Math.min(active.step,r.at);if(at<0)return [];
 const lines=[{i:0,type:'INFO',key:'app.frontend',msg:`Customer started ${c.method} ${r.path}`}];
 const add=(i,key,msg,type='INFO')=>{if(at>=i)lines.push({i,key,msg,type});};
 add(1,'app.server',`ASGI server passed the request: ${c.method} ${r.path}`);
 add(2,'app.middleware','Assigned a demo request ID and started request timing');
 if(r.at===3&&!r.ok)add(3,'app.router',`Route lookup failed: ${r.status} ${r.reason}`,'WARN');else add(3,'app.router',`Route matched ${c.method} ${r.path}`);
 if(r.at===4&&!r.ok)add(4,'app.validation',`Request rejected: ${r.reason}`,'WARN');else add(4,'app.validation','Pydantic request input accepted');
 if(r.at===5&&!r.ok)add(5,'app.auth',`Credential/permission rejected: ${r.reason}`,'WARN');else add(5,'app.auth','Example user authenticated and authorized');
 if(r.at===6&&!r.ok)add(6,'app.rules',`Rule rejected: ${r.reason}`,'WARN');else add(6,'app.rules',s==='bank'?`Balance ${cash(c.balance)} covers ${cash(c.amount)}`:s==='shop'?`Stock ${c.stock} covers quantity ${c.quantity}`:'Restaurant is open and can accept the order');
 if(r.at===7&&!r.ok)add(7,'app.services',`Downstream operation failed: ${r.reason}`,'ERROR');else add(7,'app.services',s==='bank'?'Balance updates committed together':s==='shop'?'Payment approved and order state updated':'Order saved; notification may be scheduled');
 if(at>=r.at) lines.push({i:r.at,key:'app.response',type:r.ok?'INFO':'ERROR',msg:`${c.method} ${r.path} → ${r.status} ${r.ok?'Success':r.reason}`});
 if(active.delivered){lines.push({i:r.at,key:'uvicorn.access',type:'INFO',msg:`${c.method} ${r.path} HTTP/1.1 ${r.status} (illustrative access log)`});lines.push({i:r.at,key:'app.client',type:'INFO',msg:'HTTP response returned to customer app'});}
 return lines;
}
function renderLogs(){const entries=logEntries().filter(x=>active.logFilter==='all'||(active.logFilter==='warn'&&(x.type==='WARN'||x.type==='ERROR'))||x.type.toLowerCase()===active.logFilter);const el=$('v4LogLines');el.innerHTML=entries.length?entries.map((line,j)=>`<button type="button" class="v4-log" data-v4-log="${line.i}"><span class="v4-log-time">20:36:${String(line.i*2).padStart(2,'0')}</span><span class="v4-log-level ${line.type.toLowerCase()}">${line.type}</span><span class="v4-log-message">[${esc(line.key)}] ${esc(line.msg)}</span></button>`).join(''):'<div class="v4-log-empty">Run a request to see what your application could log at each stage.</div>';
 $$('[data-v4-log]',el).forEach(b=>b.onclick=()=>inspect(Number(b.dataset.v4Log)));el.scrollTop=el.scrollHeight;}
function renderMethod(){const method=active.method;$('v4Methods').innerHTML=Object.entries(apiMethods).map(([key,[short]])=>`<button type="button" class="v4-method ${method===key?'selected':''}" data-v4-method="${key}"><b>${key}</b><span>${esc(short)}</span></button>`).join('');$$('[data-v4-method]').forEach(btn=>btn.onclick=()=>{active.method=btn.dataset.v4Method;renderMethod();});$('v4MethodExplanation').innerHTML=esc(apiMethods[method][1])+` <button type="button" id="v4TryMethod" style="margin-top:7px;padding:5px 7px;background:#0f6575;color:#fff;border:1px solid #4de4e2;border-radius:7px;font-size:.65rem">Try ${method} on this action →</button>`;$('v4TryMethod').onclick=()=>{setConfig('method',method);start(true);};}
function renderAuth(){const facts=[['👩🏽','User signs in','The user supplies credentials to a login endpoint. In a real app, passwords are verified securely on the server.'],['🔐','App receives credential','An app might receive an access token or use a session cookie. A JWT is only one possible access-token format.'],['🛡️','Server verifies JWT','The backend verifies signature, expiry, issuer, audience, and relevant claims. Merely decoding a token is not verification.'],['🚪','Check permissions','A valid identity is not enough: the user also needs permission to perform this action.']];$('v4AuthFlow').innerHTML=facts.map((f,i)=>`${i?'<b class="v4-auth-arrow">➜</b>':''}<button type="button" class="v4-auth-item" data-v4-auth="${i}" style="${active.authIndex===i?'border-color:#55e5d8;background:#10505e':''}"><strong>${f[0]}</strong><span>${f[1]}</span></button>`).join('');$$('[data-v4-auth]').forEach(b=>b.onclick=()=>{active.authIndex=Number(b.dataset.v4Auth);renderAuth();});$('v4AuthExplanation').textContent=facts[active.authIndex][2];}
function renderCompare(){const s=active.scene,r=active.result;const ex=s==='bank'?{ok:'₹300 transfer, balance ₹400',fail:'₹500 transfer, balance ₹400'}:s==='shop'?{ok:'1 pair, 5 in stock',fail:'8 pairs, 5 in stock'}:{ok:'Restaurant open',fail:'Restaurant closed'};
 $('v4Compare').innerHTML=`<div class="v4-compare-card"><b>✓ SUCCESS RUN</b><p>${esc(ex.ok)}<br>Rules pass; updates committed if needed.</p><button data-v4-compare="success">Run success ↗</button></div><div class="v4-compare-card fail"><b>✕ ERROR RUN</b><p>${esc(ex.fail)}<br>Rule fails; nothing partially committed.</p><button data-v4-compare="failure">Run error ↗</button></div>`;
 $$('[data-v4-compare]').forEach(b=>b.onclick=()=>{const c=clone(E.definitions[s].defaults);if(s==='bank'){c.balance=400;c.amount=b.dataset.v4Compare==='success'?300:500;}else if(s==='shop'){c.stock=5;c.quantity=b.dataset.v4Compare==='success'?1:8;}else c.restaurant=b.dataset.v4Compare==='success'?'open':'closed';active.config=c;active.result=E.outcome(s,c);renderControls();start(true);});}
function renderControls(){const d=E.definitions[active.scene];$('v4Controls').innerHTML=d.controls.map(field=>{const options=field.type==='select'?`<select id="v4Input_${field.id}">${field.options.map(([v,l])=>`<option value="${esc(v)}" ${String(active.config[field.id])===String(v)?'selected':''}>${esc(l)}</option>`).join('')}</select>`:`<input type="number" id="v4Input_${field.id}" value="${esc(active.config[field.id])}" min="${field.min}" max="${field.max}" step="${field.step||1}">`;return `<div><label for="v4Input_${field.id}">${esc(field.label)}</label>${options}</div>`;}).join('');d.controls.forEach(field=>{$('v4Input_'+field.id).onchange=e=>setConfig(field.id,field.type==='number'?Number(e.target.value):e.target.value);});}
function renderPresets(){const d=E.definitions[active.scene];$('v4Preset').innerHTML=d.presets.map(([key,label])=>`<option value="${key}">${esc(label)}</option>`).join('');$('v4Preset').value='success';}
function fixRetry(){const c=active.config,at=active.result.at;if(active.result.ok){start(true);return;}if(at===3){c.route='present';c.method=E.definitions[active.scene].method;}if(at===4){if(active.scene==='bank')c.amount=300;else if(active.scene==='shop')c.quantity=1;else c.meal='pizza';}if(at===5)c.identity='valid';if(at===6){if(active.scene==='bank')c.amount=Math.min(300,c.balance);else if(active.scene==='shop')c.quantity=1;else c.restaurant='open';}if(at===7){if(active.scene==='bank'||active.scene==='delivery')c.database='online';else {c.gateway='online';c.payment='approved';}}active.result=E.outcome(active.scene,c);renderControls();start(true);}
function bind(){
 $$('[data-v4-scene]').forEach(b=>b.onclick=()=>switchScene(b.dataset.v4Scene));
 $$('[data-v4-step]').forEach(b=>b.onclick=()=>inspect(Number(b.dataset.v4Step)));
 $$('[data-v4-dev]').forEach(b=>b.onclick=()=>{active.mode=b.dataset.v4Dev;renderCode();});
 $('v4Play').onclick=play;$('v4Next').onclick=next;$('v4Prev').onclick=prev;$('v4Reset').onclick=()=>reset(true);$('v4ResetPhone').onclick=()=>{active.config=clone(E.definitions[active.scene].defaults);if(active.scene==='bank')active.config.balance=400;active.result=E.outcome(active.scene,active.config);renderControls();reset(true);};
 $('v4Speed').onchange=e=>active.speed=e.target.value;
 $('v4Preset').onchange=e=>{applyPreset(e.target.value);};
 $('v4RunExperiment').onclick=()=>start(true);$('v4FixRetry').onclick=fixRetry;
 $('v4LogFilter').onchange=e=>{active.logFilter=e.target.value;renderLogs();};
 $('v4CopyLogs').onclick=()=>{const txt=logEntries().map(x=>`[DEMO] ${x.type} ${x.key} ${x.msg}`).join('\n');if(navigator.clipboard?.writeText)navigator.clipboard.writeText(txt).catch(()=>{});};
 $('v4ModeRequest').onclick=()=>{reset(true);active.step=0;render();};$('v4ModeProcess').onclick=()=>{active.playing=false;stopTimers();active.step=Math.min(6,active.result.at);active.inspected=null;render();};$('v4ModeResult').onclick=()=>{active.playing=false;stopTimers();active.step=active.result.at;active.delivered=true;active.inspected=null;render();};
 window.addEventListener('resize',()=>{if(active.busy)active.runId++;cancelFlight();});
}
bind();renderPresets();renderControls();render();
})();
