import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency, type CGTResults } from "@/utils/cgtCalculations";

interface ResultsCardProps {
  results: CGTResults;
}

export function ResultsCard({ results }: ResultsCardProps) {
  return (
    <Card className="bg-primary text-primary-foreground border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-white">Loss you can carry forward</CardTitle>
        <div className="text-4xl font-bold text-white">
          {formatCurrency(results.lossCarryForward)}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Asset Breakdown */}
        {results.assetBreakdown.map((asset, index) => (
          <div key={asset.assetId} className="flex justify-between items-center">
            <span className="text-sm text-white/90">
              Asset {index + 1} {asset.isLoss ? 'Loss' : 'Taxable Capital Gain'}
            </span>
            <span className="text-sm font-medium text-white">
              {formatCurrency(asset.discountedGain)}
            </span>
          </div>
        ))}

        <Separator className="my-4 bg-white/20" />

        {/* Calculation Breakdown */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-white/70">Unapplied Net Capital Losses</span>
            <span className="text-sm font-medium text-white">
              {formatCurrency(0)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-white/70">Net Capital Gain/Loss</span>
            <span className="text-sm font-medium text-white">
              {formatCurrency(results.netCapitalGain)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-white/70">Medicare Levy on Gain</span>
            <span className="text-sm font-medium text-white">
              {formatCurrency(results.medicareLevy)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-white/70">Income Tax on Gain</span>
            <span className="text-sm font-medium text-white">
              {formatCurrency(results.cgtPayable)}
            </span>
          </div>
        </div>

        <Separator className="my-4 bg-white/20" />

        {/* Total CGT Payable */}
        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-white">Total CGT Payable</span>
            <span className="text-xl font-bold text-white">
              {formatCurrency(results.totalTaxLiability)}
            </span>
          </div>
        </div>

        {/* Tax Summary */}
        <div className="mt-6 space-y-2 text-xs text-white/70">
          <div className="flex justify-between">
            <span>Tax without capital gain:</span>
            <span>{formatCurrency(results.taxWithoutGain)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax with capital gain:</span>
            <span>{formatCurrency(results.taxWithGain)}</span>
          </div>
          <div className="flex justify-between">
            <span>Taxable income with gain:</span>
            <span>{formatCurrency(results.taxableIncomeWithGain)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}