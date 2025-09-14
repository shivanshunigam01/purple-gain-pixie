import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  return (
    <header className="bg-background border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="bg-primary text-primary-foreground px-3 py-1 rounded font-bold text-lg">
                money.com.au
              </div>
              <span className="text-sm text-muted-foreground hidden sm:inline">WE'VE GOT A BUCK</span>
            </div>
            
            <nav className="hidden lg:flex items-center space-x-6">
              <a href="#" className="text-sm hover:text-primary transition-colors">Home Loans</a>
              <a href="#" className="text-sm hover:text-primary transition-colors">Personal Loans</a>
              <a href="#" className="text-sm hover:text-primary transition-colors">Car Loans</a>
              <a href="#" className="text-sm hover:text-primary transition-colors">Business Loans</a>
              <a href="#" className="text-sm hover:text-primary transition-colors">Credit Cards</a>
              <a href="#" className="text-sm hover:text-primary transition-colors">Banking</a>
              <a href="#" className="text-sm hover:text-primary transition-colors">Health Insurance</a>
            </nav>
          </div>
          
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}