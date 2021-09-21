import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './modules/article/article.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1qaz2wsx',
      database: 'test',
      entities: ['dist/modules/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ArticleModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
