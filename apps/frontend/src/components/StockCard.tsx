import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useStores } from '../stores';
import { observer } from 'mobx-react-lite';

const StockCard = observer(() => {
  const { stockStore } = useStores();

  if (!stockStore.details) {
    return (
      <Card style={{ maxWidth: 400, margin: 'auto', marginTop: 32 }}>
        <CardContent>
          <Typography variant="body1">
            Search a stock to get its details
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const { name, price, change, changesPercentage, symbol } = stockStore.details;
  return (
    <Card style={{ maxWidth: 400, margin: 'auto', marginTop: 32 }}>
      <CardContent>
        <Typography variant="h5">
          {name} ({symbol})
        </Typography>
        <Typography color="textDisabled" variant="h6">
          ${price.toFixed(2)}
        </Typography>
        <Typography color={change >= 0 ? 'success' : 'red'}>
          Change: {change.toFixed(2)}$ ({changesPercentage.toFixed(2)}%)
        </Typography>
      </CardContent>
    </Card>
  );
});

export default StockCard;
