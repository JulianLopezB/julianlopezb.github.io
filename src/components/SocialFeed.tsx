import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const FeedContainer = styled.div`
  font-family: 'Courier New', Courier, monospace;
  color: ${({ theme }) => theme.colors.text};
  padding: 1rem;
`;

const Tweet = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.accent};
  padding: 0.5rem;
  margin-bottom: 0.5rem;
`;

const TweetDate = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.accent};
`;

interface TweetData {
  id: string;
  text: string;
  created_at: string;
}

export const SocialFeed: React.FC = () => {
  const [tweets, setTweets] = useState<TweetData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await fetch('/.netlify/functions/getTweets');
        if (!response.ok) {
          throw new Error('Failed to fetch tweets');
        }
        const data = await response.json();
        setTweets(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch tweets. Please try again later.');
        setLoading(false);
      }
    };

    fetchTweets();
  }, []);

  if (loading) {
    return <FeedContainer>Loading tweets...</FeedContainer>;
  }

  if (error) {
    return <FeedContainer>{error}</FeedContainer>;
  }

  return (
    <FeedContainer>
      <h2>Latest Tweets</h2>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id}>
          <p>{tweet.text}</p>
          <TweetDate>{new Date(tweet.created_at).toLocaleDateString()}</TweetDate>
        </Tweet>
      ))}
    </FeedContainer>
  );
};