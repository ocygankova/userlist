import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Paper, Stack, Typography } from '@mui/material';

import { IUserPost } from 'types';
import { axios } from 'utils';

function UserPosts() {
  const [posts, setPosts] = useState<IUserPost[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { userId } = useParams<string>();

  const getData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get<IUserPost[]>(`/users/${userId}/posts`);
      setPosts(data);
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
          {posts.map(({ id, title, body }: IUserPost) => (
            <Paper key={id} variant="outlined" sx={{ p: 2 }}>
              <Typography variant="h6" textTransform="capitalize">
                {title}
              </Typography>
              <Typography>{body}</Typography>
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  );
}

export default UserPosts;
