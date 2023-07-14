import { ThemeProvider } from "styled-components";
import { userTheme } from "./userTheme"
import { GlobalStyles } from "./GlobalStyles"

interface IChildren {
    children: React.ReactNode
  }

const Theme = ({ children }: IChildren) => (
    <ThemeProvider theme={userTheme}>
        <GlobalStyles />
        {children}
    </ThemeProvider>
);

export default Theme;