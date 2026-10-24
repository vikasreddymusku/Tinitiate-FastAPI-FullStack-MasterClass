/* Tinitiate Routing Story: educational, deterministic simulation (no network calls). */
(() => {
  'use strict';
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));
  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const seed = [
    {id: 'list', path:'/books', method:'GET', kind:'list', group:'books', paramType:'str', active:true},
    {id: 'latest', path:'/books/latest', method:'GET', kind:'latest', group:'books', paramType:'str', active:true},
    {id: 'detail', path:'/books/{book_id}', method:'GET', kind:'detail', group:'books', paramType:'int', active:true},
    {id: 'create', path:'/books', method:'POST', kind:'create', group:'books', paramType:'str', active:true},
    {id: 'health', path:'/health', method:'GET', kind:'health', group:'root', paramType:'str', active:true}
  ];
  const books = [{id:1,title:'Moon Atlas'},{id:7,title:'Robot Garden'},{id:9,title:'Comet Club'}];
  let routes = resetRoutes(), sequence = 20, runnerId = 0, pendingTimer = null;
  let currentOutcome = null, shownSteps = [], stageCursor = -1, triggeredOnce=false;
  let missions = {first:false,error:false,creator:false};
  try { const saved=JSON.parse(localStorage.getItem('tinitiate-route-story-progress')||'null'); if(saved && typeof saved==='object') Object.keys(missions).forEach(k=>missions[k]=saved[k]===true); } catch (_ignored) {}
  function resetRoutes(){return seed.map(route=>({...route}));}
  function el(id) {return document.getElementById(id);}
  const methods = new Set(['GET','POST','PUT','PATCH','DELETE']);
  const vocab = {
    method:['GET is the action.','It tells the app what the visitor wants to do. GET reads information; POST usually creates something.'],
    path:['/books is the address.','The path tells FastAPI which destination the request is for. It is the part of the URL before the question mark.'],
    handler:['list_books() is the Python job.','Once a route matches and its inputs are valid, FastAPI executes the Python function connected to that route.']
  };
  $$('[data-vocab]').forEach(btn=>btn.addEventListener('click',()=>{
    $$('[data-vocab]').forEach(b=>b.classList.toggle('selected',b===btn));
    const [head,detail]=vocab[btn.dataset.vocab];
    el('recipeExplain').replaceChildren(make('strong',head), make('span',detail));
  }));
  function make(tag,txt){const n=document.createElement(tag);n.textContent=txt;return n;}
  const heroCopy={list:['GET /books','asks for the list. FastAPI sends it to the “see books” function.'],new:['POST /books','asks the app to create a book. Same address, different action!'],single:['GET /books/7','asks for one book. The number 7 becomes a path parameter.']};
  $$('[data-hero-route]').forEach(btn=>btn.addEventListener('click',()=>{
    $$('[data-hero-route]').forEach(b=>{b.classList.toggle('rt-door-active',b===btn);b.setAttribute('aria-pressed',b===btn?'true':'false');});
    const [code,detail]=heroCopy[btn.dataset.heroRoute];
    el('heroMessage').replaceChildren(make('b',code), document.createTextNode(' '+detail));
    el('heroRunner').animate([{transform:'translateX(-10px) scale(1)'},{transform:'translateX(55px) scale(1.12)'},{transform:'translateX(0) scale(1)'}], {duration:850,easing:'ease-in-out'});
  }));
  const codeExplain=[
    ['Bring in the toolbox','This tells Python to bring FastAPI into the program. It is like taking a useful tool out of a toolbox.'],
    ['Create your application','app is your FastAPI application. It holds the routes and other settings of your web service.'],
    ['Put a sign above the door','@app.get("/books") means “for a GET request to /books, use the function directly below.” This sign is called a decorator.'],
    ['Name the Python job','def list_books(): creates a function. FastAPI calls it when someone visits the right door.'],
    ['Send an answer back','return sends a Python dictionary. FastAPI turns it into JSON so the client can read it.']
  ];
  let codeIndex=0;
  function selectCodeLine(idx){codeIndex=idx;$$('[data-line]').forEach((node,i)=>node.classList.toggle('active',i===idx));el('codeStepNum').textContent='LINE '+(idx+1)+' OF 5';el('codeStepTitle').textContent=codeExplain[idx][0];el('codeStepText').textContent=codeExplain[idx][1];el('nextCodeLine').textContent=idx===4?'Start again ↺':'Explain next line →';}
  $$('[data-line]').forEach(b=>b.addEventListener('click',()=>selectCodeLine(Number(b.dataset.line))));
  el('nextCodeLine').addEventListener('click',()=>selectCodeLine((codeIndex+1)%5));
  function prefix(){let p=el('prefixValue').value.trim().replace(/\/+$/,'');return el('prefixOn').checked?p:'';}
  function fullPath(route){return route.group==='books' ? prefix()+route.path : route.path;}
  function asPattern(path){
    const names=[];const tokens=path.split('/').map(part=>{
      const m=part.match(/^\{([a-zA-Z_][a-zA-Z0-9_]*)\}$/);
      if(m){names.push(m[1]);return '([^/]+)';}
      return part.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
    });
    return {regex:new RegExp('^'+tokens.join('/')+'$'),names};
  }
  function matchPath(route,path){const {regex,names}=asPattern(fullPath(route));const found=path.match(regex);if(!found)return null;return Object.fromEntries(names.map((name,i)=>[name,decodeURIComponent(found[i+1])]));}
  function parseRequest(){
    const input=el('reqPath').value.trim();
    if(!input.startsWith('/')||input.startsWith('//')||/\s/.test(input))throw new Error('Enter a local API path beginning with /, such as /books/7?limit=2.');
    const uri = new URL(input,'http://fastapi.local');
    return {method:el('reqMethod').value,path:uri.pathname,query:uri.searchParams,full:uri.pathname+uri.search,body:el('reqBody').value};
  }
  function response(status,header,reason,fix,data,step,route=null,req=null){return {status,header,reason,fix,data,failAt:step,route,req};}
  function getOutcome(){
    let req;
    try {req=parseRequest();}catch(e){return response(0,'Please check the request',e.message,'Correct the request path to start with /.',null,0);}
    const live=routes.filter(r=>r.active);
    let match=null,params=null,wrongMethod=false,allowedMethods=[];
    for(const route of live){
      const got=matchPath(route,req.path);
      if(!got)continue;
      if(route.method===req.method){match=route;params=got;break;}
      wrongMethod=true;allowedMethods.push(route.method);
    }
    if(!match){
      // Starlette/FastAPI commonly redirects an otherwise matching path when the final slash differs.
      const alternate=req.path==='/'?null:req.path.endsWith('/')?req.path.slice(0,-1):req.path+'/';
      if(!wrongMethod&&alternate){
        for(const route of live){if(route.method===req.method && matchPath(route,alternate)!==null){
          return response(307,'The door is written with a different slash','A matching route exists if you change the final slash. FastAPI normally redirects this request to that path.','Try '+alternate+' directly, or follow the redirect. A 307 keeps the same HTTP method.',{detail:'Temporary Redirect',location:alternate+(req.query.toString()?'?'+req.query.toString():'')},1,route,req);
        }}
      }
      if(wrongMethod)return response(405,'Right address, wrong action',`The path ${req.path} exists, but not for ${req.method}. Available action${allowedMethods.length===1?'':'s'}: ${[...new Set(allowedMethods)].join(', ')}.`,`Change the HTTP method to ${allowedMethods[0]} or add a ${req.method} route for the same path.`,{detail:'Method Not Allowed'},1,null,req);
      return response(404,'No matching door found',`FastAPI cannot find a route for ${req.method} ${req.path}. Nothing has been matched yet.`,'Check the spelling, add that route, or check whether a shared /api/v1 prefix was turned on.',{detail:'Not Found'},1,null,req);
    }
    for(const [name,value] of Object.entries(params)){
      if(match.paramType==='int' && !/^-?\d+$/.test(value))return response(422,'That ID must be a number',`The address matched ${fullPath(match)}, but “${value}” cannot be used as an integer for ${name}. FastAPI validates the value before calling your function.`,`Change the path value to a number (for example /books/7) or change the function parameter type to str.`,{detail:[{loc:['path',name],msg:'Input should be a valid integer',type:'int_parsing'}]},2,match,req);
      if(match.paramType==='int')params[name]=Number(value);
    }
    if(match.kind==='list' && req.query.has('limit')){
      const value=req.query.get('limit');
      if(!/^\d+$/.test(value)||Number(value)<1||Number(value)>50)return response(422,'The limit setting is invalid',`The route matched, but “${value}” is not a valid limit between 1 and 50. Query values also need to pass validation.`,'Try /books?limit=2. Query parameters come after the ? in the URL.',{detail:[{loc:['query','limit'],msg:'Input must be an integer from 1 to 50',type:'value_error'}]},2,match,req);
    }
    if(match.kind==='create'){
      let body;
      try{body=JSON.parse(req.body);}catch(_e){return response(422,'The JSON body is not readable','FastAPI could not parse the request body as JSON.','Use JSON such as {"title":"Comet Club"}.',{detail:'JSON body could not be parsed'},2,match,req);}
      if(!body||typeof body.title!=='string'||!body.title.trim())return response(422,'The book needs a title','A new book must have a nonempty text field called title.','Try {"title":"Comet Club"}.',{detail:[{loc:['body','title'],msg:'Field required or empty',type:'value_error'}]},2,match,req);
      return response(201,'The new book was created',`FastAPI matched POST ${fullPath(match)}, validated the JSON body, and ran the create_book() function.`,'Change POST to GET. It reaches a different function even with the same /books address.',{created:{title:body.title}},-1,match,req);
    }
    if(match.kind==='list')return response(200,'The books are on their way',`FastAPI matched GET ${fullPath(match)}, checked the optional limit setting, and returned the requested books.`,'Try adding ?limit=2 or ?limit=abc to the path. One works; the other fails validation.',{books:books.slice(0,req.query.has('limit')?Number(req.query.get('limit')):10)},-1,match,req);
    if(match.kind==='latest')return response(200,'The newest book has been found',`The fixed path ${fullPath(match)} matched. FastAPI called the function for the latest book.`,'Move the dynamic /books/{book_id} route above this route and request /books/latest again.',{book:books[2]},-1,match,req);
    if(match.kind==='detail'){
      const id=params.book_id;
      const book=books.find(b=>b.id===id);
      if(!book)return response(404,'The door exists, but this book does not',`FastAPI matched the route and accepted the ID ${id}. The Python function looked in the library and could not find that particular book.`,'Try book ID 7. Notice how this 404 happens inside the function, unlike a missing-route 404.',{detail:'Book not found'},3,match,req);
      return response(200,'Book number '+id+' found',`The {book_id} placeholder captured ${id}. Pydantic/FastAPI validated its type, and your Python function found the book.`,'Try /books/hello and see how a type error produces 422 before the function runs.',{book},-1,match,req);
    }
    if(match.kind==='health')return response(200,'The server says it is healthy','The /health door leads to a function that returns a simple OK response.','Try deleting this route and sending GET /health again.',{status:'ok'},-1,match,req);
    const value=Object.keys(params).length?params:{};
    return response(['POST'].includes(match.method)?201:match.method==='DELETE'?204:200,'Your custom route works!',`You added ${match.method} ${fullPath(match)}. The request matched your new rule and the Python function ran.`,'Now disable or delete the route, or change its HTTP method, and try the same request.',match.method==='DELETE'?null:{message:'Hello from '+fullPath(match),parameters:value},-1,match,req);
  }
  function resultClass(status){return status>=200&&status<300?'rt-status-success':status>=300&&status<400?'rt-status-redirect':status?'rt-status-error':'rt-status-neutral';}
  function stopRunning(){runnerId++;if(pendingTimer){clearTimeout(pendingTimer);pendingTimer=null;}}
  function preview(){
    stopRunning();currentOutcome=null;stageCursor=-1;shownSteps=[];el('journeyPacket').classList.remove('visible');el('journeyLine').style.width='0';$$('.rt-station').forEach(node=>node.className='rt-station');$$('#stageProgress i').forEach(i=>i.className='');
    el('stageCounter').textContent='Rules ready';el('stageAction').replaceChildren(make('span','✉'), messageNode('Your next request is ready.','Press “Send request” for a guided journey, or “Next step” to move at your own speed.'));
    el('stagePathLabel').textContent=el('reqMethod').value+' '+el('reqPath').value;
    const o=getOutcome();const status=el('resultStatus');status.className='rt-status '+resultClass(o.status);status.textContent=o.status?'PREDICTED '+o.status:'CHECK PATH';
    el('resultTitle').textContent=o.header;el('resultReason').textContent=o.reason;el('resultIcon').textContent=o.status>=200&&o.status<300?'🔮':o.status===0?'⚠️':'🧐';
    el('resultFix').replaceChildren(make('strong','WHAT TO TRY'),make('p',o.fix));
    el('resultJson').textContent='// Prediction only. Send the request to watch each step.';
    renderRoutes();renderCode();
  }
  function messageNode(title,text){const wrap=make('div','');wrap.append(make('strong',title),make('p',text));return wrap;}
  function stepSequence(o){if(o.status===0)return [0];if(o.failAt===1)return [0,1,4];if(o.failAt===2)return [0,1,2,4];return [0,1,2,3,4];}
  function descriptionFor(stage,o){
    const req=o.req;const path=req?req.path:'the address';
    if(stage===0)return ['The visitor makes a request',req?`${req.method} ${req.full} leaves the client. The method says what to do; the address says where to go.`:'The request needs a valid path before it can be sent.'];
    if(stage===1){if(o.failAt===1)return [o.status===405?'The address exists, but not this action':o.status===307?'FastAPI finds a slash alternative':'The router cannot find a match',o.reason];return ['FastAPI finds the first matching route',`It checks the routes in their listed order. ${req.method} ${path} is handled by ${o.route.method} ${fullPath(o.route)}.`];}
    if(stage===2){if(o.failAt===2)return ['Input check stops the request',o.reason];return ['The input passes its checks',o.route&&o.route.kind==='detail'?'The book ID can be read as a number.':o.route&&o.route.kind==='create'?'The JSON title is valid.':'Any typed path or query values are checked before the function starts.'];}
    if(stage===3){return [o.failAt===3?'The function cannot find a book':'The Python function does its job',o.failAt===3?o.reason:`${o.route?.kind==='custom'?'Your custom function':o.route?.kind==='list'?'list_books()':o.route?.kind==='detail'?'get_book()':o.route?.kind==='latest'?'latest_book()':o.route?.kind==='create'?'create_book()':'health_check()'} runs. FastAPI prepares its return value as a response.`];}
    return ['The server sends its answer back',`${o.status} ${statusLabel(o.status)}. ${o.reason}`];
  }
  function statusLabel(status){return ({200:'OK',201:'Created',204:'No Content',307:'Temporary Redirect',404:'Not Found',405:'Method Not Allowed',422:'Unprocessable Content'})[status]||'Result';}
  function prepare(){if(!currentOutcome){currentOutcome=getOutcome();shownSteps=stepSequence(currentOutcome);stageCursor=-1;}return currentOutcome;}
  function advanceStep(){
    const o=prepare();if(stageCursor>=shownSteps.length-1)return false;stageCursor++;
    const step=shownSteps[stageCursor];el('journeyPacket').classList.add('visible');el('journeyPacket').style.left=(10+step*20)+'%';el('journeyLine').style.width=(step*20)+'%';const [head,body]=descriptionFor(step,o);
    $$('.rt-station').forEach(n=>{const i=Number(n.dataset.stage);const isShown=shownSteps.slice(0,stageCursor+1).includes(i);n.className='rt-station'+(isShown?' done':'')+(i===step?' current':'')+(o.failAt===step&&o.status>=400?' error':'');});
    $$('#stageProgress i').forEach((n,i)=>n.classList.toggle('done',i<=stageCursor));
    el('stageCounter').textContent='Step '+(stageCursor+1)+' / '+shownSteps.length;
    el('stageAction').replaceChildren(make('span',step===4?'📨':step===1?'🚪':step===2?'📏':step===3?'⚙️':'✉️'),messageNode(head,body));
    el('stagePathLabel').textContent=o.req?o.req.method+' '+o.req.full:'Fix the request path';
    renderRoutes(o.route&&step>=1?o.route.id:null,step===1&&o.failAt===1);
    if(stageCursor===shownSteps.length-1)finish(o);
    return stageCursor<shownSteps.length-1;
  }
  function finish(o){
    const stat=el('resultStatus');stat.className='rt-status '+resultClass(o.status);stat.textContent=o.status?o.status+' '+statusLabel(o.status):'INVALID INPUT';
    el('resultIcon').textContent=o.status>=200&&o.status<300?'🎉':o.status>=300&&o.status<400?'🧭':'🛠️';
    el('resultTitle').textContent=o.header;el('resultReason').textContent=o.reason;
    el('resultFix').replaceChildren(make('strong',o.status>=400?'HOW TO FIX IT':'TRY THE NEXT EXPERIMENT'),make('p',o.fix));
    el('resultJson').textContent=o.status===204?'// 204 No Content: empty body':JSON.stringify(o.data,null,2);
    if(o.status===200&&o.req?.method==='GET'&&o.req?.path==='/books'&&!prefix())completeMission('first');
    if(o.status===422&&o.req?.path==='/books/not-a-number'&&o.route?.id==='detail')completeMission('error');
    if(o.status===200&&o.req?.method==='GET'&&o.req?.path==='/hello'&&o.route?.kind==='custom')completeMission('creator');
  }
  function play(){stopRunning();currentOutcome=null;prepare();const run=runnerId;const animate=()=>{if(run!==runnerId)return;const more=advanceStep();if(more)pendingTimer=setTimeout(animate,720);};animate();}
  function step(){stopRunning();advanceStep();}
  function renderRoutes(activeId=null,partial=false){
    const list=el('routeList');list.innerHTML=routes.map((route,i)=>{
      const klass=route.id===activeId?' rt-route-active':!route.active?' rt-route-disabled':partial?' rt-route-partial':'';
      return `<div class="rt-route-item${klass}" data-route-row="${escapeHtml(route.id)}"><span class="rt-route-index">${String(i+1).padStart(2,'0')}</span><span class="rt-method-badge ${route.method.toLowerCase()}">${route.method}</span><div class="rt-route-meta"><strong class="rt-route-path">${escapeHtml(fullPath(route))}</strong><span class="rt-route-note">${route.kind==='custom'?'Your new route':route.kind==='detail'?'number path parameter':route.kind==='list'?'optional ?limit=':route.kind==='create'?'JSON title required':route.kind==='latest'?'fixed path':'health check'}${!route.active?' · disabled':''}</span></div><div class="rt-route-controls"><button type="button" data-action="up" data-id="${escapeHtml(route.id)}" aria-label="Move ${escapeHtml(route.path)} up" ${i===0?'disabled':''} title="Move up">↑</button><button type="button" data-action="down" data-id="${escapeHtml(route.id)}" aria-label="Move ${escapeHtml(route.path)} down" ${i===routes.length-1?'disabled':''} title="Move down">↓</button><button type="button" data-action="toggle" data-id="${escapeHtml(route.id)}" aria-label="${route.active?'Disable':'Enable'} ${escapeHtml(route.path)}" title="${route.active?'Disable':'Enable'} route">${route.active?'●':'○'}</button><button type="button" data-action="delete" data-id="${escapeHtml(route.id)}" aria-label="Delete ${escapeHtml(route.path)}" title="Delete route">×</button></div></div>`;
    }).join('');
    el('routeCount').textContent=routes.filter(r=>r.active).length+' active';
  }
  el('routeList').addEventListener('click',e=>{
    const btn=e.target.closest('button[data-action]');if(!btn)return;
    const idx=routes.findIndex(r=>r.id===btn.dataset.id);if(idx<0)return;
    switch(btn.dataset.action){
      case 'up':if(idx>0)[routes[idx-1],routes[idx]]=[routes[idx],routes[idx-1]];break;
      case 'down':if(idx<routes.length-1)[routes[idx+1],routes[idx]]=[routes[idx],routes[idx+1]];break;
      case 'toggle':routes[idx].active=!routes[idx].active;break;
      case 'delete':routes.splice(idx,1);break;
    }
    preview();
  });
  function pathIsValid(path){return /^\/(?:[a-zA-Z0-9_-]+|\{[a-zA-Z_][a-zA-Z0-9_]*\})(?:\/(?:[a-zA-Z0-9_-]+|\{[a-zA-Z_][a-zA-Z0-9_]*\}))*\/?$/.test(path);}
  el('addRouteForm').addEventListener('submit',e=>{
    e.preventDefault();const path=el('newPath').value.trim(),method=el('newMethod').value,kind='custom';
    const hint=el('routeFormHint');
    if(!pathIsValid(path)) {hint.textContent='Use a path such as /hello, /books/new or /greet/{name}; spaces and query marks do not belong in route definitions.';hint.classList.add('error');return;}
    if(routes.length>=20){hint.textContent='Keep this learning lab to 20 routes at a time. Delete an older route first.';hint.classList.add('error');return;}
    const duplicate=routes.some(r=>r.method===method&&fullPath(r)===path);
    routes.push({id:'custom'+(sequence++),path,method,kind,group:'root',paramType:el('newType').value,active:true});
    hint.textContent=duplicate?'Added. Important: a duplicate method + path is shadowed by the earlier matching route.':'Your door is installed! Send '+method+' '+path+' to try it.';
    hint.classList.remove('error');
    preview();
  });
  function safeParamName(route){const m=route.path.match(/\{([a-zA-Z_][a-zA-Z0-9_]*)\}/);return m?m[1]:null;}
  function toCode(route){
    const api=route.group==='books'&&el('prefixOn').checked?'router':'app';
    const name='route_'+route.id.replace(/[^a-zA-Z0-9_]/g,'_');
    const parm=safeParamName(route);const annotation=parm?`${parm}: ${route.paramType}`:'';
    let args=annotation,body='return {"message": "Hello from '+fullPath(route)+'"'+(parm?', "parameters": {"'+parm+'": '+parm+'}':'')+'}';
    if(route.kind==='list'){args='limit: int = Query(default=10, ge=1, le=50)';body='return {"books": BOOKS[:limit]}';}
    if(route.kind==='detail'){args='book_id: int';body='book = next((b for b in BOOKS if b["id"] == book_id), None)\n    if book is None:\n        raise HTTPException(status_code=404, detail="Book not found")\n    return {"book": book}';}
    if(route.kind==='latest'){args='';body='return {"book": BOOKS[-1]}';}
    if(route.kind==='create'){args='book: BookIn';body='return {"created": {"title": book.title}}';}
    if(route.kind==='health'){args='';body='return {"status": "ok"}';}
    if(route.kind==='custom'&&route.method==='DELETE')body='return Response(status_code=204)';
    let deco=`@${api}.${route.method.toLowerCase()}("${route.path}"`;
    if(route.method==='POST')deco+=', status_code=201';
    if(route.method==='DELETE'&&route.kind==='custom')deco+=', status_code=204';
    deco+=')';
    if(!route.active)return '# DISABLED: '+deco+'\n# def '+name+'(...): ...';
    return deco+'\ndef '+name+'('+args+'):\n    '+body;
  }
  function renderCode(){
    let text='from fastapi import FastAPI, APIRouter, HTTPException, Query, Response\nfrom pydantic import BaseModel, Field, field_validator\n\napp = FastAPI()\n\nBOOKS = '+JSON.stringify(books).replace(/"/g,'"')+'\n\nclass BookIn(BaseModel):\n    title: str = Field(min_length=1)\n\n    @field_validator("title")\n    @classmethod\n    def nonblank_title(cls, value: str) -> str:\n        if not value.strip():\n            raise ValueError("Title must not be empty")\n        return value.strip()\n';
    if(el('prefixOn').checked)text+='\nrouter = APIRouter(prefix="'+prefix()+'", tags=["books"])\n';
    text+='\n'+routes.map(toCode).join('\n\n');
    if(el('prefixOn').checked)text+='\n\napp.include_router(router)';
    el('liveCode').textContent=text;
    el('codeCaption').textContent=el('prefixOn').checked?`APIRouter adds ${prefix()||'(empty prefix)'} to every book route.`:'Each @app.get(), @app.post(), etc. decorator registers a method + path with a Python function.';
  }
  function setPrefix(){el('prefixValue').disabled=!el('prefixOn').checked;preview();}
  el('prefixOn').addEventListener('change',setPrefix);
  el('prefixValue').addEventListener('input',()=>{
    const val=el('prefixValue').value.trim();
    if(val && (!val.startsWith('/')||val.endsWith('/'))){el('prefixValue').setCustomValidity('Start with / and do not end with /.');}else el('prefixValue').setCustomValidity('');
    preview();
  });
  ['reqMethod','reqPath','reqBody'].forEach(id=>el(id).addEventListener(id==='reqPath'||id==='reqBody'?'input':'change',preview));
  el('sendRequest').addEventListener('click',play);
  el('stepRequest').addEventListener('click',step);
  el('resetRequest').addEventListener('click',()=>{stopRunning();routes=resetRoutes();el('prefixOn').checked=false;el('prefixValue').value='/api/v1';el('prefixValue').disabled=true;el('reqMethod').value='GET';el('reqPath').value='/books';el('reqBody').value='{"title":"Comet Club"}';el('routeFormHint').textContent='Routes restored to the beginning. Your earned missions remain.';$$('[data-preset]').forEach(b=>b.classList.remove('active'));preview();});
  function selectPreset(name){
    stopRunning();routes=resetRoutes();el('reqMethod').value='GET';el('reqPath').value='/books';el('reqBody').value='{"title":"Comet Club"}';el('prefixOn').checked=false;el('prefixValue').disabled=true;el('prefixValue').value='/api/v1';
    switch(name){
      case 'missing':el('reqPath').value='/dragons';break;
      case 'wrongMethod':el('reqMethod').value='DELETE';break;
      case 'invalid':el('reqPath').value='/books/not-a-number';break;
      case 'order':el('reqPath').value='/books/latest';[routes[1],routes[2]]=[routes[2],routes[1]];break;
      case 'query':el('reqPath').value='/books?limit=banana';break;
      case 'prefix':el('reqPath').value='/books';el('prefixOn').checked=true;el('prefixValue').disabled=false;break;
      case 'single':el('reqPath').value='/books/7';break;
    }
    $$('[data-preset]').forEach(b=>b.classList.toggle('active',b.dataset.preset===name));
    preview();el('playground').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth',block:'start'});
  }
  $$('[data-preset]').forEach(btn=>btn.addEventListener('click',()=>selectPreset(btn.dataset.preset)));
  $$('button.rt-linklike[data-preset]').forEach(btn=>btn.addEventListener('click',()=>selectPreset(btn.dataset.preset)));
  async function copyText(text,button){const original=button.textContent;try{await navigator.clipboard.writeText(text);button.textContent='Copied ✓';}catch(_ignored){button.textContent='Select and copy below';}setTimeout(()=>button.textContent=original,1300);}
  el('copyResponse').addEventListener('click',()=>copyText(el('resultJson').textContent,el('copyResponse')));
  el('copyCode').addEventListener('click',()=>copyText(el('liveCode').textContent,el('copyCode')));
  function completeMission(id){if(missions[id])return;missions[id]=true;try{localStorage.setItem('tinitiate-route-story-progress',JSON.stringify(missions));}catch(_ignored){}renderMissions();}
  function renderMissions(){let count=0;$$('[data-mission]').forEach(row=>{const yes=missions[row.dataset.mission];if(yes)count++;row.classList.toggle('complete',yes);row.querySelector('.rt-mission-state').textContent=yes?'✓ Completed':'Not yet';});el('missionProgressLabel').textContent=count+' of 3 missions complete';el('missionProgressFill').style.width=(count/3*100)+'%';el('missionReward').textContent=count===3?'🏆 Route Builder unlocked!':'You’ve got this ✨';}
  // Add a direct link to this detailed lesson from the older standalone FastAPI lab, but leave its functionality unchanged.
  renderMissions();preview();
})();
