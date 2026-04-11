export type PrefermentType = 'biga' | 'poolish' | 'direct'
// direct = fermentacja jednofazowa

export type CalculatorInputs = {
  // Parametry ogólne
  totalDoughWeight: number        // całkowita waga ciasta w gramach
  numberOfBalls: number           // liczba kulek
  ballWeight: number              // waga jednej kulki (obliczana auto)

  // Preferment
  prefermentType: PrefermentType
  prefermentPercentage: number    // % mąki w prefermencie (0-100)
  prefermentHydration: number     // hydratacja prefermentu (np. 50-100%)

  // Ciasto właściwe
  totalHydration: number          // całkowita hydratacja ciasta (55-80%)
  saltPercentage: number          // % soli (1.5-3%)
  fatPercentage: number           // % tłuszczu (0-10%), 0 = brak
  extraYeastPercentage: number    // % dodatkowych drożdży (0-1%), 0 = brak
}

export type CalculatorResults = {
  // Preferment
  prefermentFlour: number
  prefermentWater: number
  prefermentYeast: number         // drożdże do prefermentu

  // Ciasto właściwe
  mainFlour: number
  mainWater: number
  salt: number
  fat: number
  extraYeast: number

  // Podsumowanie
  totalFlour: number
  totalWater: number
  totalWeight: number
}
