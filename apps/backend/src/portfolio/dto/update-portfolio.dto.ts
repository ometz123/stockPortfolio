import { PartialType } from '@nestjs/mapped-types';
import { CreatePortfolioDto } from './create-portfolio.dto';
import { PortfolioStocksActions } from '@stock-portfolio/shared';

export class UpdatePortfolioDto extends PartialType(CreatePortfolioDto) {}

export class UpdatePortfolioStocksDto {
  action: PortfolioStocksActions;
  stock: string;
}
