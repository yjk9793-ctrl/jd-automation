'use client';

import React, { useState, useCallback } from 'react';
import { Card, Form, Button, Alert, Spinner, Row, Col } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X, HelpCircle } from 'lucide-react';
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
              <Form.Label className="fw-bold mb-3">
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
                className="form-control-jdx"
                disabled={isAnalyzing}
              />
            </Form.Group>
          </Col>

          {/* File Upload */}
          <Col md={6}>
            <Form.Group>
              <Form.Label className="fw-bold mb-3">
                <Upload className="me-2" size={20} />
                {language === 'ko' ? '파일 업로드' : 'File Upload'}
              </Form.Label>
              
              <div
                {...getRootProps()}
                className={`jdx-card p-4 text-center border-2 border-dashed rounded-3 cursor-pointer transition-all ${
                  isDragActive ? 'border-primary bg-primary bg-opacity-10' : 'border-secondary'
                } ${isAnalyzing ? 'opacity-50' : ''}`}
                style={{ minHeight: '200px' }}
              >
                <input {...getInputProps()} disabled={isAnalyzing} />
                
                {uploadedFile ? (
                  <div>
                    <div className="jdx-card p-3 rounded-circle d-inline-flex mb-3">
                      <FileText className="text-primary" size={32} />
                    </div>
                    <h6 className="fw-bold mb-2">{uploadedFile.name}</h6>
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
                    >
                      <X className="me-1" size={16} />
                      {language === 'ko' ? '제거' : 'Remove'}
                    </Button>
                  </div>
                ) : (
                  <div>
                    <div className="jdx-card p-3 rounded-circle d-inline-flex mb-3 jdx-glow">
                      <Upload className="text-primary" size={32} />
                    </div>
                    <h6 className="fw-bold mb-2">
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
          <Alert variant="danger" className="alert-jdx mt-3">
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
            className="btn-jdx px-5 py-3 rounded-pill"
            disabled={isAnalyzing || (!jd.trim() && !uploadedFile)}
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
        <div className="jdx-card p-4 rounded-3 mt-4">
          <div className="d-flex align-items-start">
            <HelpCircle className="text-info me-3 mt-1" size={20} />
            <div>
              <h6 className="fw-bold mb-2">
                {language === 'ko' ? '분석 도움말' : 'Analysis Help'}
              </h6>
              <ul className="text-muted small mb-0">
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