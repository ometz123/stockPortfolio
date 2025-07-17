import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../stores';
import { CircularProgress, Typography } from '@mui/material';
import StockCard from '../components/StockCard';
import SearchStock from '../components/SearchStock';

const StockDetailPage = observer(() => {
  const { stockStore } = useStores();
  const { stock } = stockStore;

  useEffect(() => {
    if (stock) stockStore.fetchStockDetail(stock);
  }, [stock]);

  if (stockStore.loading) return <CircularProgress />;
  if (stockStore.error)
    return <Typography color="error">{stockStore.error}</Typography>;

  return (
    <>
      <SearchStock />
      <StockCard />
    </>
  );
});

export default StockDetailPage;
