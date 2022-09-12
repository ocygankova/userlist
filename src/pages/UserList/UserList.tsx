import { useState, useEffect } from 'react';
import { Avatar, Box, Container, Paper, Stack, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';

import { IUser } from 'types';
import { axios } from 'utils';

function UserList() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const getUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get<IUser[]>('/users');
      setUsers(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleClick = (id: number) => () => {
    navigate(id.toString());
  };

  return (
    <Box pt={14} component="main">
      <Container maxWidth="xl">
        <Typography variant="h5" mb={4}>
          Select user from the list below to visit their personal page:
        </Typography>

        <Stack spacing={4}>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : (
            users.map(({ id, name, username }: IUser) => (
              <Paper
                variant="outlined"
                sx={{ p: 2, display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                key={id}
                onClick={handleClick(id)}>
                <Avatar>
                  <PersonIcon />
                </Avatar>
                <Typography variant="h6" sx={{ ml: 2 }}>
                  name: {name}, username: {username}
                </Typography>
              </Paper>
            ))
          )}
        </Stack>
      </Container>
    </Box>
  );
}

export default UserList;
