'use client';

import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { LanguageToggle } from './LanguageToggle';
import { useTranslation, Language } from '@/lib/i18n';
import { Brain } from 'lucide-react';

interface HeaderProps {
  language: Language;
  onLanguageChange?: (language: Language) => void;
}

export function Header({ language, onLanguageChange }: HeaderProps) {
  const t = useTranslation(language);

  return (
    <Navbar expand="lg" className="py-4" style={{background: 'rgba(10, 10, 10, 0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)'}}>
      <Container>
        {/* Logo and Title */}
        <Navbar.Brand href="/" className="d-flex align-items-center text-decoration-none">
          <div className="d-flex align-items-center">
            {/* JDX Icon */}
            <div className="me-3">
              <div className="d-flex align-items-center justify-content-center rounded" style={{
                width: '40px', 
                height: '40px', 
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                color: 'white'
              }}>
                <Brain size={20} />
              </div>
            </div>
            
            {/* Text Area */}
            <div className="d-none d-sm-block">
              <h1 className="h5 fw-bold mb-0" style={{color: '#ffffff'}}>
                JDX
              </h1>
              <p className="small mb-0" style={{color: '#ffffff'}}>
                {t.hero.subtitle}
              </p>
            </div>
          </div>
        </Navbar.Brand>

        {/* Navigation */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" style={{borderColor: '#3b82f6'}} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features" style={{color: '#ffffff'}} className="px-3">
              {language === 'ko' ? '기능' : 'Features'}
            </Nav.Link>
            <Nav.Link href="#pricing" style={{color: '#ffffff'}} className="px-3">
              {language === 'ko' ? '가격' : 'Pricing'}
            </Nav.Link>
            <Nav.Link href="#about" style={{color: '#ffffff'}} className="px-3">
              {language === 'ko' ? '소개' : 'About'}
            </Nav.Link>
            <Nav.Link href="#contact" style={{color: '#ffffff'}} className="px-3">
              {language === 'ko' ? '문의' : 'Contact'}
            </Nav.Link>
          </Nav>

          {/* Right Action Buttons */}
          <div className="d-flex align-items-center gap-3">
            {/* Language Toggle */}
            {onLanguageChange && (
              <LanguageToggle 
                currentLanguage={language} 
                onLanguageChange={onLanguageChange} 
              />
            )}

            {/* Login Button */}
            <Button
              variant="outline-light"
              size="sm"
              className="px-3 py-2"
              style={{borderColor: '#6b7280', color: '#ffffff'}}
            >
              {language === 'ko' ? '로그인' : 'Login'}
            </Button>

            {/* CTA Button */}
            <Button
              variant="primary"
              size="sm"
              className="px-4 py-2"
              style={{background: '#3b82f6', border: 'none'}}
            >
              {language === 'ko' ? '무료 시작하기' : 'Start Free'}
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}