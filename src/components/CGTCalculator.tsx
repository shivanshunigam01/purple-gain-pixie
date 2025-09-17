"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CalculatorForm } from "@/components/CalculatorForm";
import { ResultsCard } from "@/components/ResultsCard";
import {
  calculateCGT,
  type CGTInputs,
  type CGTResults,
} from "@/utils/cgtCalculations";

const initialInputs: CGTInputs = {
  annualTaxableIncome: 90000,
  incomeYear: "2025-2026",
  hasUnappliedLosses: false,
  unappliedLossesAmount: 0,
  assetsPurchasedBefore1985: false,
  foreignOrTemporaryResident: false,
  assets: [
    {
      id: "asset-1",
      ownedMoreThan12Months: true,
      purchasePrice: 0,
      additionalCosts: 0,
      salePrice: 0,
    },
  ],
};

export function CGTCalculator() {
  const [inputs, setInputs] = useState<CGTInputs>(initialInputs);
  const [results, setResults] = useState<CGTResults>(() =>
    calculateCGT(initialInputs)
  );

  const handleInputChange = (newInputs: CGTInputs) => {
    setInputs(newInputs);
    setResults(calculateCGT(newInputs));
  };

  const handleReset = () => {
    setInputs(initialInputs);
    setResults(calculateCGT(initialInputs));
  };

  return (
    <div className="min-h-screen bg-background transition-colors">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1
                className="text-3xl font-bold uppercase tracking-wide 
                text-[#0A2A66] dark:text-[#AFCBFF] mb-2"
              >
                Capital Gains Tax Calculator
              </h1>
              <p className="text-sm text-muted-foreground max-w-2xl">
                Our calculator provides an estimate of the CGT to be paid based
                on the sale price of the property less the expenses that come
                with purchasing, maintaining, and selling the property.
              </p>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <Card className="bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-[#0A2A66] dark:text-[#AFCBFF]">
                  Capital Gains Tax Calculator
                </h2>
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="border-[#0A2A66] text-[#0A2A66] hover:bg-[#0A2A66] hover:text-white
                             dark:border-[#AFCBFF] dark:text-[#AFCBFF] dark:hover:bg-[#AFCBFF] dark:hover:text-gray-900"
                >
                  Reset
                </Button>
              </div>

              <CalculatorForm inputs={inputs} onChange={handleInputChange} />
            </CardContent>
          </Card>

          {/* Results */}
          <div className="lg:sticky lg:top-8">
            <ResultsCard results={results} />
          </div>
        </div>

        {/* Disclaimer */}
        <Card className="mt-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="font-semibold mb-2 text-[#0A2A66] dark:text-[#AFCBFF]">
                Important Disclaimer
              </h3>
              <p className="text-sm text-muted-foreground">
                This calculator provides estimates only and should not be used
                as the sole basis for financial decisions. The calculations are
                simplified and may not account for all tax considerations.
                Please consult with a qualified tax professional or accountant
                for comprehensive tax advice.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
