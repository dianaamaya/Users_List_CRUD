import { createGlobalStyle} from "styled-components"

export const GlobalStyles = createGlobalStyle`
   body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-size: 18px;
  }

  h1 {
    font-size: 1.6em;
    font-weight: 800;
  }

  h2 {
    font-size: 1.5em;
    font-weight: 800;
  }


  a {
    text-decoration: none
  }
  
  
  `