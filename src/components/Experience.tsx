import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket } from '@fortawesome/free-solid-svg-icons';

const ExperienceContainer = styled.div`
  font-family: ${({ theme }) => theme.fonts.main};
  color: ${({ theme }) => theme.colors.text};
  padding: 1rem;
  display: flex;
  height: 100%;
`;

const DirectoryList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 1rem;
`;

const pulse = keyframes`
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
`;

const DirectoryLine = styled.div<{ selected: boolean }>`
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  border-left: 2px solid ${({ selected, theme }) => selected ? theme.colors.accent : 'transparent'};
  background-color: ${({ selected, theme }) => selected ? `${theme.colors.accent}22` : 'transparent'};

  &:hover {
    background-color: ${({ theme }) => `${theme.colors.accent}11`};
  }

  ${({ selected }) => selected && css`
    animation: ${pulse} 2s infinite;
  `}
`;

const JobIcon = styled(FontAwesomeIcon)`
  margin-right: 0.5rem;
  color: ${({ theme }) => theme.colors.accent};
`;

const JobDetails = styled.div`
  flex: 2;
  border-left: 1px solid ${({ theme }) => theme.colors.accent};
  padding-left: 1rem;
  overflow-y: auto;
`;

const JobTitle = styled.h3`
  color: ${({ theme }) => theme.colors.accent};
  font-family: ${({ theme }) => theme.fonts.headings};
  margin-bottom: 0.5rem;
`;

const JobCompany = styled.p`
  font-style: italic;
  margin-bottom: 1rem;
`;

const JobDescription = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const JobDescriptionItem = styled.li`
  margin-bottom: 0.5rem;
  display: flex;
  align-items: flex-start;

  &:before {
    content: '▹';
    color: ${({ theme }) => theme.colors.accent};
    margin-right: 0.5rem;
  }
`;

const SkillTag = styled.span`
  background-color: ${({ theme }) => `${theme.colors.accent}33`};
  color: ${({ theme }) => theme.colors.accent};
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  display: inline-block;
  font-size: 0.8rem;
`;

const jobs = [
  {
    id: 'stefanini',
    title: "AI Developer",
    company: "Stefanini EMEA",
    period: "Jan 2024 - Present",
    description: [
      "Led LLM applications for legal document data",
      "Developed NLP and LLM data extraction pipelines",
      "Leveraged OpenAI SDK, Langchain, LlamaIndex, Autogen",
      "Established MLOps framework with MLFlow and Azure",
      "Fine-tuned datasets for LLMs (Llama2, Mixtral)"
    ],
    skills: ["LLM", "NLP", "MLOps", "OpenAI", "Langchain", "Azure"]
  },
  {
    id: 'trendflow',
    title: "AI Engineer, Co-founder",
    company: "TrendFlow",
    period: "Jan 2023 - Present",
    description: [
      "Developed AI-powered fashion search engine with CLIP embeddings",
      "Led full-stack development with ReactJS and Flask",
      "Managed deployment with CloudRun and Docker",
      "Automated data aggregation from fashion e-commerces",
      "Created LLM agent for TrendFlow API",
      "Fine-tuned CLIP with data from 30+ retail brands"
    ],
    skills: ["CLIP", "ReactJS", "Flask", "CloudRun", "Docker", "LLM", "BigQuery"]
  },
  {
    id: 'olipay',
    title: "Sr. Machine Learning Engineer",
    company: "Olipay",
    period: "Jun 2021 - Dec 2023",
    description: [
      "Deployed ML model monitoring dashboard with Dash, Docker, and CloudRun",
      "Implemented MLFlow+Papermill for experiment tracking",
      "Refactored ML pipelines, reducing inference time by 50%",
      "Designed multi-step feature selection algorithm to mitigate overfitting",
      "Developed custom feature engineering modules with SciKit-Learn Transformers"
    ],
    skills: ["Dash", "Docker", "CloudRun", "MLFlow", "Papermill", "SciKit-Learn"]
  },
  {
    id: 'freelance',
    title: "Machine Learning Consultant",
    company: "Freelance",
    period: "Dec 2019 - Mar 2022",
    description: [
      "Helped startups from LATAM and USA build Machine Learning solutions",
      "Provided expertise in various ML domains including NLP and Computer Vision"
    ],
    skills: ["Machine Learning", "Consulting", "NLP", "Computer Vision"]
  },
  {
    id: 'bimo',
    title: "Lead Data Scientist",
    company: "Bimo",
    period: "Feb 2021 - Jun 2021",
    description: [
      "Crafted comprehensive data model for marketing, product innovation, and business growth",
      "Engineered graph-based recommender system, increasing Monthly Spend Per User by 5%",
      "Streamlined data pipelines to BigQuery and spreadsheets",
      "Designed insightful dashboards using Dash and DataStudio"
    ],
    skills: ["Data Modeling", "Graph-based Recommender Systems", "BigQuery", "Dash", "DataStudio"]
  },
  {
    id: 'banco-galicia',
    title: "Sr. Data Scientist",
    company: "Banco Galicia",
    period: "Nov 2019 - Feb 2021",
    description: [
      "Led data science team to design and deliver impactful data products",
      "Trained and deployed NLP models for social media comment classification",
      "Conducted web scraping of key Latin American e-commerce platforms",
      "Developed model to detect fraudulent social network users"
    ],
    skills: ["Team Leadership", "NLP", "Web Scraping", "Fraud Detection"]
  },
  {
    id: 'presidencia',
    title: "Sr. Data Analyst",
    company: "Presidencia de la Nacion",
    period: "Jul 2016 - Jul 2018",
    description: [
      "Analyzed data to support national policy decisions",
      "Developed data-driven solutions for government initiatives"
    ],
    skills: ["Data Analysis", "Policy Analysis", "Government"]
  },
  {
    id: 'directv',
    title: "Sr. Econometrics Analyst",
    company: "DIRECTV Latin America",
    period: "Mar 2014 - Jul 2016",
    description: [
      "Designed model to measure repeated TV content across channels using Jaccard Index",
      "Built predictive model for prepaid recharge behavior based on real-time event analysis",
      "Developed logistic regression model to predict customer satisfaction"
    ],
    skills: ["Econometrics", "Predictive Modeling", "Customer Satisfaction Analysis"]
  }
];

export const Experience: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        setSelectedJob(prev => (prev > 0 ? prev - 1 : jobs.length - 1));
      } else if (event.key === 'ArrowDown') {
        setSelectedJob(prev => (prev < jobs.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <ExperienceContainer>
      <DirectoryList>
        <h2>Career Timeline</h2>
        <p>Use ↑↓ arrows to navigate</p>
        {jobs.map((job, index) => (
          <DirectoryLine 
            key={job.id} 
            selected={index === selectedJob}
            onClick={() => setSelectedJob(index)}
          >
            <JobIcon icon={faRocket} />
            {job.company}
          </DirectoryLine>
        ))}
      </DirectoryList>
      <JobDetails>
        <JobTitle>{jobs[selectedJob].title}</JobTitle>
        <JobCompany>{jobs[selectedJob].company} | {jobs[selectedJob].period}</JobCompany>
        <JobDescription>
          {jobs[selectedJob].description.map((desc, index) => (
            <JobDescriptionItem key={index}>{desc}</JobDescriptionItem>
          ))}
        </JobDescription>
        <div style={{ marginTop: '1rem' }}>
          {jobs[selectedJob].skills.map((skill, index) => (
            <SkillTag key={index}>{skill}</SkillTag>
          ))}
        </div>
      </JobDetails>
    </ExperienceContainer>
  );
};