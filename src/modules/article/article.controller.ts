import {
  Controller,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Param,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleCreateDTO, ArticleEditDTO, IdDTO, ListDTO } from './dto';

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get('list')
  async getMore(@Query() listDTO: ListDTO) {
    return this.articleService.getMore(listDTO);
  }

  @Get('detail')
  async getOne(@Query() params: IdDTO) {
    return this.articleService.getOne(params);
  }

  @Post()
  async create(@Body() body: ArticleCreateDTO) {
    return this.articleService.create(body);
  }

  @Put()
  async update(@Body() body: ArticleEditDTO) {
    return this.articleService.update(body);
  }

  @Delete()
  async delete(@Body() id: IdDTO) {
    return this.articleService.delete(id);
  }
}
