"use client";

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
    <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg">
      <CardHeader className="pb-4 text-center">
        <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
          Tax Payable
        </CardTitle>
        <div className="text-5xl font-extrabold text-[#0A2A66] dark:text-[#AFCBFF]">
          {formatCurrency0(results.totalTaxLiability)}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Breakdown list */}
        <div className="space-y-3">
          {results.assetBreakdown.map((asset, index) => (
            <div
              key={asset.assetId}
              className="flex justify-between items-center"
            >
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Asset {index + 1} Taxable Capital Gain/Loss
              </span>
              <span className="text-sm font-medium text-[#0A2A66] dark:text-[#AFCBFF]">
                {formatCurrency2(asset.discountedGain)}
              </span>
            </div>
          ))}

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Unapplied Net Capital Losses
            </span>
            <span className="text-sm font-medium text-[#0A2A66] dark:text-[#AFCBFF]">
              {formatCurrency2(results.priorUnappliedLosses ?? 0)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Net Capital Gain/Loss
            </span>
            <span className="text-sm font-medium text-[#0A2A66] dark:text-[#AFCBFF]">
              {formatCurrency2(results.netCapitalGain)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Medicare Levy on Gain
            </span>
            <span className="text-sm font-medium text-[#0A2A66] dark:text-[#AFCBFF]">
              {formatCurrency2(results.medicareLevy)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Income Tax on Gain
            </span>
            <span className="text-sm font-medium text-[#0A2A66] dark:text-[#AFCBFF]">
              {formatCurrency2(results.cgtPayable)}
            </span>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Summary */}
        <div className="mt-2 space-y-2 text-xs text-gray-600 dark:text-gray-400">
          <div className="flex justify-between">
            <span>Tax without capital gain:</span>
            <span className="font-medium text-[#0A2A66] dark:text-[#AFCBFF]">
              {formatCurrency2(results.taxWithoutGain)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Tax with capital gain:</span>
            <span className="font-medium text-[#0A2A66] dark:text-[#AFCBFF]">
              {formatCurrency2(results.taxWithGain)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Taxable income with gain:</span>
            <span className="font-medium text-[#0A2A66] dark:text-[#AFCBFF]">
              {formatCurrency2(results.taxableIncomeWithGain)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
