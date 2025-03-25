async function renderPage() {
    const container = document.querySelector('.container');

    try {
        // Fetch data from db.json
        const response = await axios.get('http://localhost:5001/books');
        const books = response.data;

        // Convert existing IDs into a Set for quick lookup
        const existingIds = new Set(books.map(book => book.id));

        books.forEach(book => {
            const bookDiv = document.createElement('div');
            bookDiv.classList.add('book');

            const title = document.createElement('h2');
            title.textContent = book.title;
            bookDiv.appendChild(title);

            const author = document.createElement('p');
            author.textContent = `Author: ${book.author}`;
            bookDiv.appendChild(author);

            const year = document.createElement('p');
            year.textContent = `Year: ${book.year}`;
            bookDiv.appendChild(year);

            const genre = document.createElement('p');
            genre.textContent = `Genre: ${book.genre}`;
            bookDiv.appendChild(genre);

            container.appendChild(bookDiv);
        });

        bookForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            let title = document.getElementById("title").value;
            let author = document.getElementById("author").value;
            let pages = document.getElementById("pages").value;
            let year = document.getElementById("year").value;
            let genre = document.getElementById("genre").value;
            let id = generateUniqueId(existingIds); // Generate unique ID

            let newBook = {
                title,   // Title comes first
                author,  // Then author
                pages,   // Then pages
                year,    // Then year
                genre,   // Then genre
                id       // ID is last
            };

            existingIds.add(newBook.id);
            console.log(newBook);

            try {
                await axios.post('http://localhost:5001/books', newBook);
                renderPage();
            } catch (error) {
                console.error("Error adding book:", error);
            }

            bookForm.reset();
        });

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to generate a unique ID
function generateUniqueId(existingIds) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id;

    do {
        id = "";
        for (let i = 0; i < 4; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
    } while (existingIds.has(id)); // Regenerate if the ID already exists

    return id;
}

renderPage();
