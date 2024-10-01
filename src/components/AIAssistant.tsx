import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { getAIResponse } from '../utils/aiSetup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRobot } from '@fortawesome/free-solid-svg-icons';

const AIContainer = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.main};
  display: flex;
  flex-direction: column;
`;

const Header = styled.h2`
  color: ${({ theme }) => theme.colors.accent};
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const ConversationContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 4px;
`;

const MessageContainer = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: flex-start;
`;

const MessageContent = styled.div`
  margin: 0;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  max-width: 80%;
  display: flex;
  align-items: center;
`;

const UserMessage = styled(MessageContent)`
  background-color: ${({ theme }) => theme.colors.primary};
  margin-left: auto;
`;

const AIMessage = styled(MessageContent)`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.primary};
`;

const IconWrapper = styled.span`
  margin-right: 0.5rem;
  width: 20px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

const MessageText = styled.p`
  margin: 0;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.text};
  font-family: inherit;
  border-radius: 4px;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.accent}33;
  }
`;

export const AIAssistant: React.FC = () => {
  const [conversation, setConversation] = useState<{ role: 'user' | 'ai'; content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');
  const conversationRef = useRef<HTMLDivElement>(null);

  const handleUserInput = async (userInput: string) => {
    if (!userInput.trim()) return;

    setConversation(prev => [...prev, { role: 'user', content: userInput }]);
    setInput('');
    setIsLoading(true);

    try {
      const { content } = await getAIResponse(userInput);
      setConversation(prev => [...prev, { role: 'ai', content }]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      setConversation(prev => [...prev, { role: 'ai', content: "Sorry, I encountered an error." }]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [conversation]);

  return (
    <AIContainer>
      <Header>AI Assistant</Header>
      <ConversationContainer ref={conversationRef}>
        {conversation.map((message, index) => (
          <MessageContainer key={index}>
            {message.role === 'user' ? (
              <UserMessage>
                <IconWrapper>
                  <FontAwesomeIcon icon={faUser} />
                </IconWrapper>
                <MessageText>{message.content}</MessageText>
              </UserMessage>
            ) : (
              <AIMessage>
                <IconWrapper>
                  <FontAwesomeIcon icon={faRobot} />
                </IconWrapper>
                <MessageText>{message.content}</MessageText>
              </AIMessage>
            )}
          </MessageContainer>
        ))}
        {isLoading && (
          <MessageContainer>
            <AIMessage>
              <IconWrapper>
                <FontAwesomeIcon icon={faRobot} />
              </IconWrapper>
              <MessageText>AI is thinking...</MessageText>
            </AIMessage>
          </MessageContainer>
        )}
      </ConversationContainer>
      <Input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask about Julian's CV..."
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleUserInput(input);
          }
        }}
      />
    </AIContainer>
  );
};