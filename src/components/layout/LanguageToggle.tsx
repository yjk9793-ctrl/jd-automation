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
        variant={currentLanguage === 'ko' ? 'primary' : 'outline-primary'}
        onClick={() => handleLanguageClick('ko')}
        className="btn-jdx-outline"
      >
        🇰🇷 KO
      </Button>
      <Button
        variant={currentLanguage === 'en' ? 'primary' : 'outline-primary'}
        onClick={() => handleLanguageClick('en')}
        className="btn-jdx-outline"
      >
        🇺🇸 EN
      </Button>
    </ButtonGroup>
  );
}