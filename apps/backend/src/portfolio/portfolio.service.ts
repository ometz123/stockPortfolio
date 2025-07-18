import {
  BadRequestException,
  Injectable,
  MethodNotAllowedException,
  NotFoundException
} from '@nestjs/common';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import {
  UpdatePortfolioDto,
  UpdatePortfolioStocksDto,
} from './dto/update-portfolio.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Portfolio } from '../schemas/portfolio.schema';
import mongoose, { Model } from 'mongoose';
import { PortfolioStocksActions } from '@stock-portfolio/shared';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectModel(Portfolio.name) private portfolioModel: Model<Portfolio>
  ) {}

  create(createPortfolioDto: CreatePortfolioDto) {
    const created = new this.portfolioModel(createPortfolioDto);
    return created.save();
  }

  findAll() {
    return `This action returns all portfolio`;
  }

  async findOne(userName: string) {
    const userPortfolio = await this.portfolioModel.findOne({
      userName,
    });

    if (!userPortfolio) {
      const newUserPortfolio = await this.portfolioModel.create({
        userName,
        stocks: ['AAPL', 'GOOGL', 'MSFT'], // Example stocks
      });

      return newUserPortfolio.save();
    }

    return userPortfolio;
  }

  async update(userName: string, updatePortfolioDto: UpdatePortfolioDto) {
    const updatedPortfolio = await this.portfolioModel.findOneAndUpdate(
      { userName },
      updatePortfolioDto,
      { new: true }
    );

    if (!updatedPortfolio) {
      throw new NotFoundException(`Portfolio for user ${userName} not found`);
    }

    return updatedPortfolio.stocks;
  }

  async updateStock(userName: string, updateStock: UpdatePortfolioStocksDto) {
    const portfolio = await this.portfolioModel.findOne({ userName });
    if (!portfolio) {
      throw new NotFoundException(`Portfolio for user ${userName} not found`);
    }

    if (updateStock.action === PortfolioStocksActions.ADD) {
      if (portfolio.stocks.includes(updateStock.stock)) {
        throw new MethodNotAllowedException(
          `Stock ${updateStock.stock} already exists in portfolio`
        );
      }
      portfolio.stocks.push(updateStock.stock);

    } else if (updateStock.action === PortfolioStocksActions.REMOVE) {
      if (!portfolio.stocks.includes(updateStock.stock)) {
        throw new MethodNotAllowedException(
          `Stock ${updateStock.stock} does not exist in portfolio`
        );
      }
      portfolio.stocks = portfolio.stocks.filter(
        (stock) => stock !== updateStock.stock
      );

    } else {
      throw new MethodNotAllowedException('Invalid action');
    }

    try {
      await portfolio.save();
      return portfolio.stocks;

    } catch (err) {
      if (err instanceof mongoose.Error.ValidationError) {
        const messages = Object.values(err.errors).map((e: any) => e.message);
        throw new BadRequestException(messages.join('; '));
      }
      throw err;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} portfolio`;
  }
}
