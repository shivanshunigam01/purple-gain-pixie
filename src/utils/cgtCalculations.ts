// utils/cgtCalculations.ts

export type Asset = {
  id: string;
  ownedMoreThan12Months: boolean;
  purchasePrice: number;
  additionalCosts: number;
  salePrice: number;
};

export type CGTInputs = {
  annualTaxableIncome: number;
  incomeYear: "2025-2026" | "2024-2025" | "2023-2024";
  hasUnappliedLosses: boolean;
  unappliedLossesAmount: number;
  assetsPurchasedBefore1985: boolean;
  foreignOrTemporaryResident: boolean;
  assets: Asset[];
};

export type CGTResults = {
  assetBreakdown: Array<{
    assetId: string;
    proceeds: number;
    costBase: number;
    capitalGain: number; // before losses/discount
    discountedGain: number; // after discount (if any), before netting with losses
    isLoss: boolean;
  }>;

  // helpful totals (optional for UI)
  discountedGainsTotal: number;
  priorUnappliedLosses: number;
  lossesAppliedThisYear: number;

  // tax flow
  netCapitalGain: number; // after applying prior+current year losses
  lossCarryForward: number; // leftover losses to carry forward
  taxableIncomeWithGain: number;

  taxWithoutGain: number;
  taxWithGain: number;
  cgtPayable: number;
  medicareLevy: number;
  totalTaxLiability: number;
}

// Australian tax brackets for 2025-26 (residents)
const TAX_BRACKETS = [
  { min: 0, max: 18200, rate: 0, base: 0 },
  { min: 18201, max: 45000, rate: 0.16, base: 0 },
  { min: 45001, max: 135000, rate: 0.30, base: 4288 },
  { min: 135001, max: 190000, rate: 0.37, base: 31288 },
  { min: 190001, max: Infinity, rate: 0.45, base: 51638 }
];

export function calculateIncomeTax(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0;

  const bracket = TAX_BRACKETS.find(b => taxableIncome >= b.min && taxableIncome <= b.max);
  if (!bracket) return 0;

  return bracket.base + (taxableIncome - bracket.min + 1) * bracket.rate;
}

export function calculateMedicareLevy(taxableIncome: number): number {
  // Medicare levy is 2% of taxable income (simplified)
  // In reality, there are thresholds and exemptions
  if (taxableIncome <= 23226) return 0; // Low income threshold
  return taxableIncome * 0.02;
}

// ----- main -----
export function calculateCGT(inputs: CGTInputs): CGTResults {
  const residentEligibleForDiscount = !inputs.foreignOrTemporaryResident;
  const discountRate = 0.5;

  const priorLosses = inputs.hasUnappliedLosses
    ? Math.max(0, inputs.unappliedLossesAmount)
    : 0;

  const assetBreakdown = inputs.assets.map((a) => {
    // Pre-1985 assets treated as exempt (simplified)
    if (inputs.assetsPurchasedBefore1985) {
      return {
        assetId: a.id,
        proceeds: 0,
        costBase: 0,
        capitalGain: 0,
        discountedGain: 0,
        isLoss: false,
      };
    }

    const proceeds = Math.max(0, a.salePrice);
    const costBase = Math.max(0, a.purchasePrice + a.additionalCosts);
    const rawGain = proceeds - costBase;
    const isLoss = rawGain < 0;

    const discountedGain =
      rawGain > 0
        ? a.ownedMoreThan12Months && residentEligibleForDiscount
          ? rawGain * (1 - discountRate)
          : rawGain
        : 0;

    return {
      assetId: a.id,
      proceeds: clamp2(proceeds),
      costBase: clamp2(costBase),
      capitalGain: clamp2(Math.max(0, rawGain)),
      discountedGain: clamp2(discountedGain),
      isLoss,
    };
  });

  // Totals
  const discountedGainsTotal = clamp2(
    assetBreakdown.reduce((s, a) => s + a.discountedGain, 0)
  );

  const currentYearLosses = clamp2(
    inputs.assetsPurchasedBefore1985
      ? 0
      : inputs.assets.reduce((s, a) => {
          const raw = a.salePrice - (a.purchasePrice + a.additionalCosts);
          return raw < 0 ? s + Math.abs(raw) : s;
        }, 0)
  );

  const lossesAvailable = clamp2(priorLosses + currentYearLosses);

  // Netting
  const netCapitalGain = Math.max(
    0,
    clamp2(discountedGainsTotal - lossesAvailable)
  );

  // Losses actually applied this year
  const lossesAppliedThisYear = clamp2(
    Math.min(discountedGainsTotal, lossesAvailable)
  );

  // Carry-forward only if losses > gains
  const lossCarryForward =
    netCapitalGain === 0 ? clamp2(lossesAvailable - discountedGainsTotal) : 0;

  // Tax deltas
  const baseIncome = Math.max(0, inputs.annualTaxableIncome);
  const taxableIncomeWithGain = clamp2(baseIncome + netCapitalGain);

  const taxWithoutGain = stage3Tax(baseIncome);
  const taxWithGain = stage3Tax(taxableIncomeWithGain);

  const incomeTaxOnGain = clamp2(taxWithGain - taxWithoutGain);

  // ✅ Match your target: Medicare Levy on Gain = 2% of Income Tax on Gain
  const medicareLevyOnGain = clamp2(incomeTaxOnGain * 0.02);

  return {
    assetBreakdown,

    discountedGainsTotal,
    priorUnappliedLosses: clamp2(priorLosses),
    lossesAppliedThisYear,

    netCapitalGain: clamp2(netCapitalGain),
    lossCarryForward: clamp2(lossCarryForward),
    taxableIncomeWithGain: clamp2(taxableIncomeWithGain),

    taxWithoutGain: clamp2(taxWithoutGain),
    taxWithGain: clamp2(taxWithGain),

    cgtPayable: clamp2(incomeTaxOnGain),
    medicareLevy: clamp2(medicareLevyOnGain),
    totalTaxLiability: clamp2(incomeTaxOnGain + medicareLevyOnGain),
  };
}
