import express from "express";

const app = express();
const PORT = 4000;

app.use(express.json());

let books = [
  {
    id: 1,
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 350,
    category: "Fiction"
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    price: 450,
    category: "Self Help"
  },
  {
    id: 3,
    title: "Clean Code",
    author: "Robert C. Martin",
    price: 550,
    category: "Programming"
  },
  {
    id: 4,
    title: "Clean Architecture",
    author: "Robert C. Martin",
    price: 600,
    category: "Programming"
  }
];

// GET all books
app.get("/books", (req, res) => {
  res.json(books);
});

// GET book by ID
app.get("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find(b => b.id === id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json(book);
});

// POST add book
app.post("/books", (req, res) => {
  const { id, title, author, price, category } = req.body;

  if (
    id === undefined ||
    !title ||
    !author ||
    price === undefined ||
    !category
  ) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  const newBook = {
    id,
    title,
    author,
    price,
    category
  };

  books.push(newBook);

  res.status(201).json({
    message: "Book added successfully",
    book: newBook
  });
});

// PUT update book
app.put("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = books.findIndex(b => b.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  books[index] = {
    ...books[index],
    ...req.body,
    id
  };

  res.json({
    message: "Book updated successfully",
    book: books[index]
  });
});

// DELETE book
app.delete("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = books.findIndex(b => b.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  const deletedBook = books.splice(index, 1);

  res.json({
    message: "Book deleted successfully",
    book: deletedBook[0]
  });
});

app.listen(PORT, () => {
  console.log(`Express Server running at http://localhost:${PORT}`);
});