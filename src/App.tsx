import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Terminal } from './components/Terminal';
import { defaultTheme } from './styles/themes';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.main};
`;

const Header = styled.header`
  padding: 1rem;
  text-align: center;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.background};
  background: ${({ theme }) => theme.colors.accent};
  border-bottom: 2px solid ${({ theme }) => theme.colors.text};
`;

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`;

const App: React.FC = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <AppContainer>
        <Header>Julian Lopez Baasch: AI/ML Engineer & Data Scientist</Header>
        <MainContent>
          <Terminal />
        </MainContent>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;