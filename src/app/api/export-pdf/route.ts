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
  
  let content = `
# JD Analysis Report
## Analysis Summary

**Analysis Date:** ${new Date(metadata.analyzedAt).toLocaleString()}
**Total Tasks:** ${summary.total}
**Average ROI:** ${summary.averageROI.toFixed(1)}%

### Task Distribution
- **Automation Possible:** ${summary.automate} tasks
- **AI Co-pilot:** ${summary.copilot} tasks
- **Human-Critical:** ${summary.humanCritical} tasks

### High Impact Tasks
${summary.highImpactTasks.map((task, idx) => `
${idx + 1}. ${task.title}
   - Score: ${task.score}/100
   - ROI: ${task.roiEstimate}%
   - Category: ${task.category}
   - Difficulty: ${task.difficulty}/5
`).join('\n')}

---

## Detailed Task Analysis

${tasks.map((task, idx) => `
### ${idx + 1}. ${task.title}

**Category:** ${task.category}
**Automation Score:** ${task.score}/100
**ROI Estimate:** ${task.roiEstimate}%
**Difficulty:** ${task.difficulty}/5
**Estimated Implementation Time:** ${task.estimatedTime}

**Source Text:**
${task.sourceText}

**Evaluation Reasoning:**
${task.reasoning}

${task.category === 'Automate' || task.category === 'Co-pilot' ? `
#### AI Agent Type: ${getAgentType(task)}
#### Key Features:
${getAgentFeatures(task)}

#### Expected Effects:
${getExpectedEffects(task)}
` : ''}

**Risks:**
${task.risks.map(r => `- ${r}`).join('\n')}

**Safeguards:**
${task.safeguards.map(s => `- ${s}`).join('\n')}

**Required Tools:**
${task.tools.map(t => `- ${t.name}: ${t.purpose}`).join('\n')}

${options.includeRecipes && task.recipe ? `
#### Implementation Recipe

**Inputs:**
${task.recipe.inputs.map(i => `- ${i.name} (${i.type}): ${i.source}`).join('\n')}

**Outputs:**
${task.recipe.outputs.map(o => `- ${o.name} (${o.type}): ${o.source}`).join('\n')}

**Steps:**
${task.recipe.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}

${options.includeCode && task.recipe.codeSamples.length > 0 ? `
**Code Samples:**
${task.recipe.codeSamples.map(cs => `
\`\`\`${cs.lang}
// ${cs.label}
${cs.code}
\`\`\`
`).join('\n')}
` : ''}

**Tests:**
${task.recipe.tests.map(t => `- ${t}`).join('\n')}

**Monitoring:**
${task.recipe.monitoring.map(m => `- ${m}`).join('\n')}
` : ''}

---
`).join('\n')}

  return content;
}

function getAgentType(task: any): string {
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

function getAgentFeatures(task: any): string {
  const features = [];
  
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

function getExpectedEffects(task: any): string {
  const effects = [];
  
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

// Example with Nodemailer (uncomment and configure for production):
/*
import nodemailer from 'nodemailer';

async function sendEmailWithPDF(email: string, content: string, result: AnalysisResult): Promise<boolean> {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: email,
    subject: 'JD Analysis Report',
    text: content,
    attachments: [
      {
        filename: `jd-analysis-${Date.now()}.txt`,
        content: content,
      },
    ],
  };

  await transporter.sendMail(mailOptions);
  return true;
}
*/
