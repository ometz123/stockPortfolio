import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto, UpdatePortfolioStocksDto } from './dto/update-portfolio.dto';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post()
  create(@Body() createPortfolioDto: CreatePortfolioDto) {
    return this.portfolioService.create(createPortfolioDto);
  }

  @Get()
  findAll() {
    return this.portfolioService.findAll();
  }

  @Get(':userName')
  findOne(@Param('userName') userName: string) {
    return this.portfolioService.findOne(userName);
  }

  @Put(':id')
  update(
    @Param('id') userName: string,
    @Body() updatePortfolioDto: UpdatePortfolioDto
  ) {
    return this.portfolioService.update(userName, updatePortfolioDto);
  }

  @Patch('stocks/:userName')
  updateStocks(
    @Param('userName') userName: string,
    @Body() updatePortfolioStocksDto: UpdatePortfolioStocksDto
  ) {
    return this.portfolioService.updateStock(userName, updatePortfolioStocksDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.portfolioService.remove(+id);
  }
}
