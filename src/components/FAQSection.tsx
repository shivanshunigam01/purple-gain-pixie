import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    id: "item-1",
    question: "What is a capital gain?",
    answer: "A capital gain or loss is the amount of money you make or lose on the sale of an asset. The capital difference is how much you purchase the asset for versus how much you sell it for."
  },
  {
    id: "item-2",
    question: "How much do I have to pay for CGT?",
    answer: "The amount of CGT you will pay on your shares can vary depending on how long you have held the investment. If you own the asset for less than 12 months, you will have to pay 100% of the capital gain at your income tax rate. If you own the asset for longer than 12 months, you will pay 50% of the capital gain. Capital gains are taxed at the same rate as taxable income — i.e. if you earn $40,000 (32.5% tax bracket) per year and make a capital gain of $60,000, you will pay income tax for $100,000 (37% income tax) and your capital gains will be taxed at 37%. As capital gains make up your taxable income, the taxation applied may also depend on how much other income you earned, and factors like whether you will be subject to the Medicare levy surcharge (i.e. whether you have a suitable level of private health insurance)."
  },
  {
    id: "item-3",
    question: "Do I need to pay CGT on shares?",
    answer: "The quickest way to determine if you need to pay CGT on your shares is to see if your shares have made money over the time since you bought them. If you are selling shares at a price below what you paid for them, you have made a loss and you do not need to worry about capital gains tax. If the price of your shares has risen since buying and you are now selling; you will have to pay CGT."
  },
  {
    id: "item-4",
    question: "What assets are exempt from capital gains tax?",
    answer: "Several assets are exempt from capital gains tax in Australia, including your main residence (principal place of residence), personal use assets worth less than $10,000, and assets acquired before 20 September 1985. Additionally, certain assets like cars, boats, and personal belongings used mainly for personal use and worth less than $10,000 are generally exempt."
  }
];

export function FAQSection() {
  return (
    <div className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Capital gains tax calculator FAQs</h2>
        
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="bg-background rounded-lg border px-6">
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-semibold text-lg">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}