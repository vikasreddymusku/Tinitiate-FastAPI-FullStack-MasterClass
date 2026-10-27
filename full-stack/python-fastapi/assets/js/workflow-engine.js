/* Topic 00: deterministic, side-effect-free learning model. Not a live banking/payment system. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;root.FastAPIWorkflowEngine=api;})(typeof window==='undefined'?globalThis:window,function(){
'use strict';
const stageNames=['Customer','Web server','Middleware','Find route','Check data','Check identity','Python rules','Services & data','Answer'];
const stageIcons=['📱','📨','🛡️','🧭','📏','🔑','🐍','🗄️','📬'];
const code={
 bank:[
 'from fastapi import FastAPI, Depends, HTTPException',
 'from pydantic import BaseModel, Field',
 'app = FastAPI()',
 'class Transfer(BaseModel):',
 '    amount: int = Field(gt=0)',
 '@app.post("/transfers")',
 'def transfer(data: Transfer, user=Depends(current_user)):',
 '    if data.amount > get_balance(user):',
 '        raise HTTPException(409, "Not enough money")',
 '    with db.begin():  # one atomic transaction',
 '        debit(user, data.amount)',
 '        credit("friend", data.amount)',
 '    return {"message": "Transfer complete"}'
 ],
 shop:[
 'from fastapi import FastAPI, HTTPException',
 'from pydantic import BaseModel, Field',
 'app = FastAPI()',
 'class Cart(BaseModel):',
 '    quantity: int = Field(gt=0)',
 '@app.post("/orders", status_code=201)',
 'def checkout(cart: Cart):',
 '    if cart.quantity > get_stock("shoes"):',
 '        raise HTTPException(409, "Out of stock")',
 '    payment = charge_safely(cart.quantity)',
 '    if not payment.ok: raise HTTPException(409, "Payment rejected")',
 '    order = save_order_and_update_stock(cart.quantity)',
 '    return {"order_id": order.id}'
 ],
 delivery:[
 'from fastapi import FastAPI, BackgroundTasks, HTTPException',
 'from pydantic import BaseModel',
 'app = FastAPI()',
 'class FoodOrder(BaseModel):',
 '    meal: str',
 '@app.post("/deliveries", status_code=202)',
 'def place_order(order: FoodOrder, tasks: BackgroundTasks):',
 '    if not restaurant_open():',
 '        raise HTTPException(409, "Restaurant closed")',
 '    saved = save_order(order, status="accepted")',
 '    tasks.add_task(send_confirmation, saved.id)',
 '    return {"order_id": saved.id, "status": "accepted"}'
 ]
};
const stepLines={bank:[[5],[2],[2],[5],[3,4],[6],[7,8],[9,10,11],[12]],shop:[[5],[2],[2],[5],[3,4],[6],[7,8,9],[9,10,11],[12]],delivery:[[5],[2],[2],[5],[3,4],[6],[7,8],[10,11],[12]]};
const definitions={
 bank:{name:'BANKING',title:'Send money to a friend',summary:'Your bank must check the request, confirm who you are, check your money, and make two safe balance changes.',method:'POST',path:'/transfers',defaults:{method:'POST',route:'present',amount:500,balance:1500,recipient:200,identity:'valid',database:'online'},controls:[
  {id:'amount',label:'How much money will you send? (₹)',type:'number',min:-10000,max:100000,step:100,hint:'Try ₹2,000 when your balance is only ₹1,500.'},
  {id:'balance',label:'Money in your account before (₹)',type:'number',min:0,max:100000,step:100},
  {id:'identity',label:'Your login',type:'select',options:[['valid','Logged in · allowed'],['missing','Not logged in'],['expired','Expired token'],['limited','Logged in · no transfer permission']]},
  {id:'route',label:'Does the transfer route exist?',type:'select',options:[['present','Yes, it exists'],['missing','No, route was deleted']]},
  {id:'method',label:'HTTP method used',type:'select',options:[['POST','POST · create transfer'],['GET','GET · ask for data']]},
  {id:'database',label:'Bank database',type:'select',options:[['online','Connected'],['offline','Disconnected']]}
 ],presets:[['success','Successful ₹500 transfer',{}],['no-money','Not enough money',{amount:2500}],['missing-login','No login token',{identity:'missing'}],['limited','No transfer permission',{identity:'limited'}],['bad-amount','Invalid negative amount',{amount:-10}],['route-gone','Route removed',{route:'missing'}],['wrong-method','Wrong method',{method:'GET'}],['db-down','Database disconnected',{database:'offline'}]]},
 shop:{name:'SHOPPING',title:'Buy a pair of sneakers',summary:'Your store checks an order, finds the shoes, asks a payment service, saves the order, and updates stock safely.',method:'POST',path:'/orders',defaults:{method:'POST',route:'present',quantity:1,stock:5,identity:'valid',gateway:'online',payment:'approved'},controls:[
  {id:'quantity',label:'How many pairs?',type:'number',min:-100,max:1000,step:1,hint:'Try buying more than the store has.'},
  {id:'stock',label:'Pairs available in the warehouse',type:'number',min:0,max:1000,step:1},
  {id:'identity',label:'Your login',type:'select',options:[['valid','Signed in'],['missing','Not signed in'],['expired','Expired token'],['limited','Signed in · blocked from buying']]},
  {id:'payment',label:'Card result',type:'select',options:[['approved','Approved'],['declined','Declined']]},
  {id:'gateway',label:'Payment company connection',type:'select',options:[['online','Connected'],['offline','Unavailable']]},
  {id:'route',label:'Does the orders route exist?',type:'select',options:[['present','Yes'],['missing','No']]},
  {id:'method',label:'HTTP method used',type:'select',options:[['POST','POST'],['GET','GET']]}
 ],presets:[['success','Successful purchase',{}],['out-stock','Sold out',{quantity:8}],['invalid','Invalid quantity',{quantity:0}],['card','Card rejected',{payment:'declined'}],['gateway','Payment service down',{gateway:'offline'}],['unauth','Not logged in',{identity:'missing'}],['route-gone','Orders route deleted',{route:'missing'}]]},
 delivery:{name:'DELIVERY',title:'Order lunch and follow its journey',summary:'A restaurant accepts an order, saves it, sends an answer right away, and can arrange separate work for notifications.',method:'POST',path:'/deliveries',defaults:{method:'POST',route:'present',meal:'pizza',identity:'valid',restaurant:'open',database:'online',worker:'online',connection:'live'},controls:[
  {id:'meal',label:'What will you order?',type:'select',options:[['pizza','Pizza'],['rice','Rice bowl'],['salad','Salad'],['empty','Nothing · missing meal']]},
  {id:'identity',label:'Your login',type:'select',options:[['valid','Signed in'],['missing','Not signed in'],['expired','Expired token'],['limited','Signed in · ordering blocked']]},
  {id:'restaurant',label:'Restaurant',type:'select',options:[['open','Open for orders'],['closed','Closed']]},
  {id:'database',label:'Order database',type:'select',options:[['online','Connected'],['offline','Disconnected']]},
  {id:'worker',label:'Notification worker',type:'select',options:[['online','Working'],['offline','Temporarily stopped']]},
  {id:'connection',label:'Live-update connection',type:'select',options:[['live','Connected'],['offline','Disconnected · app can poll']]},
  {id:'route',label:'Does the delivery route exist?',type:'select',options:[['present','Yes'],['missing','No']]},
  {id:'method',label:'HTTP method used',type:'select',options:[['POST','POST'],['GET','GET']]}
 ],presets:[['success','Order accepted',{}],['closed','Restaurant closed',{restaurant:'closed'}],['empty','Missing meal',{meal:'empty'}],['db-down','Database down',{database:'offline'}],['worker-down','Worker unavailable',{worker:'offline'}],['live-down','Live updates disconnected',{connection:'offline'}],['route-gone','Route deleted',{route:'missing'}]]}
};
const generic=[
 ['Your finger starts the story','The app packages your choice into a request. Nothing has reached FastAPI yet.','The frontend cannot update server data just by changing its own screen.'],
 ['The server receives the message','An ASGI server, such as Uvicorn, passes the HTTP request into the Python web application.','The server handles the network connection so the application can focus on its rules.'],
 ['The request enters the application','Middleware can inspect the request before the route handles it.','Middleware helps with tasks that apply across many routes, such as logging. It also surrounds the outgoing response.'],
 ['FastAPI finds the destination','The method and path are matched to a route.','A route is like a labeled doorway: POST /orders is different from GET /orders.'],
 ['FastAPI checks the input','Typed fields and request models help reject missing or invalid information.','Checking early avoids running business code on data that does not make sense.'],
 ['The app checks who you are','An authentication or permission dependency can refuse a protected request.','Identity and permission are different: you may be logged in but not allowed to perform this action.'],
 ['Python applies the business rules','The endpoint calls Python functions that decide whether the requested action is allowed.','The app must enforce business rules on the server, not trust the browser.'],
 ['Services and stored information are involved','The endpoint may read or change database rows or call another service.','External systems can fail, and the app should avoid leaving partial changes behind.'],
 ['The answer travels back to the screen','FastAPI produces an HTTP response. The frontend reads it and updates what you see.','Responses include a status code and often JSON data that describe the outcome.']
];
const special={
 bank:{6:['Is there enough money?',(c)=>`The Python code compares ₹${c.amount} with your ₹${c.balance} balance. It will not allow an overdraft in this example.`,'Money transfers require a rule that prevents sending money you do not have.'],7:['Move both balances together','One database transaction subtracts money from your account and adds it to your friend’s account.','A transaction either commits both changes or rolls them both back.'],8:['Show the transfer confirmation','The phone receives the result and can show the new balance.','The request is finished only when the browser receives the answer.']},
 shop:{6:['Check the shopping cart',(c)=>`The store checks whether ${c.quantity} pair(s) are available from the ${c.stock} in stock.`,'The store must not promise more products than it owns.'],7:['Contact payment and save the order','The app contacts a payment service and records the confirmed order.','Payments and inventory require careful coordination. Real stores use idempotency and recovery strategies.'],8:['Show the receipt','The shop returns the new order number and the frontend can display it.','201 Created is often used when a new resource was made.']},
 delivery:{6:['Ask whether the kitchen can take this order','The app checks whether the restaurant can accept the meal.','The customer should not pay attention to tracking an order the restaurant never accepted.'],7:['Save the accepted order','The order record is saved. In this demo we also queue a notification as work that happens after the response.','A real queue and worker can keep long-running jobs from blocking the immediate reply.'],8:['Answer now; updates can come later','The app responds 202 Accepted. A separate worker may send a confirmation after the response.','202 means the work was accepted, not that delivery has already finished.']}
 };
 function outcome(scene,input){const d=definitions[scene];if(!d)throw Error('Invalid scenario');const c={...d.defaults,...input};
 const stop=(at,status,reason,fix)=>({ok:false,at,status,reason,fix});
 let result;
 if(c.route==='missing')result=stop(3,404,'No matching route. The app has no doorway for this path.','Restore the route, or send the request to a path that exists.');
 else if(c.method!==d.method)result=stop(3,405,`The path exists, but it expects ${d.method}, not ${c.method}.`,`Change the method back to ${d.method}.`);
 else if(scene==='bank'&&(!Number.isInteger(c.amount)||c.amount<=0))result=stop(4,422,'Amount must be a whole number greater than zero.','Enter a positive whole-number amount, such as 500.');
 else if(scene==='shop'&&(!Number.isInteger(c.quantity)||c.quantity<=0))result=stop(4,422,'Quantity must be a positive whole number.','Choose 1 or more whole pairs of shoes.');
 else if(scene==='delivery'&&c.meal==='empty')result=stop(4,422,'The required meal information is missing.','Choose a meal before placing the order.');
 else if(c.identity==='missing'||c.identity==='expired')result=stop(5,401,c.identity==='missing'?'No login credential was sent.':'The login credential has expired.','Sign in and send a valid credential.');
 else if(c.identity==='limited')result=stop(5,403,'You are recognized, but do not have permission for this action.','Choose an account with the necessary permission, or request access.');
 else if(scene==='bank'&&c.amount>c.balance)result=stop(6,409,`You have ₹${c.balance}, but tried to send ₹${c.amount}.`,'Send an amount no greater than your balance.');
 else if(scene==='shop'&&c.quantity>c.stock)result=stop(6,409,`You requested ${c.quantity} pairs. Only ${c.stock} are available.`,'Order fewer pairs or wait for a restock.');
 else if(scene==='delivery'&&c.restaurant==='closed')result=stop(6,409,'The restaurant is closed and cannot accept a new order.','Choose an open restaurant or order later.');
 else if((scene==='bank'||scene==='delivery')&&c.database==='offline')result=stop(7,503,'The database cannot be reached, so the action was not completed.','Restore the connection and retry safely.');
 else if(scene==='shop'&&c.gateway==='offline')result=stop(7,502,'The payment service is unavailable. The order cannot be confirmed.','Try again when the payment connection is restored.');
 else if(scene==='shop'&&c.payment==='declined')result=stop(7,409,'The payment was rejected. No order or stock update was committed.','Use an approved payment method.');
 else result={ok:true,at:8,status:scene==='shop'?201:scene==='delivery'?202:200,reason:'The request succeeded.',fix:''};
 const successResponse=scene==='bank'?{message:'Transfer complete',transferred:c.amount,currency:'INR'}:scene==='shop'?{order_id:'ORD-1024',status:'created',pairs:c.quantity}: {order_id:'FOOD-88',status:'accepted'};
 const response=result.ok?successResponse:{detail:result.reason};
 const before=scene==='bank'?[['Your balance',`₹${c.balance}`],['Friend’s balance',`₹${c.recipient}`]]:scene==='shop'?[['Shoes in stock',`${c.stock} pairs`],['Orders created','0']]:[['Order status','Not created'],['Confirmation','Not scheduled']];
 const after=scene==='bank'?[['Your balance',`₹${c.balance-c.amount}`],['Friend’s balance',`₹${c.recipient+c.amount}`]]:scene==='shop'?[['Shoes in stock',`${c.stock-c.quantity} pairs`],['Orders created','1']]:[['Order status','Accepted'],['Confirmation',c.worker==='online'?'Queued for sending':'Waiting for a worker']];
 return {scene,c,...result,before,after,result:response,method:c.method,path:d.path};
 }
 function stepInfo(r,index){const i=Math.max(0,Math.min(index,r.at));const [defaultTitle,defaultExplain,defaultWhy]=generic[i];const spec=special[r.scene]?.[i];let title=spec?.[0]||defaultTitle;let explain=typeof spec?.[1]==='function'?spec[1](r.c):spec?.[1]||defaultExplain;let why=spec?.[2]||defaultWhy;
 if(i===0){explain=r.scene==='bank'?`You tap Send ₹${r.c.amount} in the banking app.`:r.scene==='shop'?`You tap Buy ${r.c.quantity} pair(s) of sneakers.`:`You tap Order ${r.c.meal==='empty'?'(no meal selected)':r.c.meal}.`;}
 if(i===3)explain=`The app looks for ${r.method} ${r.path}. `+(r.ok||r.at>3?'The route exists and matches.':'Something is wrong with the route or method.');
 if(i===4)explain=r.scene==='bank'?`FastAPI checks whether ${r.c.amount} is a valid positive whole-number amount.`:r.scene==='shop'?`FastAPI checks whether ${r.c.quantity} is a positive whole-number quantity.`:`FastAPI checks the request includes a meal.`;
 if(i===5)explain=`The app checks the login and permission for this protected endpoint. Current credential: ${r.c.identity}.`;
 if(!r.ok&&i===r.at){title=`The request stops: ${r.status}`;explain=r.reason;why=`The app returns ${r.status} instead of continuing. No data changes were saved.`;}
 if(r.ok&&i===8&&r.scene==='delivery')explain+=r.c.worker==='offline'?' The notification worker is stopped, so sending is delayed.':' The notification is queued for work after the response.';
 return {title,explain,why,lines:stepLines[r.scene][i],done:i>=r.at,status:i>=r.at?r.status:null,fix:!r.ok&&i===r.at?r.fix:''};}
 return {definitions,stageNames,stageIcons,code,stepLines,generic,outcome,stepInfo};
});
