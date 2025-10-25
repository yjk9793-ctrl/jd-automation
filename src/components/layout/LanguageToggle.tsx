'use client';

import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { Globe } from 'lucide-react';
import { Language } from '@/lib/i18n';

interface LanguageToggleProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export function LanguageToggle({ currentLanguage, onLanguageChange }: LanguageToggleProps) {
  const handleLanguageClick = (language: Language) => {
    console.log('Language toggle clicked:', language);
    onLanguageChange(language);
  };

  return (
    <ButtonGroup size="sm">
      <Button
        variant={currentLanguage === 'ko' ? 'primary' : 'outline-secondary'}
        onClick={() => handleLanguageClick('ko')}
        className="px-3 py-2"
        style={{
          background: currentLanguage === 'ko' ? '#667eea' : 'transparent',
          borderColor: '#e2e8f0',
          color: currentLanguage === 'ko' ? 'white' : '#4a5568',
          border: '1px solid #e2e8f0'
        }}
      >
        🇰🇷 KO
      </Button>
      <Button
        variant={currentLanguage === 'en' ? 'primary' : 'outline-secondary'}
        onClick={() => handleLanguageClick('en')}
        className="px-3 py-2"
        style={{
          background: currentLanguage === 'en' ? '#667eea' : 'transparent',
          borderColor: '#e2e8f0',
          color: currentLanguage === 'en' ? 'white' : '#4a5568',
          border: '1px solid #e2e8f0'
        }}
      >
        🇺🇸 EN
      </Button>
    </ButtonGroup>
  );
}