import * as crypto from 'crypto';

/**
 * 计算分页
 * @param total
 * @param pageSize
 * @param page
 * @returns
 */
export const getPagination = (
  total: number,
  pageSize: number,
  page: number,
) => {
  const pages = Math.ceil(total / pageSize);
  return {
    total,
    page,
    pageSize,
    pages,
  };
};

// 非 0 正整数
export const regPositive = /^[1-9]\d*$/;

// 中国 11 位手机号格式
export const regMobileCN = /^1\d{10}$/;

// 随机盐
export function makeSalt(): string {
  return crypto.randomBytes(3).toString('base64');
}

/**
 * 使用盐加密明文密码
 * @param password 密码
 * @param salt 密码盐
 */
export function encryptPassword(password: string, salt: string): string {
  if (!password || !salt) {
    return '';
  }
  const tempSalt = Buffer.from(salt, 'base64');
  return (
    // 10000 代表迭代次数 16代表长度
    crypto.pbkdf2Sync(password, tempSalt, 10000, 16, 'sha1').toString('base64')
  );
}
