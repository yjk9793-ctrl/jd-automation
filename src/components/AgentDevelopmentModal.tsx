'use client';

import { motion } from 'framer-motion';
import { TaskItem, AgentFlowStep } from '@/types';
import { 
  X, 
  Code, 
  GitBranch, 
  Database, 
  Link2, 
  CheckCircle,
  ArrowRight,
  Settings,
  Zap,
  Brain,
  Users
} from 'lucide-react';

interface AgentDevelopmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: TaskItem;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Automate': return Zap;
    case 'AI-Copilot': return Brain;
    case 'Human-Critical': return Users;
    default: return Code;
  }
};

export function AgentDevelopmentModal({ isOpen, onClose, task }: AgentDevelopmentModalProps) {
  if (!isOpen) return null;

  const IconComponent = getCategoryIcon(task.category);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-dark-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-dark-700"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-dark-700 bg-dark-900">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 ${
              task.category === 'Automate' ? 'bg-green-500/20 border-green-500/30 text-green-400' :
              task.category === 'AI-Copilot' ? 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400' :
              'bg-red-500/20 border-red-500/30 text-red-400'
            }`}>
              <IconComponent className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                <span className="text-primary-400">Agent </span>
                {task.title}
              </h2>
              <p className="text-sm text-gray-400">개발 명세서</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-dark-700 transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="p-6 space-y-8">
            {/* 작동 플로우 */}
            {task.developmentSpec?.flowSteps && task.developmentSpec.flowSteps.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center space-x-2 text-white">
                  <GitBranch className="w-6 h-6 text-blue-500" />
                  <span>작동 플로우</span>
                </h3>
                <div className="space-y-4">
                  {task.developmentSpec.flowSteps.map((step: AgentFlowStep, index: number) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative"
                    >
                      {/* Step Card */}
                      <div className="bg-dark-700 rounded-lg p-4 border border-dark-600 hover:border-primary-500/50 transition-colors">
                        <div className="flex items-start space-x-4">
                          {/* Step Number */}
                          <div className="flex-shrink-0 w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold">
                            {index + 1}
                          </div>
                          
                          {/* Step Content */}
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-white mb-2">{step.title}</h4>
                            <p className="text-gray-300 leading-relaxed">{step.description}</p>
                          </div>
                        </div>
                      </div>

                      {/* Arrow */}
                      {index < task.developmentSpec!.flowSteps!.length - 1 && (
                        <div className="flex justify-center my-2">
                          <ArrowRight className="w-6 h-6 text-primary-500" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* 기본 플로우 (개발 스펙이 없는 경우) */}
            {(!task.developmentSpec?.flowSteps || task.developmentSpec.flowSteps.length === 0) && (
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center space-x-2 text-white">
                  <GitBranch className="w-6 h-6 text-blue-500" />
                  <span>기본 작동 플로우</span>
                </h3>
                <div className="space-y-4">
                  {[
                    { id: '1', title: '사용자 요청 수신', description: '사용자의 요청 또는 이벤트를 감지하고 수신합니다.' },
                    { id: '2', title: '요청 분석 및 처리', description: '받은 요청을 분석하고 적절한 처리 로직을 실행합니다.' },
                    { id: '3', title: 'AI 모델 통합', description: '필요한 경우 AI 모델과 통신하여 데이터를 처리합니다.' },
                    { id: '4', title: '결과 반환', description: '처리된 결과를 사용자에게 반환하거나 다음 단계로 전달합니다.' }
                  ].map((step, index) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative"
                    >
                      <div className="bg-dark-700 rounded-lg p-4 border border-dark-600">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-white mb-2">{step.title}</h4>
                            <p className="text-gray-300 leading-relaxed">{step.description}</p>
                          </div>
                        </div>
                      </div>
                      {index < 3 && (
                        <div className="flex justify-center my-2">
                          <ArrowRight className="w-6 h-6 text-primary-500" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* 시스템 아키텍처 */}
            {task.developmentSpec?.architecture && (
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center space-x-2 text-white">
                  <Settings className="w-6 h-6 text-purple-500" />
                  <span>시스템 아키텍처</span>
                </h3>
                <div className="bg-dark-700 rounded-lg p-4 border border-dark-600">
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {task.developmentSpec.architecture}
                  </p>
                </div>
              </div>
            )}

            {/* API 엔드포인트 */}
            {task.developmentSpec?.endpoints && task.developmentSpec.endpoints.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center space-x-2 text-white">
                  <Code className="w-6 h-6 text-green-500" />
                  <span>API 엔드포인트</span>
                </h3>
                <div className="space-y-2">
                  {task.developmentSpec.endpoints.map((endpoint, index) => (
                    <div key={index} className="bg-dark-700 rounded-lg p-3 border border-dark-600">
                      <code className="text-sm text-primary-400 font-mono">{endpoint}</code>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 데이터 모델 */}
            {task.developmentSpec?.dataModel && task.developmentSpec.dataModel.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center space-x-2 text-white">
                  <Database className="w-6 h-6 text-orange-500" />
                  <span>데이터 모델</span>
                </h3>
                <div className="space-y-2">
                  {task.developmentSpec.dataModel.map((model, index) => (
                    <div key={index} className="bg-dark-700 rounded-lg p-3 border border-dark-600">
                      <p className="text-sm text-gray-300 font-mono">{model}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 통합 포인트 */}
            {task.developmentSpec?.integrationPoints && task.developmentSpec.integrationPoints.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center space-x-2 text-white">
                  <Link2 className="w-6 h-6 text-cyan-500" />
                  <span>통합 포인트</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {task.developmentSpec.integrationPoints.map((point, index) => (
                    <div key={index} className="bg-dark-700 rounded-lg p-3 border border-dark-600 flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 기술 스택 요약 */}
            <div className="border-t border-dark-700 pt-6">
              <h3 className="text-xl font-bold mb-4 flex items-center space-x-2 text-white">
                <Code className="w-6 h-6 text-blue-500" />
                <span>기술 스택</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {task.tools.map((tool, index) => (
                  <div key={index} className="bg-dark-700 rounded-lg p-3 border border-dark-600">
                    <div className="font-semibold text-white mb-1">{tool.name}</div>
                    <div className="text-sm text-gray-400">{tool.purpose}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-dark-700 p-6 bg-dark-900">
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-lg bg-dark-700 hover:bg-dark-600 text-gray-200 transition-colors"
            >
              닫기
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(task, null, 2));
                alert('개발 스펙이 클립보드에 복사되었습니다.');
              }}
              className="px-6 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white transition-colors"
            >
              스펙 복사
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

