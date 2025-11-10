import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import type { Book } from "@shared/schema";
import { BookOpen } from "lucide-react";

export default function PublicationsPage() {
  const { data: books = [], isLoading } = useQuery<Book[]>({
    queryKey: ["/api/books"],
  });

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-semibold mb-4" data-testid="text-publications-title">
            Our Publications
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our carefully curated collection of literary works
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-muted rounded-lg mb-4"></div>
                <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/3"></div>
              </div>
            ))}
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-24">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
              <BookOpen className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="font-serif text-2xl font-semibold mb-3" data-testid="text-no-books">
              No Publications Yet
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Our collection is currently being curated. Please check back soon for our carefully selected literary works.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book) => (
              <Link key={book.id} href={`/publications/${book.id}`} data-testid={`link-book-${book.id}`} className="group block">
                <Card className="overflow-hidden hover-elevate active-elevate-2 transition-all duration-300 border">
                  <div className="aspect-[3/4] overflow-hidden bg-muted">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-medium mb-2 line-clamp-2" data-testid={`text-book-title-${book.id}`}>
                      {book.title}
                    </h3>
                    <p className="text-base text-muted-foreground italic mb-2" data-testid={`text-book-author-${book.id}`}>
                      by {book.author}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Published {book.publicationDate}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
