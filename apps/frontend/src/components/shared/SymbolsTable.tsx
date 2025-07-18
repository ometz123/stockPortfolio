import React, { useState } from 'react';
import { useStores } from '../../stores';
import {
  Box,
  IconButton,
  List,
  ListItem,
  Pagination,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { PortfolioStocksActions, StockSymbol } from '@stock-portfolio/shared';
import { ROUTES } from '../../pages/Routes';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

const PAGE_SIZE = 5;

const SymbolsTable = observer(() => {
  const { portfolioStore, stockStore } = useStores();

  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(portfolioStore.stocks.length / PAGE_SIZE);

  const handleStockClick = (stock: StockSymbol) => {
    stockStore.stock = stock;
  };

  const handleRemoveSymbol = async (symbol: StockSymbol) => {
    await portfolioStore.updateStockPortfolio(
      symbol,
      PortfolioStocksActions.REMOVE
    );
    if (page > 1 && (portfolioStore.stocks.length - 1) % PAGE_SIZE === 0) {
      setPage(page - 1);
    }
  };
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const paginatedStocks = portfolioStore.stocks.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  if (portfolioStore.stocks.length < 1) {
    return (
      <Typography color="text.secondary">Your portfolio is empty.</Typography>
    );
  }

  return (
    <Box>
      <List>
        {paginatedStocks.map((symbol) => (
          <ListItem
            key={symbol}
            divider
            secondaryAction={
              <IconButton
                edge="end"
                onClick={() => handleRemoveSymbol(symbol)}
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

      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
          />
        </Box>
      )}

    </Box>
  );
});

export default SymbolsTable;
