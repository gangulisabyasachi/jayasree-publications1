import { Link } from "wouter";
import { Book, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Book className="h-6 w-6 text-primary" />
              <span className="font-serif font-semibold text-xl">Cornerstone Books</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-prose">
              A curated independent bookstore dedicated to connecting readers with exceptional literary works. Where stories find their readers.
            </p>
          </div>

          <div>
            <h3 className="font-serif font-semibold text-lg mb-4">Quick Links</h3>
            <nav className="flex flex-col gap-3">
              <Link 
                href="/" 
                data-testid="link-footer-home"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <Link 
                href="/publications" 
                data-testid="link-footer-publications"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Publications
              </Link>
              <Link 
                href="/about" 
                data-testid="link-footer-about"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                About Us
              </Link>
              <Link 
                href="/contact" 
                data-testid="link-footer-contact"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="font-serif font-semibold text-lg mb-4">Contact Info</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  123 Literary Lane<br />
                  Boston, MA 02108
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  (617) 555-0123
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  hello@cornerstonebooks.com
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Cornerstone Books. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
