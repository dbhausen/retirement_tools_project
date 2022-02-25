import { createTheme } from "@mui/material/styles";
//import { createTheme, ThemeProvider } from "@mui/system";

import { blue, purple } from "@mui/material/colors";

export default createTheme({
  palette: {
    primary: {
      main: purple[800],
    },
    secondary: {
      main: blue[600],
    },
  },
});
