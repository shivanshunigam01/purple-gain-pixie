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
      <CardHeader className="pb-4">
        <CardTitle className="text-results-text">Loss you can carry forward</CardTitle>
        <div className="text-4xl font-bold text-results-highlight">
          {formatCurrency(results.lossCarryForward)}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Asset Breakdown */}
        {results.assetBreakdown.map((asset, index) => (
          <div key={asset.assetId} className="flex justify-between items-center">
            <span className="text-sm text-results-text">
              Asset {index + 1} {asset.isLoss ? 'Loss' : 'Taxable Capital Gain'}
            </span>
            <span className="text-sm font-medium text-results-text">
              {formatCurrency(asset.discountedGain)}
            </span>
          </div>
        ))}

        <Separator className="my-4" />

        {/* Calculation Breakdown */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-results-muted">Unapplied Net Capital Losses</span>
            <span className="text-sm font-medium text-results-text">
              {formatCurrency(0)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-results-muted">Net Capital Gain/Loss</span>
            <span className="text-sm font-medium text-results-text">
              {formatCurrency(results.netCapitalGain)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-results-muted">Medicare Levy on Gain</span>
            <span className="text-sm font-medium text-results-text">
              {formatCurrency(results.medicareLevy)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-results-muted">Income Tax on Gain</span>
            <span className="text-sm font-medium text-results-text">
              {formatCurrency(results.cgtPayable)}
            </span>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Total CGT Payable */}
        <div className="bg-primary/5 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-results-text">Total CGT Payable</span>
            <span className="text-xl font-bold text-results-highlight">
              {formatCurrency(results.totalTaxLiability)}
            </span>
          </div>
        </div>

        {/* Tax Summary */}
        <div className="mt-6 space-y-2 text-xs text-results-muted">
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
