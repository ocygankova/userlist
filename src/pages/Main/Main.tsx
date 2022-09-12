import { Box, Container, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Main() {
  return (
    <Box pt={14} component="main">
      <Container maxWidth="xl">
        <Typography variant="h5">
          Welcome to my project. Please visit
          <Link component={RouterLink} to="users" sx={{ mx: 2 }}>
            User List Page
          </Link>
          to view the list of users and available actions.
        </Typography>
      </Container>
    </Box>
  );
}

export default Main;
