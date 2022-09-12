import { AppBar, Box, Toolbar, Link, Container } from '@mui/material';
import { NavLink as RouterNavLink } from 'react-router-dom';

function Navbar() {
  return (
    <Box>
      <AppBar component="nav">
        <Container maxWidth="xl">
          <Toolbar>
            <Link
              component={RouterNavLink}
              to="/"
              underline="none"
              sx={{ color: 'primary.contrastText', textTransform: 'uppercase', mx: 4 }}>
              Main
            </Link>
            <Link
              component={RouterNavLink}
              to="users"
              underline="none"
              sx={{ color: 'primary.contrastText', textTransform: 'uppercase', mx: 4 }}>
              User List
            </Link>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default Navbar;
