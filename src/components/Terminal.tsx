import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRobot } from '@fortawesome/free-solid-svg-icons';
import { Experience } from './Experience';
import { About } from './About';
import { ProjectShowcase } from './ProjectShowcase';
import { Contact } from './Contact';
import { SocialFeed } from './SocialFeed';
import { getAIResponse } from '../utils/aiSetup';

type SectionName = 'root' | 'about' | 'experience' | 'projects' | 'contact' | 'social';


const TerminalContainer = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.main};
  padding: 1rem;
  height: 100%;
  overflow-y: auto;
  border-radius: 6px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
`;

const InputLine = styled.div`
  display: flex;
  align-items: center;
`;

const Prompt = styled.span`
  color: ${({ theme }) => theme.colors.accent};
  margin-right: 0.5rem;
`;

const Input = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-family: inherit;
  font-size: 1rem;
  caret-color: ${({ theme }) => theme.colors.accent};
  width: 100%;
  &:focus {
    outline: none;
  }
`;

const OutputLine = styled.div`
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.accent3};
    text-shadow: 0 0 5px ${({ theme }) => theme.colors.accent3};
  }
`;

const AIOutputLine = styled(OutputLine)`
  background-color: ${({ theme }) => theme.colors.aiBackground};
  border-radius: 4px;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: flex-start;aiConversation
`;

const AIIcon = styled.span`
  margin-right: 0.5rem;
  color: ${({ theme }) => theme.colors.accent};
`;

const AIContent = styled.span`
  flex: 1;
`;

const UserIcon = styled(AIIcon)`
  color: ${({ theme }) => theme.colors.userIcon};
`;

const sections: Record<SectionName, string[]> = {
  root: ['about', 'experience', 'projects', 'contact', 'social'],
  about: [],
  experience: [],
  projects: [],
  contact: [],
  social: [],
};

export const Terminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<JSX.Element[]>([
    <OutputLine key="welcome">Welcome to Julian's Portfolio Terminal. Type 'help' for available commands.</OutputLine>
  ]);
  const [currentPath, setCurrentPath] = useState<SectionName[]>(['root']);
  const [currentView, setCurrentView] = useState<SectionName | null>(null);
  const [isAIActive, setIsAIActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getCurrentSection = (): SectionName => currentPath[currentPath.length - 1] || 'root';

  const getCurrentPrompt = (): string => {
    return `${currentPath.join('/')}$`;
  };

  const handleCommand = async (command: string) => {
    const commandLower = command.toLowerCase().trim();
    const [cmd, ...args] = commandLower.split(' ');

    let newOutput: JSX.Element[] = [...output, <OutputLine key={output.length}>{`${getCurrentPrompt()} ${command}`}</OutputLine>];

    if (isAIActive && cmd !== 'ai') {
      newOutput.push(
        <AIOutputLine key={output.length + 1}>
          <UserIcon>
            <FontAwesomeIcon icon={faUser} />
          </UserIcon>
          <AIContent>{command}</AIContent>
        </AIOutputLine>
      );
      try {
        const aiResponse = await getAIResponse(command);
        newOutput.push(
          <AIOutputLine key={output.length + 2}>
            <AIIcon>
              <FontAwesomeIcon icon={faRobot} />
            </AIIcon>
            <AIContent>{aiResponse}</AIContent>
          </AIOutputLine>
        );
      } catch (error) {
        console.error("Error getting AI response:", error);
        newOutput.push(
          <AIOutputLine key={output.length + 2}>
            <AIIcon>
              <FontAwesomeIcon icon={faRobot} />
            </AIIcon>
            <AIContent>Sorry, I encountered an error.</AIContent>
          </AIOutputLine>
        );
      }
      setOutput(newOutput);
      return;
    }

    switch (cmd) {
      case 'help':
        newOutput.push(
          <OutputLine key={output.length + 1}>
            Available commands:
            <br />- ls: List contents of current directory
            <br />- cd [directory]: Change directory
            <br />- pwd: Print working directory
            <br />- cat [file]: View contents of a file
            <br />- clear: Clear the terminal
            <br />- social: View latest social media updates
            <br />- projects: View project showcase
            <br />- ai start: Start AI conversation
            <br />- ai end: End AI conversation
          </OutputLine>
        );
        break;
      case 'ls':
        const currentSection = getCurrentSection();
        const contents = sections[currentSection as keyof typeof sections] || [];
        newOutput.push(
          <OutputLine key={output.length + 1}>
            {contents.join('  ')}
          </OutputLine>
        );
        break;
      case 'cd':
        if (args[0] === '..') {
          if (currentPath.length > 1) {
            setCurrentPath(['root']);
            setCurrentView(null);
          }
        } else if (args[0] && sections.root.includes(args[0])) {
          setCurrentPath(['root', args[0] as SectionName]);
          setCurrentView(args[0] as SectionName);
        } else {
          newOutput.push(<OutputLine key={output.length + 1}>Directory not found</OutputLine>);
        }
        break;
      case 'pwd':
        newOutput.push(<OutputLine key={output.length + 1}>{`/${currentPath.join('/')}`}</OutputLine>);
        break;
      case 'cat':
        if (args[0] && sections[getCurrentSection()].includes(args[0])) {
          setCurrentView(args[0] as SectionName);
        } else {
          newOutput.push(<OutputLine key={output.length + 1}>File not found</OutputLine>);
        }
        break;
      case 'social':
        setCurrentView('social');
        break;
      case 'projects':
        setCurrentView('projects');
        break;
      case 'ai':
        if (args[0] === 'start') {
          setIsAIActive(true);
          newOutput.push(<OutputLine key={output.length + 1}>AI conversation started. Type 'ai end' to finish.</OutputLine>);
        } else if (args[0] === 'end') {
          setIsAIActive(false);
          newOutput.push(<OutputLine key={output.length + 1}>AI conversation ended.</OutputLine>);
        } else {
          newOutput.push(<OutputLine key={output.length + 1}>Invalid AI command. Use 'ai start' or 'ai end'.</OutputLine>);
        }
        break;
      case 'clear':
      case 'cls':
        newOutput = [];
        setCurrentView(null);
        break;
      default:
        newOutput.push(<OutputLine key={output.length + 1}>Command not recognized. Type 'help' for available commands.</OutputLine>);
    }

    setOutput(newOutput);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
    setInput('');
  };

  useEffect(() => {
    const terminalContainer = document.getElementById('terminal-container');
    if (terminalContainer) {
      terminalContainer.scrollTop = terminalContainer.scrollHeight;
    }
  }, [output]);

  useEffect(() => {
    // Focus the input when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleContainerClick = () => {
    // Refocus the input when clicking anywhere in the terminal
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <TerminalContainer id="terminal-container" ref={containerRef} onClick={handleContainerClick} tabIndex={0}>
      
      {output}
      {currentView === 'projects' && <ProjectShowcase />}
      {currentView === 'about' && <About />}
      {currentView === 'experience' && <Experience />}
      {currentView === 'contact' && <Contact />}
      {currentView === 'social' && <SocialFeed />}
      <form onSubmit={handleSubmit}>
        <InputLine>
          <Prompt>{isAIActive ? 'AI>' : getCurrentPrompt()}</Prompt>
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
          />
        </InputLine>
      </form>
    </TerminalContainer>
  );
};