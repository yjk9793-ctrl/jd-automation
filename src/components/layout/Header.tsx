'use client';

import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { LanguageToggle } from './LanguageToggle';
import { useTranslation, Language } from '@/lib/i18n';

interface HeaderProps {
  language: Language;
  onLanguageChange?: (language: Language) => void;
}

export function Header({ language, onLanguageChange }: HeaderProps) {
  const t = useTranslation(language);

  return (
    <Navbar expand="lg" className="jdx-navbar sticky-top">
      <Container>
        {/* Logo and Title */}
        <Navbar.Brand href="/" className="d-flex align-items-center text-decoration-none">
          <div className="d-flex align-items-center">
            {/* JDX Icon */}
            <div className="position-relative me-3">
              <div className="jdx-logo d-flex align-items-center justify-content-center jdx-glow" style={{width: '40px', height: '40px'}}>
                <span className="text-white fw-bold fs-5 jdx-pulse">JD</span>
              </div>
              {/* Glow effect */}
              <div className="position-absolute top-0 start-0 w-100 h-100 rounded-3 bg-gradient opacity-0 opacity-100 opacity-0 blur-sm transition-opacity" style={{background: 'linear-gradient(135deg, #6f42c1, #9c27b0)'}}></div>
              {/* Rotating border */}
              <div className="position-absolute top-0 start-0 w-100 h-100 rounded-3 border-2 border-primary opacity-0 opacity-100 opacity-0 jdx-rotate transition-opacity"></div>
            </div>
            
            {/* Text Area */}
            <div className="d-none d-sm-block">
              <h1 className="h5 fw-bold mb-0 jdx-gradient">
                JDX <span className="fs-6 fw-normal text-primary">(Transformation)</span>
              </h1>
              <p className="small text-muted mb-0">
                {t.hero.subtitle}
              </p>
            </div>
          </div>
        </Navbar.Brand>

        {/* Right Action Buttons */}
        <div className="d-flex align-items-center gap-2">
          {/* Language Toggle */}
          {onLanguageChange && (
            <LanguageToggle 
              currentLanguage={language} 
              onLanguageChange={onLanguageChange} 
            />
          )}

          {/* Theme Toggle */}
          <Button
            variant="outline-secondary"
            size="sm"
            className="btn-jdx-outline"
            onClick={() => {
              const currentTheme = document.documentElement.getAttribute('data-bs-theme');
              const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
              document.documentElement.setAttribute('data-bs-theme', newTheme);
            }}
          >
            <i className="bi bi-sun-fill"></i>
          </Button>
        </div>
      </Container>
    </Navbar>
  );
}