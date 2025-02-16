import { astro } from 'iztro';

export interface SolarAstroParams {
  solarDateStr: string;  // 阳历日期，格式：'YYYY-M-D'
  timeIndex: number;     // 时辰序号 0-12
  gender: '男' | '女';
  fixLeap?: boolean;     // 是否调整闰月
}

export interface LunarAstroParams {
  lunarDateStr: string;  // 农历日期，格式：'YYYY-M-D'
  timeIndex: number;     // 时辰序号 0-12
  gender: '男' | '女';
  fixLeap?: boolean;     // 是否调整闰月
}

export class AstroUtils {
  static calculateBySolar(params: SolarAstroParams) {
    try {
      const { solarDateStr, timeIndex, gender, fixLeap = true } = params;
      return astro.bySolar(solarDateStr, timeIndex, gender, fixLeap);
    } catch (error) {
      console.error('计算阳历星盘信息时出错:', error);
      throw error;
    }
  }

  static calculateByLunar(params: LunarAstroParams) {
    try {
      const { lunarDateStr, timeIndex, gender, fixLeap = true } = params;
      return astro.byLunar(lunarDateStr, timeIndex, gender, false, fixLeap);
    } catch (error) {
      console.error('计算农历星盘信息时出错:', error);
      throw error;
    }
  }
} 