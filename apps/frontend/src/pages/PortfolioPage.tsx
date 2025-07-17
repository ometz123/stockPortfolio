import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../stores';
import {
  List,
  ListItem,
  IconButton,
  TextField,
  Button,
  CircularProgress,
  Typography,
  Box,
  Stack,
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { ROUTES } from './Routes';
import { PortfolioStocksActions, StockSymbol } from '@stock-portfolio/shared';

const PortfolioPage = observer(() => {
  const { portfolioStore, stockStore } = useStores();
  const [newSymbol, setNewSymbol] = useState('');

  useEffect(() => {
    portfolioStore.fetchPortfolio().then();
  }, []);

  const handleStockClick = (stock: StockSymbol) => {
    stockStore.stock = stock;
  };

  const handlePortfolioUpdate = async (
    symbol: StockSymbol,
    action: PortfolioStocksActions
  ) => {
    try {
      await portfolioStore.updateStockPortfolio(symbol, action);
    } catch (error) {
      console.error('Error updating portfolio:', error);
    }
  };

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
        My Portfolio
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
            await handlePortfolioUpdate(newSymbol, PortfolioStocksActions.ADD);
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
      )
      }
      {portfolioStore.stocks?.length > 0 ? (
        <List>
          {portfolioStore.stocks.map((symbol) => (
            <ListItem
              key={symbol}
              divider
              secondaryAction={
                <IconButton
                  edge="end"
                  onClick={() =>
                    handlePortfolioUpdate(symbol, PortfolioStocksActions.REMOVE)
                  }
                  aria-label={`Remove ${symbol}`}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <Typography
                component={Link}
                to={ROUTES.STOCK_DETAILS}
                onClick={() => handleStockClick(symbol)}
                sx={{
                  textDecoration: 'none',
                  color: 'primary.main',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                {symbol}
              </Typography>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography color="text.secondary">Your portfolio is empty.</Typography>
      )}
    </Box>
  );
});

export default PortfolioPage;
