import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-astro-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="astro-chart">
      <div class="chart-grid">
        <!-- 上方宫位 -->
        <div class="palace" *ngFor="let i of [3,4,5,6]">
          <div class="palace-content">
            <div class="palace-header">
              <div class="palace-name">{{getPalaceName(i)}}</div>
              <div class="palace-age">{{getPalaceAge(i)}}</div>
            </div>
            <div class="star-section">
              <ng-container *ngFor="let star of getMajorStars(i)">
                <span class="star" [class]="star.mutagen">
                  {{star.name}}
                </span>
              </ng-container>
            </div>
            <div class="minor-star-section">
              <span *ngFor="let star of getMinorStars(i)" class="minor-star">
                {{star.name}}
              </span>
            </div>
          </div>
        </div>

        <!-- 中间行 -->
        <div class="palace side-palace" *ngFor="let i of [2,7]">
          <div class="palace-content">
            <!-- 与上方宫位相同的结构 -->
          </div>
        </div>
        <div class="center-palace">
          <div class="birth-info">
            <div>{{astroData?.solarDate}}</div>
            <div>{{astroData?.lunarDate}}</div>
            <div>{{astroData?.timeRange}}</div>
          </div>
        </div>

        <!-- 下方宫位 -->
        <div class="palace" *ngFor="let i of [1,0,11,8]">
          <div class="palace-content">
            <!-- 与上方宫位相同的结构 -->
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .astro-chart {
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
      padding: 16px;
    }

    .chart-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(3, 1fr);
      gap: 1px;
      background: #1890ff;
      aspect-ratio: 1;
      padding: 1px;
    }

    .palace {
      background: white;
      padding: 8px;
      position: relative;
    }

    .palace-content {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .palace-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;
      border-bottom: 1px solid #f0f0f0;
    }

    .palace-name {
      font-weight: bold;
      color: #1890ff;
    }

    .palace-age {
      font-size: 12px;
      color: #666;
    }

    .star-section {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
    }

    .star {
      padding: 2px 4px;
      border-radius: 2px;
      font-size: 12px;
      
      &.化禄 { color: #f5222d; }
      &.化权 { color: #722ed1; }
      &.化科 { color: #13c2c2; }
      &.化忌 { color: #faad14; }
    }

    .minor-star-section {
      font-size: 12px;
      color: #666;
      margin-top: 4px;
    }

    .center-palace {
      grid-column: 2 / span 2;
      background: white;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    .birth-info {
      font-size: 12px;
      line-height: 1.5;
    }
  `]
})
export class AstroChartComponent implements OnChanges {
  @Input() astroData: any;

  getPalaceName(index: number): string {
    const palace = this.astroData?.palaces?.[index];
    return palace?.name || '';
  }

  getPalaceAge(index: number): string {
    const palace = this.astroData?.palaces?.[index];
    return palace?.ages?.join('-') || '';
  }

  getMajorStars(index: number): any[] {
    const palace = this.astroData?.palaces?.[index];
    return palace?.majorStars || [];
  }

  getMinorStars(index: number): any[] {
    const palace = this.astroData?.palaces?.[index];
    return palace?.minorStars || [];
  }

  ngOnChanges() {
    if (this.astroData) {
      console.log('Updating chart with:', this.astroData);
    }
  }
} 