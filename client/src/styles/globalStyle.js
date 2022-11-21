import { createGlobalStyle } from "styled-components";

// DOCUMENTATION: https://styled-components.com/docs/api#createglobalstyle
// IMPORTANT: Normal styled-components are automatically scoped to a local CSS class & isolated from other components.  "createGlobalStyle" removes this restriction & creates a GLOBAL styled component
const GlobalStyle = createGlobalStyle`  
  body {
    font-family: 'Barlow', sans-serif;
    box-sizing: border-box;

    /* GLOBAL THEME */
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: 
      background 0.2s ease-in, color 0.2s ease-in,
      color 0.2s ease-in, color 0.2s ease-in,
      border 0.2s ease-in, color 0.2s ease-in;
  }

  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .appContent {
    margin-top: 1rem;
    margin-bottom: 1rem;
    flex: 1;
  }
`;

export default GlobalStyle;