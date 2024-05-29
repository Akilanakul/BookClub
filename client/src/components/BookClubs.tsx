import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BookClub, Member } from '../types'; // Import the types

const BookClubs: React.FC = () => {
  const [bookClubs, setBookClubs] = useState<BookClub[]>([]);

  useEffect(() => {
    const fetchBookClubs = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:3000/book-club', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookClubs(response.data);
      } catch (error) {
        console.error('Error fetching book clubs', error);
      }
    };
    fetchBookClubs();
  }, []);

  return (
    <div>
      <h2>Book Clubs</h2>
      {bookClubs.length > 0 ? (
        <ul>
          {bookClubs.map((bookClub) => (
            <li key={bookClub.id}>
              <h3>{bookClub.name}</h3>
              <p>{bookClub.description}</p>
              <p>Members: {bookClub.members.map((member: Member) => member.username).join(', ')}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No book clubs available</p>
      )}
    </div>
  );
};

export default BookClubs;
