import { ThemeProvider } from "styled-components";

import { theme } from "../../constants";
import { GlobalStyle } from "../GlobalStyle";

export const LayoutProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};
