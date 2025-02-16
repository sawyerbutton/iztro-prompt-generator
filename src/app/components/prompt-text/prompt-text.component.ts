import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { FormsModule } from '@angular/forms';


interface PromptSection {
  title: string;
  content: string;
}

@Component({
  selector: 'app-prompt-text',
  standalone: true,
  imports: [CommonModule, FormsModule, NzInputModule, NzCardModule, NzButtonModule, NzMessageModule],
  template: `
    <div class="prompt-container">
      <nz-card *ngFor="let section of promptSections" class="prompt-card">
        <div class="card-title">
          <h3>{{section.title}}</h3>
          <button nz-button nzType="primary" (click)="copyToClipboard(section.content)">复制</button>
        </div>
        <textarea
          nz-input
          [ngModel]="section.content"
          [readonly]="true"
          [nzAutosize]="{ minRows: 4, maxRows: 8 }"
        ></textarea>
      </nz-card>
    </div>
  `,
  styles: [`
    .prompt-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .prompt-card {
      margin-bottom: 16px;
    }
    .card-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    textarea {
      width: 100%;
    }
  `]
})
export class PromptTextComponent implements OnChanges {
  @Input() astroData: any;
  promptSections: PromptSection[] = [];

  constructor(private message: NzMessageService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['astroData'] && this.astroData) {
      this.generatePromptSections();
    }
  }

  private generatePromptSections() {
    this.promptSections = [
      {
        title: '通用解读系统提示语',
        content: this.getSystemPrompt()
      },
      {
        title: '个人命盘基础解读提示语',
        content: this.getBasicUserPrompt()
      },
      {
        title: '事业发展解读提示语',
        content: this.getCareerPrompt()
      },
      {
        title: '感情婚姻解读提示语',
        content: this.getLovePrompt()
      },
      {
        title: '财运解读提示语',
        content: this.getWealthPrompt()
      }
    ];
  }

  private getSystemPrompt(): string {
    return `你是一位专业的紫微斗数命理师，拥有丰富的紫微斗数解读经验。
你需要基于提供的紫微斗数命盘信息，为咨询者提供专业、客观的解读。
在解读时，请注意：
1. 保持专业性和客观性
2. 使用易懂的语言
3. 避免过于绝对的判断
4. 注重积极引导
5. 保护咨询者隐私

请基于以下命盘信息，为咨询者提供解读：`;
  }

  private getBasicUserPrompt(): string {
    const basicInfo = this.convertBasicInfoToText();
    return `请为我解读以下紫微斗数命盘的基本信息，包括命主的基本性格特征、人生特点等内容：

${basicInfo}

请从以下几个方面进行解读：
1. 命主的性格特点和个性特征
2. 人生发展的整体特点
3. 优势和潜在的挑战
4. 适合发展的方向建议`;
  }

  private getCareerPrompt(): string {
    const careerInfo = this.convertCareerInfoToText();
    return `请基于以下紫微斗数命盘信息，为我详细解读事业发展相关的信息：

${careerInfo}

请重点关注：
1. 事业发展的总体特点
2. 适合从事的职业领域
3. 事业发展的有利时期
4. 可能遇到的职场挑战及应对建议
5. 事业成功的关键因素`;
  }

  private getLovePrompt(): string {
    const loveInfo = this.convertLoveInfoToText();
    return `请基于以下紫微斗数命盘信息，为我详细解读感情婚姻相关的信息：

${loveInfo}

请重点关注：
1. 感情生活的总体特点
2. 适合的伴侣类型
3. 婚姻生活的特点
4. 感情发展的有利时期
5. 维系感情的建议`;
  }

  private getWealthPrompt(): string {
    const wealthInfo = this.convertWealthInfoToText();
    return `请基于以下紫微斗数命盘信息，为我详细解读财运相关的信息：

${wealthInfo}

请重点关注：
1. 财运的总体特点
2. 适合的理财方式
3. 财运旺盛的时期
4. 可能的财务风险及防范建议
5. 提升财运的方法`;
  }

  private convertBasicInfoToText(): string {
    // 复用之前的转换逻辑，但只包含基本信息部分
    return this.convertToPromptText(this.astroData);
  }

  private convertCareerInfoToText(): string {
    // 提取与事业相关的宫位信息
    const careerPalaces = this.astroData.palaces.filter((palace: any) => 
      ['官禄', '事业', '财帛'].includes(palace.name)
    );
    return this.convertPalacesToText(careerPalaces);
  }

  private convertLoveInfoToText(): string {
    // 提取与感情相关的宫位信息
    const lovePalaces = this.astroData.palaces.filter((palace: any) => 
      ['夫妻', '子女'].includes(palace.name)
    );
    return this.convertPalacesToText(lovePalaces);
  }

  private convertWealthInfoToText(): string {
    // 提取与财运相关的宫位信息
    const wealthPalaces = this.astroData.palaces.filter((palace: any) => 
      ['财帛', '田宅', '官禄'].includes(palace.name)
    );
    return this.convertPalacesToText(wealthPalaces);
  }

  private convertToPromptText(data: any): string {
    const lines: string[] = [];

    // 基本信息
    lines.push('----------基本信息----------');
    lines.push(`命主性别：${data.gender}`);
    lines.push(`阳历生日：${data.solarDate}`);
    lines.push(`农历生日：${data.lunarDate}`);
    lines.push(`八字：${data.chineseDate}`);
    lines.push(`生辰时辰：${data.time} (${data.timeRange})`);
    lines.push(`星座：${data.sign}`);
    lines.push(`生肖：${data.zodiac}`);
    lines.push(`身宫地支：${data.earthlyBranchOfBodyPalace}`);
    lines.push(`命宫地支：${data.earthlyBranchOfSoulPalace}`);
    lines.push(`命主星：${data.soul}`);
    lines.push(`身主星：${data.body}`);
    lines.push(`五行局：${data.fiveElementsClass}`);
    lines.push('----------宫位信息----------');

    // 宫位信息
    if (data.palaces && Array.isArray(data.palaces)) {
      data.palaces.forEach((palace: any) => {
        lines.push(this.convertPalaceToText(palace));
        lines.push('----------');
      });
    }

    return lines.join('\n');
  }

  private convertPalaceToText(palace: any): string {
    const lines: string[] = [];

    // 宫位基本信息
    lines.push(`宫位：${palace.name}（${palace.index}号位）`);
    lines.push(`${palace.isBodyPalace ? '是' : '不是'}身宫，${palace.isOriginalPalace ? '是' : '不是'}来因宫`);
    lines.push(`天干：${palace.heavenlyStem}，地支：${palace.earthlyBranch}`);

    // 主星信息
    if (palace.majorStars && palace.majorStars.length > 0) {
      const majorStars = palace.majorStars.map((star: any) => {
        let desc = star.name;
        if (star.brightness) {
          desc += `（${star.brightness}）`;
        }
        if (star.mutagen) {
          desc += `（${star.mutagen}化）`;
        }
        return desc;
      });
      lines.push(`主星：${majorStars.join('，')}`);
    } else {
      lines.push('主星：无');
    }

    // 辅星信息
    if (palace.minorStars && palace.minorStars.length > 0) {
      const minorStars = palace.minorStars.map((star: any) => {
        let desc = star.name;
        if (star.brightness) {
          desc += `（${star.brightness}）`;
        }
        return desc;
      });
      lines.push(`辅星：${minorStars.join('，')}`);
    } else {
      lines.push('辅星：无');
    }

    // 杂耀信息
    if (palace.adjectiveStars && palace.adjectiveStars.length > 0) {
      const adjectiveStars = palace.adjectiveStars.map((star: any) => star.name);
      lines.push(`杂耀：${adjectiveStars.join('，')}`);
    } else {
      lines.push('杂耀：无');
    }

    // 十二神信息
    lines.push(`长生十二神：${palace.changsheng12}`);
    lines.push(`博士十二神：${palace.boshi12}`);
    lines.push(`流年将前十二神：${palace.jiangqian12}`);
    lines.push(`流年岁前十二神：${palace.suiqian12}`);

    // 大限信息
    if (palace.decadal) {
      lines.push(
        `大限：${palace.decadal.range[0]}-${palace.decadal.range[1]}岁` +
        `（${palace.decadal.heavenlyStem}${palace.decadal.earthlyBranch}）`
      );
    }

    // 小限信息
    if (palace.ages && palace.ages.length > 0) {
      lines.push(`小限：${palace.ages.join('，')}岁`);
    }

    return lines.join('\n');
  }

  private convertPalacesToText(palaces: any[]): string {
    return palaces.map(palace => this.convertPalaceToText(palace)).join('\n\n');
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      this.message.success('复制成功！');
    }).catch(() => {
      this.message.error('复制失败，请手动复制。');
    });
  }
} 