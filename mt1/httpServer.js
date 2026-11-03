import http from "http";
import fs from "fs";

const books = [
    {
        id: 1,
        title: "The Alchemist",
        author: "Paulo Coelho",
        price: 350
    },
    {
        id: 2,
        title: "Atomic Habits",
        author: "James Clear",
        price: 450
    },
    {
        id: 3,
        title: "Clean Code",
        author: "Robert C. Martin",
        price: 550
    },
    {
        id: 4,
        title: "Clean Architecture",
        author: "Robert C. Martin",
        price: 600
    }
];

const server = http.createServer((req, res) => {

    // GET /
    if (req.method === "GET" && req.url === "/") {

        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.end("<h1>Welcome to Library Book Management</h1>");
    }

    // GET /books
    else if (req.method === "GET" && req.url === "/books") {

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify(books));
    }

    // GET /about
    else if (req.method === "GET" && req.url === "/about") {

        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.end("<h1>Library Management Application</h1>");
    }

    // GET /home
    else if (req.method === "GET" && req.url === "/home") {

        const htmlPath = new URL("./public/index.html", import.meta.url);

        fs.readFile(htmlPath, "utf8", (err, data) => {

            if (err) {
                res.writeHead(500, {
                    "Content-Type": "text/plain"
                });

                res.end("Error reading index.html");
                return;
            }

            res.writeHead(200, {
                "Content-Type": "text/html"
            });

            res.end(data);
        });
    }

    // POST /add-book
    else if (req.method === "POST" && req.url === "/add-book") {

        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString();
        });

        req.on("end", () => {

            try {

                const newBook = JSON.parse(body);

                if (
                    newBook.id === undefined ||
                    !newBook.title ||
                    !newBook.author ||
                    newBook.price === undefined
                ) {

                    res.writeHead(400, {
                        "Content-Type": "application/json"
                    });

                    res.end(JSON.stringify({
                        message: "id, title, author and price are required"
                    }));

                    return;
                }

                books.push(newBook);

                res.writeHead(201, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    message: "Book added successfully",
                    book: newBook
                }));

            } catch (error) {

                res.writeHead(400, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    message: "Invalid JSON data"
                }));
            }
        });
    }

    // Invalid route
    else {

        res.writeHead(404, {
            "Content-Type": "text/plain"
        });

        res.end("404 - Route Not Found");
    }
});

server.listen(3000, () => {
    console.log("HTTP Server running at http://localhost:3000");
});