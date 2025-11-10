import express from 'express';
import multer from 'multer';
import { createServer } from 'http';

const app = express();

// ---- In-Memory Data (resets on cold start) ----
let books = [
  {
    id: "1",
    title: "The Art of Storytelling",
    author: "Margaret Atwood",
    synopsis: "A masterful exploration of narrative craft...",
    coverImage: "/attached_assets/generated_images/Classic_fiction_book_cover_abefd1ac.png",
    publicationDate: "March 2024"
  },
  {
    id: "2",
    title: "Whispers in the Garden",
    author: "Ocean Vuong",
    synopsis: "A luminous collection of poems...",
    coverImage: "/attached_assets/generated_images/Poetry_collection_cover_4e162110.png",
    publicationDate: "January 2024"
  },
  {
    id: "3",
    title: "Chronicles of Resistance",
    author: "Isabel Wilkerson",
    synopsis: "An illuminating historical account...",
    coverImage: "/attached_assets/generated_images/History_book_cover_86aac4b3.png",
    publicationDate: "September 2023"
  },
  {
    id: "4",
    title: "The Midnight Library",
    author: "Matt Haig",
    synopsis: "A thought-provoking tale about choices...",
    coverImage: "/attached_assets/generated_images/Modern_fiction_cover_7561a2e9.png",
    publicationDate: "June 2023"
  },
  {
    id: "5",
    title: "On Being and Time",
    author: "Simone de Beauvoir",
    synopsis: "A profound philosophical meditation...",
    coverImage: "/attached_assets/generated_images/Philosophy_book_cover_e28b73b0.png",
    publicationDate: "November 2023"
  }
];

// ---- Middleware ----
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/attached_assets', express.static('attached_assets'));
app.use('/uploads', express.static('/tmp/uploads')); // optional

// ---- Multer (save to /tmp/uploads) ----
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, '/tmp/uploads'),
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + Math.round(Math.random() * 1e9) + path.extname(file.originalname));
    }
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/;
    const ok = allowed.test(file.mimetype) && allowed.test(path.extname(file.originalname).toLowerCase());
    cb(null, ok);
  }
});

// Ensure /tmp/uploads exists
try {
  require('fs').mkdirSync('/tmp/uploads', { recursive: true });
} catch (e) {}

// ---- API Routes ----
app.get('/api/books', (req, res) => res.json(books));

app.get('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === req.params.id);
  book ? res.json(book) : res.status(404).json({ message: 'Not found' });
});

app.post('/api/books', upload.single('coverImage'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'Image required' });

  const newBook = {
    id: Date.now().toString(),
    title: req.body.title,
    author: req.body.author,
    synopsis: req.body.synopsis,
    publicationDate: req.body.publicationDate,
    coverImage: `/uploads/${req.file.filename}`
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

app.put('/api/books/:id', upload.single('coverImage'), (req, res) => {
  const idx = books.findIndex(b => b.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });

  books[idx] = {
    ...books[idx],
    title: req.body.title,
    author: req.body.author,
    synopsis: req.body.synopsis,
    publicationDate: req.body.publicationDate,
    ...(req.file && { coverImage: `/uploads/${req.file.filename}` })
  };
  res.json(books[idx]);
});

app.delete('/api/books/:id', (req, res) => {
  const idx = books.findIndex(b => b.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  books.splice(idx, 1);
  res.json({ message: 'Deleted' });
});

// ---- Vercel Export ----
module.exports = createServer(app);