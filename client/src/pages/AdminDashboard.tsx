import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { Book } from "@shared/schema";
import { Plus, Pencil, Trash2, BookOpen, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const { toast } = useToast();
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);

  const { data: books = [], isLoading } = useQuery<Book[]>({
    queryKey: ["/api/books"],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/books/${id}`, undefined);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/books"] });
      toast({
        title: "Book Deleted",
        description: "The book has been successfully removed.",
      });
      setBookToDelete(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete book. Please try again.",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <Link href="/" data-testid="link-back-to-home">
            <Button variant="ghost" className="mb-4 hover-elevate active-elevate-2 -ml-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Website
            </Button>
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-2" data-testid="text-admin-title">
                Admin Dashboard
              </h1>
              <p className="text-lg text-muted-foreground">
                Manage your book collection
              </p>
            </div>
            <Link href="/admin/add-book" data-testid="link-add-book">
              <Button size="lg" className="hover-elevate active-elevate-2">
                <Plus className="mr-2 h-5 w-5" />
                Add New Book
              </Button>
            </Link>
          </div>
        </div>

        {isLoading ? (
          <Card className="p-6 border">
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 animate-pulse">
                  <div className="w-16 h-20 bg-muted rounded"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-1/3"></div>
                    <div className="h-3 bg-muted rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ) : books.length === 0 ? (
          <Card className="p-12 border text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
              <BookOpen className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="font-serif text-2xl font-semibold mb-3" data-testid="text-no-books-admin">
              No Books Yet
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Get started by adding your first book to the collection.
            </p>
            <Link href="/admin/add-book" data-testid="link-add-first-book">
              <Button className="hover-elevate active-elevate-2">
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Book
              </Button>
            </Link>
          </Card>
        ) : (
          <Card className="border overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-24">Cover</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Publication Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {books.map((book) => (
                    <TableRow key={book.id} data-testid={`row-book-${book.id}`}>
                      <TableCell>
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-16 h-20 object-cover rounded"
                        />
                      </TableCell>
                      <TableCell className="font-medium" data-testid={`text-title-${book.id}`}>
                        {book.title}
                      </TableCell>
                      <TableCell className="text-muted-foreground" data-testid={`text-author-${book.id}`}>
                        {book.author}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {book.publicationDate}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/admin/edit-book/${book.id}`} data-testid={`button-edit-${book.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="hover-elevate active-elevate-2"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            className="hover-elevate active-elevate-2 text-destructive hover:text-destructive"
                            onClick={() => setBookToDelete(book)}
                            data-testid={`button-delete-${book.id}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        )}

        <AlertDialog open={!!bookToDelete} onOpenChange={(open) => !open && setBookToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Book</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete "{bookToDelete?.title}"? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel data-testid="button-cancel-delete">Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => bookToDelete && deleteMutation.mutate(bookToDelete.id)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                data-testid="button-confirm-delete"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
