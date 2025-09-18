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
    <div className="min-h-screen bg-white dark:bg-[#141B24] transition-colors">
      {/* Header */}
      <header className="bg-gray-50 dark:bg-[#141B24] border-b border-gray-200 dark:border-gray-700 transition-colors">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Capital Gains Tax Calculator
              </h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1 max-w-2xl">
                Our calculator provides an estimate of the CGT to be paid based
                on the sale price of the property less the expenses that come
                with purchasing, maintaining, and selling the property.
              </p>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8 max-w-[1200px]">
          {/* Form */}
          <div className="order-1 lg:order-1">
            <Card className="bg-white dark:bg-[#141B24] border border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Enter Your Details
                  </h2>
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    className="border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#1E2A38]"
                  >
                    Reset
                  </Button>
                </div>
                <CalculatorForm inputs={inputs} onChange={handleInputChange} />
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="order-2 lg:order-2">
            <ResultsCard results={results} />
          </div>
        </div>

        {/* Disclaimer */}
        <Card className="mt-12 bg-white dark:bg-[#141B24] border border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                Important Disclaimer
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                This calculator provides estimates only and should not be used
                as the sole basis for financial decisions. Calculations are
                simplified and may not account for all tax considerations.
                Please consult a qualified tax professional for advice.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#141B24] mt-10 transition-colors">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-600 dark:text-gray-400">
          <p>
            © 2025 CGT Calculator. Estimates only. Always confirm with ATO
            guidance.
          </p>
        </div>
      </footer>
    </div>
  );
}
