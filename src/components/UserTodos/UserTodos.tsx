import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Checkbox, Paper, Stack, Typography } from '@mui/material';

import { IUserTodo } from 'types';
import { axios } from 'utils';

function UserTodos() {
  const [todos, setTodos] = useState<IUserTodo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { userId } = useParams<string>();

  const getData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get<IUserTodo[]>(`/users/${userId}/todos`);
      setTodos(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, [userId]);

  return (
    <Box sx={{ pt: 4 }}>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Stack spacing={2}>
          {todos.map(({ id, title, completed }: IUserTodo) => (
            <Paper key={id} variant="outlined" sx={{ p: 2 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Checkbox checked={completed} />
                <Typography textTransform="capitalize">{title}</Typography>
              </Stack>
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  );
}

export default UserTodos;
