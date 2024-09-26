import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ExperienceContainer = styled.div`
  font-family: 'Courier New', Courier, monospace;
  color: ${({ theme }) => theme.colors.text};
  padding: 1rem;
`;

const DirectoryLine = styled.div<{ selected: boolean }>`
  padding: 0.2rem 0;
  cursor: pointer;
  background-color: ${({ selected, theme }) => selected ? theme.colors.accent : 'transparent'};
  color: ${({ selected, theme }) => selected ? theme.colors.background : theme.colors.text};
`;

const JobDetails = styled.div`
  margin-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.accent};
  padding-top: 1rem;
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
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        setSelectedJob(prev => (prev > 0 ? prev - 1 : jobs.length - 1));
      } else if (event.key === 'ArrowDown') {
        setSelectedJob(prev => (prev < jobs.length - 1 ? prev + 1 : 0));
      } else if (event.key === 'Enter') {
        setShowDetails(true);
      } else if (event.key === 'Escape') {
        setShowDetails(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <ExperienceContainer>
      <h2>Career Directory</h2>
      <p>Use arrow keys to navigate, Enter to view details, Esc to go back</p>
      {jobs.map((job, index) => (
        <DirectoryLine 
          key={job.id} 
          selected={index === selectedJob}
          onClick={() => setSelectedJob(index)}
        >
          {job.id}/
        </DirectoryLine>
      ))}
      {showDetails && (
        <JobDetails>
          <h3>{jobs[selectedJob].title}</h3>
          <p>{jobs[selectedJob].company} ({jobs[selectedJob].period})</p>
          <ul>
            {jobs[selectedJob].description.map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
          </ul>
          <p>Skills: {jobs[selectedJob].skills.join(', ')}</p>
        </JobDetails>
      )}
    </ExperienceContainer>
  );
};