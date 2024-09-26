import React from 'react';
import styled from 'styled-components';

const ContactContainer = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
`;

const ContactLink = styled.a`
  color: #e94560;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const Contact: React.FC = () => {
  return (
    <ContactContainer>
      <h2>Contact Me</h2>
      <p>Feel free to reach out through any of the following channels:</p>
      <ul>
        <li>Email: <ContactLink href="mailto:julianlopezba@gmail.com">julianlopezba@gmail.com</ContactLink></li>
        <li>LinkedIn: <ContactLink href="https://www.linkedin.com/in/julianlopezba/" target="_blank" rel="noopener noreferrer">Julian Lopez Baasch</ContactLink></li>
        <li>GitHub: <ContactLink href="https://github.com/JulianLopezB" target="_blank" rel="noopener noreferrer">JulianLopezB</ContactLink></li>
        <li>Twitter: <ContactLink href="https://twitter.com/JulianLBaasch" target="_blank" rel="noopener noreferrer">@JulianLBaasch</ContactLink></li>
      </ul>
    </ContactContainer>
  );
};