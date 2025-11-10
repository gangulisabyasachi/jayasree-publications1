import { type Book, type InsertBook, type ContactSubmission, type InsertContact } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getAllBooks(): Promise<Book[]>;
  getBook(id: string): Promise<Book | undefined>;
  createBook(book: InsertBook): Promise<Book>;
  updateBook(id: string, book: Partial<InsertBook>): Promise<Book | undefined>;
  deleteBook(id: string): Promise<boolean>;
  createContact(contact: InsertContact): Promise<ContactSubmission>;
}

export class MemStorage implements IStorage {
  private books: Map<string, Book>;
  private contacts: Map<string, ContactSubmission>;

  constructor() {
    this.books = new Map();
    this.contacts = new Map();
    this.seedInitialData();
  }

  private seedInitialData() {
    const sampleBooks: Book[] = [
      {
        id: "1",
        title: "The Art of Storytelling",
        author: "Margaret Atwood",
        synopsis: "A masterful exploration of narrative craft, where one of our greatest living writers shares insights into the architecture of compelling stories. From character development to plot construction, this work illuminates the creative process behind literary excellence.",
        coverImage: "/attached_assets/generated_images/Classic_fiction_book_cover_abefd1ac.png",
        publicationDate: "March 2024",
      },
      {
        id: "2",
        title: "Whispers in the Garden",
        author: "Ocean Vuong",
        synopsis: "A luminous collection of poems that weave together themes of memory, identity, and belonging. Through vivid imagery and profound emotional resonance, these verses explore the intersections of personal history and universal human experience.",
        coverImage: "/attached_assets/generated_images/Poetry_collection_cover_4e162110.png",
        publicationDate: "January 2024",
      },
      {
        id: "3",
        title: "Chronicles of Resistance",
        author: "Isabel Wilkerson",
        synopsis: "An illuminating historical account that traces forgotten stories of courage and resilience across generations. Through meticulous research and powerful storytelling, this work brings to light the voices that shaped our collective past.",
        coverImage: "/attached_assets/generated_images/History_book_cover_86aac4b3.png",
        publicationDate: "September 2023",
      },
      {
        id: "4",
        title: "The Midnight Library",
        author: "Matt Haig",
        synopsis: "A thought-provoking tale about choices, regrets, and the infinite possibilities of life. Between life and death exists a library where each book represents a different version of the life you could have lived.",
        coverImage: "/attached_assets/generated_images/Modern_fiction_cover_7561a2e9.png",
        publicationDate: "June 2023",
      },
      {
        id: "5",
        title: "On Being and Time",
        author: "Simone de Beauvoir",
        synopsis: "A profound philosophical meditation on existence, consciousness, and the human condition. This work challenges readers to reconsider fundamental questions about meaning, freedom, and our place in the world.",
        coverImage: "/attached_assets/generated_images/Philosophy_book_cover_e28b73b0.png",
        publicationDate: "November 2023",
      },
      {
        id: "6",
        title: "Stories from the Edge",
        author: "Jhumpa Lahiri",
        synopsis: "A captivating anthology of short fiction that explores the complexity of human relationships and cultural identity. Each story offers a window into lives marked by transition, longing, and the search for connection.",
        coverImage: "/attached_assets/generated_images/Story_collection_cover_01f65ab1.png",
        publicationDate: "February 2024",
      },
    ];

    sampleBooks.forEach((book) => {
      this.books.set(book.id, book);
    });
  }

  async getAllBooks(): Promise<Book[]> {
    return Array.from(this.books.values());
  }

  async getBook(id: string): Promise<Book | undefined> {
    return this.books.get(id);
  }

  async createBook(insertBook: InsertBook): Promise<Book> {
    const id = randomUUID();
    const book: Book = { ...insertBook, id };
    this.books.set(id, book);
    return book;
  }

  async updateBook(id: string, updates: Partial<InsertBook>): Promise<Book | undefined> {
    const existingBook = this.books.get(id);
    if (!existingBook) {
      return undefined;
    }
    const updatedBook: Book = { ...existingBook, ...updates };
    this.books.set(id, updatedBook);
    return updatedBook;
  }

  async deleteBook(id: string): Promise<boolean> {
    return this.books.delete(id);
  }

  async createContact(insertContact: InsertContact): Promise<ContactSubmission> {
    const id = randomUUID();
    const contact: ContactSubmission = { ...insertContact, id };
    this.contacts.set(id, contact);
    return contact;
  }
}

export const storage = new MemStorage();
