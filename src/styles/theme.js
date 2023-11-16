import { createTheme } from "@mui/material/styles";
const theme = createTheme({
  components: {
 
    MuiButton: {
      styleOverrides: {
        root: {
          "&:disabled": {
            backgroundColor: "#2e2d2d",
            color: "#fff",
          },
        },
      },
    },
  },
});
export default theme;
