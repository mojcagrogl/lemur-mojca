import {fingerprint, createResult} from './scoring.js';
const $ = id => document.getElementById(id);
let photoHash = null, photoURL = null, occasion = 'everyday', busy = false, selection = 0, installPrompt = null;
const result = $('result');
function clearResult(){result.hidden = true;}
function resetPhoto(){
  selection++; photoHash = null;
  if(photoURL) URL.revokeObjectURL(photoURL);
  photoURL = null; $('preview').removeAttribute('src'); $('preview').hidden = true;
  $('placeholder').hidden = false; $('remove').hidden = true; $('rate').disabled = true;
  $('camera-input').value = ''; $('file-input').value = ''; clearResult();
  $('status').textContent = 'Začni s fotografijo svojega outfita.';
}
async function selectPhoto(file){
  if(!file || busy) return;
  resetPhoto(); const token = selection;
  if(!file.type.startsWith('image/')){$('status').textContent = 'Izberi slikovno datoteko (na primer JPG ali PNG).';return;}
  if(file.size > 20 * 1024 * 1024){$('status').textContent = 'Fotografija je prevelika. Izberi sliko, manjšo od 20 MB.';return;}
  $('status').textContent = 'Pripravljam fotografijo …';
  let candidate = null;
  try {
    candidate = URL.createObjectURL(file);
    const image = new Image(); image.src = candidate; await image.decode();
    const bytes = new Uint8Array(await file.arrayBuffer());
    if(token !== selection){URL.revokeObjectURL(candidate);return;}
    photoHash = fingerprint(bytes);photoURL = candidate;
    $('preview').src = candidate; $('preview').hidden = false; $('placeholder').hidden = true;
    $('remove').hidden = false; $('rate').disabled = false;
    $('status').textContent = 'Fotografija je pripravljena. Čas za malo modnega navdiha.';
  } catch {
    if(candidate) URL.revokeObjectURL(candidate);
    if(token === selection) $('status').textContent = 'Te slike ne morem odpreti. Poskusi s fotografijo JPG, PNG ali WebP.';
  }
}
$('camera').addEventListener('click',()=>$('camera-input').click());
$('upload').addEventListener('click',()=>$('file-input').click());
for(const id of ['camera-input','file-input']) $(id).addEventListener('change',e=>selectPhoto(e.target.files[0]));
$('remove').addEventListener('click',resetPhoto);
document.querySelectorAll('.chip').forEach(button=>button.addEventListener('click',()=>{
  if(busy)return;
  occasion = button.dataset.occasion;
  document.querySelectorAll('.chip').forEach(chip=>{const selected = chip === button;chip.classList.toggle('selected',selected);chip.setAttribute('aria-pressed',String(selected));});
  clearResult();
}));
$('feeling').addEventListener('change',clearResult);
$('rate').addEventListener('click',async()=>{
  if(photoHash === null || busy)return;
  busy = true; clearResult(); document.body.classList.add('loading');
  const controls = [...document.querySelectorAll('.chip, #feeling, #camera, #upload, #remove, #rate')];
  controls.forEach(control=>control.disabled=true);
  const stages = ['Pripravljam tvojo igrivo oceno …', 'Izbiram modni namig za tvojo priložnost …'];
  for(const text of stages){$('status').textContent=text;await new Promise(resolve=>setTimeout(resolve,650));}
  const response = createResult(photoHash,occasion,$('feeling').value);
  $('score').textContent=response.score; $('result-title').textContent=response.title;
  $('verdict').textContent=response.verdict;$('tip').textContent=response.tip;
  result.hidden=false;document.body.classList.remove('loading');busy=false;
  controls.forEach(control=>control.disabled=false);
  $('status').textContent='Tvoja igriva ocena je pripravljena.';
  result.focus({preventScroll:true}); result.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'center'});
});
$('again').addEventListener('click',()=>{resetPhoto();$('camera').focus();$('photo-area').scrollIntoView({block:'center'});});
const info = $('info');
$('about').addEventListener('click',()=>info.showModal());
document.querySelectorAll('.close-dialog,.close-info').forEach(button=>button.addEventListener('click',()=>info.close()));
info.addEventListener('click',e=>{if(e.target===info){const r=info.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)info.close();}});
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;});
$('install').addEventListener('click',async()=>{if(installPrompt){await installPrompt.prompt();installPrompt=null;}else{info.showModal();}});
if('serviceWorker' in navigator && location.protocol !== 'file:') navigator.serviceWorker.register('./sw.js').catch(()=>{$('status').textContent='Spletna različica je pripravljena. Namestitev brez povezave trenutno ni na voljo.';});
window.addEventListener('pagehide',()=>{if(photoURL)URL.revokeObjectURL(photoURL);});
