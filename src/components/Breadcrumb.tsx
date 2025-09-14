export function Breadcrumb() {
  return (
    <div className="container mx-auto px-4 py-3">
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
        <a href="/" className="hover:text-primary transition-colors">Home</a>
        <span>/</span>
        <a href="/calculators" className="hover:text-primary transition-colors">Calculators</a>
        <span>/</span>
        <span className="text-foreground">Capital Gains Tax Calculator</span>
      </nav>
    </div>
  );
}