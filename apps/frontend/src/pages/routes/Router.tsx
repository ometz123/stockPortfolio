import { lazy, Suspense } from 'react';
import {
  Outlet,
  RouteObject,
  useRoutes,
} from 'react-router-dom';
import { ROUTES } from '../Routes';
import FullscreenLoading from '../../components/shared/FullScreenLoading';
import Layout from './Layout';

const PortfolioScreen = lazy(() => import('../PortfolioPage'));
const StockDetailsScreen = lazy(() => import('../StockDetailPage'));

const NotFoundScreen = lazy(() => import('../NotFound'));

export function AppRoutes() {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <PortfolioScreen />,
        },
        {
          path:ROUTES.STOCK_DETAILS,
          element: <StockDetailsScreen />,
        },
        {
          path: '*',
          element: <NotFoundScreen />,
        },
      ],
    },
  ];
  const element = useRoutes(routes);

  return <Suspense fallback={<FullscreenLoading />}>{element}</Suspense>;
}

