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
    <Navbar expand="lg" className="py-3" style={{background: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.1)'}}>
      <Container>
        {/* Logo and Title */}
        <Navbar.Brand href="/" className="d-flex align-items-center text-decoration-none">
          <div className="d-flex align-items-center">
            {/* JDX Icon */}
            <div className="me-3">
              <div className="d-flex align-items-center justify-content-center rounded" style={{
                width: '40px', 
                height: '40px', 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white'
              }}>
                <span className="fw-bold fs-5">JD</span>
              </div>
            </div>
            
            {/* Text Area */}
            <div className="d-none d-sm-block">
              <h1 className="h5 fw-bold mb-0" style={{color: '#1a202c'}}>
                JDX
              </h1>
              <p className="small mb-0" style={{color: '#4a5568'}}>
                {t.hero.subtitle}
              </p>
            </div>
          </div>
        </Navbar.Brand>

        {/* Navigation */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features" style={{color: '#4a5568'}}>
              {language === 'ko' ? '서비스' : 'Services'}
            </Nav.Link>
            <Nav.Link href="#cases" style={{color: '#4a5568'}}>
              {language === 'ko' ? '성공사례' : 'Success Cases'}
            </Nav.Link>
            <Nav.Link href="#resources" style={{color: '#4a5568'}}>
              {language === 'ko' ? '리소스' : 'Resources'}
            </Nav.Link>
            <Nav.Link href="#pricing" style={{color: '#4a5568'}}>
              {language === 'ko' ? '플랜안내' : 'Pricing'}
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
              variant="outline-secondary"
              size="sm"
              className="px-3 py-2"
              style={{borderColor: '#e2e8f0', color: '#4a5568'}}
            >
              {language === 'ko' ? '로그인' : 'Login'}
            </Button>

            {/* CTA Button */}
            <Button
              variant="primary"
              size="sm"
              className="px-4 py-2"
              style={{background: '#667eea', border: 'none'}}
            >
              {language === 'ko' ? '도입 문의' : 'Contact Us'}
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}