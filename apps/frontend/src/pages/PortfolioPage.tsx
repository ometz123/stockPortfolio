import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../stores';
import {
  TextField,
  Button,
  CircularProgress,
  Typography,
  Box,
  Stack,
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { PortfolioStocksActions, StockSymbol } from '@stock-portfolio/shared';
import SymbolsTable from '../components/shared/SymbolsTable';

const PortfolioPage = observer(() => {
  const [newSymbol, setNewSymbol] = useState('');

  const { portfolioStore, stockStore } = useStores();

  const handleAddSymbol = async (symbol: StockSymbol) => {
    await portfolioStore.updateStockPortfolio(
      symbol,
      PortfolioStocksActions.ADD
    );
  };

  useEffect(() => {
    portfolioStore.fetchPortfolio().then();
  }, []);

  if (portfolioStore.loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (portfolioStore.error) {
    return (
      <Box display="flex" alignItems="center" color="error.main" mt={4} px={2}>
        <ErrorOutlineIcon sx={{ mr: 1 }} />
        <Typography>{portfolioStore.error}</Typography>
      </Box>
    );
  }

  return (
    <Box maxWidth="600px" mx="auto" px={2} py={4}>
      <Typography variant="h4" gutterBottom>
        {portfolioStore.userName} Portfolio
      </Typography>

      <Stack direction="row" spacing={2} mb={3} alignItems="center">
        <TextField
          fullWidth
          label="Stock Symbol"
          value={newSymbol}
          onChange={(e) => setNewSymbol(e.target.value.toUpperCase())}
          size="small"
        />
        <Button
          variant="contained"
          onClick={async () => {
            if (!newSymbol.trim()) return;
            await handleAddSymbol(newSymbol);
            setNewSymbol('');
          }}
        >
          Add
        </Button>
      </Stack>

      {portfolioStore.stockError && (
        <Box display="flex" alignItems="center" color="error.main">
          <ErrorOutlineIcon sx={{ mr: 1 }} />
          <Typography>{portfolioStore.stockError}</Typography>
        </Box>
      )}

      <SymbolsTable />
    </Box>
  );
});

export default PortfolioPage;
