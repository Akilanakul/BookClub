import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface Post {
  user_id: number;
  content: string;
}

interface DiscussionData {
  id: number;
  book_club_id: number;
  title: string;
  author_id: number;
  posts: Post[];
}

const Discussion: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [discussion, setDiscussion] = useState<DiscussionData | null>(null);

  useEffect(() => {
    const fetchDiscussion = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get<DiscussionData>(`http://localhost:3000/discussion/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDiscussion(response.data);
      } catch (error) {
        console.error('Error fetching discussion', error);
      }
    };
    fetchDiscussion();
  }, [id]);

  return (
    <div>
      <h2>Discussion</h2>
      {discussion ? (
        <div>
          <h3>{discussion.title}</h3>
          <ul>
            {discussion.posts.map((post, index) => (
              <li key={index}>
                <p>User ID: {post.user_id}</p>
                <p>{post.content}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Discussion;
