'use client';

import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Language } from '@/lib/i18n';
import { useTranslation } from '@/lib/i18n';
import { Brain, Github, Twitter, Linkedin, Mail } from 'lucide-react';

interface FooterProps {
  language: Language;
}

export function Footer({ language }: FooterProps) {
  const t = useTranslation(language);

  return (
    <footer className="py-6" style={{background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)', borderTop: '1px solid rgba(255, 255, 255, 0.1)'}}>
      <Container>
        <Row className="g-4">
          {/* Logo and Description */}
          <Col lg={4}>
            <div className="mb-4">
              <div className="d-flex align-items-center mb-3">
                <div className="d-flex align-items-center justify-content-center rounded me-3" style={{
                  width: '40px', 
                  height: '40px', 
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  color: 'white'
                }}>
                  <Brain size={20} />
                </div>
                <h5 className="fw-bold mb-0" style={{color: '#ffffff'}}>JDX</h5>
              </div>
              <p className="text-muted mb-3" style={{color: '#ffffff'}}>
                {language === 'ko' 
                  ? 'AI 기반 Job Description 분석 플랫폼으로 업무 자동화의 새로운 가능성을 발견하세요.'
                  : 'Discover new possibilities for work automation with our AI-based Job Description analysis platform.'
                }
              </p>
              <div className="d-flex gap-3">
                <a href="#" className="text-muted text-decoration-none" style={{color: '#ffffff'}}>
                  <Github size={20} />
                </a>
                <a href="#" className="text-muted text-decoration-none" style={{color: '#ffffff'}}>
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-muted text-decoration-none" style={{color: '#ffffff'}}>
                  <Linkedin size={20} />
                </a>
                <a href="#" className="text-muted text-decoration-none" style={{color: '#ffffff'}}>
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </Col>

          {/* Product */}
          <Col lg={2}>
            <h6 className="fw-bold mb-3" style={{color: '#ffffff'}}>
              {language === 'ko' ? '제품' : 'Product'}
            </h6>
              <Nav className="flex-column">
                <Nav.Link href="#" className="p-0 mb-2" style={{color: '#ffffff'}}>
                  {language === 'ko' ? '기능' : 'Features'}
                </Nav.Link>
                <Nav.Link href="#" className="p-0 mb-2" style={{color: '#ffffff'}}>
                  {language === 'ko' ? '가격' : 'Pricing'}
                </Nav.Link>
                <Nav.Link href="#" className="p-0 mb-2" style={{color: '#ffffff'}}>
                  {language === 'ko' ? 'API' : 'API'}
                </Nav.Link>
                <Nav.Link href="#" className="p-0 mb-2" style={{color: '#ffffff'}}>
                  {language === 'ko' ? '통합' : 'Integrations'}
                </Nav.Link>
              </Nav>
          </Col>

          {/* Company */}
          <Col lg={2}>
            <h6 className="fw-bold mb-3" style={{color: '#ffffff'}}>
              {language === 'ko' ? '회사' : 'Company'}
            </h6>
            <Nav className="flex-column">
              <Nav.Link href="#" className="p-0 mb-2" style={{color: '#ffffff'}}>
                {language === 'ko' ? '소개' : 'About'}
              </Nav.Link>
              <Nav.Link href="#" className="p-0 mb-2" style={{color: '#ffffff'}}>
                {language === 'ko' ? '채용' : 'Careers'}
              </Nav.Link>
              <Nav.Link href="#" className="p-0 mb-2" style={{color: '#ffffff'}}>
                {language === 'ko' ? '블로그' : 'Blog'}
              </Nav.Link>
              <Nav.Link href="#" className="p-0 mb-2" style={{color: '#ffffff'}}>
                {language === 'ko' ? '뉴스' : 'News'}
              </Nav.Link>
            </Nav>
          </Col>

          {/* Resources */}
          <Col lg={2}>
            <h6 className="fw-bold mb-3" style={{color: '#ffffff'}}>
              {language === 'ko' ? '리소스' : 'Resources'}
            </h6>
            <Nav className="flex-column">
              <Nav.Link href="#" className="p-0 mb-2" style={{color: '#ffffff'}}>
                {language === 'ko' ? '도움말' : 'Help Center'}
              </Nav.Link>
              <Nav.Link href="#" className="p-0 mb-2" style={{color: '#ffffff'}}>
                {language === 'ko' ? '문서' : 'Documentation'}
              </Nav.Link>
              <Nav.Link href="#" className="p-0 mb-2" style={{color: '#ffffff'}}>
                {language === 'ko' ? '커뮤니티' : 'Community'}
              </Nav.Link>
              <Nav.Link href="#" className="p-0 mb-2" style={{color: '#ffffff'}}>
                {language === 'ko' ? '상태' : 'Status'}
              </Nav.Link>
            </Nav>
          </Col>

          {/* Contact */}
          <Col lg={2}>
            <h6 className="fw-bold mb-3" style={{color: '#ffffff'}}>
              {language === 'ko' ? '문의' : 'Contact'}
            </h6>
            <Nav className="flex-column">
              <Nav.Link href="#" className="p-0 mb-2" style={{color: '#ffffff'}}>
                {language === 'ko' ? '지원' : 'Support'}
              </Nav.Link>
              <Nav.Link href="#" className="p-0 mb-2" style={{color: '#ffffff'}}>
                {language === 'ko' ? '영업' : 'Sales'}
              </Nav.Link>
              <Nav.Link href="#" className="p-0 mb-2" style={{color: '#ffffff'}}>
                {language === 'ko' ? '파트너십' : 'Partnership'}
              </Nav.Link>
              <Nav.Link href="#" className="p-0 mb-2" style={{color: '#ffffff'}}>
                {language === 'ko' ? '문의하기' : 'Contact Us'}
              </Nav.Link>
            </Nav>
          </Col>
        </Row>

        <hr className="my-4" style={{borderColor: 'rgba(255, 255, 255, 0.1)'}} />

        {/* Bottom Section */}
        <Row className="align-items-center">
          <Col md={6}>
            <p className="text-muted mb-0 small" style={{color: '#ffffff'}}>
              © 2024 JDX. {language === 'ko' ? '모든 권리 보유.' : 'All rights reserved.'}
            </p>
          </Col>
          <Col md={6}>
            <Nav className="justify-content-md-end">
              <Nav.Link href="#" className="p-0 me-3 small" style={{color: '#ffffff'}}>
                {language === 'ko' ? '서비스이용약관' : 'Terms of Service'}
              </Nav.Link>
              <Nav.Link href="#" className="p-0 me-3 small" style={{color: '#ffffff'}}>
                {language === 'ko' ? '개인정보처리방침' : 'Privacy Policy'}
              </Nav.Link>
              <Nav.Link href="#" className="p-0 small" style={{color: '#ffffff'}}>
                {language === 'ko' ? '쿠키 정책' : 'Cookie Policy'}
              </Nav.Link>
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}