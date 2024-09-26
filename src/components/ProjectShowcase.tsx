import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ProjectContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  padding: 1rem;
  overflow-y: auto;
  max-height: calc(100vh - 200px); // Adjust based on your layout
`;

const ProjectCard = styled.div<{ isFocused: boolean }>`
  background: ${({ theme, isFocused }) => isFocused ? theme.colors.accent : 'transparent'};
  color: ${({ theme, isFocused }) => isFocused ? theme.colors.primary : theme.colors.text};
  padding: 1rem;
  border: 1px solid ${({ theme, isFocused }) => isFocused ? theme.colors.accent : theme.colors.text};
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
`;

const ASCIIArt = styled.pre`
  font-size: 0.7rem;
  line-height: 0.8rem;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 0.5rem;
`;

const ProjectLink = styled.a`
  color: ${({ theme }) => theme.colors.accent};
  text-decoration: none;
  margin-top: auto;
  &:hover {
    text-decoration: underline;
  }
`;

const ProjectType = styled.span`
  font-size: 0.8rem;
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const NavigationInfo = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  margin-bottom: 1rem;
  font-style: italic;
  opacity: 0.7;
`;

const ProjectTitle = styled.h3`
  margin: 0.5rem 0;
  font-size: 1.2rem;
`;

const ProjectDescription = styled.p`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

export const ProjectShowcase: React.FC = () => {
  const [focusedIndex, setFocusedIndex] = useState(0);

  const projects = [
    {
      title: 'E-commerce Chatbot',
      description: 'OpenAI API integration for fashion assistant',
      link: 'https://medium.com/@julianlopezba/enhancing-e-commerce-chatbots-with-openai-apis-custom-functions-a-deep-dive-into-the-dokuso-fa7083df1a35',
      type: 'Article',
      ascii: `
   _____
  /     \\
 /       \\
|  ^   ^  |
|  (o o)  |
|  ( < )  |
 \\  ---  /
  \\_____/
      `
    },
    {
      title: 'Automated E-commerce Scraping',
      description: 'GitHub Actions for data collection',
      link: 'https://medium.com/@julianlopezba/automate-e-commerce-scraping-with-github-actions-a7bc707c7402',
      type: 'Article',
      ascii: `
   _________
  / ======= \\
 / __________\\
| ___________ |
| | -       | |
| |         | |
| |_________| |
\\=____________/
      `
    },
    {
      title: 'Link Prediction with GAE',
      description: 'Graph Auto-Encoders on Crunchbase data',
      link: 'https://julianlopezb.github.io/blog/fastpages/jupyter/2022/07/20/Link-Prediction-Graph-Auto-Encoders-WIP.html',
      type: 'Research',
      ascii: `
    ___
   /   \\
  /     \\
 /       \\
|  O---O  |
 \\  ___  /
  \\_____/
      `
    },
    {
      title: 'Social Dilemmas with MARL',
      description: 'Multi-Agent Reinforcement Learning study',
      link: 'https://julianlopezb.github.io/blog/fastpages/jupyter/2022/08/01/Social-Dilemmas-with-Multi-Agent-Reinforcent-Learning-WIP.html',
      type: 'Research',
      ascii: `
   _____
  /     \\
 | () () |
 \\   ^   /
  |UUUUU|
  |     |
  '-----'
      `
    },
    {
      title: 'Custom Object Detection with YOLOv5',
      description: "Leveraging GCP's free tier for model training",
      link: 'https://julianlopezbaasch.medium.com/how-to-leverage-gcp-free-tier-to-train-your-custom-object-detection-with-yolov5-c0dde7a3c189',
      type: 'Tutorial',
      ascii: `
    ____
   /    \\
  | ^  ^ |
  | O  O |
  |  ||  |
   \\____/
      `
    },
    {
      title: 'Mining Twitter Discourse on Covid19',
      description: 'NLP and Social Network Analysis on Twitter data',
      link: 'https://towardsdatascience.com/mining-twitter-discourse-on-covid19-a2b6df66daee',
      type: 'Data Analysis',
      ascii: `
   /\\___/\\
  (  o o  )
  /   V   \\
 /(  _^_  )\\
   \\  \\|/  /
    \`-----'
      `
    },
  ];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          setFocusedIndex(prev => (prev >= 2 ? prev - 2 : projects.length - 1 + prev));
          break;
        case 'ArrowDown':
          setFocusedIndex(prev => (prev < projects.length - 2 ? prev + 2 : prev % 2));
          break;
        case 'ArrowLeft':
          setFocusedIndex(prev => (prev > 0 ? prev - 1 : projects.length - 1));
          break;
        case 'ArrowRight':
          setFocusedIndex(prev => (prev < projects.length - 1 ? prev + 1 : 0));
          break;
        case 'Enter':
          window.open(projects[focusedIndex].link, '_blank');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedIndex, projects]);

  return (
    <ProjectContainer>
      <NavigationInfo>Use arrow keys to navigate, Enter to open project</NavigationInfo>
      {projects.map((project, index) => (
        <ProjectCard 
          key={index} 
          isFocused={index === focusedIndex}
        >
          <ASCIIArt>{project.ascii}</ASCIIArt>
          <ProjectType>{project.type}</ProjectType>
          <ProjectTitle>{project.title}</ProjectTitle>
          <ProjectDescription>{project.description}</ProjectDescription>
          <ProjectLink 
            href={project.link} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Learn More
          </ProjectLink>
        </ProjectCard>
      ))}
    </ProjectContainer>
  );
};