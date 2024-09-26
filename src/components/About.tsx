import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

const ASCIIArt = styled.pre`
  font-size: 0.6rem;
  line-height: 0.7rem;
  color: ${({ theme }) => theme.colors.accent};
`;

const Content = styled.div`
  flex: 1;
`;

const Link = styled.a`
  color: ${({ theme }) => theme.colors.accent};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const About: React.FC = () => {
  return (
    <AboutContainer>
      <ASCIIArt>
        {`
   ______
  /      \\
 /  ^  ^  \\
|  (o)(o)  |
 \\    <   /
  \\  ___  /
   \\_____/
        `}
      </ASCIIArt>
      <Content>
        <h2>About Julian Lopez Baasch</h2>
        <p>
          I'm an AI/ML Engineer and Data Scientist with a passion for solving complex problems
          using cutting-edge technology. With expertise in Python, PyTorch, and ReactJS,
          I specialize in NLP, Computer Vision, and deploying machine learning models at scale.
        </p>
        <p>
          My background includes:
          <ul>
            <li>MSc in Intelligent Interactive Systems from <Link href="https://www.upf.edu/web/iis" target="_blank" rel="noopener noreferrer">U Pompeu Fabra</Link></li>
            <li>BA and MSc in Economics from <Link href="https://www.utdt.edu/ver_contenido.php?id_contenido=11523&id_item_menu=21897" target="_blank" rel="noopener noreferrer">Universidad Torcuato Di Tella</Link></li>
            <li>Co-founder of <Link href="https://www.linkedin.com/company/dokuso/" target="_blank" rel="noopener noreferrer">Dokuso</Link>, where I drive innovation in AI solutions</li>
          </ul>
        </p>
      </Content>
    </AboutContainer>
  );
};