import { createGlobalStyle, ThemeProvider } from "styled-components";

import { theme } from "./theme";

const ResetStyles = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: 'Poppins', sans-serif;
    background-color:  ${(props) => props.theme.colors.offWhite};
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`;

export const LayoutProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <ThemeProvider theme={theme}>
      <ResetStyles />
      {children}
    </ThemeProvider>
  );
};
