import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ExampleSection() {
  return (
    <div className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Example of capital gains tax on shares</h2>
        
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-xl">CGT Calculation Example</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 py-3 border-b border-border">
                <span className="font-medium">Annual Salary</span>
                <span>$100,000</span>
              </div>
              <div className="grid grid-cols-2 gap-4 py-3 border-b border-border">
                <span className="font-medium">Length of share ownership</span>
                <span>More than 12 months</span>
              </div>
              <div className="grid grid-cols-2 gap-4 py-3 border-b border-border">
                <span className="font-medium">Capital gain on shares sold</span>
                <span>$10,000</span>
              </div>
              <div className="grid grid-cols-2 gap-4 py-3 bg-primary/10 px-4 rounded">
                <span className="font-bold">CGT on sale</span>
                <span className="font-bold text-primary">$1,625</span>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mt-6 italic">
              Hypothetical example only. Please seek professional tax advice to understand your personalised CGT liability.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}