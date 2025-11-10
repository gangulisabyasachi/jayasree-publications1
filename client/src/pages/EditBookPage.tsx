import { useRoute, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { ArrowLeft, Upload } from "lucide-react";
import { useState, useEffect } from "react";
import type { Book } from "@shared/schema";

export default function EditBookPage() {
  const [, params] = useRoute("/admin/edit-book/:id");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const bookId = params?.id;

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    synopsis: "",
    publicationDate: "",
  });

  const { data: book, isLoading } = useQuery<Book>({
    queryKey: ["/api/books", bookId],
    queryFn: async () => {
      const response = await fetch(`/api/books/${bookId}`);
      if (!response.ok) throw new Error("Failed to fetch book");
      return response.json();
    },
    enabled: !!bookId,
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        synopsis: book.synopsis,
        publicationDate: book.publicationDate,
      });
      setImagePreview(book.coverImage);
    }
  }, [book]);

  const updateBookMutation = useMutation({
    mutationFn: async (data: FormData) => {
      return await fetch(`/api/books/${bookId}`, {
        method: "PATCH",
        body: data,
      }).then((res) => {
        if (!res.ok) throw new Error("Failed to update book");
        return res.json();
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/books"] });
      queryClient.invalidateQueries({ queryKey: ["/api/books", bookId] });
      toast({
        title: "Book Updated",
        description: "The book has been successfully updated.",
      });
      setLocation("/admin");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update book. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const submitData = new FormData();
    submitData.append("title", formData.title);
    submitData.append("author", formData.author);
    submitData.append("synopsis", formData.synopsis);
    submitData.append("publicationDate", formData.publicationDate);
    if (imageFile) {
      submitData.append("coverImage", imageFile);
    }

    updateBookMutation.mutate(submitData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="animate-pulse space-y-6">
            <div className="h-10 bg-muted rounded w-48"></div>
            <div className="h-12 bg-muted rounded w-1/2"></div>
            <Card className="p-8 border space-y-6">
              <div className="h-48 bg-muted rounded"></div>
              <div className="h-11 bg-muted rounded"></div>
              <div className="h-11 bg-muted rounded"></div>
              <div className="h-32 bg-muted rounded"></div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-2xl font-semibold mb-3">Book Not Found</h2>
          <Button onClick={() => setLocation("/admin")} data-testid="button-back-to-admin">
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-6">
        <Button
          variant="ghost"
          className="mb-8 hover-elevate active-elevate-2 -ml-4"
          onClick={() => setLocation("/admin")}
          data-testid="button-back-to-admin"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="mb-8">
          <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-2" data-testid="text-edit-book-title">
            Edit Book
          </h1>
          <p className="text-lg text-muted-foreground">
            Update book details
          </p>
        </div>

        <Card className="p-8 border">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="coverImage" className="text-sm font-medium mb-2 block uppercase tracking-wide">
                Cover Image
              </Label>
              <div className="flex flex-col gap-4">
                {imagePreview && (
                  <div className="w-48 aspect-[3/4] rounded-lg overflow-hidden border">
                    <img
                      src={imagePreview}
                      alt="Cover preview"
                      className="w-full h-full object-cover"
                      data-testid="img-cover-preview"
                    />
                  </div>
                )}
                <div className="relative">
                  <input
                    id="coverImage"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    data-testid="input-cover-image"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("coverImage")?.click()}
                    className="hover-elevate active-elevate-2"
                    data-testid="button-upload-cover"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Change Cover Image
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="title" className="text-sm font-medium mb-2 block uppercase tracking-wide">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter book title"
                className="h-11"
                data-testid="input-title"
              />
            </div>

            <div>
              <Label htmlFor="author" className="text-sm font-medium mb-2 block uppercase tracking-wide">
                Author
              </Label>
              <Input
                id="author"
                name="author"
                type="text"
                value={formData.author}
                onChange={handleChange}
                required
                placeholder="Enter author name"
                className="h-11"
                data-testid="input-author"
              />
            </div>

            <div>
              <Label htmlFor="publicationDate" className="text-sm font-medium mb-2 block uppercase tracking-wide">
                Publication Date
              </Label>
              <Input
                id="publicationDate"
                name="publicationDate"
                type="text"
                value={formData.publicationDate}
                onChange={handleChange}
                required
                placeholder="e.g., March 2024"
                className="h-11"
                data-testid="input-publication-date"
              />
            </div>

            <div>
              <Label htmlFor="synopsis" className="text-sm font-medium mb-2 block uppercase tracking-wide">
                Synopsis
              </Label>
              <Textarea
                id="synopsis"
                name="synopsis"
                value={formData.synopsis}
                onChange={handleChange}
                required
                placeholder="Enter book synopsis..."
                rows={8}
                className="resize-none"
                data-testid="input-synopsis"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                size="lg"
                className="flex-1 hover-elevate active-elevate-2"
                disabled={updateBookMutation.isPending}
                data-testid="button-submit-book"
              >
                {updateBookMutation.isPending ? "Updating Book..." : "Update Book"}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => setLocation("/admin")}
                disabled={updateBookMutation.isPending}
                data-testid="button-cancel"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
