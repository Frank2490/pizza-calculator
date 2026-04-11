import type { CalculatorInputs, CalculatorResults } from '@/app/types/calculator'

const round1 = (value: number): number =>
  Math.round(value * 10) / 10

export function calculatePizza(inputs: CalculatorInputs): CalculatorResults {
  const {
    totalDoughWeight,
    numberOfBalls,
    prefermentType,
    prefermentPercentage,
    prefermentHydration,
    totalHydration,
    saltPercentage,
    fatPercentage,
    extraYeastPercentage,
  } = inputs

  // KROK 1 — Całkowita waga mąki (baker's percentage)
  const totalFlour = round1(
    totalDoughWeight /
      (1 +
        totalHydration / 100 +
        saltPercentage / 100 +
        fatPercentage / 100 +
        extraYeastPercentage / 100)
  )

  // KROK 2 — Podział mąki
  const isDirect = prefermentType === 'direct'
  const prefermentFlour = isDirect
    ? 0
    : round1(totalFlour * (prefermentPercentage / 100))
  const mainFlour = round1(totalFlour - prefermentFlour)

  // KROK 3 — Woda w prefermencie
  const prefermentWater = isDirect
    ? 0
    : round1(prefermentFlour * (prefermentHydration / 100))

  // KROK 4 — Całkowita woda i woda w cieście właściwym
  const totalWater = round1(totalFlour * (totalHydration / 100))
  const mainWater = round1(totalWater - prefermentWater)

  // KROK 5 — Drożdże w prefermencie
  const prefermentYeastRate =
    prefermentType === 'biga'
      ? 0.002
      : prefermentType === 'poolish'
        ? 0.001
        : 0
  const prefermentYeast = round1(prefermentFlour * prefermentYeastRate)

  // KROK 6 — Składniki ciasta właściwego
  const salt = round1(totalFlour * (saltPercentage / 100))
  const fat = round1(totalFlour * (fatPercentage / 100))

  const baseExtraYeast = totalFlour * (extraYeastPercentage / 100)
  const directBonus = isDirect ? totalFlour * 0.003 : 0
  const extraYeast = round1(baseExtraYeast + directBonus)

  // KROK 7 — Waga kulki
  const ballWeight = round1(totalDoughWeight / numberOfBalls)

  return {
    prefermentFlour,
    prefermentWater,
    prefermentYeast,
    mainFlour,
    mainWater,
    salt,
    fat,
    extraYeast,
    totalFlour,
    totalWater,
    totalWeight: round1(totalDoughWeight),
  }
}

export function formatGrams(value: number): string {
  return `${value}g`
}
