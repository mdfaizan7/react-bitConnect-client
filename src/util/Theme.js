const MuiTheme = {
  palette: {
    common: { black: "#000", white: "#fff" },
    background: { paper: "#fff", default: "#fafafa" },
    primary: {
      light: "rgba(110, 193, 237, 0.66)",
      main: "rgba(110, 193, 237, 1)",
      dark: "rgba(71, 157, 202, 1)",
      contrastText: "#fff"
    },
    secondary: {
      light: "rgba(92, 240, 117, 0.7)",
      main: "rgba(92, 240, 117, 1)",
      dark: "rgba(54, 175, 74, 1)",
      contrastText: "#fff"
    },
    error: {
      light: "#e57373",
      main: "rgba(233, 75, 64, 1)",
      dark: "#d32f2f",
      contrastText: "#fff"
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)"
    }
  },
  form: {
    textAlign: "center "
  },
  appLogo: {
    maxWidth: 300,
    margin: "1px auto 15px auto"
  },
  pageTitle: {
    margin: "10px auto 10px auto"
  },
  textField: {
    margin: "10px auto 10px auto"
  },
  button: {
    marginTop: 20,
    position: "relative"
  },
  customError: {
    fontSize: "0.8rem",
    fontWeight: 600,
    margin: 10
  },
  progress: {
    position: "absolute"
  }
};

export default MuiTheme;
