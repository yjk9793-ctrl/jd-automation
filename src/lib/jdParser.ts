import { JDInput } from '@/types';

export interface ParsedJD {
  title: string;
  company: string;
  department: string;
  responsibilities: string[];
  requirements: string[];
  qualifications: string[];
  skills: string[];
  experience: string;
  location: string;
  fullText: string;
  metadata: {
    wordCount: number;
    sectionCount: number;
    parsedAt: string;
  };
}

export class JDParser {
  /**
   * JD 텍스트를 구조화된 데이터로 파싱
   */
  async parseJD(input: JDInput): Promise<ParsedJD> {
    const text = input.text.trim();
    
    // 기본 구조 추출
    const title = this.extractTitle(text);
    const company = this.extractCompany(text);
    const department = this.extractDepartment(text);
    const responsibilities = this.extractResponsibilities(text);
    const requirements = this.extractRequirements(text);
    const qualifications = this.extractQualifications(text);
    const skills = this.extractSkills(text);
    const experience = this.extractExperience(text);
    const location = this.extractLocation(text);

    return {
      title,
      company,
      department,
      responsibilities,
      requirements,
      qualifications,
      skills,
      experience,
      location,
      fullText: text,
      metadata: {
        wordCount: text.split(/\s+/).length,
        sectionCount: this.countSections(text),
        parsedAt: new Date().toISOString(),
      },
    };
  }

  private extractTitle(text: string): string {
    // 제목 패턴들
    const titlePatterns = [
      /(?:채용|모집|구인).*?(?:직무|포지션|역할)[:\s]*([^\n]+)/i,
      /(?:직무|포지션|역할)[:\s]*([^\n]+)/i,
      /^([^-\n]{5,50})$/m,
      /([A-Za-z가-힣\s]{5,50})\s*(?:채용|모집|구인)/i,
    ];

    for (const pattern of titlePatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        return match[1].trim();
      }
    }

    return '직무명 미상';
  }

  private extractCompany(text: string): string {
    const companyPatterns = [
      /(?:회사|기업|법인)[:\s]*([^\n]+)/i,
      /([A-Za-z가-힣\s]+(?:주식회사|유한회사|협회|재단|센터|연구소))/i,
      /^([A-Za-z가-힣\s]+)$/m,
    ];

    for (const pattern of companyPatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        return match[1].trim();
      }
    }

    return '회사명 미상';
  }

  private extractDepartment(text: string): string {
    const departmentPatterns = [
      /(?:부서|팀|조직)[:\s]*([^\n]+)/i,
      /([A-Za-z가-힣\s]*(?:부|팀|센터|실|과))/i,
    ];

    for (const pattern of departmentPatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        return match[1].trim();
      }
    }

    return '부서명 미상';
  }

  private extractResponsibilities(text: string): string[] {
    const responsibilityPatterns = [
      /(?:주요\s*)?(?:업무|담당|역할|책임)[:\s]*([\s\S]*?)(?=\n\s*(?:자격|요구|필수|우대|지원|신청|문의)|$)/i,
      /(?:담당업무|주요업무)[:\s]*([\s\S]*?)(?=\n\s*(?:자격|요구|필수|우대)|$)/i,
    ];

    const responsibilities: string[] = [];

    for (const pattern of responsibilityPatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        const content = match[1].trim();
        const items = this.extractListItems(content);
        responsibilities.push(...items);
      }
    }

    return responsibilities.length > 0 ? responsibilities : ['업무 내용 미상'];
  }

  private extractRequirements(text: string): string[] {
    const requirementPatterns = [
      /(?:자격요건|필수요건|요구사항)[:\s]*([\s\S]*?)(?=\n\s*(?:우대|선호|기타|지원|신청|문의)|$)/i,
      /(?:필수|요구)[:\s]*([\s\S]*?)(?=\n\s*(?:우대|선호)|$)/i,
    ];

    const requirements: string[] = [];

    for (const pattern of requirementPatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        const content = match[1].trim();
        const items = this.extractListItems(content);
        requirements.push(...items);
      }
    }

    return requirements;
  }

  private extractQualifications(text: string): string[] {
    const qualificationPatterns = [
      /(?:우대사항|선호사항|우대요건)[:\s]*([\s\S]*?)(?=\n\s*(?:근무|복리|혜택|급여|지원|신청|문의)|$)/i,
      /(?:우대|선호)[:\s]*([\s\S]*?)(?=\n\s*(?:근무|복리|혜택|급여)|$)/i,
    ];

    const qualifications: string[] = [];

    for (const pattern of qualificationPatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        const content = match[1].trim();
        const items = this.extractListItems(content);
        qualifications.push(...items);
      }
    }

    return qualifications;
  }

  private extractSkills(text: string): string[] {
    const skillKeywords = [
      'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'Go', 'Rust',
      'React', 'Vue', 'Angular', 'Node.js', 'Express', 'Django', 'Spring',
      'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'MySQL', 'PostgreSQL',
      'MongoDB', 'Redis', 'Elasticsearch', 'Git', 'Linux', 'Windows',
      'Photoshop', 'Illustrator', 'Figma', 'Sketch', 'Excel', 'PowerPoint',
      '영어', '중국어', '일본어', '커뮤니케이션', '리더십', '협업',
    ];

    const foundSkills: string[] = [];
    const lowerText = text.toLowerCase();

    for (const skill of skillKeywords) {
      if (lowerText.includes(skill.toLowerCase())) {
        foundSkills.push(skill);
      }
    }

    return foundSkills;
  }

  private extractExperience(text: string): string {
    const experiencePatterns = [
      /(?:경력|경험)[:\s]*([^\n]+)/i,
      /([0-9]+년\s*(?:이상|이하|정도)?)/i,
      /(?:신입|경력무관|신입\s*가능)/i,
    ];

    for (const pattern of experiencePatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        return match[1].trim();
      }
    }

    return '경력 미상';
  }

  private extractLocation(text: string): string {
    const locationPatterns = [
      /(?:근무지|위치|장소)[:\s]*([^\n]+)/i,
      /([가-힣\s]+(?:구|시|도|동|읍|면))/i,
      /(?:서울|부산|대구|인천|광주|대전|울산|세종|경기|강원|충북|충남|전북|전남|경북|경남|제주)/i,
    ];

    for (const pattern of locationPatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        return match[1].trim();
      }
    }

    return '근무지 미상';
  }

  private extractListItems(content: string): string[] {
    // 다양한 리스트 패턴 처리
    const patterns = [
      /[•·▪▫‣⁃]\s*([^\n]+)/g,
      /[-*]\s*([^\n]+)/g,
      /(\d+[.)]\s*[^\n]+)/g,
      /([가-힣]\s*[.)]\s*[^\n]+)/g,
      /([^\n]+)/g,
    ];

    const items: string[] = [];

    for (const pattern of patterns) {
      const matches = content.matchAll(pattern);
      for (const match of matches) {
        const item = match[1]?.trim();
        if (item && item.length > 3 && item.length < 200) {
          items.push(item);
        }
      }
      if (items.length > 0) break;
    }

    return items.slice(0, 20); // 최대 20개 항목
  }

  private countSections(text: string): number {
    const sectionKeywords = [
      '주요업무', '담당업무', '역할', '책임',
      '자격요건', '필수요건', '요구사항',
      '우대사항', '선호사항', '우대요건',
      '근무조건', '복리후생', '혜택',
      '급여', '연봉', '처우',
      '지원방법', '문의', '연락처',
    ];

    let count = 0;
    const lowerText = text.toLowerCase();

    for (const keyword of sectionKeywords) {
      if (lowerText.includes(keyword)) {
        count++;
      }
    }

    return count;
  }

  /**
   * 파일에서 JD 텍스트 추출
   */
  async extractTextFromFile(file: File): Promise<string> {
    const fileType = file.type;
    const fileName = file.name.toLowerCase();

    if (fileType === 'text/plain' || fileName.endsWith('.txt')) {
      return await file.text();
    }

    if (fileName.endsWith('.md') || fileType === 'text/markdown') {
      return await file.text();
    }

    if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
      // PDF 파싱은 서버에서 처리
      throw new Error('PDF 파일은 서버에서 처리됩니다.');
    }

    if (fileName.endsWith('.docx') || fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      // DOCX 파싱은 서버에서 처리
      throw new Error('DOCX 파일은 서버에서 처리됩니다.');
    }

    throw new Error('지원하지 않는 파일 형식입니다.');
  }
}

export const jdParser = new JDParser();
