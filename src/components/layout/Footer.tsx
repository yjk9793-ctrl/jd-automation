'use client';

import React from 'react';
import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap';
import { Language } from '@/lib/i18n';
import { useTranslation } from '@/lib/i18n';

interface FooterProps {
  language: Language;
}

export function Footer({ language }: FooterProps) {
  const t = useTranslation(language);

  return (
    <footer className="bg-dark text-light py-5 mt-5">
      <Container>
        <Row className="g-4">
          {/* Logo and Description */}
          <Col lg={4}>
            <div className="mb-4">
              <div className="d-flex align-items-center mb-3">
                <div className="jdx-logo d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                  <span className="text-white fw-bold fs-5">JD</span>
                </div>
                <h5 className="fw-bold mb-0 jdx-gradient">JDX</h5>
              </div>
              <p className="text-muted mb-3">
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

          {/* Product */}
          <Col lg={2}>
            <h6 className="fw-bold mb-3">{language === 'ko' ? '제품' : 'Product'}</h6>
            <Nav className="flex-column">
              <Nav.Link href="#" className="text-muted p-0 mb-2">
                {language === 'ko' ? 'JD 분석기' : 'JD Analyzer'}
              </Nav.Link>
              <Nav.Link href="#" className="text-muted p-0 mb-2">
                {language === 'ko' ? '자동화 도구' : 'Automation Tools'}
              </Nav.Link>
              <Nav.Link href="#" className="text-muted p-0 mb-2">
                {language === 'ko' ? 'AI 에이전트' : 'AI Agents'}
              </Nav.Link>
              <Nav.Link href="#" className="text-muted p-0 mb-2">
                {language === 'ko' ? 'API' : 'API'}
              </Nav.Link>
            </Nav>
          </Col>

          {/* Solution */}
          <Col lg={2}>
            <h6 className="fw-bold mb-3">{language === 'ko' ? '솔루션' : 'Solution'}</h6>
            <Nav className="flex-column">
              <Nav.Link href="#" className="text-muted p-0 mb-2">
                {language === 'ko' ? 'HR 부서' : 'HR Department'}
              </Nav.Link>
              <Nav.Link href="#" className="text-muted p-0 mb-2">
                {language === 'ko' ? '마케팅' : 'Marketing'}
              </Nav.Link>
              <Nav.Link href="#" className="text-muted p-0 mb-2">
                {language === 'ko' ? '영업' : 'Sales'}
              </Nav.Link>
              <Nav.Link href="#" className="text-muted p-0 mb-2">
                {language === 'ko' ? '개발팀' : 'Development'}
              </Nav.Link>
            </Nav>
          </Col>

          {/* Resource */}
          <Col lg={2}>
            <h6 className="fw-bold mb-3">{language === 'ko' ? '리소스' : 'Resources'}</h6>
            <Nav className="flex-column">
              <Nav.Link href="#" className="text-muted p-0 mb-2">
                {language === 'ko' ? '문서' : 'Documentation'}
              </Nav.Link>
              <Nav.Link href="#" className="text-muted p-0 mb-2">
                {language === 'ko' ? '가이드' : 'Guides'}
              </Nav.Link>
              <Nav.Link href="#" className="text-muted p-0 mb-2">
                {language === 'ko' ? 'API 레퍼런스' : 'API Reference'}
              </Nav.Link>
              <Nav.Link href="#" className="text-muted p-0 mb-2">
                {language === 'ko' ? '지원' : 'Support'}
              </Nav.Link>
            </Nav>
          </Col>

          {/* Blog */}
          <Col lg={2}>
            <h6 className="fw-bold mb-3">{language === 'ko' ? '블로그' : 'Blog'}</h6>
            <Nav className="flex-column">
              <Nav.Link href="#" className="text-muted p-0 mb-2">
                {language === 'ko' ? '최신 소식' : 'Latest News'}
              </Nav.Link>
              <Nav.Link href="#" className="text-muted p-0 mb-2">
                {language === 'ko' ? '사용 사례' : 'Case Studies'}
              </Nav.Link>
              <Nav.Link href="#" className="text-muted p-0 mb-2">
                {language === 'ko' ? '기술 블로그' : 'Tech Blog'}
              </Nav.Link>
              <Nav.Link href="#" className="text-muted p-0 mb-2">
                {language === 'ko' ? '뉴스레터' : 'Newsletter'}
              </Nav.Link>
            </Nav>
          </Col>
        </Row>

        <hr className="my-4" />

        {/* Bottom Section */}
        <Row className="align-items-center">
          <Col md={6}>
            <p className="text-muted mb-0 small">
              © 2024 JDX. {language === 'ko' ? '모든 권리 보유.' : 'All rights reserved.'}
            </p>
          </Col>
          <Col md={6}>
            <Nav className="justify-content-md-end">
              <Nav.Link href="#" className="text-muted p-0 me-3 small">
                {language === 'ko' ? '개인정보처리방침' : 'Privacy Policy'}
              </Nav.Link>
              <Nav.Link href="#" className="text-muted p-0 me-3 small">
                {language === 'ko' ? '이용약관' : 'Terms of Service'}
              </Nav.Link>
              <Nav.Link href="#" className="text-muted p-0 small">
                {language === 'ko' ? '쿠키 정책' : 'Cookie Policy'}
              </Nav.Link>
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}