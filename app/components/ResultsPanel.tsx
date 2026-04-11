'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { CalculatorResults, PrefermentType } from '@/app/types/calculator'

export interface ResultsPanelProps {
  results: CalculatorResults | null
  prefermentType: PrefermentType
  ballWeight: number
  numberOfBalls: number
}

export function ResultsPanel({
  results,
  prefermentType,
  ballWeight,
  numberOfBalls,
}: ResultsPanelProps) {
  const [copied, setCopied] = useState(false)

  if (!results) return null

  const isDirect = prefermentType === 'direct'

  async function handleCopy() {
    const text = buildRecipeText(results!, prefermentType, ballWeight, numberOfBalls)
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4 pizza-fade-in">
      <div className={`grid gap-4 ${isDirect ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
        {/* KARTA 1 — Preferment (ukryta dla direct) */}
        {!isDirect && (
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold uppercase tracking-tight text-muted-foreground">
                Preferment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <ResultRow label="Mąka prefermentu" value={results.prefermentFlour} />
                <ResultRow label="Woda prefermentu" value={results.prefermentWater} />
                <ResultRow label="Drożdże do prefermentu" value={results.prefermentYeast} />
              </div>
              <Separator />
              <p className="text-xs leading-relaxed text-muted-foreground">
                {prefermentType === 'biga'
                  ? 'Wymieszaj suchą łyżką, przykryj folią z dziurkami. Fermentuj 16–24h w 16–18°C'
                  : 'Wymieszaj dokładnie na gładką papkę. Fermentuj 8–16h w temp. pokojowej'}
              </p>
            </CardContent>
          </Card>
        )}

        {/* KARTA 2 — Ciasto właściwe */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold uppercase tracking-tight text-muted-foreground">
              Ciasto właściwe
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <ResultRow label="Mąka główna" value={results.mainFlour} />
            <ResultRow label="Woda" value={results.mainWater} />
            <ResultRow label="Sól" value={results.salt} />
            {results.fat > 0 && (
              <ResultRow label="Tłuszcz" value={results.fat} />
            )}
            {isDirect ? (
              <ResultRow label="Drożdże" value={results.extraYeast} />
            ) : (
              results.extraYeast > 0 && (
                <ResultRow label="Dodatkowe drożdże" value={results.extraYeast} />
              )
            )}
          </CardContent>
        </Card>
      </div>

      {/* SEKCJA — Podsumowanie */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold uppercase tracking-tight text-muted-foreground">
            Podsumowanie
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-4">
            <SummaryItem label="Całkowita mąka" value={`${results.totalFlour}g`} />
            <SummaryItem label="Całkowita woda" value={`${results.totalWater}g`} />
            <SummaryItem label="Waga ciasta" value={`${results.totalWeight}g`} />
            <SummaryItem
              label="Waga kulki"
              value={`${ballWeight}g`}
              sub={`× ${numberOfBalls} szt.`}
            />
          </div>
          <Separator />
          <button
            onClick={handleCopy}
            className="rounded-lg border border-[var(--pizza-border)] bg-white px-4 py-2 text-sm font-medium text-[var(--pizza-charcoal)] transition-all duration-150 hover:bg-[var(--pizza-accent-light)] hover:border-[var(--pizza-accent)] cursor-pointer w-full sm:w-auto"
          >
            {copied ? '✓ Skopiowano!' : 'Kopiuj przepis'}
          </button>
        </CardContent>
      </Card>
    </div>
  )
}

// --- prywatne pomocnicze komponenty ---

function ResultRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-baseline justify-between gap-2">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span
        className="pizza-result-value text-[1.25rem] font-semibold tabular-nums leading-tight"
        style={{ color: 'var(--pizza-accent)' }}
      >
        {value}g
      </span>
    </div>
  )
}

function SummaryItem({
  label,
  value,
  sub,
}: {
  label: string
  value: string
  sub?: string
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span
        className="pizza-result-value text-[1.25rem] font-semibold tabular-nums leading-tight"
        style={{ color: 'var(--pizza-accent)' }}
      >
        {value}
        {sub && (
          <span className="ml-1 text-sm font-normal text-muted-foreground">{sub}</span>
        )}
      </span>
    </div>
  )
}

// --- formatowanie schowka ---

function buildRecipeText(
  r: CalculatorResults,
  prefermentType: PrefermentType,
  ballWeight: number,
  numberOfBalls: number,
): string {
  const isDirect = prefermentType === 'direct'
  const lines: string[] = []

  lines.push('=== PRZEPIS NA PIZZĘ ===', '')

  if (!isDirect) {
    const typeName = prefermentType === 'biga' ? 'BIGA' : 'POOLISH'
    lines.push(`--- ${typeName} ---`)
    lines.push(`Mąka:    ${r.prefermentFlour}g`)
    lines.push(`Woda:    ${r.prefermentWater}g`)
    lines.push(`Drożdże: ${r.prefermentYeast}g`)
    lines.push('')
  }

  lines.push('--- CIASTO WŁAŚCIWE ---')
  lines.push(`Mąka:    ${r.mainFlour}g`)
  lines.push(`Woda:    ${r.mainWater}g`)
  lines.push(`Sól:     ${r.salt}g`)
  if (r.fat > 0) lines.push(`Tłuszcz: ${r.fat}g`)
  if (isDirect || r.extraYeast > 0) {
    lines.push(`Drożdże: ${r.extraYeast}g`)
  }
  lines.push('')

  lines.push('--- PODSUMOWANIE ---')
  lines.push(`Całkowita mąka: ${r.totalFlour}g`)
  lines.push(`Całkowita woda: ${r.totalWater}g`)
  lines.push(`Waga ciasta:    ${r.totalWeight}g`)
  lines.push(`Kulki:          ${ballWeight}g × ${numberOfBalls} szt.`)

  return lines.join('\n')
}
