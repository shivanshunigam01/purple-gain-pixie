import { FileSearch, Calculator, Car, Truck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const resourceCategories = [
  {
    icon: FileSearch,
    title: "Savings",
    links: [
      { title: "Pay calculator", href: "#" },
      { title: "Net worth calculator", href: "#" },
      { title: "Compound interest calculator", href: "#" }
    ]
  },
  {
    icon: Calculator,
    title: "Tax",
    links: [
      { title: "Tax return calculator", href: "#" },
      { title: "GST calculator", href: "#" },
      { title: "Stamp duty calculator", href: "#" }
    ]
  },
  {
    icon: Car,
    title: "Personal loans",
    links: [
      { title: "Personal loan calculator", href: "#" },
      { title: "Car loan calculator", href: "#" },
      { title: "Debt consolidation loan calculator", href: "#" }
    ]
  },
  {
    icon: Truck,
    title: "Business finance",
    links: [
      { title: "Business loan calculator", href: "#" },
      { title: "Equipment finance calculator", href: "#" },
      { title: "Chattel mortgage calculator", href: "#" }
    ]
  }
];

export function ResourcesSection() {
  return (
    <div className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">More tax and personal finance resources</h2>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {resourceCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <IconComponent className="h-6 w-6 text-primary" />
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a 
                          href={link.href}
                          className="text-sm text-primary hover:underline block py-1"
                        >
                          {link.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}