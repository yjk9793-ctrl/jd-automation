'use client';

import React from 'react';
import Link from 'next/link';
import { Brain, Mail, MapPin, User } from 'lucide-react';
import { Language } from '@/lib/i18n';

interface FooterProps {
  language: Language;
}

export function Footer({ language }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const footerContent = {
    ko: {
      product: {
        title: 'Product',
        links: [
          { name: '유저 행동 분석', href: '/analysis' },
          { name: '인게이지먼트', href: '/engagement' },
          { name: '데이터 인프라', href: '/infrastructure' }
        ]
      },
      solution: {
        title: 'Solution',
        links: [
          { name: '게임', href: '/solutions/game' },
          { name: '이커머스', href: '/solutions/ecommerce' },
          { name: '미디어', href: '/solutions/media' }
        ]
      },
      resource: {
        title: 'Resource',
        links: [
          { name: '온보딩 가이드', href: '/guide' },
          { name: '개발 문서', href: '/docs' },
          { name: '유저 가이드', href: '/user-guide' },
          { name: '자주 묻는 질문', href: '/faq' },
          { name: 'Release Note', href: '/releases' }
        ]
      },
      blog: {
        title: 'Blog',
        links: [
          { name: 'Blog', href: '/blog' },
          { name: '고객사례', href: '/case-studies' }
        ]
      },
      company: {
        title: 'Company',
        links: [
          { name: '회사 소개', href: '/about' },
          { name: '기업 문화', href: '/culture' },
          { name: '뉴스', href: '/news' }
        ]
      },
      legal: {
        privacy: '개인정보 이용방침',
        copyright: `Copyright ${currentYear} ©JDX. All Rights Reserved.`,
        representative: '대표자 : YoungJong Kim',
        businessNumber: '사업자등록번호 : 123-45-67890',
        address: '주소 : 서울특별시 강남구 테헤란로 123',
        contact: '문의 : info@jdx.ai'
      }
    },
    en: {
      product: {
        title: 'Product',
        links: [
          { name: 'User Behavior Analysis', href: '/analysis' },
          { name: 'Engagement', href: '/engagement' },
          { name: 'Data Infrastructure', href: '/infrastructure' }
        ]
      },
      solution: {
        title: 'Solution',
        links: [
          { name: 'Gaming', href: '/solutions/game' },
          { name: 'E-commerce', href: '/solutions/ecommerce' },
          { name: 'Media', href: '/solutions/media' }
        ]
      },
      resource: {
        title: 'Resource',
        links: [
          { name: 'Onboarding Guide', href: '/guide' },
          { name: 'Developer Docs', href: '/docs' },
          { name: 'User Guide', href: '/user-guide' },
          { name: 'FAQ', href: '/faq' },
          { name: 'Release Note', href: '/releases' }
        ]
      },
      blog: {
        title: 'Blog',
        links: [
          { name: 'Blog', href: '/blog' },
          { name: 'Case Studies', href: '/case-studies' }
        ]
      },
      company: {
        title: 'Company',
        links: [
          { name: 'About Us', href: '/about' },
          { name: 'Culture', href: '/culture' },
          { name: 'News', href: '/news' }
        ]
      },
      legal: {
        privacy: 'Privacy Policy',
        copyright: `Copyright ${currentYear} ©JDX. All Rights Reserved.`,
        representative: 'Representative : YoungJong Kim',
        businessNumber: 'Business Registration : 123-45-67890',
        address: 'Address : 123 Teheran-ro, Gangnam-gu, Seoul',
        contact: 'Contact : info@jdx.ai'
      }
    }
  };

  const content = footerContent[language];

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* 상단 섹션 */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 mb-12">
          {/* 로고 */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">JDX</span>
            </Link>
          </div>

          {/* 네비게이션 링크들 */}
          <div className="md:col-span-5 grid grid-cols-2 md:grid-cols-5 gap-8">
            {/* Product */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">
                {content.product.title}
              </h3>
              <ul className="space-y-2">
                {content.product.links.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solution */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">
                {content.solution.title}
              </h3>
              <ul className="space-y-2">
                {content.solution.links.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resource */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">
                {content.resource.title}
              </h3>
              <ul className="space-y-2">
                {content.resource.links.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Blog */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">
                {content.blog.title}
              </h3>
              <ul className="space-y-2">
                {content.blog.links.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">
                {content.company.title}
              </h3>
              <ul className="space-y-2">
                {content.company.links.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 하단 섹션 */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* 개인정보 처리방침 */}
            <div>
              <Link 
                href="/privacy"
                className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
              >
                {content.legal.privacy}
              </Link>
            </div>

            {/* 저작권 및 회사 정보 */}
            <div className="text-gray-300 text-sm space-y-1">
              <div className="mb-2">
                {content.legal.copyright}
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:gap-4 space-y-1 md:space-y-0">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{content.legal.representative}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{content.legal.businessNumber}</span>
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:gap-4 space-y-1 md:space-y-0">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{content.legal.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>{content.legal.contact}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
