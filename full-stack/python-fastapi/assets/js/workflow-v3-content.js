/* Tiny, teachable actions inside each backend station. Every value comes from the live scenario state.
   Educational simulator; this is NOT a cryptographic, banking, payment, or network implementation. */
(() => {
'use strict';
const v = (x)=>String(x);
const amount=x=>'₹'+Number(x).toLocaleString('en-IN');
const pairs=(...parts)=>parts;
const event=(title,explain,inside,outside)=>({title,explain,input:inside,output:outside});
const get=(scene,step,c,r)=>{
 const path=window.FastAPIWorkflowEngine.definitions[scene].path;
 const failing=!r.ok&&r.at===step;
 const label={bank:'Transfer',shop:'Checkout',delivery:'Food order'}[scene];
 const payload=scene==='bank'?`amount=${c.amount}, recipient=Rahul`:scene==='shop'?`quantity=${c.quantity}, sku=SNKR-77`:`meal=${c.meal==='empty'?'missing':c.meal}`;
 const inputs=pairs(['Action',label],['HTTP',`${c.method} ${path}`]);
 const out=(name,value)=>pairs([name,value]);
 if(step===1) return {
  title:'A real web request arrives', machine:'GATEWAY / ASGI SERVER',visual:'gateway',input:inputs.concat([['Body',payload]]),output:out('Next', 'Request passed to ASGI application'),
  technical:'A browser sends bytes over an HTTP connection. Uvicorn accepts the connection and speaks ASGI, exposing a scope plus receive/send callables to the FastAPI/Starlette application. The HTTP protocol layer does not perform a bank transfer or choose business rules. The network stack and TLS termination may involve infrastructure outside Uvicorn.',
  actions:[
   event('1 · A tap becomes an HTTP request',`The ${label.toLowerCase()} app prepares ${c.method} ${path}. Its data is the note inside the envelope.`,pairs(['Method',c.method],['Path',path]),out('Envelope', 'Ready to deliver')),
   event('2 · The web server receives it','Uvicorn reads the incoming HTTP request and handles its connection.',pairs(['Connection','HTTP / HTTPS infrastructure'],['Method',c.method]),out('Server','Accepted the request connection')),
   event('3 · An ASGI message is prepared','ASGI is the language Uvicorn uses to talk to the Python web application.',pairs(['Scope','method, path, headers'],['Body','received as a stream']),out('ASGI scope','Created for this request')),
   event('4 · FastAPI gets the request','The web server hands the request to the application. Business decisions have not happened yet.',pairs(['Destination','FastAPI app'],['Data',payload]),out('Next','Application middleware'))]
 };
 if(step===2) return {
  title:'Shared tasks run around the request',machine:'MIDDLEWARE / CONVEYOR',visual:'middleware',input:inputs.concat([['Example policy','Request logging']]),output:out('Result','Request is tracked before routing'),
  technical:'ASGI middleware wraps the downstream app. A common logging middleware attaches a request identifier and measures elapsed time; it can inspect request/response objects, short-circuit a request, and modify response headers. CORS is a browser cross-origin policy: it is not an authorization scheme, and a denied preflight can stop the flow before the endpoint. This demo shows a logging middleware, not a complete CORS engine.',
  actions:[event('1 · Put the request on the belt','Every incoming request passes through common middleware before the endpoint.',inputs,out('Position','Entered the app wrapper')),
   event('2 · Assign a request ID','A tracking number helps developers find logs for one request.',pairs(['Request ID','demo-req-1042'],['Method',c.method]),out('Trace','demo-req-1042')),
   event('3 · Start the timer','The middleware remembers when this request started.',pairs(['Timing','Start timestamp'],['Log',`${c.method} ${path}`]),out('Telemetry','Timing started')),
   event('4 · Pass it forward','Logging is done for now. The middleware will also see the outgoing response.',pairs(['Shared check','Log and timing'],['Next','Router']),out('Next','Downstream application'))]
 };
 if(step===3){
  const wrong=c.method!=='POST';const missing=c.route==='missing';const routeOutcome=failing?(missing?'404 Not Found':'405 Method Not Allowed'):'Route matched';
  return {title:'Find the right Python doorway',machine:'ROUTER / SWITCHBOARD',visual:'router',input:inputs.concat([['Registered',missing?'Route removed':'POST '+path]]),output:out('Match',routeOutcome),
  technical:'Starlette route matching compares path patterns and HTTP methods. Route order matters, especially when static paths and parameterized paths could both match. A path with no match commonly returns 404; a known path with an unsupported method returns 405. The endpoint function is selected only when matching succeeds. This simplified board contains a few representative routes.',
  actions:[event('1 · Read the label on the envelope',`The plane carries ${c.method} ${path}. The router reads both fields.`,inputs,out('Route key',`${c.method} ${path}`)),
   event('2 · Search the route table','FastAPI checks registered routes, not the customer name or item price.',pairs(['Candidate',`GET ${path}`],['Candidate',`POST ${path}`]),out('Candidates', 'Compared in order')),
   event('3 · Compare the method and path',missing?'The POST endpoint has been removed. No path matches.':wrong?'The path exists, but GET is not permitted here.':`The registered POST ${path} endpoint matches the request.`,pairs(['Path exists?',missing?'No':'Yes'],['Method matches?',missing?'No':wrong?'No':'Yes']),out('Decision',routeOutcome)),
   event('4 · Choose a destination',failing?'The router returns an error immediately; validation and database work do not run.':'The router selects the Python handler that will process this request.',pairs(['HTTP status',failing?String(r.status):'Matching'],['Selected',failing?'None':'Python endpoint']),out('Next',failing?routeOutcome:'Request processing'))]
  };
 }
 if(step===4){
  const field=scene==='bank'?'amount':scene==='shop'?'quantity':'meal';const value=scene==='bank'?v(c.amount):scene==='shop'?v(c.quantity):c.meal==='empty'?'MISSING':v(c.meal);
  const rule=scene==='delivery'?'required text':'positive whole number'; const status=failing?'422 Validation error':'Validated value';
  return {title:'Inspect the body, field by field',machine:'PYDANTIC / SCHEMA CHECKER',visual:'validation',input:pairs(['Request field',field],['Received',value],['Rule',rule]),output:out('Validation',status),
   technical:'FastAPI uses Pydantic models and type annotations to parse and validate request data. Required missing fields, incompatible types, or violated constraints can produce RequestValidationError and HTTP 422. A positive-number constraint must be declared explicitly, such as Field(gt=0) or a validator; annotating an int alone does not forbid negative numbers. Dependency and body validation order can vary depending on the dependency graph; the diagram teaches a conceptual order.',
   actions:[event('1 · Open the JSON envelope','The request body is parsed so the application can inspect its fields.',pairs(['Body',`{ ${field}: ${value} }`]),out('Parsed','Candidate input fields')),
    event('2 · Look for required fields',`The checker expects a field named ${field}. ${value==='MISSING'?'It was not supplied.':'It is present.'}`,pairs(['Expected',field],['Received',value]),out('Presence',value==='MISSING'?'Missing':'Present')),
    event('3 · Check type and allowed value',scene==='delivery'?'A meal name must be provided.':'The number must be a whole number greater than zero.',pairs(['Value',value],['Constraint',rule]),out('Value check',failing?'Failed':'Passed')),
    event('4 · Produce a clean model',failing?'The checker reports HTTP 422 and prevents business rules from running.':`The validated ${field} is ready for the endpoint to use.`,pairs(['Result',status]),out('Next',failing?'Stop · 422':'Validated input'))]
  };
 }
 if(step===5){
  const identity=c.identity==='missing'?'MISSING':c.identity==='expired'?'EXPIRED':c.identity==='limited'?'RESTRICTED':'DEMO VALID';
  return {title:'Confirm who is asking and what they can do',machine:'IDENTITY / PERMISSION CHECKPOINT',visual:'auth',input:pairs(['Credential state',identity],['Protected action',label],['Example permission','Allowed for demo user']),output:out('Decision',failing?`${r.status} Access denied`:'Allowed'),
   technical:'For a real JWT, a trusted library must parse and verify the signature against a trusted key, enforce an algorithm allowlist, check exp/nbf and issuer/audience where applicable, and apply authorization policy/scopes. Reading base64 payload claims is not proof of authenticity. OAuth2 and OpenID Connect govern delegated authorization and identity protocols; OAuth is not itself JWT validation. This offline lab deliberately uses identity presets and does NOT generate or cryptographically verify tokens.',
   actions:[event('1 · Look for a credential','The protected endpoint expects proof that someone has signed in.',pairs(['Authorization',identity==='MISSING'?'No bearer header':'Bearer <demo credential>']),out('Credential',identity==='MISSING'?'Not present':'Present')),
    event('2 · Check whether it is usable',identity==='EXPIRED'?'The example token is too old.':identity==='MISSING'?'No credential means this check fails.':'The selected demo credential passes its freshness preset.',pairs(['Expiry preset',identity]),out('Usable?',identity==='MISSING'||identity==='EXPIRED'?'No':'Yes')),
    event('3 · Read user and permission context','The app compares this demo user’s permission against the requested action.',pairs(['User','Demo customer'],['Permission',identity==='RESTRICTED'?'Insufficient':'Transfer / purchase / order']),out('Permission',identity==='RESTRICTED'?'Denied':'Allowed')),
    event('4 · Open or close the gate',failing?`Access is denied with ${r.status}. No business operation runs.`:'The security dependency lets the request continue.',pairs(['Final security result',failing?String(r.status):'Allowed']),out('Next',failing?'Stop at security':'Python business logic'))]
  };
 }
 if(step===6){
  let ours,asked,rule,text,why;
  if(scene==='bank'){ours=amount(c.balance);asked=amount(c.amount);rule='Available balance ≥ transfer';text=failing?'Insufficient funds':'Funds available';why=`Compare ${amount(c.balance)} against ${amount(c.amount)}.`;}
  else if(scene==='shop'){ours=`${c.stock} pairs`;asked=`${c.quantity} pairs`;rule='Stock ≥ quantity';text=failing?'Not enough inventory':'Inventory available';why=`Compare ${c.stock} pairs against ${c.quantity} requested.`;}
  else{ours=c.restaurant==='open'?'OPEN':'CLOSED';asked=c.meal==='empty'?'No meal':c.meal;rule='Restaurant open for orders';text=failing?'Restaurant is closed':'Restaurant can accept';why=`The restaurant is ${c.restaurant}.`}
  return {title:'Apply the rules of this business',machine:'PYTHON / DECISION ENGINE',visual:'rules',input:pairs(['Available',ours],['Requested',asked],['Policy',rule]),output:out('Decision',text),
   technical:scene==='bank'?'Business rules must run against authoritative server-side state, not a client-submitted balance. Real transfers need authorization of source account ownership, transfer limits, idempotency, database isolation/locking, durable ledgers and audit trails. A pre-check alone is not sufficient against concurrent transfers.':scene==='shop'?'Real stock reservation and payment confirmation are separate systems. Concurrency protection, idempotency keys and reconciliation are necessary; the sample simplifies an order to a single narrative. A merchant must not treat a payment request as final settlement.':'Real fulfillment checks include restaurant hours, item availability, serviceable address, payment policy and delivery capacity. Accepted status does not mean the courier has delivered food.',
   actions:[event('1 · Load the current business facts','The server reads the amount, inventory or restaurant state it trusts.',pairs(['Available',ours]),out('Facts', 'Loaded from demo state')),
    event('2 · Apply the rule',why,pairs(['Rule',rule],['Requested',asked]),out('Comparison',text)),
    event('3 · Decide: yes or no',failing?`The requested action breaks this business rule, so the Python function refuses it.`:'The action is allowed to continue to storage and services.',pairs(['Decision',text]),out('Next',failing?'No changes permitted':'Continue to services')),
    event('4 · Prepare safe next actions',failing?`Return ${r.status} rather than attempting a partial operation.`:'Prepare the data operation and response strategy.',pairs(['Ready?',failing?'No':'Yes']),out('Next',failing?'Stop · '+r.status:'Database/services'))]
  };
 }
 if(step===7){
  if(scene==='bank'){
   const a=amount(c.balance),b=amount(c.recipient),nextA=amount(c.balance-c.amount),nextB=amount(c.recipient+c.amount);
   return {title:'Move two account balances as one safe transaction',machine:'DATABASE / LEDGER TRANSACTION',visual:'ledger',input:pairs(['Anita before',a],['Rahul before',b],['Transfer',amount(c.amount)]),output:pairs(['Anita after',failing?a:nextA],['Rahul after',failing?b:nextB],['Commit',failing?'NO · rolled back':'YES · atomic']),
    technical:'A production financial system uses an auditable double-entry ledger, transactional integrity, idempotency and concurrency control. A real implementation cannot guarantee correctness by separately updating two balances without isolation. In this teaching simulation the two changes are shown as a single all-or-nothing unit; a database outage leaves state unchanged.',
    actions:[event('1 · Start one transaction','The database begins a work unit that must succeed completely.',pairs(['Transaction','BEGIN'],['Anita',a],['Rahul',b]),out('Transaction','Open')),
     event('2 · Prepare both updates',`The proposed result is Anita ${nextA} and Rahul ${nextB}. Both values are staged together.`,pairs(['Anita planned',nextA],['Rahul planned',nextB]),out('Committed?','Not yet')),
     event('3 · Check the storage operation',failing?'The database is unavailable. The planned changes cannot be saved.':'The example database operation can finish successfully.',pairs(['Connection',c.database==='online'?'Connected':'Offline']),out('Write status',failing?'Failed':'Ready')),
     event('4 · Commit or roll back',failing?'ROLLBACK: both balances stay exactly as they were.':'COMMIT: debit and credit become visible together.',pairs(['Action',failing?'ROLLBACK':'COMMIT']),out('Final balances',failing?`${a} / ${b}`:`${nextA} / ${nextB}`))]
    };
  }
  if(scene==='shop'){
   const problem=c.gateway==='offline'?'Gateway unavailable':c.payment==='declined'?'Payment declined':'';
   return {title:'Check payment and coordinate an order',machine:'PAYMENT / ORDER / STOCK',visual:'checkout',input:pairs(['Sneakers available',`${c.stock} pairs`],['Customer wants',`${c.quantity} pairs`],['Gateway',c.gateway]),output:pairs(['Payment',failing?problem:'Demo approved'],['Order',failing?'Not created':'ORD-1024'],['Stock after',failing?v(c.stock):v(c.stock-c.quantity)]),
    technical:'Payment authorization, order persistence, and stock reservation may span multiple systems. A database transaction cannot atomically cover an external payment provider by itself. Production checkout requires idempotency keys, compensation/reconciliation, webhooks, retry control, locking/reservation and reliable failure recovery. The visual summarizes these concerns without pretending a distributed transaction is automatic.',
    actions:[event('1 · Send a request to the payment service','The checkout backend asks an external provider to approve the payment.',pairs(['Gateway',c.gateway],['Action','Authorize payment']),out('External call','Dispatched (simulated)')),
     event('2 · Read the payment result',failing?`The payment cannot proceed: ${problem}.`:'The demo gateway approved this purchase.',pairs(['Payment preset',c.payment]),out('Payment',failing?'Rejected or unavailable':'Approved')),
     event('3 · Prepare an order and reserve stock',failing?'Because payment failed, no new order is committed.':`Create ORD-1024 and reduce stock by ${c.quantity}.`,pairs(['Order','ORD-1024'],['Stock',`${c.stock} → ${c.stock-c.quantity}`]),out('Write',failing?'Skipped':'Prepared')),
     event('4 · Save and send the receipt',failing?'The app responds with an error; the demo stock remains unchanged.':'The order is recorded and its receipt is returned to the shopper.',pairs(['Commit',failing?'No':'Yes']),out('Result',failing?`HTTP ${r.status}`:'201 Created'))]
   };
  }
  return {title:'Save the food order and queue follow-up work',machine:'ORDER DATABASE / BACKGROUND WORKER',visual:'kitchen',input:pairs(['Meal',c.meal],['Restaurant',c.restaurant],['Database',c.database]),output:pairs(['Order',failing?'Not accepted':'FOOD-88 accepted'],['Worker',c.worker==='online'?'Online':'Unavailable'],['Update channel',c.connection==='live'?'Connected':'Offline']),
   technical:'The request commits an order record before returning 202 Accepted. Notification delivery is not guaranteed merely because an in-process BackgroundTasks call was scheduled. Durable queues need persistence, worker monitoring, idempotency and retries. WebSockets or SSE can push later statuses, while polling can be used when disconnected. This model does not simulate actual delivery progress.',
   actions:[event('1 · Prepare an order record','The restaurant has accepted the request; the backend prepares the saved order.',pairs(['Order number','FOOD-88'],['Meal',c.meal]),out('Record','Prepared')),
    event('2 · Save it in the database',failing?'The order database is offline. We must not claim an order exists.':'The order is saved as accepted.',pairs(['Database',c.database]),out('Saved?',failing?'No':'Yes')),
    event('3 · Prepare a notification',failing?'No order was stored, so no confirmation is queued.':c.worker==='online'?'A notification job can be queued for a worker.':'The worker is offline, so notification delivery is delayed.',pairs(['Worker',c.worker]),out('Notification',failing?'Not queued':c.worker==='online'?'Queued':'Pending worker')),
    event('4 · Reply and keep tracking separately',failing?'The backend reports a storage error instead of a fake confirmation.':`Respond 202 Accepted. ${c.connection==='live'?'A live update channel may push later changes.':'Polling can fetch later changes while live updates are offline.'}`,pairs(['Reply',failing?'503 Service Unavailable':'202 Accepted']),out('Frontend',failing?'Show error':'Show accepted state'))]
  };
 }
 return {title:'Back to the customer',machine:'RESPONSE',visual:'reply',input:inputs,output:out('HTTP',v(r.status)),technical:'HTTP responses include status, headers and usually a body. Middleware also observes the outbound response. The frontend must display a failure as failure, rather than updating an account balance or order unconditionally.',actions:[event('Return the answer','The reply travels back and the app changes what the user sees.',inputs,out('Status',v(r.status)))]};
};
window.FastAPIWorkflowV3Content={get};
})();
