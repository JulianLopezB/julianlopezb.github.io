import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ContentContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ContentWrapper = styled.div`
  background: ${({ theme }) => theme.colors.background};
  padding: 2rem;
  border-radius: 8px;
  max-width: 80%;
  max-height: 80%;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;
`;

interface ProjectContentProps {
  url: string;
  onClose: () => void;
}

export const ProjectContent: React.FC<ProjectContentProps> = ({ url, onClose }) => {
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(url);
        const html = await response.text();
        setContent(html);
      } catch (error) {
        console.error('Error fetching project content:', error);
        setContent('<p>Error loading content. Please try again later.</p>');
      }
    };

    fetchContent();
  }, [url]);

  return (
    <ContentContainer>
      <ContentWrapper>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </ContentWrapper>
    </ContentContainer>
  );
};