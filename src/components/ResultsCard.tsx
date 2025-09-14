import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  formatCurrency0,
  formatCurrency2,
  type CGTResults,
} from "@/utils/cgtCalculations";

interface ResultsCardProps {
  results: CGTResults;
}

export function ResultsCard({ results }: ResultsCardProps) {
  return (
    <Card className="bg-results-background border-0 shadow-lg">
      <CardHeader className="pb-4 text-center">
        <CardTitle className="text-results-muted text-sm font-medium">
          Tax Payable
        </CardTitle>
        <div className="text-5xl font-extrabold text-results-highlight">
          {formatCurrency0(results.totalTaxLiability)}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Breakdown list (matches target mock) */}
        <div className="space-y-3">
          {results.assetBreakdown.map((asset, index) => (
            <div
              key={asset.assetId}
              className="flex justify-between items-center"
            >
              <span className="text-sm text-results-muted">
                Asset {index + 1} Taxable Capital Gain/Loss
              </span>
              <span className="text-sm font-medium text-results-text">
                {formatCurrency2(asset.discountedGain)}
              </span>
            </div>
          ))}

          <div className="flex justify-between items-center">
            <span className="text-sm text-results-muted">
              Unapplied Net Capital Losses
            </span>
            <span className="text-sm font-medium text-results-text">
              {formatCurrency2(results.priorUnappliedLosses ?? 0)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-results-muted">
              Net Capital Gain/Loss
            </span>
            <span className="text-sm font-medium text-results-text">
              {formatCurrency2(results.netCapitalGain)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-results-muted">
              Medicare Levy on Gain
            </span>
            <span className="text-sm font-medium text-results-text">
              {formatCurrency2(results.medicareLevy)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-results-muted">
              Income Tax on Gain
            </span>
            <span className="text-sm font-medium text-results-text">
              {formatCurrency2(results.cgtPayable)}
            </span>
          </div>
        </div>

        <Separator className="my-4 bg-white/20" />

        {/* Small summary block */}
        <div className="mt-2 space-y-2 text-xs text-results-muted">
          <div className="flex justify-between">
            <span>Tax without capital gain:</span>
            <span>{formatCurrency2(results.taxWithoutGain)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax with capital gain:</span>
            <span>{formatCurrency2(results.taxWithGain)}</span>
          </div>
          <div className="flex justify-between">
            <span>Taxable income with gain:</span>
            <span>{formatCurrency2(results.taxableIncomeWithGain)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
