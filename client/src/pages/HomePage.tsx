import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, BookOpen, Heart, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Book } from "@shared/schema";
import heroImage from "@assets/generated_images/Bookstore_interior_hero_image_31e8ac7d.png";
import readingNookImage from "@assets/generated_images/Reading_nook_interior_326a0e65.png";

export default function HomePage() {
  const { data: books = [], isLoading } = useQuery<Book[]>({
    queryKey: ["/api/books"],
  });

  const featuredBooks = books.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      <section 
        className="relative h-[70vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 text-center max-w-4xl px-6">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold text-white mb-6 leading-tight" data-testid="text-hero-title">
            Where Stories Find Their Readers
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover carefully curated literary works in our independent bookstore
          </p>
          <Link href="/publications" data-testid="link-browse-publications">
            <Button 
              size="lg" 
              className="bg-white/10 backdrop-blur-md border-2 border-white/20 text-white hover:bg-white/20 hover:border-white/30 px-8 py-6 text-lg no-default-hover-elevate no-default-active-elevate"
            >
              Browse Our Collection
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {featuredBooks.length > 0 && (
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-4" data-testid="text-featured-title">
                Featured Publications
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A selection from our curated collection
              </p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[3/4] bg-muted rounded-lg mb-4"></div>
                    <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {featuredBooks.map((book) => (
                  <Link key={book.id} href={`/publications/${book.id}`} data-testid={`link-book-${book.id}`} className="group block">
                    <Card className="overflow-hidden hover-elevate active-elevate-2 transition-all duration-300 border">
                      <div className="aspect-[3/4] overflow-hidden">
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-serif text-lg font-medium mb-1 line-clamp-2">
                          {book.title}
                        </h3>
                        <p className="text-sm text-muted-foreground italic">
                          {book.author}
                        </p>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}

            <div className="text-center mt-12">
              <Link href="/publications" data-testid="link-view-all-publications">
                <Button variant="outline" size="lg" className="hover-elevate active-elevate-2">
                  View All Publications
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-6" data-testid="text-about-preview-title">
                A Haven for Book Lovers
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                For over two decades, Cornerstone Books has been a literary sanctuary in the heart of the city. We believe in the transformative power of books and the importance of thoughtful curation.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Every book in our collection is carefully selected to inspire, challenge, and delight our readers.
              </p>
              <Link href="/about" data-testid="link-learn-more">
                <Button variant="outline" className="hover-elevate active-elevate-2">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="relative rounded-lg overflow-hidden">
              <img
                src={readingNookImage}
                alt="Cozy reading nook"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif text-2xl font-semibold mb-3">Curated Selection</h3>
              <p className="text-muted-foreground leading-relaxed">
                Each book is hand-picked by our team of literary enthusiasts who understand quality storytelling.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif text-2xl font-semibold mb-3">Passionate Team</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our knowledgeable staff is always ready to help you discover your next favorite read.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif text-2xl font-semibold mb-3">Community Hub</h3>
              <p className="text-muted-foreground leading-relaxed">
                More than a bookstore, we're a gathering place for readers and writers alike.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
