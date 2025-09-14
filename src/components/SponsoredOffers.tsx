import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const offers = [
  {
    id: 1,
    badge: "Top Intro offer",
    logo: "Rabobank",
    rate: "5.00%",
    description: "p.a. for 4 months, then up to 3.45% p.a. variable",
    title: "Rabobank High Interest Savings Account",
    details: "Earn a bonus variable rate for the first 4 months on balances up to $250,000, with a high ongoing rate thereafter. No account keeping fees or min balance, with interest paid monthly.",
    note: "Intro rate for new customers only."
  },
  {
    id: 2,
    badge: "TOP BONUS OFFER",
    logo: "ING",
    rate: "4.80%",
    description: "p.a. variable with bonus interest on balances up to $100k",
    title: "ING Savings Maximiser",
    details: "Earn bonus interest when you also hold an Orange Everyday and each month meet the eligibility criteria and grow your nominated Savings Maximiser Balance (excluding interest). Available on one account."
  },
  {
    id: 3,
    badge: "FOR YOUNG SAVERS",
    logo: "IMB Bank",
    rate: "4.75%",
    description: "p.a. variable when monthly criteria are met",
    title: "IMB Bank Reward Saver Kickstart Account",
    details: "Young savers can earn a great ongoing rate on balances up to $100k. Deposit $20 per month and make no withdrawals to qualify.",
    note: "No fees, easy online application. Plus, new account holders by 16 Sep 2025 can score a bonus $50! See website for T&Cs",
    bonus: "Bonus $50",
    expires: "Ends 16/9"
  },
  {
    id: 4,
    badge: "TOP BONUS UP TO $1m",
    logo: "IMB Bank",
    rate: "4.50%",
    description: "p.a. variable on balances up to $1m with $50 min monthly deposit and no withdrawals",
    title: "IMB Reward Saver Account",
    details: "Earn up to 4.75% bonus interest for the first four months when you deposit $50 a month and make no withdrawals."
  },
  {
    id: 5,
    badge: "NO MAX BALANCE",
    logo: "Suncorp Bank",
    rate: "4.30%",
    description: "p.a. variable with bonus interest, or 0.05% p.a. standard variable rate",
    title: "Suncorp Bank Growth Saver Account",
    details: "Earn bonus interest with no maximum balance or account keeping fees when you grow your savings by $200 or more each month (excluding interest) and make no more than one withdrawal."
  }
];

export function SponsoredOffers() {
  return (
    <div className="bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Park your cash in a high-yield account</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer) => (
            <Card key={offer.id} className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                    {offer.badge}
                  </div>
                  <span className="text-xs text-muted-foreground">Sponsored</span>
                </div>
                
                <div className="mb-4">
                  <div className="text-sm font-medium text-muted-foreground mb-1">{offer.logo}</div>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-xs text-muted-foreground">Up to</span>
                    <span className="text-2xl font-bold text-primary">{offer.rate}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{offer.description}</div>
                </div>
                
                <h3 className="font-semibold text-sm mb-3">{offer.title}</h3>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{offer.details}</p>
                
                {offer.note && (
                  <p className="text-xs text-muted-foreground mb-4 italic">{offer.note}</p>
                )}
                
                {offer.bonus && (
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded text-xs font-medium">
                      {offer.bonus}
                    </span>
                    {offer.expires && (
                      <span className="text-xs text-muted-foreground">{offer.expires}</span>
                    )}
                  </div>
                )}
                
                <Button className="w-full" size="sm">
                  Go to site
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}