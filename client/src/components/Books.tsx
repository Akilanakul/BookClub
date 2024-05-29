import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Book } from '../types';

const Books: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]); // Assuming Book type is defined somewhere

    useEffect(() => {
      const fetchBooks = async () => {
        const token = localStorage.getItem('token');
        try {
          const response = await axios.get('http://localhost:3000/books', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setBooks(response.data);
        } catch (error) {
          console.error('Error fetching books', error);
        }
      };
      fetchBooks();
    }, []);

    

    return (
      <div>
        <h2>Book Clubs</h2>
        <ul>
          {books.map(book => (
            <li key={book.id}>
              <img src={book.coverage_image} alt={book.title} />
              <div>
                <h3>{book.title}</h3>
                <p>Author: {book.author}</p>
                <p>Genre: {book.genre}</p>
                {/* You can display more book details here */}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
};

export default Books;
