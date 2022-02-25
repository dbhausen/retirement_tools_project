import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.css";
import AApp from "./App";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./MyTheme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AApp />
    </ThemeProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
