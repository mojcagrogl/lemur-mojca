// An entertainment mechanic, deliberately not an analysis of clothing or people.
export function fingerprint(bytes) {
  let hash = 2166136261;
  for (const byte of bytes) hash = Math.imul(hash ^ byte, 16777619) >>> 0;
  return hash;
}
const tips = {
  everyday: ['Za vsakdanji videz poskusi en kos z značajem: zanimivo torbo, šal ali nakit. Ostalo naj diha.', 'Pred odhodom preveri udobje pri hoji in sedenju. Dober outfit gre v korak s tvojim dnevom.', 'Če želiš bolj povezano kombinacijo, poskusi eno barvo ponoviti v dodatku.'],
  work: ['Za službo poskusi kombinacijo udobne osnove in enega bolj strukturiranega kosa, na primer suknjiča.', 'Pri službenem outfitu pomisli tudi na ves dan: udobni čevlji in prilagodljive plasti lahko naredijo veliko razliko.', 'Pred ogledalom preizkusi zavihane rokave ali drugače zatlačeno srajco. Majhna sprememba lahko osveži celoto.'],
  evening: ['Za večer lahko izbereš en poudarek: izrazite uhane, zanimivo torbico ali drugačno teksturo.', 'Poskusi se poigrati s kontrastom tekstur, na primer mehko pletenino in gladkim dodatkom.', 'Pri večernem videzu naj bodo čevlji takšni, da boš z veseljem ostala še za eno pesem.'],
  special: ['Za poseben dan izberi en detajl, ki je res tvoj. Osebni pečat je lepši od popolnega posnemanja trendov.', 'Celoten outfit preizkusi skupaj s čevlji in torbico. Tako najlažje sama opaziš, kaj bi še prilagodila.', 'Za poseben dan si privošči malo igre z dodatki, vendar obdrži tisto, v čemer se počutiš dobro.']
};
export function createResult(hash, occasion, feeling) {
  const confidence = {unsure: 0, comfortable: 5, confident: 10}[feeling] ?? 0;
  const score = Math.min(100, 1 + (hash % 90) + confidence);
  const title = score >= 80 ? 'Danes je tvoj trenutek.' : score >= 50 ? 'Tvoj stil, tvoja zgodba.' : 'Prostor za malo igre.';
  const verdict = feeling === 'confident' ? 'Praviš, da se v tem outfitu počutiš odlično. Naj te ta občutek spremlja skozi dan — samozavest je vedno dober začetek.' : feeling === 'comfortable' ? 'Praviš, da ti je udobno in si sproščena. Ohrani ta občutek, z dodatki pa se poigraj samo toliko, kolikor ti ustreza.' : 'Če še iščeš pravi občutek, preizkusi eno majhno spremembo in primerjaj obe različici pred ogledalom. Tvoj občutek ima zadnjo besedo.';
  const options = tips[occasion] || tips.everyday;
  return {score, title, verdict, tip: options[(hash >>> 8) % options.length]};
}
