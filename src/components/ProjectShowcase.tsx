import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ProjectContainer = styled.div`
  font-family: ${({ theme }) => theme.fonts.main};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  height: 100%;
`;

const ProjectList = styled.div`
  flex: 0 0 40%;
  overflow-y: auto;
  border-right: 1px solid ${({ theme }) => theme.colors.accent};
  padding-right: 1rem;
`;

const ProjectLine = styled.div<{ selected: boolean }>`
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: ${({ selected, theme }) => selected ? theme.colors.accent : theme.colors.text};
  background-color: ${({ selected, theme }) => selected ? `${theme.colors.accent}22` : 'transparent'};

  &:hover {
    background-color: ${({ theme }) => `${theme.colors.accent}11`};
  }
`;

const ProjectDetails = styled.div`
  flex: 1;
  padding-left: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const ASCIIArt = styled.pre`
  font-size: 0.6rem;
  line-height: 0.7rem;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 1rem;
`;

const ProjectInfo = styled.div`
  flex: 1;
`;

const ProjectTitle = styled.h3`
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 0.5rem;
`;

const ProjectDescription = styled.p`
  margin-bottom: 0.5rem;
`;

const ProjectLink = styled.a`
  color: ${({ theme }) => theme.colors.accent};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const NavigationHelp = styled.p`
  font-size: 0.8rem;
  margin-top: 1rem;
  color: ${({ theme }) => theme.colors.text}aa;
`;

interface Project {
  title: string;
  description: string;
  link: string;
  type: string;
  ascii: string;
}

const projects: Project[] = [
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
 /       \\
|  SHOP!  |
 \\_______/
    `
  },
  {
    title: 'Automated E-commerce Scraping',
    description: 'GitHub Actions for data collection',
    link: 'https://medium.com/@julianlopezba/automate-e-commerce-scraping-with-github-actions-a7bc707c7402',
    type: 'Article',
    ascii: `
   _____
  |     |
  | WWW |
 /       \\
|  $   $  |
|    >    |
 \\  ___  /
  |     |
  |DATA |
  |_____|
    `
  },
  {
    title: 'Link Prediction with GAE',
    description: 'Graph Auto-Encoders on Crunchbase data',
    link: 'https://julianlopezb.github.io/blog/fastpages/jupyter/2022/07/20/Link-Prediction-Graph-Auto-Encoders-WIP.html',
    type: 'Research',
    ascii: `
    (o)
   /   \\
  (o)-(o)
 /   X   \\
(o)-(o)-(o)
     |
    (o)
    `
  },
  {
    title: 'Social Dilemmas with MARL',
    description: 'Multi-Agent Reinforcement Learning study',
    link: 'https://julianlopezb.github.io/blog/fastpages/jupyter/2022/08/01/Social-Dilemmas-with-Multi-Agent-Reinforcent-Learning-WIP.html',
    type: 'Research',
    ascii: `
   ___     ___
  (o o)   (o o)
 (  V  ) (  V  )
/--m-m- /--m-m-
    `
  },
  {
    title: 'Custom Object Detection with YOLOv5',
    description: "Leveraging GCP's free tier for model training",
    link: 'https://julianlopezbaasch.medium.com/how-to-leverage-gcp-free-tier-to-train-your-custom-object-detection-with-yolov5-c0dde7a3c189',
    type: 'Tutorial',
    ascii: `
  ________
 |        |
 | O    O |
 |   <>   |
 |  ____  |
 |________|
    `
  },
  {
    title: 'Mining Twitter Discourse on Covid19',
    description: 'NLP and Social Network Analysis on Twitter data',
    link: 'https://towardsdatascience.com/mining-twitter-discourse-on-covid19-a2b6df66daee',
    type: 'Data Analysis',
    ascii: `
   _____
  /      \\
 |  TWEET |
 |   19   |
  \\______/
     ||
   \\    /
    \\  /
     \\/
    `
  },
];

export const ProjectShowcase: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        setSelectedProject(prev => (prev > 0 ? prev - 1 : projects.length - 1));
      } else if (event.key === 'ArrowDown') {
        setSelectedProject(prev => (prev < projects.length - 1 ? prev + 1 : 0));
      } else if (event.key === 'Enter') {
        window.open(projects[selectedProject].link, '_blank');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  return (
    <ProjectContainer>
      <ProjectList>
        <h2>Projects</h2>
        {projects.map((project, index) => (
          <ProjectLine 
            key={index} 
            selected={index === selectedProject}
            onClick={() => setSelectedProject(index)}
          >
            {project.title} - {project.type}
          </ProjectLine>
        ))}
        <NavigationHelp>
          Use ↑↓ arrows to navigate, Enter to open project link
        </NavigationHelp>
      </ProjectList>
      <ProjectDetails>
        <ASCIIArt>{projects[selectedProject].ascii}</ASCIIArt>
        <ProjectInfo>
          <ProjectTitle>{projects[selectedProject].title}</ProjectTitle>
          <ProjectDescription>{projects[selectedProject].description}</ProjectDescription>
          <ProjectLink href={projects[selectedProject].link} target="_blank" rel="noopener noreferrer">
            View Project
          </ProjectLink>
        </ProjectInfo>
      </ProjectDetails>
    </ProjectContainer>
  );
};