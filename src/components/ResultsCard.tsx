"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  formatCurrency0,
  formatCurrency2,
  type CGTResults,
} from "@/utils/cgtCalculations";
import { Button } from "./ui/button";

interface ResultsCardProps {
  results: CGTResults;
}



const DISCOVERY_URL =
  "https://calendly.com/nanakaccountant/discovery-meeting?back=1&month=2025-09";

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
        {/* CTA Card */}
<Card className="rounded-2xl shadow-md overflow-hidden bg-[#0A2A66] dark:bg-[#0B1E46]">
  <CardContent className="p-4 sm:p-6 text-center">
    <Button
      asChild
      className="w-full h-auto min-h-[44px] inline-flex items-center justify-center 
        px-4 sm:px-6 md:px-8 py-3 sm:py-4 
        text-white font-semibold 
        text-base sm:text-lg md:text-xl leading-snug 
        whitespace-normal break-words text-pretty 
        rounded-lg sm:rounded-xl md:rounded-full 
        bg-[#0A2A66] dark:bg-[#0B1E46] shadow-none
        hover:bg-[#0A2A66] dark:hover:bg-[#0B1E46]"
      aria-label="Book Your Free 15 Minute Consultation"
    >
      <a href={DISCOVERY_URL} target="_blank" rel="noopener noreferrer">
        Book Your Free 15 Minute Consultation
      </a>
    </Button>
  </CardContent>
</Card>

      </CardContent>
    </Card>
  );
}
