import { Card } from "@/components/ui/card";
import { BookOpen, Heart, Users, Award } from "lucide-react";
import storefrontImage from "@assets/generated_images/Bookstore_exterior_storefront_5173c549.png";
import readingNookImage from "@assets/generated_images/Reading_nook_interior_326a0e65.png";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-24 bg-card">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-semibold mb-6" data-testid="text-about-title">
            About Cornerstone Books
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A literary sanctuary in the heart of the city for over two decades
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-6">
          <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
            <p className="text-lg leading-relaxed text-muted-foreground mb-6" data-testid="text-about-story">
              Founded in 2003, Cornerstone Books began with a simple vision: to create a space where exceptional literature could be discovered, discussed, and cherished. What started as a small neighborhood bookshop has grown into a beloved literary institution, yet we've never lost sight of our core mission.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground mb-6">
              We believe that books have the power to transform lives, spark conversations, and build communities. Every title in our collection is carefully selected by our team of passionate readers who understand that quality matters more than quantity.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Our bookstore is more than just a place to buy books—it's a gathering space for readers, writers, and thinkers. We host author events, book clubs, and literary discussions that bring our community together around the shared love of great storytelling.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="rounded-lg overflow-hidden">
              <img
                src={storefrontImage}
                alt="Cornerstone Books storefront"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden">
              <img
                src={readingNookImage}
                alt="Reading nook interior"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-16 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-8 text-center border hover-elevate transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">Curation</h3>
              <p className="text-muted-foreground leading-relaxed">
                We hand-select every book, ensuring our collection represents the finest in literary achievement.
              </p>
            </Card>

            <Card className="p-8 text-center border hover-elevate transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">Passion</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our love for literature drives everything we do, from selection to recommendation.
              </p>
            </Card>

            <Card className="p-8 text-center border hover-elevate transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">Community</h3>
              <p className="text-muted-foreground leading-relaxed">
                We foster connections between readers, creating a vibrant literary community.
              </p>
            </Card>

            <Card className="p-8 text-center border hover-elevate transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">Excellence</h3>
              <p className="text-muted-foreground leading-relaxed">
                We maintain the highest standards in our collection and customer service.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
