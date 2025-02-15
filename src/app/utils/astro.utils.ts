import { astro } from 'iztro';

export interface AstroParams {
  date: string;      // 日期，格式：'YYYY-MM-DD HH:mm'
  gender: 'male' | 'female';
}

export class AstroUtils {
  static calculateBySolar(params: AstroParams) {
    try {
      const { date, gender } = params;
      // 默认使用东八区
      const timezone = 8;
      return astro.bySolar(date, timezone, gender);
    } catch (error) {
      console.error('计算阳历星盘信息时出错:', error);
      throw error;
    }
  }

  static calculateByLunar(params: AstroParams) {
    try {
      const { date, gender } = params;
      // 默认使用东八区
      const timezone = 8;
      return astro.byLunar(date, timezone, gender);
    } catch (error) {
      console.error('计算农历星盘信息时出错:', error);
      throw error;
    }
  }
} 