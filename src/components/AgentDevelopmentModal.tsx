'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TaskItem, AgentFlowStep } from '@/types';
import { AgentFlowDiagram } from './AgentFlowDiagram';
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
  Users,
  Info,
  UsersRound,
  GraduationCap,
  FolderTree,
  Rocket,
  TrendingUp,
  BookOpen,
  Building2,
  Shield,
  Server,
  ExternalLink,
  Copy,
  Maximize2
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

const getLevelColor = (level: string) => {
  switch (level) {
    case 'beginner': return 'text-green-400 bg-green-500/20 border-green-500/30';
    case 'intermediate': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
    case 'advanced': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
    case 'expert': return 'text-red-400 bg-red-500/20 border-red-500/30';
    default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'required': return 'text-red-400 border-red-500/50';
    case 'preferred': return 'text-yellow-400 border-yellow-500/50';
    case 'optional': return 'text-gray-400 border-gray-500/50';
    default: return 'text-gray-400 border-gray-500/50';
  }
};

export function AgentDevelopmentModal({ isOpen, onClose, task }: AgentDevelopmentModalProps) {
  const [activeTab, setActiveTab] = useState<string>('introduction');
  const [isDiagramFullscreen, setIsDiagramFullscreen] = useState(false);

  if (!isOpen) return null;

  const IconComponent = getCategoryIcon(task.category);

  const tabs = [
    { id: 'introduction', label: '에이전트 소개', icon: Info },
    { id: 'workflow', label: '작동원리', icon: GitBranch },
    { id: 'competencies', label: '운영자 역량', icon: UsersRound },
    { id: 'team', label: '팀 구성', icon: Building2 },
    { id: 'technology', label: '기술 환경', icon: Server },
    { id: 'roadmap', label: '구현 로드맵', icon: Rocket },
  ];

  const TabContent = () => {
    switch (activeTab) {
      case 'introduction':
        return (
          <div className="space-y-6">
            {/* Agent Introduction */}
            {task.agentIntroduction && (
              <div>
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-primary-500" />
                  <span>에이전트 개요</span>
                </h4>
                <div className="bg-gradient-to-r from-primary-500/10 to-blue-500/10 rounded-lg p-6 border border-primary-500/30">
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {task.agentIntroduction}
                  </p>
                </div>
              </div>
            )}

            {/* Expected Effects */}
            {task.expectedEffects && task.expectedEffects.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span>기대 효과</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {task.expectedEffects.map((effect, index) => (
                    <div key={index} className="bg-dark-700 rounded-lg p-4 border border-dark-600 flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-300 text-sm leading-relaxed">{effect}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ROI Analysis */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                <span>ROI 분석</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-dark-700 rounded-lg p-4 border border-dark-600">
                  <div className="text-sm text-gray-400 mb-2">자동화 점수</div>
                  <div className="text-3xl font-bold text-primary-400">{task.score}/100</div>
                </div>
                <div className="bg-dark-700 rounded-lg p-4 border border-dark-600">
                  <div className="text-sm text-gray-400 mb-2">예상 ROI</div>
                  <div className="text-3xl font-bold text-green-400">{task.roiEstimate}%</div>
                </div>
                <div className="bg-dark-700 rounded-lg p-4 border border-dark-600">
                  <div className="text-sm text-gray-400 mb-2">구축 난이도</div>
                  <div className="text-3xl font-bold text-yellow-400">{task.difficulty}/5</div>
                </div>
              </div>
            </div>

            {/* Cost Analysis */}
            {(task.estimatedAdoptionCost || task.estimatedOperatingCost || task.estimatedSavingsCost) && (
              <div>
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-purple-500" />
                  <span>비용 분석</span>
                </h4>
                <div className="bg-dark-700 rounded-lg p-4 border border-dark-600 space-y-3">
                  {task.estimatedAdoptionCost && (
                    <div className="flex justify-between items-center border-b border-dark-600 pb-3">
                      <span className="text-gray-400">도입 비용</span>
                      <span className="font-semibold text-white">{task.estimatedAdoptionCost}</span>
                    </div>
                  )}
                  {task.estimatedOperatingCost && (
                    <div className="flex justify-between items-center border-b border-dark-600 pb-3">
                      <span className="text-gray-400">운영 비용 (월간)</span>
                      <span className="font-semibold text-white">{task.estimatedOperatingCost}</span>
                    </div>
                  )}
                  {task.estimatedSavingsCost && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">절감 비용 (연간)</span>
                      <span className="font-semibold text-green-400">{task.estimatedSavingsCost}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );

      case 'workflow':
        return (
          <div className="space-y-6">
            {/* Interactive Diagram */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-semibold text-white flex items-center space-x-2">
                  <GitBranch className="w-5 h-5 text-blue-500" />
                  <span>워크플로우 다이어그램</span>
                </h4>
                <button
                  onClick={() => setIsDiagramFullscreen(!isDiagramFullscreen)}
                  className="p-2 rounded-lg bg-dark-700 hover:bg-dark-600 transition-colors"
                >
                  <Maximize2 className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              <div className={isDiagramFullscreen ? 'fixed inset-0 z-50' : ''}>
                <div className={isDiagramFullscreen ? 'w-full h-full p-4 bg-dark-900' : ''}>
                  <AgentFlowDiagram task={task} height={isDiagramFullscreen ? 'calc(100vh - 120px)' : '500px'} />
                </div>
              </div>
            </div>

            {/* Detailed Flow Steps */}
            {task.developmentSpec?.flowSteps && task.developmentSpec.flowSteps.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                  <GitBranch className="w-5 h-5 text-green-500" />
                  <span>상세 워크플로우</span>
                </h4>
                <div className="space-y-4">
                  {task.developmentSpec.flowSteps.map((step: AgentFlowStep, index: number) => (
                    <div key={step.id} className="relative">
                      <div className="bg-dark-700 rounded-lg p-4 border border-dark-600">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h5 className="text-lg font-semibold text-white mb-2">{step.title}</h5>
                            <p className="text-gray-300 leading-relaxed mb-3">{step.description}</p>
                            {step.input && (
                              <div className="bg-blue-500/20 rounded-lg p-3 mb-2 border border-blue-500/30">
                                <div className="text-xs text-blue-400 font-semibold mb-1">INPUT</div>
                                <p className="text-sm text-gray-300">{step.input}</p>
                              </div>
                            )}
                            {step.processLogic && (
                              <div className="bg-green-500/20 rounded-lg p-3 mb-2 border border-green-500/30">
                                <div className="text-xs text-green-400 font-semibold mb-1">PROCESS</div>
                                <p className="text-sm text-gray-300">{step.processLogic}</p>
                              </div>
                            )}
                            {step.output && (
                              <div className="bg-purple-500/20 rounded-lg p-3 border border-purple-500/30">
                                <div className="text-xs text-purple-400 font-semibold mb-1">OUTPUT</div>
                                <p className="text-sm text-gray-300">{step.output}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      {index < task.developmentSpec!.flowSteps!.length - 1 && (
                        <div className="flex justify-center my-2">
                          <ArrowRight className="w-6 h-6 text-primary-500" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* System Architecture */}
            {task.developmentSpec?.architecture && (
              <div>
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-purple-500" />
                  <span>시스템 아키텍처</span>
                </h4>
                <div className="bg-dark-700 rounded-lg p-6 border border-dark-600">
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {task.developmentSpec.architecture}
                  </p>
                </div>
              </div>
            )}
          </div>
        );

      case 'competencies':
        return (
          <div className="space-y-6">
            {task.operatorCompetencies && task.operatorCompetencies.length > 0 ? (
              task.operatorCompetencies.map((competency, idx) => (
                <div key={idx}>
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                    <UsersRound className="w-5 h-5 text-blue-500" />
                    <span>{competency.category}</span>
                  </h4>
                  <div className="space-y-3">
                    {competency.skills.map((skill, skillIdx) => (
                      <div key={skillIdx} className="bg-dark-700 rounded-lg p-4 border border-dark-600">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-semibold text-white">{skill.name}</span>
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getLevelColor(skill.level)}`}>
                                {skill.level}
                              </span>
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(skill.priority)}`}>
                                {skill.priority}
                              </span>
                            </div>
                            <p className="text-sm text-gray-400">{skill.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                운영자 역량 정보가 아직 생성되지 않았습니다.
              </div>
            )}

            {/* Learning Resources */}
            {task.learningResources && task.learningResources.length > 0 && (
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                  <GraduationCap className="w-5 h-5 text-green-500" />
                  <span>학습 리소스</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {task.learningResources.map((resource, idx) => (
                    <div key={idx} className="bg-dark-700 rounded-lg p-4 border border-dark-600 hover:border-primary-500/50 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <BookOpen className="w-4 h-4 text-primary-400" />
                            <span className="font-semibold text-white">{resource.title}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-gray-400">
                            <span>{resource.provider}</span>
                            <span>•</span>
                            <span>{resource.duration}</span>
                            <span>•</span>
                            <span>{resource.level}</span>
                          </div>
                        </div>
                        <span className="px-2 py-1 rounded-full text-xs bg-primary-500/20 text-primary-400 border border-primary-500/30">
                          {resource.type}
                        </span>
                      </div>
                      {resource.url && (
                        <a 
                          href={resource.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1 text-sm text-primary-400 hover:text-primary-300 transition-colors"
                        >
                          <span>링크</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'team':
        return (
          <div className="space-y-6">
            {task.teamComposition && task.teamComposition.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {task.teamComposition.map((role, idx) => (
                  <div key={idx} className="bg-dark-700 rounded-lg p-4 border border-dark-600">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="text-lg font-semibold text-white">{role.title}</h5>
                      <span className="px-3 py-1 rounded-full text-sm bg-primary-500/20 text-primary-400 border border-primary-500/30">
                        {role.count}
                      </span>
                    </div>
                    {role.experienceLevel && (
                      <div className="text-sm text-gray-400 mb-3">
                        경력: {role.experienceLevel}
                      </div>
                    )}
                    <div className="mb-3">
                      <div className="text-sm font-semibold text-gray-300 mb-2">주요 책임</div>
                      <ul className="space-y-1">
                        {role.responsibilities.map((resp, respIdx) => (
                          <li key={respIdx} className="text-sm text-gray-400 flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-1.5 flex-shrink-0" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-300 mb-2">필요 스킬</div>
                      <div className="flex flex-wrap gap-2">
                        {role.requiredSkills.map((skill, skillIdx) => (
                          <span key={skillIdx} className="px-2 py-1 rounded-md text-xs bg-dark-600 text-gray-300 border border-dark-500">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                팀 구성 정보가 아직 생성되지 않았습니다.
              </div>
            )}
          </div>
        );

      case 'technology':
        return (
          <div className="space-y-6">
            {/* Technology Stack */}
            {task.technologyStack && task.technologyStack.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                  <Code className="w-5 h-5 text-blue-500" />
                  <span>기술 스택</span>
                </h4>
                <div className="space-y-4">
                  {task.technologyStack.map((stack, idx) => (
                    <div key={idx} className="bg-dark-700 rounded-lg p-4 border border-dark-600">
                      <div className="text-sm font-semibold text-gray-300 mb-3">{stack.category}</div>
                      <div className="flex flex-wrap gap-2">
                        {stack.items.map((item, itemIdx) => (
                          <span key={itemIdx} className="px-3 py-1.5 rounded-md text-sm bg-primary-500/20 text-primary-400 border border-primary-500/30">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tools */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <Settings className="w-5 h-5 text-green-500" />
                <span>필요 도구</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {task.tools.map((tool, idx) => (
                  <div key={idx} className="bg-dark-700 rounded-lg p-4 border border-dark-600">
                    <div className="font-semibold text-white mb-2">{tool.name}</div>
                    <div className="text-sm text-gray-400 mb-2">{tool.purpose}</div>
                    {tool.alternatives && tool.alternatives.length > 0 && (
                      <div className="text-xs text-gray-500">
                        대안: {tool.alternatives.join(', ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Deployment Requirements */}
            {task.deploymentRequirements && task.deploymentRequirements.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                  <Server className="w-5 h-5 text-purple-500" />
                  <span>배포 요구사항</span>
                </h4>
                <div className="space-y-3">
                  {task.deploymentRequirements.map((req, idx) => (
                    <div key={idx} className="bg-dark-700 rounded-lg p-4 border border-dark-600">
                      <div className="text-sm font-semibold text-gray-300 mb-2">{req.category}</div>
                      <ul className="space-y-1">
                        {req.requirements.map((requirement, reqIdx) => (
                          <li key={reqIdx} className="text-sm text-gray-400 flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{requirement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'roadmap':
        return (
          <div className="space-y-6">
            {task.implementationMilestones && task.implementationMilestones.length > 0 ? (
              task.implementationMilestones.map((milestone, idx) => (
                <div key={idx} className="relative">
                  <div className="bg-dark-700 rounded-lg p-6 border border-dark-600">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold">
                            {idx + 1}
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-white">{milestone.title}</h4>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="px-3 py-1 rounded-full text-xs bg-primary-500/20 text-primary-400 border border-primary-500/30">
                                {milestone.phase}
                              </span>
                              <span className="px-3 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                                {milestone.duration}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {milestone.tasks && milestone.tasks.length > 0 && (
                      <div className="mb-4">
                        <div className="text-sm font-semibold text-gray-300 mb-2">주요 태스크</div>
                        <ul className="space-y-2">
                          {milestone.tasks.map((taskItem, taskIdx) => (
                            <li key={taskIdx} className="text-sm text-gray-400 flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-1.5 flex-shrink-0" />
                              <span>{taskItem}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {milestone.deliverables && milestone.deliverables.length > 0 && (
                      <div className="mb-4">
                        <div className="text-sm font-semibold text-gray-300 mb-2">산출물</div>
                        <div className="flex flex-wrap gap-2">
                          {milestone.deliverables.map((deliverable, delIdx) => (
                            <span key={delIdx} className="px-3 py-1 rounded-md text-sm bg-green-500/20 text-green-400 border border-green-500/30">
                              {deliverable}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {milestone.checkpoints && milestone.checkpoints.length > 0 && (
                      <div>
                        <div className="text-sm font-semibold text-gray-300 mb-2">체크포인트</div>
                        <ul className="space-y-2">
                          {milestone.checkpoints.map((checkpoint, cpIdx) => (
                            <li key={cpIdx} className="text-sm text-gray-400 flex items-start space-x-2">
                              <CheckCircle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                              <span>{checkpoint}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  {idx < task.implementationMilestones!.length - 1 && (
                    <div className="flex justify-center my-4">
                      <ArrowRight className="w-6 h-6 text-primary-500" />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                구현 로드맵이 아직 생성되지 않았습니다.
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-dark-800 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden border border-dark-700"
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
              <p className="text-sm text-gray-400">종합 개발 명세서</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-dark-700 transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-dark-700 bg-dark-900 overflow-x-auto">
          <div className="flex space-x-1 px-4 py-2">
            {tabs.map((tab) => {
              const IconComp = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                      : 'text-gray-400 hover:bg-dark-700 hover:text-white'
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="p-6">
            <TabContent />
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
