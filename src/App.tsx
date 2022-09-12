import { CssBaseline } from '@mui/material';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import { Main, Page404, UserList, UserPage } from 'pages';
import { Navbar, UserAlbums, UserPosts, UserTodos } from 'components';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="users" element={<UserList />} />
        <Route path="users/:userId" element={<UserPage />}>
          <Route path="albums" element={<UserAlbums />} />
          <Route path="todos" element={<UserTodos />} />
          <Route path="posts" element={<UserPosts />} />
          <Route path="" element={<Navigate to="albums" />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
}

export default App;
