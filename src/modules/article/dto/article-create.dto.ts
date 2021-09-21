import { IsNotEmpty } from 'class-validator';

export class ArticleCreateDTO {
  /**
   * 文章标题
   * @example 美丽的大海
   */
  @IsNotEmpty({ message: '请输入文章标题' })
  readonly title: string;

  /**
   * 文章描述
   * @example 给你讲述美丽的大海
   */
  @IsNotEmpty({ message: '请输入文章描述' })
  readonly description: string;

  /**
   * 文章内容
   * @example 美丽的大海，你是如此美丽
   */
  @IsNotEmpty({ message: '请输入文章内容' })
  readonly content: string;
}
