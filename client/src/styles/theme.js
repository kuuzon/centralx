import { createGlobalStyle } from "styled-components";

// DOCUMENTATION:
// IMPORTANT: Normal styled-components are automatically scoped to a local CSS class & isolated from other components.  "createGlobalStyle" removes this restriction!
export const GlobalStyle = createGlobalStyle`  
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: 
      background 0.2s ease-in, color 0.2s ease-in;
  }

  .navbar {
    background: ${({ theme }) => theme.header};
    transition: background 0.2s ease-in, color 0.2s ease-in;
  }

  .navbar-brand, .nav-link {
    color: ${({ theme }) => theme.text} !important;
    transition: background 0.2s ease-in, color 0.2s ease-in;
  }
`;

export const lightTheme = {
  body: 'var(--primary)',
  text: 'var(--complementary)',
  header: 'var(--primary)',
  footer: 'var(--highlight-light)',
};
export const darkTheme = {
  body: 'var(--complementary)',
  text: 'var(--primary)',
  header: 'var(--complementary-light)',
  footer: 'var(--complementary-light)',
};