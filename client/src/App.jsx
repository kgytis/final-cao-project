import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { Box, createTheme, ThemeProvider } from "@mui/material";
import FrontPage from "./pages/FrontPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Question from "./pages/Question";
import Footer from "./components/Footer";

function App() {
  const [mode, setMode] = useState("light");
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        bgcolor={"background.default"}
        color={"text.primary"}
        minHeight="100vh"
        display="flex"
        justifyContent="space-between"
        flexDirection="column"
      >
        <Routes>
          <Route
            path="/"
            element={<FrontPage mode={mode} setMode={setMode} />}
          />
          <Route
            path="/login"
            element={<Login mode={mode} setMode={setMode} />}
          />
          <Route
            path="/register"
            element={<Register mode={mode} setMode={setMode} />}
          />
          <Route
            path="/question/:id"
            element={<Question mode={mode} setMode={setMode} />}
          />
        </Routes>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
