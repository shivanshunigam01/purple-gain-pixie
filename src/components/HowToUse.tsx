import { CheckCircle } from "lucide-react";

const steps = [
  {
    title: "Purchase price",
    description: "How much you purchased the asset for."
  },
  {
    title: "Length of ownership",
    description: "Whether you have owned the asset for less than 12 months or longer than 12 months."
  },
  {
    title: "Sold price",
    description: "How much you have sold the asset for."
  },
  {
    title: "Current taxable income",
    description: "Your current taxable income. This will help determine the tax rate at which the capital gain on your asset will be applied. It's important to note that any capital gains amount will be added to your current income before calculating the tax rate — i.e. a capital gains amount could force you into a higher tax bracket."
  },
  {
    title: "Total costs of purchasing, owning and selling the asset",
    description: "This is the amount you have personally invested into the asset before sale. For example, if your asset is a property, this may include marketing for sale or renovations, which will be used to calculate your final capital gains amount."
  }
];

export function HowToUse() {
  return (
    <div className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">How to use the Capital gains tax calculator</h2>
        <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
          Capital gains tax (CGT) applies to the likes of property investments, shares, gold, cryptocurrency and essentially all other assets. To use the capital gains tax calculator, you'll need to enter some details about your asset:
        </p>
        
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-4">
              <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-muted-foreground mt-8 text-lg">
          Once you have entered the details about the asset and your income, click 'calculate' to see how much you may need to pay in capital gains tax.
        </p>
      </div>
    </div>
  );
}