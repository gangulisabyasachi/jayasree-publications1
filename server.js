import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { createServer } from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ---- Middleware ----
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (works in both environments)
app.use(express.static('public'));
app.use('/attached_assets', express.static('attached_assets'));
app.use('/uploads', express.static('uploads'));

// ---- Multer (file upload) ----
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/;
    const extOk = allowed.test(path.extname(file.originalname).toLowerCase());
    const mimeOk = allowed.test(file.mimetype);
    return extOk && mimeOk ? cb(null, true) : cb(new Error('Only image files allowed'));
  }
});

// ---- books.json helpers ----
const getBooksData = () => {
  try {
    return JSON.parse(fs.readFileSync('books.json', 'utf8'));
  } catch {
    return [];
  }
};

const saveBooksData = (books) =>
  fs.writeFileSync('books.json', JSON.stringify(books, null, 2));

// ---- API Routes ----
app.get('/api/books', (req, res) => res.json(getBooksData()));

app.get('/api/books/:id', (req, res) => {
  const book = getBooksData().find(b => b.id === req.params.id);
  return book ? res.json(book) : res.status(404).json({ message: 'Book not found' });
});

app.post('/api/books', upload.single('coverImage'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'Cover image required' });

  const books = getBooksData();
  const newBook = {
    id: Date.now().toString(),
    title: req.body.title,
    author: req.body.author,
    synopsis: req.body.synopsis,
    publicationDate: req.body.publicationDate,
    coverImage: `/uploads/${req.file.filename}`
  };
  books.push(newBook);
  saveBooksData(books);
  res.status(201).json(newBook);
});

app.put('/api/books/:id', upload.single('coverImage'), (req, res) => {
  const books = getBooksData();
  const idx = books.findIndex(b => b.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Book not found' });

  const updated = {
    ...books[idx],
    title: req.body.title,
    author: req.body.author,
    synopsis: req.body.synopsis,
    publicationDate: req.body.publicationDate
  };
  if (req.file) updated.coverImage = `/uploads/${req.file.filename}`;

  books[idx] = updated;
  saveBooksData(books);
  res.json(updated);
});

app.delete('/api/books/:id', (req, res) => {
  const books = getBooksData();
  const idx = books.findIndex(b => b.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Book not found' });

  const book = books[idx];
  if (book.coverImage?.startsWith('/uploads/')) {
    const imgPath = path.join(__dirname, book.coverImage.replace(/^\//, ''));
    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
  }

  books.splice(idx, 1);
  saveBooksData(books);
  res.json({ message: 'Book deleted successfully' });
});

// -------------------------------------------------
//  VERCEL SERVERLESS + LOCAL DEV ENTRY POINT
// -------------------------------------------------
let handler;

if (process.env.VERCEL) {
  // Vercel serverless – export raw HTTP server
  const server = createServer(app);
  handler = server;
} else {
  // Local development – use dynamic port with fallback
  const PORT = process.env.PORT || 5000;
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Local server running at http://localhost:${server.address().port}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      const nextPort = PORT + 1;
      console.error(`Port ${PORT} busy → trying ${nextPort}`);
      app.listen(nextPort, '0.0.0.0', () => {
        console.log(`Server now running at http://localhost:${nextPort}`);
      });
    } else {
      console.error('Server error:', err);
    }
  });
}

// Export for Vercel
module.exports = handler;