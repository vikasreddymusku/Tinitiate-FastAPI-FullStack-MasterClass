const assert=require('node:assert/strict');
const {definitions,outcome,stepInfo}=require('../../assets/js/workflow-engine.js');
let cases=0;
for (const [name,d] of Object.entries(definitions)) {
  for (const [id,title,changes] of d.presets) {
    const result=outcome(name,{...d.defaults,...changes});
    assert.equal(typeof result.status,'number',name+': '+id);
    assert.ok(result.at>=3&&result.at<=8);
    assert.equal(stepInfo(result,result.at).done,true);
    if(result.ok)assert.equal(result.at,8);
    else assert.equal(JSON.stringify(result.before),JSON.stringify(result.before));
    cases++;
  }
}
const e=(scene,input)=>outcome(scene,{...definitions[scene].defaults,...input});
for(const scene of Object.keys(definitions)) {
 assert.equal(e(scene,{route:'missing'}).status,404);
 assert.equal(e(scene,{method:'GET'}).status,405);
 assert.equal(e(scene,{identity:'missing'}).status,401);
 assert.equal(e(scene,{identity:'limited'}).status,403);
}
assert.equal(e('bank',{amount:-1}).status,422);
assert.equal(e('bank',{amount:2000}).status,409);
assert.equal(e('bank',{database:'offline'}).status,503);
assert.equal(e('shop',{quantity:0}).status,422);
assert.equal(e('shop',{gateway:'offline'}).status,502);
assert.equal(e('delivery',{worker:'offline'}).status,202);
assert.equal(e('delivery',{meal:'empty'}).status,422);
console.log(`PASS: ${cases} scenario presets and 19 focused route, auth, validation and service checks`);
