export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="bg-primary text-primary-foreground px-3 py-1 rounded font-bold text-lg mb-4 inline-block">
              money.com.au
            </div>
            <p className="text-sm text-muted-foreground">
              Australia's leading comparison site for financial products and services.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Loans</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Home Loans</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Personal Loans</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Car Loans</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Business Loans</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Banking</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Savings Accounts</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Transaction Accounts</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Term Deposits</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Credit Cards</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Insurance</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Health Insurance</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Car Insurance</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Home Insurance</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Travel Insurance</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-4 md:mb-0">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-primary transition-colors">Contact Us</a>
          </div>
          <p className="text-sm text-muted-foreground">
            © {currentYear} Money.com.au. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}