import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
  font-family: ${({ theme }) => theme.fonts.main};
  color: ${({ theme }) => theme.colors.text};
`;

const Header = styled.h2`
  color: ${({ theme }) => theme.colors.accent};
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Paragraph = styled.p`
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const List = styled.ul`
  list-style-type: none;
  padding-left: 0;
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
  display: flex;
  align-items: flex-start;

  &:before {
    content: '▹';
    color: ${({ theme }) => theme.colors.accent};
    margin-right: 0.5rem;
  }
`;

const Link = styled.a`
  color: ${({ theme }) => theme.colors.accent};
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const About: React.FC = () => {
  return (
    <AboutContainer>
      <Header>About Julian Lopez Baasch</Header>
      <Paragraph>
        I'm an AI/ML Engineer and Data Scientist with a passion for solving complex problems
        using cutting-edge technology. With expertise in Python, PyTorch, and ReactJS,
        I specialize in NLP, Computer Vision, and deploying machine learning models at scale.
      </Paragraph>
      <Paragraph>My background includes:</Paragraph>
      <List>
        <ListItem>
          MSc in Intelligent Interactive Systems from{' '}
          <Link href="https://www.upf.edu/web/iis" target="_blank" rel="noopener noreferrer">
            U Pompeu Fabra
          </Link>
        </ListItem>
        <ListItem>
          BA and MSc in Economics from{' '}
          <Link href="https://www.utdt.edu/ver_contenido.php?id_contenido=11523&id_item_menu=21897" target="_blank" rel="noopener noreferrer">
            Universidad Torcuato Di Tella
          </Link>
        </ListItem>
        <ListItem>
          Co-founder of{' '}
          <Link href="https://www.linkedin.com/company/dokuso/" target="_blank" rel="noopener noreferrer">
            Dokuso
          </Link>
          , where I drive innovation in AI solutions
        </ListItem>
      </List>
    </AboutContainer>
  );
};