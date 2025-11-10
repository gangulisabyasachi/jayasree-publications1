import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center py-16">
      <div className="text-center px-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
          <BookOpen className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="font-serif text-5xl md:text-6xl font-semibold mb-4" data-testid="text-404-title">
          404
        </h1>
        <h2 className="font-serif text-2xl md:text-3xl font-medium mb-6">
          Page Not Found
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/" data-testid="link-home">
          <Button size="lg" className="hover-elevate active-elevate-2">
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
