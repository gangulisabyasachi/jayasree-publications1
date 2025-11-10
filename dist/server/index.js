// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import { randomUUID } from "crypto";
var MemStorage = class {
  books;
  contacts;
  constructor() {
    this.books = /* @__PURE__ */ new Map();
    this.contacts = /* @__PURE__ */ new Map();
    this.seedInitialData();
  }
  seedInitialData() {
    const sampleBooks = [
      {
        id: "1",
        title: "The Art of Storytelling",
        author: "Margaret Atwood",
        synopsis: "A masterful exploration of narrative craft, where one of our greatest living writers shares insights into the architecture of compelling stories. From character development to plot construction, this work illuminates the creative process behind literary excellence.",
        coverImage: "/attached_assets/generated_images/Classic_fiction_book_cover_abefd1ac.png",
        publicationDate: "March 2024"
      },
      {
        id: "2",
        title: "Whispers in the Garden",
        author: "Ocean Vuong",
        synopsis: "A luminous collection of poems that weave together themes of memory, identity, and belonging. Through vivid imagery and profound emotional resonance, these verses explore the intersections of personal history and universal human experience.",
        coverImage: "/attached_assets/generated_images/Poetry_collection_cover_4e162110.png",
        publicationDate: "January 2024"
      },
      {
        id: "3",
        title: "Chronicles of Resistance",
        author: "Isabel Wilkerson",
        synopsis: "An illuminating historical account that traces forgotten stories of courage and resilience across generations. Through meticulous research and powerful storytelling, this work brings to light the voices that shaped our collective past.",
        coverImage: "/attached_assets/generated_images/History_book_cover_86aac4b3.png",
        publicationDate: "September 2023"
      },
      {
        id: "4",
        title: "The Midnight Library",
        author: "Matt Haig",
        synopsis: "A thought-provoking tale about choices, regrets, and the infinite possibilities of life. Between life and death exists a library where each book represents a different version of the life you could have lived.",
        coverImage: "/attached_assets/generated_images/Modern_fiction_cover_7561a2e9.png",
        publicationDate: "June 2023"
      },
      {
        id: "5",
        title: "On Being and Time",
        author: "Simone de Beauvoir",
        synopsis: "A profound philosophical meditation on existence, consciousness, and the human condition. This work challenges readers to reconsider fundamental questions about meaning, freedom, and our place in the world.",
        coverImage: "/attached_assets/generated_images/Philosophy_book_cover_e28b73b0.png",
        publicationDate: "November 2023"
      },
      {
        id: "6",
        title: "Stories from the Edge",
        author: "Jhumpa Lahiri",
        synopsis: "A captivating anthology of short fiction that explores the complexity of human relationships and cultural identity. Each story offers a window into lives marked by transition, longing, and the search for connection.",
        coverImage: "/attached_assets/generated_images/Story_collection_cover_01f65ab1.png",
        publicationDate: "February 2024"
      }
    ];
    sampleBooks.forEach((book) => {
      this.books.set(book.id, book);
    });
  }
  async getAllBooks() {
    return Array.from(this.books.values());
  }
  async getBook(id) {
    return this.books.get(id);
  }
  async createBook(insertBook) {
    const id = randomUUID();
    const book = { ...insertBook, id };
    this.books.set(id, book);
    return book;
  }
  async updateBook(id, updates) {
    const existingBook = this.books.get(id);
    if (!existingBook) {
      return void 0;
    }
    const updatedBook = { ...existingBook, ...updates };
    this.books.set(id, updatedBook);
    return updatedBook;
  }
  async deleteBook(id) {
    return this.books.delete(id);
  }
  async createContact(insertContact) {
    const id = randomUUID();
    const contact = { ...insertContact, id };
    this.contacts.set(id, contact);
    return contact;
  }
};
var storage = new MemStorage();

// server/routes.ts
import multer from "multer";
import path from "path";
import { mkdir } from "fs/promises";

// shared/schema.ts
import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var books = pgTable("books", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  author: text("author").notNull(),
  synopsis: text("synopsis").notNull(),
  coverImage: text("cover_image").notNull(),
  publicationDate: text("publication_date").notNull()
});
var insertBookSchema = createInsertSchema(books).omit({
  id: true
});
var contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull()
});
var insertContactSchema = createInsertSchema(contactSubmissions).omit({
  id: true
});

// server/routes.ts
var uploadsDir = path.join(process.cwd(), "uploads");
mkdir(uploadsDir, { recursive: true }).catch(console.error);
var multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
var upload = multer({
  storage: multerStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  }
});
async function registerRoutes(app2) {
  app2.use("/uploads", (await import("express")).static(uploadsDir));
  app2.get("/api/books", async (req, res) => {
    try {
      const books2 = await storage.getAllBooks();
      res.json(books2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch books" });
    }
  });
  app2.get("/api/books/:id", async (req, res) => {
    try {
      const book = await storage.getBook(req.params.id);
      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }
      res.json(book);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch book" });
    }
  });
  app2.post("/api/books", upload.single("coverImage"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "Cover image is required" });
      }
      const bookData = {
        title: req.body.title,
        author: req.body.author,
        synopsis: req.body.synopsis,
        publicationDate: req.body.publicationDate,
        coverImage: `/uploads/${req.file.filename}`
      };
      const validatedData = insertBookSchema.parse(bookData);
      const book = await storage.createBook(validatedData);
      res.status(201).json(book);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Failed to create book" });
      }
    }
  });
  app2.patch("/api/books/:id", upload.single("coverImage"), async (req, res) => {
    try {
      const updates = {
        title: req.body.title,
        author: req.body.author,
        synopsis: req.body.synopsis,
        publicationDate: req.body.publicationDate
      };
      if (req.file) {
        updates.coverImage = `/uploads/${req.file.filename}`;
      }
      const book = await storage.updateBook(req.params.id, updates);
      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }
      res.json(book);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Failed to update book" });
      }
    }
  });
  app2.delete("/api/books/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteBook(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Book not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete book" });
    }
  });
  app2.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.status(201).json(contact);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Failed to submit contact form" });
      }
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path3 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path2 from "path";
var vite_config_default = defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path2.resolve(import.meta.dirname, "client", "src"),
      "@shared": path2.resolve(import.meta.dirname, "shared"),
      "@assets": path2.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path2.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path2.resolve(import.meta.dirname, "dist", "public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server2) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server: server2 },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path3.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}

// server/index.ts
import path4 from "path";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path4.dirname(__filename);
var app = express2();
app.use(
  express2.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    }
  })
);
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path5 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path5.startsWith("/api")) {
      let logLine = `${req.method} ${path5} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
var server;
(async () => {
  server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    const publicPath = path4.join(__dirname, "..", "..", "dist", "public");
    app.use(express2.static(publicPath));
    app.get("*", (req, res) => {
      if (req.path.startsWith("/api")) {
        return res.status(404).json({ error: "API route not found" });
      }
      res.sendFile(path4.join(publicPath, "index.html"));
    });
  }
  if (!process.env.VERCEL) {
    const port = parseInt(process.env.PORT || "5000", 10);
    const isMacOS = process.platform === "darwin";
    const host = isMacOS ? "127.0.0.1" : "0.0.0.0";
    server.listen(
      {
        port,
        host,
        // reusePort is NOT supported on macOS (Node 22+)
        ...isMacOS ? {} : { reusePort: true }
      },
      () => {
        log(`serving on http://${host}:${port}`);
      }
    );
  }
})();
var index_default = app;
export {
  index_default as default
};
