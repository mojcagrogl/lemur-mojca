import test from 'node:test';
import assert from 'node:assert/strict';
import {fingerprint,createResult} from '../scoring.js';
test('Results are reproducible, bounded, and cover the requested 1–100 scale',()=>{
  const scores=new Set();
  for(let hash=0;hash<500;hash++)for(const feeling of ['unsure','comfortable','confident']){
    const result=createResult(hash,'everyday',feeling);
    assert.deepEqual(result,createResult(hash,'everyday',feeling));
    assert.ok(Number.isInteger(result.score)&&result.score>=1&&result.score<=100);
    scores.add(result.score);
  }
  assert.equal(scores.size,100);
});
test('Occasion selects relevant tips; self-reported comfort shapes the comment',()=>{
  for(const occasion of ['everyday','work','evening','special']){
    const result=createResult(456,occasion,'confident');assert.ok(result.tip.length>30);assert.match(result.verdict,/Praviš/);
  }
  assert.notEqual(createResult(456,'work','unsure').tip,createResult(456,'evening','unsure').tip);
  assert.equal(fingerprint(new Uint8Array([1,2,3])),fingerprint(new Uint8Array([1,2,3])));
});
