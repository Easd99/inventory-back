import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { getDataSourceByName, addTransactionalDataSource } from 'typeorm-transactional';
import { AppDataSource } from './config/data-source';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  }),
  TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: async () => ({
      ...AppDataSource.options,
    }),
    async dataSourceFactory(option) {
      if (!option) throw new Error('invalid options passed');

      const existingDataSource = getDataSourceByName('default');
      if (existingDataSource) {
        return existingDataSource;
      }

      return addTransactionalDataSource(new DataSource(option));
    },
  }),
    UsersModule, AuthModule, CategoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
