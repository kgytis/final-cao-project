import { Box, Typography } from "@mui/material";
import { GitHub } from "@mui/icons-material";
const Footer = () => {
  return (
    <Box display="flex" justifyContent="center" height="90px" width="100%">
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Typography variant="h6" textAlign="center">
          Minimalistic Forum
        </Typography>
        <Typography variant="p" textAlign="center">
          Copyright &copy; kGytis, 2022
        </Typography>
        <Box display="flex" justifyContent="center">
          <a
            href="http://https://github.com/kgytis"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
              color: "gray",
            }}
          >
            <GitHub fontSize="large" />
          </a>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
