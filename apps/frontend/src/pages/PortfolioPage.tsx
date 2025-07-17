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
    portfolioStore.fetchPortfolio();
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

  if (portfolioStore.loading) return <CircularProgress />;

  if (portfolioStore.error) {
    return (
      <Box display="flex" alignItems="center" color="error.main" m={2}>
        <ErrorOutlineIcon sx={{ mr: 1 }} />
        <Typography>{portfolioStore.error}</Typography>
      </Box>
    );
  }

  return (
    <div style={{ padding: 16 }}>
      <Typography variant="h4">My Portfolio</Typography>
      <div style={{ margin: '16px 0' }}>
        <TextField
          label="Add Symbol"
          value={newSymbol}
          onChange={(e) => setNewSymbol(e.target.value.toUpperCase())}
        />
        <Button
          onClick={async () => {
            await handlePortfolioUpdate(newSymbol, PortfolioStocksActions.ADD);
            setNewSymbol('');
          }}
        >
          Add
        </Button>
      </div>
      <List>
        {portfolioStore.stocks?.map((s) => (
          <ListItem
            key={s}
            secondaryAction={
              <IconButton
                edge="end"
                onClick={() =>
                  handlePortfolioUpdate(s, PortfolioStocksActions.REMOVE)
                }
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <Link
              onClick={() => handleStockClick(s)}
              to={`${ROUTES.STOCK_DETAILS}`}
            >
              {s}
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );
});

export default PortfolioPage;
