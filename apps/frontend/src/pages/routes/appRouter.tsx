import { BrowserRouter, useRoutes } from 'react-router-dom';
import { AppRoutes } from './Router';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
export default AppRouter
