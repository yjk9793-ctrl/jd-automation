'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileText, X, Loader2 } from 'lucide-react';
import { JDInput as JDInputType } from '@/types';

interface JDInputProps {
  onAnalyze: (jd: JDInputType) => void;
  isLoading?: boolean;
  sampleData?: string;
}

export function JDInput({ onAnalyze, isLoading = false, sampleData }: JDInputProps) {
  const [text, setText] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploadedFile(file);

    try {
      const fileText = await readFileAsText(file);
      setText(fileText);
    } catch (error) {
      console.error('파일 읽기 실패:', error);
      alert('파일을 읽을 수 없습니다. 텍스트 파일(.txt, .md)만 지원됩니다.');
      setUploadedFile(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'text/markdown': ['.md'],
      'application/pdf': ['.pdf'],
    },
    multiple: false,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const readFileAsText = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  const handleAnalyze = () => {
    if (!text.trim()) {
      alert('JD 텍스트를 입력하거나 파일을 업로드해주세요.');
      return;
    }

    const jdInput: JDInputType = {
      text: text.trim(),
      fileName: uploadedFile?.name,
      fileType: uploadedFile?.type,
    };

    onAnalyze(jdInput);
  };

  const handleSampleData = () => {
    if (sampleData) {
      setText(sampleData);
      setUploadedFile(null);
    }
  };

  const clearInput = () => {
    setText('');
    setUploadedFile(null);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Job Description 입력
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 파일 업로드 영역 */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-primary bg-primary/5'
              : 'border-muted-foreground/25 hover:border-primary/50'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          {isDragActive ? (
            <p className="text-primary font-medium">파일을 여기에 놓으세요...</p>
          ) : (
            <div>
              <p className="text-lg font-medium mb-2">파일을 드래그하거나 클릭하여 업로드</p>
              <p className="text-sm text-muted-foreground">
                PDF, TXT, MD 파일 지원 (최대 10MB)
              </p>
            </div>
          )}
        </div>

        {/* 업로드된 파일 정보 */}
        {uploadedFile && (
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="text-sm font-medium">{uploadedFile.name}</span>
              <span className="text-xs text-muted-foreground">
                ({(uploadedFile.size / 1024).toFixed(1)} KB)
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setUploadedFile(null)}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* 텍스트 입력 영역 */}
        <div className="space-y-2">
          <label htmlFor="jd-text" className="text-sm font-medium">
            또는 직접 텍스트 입력
          </label>
          <Textarea
            id="jd-text"
            placeholder="Job Description을 여기에 입력하세요..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[300px] resize-none"
            disabled={isLoading}
          />
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>{text.length.toLocaleString()}자</span>
            {text.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearInput}
                className="h-6 px-2 text-xs"
              >
                <X className="h-3 w-3 mr-1" />
                지우기
              </Button>
            )}
          </div>
        </div>

        {/* 액션 버튼들 */}
        <div className="flex gap-3">
          <Button
            onClick={handleAnalyze}
            disabled={!text.trim() || isLoading}
            className="flex-1"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                분석 중...
              </>
            ) : (
              'JD 분석 시작'
            )}
          </Button>
          
          {sampleData && (
            <Button
              variant="outline"
              onClick={handleSampleData}
              disabled={isLoading}
            >
              데모 데이터
            </Button>
          )}
        </div>

        {/* 도움말 */}
        <div className="text-xs text-muted-foreground space-y-1">
          <p>• 최소 10자 이상의 텍스트가 필요합니다</p>
          <p>• 업무 내용, 자격 요건, 우대 사항이 포함된 JD를 입력해주세요</p>
          <p>• 분석 결과는 브라우저에만 저장되며, 서버에는 전송되지 않습니다</p>
        </div>
      </CardContent>
    </Card>
  );
}
