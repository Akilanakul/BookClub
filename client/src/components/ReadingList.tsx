import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReadingList: React.FC = () => {
  const [readingList, setReadingList] = useState<any[]>([]);

  useEffect(() => {
    const fetchReadingList = async () => {
      const token = localStorage.getItem('token');
      try {
        const userId = 1; // Replace with the actual user ID if needed
        const response = await axios.get(`http://localhost:3000/reading-list/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReadingList(response.data);
      } catch (error) {
        console.error('Error fetching reading list', error);
      }
    };
    fetchReadingList();
  }, []);

  return (
    <div>
      <h2>Reading List</h2>
      {readingList.length > 0 ? (
        <ul>
          {readingList.map((item) => (
            <li key={item.id}>
              <p>Book ID: {item.book.id}</p>
              <p>Title: {item.book.title}</p>
              <p>Status: {item.status}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No books in the reading list</p>
      )}
    </div>
  );
};

export default ReadingList;
