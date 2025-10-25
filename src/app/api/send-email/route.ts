import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { AnalysisResult } from '@/types';

const EmailRequestSchema = z.object({
  email: z.string().email('Invalid email address'),
  analysisResult: z.object({
    id: z.string(),
    type: z.enum(['enterprise', 'personal']),
    jobRole: z.string().optional(),
    summary: z.object({
      total: z.number(),
      automate: z.number(),
      copilot: z.number(),
      humanCritical: z.number(),
      averageScore: z.number(),
      estimatedROI: z.number(),
      automationPotential: z.number(),
    }),
    tasks: z.array(z.object({
      id: z.string(),
      title: z.string(),
      sourceText: z.string(),
      category: z.enum(['Automate', 'AI-Copilot', 'Human-Critical']),
      score: z.number(),
      roiEstimate: z.number(),
      difficulty: z.number().min(1).max(5),
      risks: z.array(z.string()),
      safeguards: z.array(z.string()),
      tools: z.array(z.object({
        name: z.string(),
        purpose: z.string(),
        alternatives: z.array(z.string()),
      })),
      reasoning: z.string(),
      estimatedTime: z.string(),
    })),
    recommendations: z.array(z.string()),
    nextSteps: z.array(z.string()),
    createdAt: z.string(),
  }),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = EmailRequestSchema.parse(body);
    const { email, analysisResult } = validatedData;

    // Generate email content
    const emailContent = generateEmailContent(analysisResult);

    // Send email (mock implementation)
    await sendEmail(email, emailContent);

    return NextResponse.json({
      success: true,
      message: 'Analysis results sent successfully',
    });

  } catch (error) {
    console.error('Email sending error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Invalid request data',
        details: error.errors,
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      error: 'Failed to send email. Please try again.',
    }, { status: 500 });
  }
}

function generateEmailContent(result: AnalysisResult): string {
  const { summary, tasks, recommendations, nextSteps } = result;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>AI Agent Analysis Results</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
        .summary { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .task { background: white; padding: 15px; margin-bottom: 15px; border-radius: 8px; border-left: 4px solid #667eea; }
        .recommendations { background: #e8f4fd; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .next-steps { background: #f0f8f0; padding: 20px; border-radius: 8px; }
        .metric { display: inline-block; margin: 10px 20px 10px 0; }
        .metric-value { font-size: 24px; font-weight: bold; color: #667eea; }
        .metric-label { font-size: 14px; color: #666; }
        h1, h2, h3 { color: #333; }
        .category-automate { border-left-color: #28a745; }
        .category-copilot { border-left-color: #ffc107; }
        .category-human { border-left-color: #dc3545; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>AI Agent Analysis Results</h1>
          <p>Your ${result.type === 'enterprise' ? 'Enterprise' : 'Personal'} Analysis Report</p>
        </div>
        
        <div class="content">
          <div class="summary">
            <h2>Analysis Summary</h2>
            <div class="metric">
              <div class="metric-value">${summary.total}</div>
              <div class="metric-label">Total Tasks</div>
            </div>
            <div class="metric">
              <div class="metric-value">${summary.automate}</div>
              <div class="metric-label">Fully Automatable</div>
            </div>
            <div class="metric">
              <div class="metric-value">${summary.copilot}</div>
              <div class="metric-label">AI Copilot</div>
            </div>
            <div class="metric">
              <div class="metric-value">${summary.humanCritical}</div>
              <div class="metric-label">Human Critical</div>
            </div>
            <div class="metric">
              <div class="metric-value">${summary.averageScore}%</div>
              <div class="metric-label">Average Score</div>
            </div>
            <div class="metric">
              <div class="metric-value">${summary.estimatedROI}%</div>
              <div class="metric-label">Estimated ROI</div>
            </div>
            <div class="metric">
              <div class="metric-value">${summary.automationPotential}%</div>
              <div class="metric-label">Automation Potential</div>
            </div>
          </div>

          <h2>Task Analysis</h2>
          ${tasks.map(task => `
            <div class="task category-${task.category.toLowerCase().replace('-', '')}">
              <h3>${task.title}</h3>
              <p><strong>Category:</strong> ${task.category}</p>
              <p><strong>Score:</strong> ${task.score}/100</p>
              <p><strong>ROI Estimate:</strong> ${task.roiEstimate}%</p>
              <p><strong>Difficulty:</strong> ${task.difficulty}/5</p>
              <p><strong>Estimated Time:</strong> ${task.estimatedTime}</p>
              <p><strong>Reasoning:</strong> ${task.reasoning}</p>
            </div>
          `).join('')}

          <div class="recommendations">
            <h2>Recommendations</h2>
            <ul>
              ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
          </div>

          <div class="next-steps">
            <h2>Next Steps</h2>
            <ol>
              ${nextSteps.map(step => `<li>${step}</li>`).join('')}
            </ol>
          </div>

          <p style="margin-top: 30px; text-align: center; color: #666;">
            This analysis was generated by AI Agent Transformation Platform.<br>
            For more information, visit our website or contact our consulting team.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

async function sendEmail(email: string, content: string): Promise<void> {
  // Mock email sending
  console.log(`Sending email to: ${email}`);
  console.log('Email content length:', content.length);
  
  // In production, implement actual email sending using:
  // - SendGrid
  // - AWS SES
  // - Nodemailer with SMTP
  // - Resend
  
  // Example with Nodemailer:
  // const nodemailer = require('nodemailer');
  // const transporter = nodemailer.createTransporter({
  //   service: 'gmail',
  //   auth: {
  //     user: process.env.EMAIL_USER,
  //     pass: process.env.EMAIL_PASS,
  //   },
  // });
  // 
  // await transporter.sendMail({
  //   from: process.env.EMAIL_USER,
  //   to: email,
  //   subject: 'AI Agent Analysis Results',
  //   html: content,
  // });
}
