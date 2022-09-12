import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Paper, Stack, Typography } from '@mui/material';

import { IUserAlbum } from 'types';
import { axios } from 'utils';

function UserAlbums() {
  const [albums, setAlbums] = useState<IUserAlbum[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { userId } = useParams<string>();

  const getData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get<IUserAlbum[]>(`/users/${userId}/albums`);
      setAlbums(data);
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
          {albums.map(({ id, title }: IUserAlbum) => (
            <Paper key={id} variant="outlined" sx={{ p: 2 }}>
              <Typography textTransform="capitalize">
                {id}. {title}
              </Typography>
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  );
}

export default UserAlbums;
