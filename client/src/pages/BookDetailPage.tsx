import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import type { Book } from "@shared/schema";
import { ArrowLeft, Calendar, User, BookOpen } from "lucide-react";

export default function BookDetailPage() {
  const [, params] = useRoute("/publications/:id");
  const bookId = params?.id;

  const { data: book, isLoading, error } = useQuery<Book>({
    queryKey: ["/api/books", bookId],
    queryFn: async () => {
      const response = await fetch(`/api/books/${bookId}`);
      if (!response.ok) throw new Error("Failed to fetch book");
      return response.json();
    },
    enabled: !!bookId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="animate-pulse">
            <div className="h-10 bg-muted rounded w-48 mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
              <div className="md:col-span-2">
                <div className="aspect-[3/4] bg-muted rounded-lg"></div>
              </div>
              <div className="md:col-span-3">
                <div className="h-12 bg-muted rounded w-3/4 mb-4"></div>
                <div className="h-8 bg-muted rounded w-1/2 mb-8"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center py-24">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
              <BookOpen className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="font-serif text-2xl font-semibold mb-3" data-testid="text-book-not-found">
              Book Not Found
            </h2>
            <p className="text-muted-foreground mb-8">
              The book you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/publications" data-testid="link-back-to-publications">
              <Button variant="outline" className="hover-elevate active-elevate-2">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Publications
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-6">
        <Link href="/publications" data-testid="link-back-to-publications">
          <Button variant="ghost" className="mb-12 hover-elevate active-elevate-2 -ml-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Publications
          </Button>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          <div className="md:col-span-2">
            <Card className="overflow-hidden border shadow-lg">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full aspect-[3/4] object-cover"
                data-testid="img-book-cover"
              />
            </Card>
          </div>

          <div className="md:col-span-3">
            <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-3 leading-tight" data-testid="text-book-title">
              {book.title}
            </h1>
            <p className="text-2xl text-muted-foreground italic mb-8" data-testid="text-book-author">
              by {book.author}
            </p>

            <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b">
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="h-5 w-5" />
                <span className="text-sm">Author: {book.author}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-5 w-5" />
                <span className="text-sm" data-testid="text-publication-date">Published {book.publicationDate}</span>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-semibold mb-4">Synopsis</h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-wrap" data-testid="text-book-synopsis">
                  {book.synopsis}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
