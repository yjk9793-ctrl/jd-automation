'use client';

import React, { useState, useCallback } from 'react';
import { Card, Form, Button, Alert, Spinner, Row, Col } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X, HelpCircle, AlertTriangle, Brain } from 'lucide-react';
import { Language } from '@/lib/i18n';
import { useTranslation } from '@/lib/i18n';

interface JDInputProps {
  onAnalyze: (jd: string, file?: File) => void;
  isAnalyzing: boolean;
  language: Language;
}

export function JDInput({ onAnalyze, isAnalyzing, language }: JDInputProps) {
  const [jd, setJd] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const t = useTranslation(language);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      setError(null);
      
      // Read file content if it's a text file
      if (file.type === 'text/plain') {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          setJd(content);
        };
        reader.readAsText(file);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    multiple: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!jd.trim() && !uploadedFile) {
      setError(language === 'ko' ? 'JD를 입력하거나 파일을 업로드해주세요.' : 'Please enter JD or upload a file.');
      return;
    }

    onAnalyze(jd, uploadedFile || undefined);
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

  return (
    <div className="fade-in">
      <Form onSubmit={handleSubmit}>
        <Row className="g-4">
          {/* Text Input */}
          <Col md={6}>
            <Form.Group>
              <Form.Label className="fw-bold mb-3" style={{color: '#1a202c'}}>
                <FileText className="me-2" size={20} />
                {language === 'ko' ? 'JD 텍스트 입력' : 'JD Text Input'}
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={8}
                value={jd}
                onChange={(e) => setJd(e.target.value)}
                placeholder={language === 'ko' 
                  ? '분석하고 싶은 Job Description을 입력하세요...'
                  : 'Enter the Job Description you want to analyze...'
                }
                className="border-0"
                style={{
                  background: '#f8fafc',
                  borderRadius: '12px',
                  padding: '16px',
                  fontSize: '14px',
                  color: '#1a202c',
                  border: '2px solid #e2e8f0',
                  transition: 'all 0.3s ease'
                }}
                disabled={isAnalyzing}
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </Form.Group>
          </Col>

          {/* File Upload */}
          <Col md={6}>
            <Form.Group>
              <Form.Label className="fw-bold mb-3" style={{color: '#1a202c'}}>
                <Upload className="me-2" size={20} />
                {language === 'ko' ? '파일 업로드' : 'File Upload'}
              </Form.Label>
              
              <div
                {...getRootProps()}
                className={`text-center border-2 border-dashed rounded-3 cursor-pointer transition-all ${
                  isDragActive ? 'border-primary' : 'border-secondary'
                } ${isAnalyzing ? 'opacity-50' : ''}`}
                style={{ 
                  minHeight: '200px',
                  background: isDragActive ? '#f0f4ff' : '#f8fafc',
                  borderColor: isDragActive ? '#667eea' : '#e2e8f0',
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <input {...getInputProps()} disabled={isAnalyzing} />
                
                {uploadedFile ? (
                  <div>
                    <div className="p-3 rounded-circle d-inline-flex mb-3" style={{background: '#e6f3ff'}}>
                      <FileText className="text-primary" size={32} />
                    </div>
                    <h6 className="fw-bold mb-2" style={{color: '#1a202c'}}>{uploadedFile.name}</h6>
                    <p className="text-muted small mb-3">
                      {(uploadedFile.size / 1024).toFixed(1)} KB
                    </p>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile();
                      }}
                      disabled={isAnalyzing}
                      className="px-3 py-1"
                    >
                      <X className="me-1" size={16} />
                      {language === 'ko' ? '제거' : 'Remove'}
                    </Button>
                  </div>
                ) : (
                  <div>
                    <div className="p-3 rounded-circle d-inline-flex mb-3" style={{background: '#e6f3ff'}}>
                      <Upload className="text-primary" size={32} />
                    </div>
                    <h6 className="fw-bold mb-2" style={{color: '#1a202c'}}>
                      {isDragActive 
                        ? (language === 'ko' ? '파일을 여기에 놓으세요' : 'Drop file here')
                        : (language === 'ko' ? '파일을 드래그하거나 클릭하세요' : 'Drag & drop or click to select')
                      }
                    </h6>
                    <p className="text-muted small mb-0">
                      {language === 'ko' 
                        ? 'TXT, PDF, DOCX 파일 지원'
                        : 'Supports TXT, PDF, DOCX files'
                      }
                    </p>
                  </div>
                )}
              </div>
            </Form.Group>
          </Col>
        </Row>

        {/* Error Message */}
        {error && (
          <Alert variant="danger" className="border-0 mt-3" style={{background: '#fed7d7', color: '#c53030'}}>
            <AlertTriangle className="me-2" size={16} />
            {error}
          </Alert>
        )}

        {/* Submit Button */}
        <div className="text-center mt-4">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="px-5 py-3 rounded-pill fw-bold"
            disabled={isAnalyzing || (!jd.trim() && !uploadedFile)}
            style={{
              background: '#667eea',
              border: 'none',
              fontSize: '1.1rem',
              minWidth: '200px'
            }}
          >
            {isAnalyzing ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                {language === 'ko' ? '분석 중...' : 'Analyzing...'}
              </>
            ) : (
              <>
                <Brain className="me-2" size={20} />
                {language === 'ko' ? 'JD 분석 시작' : 'Start JD Analysis'}
              </>
            )}
          </Button>
        </div>

        {/* Help Text */}
        <div className="p-4 rounded-3 mt-4" style={{background: '#f8fafc', border: '1px solid #e2e8f0'}}>
          <div className="d-flex align-items-start">
            <HelpCircle className="text-primary me-3 mt-1" size={20} />
            <div>
              <h6 className="fw-bold mb-2" style={{color: '#1a202c'}}>
                {language === 'ko' ? '분석 도움말' : 'Analysis Help'}
              </h6>
              <ul className="text-muted small mb-0" style={{color: '#4a5568'}}>
                <li>
                  {language === 'ko' 
                    ? 'JD에는 직무명, 주요 업무, 자격요건, 우대사항 등이 포함되어야 합니다'
                    : 'JD should include job title, main tasks, qualifications, and preferred requirements'
                  }
                </li>
                <li>
                  {language === 'ko' 
                    ? '더 정확한 분석을 위해 구체적이고 상세한 JD를 입력해주세요'
                    : 'For more accurate analysis, please enter specific and detailed JD'
                  }
                </li>
                <li>
                  {language === 'ko' 
                    ? '파일 업로드 시 텍스트 파일(.txt)이 가장 빠르게 처리됩니다'
                    : 'Text files (.txt) are processed fastest when uploading files'
                  }
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}