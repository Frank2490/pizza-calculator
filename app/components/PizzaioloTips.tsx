import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const TIPS = [
  {
    value: 'tip-1',
    title: '🧂 Nigdy nie mieszaj drożdży z solą od razu',
    content:
      'Sól zabija drożdże w bezpośrednim kontakcie. Zawsze dodawaj sól po wstępnym połączeniu drożdży z mąką i wodą, lub dodawaj je z różnych stron miski. W metodzie biga/poolish sól dodajesz TYLKO do ciasta właściwego, nigdy do prefermentu.',
  },
  {
    value: 'tip-2',
    title: '💧 Procent hydratacji a charakter ciasta',
    content:
      '55–62% — ciasto zwarte, łatwe w formowaniu, idealne dla początkujących. 63–70% — pizze neapolitańskie stylu classico, otwarta struktura miękiszu. 71–80% — contemporanea, bardzo otwarta struktura, wymaga doświadczenia i mocnej mąki (W340+).',
  },
  {
    value: 'tip-3',
    title: '🧂 Jak sól wpływa na ciasto',
    content:
      '2–2.5% soli to złoty standard. Sól wzmacnia siatkę glutenową, spowalnia fermentację i poprawia smak. Mniej niż 1.8% — ciasto słabe, fermentuje za szybko. Więcej niż 3% — ciasto zbyt twarde, drożdże zahamowane. W upale używaj górnej granicy, w zimie dolnej.',
  },
  {
    value: 'tip-4',
    title: '🌡️ Temperatura a czas fermentacji',
    content:
      'Reguła 55–58°C: suma temperatury mąki + wody + otoczenia powinna wynosić 55–58°C, żeby uzyskać temperaturę ciasta ~23–25°C. Fermentacja: 20°C = 24h, 23°C = 16–18h, 26°C = 8–12h, lodówka 4°C = 48–72h. Biga fermentuje 16–24h w temp. 16–18°C (okno lub piwnica). Poolish 8–16h w temp. pokojowej.',
  },
  {
    value: 'tip-5',
    title: '🌾 Mąka — siła glutenu ma znaczenie',
    content:
      'Oznaczenie W (siła mąki): W200–250 — słaba mąka, krótkie fermentacje (4–8h). W260–300 — mąka średnia, poolish i krótka biga. W320–380 — mocna mąka, długie biegi 24–72h, pizza contemporanea. Do blendowania: mix 70% mocnej + 30% słabszej daje ciekawy smak przy zachowaniu struktury.',
  },
  {
    value: 'tip-6',
    title: '🫙 Biga, Poolish czy Direct — kiedy co wybrać?',
    content:
      'BIGA (twarda, 50% hydratacji): głęboki smak, chrupiąca skórka, długa fermentacja. Idealna do pizzy na wysokie temperatury pieca (400°C+). POOLISH (płynna, 100% hydratacji): lżejszy miękisz, bardziej kremowa struktura, łatwiejsza w obsłudze. DIRECT (jednofazowa): najprostsza, najkrótszy czas, dobra na piec domowy. Mniej złożony smak, ale szybka i przewidywalna.',
  },
]

export function PizzaioloTips() {
  return (
    <Card className="bg-muted/40 border-muted">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold tracking-tight text-muted-foreground uppercase">
          Podstawy dobrego pizzaiolo
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <Accordion className="w-full">
          {TIPS.map((tip) => (
            <AccordionItem key={tip.value} value={tip.value} className="border-muted">
              <AccordionTrigger className="text-sm font-medium text-left py-3 hover:no-underline">
                {tip.title}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-3">
                {tip.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}
