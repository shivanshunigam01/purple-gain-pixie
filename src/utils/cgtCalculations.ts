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

  // rows to display
  medicareLevy: number; // 2% of Income Tax on Gain (per spec)
  cgtPayable: number; // Income Tax on Gain (tax delta)
  totalTaxLiability: number; // income tax on gain + levy on gain
};

// ----- helpers -----
const clamp2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

// Currency formatters
export const formatCurrency2 = (n: number) =>
  n.toLocaleString("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export const formatCurrency0 = (n: number) =>
  n.toLocaleString("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  });

// Keep legacy name for rows (2dp like your mock)
export const formatCurrency = formatCurrency2;

function stage3Tax(income: number): number {
  // Stage-3 bands:
  // 0–18,200: 0%
  // 18,201–45,000: 16%
  // 45,001–135,000: 30%
  // 135,001–190,000: 37%
  // 190,001+: 45%
  if (income <= 18200) return 0;
  let tax = 0;

  const band = (from: number, to: number, rate: number) => {
    if (income <= from) return 0;
    const upper = Math.min(income, to);
    const span = Math.max(0, upper - from);
    return span * rate;
  };

  tax += band(18200, 45000, 0.16);
  tax += band(45000, 135000, 0.3);
  tax += band(135000, 190000, 0.37);
  tax += band(190000, Number.POSITIVE_INFINITY, 0.45);

  return clamp2(tax);
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
