'use client'

import { useState } from 'react'
import { calculatePizza } from '@/lib/calculator'
import type { PrefermentType } from '@/app/types/calculator'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ResultsPanel } from './ResultsPanel'

const PREFERMENT_OPTIONS: { type: PrefermentType; label: string }[] = [
  { type: 'biga', label: 'BIGA' },
  { type: 'poolish', label: 'POOLISH' },
  { type: 'direct', label: 'DIRECT' },
]

function pickFirst(val: number | readonly number[]): number {
  return Array.isArray(val) ? (val as readonly number[])[0] : (val as number)
}

function fmt(value: number, step: number): string {
  return step >= 1 ? String(value) : value.toFixed(1)
}

export function PizzaCalculator() {
  const [numberOfBalls, setNumberOfBalls] = useState(4)
  const [numberOfBallsInput, setNumberOfBallsInput] = useState('4')
  const [ballWeight, setBallWeight] = useState(280)
  const [ballWeightInput, setBallWeightInput] = useState('280')
  const [prefermentType, setPrefermentType] = useState<PrefermentType>('biga')
  const [prefermentPercentage, setPrefermentPercentage] = useState(30)
  const [prefermentHydration, setPrefermentHydration] = useState(50)
  const [totalHydration, setTotalHydration] = useState(68)
  const [saltPercentage, setSaltPercentage] = useState(2.5)
  const [fatPercentage, setFatPercentage] = useState(0)
  const [extraYeastPercentage, setExtraYeastPercentage] = useState(0)

  const totalDoughWeight = numberOfBalls * ballWeight

  const results = calculatePizza({
    totalDoughWeight,
    numberOfBalls,
    ballWeight,
    prefermentType,
    prefermentPercentage,
    prefermentHydration,
    totalHydration,
    saltPercentage,
    fatPercentage,
    extraYeastPercentage,
  })

  function handlePrefermentTypeChange(type: PrefermentType) {
    setPrefermentType(type)
    if (type === 'biga') setPrefermentHydration(50)
    if (type === 'poolish') setPrefermentHydration(100)
  }

  const isDirect = prefermentType === 'direct'

  return (
    <TooltipProvider>
      <div className="space-y-4">
        {/* SEKCJA 1 — Podstawowe parametry */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold uppercase tracking-tight text-muted-foreground">
              Podstawowe parametry
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="numberOfBalls">Liczba kulek</Label>
                <Input
                  id="numberOfBalls"
                  type="number"
                  min={1}
                  max={100}
                  step={1}
                  value={numberOfBallsInput}
                  onChange={(e) => setNumberOfBallsInput(e.target.value)}
                  onBlur={() => {
                    const parsed = parseInt(numberOfBallsInput, 10)
                    const clamped = isNaN(parsed) ? 4 : Math.max(1, Math.min(100, parsed))
                    setNumberOfBalls(clamped)
                    setNumberOfBallsInput(String(clamped))
                  }}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ballWeight">Waga kulki [g]</Label>
                <Input
                  id="ballWeight"
                  type="number"
                  min={150}
                  max={400}
                  step={5}
                  value={ballWeightInput}
                  onChange={(e) => setBallWeightInput(e.target.value)}
                  onBlur={() => {
                    const parsed = parseInt(ballWeightInput, 10)
                    const clamped = isNaN(parsed) ? 260 : Math.max(150, Math.min(400, parsed))
                    setBallWeight(clamped)
                    setBallWeightInput(String(clamped))
                  }}
                />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Całkowita waga ciasta:{' '}
              <span className="font-bold text-foreground">{totalDoughWeight}g</span>
            </p>
          </CardContent>
        </Card>

        {/* SEKCJA 2 — Wybór prefermentu */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold uppercase tracking-tight text-muted-foreground">
              Wybór prefermentu
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              {PREFERMENT_OPTIONS.map(({ type, label }) => (
                <button
                  key={type}
                  onClick={() => handlePrefermentTypeChange(type)}
                  className={cn(
                    'w-full rounded-lg px-3 py-2.5 text-sm font-semibold tracking-wide uppercase transition-all duration-150 cursor-pointer',
                    prefermentType === type
                      ? 'bg-[var(--pizza-accent)] text-white shadow-md'
                      : 'bg-white border border-[var(--pizza-border)] text-[var(--pizza-charcoal)] hover:bg-[var(--pizza-accent-light)]'
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

            {isDirect ? (
              <p className="rounded-md bg-muted/50 px-3 py-2 text-sm text-muted-foreground">
                Fermentacja jednofazowa — drożdże dodane bezpośrednio do ciasta
              </p>
            ) : (
              <div className="space-y-4">
                <SliderField
                  label="Udział prefermentu"
                  value={prefermentPercentage}
                  min={10}
                  max={80}
                  step={1}
                  unit="%"
                  onChange={setPrefermentPercentage}
                />
                <SliderField
                  label="Hydratacja prefermentu"
                  value={prefermentHydration}
                  min={40}
                  max={100}
                  step={1}
                  unit="%"
                  onChange={setPrefermentHydration}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* SEKCJA 3 — Parametry ciasta */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold uppercase tracking-tight text-muted-foreground">
              Parametry ciasta
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <SliderField
              label="Hydratacja całkowita"
              value={totalHydration}
              min={55}
              max={80}
              step={1}
              unit="%"
              onChange={setTotalHydration}
            />
            <SliderField
              label="Sól"
              value={saltPercentage}
              min={1.5}
              max={3.5}
              step={0.1}
              unit="%"
              onChange={setSaltPercentage}
            />
            <SliderField
              label="Tłuszcz"
              value={fatPercentage}
              min={0}
              max={10}
              step={0.5}
              unit="%"
              tooltip="0% = brak tłuszczu. Oliwa z oliwek nadaje elastyczność"
              onChange={setFatPercentage}
            />
            <SliderField
              label="Dodatkowe drożdże"
              value={extraYeastPercentage}
              min={0}
              max={2}
              step={0.1}
              unit="%"
              tooltip="Tylko jeśli chcesz przyspieszyć fermentację ciasta właściwego"
              onChange={setExtraYeastPercentage}
            />
          </CardContent>
        </Card>

        <ResultsPanel
          results={results}
          prefermentType={prefermentType}
          ballWeight={ballWeight}
          numberOfBalls={numberOfBalls}
        />
      </div>
    </TooltipProvider>
  )
}

// --- SliderField — prywatny helper ---

interface SliderFieldProps {
  label: string
  value: number
  min: number
  max: number
  step: number
  unit: string
  tooltip?: string
  onChange: (value: number) => void
}

function SliderField({
  label,
  value,
  min,
  max,
  step,
  unit,
  tooltip,
  onChange,
}: SliderFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Label>{label}</Label>
          {tooltip && (
            <Tooltip>
              <TooltipTrigger
                className="inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-bold text-muted-foreground"
                aria-label="Informacja"
              >
                ?
              </TooltipTrigger>
              <TooltipContent>{tooltip}</TooltipContent>
            </Tooltip>
          )}
        </div>
        <span className="text-sm font-medium tabular-nums">
          {fmt(value, step)}{unit}
        </span>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={(val) => onChange(pickFirst(val))}
      />
    </div>
  )
}
