import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';

const ContactContainer = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.main};
`;

const Header = styled.h2`
  color: ${({ theme }) => theme.colors.accent};
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const ContactList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ContactItem = styled.li`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
`;

const ContactLink = styled.a`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const IconWrapper = styled.span`
  margin-right: 0.5rem;
  width: 20px;
  display: inline-flex;
  justify-content: center;
`;

export const Contact: React.FC = () => {
  return (
    <ContactContainer>
      <Header>Contact Me</Header>
      <ContactList>
        <ContactItem>
          <ContactLink href="mailto:julianlopezba@gmail.com">
            <IconWrapper>
              <FontAwesomeIcon icon={faEnvelope} />
            </IconWrapper>
            julianlopezba@gmail.com
          </ContactLink>
        </ContactItem>
        <ContactItem>
          <ContactLink href="https://www.linkedin.com/in/julianlopezba/" target="_blank" rel="noopener noreferrer">
            <IconWrapper>
              <FontAwesomeIcon icon={faLinkedin} />
            </IconWrapper>
            Julian Lopez Baasch
          </ContactLink>
        </ContactItem>
        <ContactItem>
          <ContactLink href="https://github.com/JulianLopezB" target="_blank" rel="noopener noreferrer">
            <IconWrapper>
              <FontAwesomeIcon icon={faGithub} />
            </IconWrapper>
            JulianLopezB
          </ContactLink>
        </ContactItem>
        <ContactItem>
          <ContactLink href="https://twitter.com/JulianLBaasch" target="_blank" rel="noopener noreferrer">
            <IconWrapper>
              <FontAwesomeIcon icon={faTwitter} />
            </IconWrapper>
            @JulianLBaasch
          </ContactLink>
        </ContactItem>
      </ContactList>
    </ContactContainer>
  );
};