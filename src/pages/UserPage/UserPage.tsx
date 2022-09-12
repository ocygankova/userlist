import { Avatar, Box, Container, Paper, Stack, Tab, Tabs, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Outlet, useParams, Link as RouterLink, useLocation } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';

import { IUser } from 'types';
import { axios } from 'utils';

function UserPage() {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [tabValue, setTabValue] = useState<string>('albums');

  const { userId } = useParams<string>();
  const { pathname } = useLocation();
  const endpoint: string | undefined = pathname.split('/')[3];

  const getUser = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get<IUser>(`/users/${userId}`);
      setUser(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUser();
  }, [userId]);

  useEffect(() => {
    if (endpoint) setTabValue(endpoint);
  }, [endpoint]);

  const renderUser = () => {
    return user ? (
      <Paper variant="outlined" sx={{ p: 4 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar>
            <PersonIcon />
          </Avatar>
          <Typography variant="h6">{user.name}</Typography>
        </Stack>

        <Box sx={{ py: 4 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue}>
              <Tab label="Albums" value="albums" to="albums" component={RouterLink} />
              <Tab label="Todos" value="todos" to="todos" component={RouterLink} />
              <Tab label="Posts" value="posts" to="posts" component={RouterLink} />
            </Tabs>
          </Box>

          <Outlet />
        </Box>
      </Paper>
    ) : (
      <Typography>No user found</Typography>
    );
  };

  return (
    <Box pt={14} component="main">
      <Container maxWidth="xl">
        {loading ? <Typography>Loading...</Typography> : renderUser()}
      </Container>
    </Box>
  );
}

export default UserPage;
