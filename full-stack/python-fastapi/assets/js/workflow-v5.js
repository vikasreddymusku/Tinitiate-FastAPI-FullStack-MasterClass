const scenarios = {
  bank_same: {
    button: { title: 'Banking · Same Bank', subtitle: 'Inside Nova Bank · Anita to Rahul' },
    heroOrgName: 'Bank',
    heroSummary: 'Stand inside Nova Bank and watch a money-transfer request get created, authenticated, validated, matched to the transfer route, checked against banking rules, and finally written into account and ledger tables.',
    customerTitle: 'A customer asks Nova Bank to transfer money',
    stageTitle: 'Nova Bank processes the transfer',
    dataTitle: 'Nova Bank data changes in real time',
    pointOfView: 'Inside Nova Bank',
    methodWhy: 'We use POST because the customer is asking Nova Bank to create a new transfer and change server-side banking data. This is not a read-only operation.',
    authWhy: 'Nova Bank must prove Anita is really the account holder, that her token/session is valid, and that she is allowed to move money from this account.',
    validationChecks: ['Amount exists and is a positive number', 'Sender and recipient account fields are present', 'Recipient exists inside Nova Bank', 'Request structure matches the FastAPI request model'],
    successSummary: '₹500 is transferred. Anita’s balance becomes ₹1,500, Rahul’s becomes ₹1,200, a transfer row is written, and two ledger entries are stored.',
    failureSummary: 'If Anita had insufficient funds, Nova Bank would stop in Python rules, return an error, and no database commit would occur.',
    phoneHtml: `
      <div class="phone-app">
        <div class="app-brand"><strong>NOVA BANK</strong><span>9:41</span></div>
        <div class="app-balance"><h5>Your balance</h5><div class="big-value">₹2,000</div><div>Anita · Savings · •••• 4321</div></div>
        <div class="app-recipient"><h5>Send to</h5><div class="recipient-row"><div><strong>Rahul Sharma</strong><div>rahul@novabank</div></div><span class="recipient-tag">Same bank</span></div></div>
        <div class="app-order-summary"><h5>Amount</h5><div class="big-value">₹500</div><div>Transfer purpose: rent share</div></div>
        <div class="cta-btn-visual">Send Money</div>
      </div>`,
    why: {
      action: 'Anita taps “Send Money” in the Nova Bank app.',
      request: 'A secure HTTPS request is created: POST /api/v1/transfers.',
      api: 'POST is used because Nova Bank must create a transfer record and update balances and ledger data.',
      destination: 'The request goes to Nova Bank’s FastAPI backend.'
    },
    autoViews: { duringStart: 2, afterStart: 6 },
    steps: [
      {
        name: 'Web Server', note: 'Receives HTTPS request', badge: 'Request received',
        core: 'HTTP request arrives at Nova Bank', incoming: 'Customer app → HTTPS', outgoing: 'ASGI request scope',
        simpleTitle: 'The bank receives the transfer request',
        simple: 'Nova Bank’s web server is the first door. It accepts the HTTPS request, reads the method and path, and hands the request into the FastAPI application.',
        why: 'Without this step, the app never gets the customer message. This is where the bank begins tracking the request.',
        failures: 'TLS failure, malformed request, or an unavailable server could stop the journey here.',
        requestJson: `POST /api/v1/transfers\nHeaders: Authorization, Content-Type\nBody: {\n  "from_account": "1001",\n  "to_account": "1002",\n  "amount": 500,\n  "purpose": "rent share"\n}`,
        code: `# uvicorn / ASGI entry\napp = FastAPI()\n\n# request enters the FastAPI app\n# method = POST\n# path = /api/v1/transfers`,
        substeps: ['Accept HTTPS connection from mobile app', 'Read the request method and URL', 'Attach request metadata such as client info', 'Pass control into the FastAPI application'],
        logs: [{ level:'info', text:'[WEB] Received POST /api/v1/transfers from mobile client' }, { level:'info', text:'[WEB] Request id NB-TR-10093 created' }]
      },
      {
        name: 'Middleware', note: 'Adds context and logs', badge: 'Tracking request',
        core: 'Shared request checks run', incoming: 'Raw request', outgoing: 'Request with context',
        simpleTitle: 'Nova Bank adds context around the request',
        simple: 'Middleware wraps the request before business code runs. It can add a request id, timing, logging context, and shared policy checks that should apply to all routes.',
        why: 'Banks need traceability. Middleware gives the team request timing, correlation ids, and a consistent place for cross-cutting logic.',
        failures: 'Global rate limit checks or maintenance-mode middleware could stop the request here.',
        requestJson: `Request Context\n- request_id: NB-TR-10093\n- channel: mobile-app\n- client_ip: 10.0.0.25\n- start_time: 09:41:12`,
        code: `@app.middleware("http")\nasync def add_request_context(request, call_next):\n    request.state.request_id = make_request_id()\n    request.state.started_at = now()\n    response = await call_next(request)\n    return response`,
        substeps: ['Create request id for audit and debugging', 'Start timing the request', 'Attach shared request metadata', 'Forward the request to routing'],
        logs: [{ level:'info', text:'[MIDDLEWARE] Bound request context request_id=NB-TR-10093' }, { level:'info', text:'[MIDDLEWARE] Timing started' }]
      },
      {
        name: 'Router', note: 'Finds correct endpoint', badge: 'Route matched',
        core: 'FastAPI matches POST /transfers', incoming: 'Path + method', outgoing: 'transfer_money() handler',
        simpleTitle: 'FastAPI finds the right bank endpoint',
        simple: 'The router compares the method and path against all registered endpoints and chooses the transfer endpoint that knows how to process money transfers.',
        why: 'This is how FastAPI knows that a money transfer request belongs in the transfer handler and not in a balance or profile route.',
        failures: 'A missing route would produce 404. A wrong method for the same path would produce 405.',
        requestJson: `Matched Route\nPOST /api/v1/transfers\n→ transfer_money(request: TransferRequest)`,
        code: `@router.post("/api/v1/transfers", response_model=TransferResponse)\nasync def transfer_money(request: TransferRequest,\n                         current_user: User = Depends(get_current_user),\n                         db: Session = Depends(get_db)):\n    ...`,
        substeps: ['Compare POST against registered route methods', 'Compare /api/v1/transfers against route paths', 'Choose transfer_money endpoint', 'Prepare dependency resolution'],
        logs: [{ level:'success', text:'[ROUTER] Matched route POST /api/v1/transfers → transfer_money' }]
      },
      {
        name: 'Validation', note: 'Checks request shape', badge: 'Validating body',
        core: 'Pydantic validates fields', incoming: 'JSON body', outgoing: 'Validated TransferRequest',
        simpleTitle: 'The bank checks whether the request is well-formed',
        simple: 'Before the transfer service runs, FastAPI and Pydantic check that the body contains the right fields and data types. This protects the service from broken input.',
        why: 'Validation catches problems early so the bank does not run business logic against bad or incomplete data.',
        failures: 'Missing required fields, wrong types, or invalid structure produce 422 validation errors.',
        requestJson: `TransferRequest\n{\n  "from_account": "1001",\n  "to_account": "1002",\n  "amount": 500,\n  "purpose": "rent share"\n}`,
        code: `class TransferRequest(BaseModel):\n    from_account: str\n    to_account: str\n    amount: PositiveInt\n    purpose: str | None = None`,
        substeps: ['Read JSON body', 'Check required fields are present', 'Convert amount to integer', 'Build a validated TransferRequest object'],
        logs: [{ level:'success', text:'[VALIDATION] Request model validated successfully' }]
      },
      {
        name: 'Identity', note: 'Authenticates sender', badge: 'Authentication check',
        core: 'Nova Bank verifies Anita', incoming: 'Bearer token + account ownership', outgoing: 'Authenticated user',
        simpleTitle: 'Nova Bank proves who is making the request',
        simple: 'The identity layer checks Anita’s token or session and then confirms that the authenticated person is allowed to act on the sender account.',
        why: 'A transfer is sensitive. The bank must prevent strangers from moving money out of another customer’s account.',
        failures: 'Expired token → 401. Wrong account ownership or missing permission → 403.',
        requestJson: `Authorization: Bearer eyJ...\nIdentity Checks\n- token valid? yes\n- user = Anita (cust_1001)\n- owns account 1001? yes`,
        code: `async def get_current_user(token: str = Depends(oauth2_scheme)):\n    payload = decode_access_token(token)\n    return load_user(payload["sub"])\n\nassert current_user.account_id == request.from_account`,
        substeps: ['Decode or verify access token', 'Load the authenticated customer', 'Check customer owns source account 1001', 'Allow the transfer service to continue'],
        logs: [{ level:'success', text:'[AUTH] Customer Anita authenticated (cust_1001)' }, { level:'info', text:'[AUTH] Ownership check passed for account 1001' }]
      },
      {
        name: 'Python Rules', note: 'Applies banking logic', badge: 'Business rules',
        core: 'Rules compare funds and policy', incoming: 'Validated request + customer', outgoing: 'Approved transfer intent',
        simpleTitle: 'Nova Bank checks whether the transfer is allowed',
        simple: 'Now the bank runs its actual transfer rules: both accounts must exist, the sender must have enough balance, and the transfer must fit policy limits.',
        why: 'A request can be valid and authenticated but still not be allowed. Business rules protect customers and the bank.',
        failures: 'Insufficient balance, blocked recipient, closed account, velocity-limit breach, or fraud/risk rules can reject the transfer.',
        requestJson: `Rule Inputs\n- sender_balance: 2000\n- requested_amount: 500\n- receiver_exists: true\n- same_bank: true`,
        code: `sender = accounts_repo.get("1001")\nreceiver = accounts_repo.get("1002")\nif sender.balance < request.amount:\n    raise HTTPException(status_code=409, detail="INSUFFICIENT_BALANCE")\nif sender.status != "ACTIVE" or receiver.status != "ACTIVE":\n    raise HTTPException(status_code=409, detail="ACCOUNT_RESTRICTED")`,
        substeps: ['Load sender and receiver account summaries', 'Compare requested amount to sender balance', 'Check both accounts are active', 'Approve transfer for database commit'],
        logs: [{ level:'info', text:'[RULES] Sender balance found: ₹2,000' }, { level:'success', text:'[RULES] Balance and status checks passed' }]
      },
      {
        name: 'Data + Services', note: 'Writes transfer and ledger', badge: 'Database commit',
        core: 'Nova Bank updates accounts and writes records', incoming: 'Approved transfer', outgoing: 'Committed transaction',
        simpleTitle: 'The bank changes the actual records',
        simple: 'Inside one database transaction, Nova Bank debits Anita, credits Rahul, writes a transfer row, and writes two ledger entries so the action is traceable.',
        why: 'This is the moment when the bank’s stored data really changes. Doing it inside a transaction prevents half-finished updates.',
        failures: 'A database error would roll back the transaction so balances do not change partially.',
        requestJson: `Transaction\n- debit account 1001 by 500\n- credit account 1002 by 500\n- write transfer T100893\n- write ledger entries L9001/L9002`,
        code: `with db.begin():\n    sender.balance -= request.amount\n    receiver.balance += request.amount\n    transfer = Transfer(...)\n    db.add(transfer)\n    db.add(LedgerEntry(account_id="1001", type="DEBIT", amount=500))\n    db.add(LedgerEntry(account_id="1002", type="CREDIT", amount=500))`,
        substeps: ['Open one database transaction', 'Debit Anita and credit Rahul', 'Create transfer and ledger rows', 'Commit everything together'],
        logs: [{ level:'success', text:'[DB] Transfer row T100893 inserted' }, { level:'success', text:'[DB] Ledger entries L9001/L9002 written' }, { level:'success', text:'[DB] Transaction committed successfully' }]
      },
      {
        name: 'Response', note: 'Returns result', badge: 'Complete',
        core: 'Bank sends success to the app', incoming: 'Committed result', outgoing: 'HTTP 200 response',
        simpleTitle: 'Nova Bank answers the customer',
        simple: 'After the commit succeeds, the bank returns a success response so Anita’s app can show the completed transfer and refresh balances.',
        why: 'The response closes the loop. It tells the app whether the work succeeded and what happened.',
        failures: 'If earlier stages failed, the bank would respond with an error status and explanation instead.',
        requestJson: `HTTP/1.1 200 OK\n{\n  "success": true,\n  "transfer_id": "T100893",\n  "status": "completed"\n}`,
        code: `return {\n  "success": True,\n  "transfer_id": transfer.txn_id,\n  "status": "completed",\n  "sender_balance": sender.balance,\n  "receiver_balance": receiver.balance\n}`,
        substeps: ['Build the response payload', 'Set success status', 'Return new balances and transfer id', 'Let the phone update the UI'],
        logs: [{ level:'success', text:'[RESPONSE] 200 OK sent to mobile app with transfer_id=T100893' }]
      }
    ],
    snapshots: {
      before: [
        { title: 'Accounts Table (core.accounts)', headers:['account_id','customer_name','balance','status'], rows:[['1001','Anita','₹2,000','ACTIVE'],['1002','Rahul','₹700','ACTIVE']], highlight:[0,1] },
        { title: 'Transactions Table (core.transactions)', headers:['txn_id','from_acct','to_acct','amount','status'], rows:[['—','—','—','—','No transfer yet']] },
        { title: 'Ledger Entries (core.ledger_entries)', headers:['entry_id','account_id','type','amount'], rows:[['—','—','—','No ledger entries yet']] }
      ],
      during: [
        { title: 'Accounts Table (core.accounts)', headers:['account_id','customer_name','balance','status'], rows:[['1001','Anita','₹2,000','ACTIVE'],['1002','Rahul','₹700','ACTIVE']], highlight:[0] },
        { title: 'Transactions Table (core.transactions)', headers:['txn_id','from_acct','to_acct','amount','status'], rows:[['T100893','1001','1002','₹500','PROCESSING']], highlight:[0] },
        { title: 'Ledger Entries (core.ledger_entries)', headers:['entry_id','account_id','type','amount'], rows:[['(pending)','1001','DEBIT','₹500'],['(pending)','1002','CREDIT','₹500']], highlight:[0,1] }
      ],
      after: [
        { title: 'Accounts Table (core.accounts)', headers:['account_id','customer_name','balance','status'], rows:[['1001','Anita',{text:'₹1,500', className:'neg'},'ACTIVE'],['1002','Rahul',{text:'₹1,200', className:'pos'},'ACTIVE']], highlight:[0,1] },
        { title: 'Transactions Table (core.transactions)', headers:['txn_id','from_acct','to_acct','amount','status'], rows:[['T100893','1001','1002','₹500',{text:'SUCCESS', className:'pos'}]], highlight:[0] },
        { title: 'Ledger Entries (core.ledger_entries)', headers:['entry_id','account_id','type','amount'], rows:[['L9001','1001',{text:'DEBIT', className:'neg'},{text:'₹500', className:'neg'}],['L9002','1002',{text:'CREDIT', className:'pos'},{text:'₹500', className:'pos'}]], highlight:[0,1] }
      ]
    }
  },
  bank_other: {
    button: { title: 'Banking · Other Bank', subtitle: 'Nova Bank → other bank transfer' },
    heroOrgName: 'Interbank Flow',
    heroSummary: 'Stand inside Nova Bank and also watch the receiving bank. Follow one request, one outbound payment message, one receiving-bank credit, and one acknowledgment back.',
    customerTitle: 'A customer asks Nova Bank to transfer to another bank',
    stageTitle: 'Nova Bank and the receiving bank cooperate',
    dataTitle: 'How two banking systems change',
    pointOfView: 'Inside Nova Bank and the receiving bank',
    methodWhy: 'POST is used because Nova Bank is initiating a transfer operation that changes banking records and sends an interbank payment instruction.',
    authWhy: 'Nova Bank authenticates the customer, while the receiving bank trusts the authenticated interbank message rather than the original mobile-app login token.',
    validationChecks: ['Beneficiary account + IFSC/bank identifier are present', 'Amount is valid', 'Sender is allowed to perform interbank transfer', 'Nova Bank builds a uniquely traceable outbound payment message'],
    successSummary: 'Nova Bank debits Anita, creates an outbound message, the receiving bank credits Rahul, and an acknowledgment comes back.',
    failureSummary: 'If the receiving bank cannot credit the beneficiary, Nova Bank marks the transfer pending/failed and handles retry or reversal instead of silently losing money.',
    phoneHtml: `
      <div class="phone-app">
        <div class="app-brand"><strong>NOVA BANK</strong><span>9:41</span></div>
        <div class="app-balance"><h5>Your balance</h5><div class="big-value">₹24,500</div><div>Anita · Savings · •••• 9012</div></div>
        <div class="app-recipient"><h5>Transfer to other bank</h5><div><strong>Rahul Singh</strong><div>HDFC Bank · IFSC HDFC0001234</div></div></div>
        <div class="app-order-summary"><h5>Amount</h5><div class="big-value">₹500</div><div>Mode: interbank</div></div>
        <div class="cta-btn-visual">Send Money</div>
      </div>`,
    why: {
      action: 'Anita sends ₹500 to Rahul at another bank.',
      request: 'POST /api/v1/transfers creates an interbank transfer request at Nova Bank.',
      api: 'Nova Bank must create local records, debit the sender, and produce an outbound bank-to-bank message.',
      destination: 'The first request goes to Nova Bank. Later, Nova Bank creates a separate payment-network message to the other bank.'
    },
    autoViews: { duringStart: 2, afterStart: 6 },
    steps: [
      { name:'Web Server', note:'Receives transfer request', badge:'Received', core:'Nova Bank receives Anita’s request', incoming:'Mobile app request', outgoing:'Transfer workflow starts', simpleTitle:'Nova Bank receives the interbank transfer request', simple:'Just like a same-bank transfer, the request first enters Nova Bank’s backend through the web server.', why:'The bank must first own the request before it can create any interbank message.', failures:'Request transport or server availability issues can fail here.', requestJson:`POST /api/v1/transfers\n{\n  "from_account":"1234-5678-9012",\n  "to_account":"4321-1234-5678",\n  "to_bank":"HDFC Bank",\n  "ifsc":"HDFC0001234",\n  "amount":500\n}`, code:`@router.post("/api/v1/transfers")\nasync def create_interbank_transfer(...): ...`, substeps:['Accept mobile request','Create request id NB-INT-0001','Start request trace','Forward to FastAPI'], logs:[{level:'info', text:'[WEB] Received POST /api/v1/transfers for interbank transfer'}] },
      { name:'Identity', note:'Authenticates sender', badge:'Authenticated', core:'Nova Bank authenticates Anita', incoming:'Token + source account', outgoing:'Authenticated customer', simpleTitle:'Nova Bank proves the sender is Anita', simple:'The bank verifies the customer login and makes sure the source account belongs to the authenticated sender.', why:'Even though money will move across banks, the first trust boundary is still the sender’s bank.', failures:'Invalid login or wrong account ownership prevents transfer creation.', requestJson:`Identity\n- customer: Anita Sharma\n- account: 1234 5678 9012\n- token valid: yes`, code:`current_user = Depends(get_current_user)\nassert current_user.customer_id == "C10234"`, substeps:['Verify bearer token','Load Anita customer profile','Confirm account ownership','Allow next step'], logs:[{level:'success', text:'[AUTH] Anita authenticated as C10234'}] },
      { name:'Validation', note:'Checks interbank details', badge:'Validated', core:'Nova Bank validates beneficiary details', incoming:'Customer input', outgoing:'Validated transfer details', simpleTitle:'The bank checks the beneficiary information', simple:'Nova Bank validates the request body, the beneficiary account details, and the destination bank metadata needed to route the transfer.', why:'Interbank requests need enough detail to reach the correct receiving bank.', failures:'Missing IFSC, invalid beneficiary account, or wrong body shape will stop the request.', requestJson:`Validated Details\n- beneficiary_bank: HDFC Bank\n- ifsc: HDFC0001234\n- beneficiary_account: 432112345678`, code:`class InterbankTransferRequest(BaseModel):\n    to_bank: str\n    ifsc: str\n    beneficiary_account: str\n    amount: PositiveInt`, substeps:['Validate required transfer fields','Check IFSC format','Validate beneficiary account field','Create request model'], logs:[{level:'success', text:'[VALIDATION] Beneficiary details validated'}] },
      { name:'Python Rules', note:'Checks balance + policy', badge:'Approved locally', core:'Nova Bank runs interbank transfer rules', incoming:'Validated request', outgoing:'Approved for outbound network send', simpleTitle:'Nova Bank decides whether to approve the transfer locally', simple:'The bank checks sender balance, transfer limits, risk rules, and whether the account may send money to another bank.', why:'Only approved transactions should move into the interbank network.', failures:'Insufficient balance, blocked account, or risk rules can reject the transfer before any network message is sent.', requestJson:`Rule Inputs\n- balance: 24,500\n- amount: 500\n- destination_bank: HDFC`, code:`if sender.balance < req.amount:\n    raise HTTPException(409, "INSUFFICIENT_BALANCE")\n# additional AML / risk / limit checks`, substeps:['Find sender account row','Check available funds','Run transfer policy and risk checks','Approve local debit + outbound message'], logs:[{level:'success', text:'[RULES] Local interbank rules passed'}] },
      { name:'Nova Bank DB', note:'Debits sender + creates outbound message', badge:'Debit posted', core:'Nova Bank commits its side and emits a payment instruction', incoming:'Approved transfer', outgoing:'Outbound bank-to-bank message', simpleTitle:'Nova Bank updates its own records first', simple:'Nova Bank debits Anita, stores a local transaction record, and creates an outbound payment message with a unique reference.', why:'The sender bank needs a local source of truth and an auditable message to send onward.', failures:'If Nova Bank cannot commit its local transaction, it must not emit a fake outbound success.', requestJson:`Outbound Message\nref: NPCI123456789\nfrom_bank: NOVA\nto_bank: HDFC\namount: 500`, code:`with db.begin():\n    sender.balance -= 500\n    db.add(OutboundPayment(ref="NPCI123456789", status="SENT"))`, substeps:['Debit Anita in Nova Bank','Create local transfer row','Create outbound payment message','Mark local status as SENT'], logs:[{level:'success', text:'[DB] Debited Anita. New balance: ₹24,000'},{level:'success', text:'[NETWORK] Outbound message NPCI123456789 created'}] },
      { name:'Payment Network', note:'Routes to right bank', badge:'Delivered', core:'Network carries secure interbank message', incoming:'Outbound payment message', outgoing:'Incoming message at receiving bank', simpleTitle:'A payment-network message travels to the receiving bank', simple:'Nova Bank does not directly edit the other bank’s database. Instead, it sends a trusted message through a payment network or rail.', why:'Separate banks operate separate systems. A secure network carries the payment instruction between them.', failures:'Delivery failures, timeouts, or duplicate-message protection issues can happen here.', requestJson:`Interbank Message\n- ref: NPCI123456789\n- amount: 500\n- destination bank: HDFC`, code:`payment_network.send(message)`, substeps:['Sign or secure outbound payment message','Route to beneficiary bank','Track delivery state','Await acknowledgment'], logs:[{level:'info', text:'[NETWORK] Payment instruction delivered to HDFC Bank'}] },
      { name:'Receiving Bank', note:'Credits beneficiary', badge:'Beneficiary credited', core:'Receiving bank validates message and credits Rahul', incoming:'Interbank message', outgoing:'Acknowledgment', simpleTitle:'The receiving bank updates Rahul’s account', simple:'The beneficiary bank validates the incoming bank-to-bank message, credits Rahul’s account, and records the incoming transfer in its own database.', why:'The destination account lives in a completely different bank and database.', failures:'If the beneficiary account is invalid or the receiving bank cannot post the credit, it returns failure/pending information.', requestJson:`Receiving Bank\n- beneficiary: Rahul Singh\n- account: 4321 1234 5678\n- credit amount: 500`, code:`if beneficiary_exists:\n    beneficiary.balance += 500\n    save_incoming_transfer(ref)`, substeps:['Validate incoming bank message','Locate beneficiary account','Credit Rahul by ₹500','Create acknowledgment back to Nova Bank'], logs:[{level:'success', text:'[RECEIVING BANK] Rahul credited by ₹500'}] },
      { name:'Acknowledge + Respond', note:'Closes loop', badge:'Complete', core:'Nova Bank receives acknowledgment and answers Anita', incoming:'Beneficiary credit success', outgoing:'Success response to customer', simpleTitle:'The two banks close the loop', simple:'After Nova Bank gets a successful acknowledgment, it marks the transfer complete and responds to Anita’s mobile app.', why:'The sender bank should not claim success until it knows what happened downstream.', failures:'If the acknowledgment reports failure, Nova Bank must show pending/failure and handle reversal or retry correctly.', requestJson:`HTTP 200\n{\n  "status":"completed",\n  "network_ref":"NPCI123456789"\n}`, code:`mark_local_transfer_complete(ref)\nreturn {"status":"completed","network_ref":ref}`, substeps:['Receive downstream acknowledgment','Update local transfer status','Build final success response','Return result to customer'], logs:[{level:'success', text:'[RESPONSE] Nova Bank marked transfer completed and responded to Anita'}] }
    ],
    snapshots: {
      before: [
        { title: 'Nova Bank Accounts', headers:['customer_id','name','account_no','balance'], rows:[['C10234','Anita Sharma','1234 5678 9012','₹24,500'],['C55678','Vikram Mehta','9876 4321 0001','₹18,200']], highlight:[0] },
        { title: 'Receiving Bank Accounts', headers:['customer_id','name','account_no','balance'], rows:[['R77890','Rahul Singh','4321 1234 5678','₹3,200'],['R44556','Priya Nair','8765 0000 1122','₹12,450']], highlight:[0] },
        { title: 'Interbank Messages', headers:['ref','from_bank','to_bank','amount','status'], rows:[['—','—','—','—','No message yet']] }
      ],
      during: [
        { title: 'Nova Bank Accounts', headers:['customer_id','name','account_no','balance'], rows:[['C10234','Anita Sharma',{text:'₹24,000', className:'neg'},'DEBIT POSTED'],['C55678','Vikram Mehta','₹18,200','—']], highlight:[0] },
        { title: 'Receiving Bank Accounts', headers:['customer_id','name','account_no','balance'], rows:[['R77890','Rahul Singh','₹3,200','WAITING'],['R44556','Priya Nair','₹12,450','—']], highlight:[0] },
        { title: 'Interbank Messages', headers:['ref','from_bank','to_bank','amount','status'], rows:[['NPCI123456789','NOVA','HDFC','₹500',{text:'IN FLIGHT', className:'warn'}]], highlight:[0] }
      ],
      after: [
        { title: 'Nova Bank Accounts', headers:['customer_id','name','account_no','balance'], rows:[['C10234','Anita Sharma',{text:'₹24,000', className:'neg'},'COMPLETED'],['C55678','Vikram Mehta','₹18,200','—']], highlight:[0] },
        { title: 'Receiving Bank Accounts', headers:['customer_id','name','account_no','balance'], rows:[['R77890','Rahul Singh',{text:'₹3,700', className:'pos'},'CREDITED'],['R44556','Priya Nair','₹12,450','—']], highlight:[0] },
        { title: 'Interbank Messages', headers:['ref','from_bank','to_bank','amount','status'], rows:[['NPCI123456789','NOVA','HDFC','₹500',{text:'ACKNOWLEDGED', className:'pos'}]], highlight:[0] }
      ]
    }
  },
  store: {
    button: { title: 'Shopping Mall / Store', subtitle: 'Inside the store and checkout systems' },
    heroOrgName: 'Store',
    heroSummary: 'Learn from the store’s point of view. See a checkout request move through FastAPI, inventory checks, payment authorization, order creation, and fulfillment events.',
    customerTitle: 'A shopper asks the store to place an order',
    stageTitle: 'The store processes a checkout request',
    dataTitle: 'Store data and event changes',
    methodWhy: 'The store uses POST /checkout because it creates an order, reserves stock, and records payment authorization — all of which change data.',
    authWhy: 'The store authenticates the shopper (or a checkout session) so it can link the order, secure payment, and show the right account/order history.',
    validationChecks: ['Requested product and quantity exist', 'Quantity is a positive integer', 'Shipping and payment fields are present', 'Checkout request matches the FastAPI model'],
    successSummary: 'Inventory is reserved, payment is authorized, the order is created, and a fulfillment event is published.',
    failureSummary: 'If stock is unavailable, the store stops early, never charges payment, and returns an out-of-stock response.',
    phoneHtml: `
      <div class="phone-app">
        <div class="app-brand"><strong>STYLEHUB</strong><span>9:41</span></div>
        <div class="app-product"><h5>Product</h5><strong>Air Runner Pro</strong><div>Size 9 · Qty 1</div><div class="big-value" style="font-size:40px">$129</div></div>
        <div class="app-order-summary"><h5>Checkout</h5><div>Address saved</div><div>Payment method on file</div></div>
        <div class="cta-btn-visual">Buy Now</div>
      </div>`,
    why: {
      action: 'The shopper taps “Buy Now” on a sneaker product.',
      request: 'POST /checkout is created with product, quantity, address, and payment info.',
      api: 'The store must reserve stock, create an order, and authorize payment.',
      destination: 'The request goes to the store’s FastAPI checkout service.'
    },
    autoViews: { duringStart: 2, afterStart: 6 },
    steps: [
      { name:'Web Server', note:'Receives checkout request', badge:'Received', core:'Store checkout request arrives', incoming:'Web/mobile app', outgoing:'FastAPI app', simpleTitle:'The store receives the checkout request', simple:'The customer app sends a checkout request to the store backend with product, quantity, address, and payment token.', why:'This is how the store learns what the customer wants to buy.', failures:'Transport errors or a down server can stop checkout before logic runs.', requestJson:`POST /checkout\n{\n  "product_id":"P1001",\n  "quantity":1,\n  "size":9,\n  "payment_token":"tok_7712"\n}`, code:`@router.post("/checkout")\nasync def checkout(req: CheckoutRequest): ...`, substeps:['Accept checkout request','Start request trace','Read product/quantity','Forward to app'], logs:[{level:'info', text:'[WEB] Received POST /checkout'}] },
      { name:'Router', note:'Routes to checkout service', badge:'Route matched', core:'FastAPI matches /checkout', incoming:'Path + method', outgoing:'checkout() handler', simpleTitle:'FastAPI routes the request to the checkout endpoint', simple:'The store backend chooses the checkout handler that knows how to coordinate inventory, payment, and order creation.', why:'Routing sends the request to the correct feature module.', failures:'404 or 405 if the endpoint is missing or the wrong method is used.', requestJson:`Matched route: POST /checkout → checkout()`, code:`@router.post("/checkout")\nasync def checkout(req: CheckoutRequest, user=Depends(get_user)):\n    ...`, substeps:['Match POST + /checkout','Resolve dependencies','Choose checkout() handler','Continue'], logs:[{level:'success', text:'[ROUTER] Matched checkout route'}] },
      { name:'Validation', note:'Checks product + quantity', badge:'Validated', core:'Store validates request body', incoming:'Checkout JSON', outgoing:'Validated checkout request', simpleTitle:'The store validates the order details', simple:'FastAPI validates the incoming product id, size, quantity, and payment token fields.', why:'The store should catch malformed orders before trying to reserve stock or call payment providers.', failures:'Wrong types or missing fields produce 422 validation errors.', requestJson:`CheckoutRequest\n{ product_id: "P1001", quantity: 1, size: 9 }`, code:`class CheckoutRequest(BaseModel):\n    product_id: str\n    size: int\n    quantity: PositiveInt\n    payment_token: str`, substeps:['Read JSON body','Check required fields','Validate types and quantity','Create request model'], logs:[{level:'success', text:'[VALIDATION] Checkout body validated'}] },
      { name:'Identity', note:'Verifies shopper session', badge:'Authenticated', core:'Store verifies shopper', incoming:'Session/token', outgoing:'Authenticated shopper', simpleTitle:'The store links the request to the shopper', simple:'The identity layer verifies the shopper session so the order is linked to the right account and order history.', why:'This helps secure the order and personalize fulfillment and history.', failures:'Expired login or an invalid session blocks checkout.', requestJson:`Shopper\n- user_id: u_458\n- logged_in: true`, code:`user = await get_current_user(session_token)`, substeps:['Verify shopper session','Load shopper profile','Attach user id to order flow','Continue'], logs:[{level:'success', text:'[AUTH] Shopper u_458 authenticated'}] },
      { name:'Inventory Rules', note:'Checks stock', badge:'Stock available', core:'Store checks inventory and reserves quantity', incoming:'Validated request', outgoing:'Inventory reserved', simpleTitle:'The store checks whether the shoes are available', simple:'The store inspects inventory before charging the customer so it does not take payment for unavailable items.', why:'Stock reservation prevents overselling and coordinates all later fulfillment steps.', failures:'If stock is 0 for the requested size, the flow stops and the store returns out-of-stock.', requestJson:`Inventory\n- product: Air Runner Pro\n- size: 9\n- requested qty: 1\n- stock before: 12`, code:`inventory = repo.get_product("P1001", size=9)\nif inventory.stock < req.quantity:\n    raise HTTPException(409, "OUT_OF_STOCK")\ninventory.stock -= req.quantity`, substeps:['Find inventory row','Compare requested quantity vs available stock','Reserve 1 item','Mark reservation for checkout'], logs:[{level:'success', text:'[INVENTORY] Reserved 1 item from stock 12 → 11'}] },
      { name:'Payment Provider', note:'Authorizes payment', badge:'Payment authorized', core:'Store asks provider to authorize payment', incoming:'Reserved order + payment token', outgoing:'Authorized payment', simpleTitle:'The store checks with its payment provider', simple:'The store does not charge cards directly. It asks a payment provider to authorize the payment securely.', why:'Payment providers specialize in secure payment processing.', failures:'Payment decline or provider timeout prevents order completion.', requestJson:`Payment Authorization\n- provider: Stripe\n- token: pay_7712\n- amount: $129`, code:`payment = stripe.authorize(amount=12900, token=req.payment_token)\nif not payment.ok: raise HTTPException(402, "PAYMENT_DECLINED")`, substeps:['Build payment authorization request','Send request to provider','Receive authorization result','Continue only if authorized'], logs:[{level:'success', text:'[PAYMENT] Stripe authorized $129.00 (pay_7712)'}] },
      { name:'Orders + DB', note:'Creates order', badge:'Order created', core:'Store writes order and payment records', incoming:'Authorized checkout', outgoing:'Order record + events', simpleTitle:'The store creates the real order', simple:'After stock and payment succeed, the store writes the order row, the payment row, and a fulfillment event for the warehouse.', why:'This is the point where the store creates the permanent purchase record.', failures:'A database rollback protects the system if order writing fails after stock reservation.', requestJson:`Order\n- order_id: #1032\n- product: Air Runner Pro\n- payment: authorized\n- status: processing`, code:`with db.begin():\n    order = Order(id="#1032", status="processing")\n    db.add(order)\n    db.add(Payment(id="pay_7712", status="authorized"))\n    event_bus.publish("FulfillmentRequested", order.id)`, substeps:['Insert order row','Insert payment row','Persist reserved stock change','Publish fulfillment event'], logs:[{level:'success', text:'[DB] Order #1032 created'},{level:'success', text:'[EVENT] FulfillmentRequested published'}] },
      { name:'Response', note:'Returns checkout result', badge:'Complete', core:'Store answers the shopper', incoming:'Created order', outgoing:'HTTP 201 response', simpleTitle:'The store returns the checkout result', simple:'The store responds with the order id and current status so the shopper can see confirmation instantly.', why:'The shopper needs a clear answer and a reference to track their order.', failures:'If any earlier step failed, the store returns an explanatory error instead.', requestJson:`HTTP/1.1 201 Created\n{ "order_id": "#1032", "status": "processing" }`, code:`return JSONResponse({"order_id":"#1032","status":"processing"}, status_code=201)`, substeps:['Build success response','Return order id','Expose processing state','Let UI show confirmation'], logs:[{level:'success', text:'[RESPONSE] 201 Created returned with order #1032'}] }
    ],
    snapshots: {
      before: [
        { title:'Inventory (products)', headers:['id','product','size','stock','status'], rows:[['P1001','Air Runner Pro','9','12','Available'],['P1002','City Sneaker','9','8','Available'],['P1003','Trail Blaze','10','0',{text:'Out of stock', className:'neg'}]], highlight:[0] },
        { title:'Orders (orders)', headers:['id','user','product','qty','status'], rows:[['#1031','u_237','City Sneaker','1','Shipped']], highlight:[] },
        { title:'Payments (transactions)', headers:['id','provider','amount','status'], rows:[['pay_7711','Stripe','$89.00','Captured']], highlight:[] }
      ],
      during: [
        { title:'Inventory (products)', headers:['id','product','size','stock','status'], rows:[['P1001','Air Runner Pro','9',{text:'11', className:'warn'},'Reserved'],['P1002','City Sneaker','9','8','Available']], highlight:[0] },
        { title:'Orders (orders)', headers:['id','user','product','qty','status'], rows:[['#1032','u_458','Air Runner Pro','1',{text:'Processing', className:'warn'}],['#1031','u_237','City Sneaker','1','Shipped']], highlight:[0] },
        { title:'Payments (transactions)', headers:['id','provider','amount','status'], rows:[['pay_7712','Stripe','$129.00',{text:'Authorized', className:'warn'}]], highlight:[0] }
      ],
      after: [
        { title:'Inventory (products)', headers:['id','product','size','stock','status'], rows:[['P1001','Air Runner Pro','9',{text:'11', className:'warn'},'Reserved'],['P1002','City Sneaker','9','8','Available']], highlight:[0] },
        { title:'Orders (orders)', headers:['id','user','product','qty','status'], rows:[['#1032','u_458','Air Runner Pro','1',{text:'Processing', className:'pos'}],['#1031','u_237','City Sneaker','1','Shipped']], highlight:[0] },
        { title:'Event Bus', headers:['event','payload','status'], rows:[['FulfillmentRequested','order=#1032',{text:'Published', className:'pos'}]], highlight:[0] }
      ]
    }
  },
  restaurant: {
    button: { title: 'Restaurant / Ordering', subtitle: 'Inside the restaurant and kitchen flow' },
    heroOrgName: 'Restaurant',
    heroSummary: 'Learn from the restaurant’s point of view. See one food-order request travel from the customer app into the restaurant backend, kitchen queue, and delivery/notification flow.',
    customerTitle: 'A diner asks the restaurant to place an order',
    stageTitle: 'The restaurant processes the order',
    dataTitle: 'Restaurant menu, order, and queue changes',
    methodWhy: 'POST /orders is used because the restaurant is creating a brand-new order and changing restaurant-side data.',
    authWhy: 'The restaurant verifies the customer so the order can be linked to the correct person, saved addresses, and notifications.',
    validationChecks: ['Menu item exists', 'Quantity and address are valid', 'Restaurant is open', 'Delivery area can be served'],
    successSummary: 'The order is created, the kitchen queue receives a ticket, the customer is notified, and delivery can begin.',
    failureSummary: 'If the restaurant is closed or the address is not serviceable, the request stops before the order is created.',
    phoneHtml: `
      <div class="phone-app">
        <div class="app-brand"><strong>TASTYBITES</strong><span>9:41</span></div>
        <div class="app-product"><h5>Menu item</h5><strong>Chicken Biryani</strong><div>Qty 1 · COD</div><div class="big-value" style="font-size:40px">₹280</div></div>
        <div class="app-order-summary"><h5>Delivery</h5><div>Saved home address</div><div>3.2 km from restaurant</div></div>
        <div class="cta-btn-visual">Place Order</div>
      </div>`,
    why: {
      action: 'The customer taps “Place Order” for Chicken Biryani.',
      request: 'POST /orders is created with the menu item, quantity, address, and payment mode.',
      api: 'The restaurant must create a new order, check business rules, and publish a kitchen event.',
      destination: 'The request goes to the restaurant’s FastAPI ordering service.'
    },
    autoViews: { duringStart: 2, afterStart: 6 },
    steps: [
      { name:'Web Server', note:'Receives HTTP order', badge:'Received', core:'Restaurant backend receives order', incoming:'Food app request', outgoing:'Ordering service', simpleTitle:'The restaurant receives the incoming order', simple:'The order request arrives from the customer app with menu, quantity, address, and payment information.', why:'This is how the restaurant learns a new order has been placed.', failures:'A server outage or malformed request can stop the flow here.', requestJson:`POST /orders\n{\n  "item_id":"biryani_1",\n  "quantity":1,\n  "address":"Home",\n  "payment":"cod"\n}`, code:`@router.post("/orders")\nasync def create_order(req: OrderRequest): ...`, substeps:['Accept HTTP order request','Create request trace','Read path and body','Pass to FastAPI'], logs:[{level:'info', text:'[WEB] Received POST /orders'}] },
      { name:'Router', note:'Routes to order endpoint', badge:'Matched', core:'FastAPI matches /orders', incoming:'Method + path', outgoing:'create_order()', simpleTitle:'FastAPI chooses the restaurant order endpoint', simple:'The router sends the request to the order handler that knows how to create food orders and notify the kitchen.', why:'Routing ensures the right business flow handles the order.', failures:'A missing route would return 404.', requestJson:`Matched route: POST /orders`, code:`@router.post("/orders", response_model=OrderResponse)\nasync def create_order(...): ...`, substeps:['Compare route paths','Confirm POST method','Choose create_order() handler','Resolve dependencies'], logs:[{level:'success', text:'[ROUTER] Matched route POST /orders'}] },
      { name:'Identity', note:'Authenticates diner', badge:'Authenticated', core:'Restaurant verifies customer identity', incoming:'Token/session', outgoing:'Customer context', simpleTitle:'The restaurant links the order to the diner', simple:'The restaurant service verifies who is ordering so it can connect the order to saved details and future notifications.', why:'This helps ensure the order belongs to the correct customer and delivery details.', failures:'Invalid authentication blocks order creation.', requestJson:`Identity\n- customer_id: 8421\n- authenticated: yes`, code:`customer = Depends(get_current_user)`, substeps:['Verify login/session','Load customer profile','Attach customer id to order','Continue'], logs:[{level:'success', text:'[AUTH] Customer 8421 authenticated'}] },
      { name:'Validation', note:'Checks address + item', badge:'Validated', core:'Restaurant validates order content', incoming:'Order JSON', outgoing:'Validated order object', simpleTitle:'The restaurant checks whether the order request makes sense', simple:'Validation checks the menu item, address, quantity, and request shape before the kitchen or database sees the order.', why:'Bad input should be stopped before expensive work starts.', failures:'Missing address, invalid quantity, or bad request shape produce errors.', requestJson:`OrderRequest\nitem_id=biryani_1\nqty=1\naddress=Home`, code:`class OrderRequest(BaseModel):\n    item_id: str\n    quantity: PositiveInt\n    address: str\n    payment: str`, substeps:['Validate required fields','Check quantity type','Normalize address text','Create request model'], logs:[{level:'success', text:'[VALIDATION] Order body validated'}] },
      { name:'Order Rules', note:'Checks restaurant policy', badge:'Business rules', core:'Restaurant checks open status, menu, and delivery area', incoming:'Validated order', outgoing:'Approved order intent', simpleTitle:'The restaurant decides if it can accept this order', simple:'Now the restaurant checks whether it is open, whether the menu item is available, and whether the delivery address is serviceable.', why:'A request can be valid but still impossible for the restaurant to fulfill.', failures:'Restaurant closed, sold-out menu item, or out-of-zone address stops the flow.', requestJson:`Rules\n- restaurant_open: true\n- menu_available: true\n- delivery_radius_ok: true`, code:`if not restaurant.is_open(): raise HTTPException(409,"RESTAURANT_CLOSED")\nif not menu_repo.available(req.item_id): raise HTTPException(409,"ITEM_UNAVAILABLE")`, substeps:['Check restaurant open hours','Find menu item availability','Check address is serviceable','Approve order creation'], logs:[{level:'success', text:'[RULES] Order accepted for creation'}] },
      { name:'Orders DB', note:'Creates order row', badge:'Order stored', core:'Restaurant creates the order in its DB', incoming:'Approved order', outgoing:'New order id', simpleTitle:'The restaurant writes the order into its system', simple:'The service stores the order row so the restaurant has a durable record of the customer request.', why:'The restaurant needs a permanent order record before telling the kitchen to cook.', failures:'Database problems would prevent order creation and stop kitchen processing.', requestJson:`Order Row\n#1032 · Chicken Biryani · status=placed`, code:`order = order_repo.create(customer_id, req.item_id, status="placed")`, substeps:['Insert order row','#1032 assigned','Persist customer and menu details','Return order id'], logs:[{level:'success', text:'[DB] Order #1032 inserted'}] },
      { name:'Kitchen Queue', note:'Publishes kitchen ticket', badge:'Kitchen notified', core:'Restaurant publishes a real-time kitchen event', incoming:'Created order', outgoing:'Kitchen ticket + notifications', simpleTitle:'The restaurant tells the kitchen to start work', simple:'The backend publishes a kitchen event so cooks or kitchen screens know a new order must be prepared.', why:'Order storage and kitchen preparation are related but separate steps.', failures:'If the queue is down, the order exists but the team needs retry or recovery to notify the kitchen.', requestJson:`Kitchen Event\nnew_order: #1032\nitem: Chicken Biryani`, code:`kitchen_queue.publish("new_order", order.id)\nnotify_customer(order.id)`, substeps:['Publish new_order event','Push order into kitchen queue','Trigger notification flow','Begin preparation status'], logs:[{level:'success', text:'[KITCHEN] Kitchen queue received order #1032'},{level:'info', text:'[NOTIFY] Customer notified that order was placed'}] },
      { name:'Response', note:'Returns order result', badge:'Complete', core:'Restaurant responds to the customer app', incoming:'Stored order + kitchen event', outgoing:'HTTP 201 response', simpleTitle:'The restaurant confirms the order to the diner', simple:'The restaurant answers with the order id and current status so the customer knows the order is in progress.', why:'The customer needs immediate feedback and a trackable order reference.', failures:'If earlier steps fail, the customer sees a clear error instead of a silent failure.', requestJson:`HTTP/1.1 201 Created\n{\n  "order_id":"#1032",\n  "status":"placed"\n}`, code:`return JSONResponse({"order_id":"#1032","status":"placed"}, status_code=201)`, substeps:['Build order response','Return order id and status','Send HTTP 201','Update customer UI'], logs:[{level:'success', text:'[RESPONSE] 201 Created returned for order #1032'}] }
    ],
    snapshots: {
      before: [
        { title:'Menu (restaurant DB)', headers:['id','item','price','available'], rows:[['biryani_1','Chicken Biryani','₹280','Yes'],['biryani_2','Mutton Biryani','₹320','Yes'],['drink_1','Coke','₹50','Yes']], highlight:[0] },
        { title:'Orders (restaurant DB)', headers:['id','customer','items','status'], rows:[['#1031','Rahul K.','2 x Mutton Biryani','Delivered']], highlight:[] },
        { title:'Kitchen Queue', headers:['ticket','item','status'], rows:[['#1031','Mutton Biryani','Completed']], highlight:[] }
      ],
      during: [
        { title:'Menu (restaurant DB)', headers:['id','item','price','available'], rows:[['biryani_1','Chicken Biryani','₹280','Yes'],['biryani_2','Mutton Biryani','₹320','Yes']], highlight:[0] },
        { title:'Orders (restaurant DB)', headers:['id','customer','items','status'], rows:[['#1032','Priya S.','1 x Chicken Biryani',{text:'Placed', className:'warn'}],['#1031','Rahul K.','2 x Mutton Biryani','Delivered']], highlight:[0] },
        { title:'Kitchen Queue', headers:['ticket','item','status'], rows:[['#1032','Chicken Biryani',{text:'New ticket', className:'warn'}]], highlight:[0] }
      ],
      after: [
        { title:'Orders (restaurant DB)', headers:['id','customer','items','status'], rows:[['#1032','Priya S.','1 x Chicken Biryani',{text:'Placed', className:'pos'}],['#1031','Rahul K.','2 x Mutton Biryani','Delivered']], highlight:[0] },
        { title:'Kitchen Queue', headers:['ticket','item','status'], rows:[['#1032','Chicken Biryani',{text:'Preparing', className:'pos'}]], highlight:[0] },
        { title:'Order Status History', headers:['time','status','meaning'], rows:[['12:01','Placed','Order saved successfully'],['12:02','Accepted','Restaurant accepted order'],['12:05','Preparing','Kitchen started working']], highlight:[0,1,2] }
      ]
    }
  }
};

const state = {
  scenarioKey: 'bank_same',
  stepIndex: 0,
  playing: false,
  timer: null,
  manualView: null
};

const els = {};

function init() {
  const ids = ['scenarioButtons','heroOrgName','heroSummary','customerTitle','stageTitle','dataTitle','runStatus','phoneScreen','whyAction','whyRequest','whyApi','whyDestination','stepsRow','requestOrb','machineTitle','machineStatus','machineCoreText','machineIncoming','machineOutgoing','substepList','simpleTitle','simpleExplanation','whyThisMatters','failureModes','requestJson','codePanel','logsBox','methodWhy','authWhy','validationList','successSummary','failureSummary','tablesArea','playBtn','resetBtn','prevBtn','nextBtn'];
  ids.forEach(id => els[id] = document.getElementById(id));
  document.querySelectorAll('.snapshot-btn').forEach(btn => btn.addEventListener('click', () => {
    state.manualView = btn.dataset.view;
    updateSnapshotButtons();
    renderTables();
  }));
  els.playBtn.addEventListener('click', togglePlay);
  els.resetBtn.addEventListener('click', resetJourney);
  els.prevBtn.addEventListener('click', () => jumpToStep(state.stepIndex - 1));
  els.nextBtn.addEventListener('click', () => jumpToStep(state.stepIndex + 1));
  renderScenarioButtons();
  renderScenario();
  window.addEventListener('resize', () => moveOrb());
}

function renderScenarioButtons() {
  els.scenarioButtons.innerHTML = '';
  for (const [key, scenario] of Object.entries(scenarios)) {
    const btn = document.createElement('button');
    btn.className = 'scenario-btn' + (key === state.scenarioKey ? ' active' : '');
    btn.innerHTML = `<strong>${scenario.button.title}</strong><span>${scenario.button.subtitle}</span>`;
    btn.addEventListener('click', () => {
      state.scenarioKey = key;
      state.stepIndex = 0;
      state.manualView = null;
      stopTimer();
      renderScenarioButtons();
      renderScenario();
    });
    els.scenarioButtons.appendChild(btn);
  }
}

function renderScenario() {
  const s = scenarios[state.scenarioKey];
  els.heroOrgName.textContent = s.heroOrgName;
  els.heroSummary.textContent = s.heroSummary;
  els.customerTitle.textContent = s.customerTitle;
  els.stageTitle.textContent = s.stageTitle;
  els.dataTitle.textContent = s.dataTitle;
  els.phoneScreen.innerHTML = s.phoneHtml;
  els.whyAction.textContent = s.why.action;
  els.whyRequest.textContent = s.why.request;
  els.whyApi.textContent = s.why.api;
  els.whyDestination.textContent = s.why.destination;
  els.methodWhy.textContent = s.methodWhy;
  els.authWhy.textContent = s.authWhy;
  els.successSummary.textContent = s.successSummary;
  els.failureSummary.textContent = s.failureSummary;
  els.validationList.innerHTML = s.validationChecks.map(item => `<li>${item}</li>`).join('');
  renderSteps();
  updateStepContent();
  updateSnapshotButtons();
  renderTables();
  setRunStatus('READY');
}

function renderSteps() {
  const s = scenarios[state.scenarioKey];
  els.stepsRow.innerHTML = s.steps.map((step, idx) => `
    <button class="step-card ${idx === state.stepIndex ? 'active' : ''}" data-index="${idx}" type="button">
      <div class="step-num">${idx + 1}</div>
      <div class="step-name">${step.name}</div>
      <div class="step-note">${step.note}</div>
    </button>
  `).join('');
  els.stepsRow.querySelectorAll('.step-card').forEach(card => card.addEventListener('click', () => {
    state.stepIndex = Number(card.dataset.index);
    state.playing = false;
    stopTimer();
    updateStepContent();
  }));
  requestAnimationFrame(moveOrb);
}

function updateStepContent() {
  const s = scenarios[state.scenarioKey];
  const step = s.steps[state.stepIndex];
  els.stepsRow.querySelectorAll('.step-card').forEach((card, idx) => card.classList.toggle('active', idx === state.stepIndex));
  els.machineTitle.textContent = `${state.stepIndex + 1}. ${step.name}`;
  els.machineStatus.textContent = step.badge;
  els.machineCoreText.textContent = step.core;
  els.machineIncoming.textContent = step.incoming;
  els.machineOutgoing.textContent = step.outgoing;
  els.substepList.innerHTML = step.substeps.map(item => `<li>${item}</li>`).join('');
  els.simpleTitle.textContent = step.simpleTitle;
  els.simpleExplanation.textContent = step.simple;
  els.whyThisMatters.textContent = step.why;
  els.failureModes.textContent = step.failures;
  els.requestJson.textContent = step.requestJson;
  els.codePanel.textContent = step.code;
  renderLogs();
  if (!state.manualView) updateSnapshotButtons(getAutoView());
  renderTables();
  moveOrb();
}

function renderLogs() {
  const s = scenarios[state.scenarioKey];
  const logs = [];
  s.steps.slice(0, state.stepIndex + 1).forEach(step => logs.push(...step.logs));
  els.logsBox.innerHTML = logs.map(line => `<div class="log-line ${line.level}">${line.text}</div>`).join('');
  els.logsBox.scrollTop = els.logsBox.scrollHeight;
}

function getAutoView() {
  const meta = scenarios[state.scenarioKey].autoViews;
  if (state.stepIndex >= meta.afterStart) return 'after';
  if (state.stepIndex >= meta.duringStart) return 'during';
  return 'before';
}

function updateSnapshotButtons(forcedView) {
  const active = state.manualView || forcedView || getAutoView();
  document.querySelectorAll('.snapshot-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.view === active));
}

function renderTables() {
  const s = scenarios[state.scenarioKey];
  const view = state.manualView || getAutoView();
  const tables = s.snapshots[view];
  els.tablesArea.innerHTML = tables.map(table => renderTableHtml(table)).join('');
}

function renderTableHtml(table) {
  const headers = table.headers.map(h => `<th>${h}</th>`).join('');
  const rows = table.rows.map((row, rIdx) => {
    const cells = row.map(cell => {
      if (cell && typeof cell === 'object' && 'text' in cell) {
        return `<td class="${cell.className || ''}">${cell.text}</td>`;
      }
      return `<td>${cell}</td>`;
    }).join('');
    return `<tr class="${(table.highlight || []).includes(rIdx) ? 'highlight' : ''}">${cells}</tr>`;
  }).join('');
  return `<div class="table-card"><h4>${table.title}</h4><div class="table-scroll"><table><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table></div></div>`;
}

function moveOrb() {
  const activeCard = els.stepsRow.querySelector('.step-card.active');
  if (!activeCard || window.innerWidth <= 920) return;
  const rowRect = els.stepsRow.getBoundingClientRect();
  const cardRect = activeCard.getBoundingClientRect();
  const orbX = cardRect.left - rowRect.left + cardRect.width / 2 - 39;
  els.requestOrb.style.left = `${Math.max(0, orbX)}px`;
}

function togglePlay() {
  if (state.playing) {
    state.playing = false;
    stopTimer();
    setRunStatus('PAUSED');
    els.playBtn.textContent = 'Resume Journey';
    return;
  }
  state.playing = true;
  els.playBtn.textContent = 'Pause Journey';
  setRunStatus('RUNNING');
  stopTimer();
  state.timer = setInterval(() => {
    if (state.stepIndex >= scenarios[state.scenarioKey].steps.length - 1) {
      state.playing = false;
      stopTimer();
      setRunStatus('COMPLETE');
      els.playBtn.textContent = 'Replay Journey';
      return;
    }
    state.stepIndex += 1;
    state.manualView = null;
    updateStepContent();
  }, 1800);
}

function stopTimer() {
  if (state.timer) clearInterval(state.timer);
  state.timer = null;
}

function resetJourney() {
  stopTimer();
  state.playing = false;
  state.stepIndex = 0;
  state.manualView = null;
  els.playBtn.textContent = 'Run Journey';
  setRunStatus('READY');
  updateStepContent();
}

function jumpToStep(index) {
  const s = scenarios[state.scenarioKey];
  state.stepIndex = Math.max(0, Math.min(s.steps.length - 1, index));
  state.playing = false;
  stopTimer();
  els.playBtn.textContent = 'Run Journey';
  setRunStatus('READY');
  updateStepContent();
}

function setRunStatus(text) {
  els.runStatus.textContent = text;
}

init();
