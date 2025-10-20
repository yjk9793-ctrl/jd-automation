import { NextRequest, NextResponse } from 'next/server';
import { AnalysisResult } from '@/types';

interface ExportRequest {
  result: AnalysisResult;
  email: string;
  options: {
    includeTasks: boolean;
    includeRecipes: boolean;
    includeCode: boolean;
  };
}

export async function POST(req: NextRequest) {
  try {
    const { result, email, options }: ExportRequest = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Generate PDF content
    const pdfContent = generatePDFContent(result, options);

    // Send email with PDF attachment
    // Note: In production, you would use a service like SendGrid, AWS SES, or Resend
    const emailResult = await sendEmailWithPDF(email, pdfContent, result);

    return NextResponse.json({
      success: true,
      data: {
        email,
        sentAt: new Date().toISOString(),
        message: 'PDF sent successfully',
      },
    });
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to export PDF' },
      { status: 500 }
    );
  }
}

function generatePDFContent(result: AnalysisResult, options: ExportRequest['options']): string {
  const { tasks, summary, metadata } = result;
  
  const header = '# JD Analysis Report\n## Analysis Summary\n\n';
  const summaryText = `**Analysis Date:** ${new Date(metadata.analyzedAt).toLocaleString()}\n**Total Tasks:** ${summary.total}\n**Average ROI:** ${summary.averageROI.toFixed(1)}%\n\n`;
  const distributionText = `### Task Distribution\n- **Automation Possible:** ${summary.automate} tasks\n- **AI Co-pilot:** ${summary.copilot} tasks\n- **Human-Critical:** ${summary.humanCritical} tasks\n\n`;
  
  const highImpactTasksText = '### High Impact Tasks\n' + summary.highImpactTasks.map((task, idx) => {
    return `${idx + 1}. ${task.title}\n   - Score: ${task.score}/100\n   - ROI: ${task.roiEstimate}%\n   - Category: ${task.category}\n   - Difficulty: ${task.difficulty}/5`;
  }).join('\n') + '\n\n---\n\n';
  
  const detailedAnalysisText = '## Detailed Task Analysis\n\n' + tasks.map((task, idx) => {
    let taskText = `### ${idx + 1}. ${task.title}\n\n**Category:** ${task.category}\n**Automation Score:** ${task.score}/100\n**ROI Estimate:** ${task.roiEstimate}%\n**Difficulty:** ${task.difficulty}/5\n**Estimated Implementation Time:** ${task.estimatedTime}\n\n**Source Text:**\n${task.sourceText}\n\n**Evaluation Reasoning:**\n${task.reasoning}\n\n`;
    
    if (task.category === 'Automate' || task.category === 'Co-pilot') {
      taskText += `#### AI Agent Type: ${getAgentType(task)}\n#### Key Features:\n${getAgentFeatures(task)}\n\n#### Expected Effects:\n${getExpectedEffects(task)}\n\n`;
    }
    
    taskText += `**Risks:**\n${task.risks.map(r => `- ${r}`).join('\n')}\n\n`;
    taskText += `**Safeguards:**\n${task.safeguards.map(s => `- ${s}`).join('\n')}\n\n`;
    taskText += `**Required Tools:**\n${task.tools.map(t => `- ${t.name}: ${t.purpose}`).join('\n')}\n\n`;
    
    if (options.includeRecipes && task.recipe) {
      taskText += `#### Implementation Recipe\n\n**Inputs:**\n${task.recipe.inputs.map(i => `- ${i.name} (${i.type}): ${i.source}`).join('\n')}\n\n`;
      taskText += `**Outputs:**\n${task.recipe.outputs.map(o => `- ${o.name} (${o.type}): ${o.source}`).join('\n')}\n\n`;
      taskText += `**Steps:**\n${task.recipe.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\n`;
      
      if (options.includeCode && task.recipe.codeSamples.length > 0) {
        taskText += `**Code Samples:**\n${task.recipe.codeSamples.map(cs => `\`\`\`${cs.lang}\n// ${cs.label}\n${cs.code}\n\`\`\``).join('\n')}\n\n`;
      }
      
      taskText += `**Tests:**\n${task.recipe.tests.map(t => `- ${t}`).join('\n')}\n\n`;
      taskText += `**Monitoring:**\n${task.recipe.monitoring.map(m => `- ${m}`).join('\n')}\n\n`;
    }
    
    taskText += '---\n';
    return taskText;
  }).join('\n');

  return header + summaryText + distributionText + highImpactTasksText + detailedAnalysisText;
}

function getAgentType(task: { title: string }): string {
  const title = task.title.toLowerCase();
  
  if (title.includes('data') || title.includes('process') || title.includes('extract')) {
    return 'Data Processing Agent';
  }
  if (title.includes('customer') || title.includes('support') || title.includes('inquiry')) {
    return 'Customer Service Agent';
  }
  if (title.includes('content') || title.includes('write') || title.includes('generate')) {
    return 'Content Generation Agent';
  }
  if (title.includes('analysis') || title.includes('analyze') || title.includes('report')) {
    return 'Analysis Agent';
  }
  if (title.includes('monitor') || title.includes('track') || title.includes('alert')) {
    return 'Monitoring Agent';
  }
  
  return 'Workflow Automation Agent';
}

function getAgentFeatures(task: { category: string; roiEstimate: number; difficulty: number }): string {
  const features: string[] = [];
  
  if (task.category === 'Automate') {
    features.push('- Fully automated task execution');
    features.push('- Rule-based decision making');
    features.push('- Error handling and retry logic');
  } else if (task.category === 'Co-pilot') {
    features.push('- AI-assisted task completion');
    features.push('- Human-in-the-loop validation');
    features.push('- Context-aware suggestions');
  }
  
  features.push(`- Estimated ${task.roiEstimate}% time savings`);
  features.push(`- Implementation difficulty: ${task.difficulty}/5`);
  
  return features.join('\n');
}

function getExpectedEffects(task: { category: string; roiEstimate: number; risks: string[]; safeguards: string[] }): string {
  const effects: string[] = [];
  
  effects.push(`**Time Savings:** ${task.roiEstimate}% reduction in task completion time`);
  effects.push(`**Cost Reduction:** Estimated annual savings based on ${task.roiEstimate}% efficiency gain`);
  effects.push(`**Quality Improvement:** Automated consistency and reduced human error`);
  
  if (task.category === 'Co-pilot') {
    effects.push(`**Enhanced Decision Making:** AI provides data-driven insights for better outcomes`);
  }
  
  if (task.risks.length > 0) {
    effects.push(`**Risk Mitigation:** ${task.safeguards.length} safeguards in place to ensure reliability`);
  }
  
  return effects.join('\n');
}

async function sendEmailWithPDF(email: string, content: string, result: AnalysisResult): Promise<boolean> {
  // In production, implement actual email sending logic
  // For demo purposes, we'll simulate it
  
  console.log('Sending email to:', email);
  console.log('PDF content length:', content.length);
  console.log('Analysis summary:', {
    totalTasks: result.summary.total,
    averageROI: result.summary.averageROI,
  });
  
  // Simulate email sending delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In production, use a service like:
  // - SendGrid: https://sendgrid.com/
  // - AWS SES: https://aws.amazon.com/ses/
  // - Resend: https://resend.com/
  // - Nodemailer: https://nodemailer.com/
  
  return true;
}
