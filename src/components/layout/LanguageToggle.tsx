'use client';

import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
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
        variant={currentLanguage === 'ko' ? 'primary' : 'outline-light'}
        onClick={() => handleLanguageClick('ko')}
        className="px-3 py-2"
        style={{
          background: currentLanguage === 'ko' ? '#3b82f6' : 'transparent',
          borderColor: '#6b7280',
          color: currentLanguage === 'ko' ? 'white' : '#ffffff',
          border: '1px solid #6b7280'
        }}
      >
        🇰🇷 KO
      </Button>
      <Button
        variant={currentLanguage === 'en' ? 'primary' : 'outline-light'}
        onClick={() => handleLanguageClick('en')}
        className="px-3 py-2"
        style={{
          background: currentLanguage === 'en' ? '#3b82f6' : 'transparent',
          borderColor: '#6b7280',
          color: currentLanguage === 'en' ? 'white' : '#ffffff',
          border: '1px solid #6b7280'
        }}
      >
        🇺🇸 EN
      </Button>
    </ButtonGroup>
  );
}