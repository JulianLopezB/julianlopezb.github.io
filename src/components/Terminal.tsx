import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Experience } from './Experience';
import { About } from './About';
import { ProjectShowcase } from './ProjectShowcase';
import { Contact } from './Contact';
import { AIAssistant } from './AIAssistant';
import { SocialFeed } from './SocialFeed';

type SectionName = 'root' | 'about' | 'experience' | 'projects' | 'contact' | 'ai' | 'social';

const TerminalContainer = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.code};
  padding: 1rem;  height: 100%;
  overflow-y: auto;
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
  &:focus {
    outline: none;
  }
`;

const OutputLine = styled.div`
  margin-bottom: 0.5rem;
`;

const sections: Record<SectionName, string[]> = {
  root: ['about', 'experience', 'projects', 'contact', 'ai', 'social'],
  about: [],
  experience: [],
  projects: [],
  contact: [],
  ai: [],
  social: [],
};

export const Terminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<JSX.Element[]>([
    <OutputLine key="welcome">Welcome to Julian's Portfolio Terminal. Type 'help' for available commands.</OutputLine>
  ]);
  const [currentPath, setCurrentPath] = useState<SectionName[]>(['root']);
  const [currentView, setCurrentView] = useState<SectionName | null>(null);

  const getCurrentSection = (): SectionName => currentPath[currentPath.length - 1] || 'root';

  const handleCommand = (command: string) => {
    const commandLower = command.toLowerCase().trim();
    const [cmd, ...args] = commandLower.split(' ');

    if (cmd === 'clear' || cmd === 'cls') {
      setOutput([]);
      setCurrentView(null);
      return;
    }

    let newOutput: JSX.Element[] = [...output, <OutputLine key={output.length}>{`$ ${command}`}</OutputLine>];

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
      case 'clear':
        setOutput([]);
        return;
      case 'social':
        setCurrentView('social');
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

  return (
    <TerminalContainer id="terminal-container">
      {output}
      {currentView === 'about' && <About />}
      {currentView === 'experience' && <Experience />}
      {currentView === 'projects' && <ProjectShowcase />}
      {currentView === 'contact' && <Contact />}
      {currentView === 'ai' && <AIAssistant />}
      {currentView === 'social' && <SocialFeed />}
      <form onSubmit={handleSubmit}>
        <InputLine>
          <Prompt>{`${getCurrentSection()}$`}</Prompt>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
          />
        </InputLine>
      </form>
    </TerminalContainer>
  );
};
