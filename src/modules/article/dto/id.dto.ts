import { IsNotEmpty, Matches } from 'class-validator';
import { regPositive } from 'src/utils';

export class IdDTO {
  /**
   * 文章 id
   * @example 1
   */
  @Matches(regPositive, { message: '请输入有效 id' })
  @IsNotEmpty({ message: 'id 不能为空' })
  readonly id: number;
}
