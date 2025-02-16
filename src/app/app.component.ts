import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { AstroUtils } from './utils/astro.utils';
import { format } from 'date-fns';
import { CommonModule } from '@angular/common';
import { PromptTextComponent } from './components/prompt-text/prompt-text.component';
import { AstroChartComponent } from './components/astro-chart/astro-chart.component';
import { SolarAstroParams, LunarAstroParams } from './utils/astro.utils';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NzFormModule,
    NzDatePickerModule,
    NzTimePickerModule,
    NzSelectModule,
    NzRadioModule,
    NzButtonModule,
    NzTabsModule,
    NzEmptyModule,
    NzInputModule,
    FormsModule,
    CommonModule,
    PromptTextComponent,
    AstroChartComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'iztro-prompt-generator';
  dateValue: Date | null = null;
  timeIndex: number | null = null;
  gender: '男' | '女' = '男';
  calendar: 'solar' | 'lunar' = 'solar';
  fixLeap: boolean = true;
  
  showResult = false;
  chartData: any = null;
  promptText: string | null = null;

  // 时辰选项
  timeOptions = [
    { label: '早子时 (23:00-01:00)', value: 0 },
    { label: '丑时 (01:00-03:00)', value: 1 },
    { label: '寅时 (03:00-05:00)', value: 2 },
    { label: '卯时 (05:00-07:00)', value: 3 },
    { label: '辰时 (07:00-09:00)', value: 4 },
    { label: '巳时 (09:00-11:00)', value: 5 },
    { label: '午时 (11:00-13:00)', value: 6 },
    { label: '未时 (13:00-15:00)', value: 7 },
    { label: '申时 (15:00-17:00)', value: 8 },
    { label: '酉时 (17:00-19:00)', value: 9 },
    { label: '戌时 (19:00-21:00)', value: 10 },
    { label: '亥时 (21:00-23:00)', value: 11 },
    { label: '晚子时 (23:00-01:00)', value: 12 }
  ];

  get isFormValid(): boolean {
    return !!(
      this.dateValue && 
      this.timeIndex !== null && 
      this.gender && 
      this.calendar
    );
  }

  generateChart() {
    if (!this.isFormValid) {
      return;
    }

    try {
      if (!this.dateValue || this.timeIndex === null) {
        return;
      }
      
      const dateStr = format(this.dateValue, 'yyyy-M-d');

      if (this.calendar === 'solar') {
        const solarParams: SolarAstroParams = {
          solarDateStr: dateStr,
          timeIndex: this.timeIndex,
          gender: this.gender,
          fixLeap: this.fixLeap
        };
        this.chartData = AstroUtils.calculateBySolar(solarParams);
      } else {
        const lunarParams: LunarAstroParams = {
          lunarDateStr: dateStr,
          timeIndex: this.timeIndex,
          gender: this.gender,
          fixLeap: this.fixLeap
        };
        this.chartData = AstroUtils.calculateByLunar(lunarParams);
      }

      console.log('生成的星盘数据:', {
        基本信息: {
          性别: this.chartData.gender,
          阳历日期: this.chartData.solarDate,
          农历日期: this.chartData.lunarDate,
          八字: this.chartData.chineseDate,
          时辰: this.chartData.time,
          时间范围: this.chartData.timeRange,
          星座: this.chartData.sign,
          生肖: this.chartData.zodiac
        },
        命盘信息: {
          身宫地支: this.chartData.earthlyBranchOfBodyPalace,
          命宫地支: this.chartData.earthlyBranchOfSoulPalace,
          命主星: this.chartData.soul,
          身主星: this.chartData.body,
          五行局: this.chartData.fiveElementsClass
        }
      });
    } catch (error) {
      console.error('生成星盘时出错:', error);
    }
  }
}
