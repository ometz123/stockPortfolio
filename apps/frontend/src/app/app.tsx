import { Suspense } from 'react';
import AppRouter from '../pages/routes/appRouter';
import FullscreenLoading from '../components/shared/FullScreenLoading';
import { Box } from '@mui/material';

export function App() {
  return (
    <Box height="100vh" width="100vw" overflow="hidden">
      <Suspense fallback={<FullscreenLoading />}>
        <AppRouter />
      </Suspense>
    </Box>
  );
}

export default App;
