# Lemur · Mojca Urlep

Brezplačna, statična PWA v slovenščini. Brez API ključa, zunanjih knjižnic, naročnin, analitike, računov ali strežniške obdelave fotografij.

## Kaj deluje

- Fotografiranje s sistemsko kamero na podprtih telefonih oziroma izbor fotografije.
- Predogled, odstranitev in zamenjava slike; preverjanje formata in velikosti do 20 MB.
- Izbor priložnosti in počutja.
- Igriva ocena 1–100 in splošni vnaprej pripravljeni nasveti.
- Namestitev na domači zaslon in delo brez povezave po prvem uspešnem spletnem obisku.
- Prilagoditev telefonu, tipkovnici in nastavitvi zmanjšanega gibanja.

**To ni AI analiza in ni osebno mnenje Mojce Urlep.** Ocena je deterministična igra iz digitalnega odtisa datoteke in izbranega počutja. Priložnost določa kategorijo nasvetov. Koda ne zaznava oblačil, barv, postave ali primernosti outfita. Spremenjena ali ponovno izvožena fotografija lahko dobi drugo oceno. To je pojasnjeno tudi v aplikaciji.

Fotografija je samo začasno v pomnilniku brskalnika. Osvežitev jo odstrani. Service worker shranjuje samo datoteke aplikacije; fotografij in rezultatov ne shranjuje. V aplikaciji ni zunanjih omrežnih zahtev, fontov ali CDN-jev.

## Lokalni predogled

Potrebuješ Node.js 20 ali novejši. Namestitev paketov ni potrebna.

```sh
npm run dev
```

Odpri http://127.0.0.1:4173. Datoteke HTML ne odpiraj neposredno z dvojnim klikom, ker JavaScript moduli in PWA zahtevajo spletni strežnik. Preizkusi: `npm test`.

## GitHub Pages: brezplačna objava osebnega prototipa

1. Ustvari javni repozitorij `lemur-mojca` v svojem GitHub računu.
2. Naloži vse datoteke te mape v koren repozitorija, vključno z mapo `icons`. Ne nalagaj ZIP-a kot edine datoteke.
3. Settings → Pages → Deploy from a branch → main → /(root) → Save.
4. Po uspešni objavi odpri naslov, ki ga izpiše GitHub Pages.

Relativne poti omogočajo objavo tudi na naslovu s podmapo, na primer `/lemur-mojca/`. GitHub Pages Free zahteva javni repozitorij. Namenjen je osebnim in organizacijskim predstavitvenim projektom; ni dovoljen kot brezplačno gostovanje spletnega poslovanja ali komercialnega SaaS. Vir: https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits

## Vercel (neobvezno)

Uvozi repozitorij, Framework Preset: Other, brez build koraka, Output Directory: `.`. Brez okoljskih spremenljivk. Vercel Hobby je omejen na osebno, nekomercialno uporabo: https://vercel.com/docs/plans/hobby . Ne aktiviraj plačljivega paketa; ta aplikacija ne potrebuje nobene plačljive storitve. Za poslovno gostovanje preveri aktualne pogoje izbranega ponudnika. Aplikacija sama nima stroškov uporabe; pogoji gostovanja so ločeni.

## Telefon

Za namestitev in service worker potrebuješ HTTPS (izjema je localhost na isti napravi). Android: meni brskalnika → Namesti aplikacijo ali Dodaj na začetni zaslon. iPhone: Safari → Deli → Dodaj na začetni zaslon. Razpoložljivost namestitve in kamere je odvisna od brskalnika. Če kamera ni na voljo, uporabi izbor fotografije.

Pred predajo na pravi napravi preveri kamero, namestitev in ponovni zagon v letalskem načinu. Ob spremembi datotek zvišaj različico `CACHE` v `sw.js`; novo različico uporabnik dobi po zaključku prejšnje seje.
