'use client';

import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Language } from '@/lib/i18n';
import { useTranslation } from '@/lib/i18n';

interface FooterProps {
  language: Language;
}

export function Footer({ language }: FooterProps) {
  const t = useTranslation(language);

  return (
    <footer className="py-5" style={{background: '#f8fafc', borderTop: '1px solid #e2e8f0'}}>
      <Container>
        <Row className="g-4">
          {/* Logo and Description */}
          <Col lg={4}>
            <div className="mb-4">
              <div className="d-flex align-items-center mb-3">
                <div className="d-flex align-items-center justify-content-center rounded me-3" style={{
                  width: '40px', 
                  height: '40px', 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white'
                }}>
                  <span className="fw-bold fs-5">JD</span>
                </div>
                <h5 className="fw-bold mb-0" style={{color: '#1a202c'}}>JDX</h5>
              </div>
              <p className="text-muted mb-3" style={{color: '#4a5568'}}>
                {language === 'ko' 
                  ? 'AI 기반 Job Description 분석 플랫폼으로 업무 자동화의 새로운 가능성을 발견하세요.'
                  : 'Discover new possibilities for work automation with our AI-based Job Description analysis platform.'
                }
              </p>
              <div className="d-flex gap-2">
                <a href="#" className="text-muted text-decoration-none">
                  <i className="bi bi-twitter fs-5"></i>
                </a>
                <a href="#" className="text-muted text-decoration-none">
                  <i className="bi bi-linkedin fs-5"></i>
                </a>
                <a href="#" className="text-muted text-decoration-none">
                  <i className="bi bi-github fs-5"></i>
                </a>
              </div>
            </div>
          </Col>

          {/* Services */}
          <Col lg={2}>
            <h6 className="fw-bold mb-3" style={{color: '#1a202c'}}>
              {language === 'ko' ? '서비스' : 'Services'}
            </h6>
            <Nav className="flex-column">
              <Nav.Link href="#" className="p-0 mb-2" style={{color: '#4a5568'}}>
                {language === 'ko' ? 'JD 분석기' : 'JD Analyzer'}
              </Nav.Link>
              <Nav.Link href="#" className="p-0 mb-2" style={{color: '#4a5568'}}>
                {language === 'ko' ? 'AI 에이전트 추천' : 'AI Agent Recommendation'}
              </Nav.Link>
              <Nav.Link href="#" className="p-0 mb-2" style={{color: '#4a5568'}}>
                {language === 'ko' ? '맞춤형 솔루션' : 'Customized Solutions'}
              </Nav.Link>
              <Nav.Link href="#" className="p-0 mb-2" style={{color: '#4a5568'}}>
                {language === 'ko' ? 'API' : 'API'}
              </Nav.Link>
            </Nav>
          </Col>

          {/* Success Cases */}
          <Col lg={2}>
            <h6 className="fw-bold mb-3" style={{color: '#1a202c'}}>
              {language === 'ko' ? '성공사례' : 'Success Cases'}
            </h6>
            <Nav className="flex-column">
              <Nav.Link href="#" className="p-0 mb-2" style={{color: '#4a5568'}}>
                {language === 'ko' ? 'IT 기업' : 'IT Companies'}
              </Nav.Link>
              <Nav.Link href="#" className="p-0 mb-2" style={{color: '#4a5568'}}>
                {language === 'ko' ? '제조업' : 'Manufacturing'}
              </Nav.Link>
              <Nav.Link href="#" className="p-0 mb-2" style={{color: '#4a5568'}}>
                {language === 'ko' ? '금융 서비스' : 'Financial Services'}
              </Nav.Link>
              <Nav.Link href="#" className="p-0 mb-2" style={{color: '#4a5568'}}>
                {language === 'ko' ? '마케팅' : 'Marketing'}
              </Nav.Link>
            </Nav>
          </Col>

          {/* Resources */}
          <Col lg={2}>
            <h6 className="fw-bold mb-3" style={{color: '#1a202c'}}>
              {language === 'ko' ? '리소스' : 'Resources'}
            </h6>
            <Nav className="flex-column">
              <Nav.Link href="#" className="p-0 mb-2" style={{color: '#4a5568'}}>
                {language === 'ko' ? '서비스 소개서' : 'Service Brochure'}
              </Nav.Link>
              <Nav.Link href="#" className="p-0 mb-2" style={{color: '#4a5568'}}>
                {language === 'ko' ? '이용가이드' : 'User Guide'}
              </Nav.Link>
              <Nav.Link href="#" className="p-0 mb-2" style={{color: '#4a5568'}}>
                {language === 'ko' ? '업데이트 소식' : 'Updates'}
              </Nav.Link>
              <Nav.Link href="#" className="p-0 mb-2" style={{color: '#4a5568'}}>
                {language === 'ko' ? '뉴스룸' : 'Newsroom'}
              </Nav.Link>
            </Nav>
          </Col>

          {/* Experience */}
          <Col lg={2}>
            <h6 className="fw-bold mb-3" style={{color: '#1a202c'}}>
              {language === 'ko' ? '체험' : 'Experience'}
            </h6>
            <Nav className="flex-column">
              <Nav.Link href="#" className="p-0 mb-2" style={{color: '#4a5568'}}>
                {language === 'ko' ? '브랜드 카드 발급체험' : 'Brand Card Experience'}
              </Nav.Link>
              <Nav.Link href="#" className="p-0 mb-2" style={{color: '#4a5568'}}>
                {language === 'ko' ? 'JD 분석 진단평가' : 'JD Analysis Assessment'}
              </Nav.Link>
              <Nav.Link href="#" className="p-0 mb-2" style={{color: '#4a5568'}}>
                {language === 'ko' ? '블로그' : 'Blog'}
              </Nav.Link>
              <Nav.Link href="#" className="p-0 mb-2" style={{color: '#4a5568'}}>
                {language === 'ko' ? '팀 JDX' : 'Team JDX'}
              </Nav.Link>
            </Nav>
          </Col>
        </Row>

        <hr className="my-4" style={{borderColor: '#e2e8f0'}} />

        {/* Bottom Section */}
        <Row className="align-items-center">
          <Col md={6}>
            <p className="text-muted mb-0 small" style={{color: '#4a5568'}}>
              © 2024 JDX. {language === 'ko' ? '모든 권리 보유.' : 'All rights reserved.'}
            </p>
          </Col>
          <Col md={6}>
            <Nav className="justify-content-md-end">
              <Nav.Link href="#" className="p-0 me-3 small" style={{color: '#4a5568'}}>
                {language === 'ko' ? '서비스이용약관' : 'Terms of Service'}
              </Nav.Link>
              <Nav.Link href="#" className="p-0 me-3 small" style={{color: '#4a5568'}}>
                {language === 'ko' ? '개인정보처리방침' : 'Privacy Policy'}
              </Nav.Link>
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}