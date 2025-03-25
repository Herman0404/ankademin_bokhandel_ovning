// Function to render the page dynamically
async function renderPage() {
    const container = document.querySelector('.container');
    
    try {
        // Fetch data from db.json
        const response = await axios.get('http://localhost:5001/books');
        const books = response.data;

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
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

renderPage();
