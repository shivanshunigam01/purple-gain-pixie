import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CalculatorForm } from "@/components/CalculatorForm";
import { ResultsCard } from "@/components/ResultsCard";
import { SponsoredOffers } from "@/components/SponsoredOffers";
import { HowToUse } from "@/components/HowToUse";
import { ExampleSection } from "@/components/ExampleSection";
import { ResourcesSection } from "@/components/ResourcesSection";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { calculateCGT, type CGTInputs, type CGTResults } from "@/utils/cgtCalculations";

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
      salePrice: 0
    }
  ]
};

export function CGTCalculator() {
  const [inputs, setInputs] = useState<CGTInputs>(initialInputs);
  const [results, setResults] = useState<CGTResults>(() => calculateCGT(initialInputs));

  const handleInputChange = (newInputs: CGTInputs) => {
    setInputs(newInputs);
    setResults(calculateCGT(newInputs));
  };

  const handleReset = () => {
    setInputs(initialInputs);
    setResults(calculateCGT(initialInputs));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumb />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wide mb-4">
            Capital Gains Tax Calculator
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-4xl">
            Our calculator provides an estimate of the CGT to be paid based on the sale price of the property 
            less the expenses that come with purchasing, maintaining, and selling the property.
          </p>
        </div>
      </div>

      {/* Main Calculator Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calculator Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Capital Gains Tax Calculator</h2>
                  <Button 
                    variant="outline" 
                    onClick={handleReset}
                    className="text-primary border-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    Reset
                  </Button>
                </div>
                
                <CalculatorForm 
                  inputs={inputs} 
                  onChange={handleInputChange} 
                />
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:sticky lg:top-8">
            <ResultsCard results={results} />
          </div>
        </div>
      </div>

      {/* Sponsored Offers Section */}
      <SponsoredOffers />

      {/* How to Use Section */}
      <HowToUse />

      {/* Example Section */}
      <ExampleSection />

      {/* Resources Section */}
      <ResourcesSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <Footer />

      {/* Disclaimer */}
      <div className="bg-muted/50 py-6">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="font-semibold mb-2">Important Disclaimer</h3>
            <p className="text-sm text-muted-foreground max-w-4xl mx-auto">
              This calculator provides estimates only and should not be used as the sole basis for financial decisions. 
              The calculations are simplified and may not account for all tax considerations. 
              Please consult with a qualified tax professional or accountant for comprehensive tax advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}