import { IsNotEmpty, IsOptional } from 'class-validator';
import { IdDTO } from './id.dto';

export class ArticleEditDTO extends IdDTO {
  /**
   * 文章标题
   * @example 美丽的大海
   */
  @IsOptional()
  @IsNotEmpty({ message: '请输入文章标题' })
  readonly title?: string;

  /**
   * 文章描述
   * @example 给你讲述美丽的大海
   */
  @IsOptional()
  @IsNotEmpty({ message: '请输入文章描述' })
  readonly description?: string;

  /**
   * 文章内容
   * @example 美丽的大海，你是如此美丽
   */
  @IsOptional()
  @IsNotEmpty({ message: '请输入文章内容' })
  readonly content?: string;
}
