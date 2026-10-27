/* Tinitiate V6 dynamic execution theater.
 * Browser-only deterministic instructional simulation: no real transfers,
 * payments, JWT verification, external APIs, or persistent banking records.
 * The four approved V6 dashboards remain structurally unchanged.
 */
(() => {
  'use strict';
  const T = {
    'bank-same': {
      label: 'Nova Bank · same-bank transfer', type: 'bank', target: '.v6-machine',
      steps: [
        ['Customer Request', 'Anita taps Send Money', 'The app assembles POST /api/v1/transfer with recipient 1002, amount ₹500, and an authenticated customer session.', 'HTTPS request', 'App → Nova Bank', 'POST /api/v1/transfer', 'Tap creates request', 'SEND', 'Open the app, collect amount and recipient, attach authorization, then send HTTPS.', 'INFO', 'POST /api/v1/transfer sent by Anita'],
        ['Web Server', 'HTTPS reaches Uvicorn', 'Uvicorn receives a decrypted HTTP request after TLS termination at the configured HTTPS boundary and constructs the ASGI scope.', 'HTTP packet', 'Gateway → Uvicorn', 'scope["method"] = "POST"', 'Accept HTTP connection', 'ASGI', 'Read method, headers, path, and body bytes, then pass into FastAPI.', 'INFO', 'ASGI request received: POST /api/v1/transfer'],
        ['Middleware', 'Tracking wraps this request', 'Nova Bank adds a correlation ID, starts a timer, and forwards the request. Response middleware later records duration.', 'Context', 'ASGI middleware → Router', 'request.state.request_id = "NB100893"', 'Assign trace ID', 'TRACE', 'Generate NB100893, start timer, attach logging context, then await next app.', 'INFO', 'Middleware created trace NB100893'],
        ['Router', 'POST and path match', 'FastAPI matches POST /api/v1/transfer to the transfer endpoint. An incorrect path causes 404 and unsupported method causes 405.', 'Route match', 'Router → Endpoint', '@app.post("/api/v1/transfer")', 'Compare routes', 'ROUTE', 'Compare URL segments, verify POST, select transfer handler, resolve dependencies.', 'INFO', 'Route POST /api/v1/transfer matched'],
        ['Validation', 'Fields inspected one by one', 'Pydantic checks sender, recipient, and amount fields. A malformed or missing field yields a 422 validation response.', 'Validated data', 'Pydantic → Handler', 'TransferRequest(amount=500, to_account="1002")', 'Check typed fields', '422?', 'Check amount is numeric and positive; recipient ID exists; create typed request.', 'INFO', 'Pydantic accepted amount=500 and recipient=1002'],
        ['Identity', 'Token and ownership verified', 'Nova Bank verifies the access credential, loads Anita, checks permissions and verifies ownership of the source account.', 'Identity context', 'Auth dependency → Transfer service', 'Depends(get_current_user)', 'Verify caller', 'AUTH', 'Verify credential, load subject, check account ownership and transfer permission.', 'INFO', 'Authenticated Anita; account ownership confirmed'],
        ['Python Rules', 'Check available funds and bank policy', 'Banking service reads both accounts and checks ₹2,000 available against ₹500 requested, account status, daily limits and risk policies.', 'Business decision', 'Service → Database transaction', 'if sender.balance < amount: reject', 'Apply rules', 'RULES', 'Fetch Anita and Rahul records; compare balance, ensure accounts active, enforce daily limit.', 'INFO', 'Funds check: ₹2,000 ≥ ₹500, transfer approved'],
        ['Data + Services', 'Commit debit, credit and ledger', 'Nova Bank stages a debit of ₹500, a credit of ₹500, one transaction row and two ledger entries. Only commit makes the changes visible.', 'SQL transaction', 'DB → Response', 'COMMIT: accounts + transfer + ledger', 'Commit atomically', 'DB', 'Begin SQL transaction; lock accounts; post debit + credit; append ledger; COMMIT or ROLLBACK.', 'SUCCESS', 'T100893 committed; Anita ₹1,500, Rahul ₹1,200']
      ],
      failures: [
        ['insufficient','Insufficient funds',6,'409 Conflict','Balance is ₹400 but transfer amount is ₹500. No debit, credit or ledger commit happens.'],
        ['token','Expired access token',5,'401 Unauthorized','The bank cannot authenticate the caller; the transfer service does not execute.'],
        ['validation','Invalid transfer amount',4,'422 Unprocessable Entity','The request contains a nonpositive or malformed amount; Pydantic rejects it.'],
        ['route','Route removed',3,'404 Not Found','POST /api/v1/transfer has no registered handler.']
      ],
      msg: 'POST /api/v1/transfer', snapshot: () => {},
    },
    'bank-other': {
      label: 'Nova Bank · different-bank transfer', target: '.v6-progress-node',
      steps: [
        ['Request', 'Anita creates a cross-bank request', 'POST /api/v1/transfers includes ₹500 and Rahul’s other-bank account. Nova Bank authenticates its own customer and records request NB742891.', 'HTTPS', 'Mobile app → Nova Bank', 'POST /api/v1/transfers', 'Build transfer envelope', 'POST', 'App creates a request, adds credential and idempotency key, sends to Nova Bank.', 'INFO', 'Customer request NB742891 received'],
        ['Validate', 'Nova Bank identifies and checks', 'Request validation, authentication, account lookup, available funds and bank policy pass. The bank has not credited Rahul yet.', 'Validation + auth', 'Nova Bank API → Ledger service', 'account=123456789012, amount=500', 'Verify customer and balance', 'AUTH', 'Parse payload, identify Anita, check token/account ownership, verify ₹24,500 balance.', 'INFO', 'Authenticated Anita; transfer details and balance valid'],
        ['Send to Network', 'Sender debit and outbound message', 'Nova Bank records its local debit of ₹500 and an outbound payment instruction with network reference NPCI123456789, then sends it to the payment network.', 'Payment instruction', 'Nova Bank → Interbank network', 'ref=NPCI123456789 amount=500', 'Debit and emit message', 'RAIL', 'Post sender debit with ledger entry, persist outbound message, transmit securely.', 'INFO', 'Nova Bank debit ₹500; outbound reference NPCI123456789'],
        ['Credit at Other Bank', 'Receiving bank locates Rahul', 'The network delivers the instruction to the receiving bank, which validates the bank-to-bank message and separately credits Rahul’s account by ₹500.', 'Incoming payment', 'Network → Receiving Bank', 'beneficiary=432112345678', 'Check and credit beneficiary', 'CREDIT', 'Validate incoming message, deduplicate reference, find beneficiary, post credit + ledger.', 'INFO', 'Receiving bank credited Rahul ₹500'],
        ['Acknowledge', 'Receiving bank returns payment status', 'The receiving bank sends an acknowledgment through the network. Nova Bank matches it to its unique outbound payment reference.', 'Acknowledgment', 'Receiving Bank → Nova Bank', 'ACK NPCI123456789: CREDITED', 'Confirm outcome', 'ACK', 'Publish acknowledgment; network routes to sender; bank correlates by reference.', 'INFO', 'ACK received and matched to outbound payment'],
        ['Respond', 'Nova Bank informs Anita', 'Nova Bank marks the transfer completed and returns a trustworthy status. If a message times out, it must remain pending until confirmed or reconciled.', 'HTTP response', 'Nova Bank → Anita', '200 {"status":"completed"}', 'Close request', '200', 'Update tracking status, return reference and status, preserve audit history.', 'SUCCESS', 'Transfer NB742891 completed; sender/beneficiary ledgers linked']
      ],
      failures: [
        ['receiver','Receiving bank unavailable',3,'PENDING','The sender-side debit/message already exists. Receiving-bank credit is unconfirmed; do not claim completion or automatically retry the debit. Reconcile status.'],
        ['token','Invalid customer session',1,'401 Unauthorized','Nova Bank rejects the customer request before any debit or outbound message.'],
        ['invalid','Wrong beneficiary details',1,'422 / bank rejection','The bank cannot validate beneficiary routing information; no confirmed credit occurs.']
      ],
      msg: 'Bank-to-bank payment instruction'
    },
    store: {
      label: 'Store · shopping checkout', target: '.v6-flow-node',
      steps: [
        ['Web Server', 'Shopper taps Buy Now', 'Browser creates POST /checkout with product P1001, size 9, quantity 1 and a payment credential reference. Uvicorn receives it.', 'HTTPS request', 'Shopper → Store API', 'POST /checkout', 'Create checkout request', 'POST', 'Construct JSON, attach session, send HTTP, receive as ASGI request.', 'INFO', 'POST /checkout received; product=P1001 qty=1'],
        ['Router', 'Checkout endpoint selected', 'FastAPI finds the checkout route using POST and /checkout. Missing route or method would fail here.', 'Route match', 'Router → Checkout handler', '@app.post("/checkout")', 'Find endpoint', 'ROUTE', 'Compare POST+path to configured routes; select checkout handler.', 'INFO', 'Matched POST /checkout'],
        ['Middleware', 'Store assigns request trace', 'Shared middleware adds a request ID, timing and audit context before continuing checkout.', 'Request metadata', 'Middleware → Checkout flow', 'X-Request-ID: ST1032', 'Tag request', 'TRACE', 'Attach request id, capture timing, record checkout context.', 'INFO', 'Checkout trace ST1032 created'],
        ['Validation', 'Quantity and fields scanned', 'Pydantic confirms product ID, size, quantity and payment token fields have the expected shape. Wrong quantity yields 422.', 'Validated cart', 'Pydantic → Handler', 'quantity: PositiveInt = 1', 'Validate typed input', 'CHECK', 'Inspect product ID, size integer, positive quantity and token field.', 'INFO', 'Checkout request validated'],
        ['Identity', 'Shopper account checked', 'Checkout service resolves the authenticated shopper or supported guest checkout context, linking the order to the correct owner.', 'Session', 'Identity → Checkout service', 'user_id=u_458', 'Identify buyer', 'AUTH', 'Verify session cookie or bearer token; associate checkout with u_458.', 'INFO', 'Shopper u_458 authenticated'],
        ['Checkout Rules', 'Business checks current price', 'The service reads the authoritative product record and validates price, cart policies and stock availability.', 'Cart rules', 'Checkout service → Inventory', 'P1001 size=9 qty=1', 'Inspect product', 'RULE', 'Load product, verify sellable status and current price, check quantity limits.', 'INFO', 'Product P1001 sellable for $129'],
        ['Inventory + Orders', 'Reserve one unit safely', 'The inventory service atomically reserves one Air Runner Pro, changing available quantity from 12 to 11. An order draft is linked to the reservation.', 'DB reservation', 'Inventory DB → Payment service', 'reserve(P1001, size=9, qty=1)', 'Reserve stock', 'STOCK', 'Use conditional update / lock to reserve quantity; create pending order record.', 'INFO', 'Stock reserved P1001: 12 → 11'],
        ['Payment Provider', 'Send payment authorization', 'The store sends an authenticated payment request to a payment provider, which authorizes $129; the store does not expose card secrets in browser logs.', 'External API', 'Store → Payment provider', 'authorize($129, idempotency_key)', 'Authorize payment', 'PAY', 'Create provider authorization with idempotency key; verify result; persist reference.', 'INFO', 'Provider returned authorized pay_7712'],
        ['Warehouse / Fulfillment', 'Create final order and send event', 'The checkout workflow confirms order #1032, stores payment status, and publishes FulfillmentRequested via an outbox/queue. Warehouse workers process it separately.', 'Queue event', 'Store → Warehouse', 'FulfillmentRequested(order=1032)', 'Publish fulfillment', 'EVENT', 'Commit final order, persist reliable outbox event, background worker receives it.', 'SUCCESS', 'Order #1032 confirmed; fulfillment event published']
      ],
      failures: [
        ['stock','Product sold out',6,'409 Out of Stock','Inventory 0 cannot satisfy requested quantity. No payment request is created and no order is confirmed.'],
        ['payment','Payment declined',7,'402 / Payment Failed','Stock reservation must be released; no successful order confirmation.'],
        ['token','Expired checkout session',4,'401 Unauthorized','Checkout is stopped before any reservation or payment.'],
        ['route','Missing checkout route',1,'404 Not Found','POST /checkout does not match a registered endpoint.']
      ],
      msg: 'POST /checkout'
    },
    restaurant: {
      label: 'Restaurant · order to kitchen', target: '.v6-rest-node, .v6-side-events .v6-tile',
      steps: [
        ['Web Server', 'Diner places Chicken Biryani order', 'The diner app creates POST /orders with menu item biryani_1, quantity 1 and delivery details; the restaurant receives it.', 'HTTPS request', 'Diner → Restaurant API', 'POST /orders', 'Receive food order', 'POST', 'Collect menu item, address and payment choice; send JSON to restaurant.', 'INFO', 'POST /orders received; item=biryani_1'],
        ['Router', 'Restaurant order route matched', 'The API router selects the POST /orders endpoint rather than unrelated menu or delivery endpoints.', 'Route match', 'Router → Order handler', '@app.post("/orders")', 'Match path/method', 'ROUTE', 'Find the request handler registered for order creation.', 'INFO', 'Matched POST /orders'],
        ['Identity', 'Link request to diner', 'The service checks the customer credential and matches the saved delivery address to the correct customer account.', 'Customer context', 'Identity → Order service', 'customer_id=8421', 'Verify diner', 'AUTH', 'Validate session and allowed order actions, load customer 8421.', 'INFO', 'Customer 8421 authenticated'],
        ['Validation', 'Menu and address fields checked', 'Pydantic checks the fields and the service verifies the menu item and delivery address can be interpreted.', 'Validated order', 'Pydantic → Business rules', 'item_id=biryani_1, quantity=1', 'Check order fields', 'CHECK', 'Check item ID, quantity, address and payment mode are present and well formed.', 'INFO', 'Order payload validated'],
        ['Order Rules', 'Restaurant checks its ability to serve', 'The restaurant determines whether it is open, Chicken Biryani is available and 3.2 km delivery is within the service area.', 'Business decision', 'Rules → Orders DB', 'is_open && in_stock && serviceable', 'Approve the order', 'RULE', 'Check opening hours, menu availability, inventory and service radius.', 'INFO', 'Restaurant open; menu available; address serviceable'],
        ['Menu + Orders DB', 'Persist the order as a row', 'Restaurant inserts order #1032 and an order-created/outbox record. The new order appears in the restaurant’s database.', 'SQL write', 'Orders DB → Event worker', 'INSERT orders(id=1032, status=PLACED)', 'Create durable order', 'DB', 'Open transaction; create order record and durable event; COMMIT.', 'INFO', 'Order #1032 committed in restaurant DB'],
        ['Kitchen Queue', 'Cook receives a kitchen ticket', 'A background publisher delivers kitchen.new_order to the queue. Kitchen subscriber creates a ticket and acknowledges receipt.', 'Event message', 'Queue → Kitchen screen', 'kitchen.new_order: #1032', 'Deliver ticket', 'QUEUE', 'Publish order.created via reliable outbox; consume it; display kitchen ticket.', 'INFO', 'Kitchen ticket #1032 received'],
        ['Delivery / Notifications', 'Customer gets the result and updates', 'The restaurant returns order confirmation, sends a notification, then a separate delivery workflow updates status as the meal is prepared.', 'Notification + status', 'Restaurant → Diner / Delivery', '201 {"order_id":1032}', 'Confirm and notify', '201', 'Send response to app, queue notification, track preparation and delivery separately.', 'SUCCESS', 'Order #1032 confirmed; notifications queued']
      ],
      failures: [
        ['closed','Restaurant closed',4,'409 Restaurant Closed','The restaurant cannot accept this order now. No new order row or kitchen ticket is created.'],
        ['validation','Missing delivery address',3,'422 Unprocessable Entity','Order input fails validation before menu and kitchen processing.'],
        ['token','Unauthenticated diner',2,'401 Unauthorized','Restaurant refuses to create an order for an unknown customer.'],
        ['queue','Kitchen queue unavailable',6,'PENDING RETRY','The order exists and must not be duplicated; a durable event retries delivery to the kitchen.']
      ],
      msg: 'POST /orders'
    }
  };

  const sessions = {};
  let current = 'bank-same';
  const qs = (root,sel) => root.querySelector(sel);
  const qsa = (root,sel) => [...root.querySelectorAll(sel)];
  const escape = (s) => String(s).replace(/[&<>"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
  const activeScene = () => document.getElementById('scene-'+current);
  const markers = {
    'bank-same': [null,...qsa(document.getElementById('scene-bank-same'), '.v6-machine')],
    'bank-other': qsa(document.getElementById('scene-bank-other'), '.v6-progress-node'),
    store: qsa(document.getElementById('scene-store'), '.v6-flow-node'),
    restaurant: qsa(document.getElementById('scene-restaurant'), '.v6-rest-node').concat(qsa(document.getElementById('scene-restaurant'), '.v6-side-events .v6-tile'))
  };

  function stageElement(key,index) {
    if(key==='bank-other'){
      const scene=document.getElementById('scene-bank-other');
      return [
        qs(scene,'.v6-side-customer .v6-phone'),
        qsa(scene,'.v6-side-bank')[0]?.querySelector('.v6-mini-system:nth-child(2)'),
        qs(scene,'.v6-network-core'),
        qsa(scene,'.v6-side-bank')[1]?.querySelector('.v6-mini-system:nth-child(2)'),
        qsa(scene,'.v6-side-bank')[1]?.querySelector('.v6-mini-system:nth-child(3)'),
        qs(scene,'.v6-side-customer .v6-phone')
      ][index] || markers[key][index];
    }
    return markers[key][index] || qs(document.getElementById('scene-'+key),'.v6-phone');
  }
  function makeControl(key){
    const scene=document.getElementById('scene-'+key), conf=T[key];
    const outer=document.createElement('section');outer.className='v6-live-rail';outer.setAttribute('aria-label','Interactive execution controls');
    outer.innerHTML=`<div class="v6-live-controls"><button data-do="play" class="v6-control-primary" aria-label="Play or pause">▶ Play request</button><button data-do="back" aria-label="Previous step">◀</button><button data-do="next" aria-label="Next step">Next ▶</button><button data-do="reset" aria-label="Reset request">↺ Reset</button><label>Speed <select data-do="speed"><option value="2200">Slow</option><option value="1350" selected>Normal</option><option value="700">Fast</option></select></label><label>Experiment <select data-do="failure"><option value="none">Successful request</option>${conf.failures.map(f=>`<option value="${f[0]}">${escape(f[1])}</option>`).join('')}</select></label><span class="v6-sim-badge">INTERACTIVE SIMULATION</span></div><div class="v6-active-story"><div class="v6-story-indicator" aria-live="polite">Ready to start</div><div class="v6-story-content"><b>Tap the app action to create the request.</b><span>Watch the request travel through the systems and change records when a write commits.</span></div><div class="v6-story-micro"><span class="v6-progress-micro" style="--micro:0%"></span><span data-stage-count>0 / ${conf.steps.length}</span></div></div><div class="v6-operations"><div class="v6-op-label">WHAT THIS MACHINE ACTUALLY DOES</div><div class="v6-op-list" aria-live="polite">Prepare request → trace request → inspect logs / database</div><div class="v6-payload-row"><span class="v6-payload-type">HTTP</span><span class="v6-payload-text">${escape(conf.msg)}</span></div></div>`;
    scene.querySelector('.v6-header').insertAdjacentElement('afterend',outer);
    outer.addEventListener('click',e=>{
      const b=e.target.closest('button[data-do]');if(!b)return;
      switch(b.dataset.do){case'play':toggle(key);break;case'next':stop(key);update(key,Math.min(conf.steps.length-1,sessions[key].index+1),true);break;case'back':stop(key);update(key,Math.max(0,sessions[key].index-1),true);break;case'reset':reset(key);break;}
    });
    qs(outer,'[data-do="speed"]').addEventListener('change',()=>{if(sessions[key].playing){stop(key);toggle(key);}});
    qs(outer,'[data-do="failure"]').addEventListener('change',()=>reset(key));
    const packet=document.createElement('div');packet.className='v6-packet v6-packet-hidden';packet.innerHTML='<span class="v6-packet-symbol">✈</span><span class="v6-packet-tag">HTTPS</span>';document.body.appendChild(packet);
    const chip=document.createElement('div');chip.className='v6-machine-animation';chip.innerHTML='<span class="v6-machine-glow"></span><span class="v6-machine-spinner"></span><span class="v6-machine-work">CHECKING…</span>';
    sessions[key]={root:outer,index:-1,playing:false,timer:null,packet,chip,lastNode:null,fail:null};
    qsa(scene,conf.target).forEach((node,i)=>{node.setAttribute('tabindex','0');node.setAttribute('role','button');node.setAttribute('aria-label',`Inspect ${conf.steps[i]?.[0]||'step'}`);node.addEventListener('click',()=>{stop(key);update(key,i,true);});node.addEventListener('keydown',e=>{if(['Enter',' '].includes(e.key)){e.preventDefault();stop(key);update(key,i,true);}});});
    // Make visual customer actions actually trigger the run.
    qsa(scene,'.v6-send-btn').forEach(el=>{el.setAttribute('role','button');el.setAttribute('tabindex','0');el.style.cursor='pointer';el.addEventListener('click',()=>{reset(key);toggle(key);});el.addEventListener('keydown',e=>{if(['Enter',' '].includes(e.key)){e.preventDefault();reset(key);toggle(key);}});});
    // Existing timeline now works as an interactive seekbar.
    if(key==='bank-same'){
      qsa(scene,'.v6-time-step').forEach((node,i)=>node.addEventListener('click',()=>{stop(key);update(key,i,true);}));
      const btn=qs(scene,'.v6-play-btn');btn.setAttribute('role','button');btn.setAttribute('tabindex','0');btn.style.cursor='pointer';btn.addEventListener('click',()=>toggle(key));btn.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle(key);}});
    }
    if(key==='bank-other'){
      qsa(scene,'.v6-inspector-tab').forEach((node,i)=>node.addEventListener('click',()=>{qsa(scene,'.v6-inspector-tab').forEach(n=>n.classList.remove('active'));node.classList.add('active');const body=qs(scene,'#interbank-json');const entries=[{requestId:'NB742891',amount:500,from:'Nova Bank',to:'HDFC Bank',beneficiary:'Rahul Singh'},{reference:'NPCI123456789',type:'PAYMENT_INSTRUCTION',amount:500,beneficiaryBank:'HDFC'},{reference:'NPCI123456789',status:'CREDITED',source:'Receiving Bank'},{requestId:'NB742891',status:'COMPLETED',http:200}];body.textContent=JSON.stringify(entries[i],null,2);}));
    }
    if(key==='store'){
      // Allow comparison buttons to replay the actual outcomes.
      qsa(scene,'.v6-compare-box').forEach((el,i)=>{el.setAttribute('role','button');el.setAttribute('tabindex','0');el.addEventListener('click',()=>{qs(outer,'[data-do="failure"]').value=i?'stock':'none';reset(key);toggle(key);});});
    }
    if(key==='restaurant')qsa(scene,'.v6-compare-box').forEach((el,i)=>el.addEventListener('click',()=>{qs(outer,'[data-do="failure"]').value=i?'closed':'none';reset(key);toggle(key);}));
  }
  function currentFail(key){const x=qs(sessions[key].root,'[data-do="failure"]').value;return T[key].failures.find(f=>f[0]===x)||null;}
  function stop(key){const s=sessions[key];s.playing=false;if(s.timer)clearTimeout(s.timer);s.timer=null;const btn=qs(s.root,'[data-do="play"]');btn.textContent='▶ Play request';}
  function reset(key){stop(key);sessions[key].index=-1;sessions[key].lastNode=null;sessions[key].packet.classList.add('v6-packet-hidden');sessions[key].chip.remove();qsa(document.getElementById('scene-'+key),'.v6-stage-current,.v6-stage-done,.v6-stage-error').forEach(n=>n.classList.remove('v6-stage-current','v6-stage-done','v6-stage-error'));const story=qs(sessions[key].root,'.v6-story-content');story.innerHTML='<b>Tap the app action to create a request.</b><span>Each stage will animate and display the operation it performs.</span>';qs(sessions[key].root,'.v6-story-indicator').textContent='Ready to start';qs(sessions[key].root,'[data-stage-count]').textContent=`0 / ${T[key].steps.length}`;qs(sessions[key].root,'.v6-op-list').textContent='Prepare request → trace request → inspect logs / database';qs(sessions[key].root,'.v6-progress-micro').style.setProperty('--micro','0%');qsa(document.getElementById('scene-'+key),'.v6-logs .v6-log').forEach(n=>n.classList.add('v6-reveal-hidden'));applyData(key,-1,null);if(key==='bank-same'){qsa(document.getElementById('scene-'+key),'.v6-time-step').forEach(n=>n.classList.remove('active'));} renderStatus(key,-1,false);renderLogs(key,-1,null); }
  function toggle(key){const s=sessions[key];if(s.playing){stop(key);return;}const f=currentFail(key);if(s.index>=T[key].steps.length-1 || (f && s.index>=f[2]))reset(key);s.playing=true;qs(s.root,'[data-do="play"]').textContent='Ⅱ Pause';function tick(){if(!s.playing)return;const idx=s.index+1;if(idx>=T[key].steps.length){stop(key);return;}update(key,idx,true);if(s.fail&&idx>=s.fail[2]){stop(key);return;}if(idx===T[key].steps.length-1){s.timer=setTimeout(()=>stop(key),Number(qs(s.root,'[data-do="speed"]').value));return;}s.timer=setTimeout(tick,Number(qs(s.root,'[data-do="speed"]').value));}tick();}
  function animatePacket(key,target,kind,fast){const s=sessions[key],packet=s.packet;const rect=target.getBoundingClientRect();if(!rect.width||!rect.height)return;let x=rect.left+rect.width/2,y=rect.top+Math.min(rect.height/2,52);
    const old=packet.getBoundingClientRect();packet.classList.remove('v6-packet-hidden');packet.querySelector('.v6-packet-tag').textContent=kind;
    if(!s.lastNode||s.index===0 || !old.width){packet.style.left=`${x-25}px`;packet.style.top=`${y-28}px`;packet.classList.add('v6-packet-arrived');setTimeout(()=>packet.classList.remove('v6-packet-arrived'),450);return;}
    packet.style.left=`${x-25}px`;packet.style.top=`${y-28}px`;
    if(!fast&&packet.animate)packet.animate([{transform:`translate(${(old.left+old.width/2)-x}px,${(old.top+old.height/2)-y}px) scale(.85)`,opacity:.78,filter:'drop-shadow(0 0 20px #2fe4ff)'},{transform:'translate(0,0) scale(1.14)',opacity:1,filter:'drop-shadow(0 0 12px #26eeff)'}],{duration:850,easing:'cubic-bezier(.16,.8,.28,1)'});
  }
  function update(key,index,seek=false){const s=sessions[key],config=T[key];const f=currentFail(key);s.fail=f;const failHere=f&&index>=f[2];if(failHere) index=f[2];s.index=index;
    const stage=config.steps[index],scene=document.getElementById('scene-'+key),target=stageElement(key,index);if(!stage||!target)return;
    qsa(scene,config.target).forEach((n,i)=>{n.classList.toggle('v6-stage-current',i===index-(key==='bank-same'?1:0));n.classList.toggle('v6-stage-done',i<index-(key==='bank-same'?1:0));n.classList.toggle('v6-stage-error',!!failHere&&i===index-(key==='bank-same'?1:0));});
    if(key==='bank-same')qsa(scene,'.v6-time-step').forEach((n,i)=>n.classList.toggle('active',i===index));
    if(key==='bank-other')qsa(scene,'.v6-progress-node').forEach((n,i)=>n.classList.toggle('active',i===index));
    const chip=s.chip;if(chip.parentNode)chip.remove();target.appendChild(chip);chip.querySelector('.v6-machine-work').textContent=failHere?'STOPPED':stage[7];
    const indicator=qs(s.root,'.v6-story-indicator');indicator.textContent=failHere?`${f[3]} · ${f[1]}`:`STEP ${index+1}/${config.steps.length} · ${stage[0]}`;indicator.classList.toggle('v6-error-text',!!failHere);
    const story=qs(s.root,'.v6-story-content');story.innerHTML=`<b>${escape(failHere?'Request stopped: '+f[1]:stage[1])}</b><span>${escape(failHere?f[4]:stage[2])}</span>`;
    qs(s.root,'[data-stage-count]').textContent=`${index+1} / ${config.steps.length}`;
    qs(s.root,'.v6-progress-micro').style.setProperty('--micro',`${((index+1)/config.steps.length)*100}%`);
    const fragments=stage[8].split(/[;,]/).map(x=>x.trim()).filter(Boolean);qs(s.root,'.v6-op-list').innerHTML=fragments.map((v,i)=>`<span class="v6-micro-token" style="animation-delay:${i*130}ms">${i+1}. ${escape(v)}</span>`).join('<span class="v6-micro-arrow">→</span>');
    qs(s.root,'.v6-payload-type').textContent=stage[3];qs(s.root,'.v6-payload-text').textContent=stage[4]+' · '+stage[5];
    renderLogs(key,index,failHere?f:null);applyData(key,index,failHere?f:null);highlightCode(key,index);renderStatus(key,index,failHere);
    s.packet.classList.toggle('v6-packet-error',!!failHere);animatePacket(key,target,stage[3],seek);
    s.lastNode=target;
  }
  function renderLogs(key,index,f){
    const scene=document.getElementById('scene-'+key), config=T[key];
    const list=qs(scene,'.v6-logs');if(!list)return;
    list.innerHTML='';
    for(let i=0;i<=index;i++){
      if(f && i===f[2])break;
      const st=config.steps[i], level=String(st[9]).toLowerCase();
      const row=document.createElement('div'); row.className=`v6-log ${level==='success'?'success':'info'} ${i===index?'v6-log-now':''}`;
      row.innerHTML=`<span>${String(i+1).padStart(2,'0')}:00</span><span class="lvl">${escape(st[9])}</span><span>${escape(st[10])}</span>`;
      list.appendChild(row);
    }
    if(f){const row=document.createElement('div');row.className='v6-log error v6-injected-error-log';row.innerHTML=`<span>TRACE</span><span class="lvl">ERROR</span><span>${escape(f[3]+': '+f[4])}</span>`;list.appendChild(row);}
    list.scrollTop=list.scrollHeight;
  }
  function renderStatus(key,index,failed){
    const scene=document.getElementById('scene-'+key);
    const pill=key==='bank-same'?qs(scene,'.v6-end-status'):key==='store'||key==='restaurant'?qs(scene,'.v6-header .v6-pill.green'):null;
    if(!pill)return;
    pill.classList.toggle('v6-status-failed',!!failed);
    const complete=index===T[key].steps.length-1;
    pill.textContent=failed?'✖ Stopped':index<0?'○ Ready':complete?'✔ Complete':'◉ Processing';
  }
  function highlightCode(key,index){const scene=document.getElementById('scene-'+key),code=qs(scene,'.v6-code:not(.v6-curl)');if(!code)return;if(!code.dataset.linesPrepared){const html=code.innerHTML.split('\n');code.innerHTML=html.map((line,i)=>`<span class="v6-highlight-line" data-line="${i}">${line||' '}</span>`).join('\n');code.dataset.linesPrepared='true';}const lines=qsa(code,'.v6-highlight-line');lines.forEach(l=>l.classList.remove('v6-code-now'));const mapping=key==='bank-same'?[0,1,2,0,4,0,7,9]:key==='store'?[8,8,8,4,9,11,12,13,15]:key==='restaurant'?[0,0,1,2,3,5,7,10]:[0,0,1,2,3,4];if(lines.length)lines[Math.min(mapping[index]||0,lines.length-1)].classList.add('v6-code-now');}
  function applyData(key,index,fail){const scene=document.getElementById('scene-'+key);
    if(key==='bank-same'){
      const target=index<6||fail?'before':index===6?'during':'after';
      const view=index<7||fail?'before':'after';const btn=qs(scene,`.v6-view-tab[data-view="${view}"]`);if(btn){btn.click();}
      // avoid displaying transfer rows, ledger entries until commit stage
    }
    if(key==='bank-other'){
      const panels=qsa(scene,'.v6-side-bank');
      const sender=panels[0]?.querySelector('.v6-table-card tbody tr:first-child td:last-child');
      const receiver=panels[1]?.querySelector('.v6-table-card tbody tr:first-child td:last-child');
      if(sender)sender.innerHTML=index>=2 && (!fail||fail[2]>=3)?'<span class="v6-chip-warn">₹24,500 → ₹24,000</span>':'₹24,500';
      if(receiver)receiver.innerHTML=index>=3 && !fail?'<span class="v6-chip-pos">₹3,200 → ₹3,700</span>':'₹3,200';
      const rows=qsa(scene,'.v6-data-changes tbody tr');rows.forEach((r,i)=>{if(i===1){r.classList.toggle('v6-reveal-hidden',index<2||!!fail&&fail[2]<2);}if(i===3){r.classList.toggle('v6-reveal-hidden',index<3||!!fail);}});
      const accounts=qsa(scene,'.v6-bank-panel-title + .v6-small-muted');void accounts;
    }
    if(key==='store'){
      const inv=qsa(scene,'.v6-data-row-3 .v6-table-card')[0],ord=qsa(scene,'.v6-data-row-3 .v6-table-card')[1],pay=qsa(scene,'.v6-data-row-3 .v6-table-card')[2];
      const preInv=inv&&qs(inv,'tbody tr:first-child td:nth-child(4)');if(preInv)preInv.textContent=index<6||!!fail?'12':'12 → 11';
      const orderRow=ord&&qs(ord,'tbody tr:first-child');if(orderRow)orderRow.classList.toggle('v6-reveal-hidden',index<8||!!fail);
      const payRow=pay&&qs(pay,'tbody tr:first-child');if(payRow)payRow.classList.toggle('v6-reveal-hidden',index<7||!!fail);
      const events=qsa(scene,'.v6-event-chip');events.forEach((el,i)=>el.classList.toggle('v6-reveal-hidden',!!fail||index<(i===2?6:i===1?7:8)));
    }
    if(key==='restaurant'){
      const orderRow=qs(scene,'.v6-rest-middle .v6-table-card:nth-child(2) tbody tr:first-child');if(orderRow)orderRow.classList.toggle('v6-reveal-hidden',index<5||!!fail&&fail[2]<=5);
      const ticket=qs(scene,'.v6-queue-ticket.active');if(ticket)ticket.classList.toggle('v6-reveal-hidden',index<6||!!fail);
      qsa(scene,'.v6-status-item').forEach((n,i)=>n.classList.toggle('v6-reveal-hidden',!!fail||index<(i<2?5:i<3?6:7)));
    }
  }
  function displayCurrent(){return current;}
  qsa(document,'.v6-switch-btn').forEach(btn=>btn.addEventListener('click',()=>{stop(current);sessions[current].packet.classList.add('v6-packet-hidden');sessions[current].chip.remove();current=btn.dataset.scene;reset(current);},{capture:false}));
  Object.keys(T).forEach(makeControl);
  Object.keys(T).forEach(reset);
  // Run with spacebar when the user isn't typing in a control.
  document.addEventListener('keydown',e=>{if(e.code==='Space'&&!['INPUT','TEXTAREA','SELECT','BUTTON'].includes(document.activeElement.tagName)){e.preventDefault();toggle(displayCurrent());}});
  window.V6Theater={getState:(key=current)=>({scenario:key,step:sessions[key].index,playing:sessions[key].playing,failure:currentFail(key)?.[0]||null}),seek:(key,index)=>{stop(key);update(key,index,true);},play:(key=current)=>toggle(key),reset:(key=current)=>reset(key)};
})();
