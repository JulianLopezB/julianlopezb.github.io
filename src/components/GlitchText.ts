import styled from 'styled-components';

const GlitchText = styled.span`
  position: relative;
  
  &::before,
  &::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &::before {
    left: 2px;
    text-shadow: -2px 0 ${({ theme }) => theme.colors.accent2};
    clip: rect(24px, 550px, 90px, 0);
    animation: glitch-anim-2 3s infinite linear alternate-reverse;
  }

  &::after {
    left: -2px;
    text-shadow: -2px 0 ${({ theme }) => theme.colors.accent3};
    clip: rect(85px, 550px, 140px, 0);
    animation: glitch-anim 2.5s infinite linear alternate-reverse;
  }

  @keyframes glitch-anim {
    0% {
      clip: rect(17px, 9999px, 94px, 0);
    }
    20% {
      clip: rect(33px, 9999px, 39px, 0);
    }
    40% {
      clip: rect(92px, 9999px, 43px, 0);
    }
    60% {
      clip: rect(6px, 9999px, 3px, 0);
    }
    80% {
      clip: rect(66px, 9999px, 90px, 0);
    }
    100% {
      clip: rect(43px, 9999px, 78px, 0);
    }
  }

  @keyframes glitch-anim-2 {
    0% {
      clip: rect(57px, 9999px, 93px, 0);
    }
    20% {
      clip: rect(4px, 9999px, 51px, 0);
    }
    40% {
      clip: rect(22px, 9999px, 21px, 0);
    }
    60% {
      clip: rect(35px, 9999px, 99px, 0);
    }
    80% {
      clip: rect(31px, 9999px, 73px, 0);
    }
    100% {
      clip: rect(90px, 9999px, 32px, 0);
    }
  }
`;

export default GlitchText;