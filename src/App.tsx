import React from 'react';
import './utils/fontawesome';
import styled, { ThemeProvider } from 'styled-components';
import { Terminal } from './components/Terminal';
import { defaultTheme } from './styles/themes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import GlitchText from './components/GlitchText';


const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.main};
  border-bottom: 2px solid ${({ theme }) => theme.colors.accent};
`;

const HeaderTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

const IconLink = styled.a`
  color: ${({ theme }) => theme.colors.text};
  margin-left: 1rem;
  font-size: 1.2rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  padding: 1rem;
`;

const App: React.FC = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <AppContainer>
        <Header>
          <HeaderTitle>
            <GlitchText data-text="Julian Lopez Baasch">
              Julian Lopez Baasch
            </GlitchText>
          </HeaderTitle>
          <IconContainer>
            <span>AI/ML Engineer & Data Scientist</span>
            <IconLink href="https://github.com/JulianLopezB" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGithub} />
            </IconLink>
            <IconLink href="https://www.linkedin.com/in/julianlopezba/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} />
            </IconLink>
          </IconContainer>
        </Header>
        <MainContent>
          <Terminal />
        </MainContent>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;