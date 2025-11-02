'use client';

import { useMemo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TaskItem } from '@/types';
import dynamic from 'next/dynamic';

// React Flow를 dynamic import로 로드 (SSR 방지)
const ReactFlow = dynamic(
  () => import('reactflow').then((mod) => mod.default),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }
);

// React Flow types will be inferred from the library

const nodeTypes = {
  custom: ({ data }: any) => {
    return (
      <div className="px-4 py-3 bg-dark-700 border-2 border-primary-500/50 rounded-lg shadow-lg min-w-[180px]">
        <div className="font-semibold text-white mb-2">{data.label}</div>
        {data.description && (
          <div className="text-xs text-gray-400">{data.description}</div>
        )}
      </div>
    );
  },
  input: ({ data }: any) => {
    return (
      <div className="px-4 py-3 bg-blue-500/20 border-2 border-blue-500 rounded-lg shadow-lg min-w-[180px]">
        <div className="font-semibold text-blue-400 mb-2">{data.label}</div>
        {data.description && (
          <div className="text-xs text-blue-300">{data.description}</div>
        )}
      </div>
    );
  },
  process: ({ data }: any) => {
    return (
      <div className="px-4 py-3 bg-green-500/20 border-2 border-green-500 rounded-lg shadow-lg min-w-[180px]">
        <div className="font-semibold text-green-400 mb-2">{data.label}</div>
        {data.description && (
          <div className="text-xs text-green-300">{data.description}</div>
        )}
      </div>
    );
  },
  output: ({ data }: any) => {
    return (
      <div className="px-4 py-3 bg-purple-500/20 border-2 border-purple-500 rounded-lg shadow-lg min-w-[180px]">
        <div className="font-semibold text-purple-400 mb-2">{data.label}</div>
        {data.description && (
          <div className="text-xs text-purple-300">{data.description}</div>
        )}
      </div>
    );
  },
  ai: ({ data }: any) => {
    return (
      <div className="px-4 py-3 bg-yellow-500/20 border-2 border-yellow-500 rounded-lg shadow-lg min-w-[180px]">
        <div className="font-semibold text-yellow-400 mb-2">{data.label}</div>
        {data.description && (
          <div className="text-xs text-yellow-300">{data.description}</div>
        )}
      </div>
    );
  },
};

const getNodeType = (index: number, total: number): string => {
  if (index === 0) return 'input';
  if (index === total - 1) return 'output';
  if (index === 2 && total >= 4) return 'ai';
  return 'process';
};

export function AgentFlowDiagram({ task, height = '400px' }: { task: TaskItem; height?: string }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { nodes, edges } = useMemo(() => {
    const nodes: any[] = [];
    const edges: any[] = [];
    
    if (task.developmentSpec?.flowSteps && task.developmentSpec.flowSteps.length > 0) {
      // Custom flow steps from LLM
      task.developmentSpec.flowSteps.forEach((step, index) => {
        const nodeType = getNodeType(index, task.developmentSpec!.flowSteps!.length);
        nodes.push({
          id: step.id,
          type: nodeType,
          position: { x: index * 250, y: 0 },
          data: {
            label: step.title,
            description: step.description,
          },
        });
        
        if (index > 0) {
          edges.push({
            id: `e${index - 1}-${index}`,
            source: task.developmentSpec!.flowSteps![index - 1].id,
            target: step.id,
            type: 'smoothstep',
            animated: true,
            markerEnd: {
              type: 'arrowclosed',
              color: '#6366f1',
            },
            style: { stroke: '#6366f1', strokeWidth: 2 },
          });
        }
      });
    } else {
      // Default flow if no custom steps
      const defaultSteps = [
        { id: 'input', label: '요청 수신', description: '사용자 요청 또는 이벤트 감지', type: 'input' as const },
        { id: 'analyze', label: '요청 분석', description: '입력 데이터 분석 및 검증', type: 'process' as const },
        { id: 'ai-process', label: 'AI 처리', description: 'AI 모델을 통한 데이터 처리', type: 'ai' as const },
        { id: 'output', label: '결과 반환', description: '처리 결과 반환 및 전달', type: 'output' as const },
      ];
      
      defaultSteps.forEach((step, index) => {
        nodes.push({
          id: step.id,
          type: step.type,
          position: { x: index * 250, y: 0 },
          data: {
            label: step.label,
            description: step.description,
          },
        });
        
        if (index > 0) {
          edges.push({
            id: `e${index - 1}-${index}`,
            source: defaultSteps[index - 1].id,
            target: step.id,
            type: 'smoothstep',
            animated: true,
            markerEnd: {
              type: 'arrowclosed',
              color: '#6366f1',
            },
            style: { stroke: '#6366f1', strokeWidth: 2 },
          });
        }
      });
    }
    
    return { nodes, edges };
  }, [task]);

  if (!isClient) {
    return (
      <div style={{ height }} className="w-full bg-dark-800 rounded-lg border border-dark-700 overflow-hidden flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ height }}
      className="w-full bg-dark-800 rounded-lg border border-dark-700 overflow-hidden"
    >
      {/* @ts-ignore */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        className="bg-dark-800"
        proOptions={{ hideAttribution: true }}
      />
    </motion.div>
  );
}
