'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Code, 
  Workflow, 
  FileText, 
  AlertTriangle, 
  Shield, 
  Wrench,
  Download,
  Copy,
  CheckCircle
} from 'lucide-react';
import { TaskItem, TaskRecipe } from '@/types';
import { useTranslation, Language } from '@/lib/i18n';

interface TaskDetailProps {
  task: TaskItem;
  onGenerateRecipe?: (task: TaskItem) => Promise<void>;
  isGeneratingRecipe?: boolean;
  language?: Language;
}

type TabType = 'overview' | 'recipe' | 'code' | 'diagram';

export function TaskDetail({ task, onGenerateRecipe, isGeneratingRecipe = false, language = 'ko' }: TaskDetailProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const t = useTranslation(language);

  const tabs = [
    { id: 'overview', label: language === 'ko' ? '개요' : 'Overview', icon: FileText },
    { id: 'recipe', label: language === 'ko' ? '레시피' : 'Recipe', icon: Workflow },
    { id: 'code', label: language === 'ko' ? '코드' : 'Code', icon: Code },
    { id: 'diagram', label: language === 'ko' ? '플로우' : 'Flow', icon: Workflow },
  ] as const;

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(type);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (error) {
      console.error('복사 실패:', error);
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* 기본 정보 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-muted rounded-lg">
          <div className="text-2xl font-bold text-green-600">{task.score}</div>
          <div className="text-xs text-muted-foreground">자동화 점수</div>
        </div>
        <div className="text-center p-3 bg-muted rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{task.roiEstimate}%</div>
          <div className="text-xs text-muted-foreground">예상 ROI</div>
        </div>
        <div className="text-center p-3 bg-muted rounded-lg">
          <div className="text-2xl font-bold text-orange-600">{task.difficulty}/5</div>
          <div className="text-xs text-muted-foreground">구현 난이도</div>
        </div>
        <div className="text-center p-3 bg-muted rounded-lg">
          <div className="text-2xl font-bold text-purple-600">{task.tools.length}</div>
          <div className="text-xs text-muted-foreground">권장 도구</div>
        </div>
      </div>

      {/* 평가 근거 */}
      <div>
        <h3 className="font-semibold mb-2">평가 근거</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {task.reasoning}
        </p>
      </div>

      {/* 권장 도구 */}
      <div>
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Wrench className="h-4 w-4" />
          권장 도구
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {task.tools.map((tool, index) => (
            <div key={index} className="p-3 border rounded-lg">
              <div className="font-medium text-sm mb-1">{tool.name}</div>
              <div className="text-xs text-muted-foreground mb-2">{tool.purpose}</div>
              {tool.alt && tool.alt.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {tool.alt.map((alt, altIndex) => (
                    <Badge key={altIndex} variant="outline" className="text-xs">
                      {alt}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 리스크 및 가드레일 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2 text-orange-600">
            <AlertTriangle className="h-4 w-4" />
            리스크 ({task.risks.length})
          </h3>
          <div className="space-y-2">
            {task.risks.map((risk, index) => (
              <div key={index} className="p-2 bg-orange-50 dark:bg-orange-950 rounded text-sm">
                • {risk}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2 text-blue-600">
            <Shield className="h-4 w-4" />
            가드레일 ({task.safeguards.length})
          </h3>
          <div className="space-y-2">
            {task.safeguards.map((safeguard, index) => (
              <div key={index} className="p-2 bg-blue-50 dark:bg-blue-950 rounded text-sm">
                • {safeguard}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderRecipe = () => (
    <div className="space-y-6">
      {task.recipe.steps.length > 0 ? (
        <>
          {/* 입력/출력 스키마 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">입력 데이터</h3>
              <div className="space-y-2">
                {task.recipe.inputs.map((input, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="font-medium text-sm">{input.name}</div>
                    <div className="text-xs text-muted-foreground">
                      타입: {input.type} | 출처: {input.source}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">출력 데이터</h3>
              <div className="space-y-2">
                {task.recipe.outputs.map((output, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="font-medium text-sm">{output.name}</div>
                    <div className="text-xs text-muted-foreground">
                      타입: {output.type} | 출처: {output.source}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 구현 단계 */}
          <div>
            <h3 className="font-semibold mb-3">구현 단계</h3>
            <div className="space-y-3">
              {task.recipe.steps.map((step, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1 pt-1 text-sm">{step}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 테스트 케이스 */}
          {task.recipe.tests.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">테스트 케이스</h3>
              <div className="space-y-2">
                {task.recipe.tests.map((test, index) => (
                  <div key={index} className="p-2 bg-muted rounded text-sm">
                    • {test}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 모니터링 지표 */}
          {task.recipe.monitoring.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">모니터링 지표</h3>
              <div className="space-y-2">
                {task.recipe.monitoring.map((metric, index) => (
                  <div key={index} className="p-2 bg-muted rounded text-sm">
                    • {metric}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-8">
          <Workflow className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground mb-4">아직 레시피가 생성되지 않았습니다.</p>
          {onGenerateRecipe && (
            <Button onClick={() => onGenerateRecipe(task)} disabled={isGeneratingRecipe}>
              {isGeneratingRecipe ? '레시피 생성 중...' : '레시피 생성하기'}
            </Button>
          )}
        </div>
      )}
    </div>
  );

  const renderCode = () => (
    <div className="space-y-6">
      {task.recipe.codeSamples.length > 0 ? (
        task.recipe.codeSamples.map((sample, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Code className="h-4 w-4" />
                {sample.label}
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(sample.code, `${sample.lang}-${index}`)}
              >
                {copiedCode === `${sample.lang}-${index}` ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-1" />
                    복사됨
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1" />
                    복사
                  </>
                )}
              </Button>
            </div>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code className={`language-${sample.lang}`}>{sample.code}</code>
            </pre>
          </div>
        ))
      ) : (
        <div className="text-center py-8">
          <Code className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">코드 예시가 없습니다.</p>
        </div>
      )}
    </div>
  );

  const renderDiagram = () => (
    <div className="space-y-6">
      {task.recipe.flowMermaid ? (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Workflow className="h-4 w-4" />
              자동화 플로우
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(task.recipe.flowMermaid, 'mermaid')}
            >
              {copiedCode === 'mermaid' ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-1" />
                  복사됨
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1" />
                  Mermaid 복사
                </>
              )}
            </Button>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <pre className="text-sm overflow-x-auto">
              <code>{task.recipe.flowMermaid}</code>
            </pre>
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            💡 위 Mermaid 코드를 <a href="https://mermaid.live" target="_blank" rel="noopener noreferrer" className="underline">Mermaid Live Editor</a>에서 시각화할 수 있습니다.
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <Workflow className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">플로우 다이어그램이 없습니다.</p>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'recipe':
        return renderRecipe();
      case 'code':
        return renderCode();
      case 'diagram':
        return renderDiagram();
      default:
        return renderOverview();
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{task.title}</CardTitle>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant={task.category === 'Automate' ? 'automate' : task.category === 'Co-pilot' ? 'copilot' : 'humanCritical'}>
                {task.category}
              </Badge>
              <Badge variant="outline">{task.score}점</Badge>
              <Badge variant="outline">ROI {task.roiEstimate}%</Badge>
              <Badge variant="outline">난이도 {task.difficulty}/5</Badge>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            가이드 다운로드
          </Button>
        </div>

        {/* 탭 네비게이션 */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab(tab.id as TabType)}
                className="flex-1"
              >
                <Icon className="h-4 w-4 mr-1" />
                {tab.label}
              </Button>
            );
          })}
        </div>
      </CardHeader>

      <CardContent>
        {renderContent()}
      </CardContent>
    </Card>
  );
}
