import { Link, useLocation } from "wouter";
import { Book, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/publications", label: "Publications" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link 
            href="/" 
            data-testid="link-home-logo"
            className="flex items-center gap-2 hover-elevate active-elevate-2 rounded-md px-3 py-2 -ml-3 transition-all duration-200"
          >
            <Book className="h-6 w-6 text-primary" />
            <span className="font-serif font-semibold text-xl">Cornerstone Books</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                data-testid={`link-nav-${link.label.toLowerCase().replace(' ', '-')}`}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 hover-elevate active-elevate-2 ${
                  isActive(link.href)
                    ? "bg-accent text-accent-foreground"
                    : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Link href="/admin" data-testid="link-admin">
              <Button variant="outline" size="sm" className="hover-elevate active-elevate-2">
                Admin
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden p-2 hover-elevate active-elevate-2 rounded-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  data-testid={`link-mobile-${link.label.toLowerCase().replace(' ', '-')}`}
                  className={`block px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 hover-elevate active-elevate-2 ${
                    isActive(link.href)
                      ? "bg-accent text-accent-foreground"
                      : "text-foreground"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="px-4 py-2">
                <Link href="/admin" data-testid="link-mobile-admin">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full hover-elevate active-elevate-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
