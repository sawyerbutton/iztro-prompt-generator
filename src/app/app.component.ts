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
  timeValue: Date | null = null;
  gender: 'male' | 'female' = 'male';
  calendar: 'solar' | 'lunar' = 'solar';
  
  showResult = false;
  chartData: any = null;
  promptText: string | null = null;

  get isFormValid(): boolean {
    return !!(
      this.dateValue && 
      this.timeValue && 
      this.gender && 
      this.calendar
    );
  }

  generateChart() {
    if (!this.isFormValid) {
      return;
    }

    try {
      if (!this.dateValue || !this.timeValue) {
        return;
      }
      
      const dateStr = format(this.dateValue, 'yyyy-MM-dd');
      const timeStr = format(this.timeValue, 'HH:mm');
      const dateTimeStr = `${dateStr} ${timeStr}`;

      // 根据选择的历法调用相应的方法
      const params = {
        date: dateTimeStr,
        gender: this.gender
      };

      if (this.calendar === 'solar') {
        this.chartData = AstroUtils.calculateBySolar(params);
      } else {
        this.chartData = AstroUtils.calculateByLunar(params);
      }

      // 暂时将结果转为字符串显示在提示语区域
      this.promptText = JSON.stringify(this.chartData, null, 2);
      this.showResult = true;

      console.log('生成的星盘数据:', this.chartData);
    } catch (error) {
      console.error('生成星盘时出错:', error);
      // 可以添加错误提示
    }
  }
}
