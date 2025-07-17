import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
} from '@mui/material';
import { useStores } from '../stores';

const SearchStock: React.FC = observer(() => {
  const { stockStore } = useStores();
  const [symbol, setSymbol] = React.useState('');
  const { stock } = stockStore;

  const handleFetch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (symbol.trim()) {
      await stockStore.fetchStockDetail(symbol);
    }
  };
  useEffect(() => {
    if (stock) setSymbol(stock);
  }, [stock]);

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 6 }}>
      <Typography variant="h6" align="center" gutterBottom>
        Select a stock to view details
      </Typography>

      <Box
        component="form"
        onSubmit={handleFetch}
        sx={{
          display: 'flex',
          gap: 2,
          justifyContent: 'center',
          mt: 2,
        }}
      >
        <TextField
          label="Stock Symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          size="small"
        />
        <Button
          type="submit"
          variant="contained"
          disabled={stockStore.searchLoading || symbol.trim() === ''}
        >
          {stockStore.searchLoading ? <CircularProgress size={20} /> : 'Search'}
        </Button>
      </Box>

      {stockStore.searchError && (
        <Typography color="error" align="center" sx={{ mt: 2 }}>
          {stockStore.searchError}
        </Typography>
      )}
    </Paper>
  );
});

export default SearchStock;
