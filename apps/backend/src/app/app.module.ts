import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PortfolioModule } from '../portfolio/portfolio.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.DATABASE_URL,
      }),
    }),
    PortfolioModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
