import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { Box, createTheme, ThemeProvider } from "@mui/material";
import FrontPage from "./pages/FrontPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NavBar from "./components/NavBar";
import Question from "./pages/Question";

function App() {
  const [mode, setMode] = useState("light");
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <NavBar setMode={setMode} mode={mode} />
        <Routes>
          <Route
            path="/"
            element={<FrontPage mode={mode} setMode={setMode} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/question/:id" element={<Question />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;
