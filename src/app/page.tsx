'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Search, 
  User, 
  FileText, 
  Target, 
  ArrowRight, 
  Play, 
  ChevronRight,
  Star,
  TrendingUp, 
  Zap, 
  Brain,
  Shield,
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  BarChart3,
  PieChart,
  Activity,
  Clock,
  DollarSign,
  Users, 
  Building2,
  Lightbulb,
  Rocket,
  Award,
  Globe,
  Menu,
  X,
  Eye,
  Calendar,
  Download
} from 'lucide-react';
import { Language, AnalysisType, IndustryFeedback, ProcessStep, ContactForm, AnalysisResult } from '@/types';
import { useTranslation } from '@/lib/i18n';
import { AnalysisForm } from '@/components/AnalysisForm';
import { AnalysisResults } from '@/components/AnalysisResults';
import { AnalysisDetailPage } from '@/components/AnalysisDetailPage';
import { 
  TypingAnimation, 
  ParticleAnimation, 
  FloatingElements, 
  GlowEffect, 
  TextReveal, 
  PulseButton 
} from '@/components/animations/HeroAnimations';

export default function HomePage() {
  const [language, setLanguage] = useState<Language>('ko');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'enterprise' | 'personal'>('enterprise');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showDetailPage, setShowDetailPage] = useState(false);
  const [contactForm, setContactForm] = useState<ContactForm>({
    name: '',
    department: '',
    email: '',
    company: '',
    inquiry: '',
    type: 'general',
  });

  const t = useTranslation(language);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  // Demo data
  const industryFeedback: IndustryFeedback[] = t.success.feedback.map((feedback, index) => ({
    id: `feedback-${index}`,
    ...feedback,
    logo: `/logos/company-${index + 1}.png`,
  }));

  const processSteps: ProcessStep[] = t.process.steps.map((step, index) => ({
    id: step.id,
    title: step.title,
    description: step.description,
    icon: ['Search', 'Brain', 'Target', 'Send'][index],
    details: step.details,
    image: `/process/step-${index + 1}.png`,
  }));

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  const handleAnalyze = async (type: AnalysisType, content: string, email: string) => {
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          content,
          email,
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setAnalysisResult(result.data);
        // Scroll to results
        setTimeout(() => {
          const resultsSection = document.getElementById('analysis-results');
          if (resultsSection) {
            resultsSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        throw new Error(result.error || 'Analysis failed');
      }
    } catch (error) {
      console.error('Analysis error:', error);
      alert('분석 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Contact form submitted:', contactForm);
    alert(language === 'ko' ? '문의가 접수되었습니다.' : 'Your inquiry has been submitted.');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleViewDetails = () => {
    setShowDetailPage(true);
  };

  const handleBackToMain = () => {
    setShowDetailPage(false);
  };

  // Show detail page if analysis result exists and user wants to view details
  if (showDetailPage && analysisResult) {
    return (
      <AnalysisDetailPage
          result={analysisResult}
        language={language}
        onBack={handleBackToMain}
      />
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-effect">
        <div className="container-custom px-4">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">JDX</span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('home')}
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                {t.nav.home}
              </button>
              <button
                onClick={() => {
                  setActiveTab('enterprise');
                  scrollToSection('analysis');
                }}
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                {t.nav.enterprise}
              </button>
              <button
                onClick={() => {
                  setActiveTab('personal');
                  scrollToSection('analysis');
                }}
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                {t.nav.personal}
              </button>
              <button
                onClick={() => scrollToSection('process')}
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                {t.nav.process}
              </button>
              <button
                onClick={() => scrollToSection('consulting')}
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                {t.nav.consulting}
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                {t.nav.contact}
              </button>
            </div>

            {/* Language Toggle */}
            <div className="flex items-center space-x-4">
              <div className="flex bg-dark-800 rounded-lg p-1">
                <button
                  onClick={() => handleLanguageChange('ko')}
                  className={`px-3 py-1 rounded-md text-sm transition-colors duration-300 ${
                    language === 'ko' ? 'bg-primary-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  KO
                </button>
                <button
                  onClick={() => handleLanguageChange('en')}
                  className={`px-3 py-1 rounded-md text-sm transition-colors duration-300 ${
                    language === 'en' ? 'bg-primary-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  EN
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-800 border-t border-dark-700"
          >
            <div className="px-4 py-4 space-y-4">
              <button
                onClick={() => scrollToSection('home')}
                className="block w-full text-left text-gray-300 hover:text-white transition-colors duration-300"
              >
                {t.nav.home}
              </button>
              <button
                onClick={() => {
                  setActiveTab('enterprise');
                  scrollToSection('analysis');
                }}
                className="block w-full text-left text-gray-300 hover:text-white transition-colors duration-300"
              >
                {t.nav.enterprise}
              </button>
              <button
                onClick={() => {
                  setActiveTab('personal');
                  scrollToSection('analysis');
                }}
                className="block w-full text-left text-gray-300 hover:text-white transition-colors duration-300"
              >
                {t.nav.personal}
              </button>
              <button
                onClick={() => scrollToSection('process')}
                className="block w-full text-left text-gray-300 hover:text-white transition-colors duration-300"
              >
                {t.nav.process}
              </button>
              <button
                onClick={() => scrollToSection('consulting')}
                className="block w-full text-left text-gray-300 hover:text-white transition-colors duration-300"
              >
                {t.nav.consulting}
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left text-gray-300 hover:text-white transition-colors duration-300"
              >
                {t.nav.contact}
              </button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/hero-background.png)',
            opacity: 0.4,
            filter: 'blur(0.5px) brightness(0.6)'
          }}
        />
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/40" />
        
        <motion.div
          style={{ y }}
          className="absolute inset-0 bg-hero-pattern opacity-10"
        />

        {/* Particle Animation */}
        <ParticleAnimation />
        
        <div className="container-custom px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* JDX (Transformation) Brand */}
            <FloatingElements>
              <GlowEffect intensity={0.8}>
                <TextReveal delay={0}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                  >
                    <h2 className="text-2xl md:text-3xl font-bold text-blue-400 mb-2">
                      <TypingAnimation 
                        text="JDX" 
                        speed={150}
                        className="text-blue-400"
                      />
                      <span className="text-white"> (Transformation)</span>
                    </h2>
                    <motion.div 
                      className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: 96 }}
                      transition={{ duration: 1, delay: 1 }}
                    />
                  </motion.div>
                </TextReveal>
              </GlowEffect>
            </FloatingElements>

            <TextReveal delay={200} direction="up">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-7xl font-bold mb-6 text-shadow-lg"
              >
                <span className="gradient-text">
                  <TypingAnimation 
                    text={t.hero.title} 
                    speed={80}
                    className="gradient-text"
                  />
                </span>
              </motion.h1>
            </TextReveal>
            
            <TextReveal delay={400} direction="up">
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
              >
                <TypingAnimation 
                  text={t.hero.subtitle} 
                  speed={60}
                  className="text-gray-300"
                />
              </motion.p>
            </TextReveal>
            
            <TextReveal delay={600} direction="up">
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto"
              >
                <TypingAnimation 
                  text={t.hero.description} 
                  speed={40}
                  className="text-gray-400"
                />
              </motion.p>
            </TextReveal>

            <TextReveal delay={800} direction="up">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <PulseButton 
                  onClick={() => {
                    setActiveTab('enterprise');
                    scrollToSection('analysis');
                  }}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Building2 className="w-5 h-5" />
                  <span>{t.hero.enterpriseCta}</span>
                  <ArrowRight className="w-5 h-5" />
                </PulseButton>
                
                <PulseButton 
                  onClick={() => {
                    setActiveTab('personal');
                    scrollToSection('analysis');
                  }}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <User className="w-5 h-5" />
                  <span>{t.hero.personalCta}</span>
                  <ArrowRight className="w-5 h-5" />
                </PulseButton>
                
                <PulseButton 
                  onClick={() => scrollToSection('process')}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <Play className="w-5 h-5" />
                  <span>{t.hero.demoCta}</span>
                </PulseButton>
              </motion.div>
            </TextReveal>
          </div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-20 left-10 w-20 h-20 bg-primary-500/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-20 right-10 w-32 h-32 bg-primary-600/20 rounded-full blur-xl"
        />
      </section>

      {/* Analysis Section */}
      <section id="analysis" className="section-padding bg-dark-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              AI 에이전트 분석
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              기업의 직무나 개인의 역량을 분석하여 AI 에이전트로 변환 가능한 영역을 찾아보세요.
            </p>
            
            {/* Analysis Type Tabs */}
            <div className="flex justify-center mb-8">
              <div className="flex bg-dark-700 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab('enterprise')}
                  className={`px-6 py-3 rounded-md transition-colors duration-300 ${
                    activeTab === 'enterprise'
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Building2 className="w-5 h-5 inline mr-2" />
                  기업 분석
                </button>
                <button
                  onClick={() => setActiveTab('personal')}
                  className={`px-6 py-3 rounded-md transition-colors duration-300 ${
                    activeTab === 'personal'
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <User className="w-5 h-5 inline mr-2" />
                  개인 분석
                </button>
              </div>
            </div>
          </motion.div>

          <AnalysisForm
            type={activeTab}
            language={language}
            onAnalyze={handleAnalyze}
            isAnalyzing={isAnalyzing}
          />
        </div>
      </section>

      {/* Analysis Results Summary */}
      {analysisResult && (
        <section id="analysis-results" className="section-padding">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl font-bold mb-4 gradient-text">
                분석 완료!
              </h2>
              <p className="text-xl text-gray-300">
                {analysisResult.type === 'enterprise' ? '기업 직무 분석' : '개인 역량 분석'} 결과가 준비되었습니다.
              </p>
            </motion.div>

            {/* Quick Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="card-hover text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-blue-500 mb-2">{analysisResult.summary.total}</div>
                <div className="text-gray-400">총 분석 작업</div>
              </div>

              <div className="card-hover text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-green-500 mb-2">{analysisResult.summary.automate}</div>
                <div className="text-gray-400">완전 자동화 가능</div>
              </div>

              <div className="card-hover text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-yellow-500 mb-2">{analysisResult.summary.copilot}</div>
                <div className="text-gray-400">AI 협업 가능</div>
              </div>

              <div className="card-hover text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-purple-500 mb-2">{analysisResult.summary.automationPotential}%</div>
                <div className="text-gray-400">자동화 잠재력</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleViewDetails}
                className="btn-primary flex items-center space-x-2"
              >
                <Eye className="w-5 h-5" />
                <span>상세 결과 보기</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="btn-secondary flex items-center space-x-2">
                <Download className="w-5 h-5" />
                <span>PDF 다운로드</span>
              </button>
              <button className="btn-secondary flex items-center space-x-2">
                <Mail className="w-5 h-5" />
                <span>이메일 재발송</span>
              </button>
            </div>

            {/* Quick Insights */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card">
                <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  <span>주요 권장사항</span>
                </h3>
                <div className="space-y-3">
                  {analysisResult.recommendations.slice(0, 3).map((rec, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                  <Rocket className="w-5 h-5 text-green-500" />
                  <span>다음 단계</span>
                </h3>
                <div className="space-y-3">
                  {analysisResult.nextSteps.slice(0, 3).map((step, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-white">{index + 1}</span>
                      </div>
                      <span className="text-gray-300 text-sm">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section id="features" className="section-padding bg-dark-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              {t.features.title}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t.features.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.features.items.map((feature, index) => {
              const IconComponent = require('lucide-react')[feature.icon];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card-hover group"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              {t.process.title}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t.process.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {processSteps.map((step, index) => {
              const IconComponent = require('lucide-react')[step.icon];
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="card-hover"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                      <p className="text-gray-300 mb-4">{step.description}</p>
                      <ul className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-center space-x-2 text-gray-400">
                            <CheckCircle className="w-4 h-4 text-primary-500 flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section id="success" className="section-padding bg-dark-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              {t.success.title}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t.success.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {industryFeedback.map((feedback, index) => (
              <motion.div
                key={feedback.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-hover"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mr-4">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{feedback.company}</h4>
                    <p className="text-sm text-gray-400">{feedback.industry}</p>
                  </div>
                </div>
                
                <blockquote className="text-gray-300 mb-6 italic">
                  "{feedback.testimonial}"
                </blockquote>
                
                <div className="border-t border-dark-700 pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <p className="font-semibold">{feedback.author}</p>
                      <p className="text-gray-400">{feedback.position}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-primary-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-primary-500">{feedback.metrics.productivity}</div>
                    <div className="text-xs text-gray-400">생산성</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-primary-500">{feedback.metrics.efficiency}</div>
                    <div className="text-xs text-gray-400">효율성</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-primary-500">{feedback.metrics.costSavings}</div>
                    <div className="text-xs text-gray-400">비용절감</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Consulting Section */}
      <section id="consulting" className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              {t.consulting.title}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t.consulting.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.consulting.services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-hover text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-dark-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              {t.contact.title}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t.contact.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="card"
            >
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">{t.contact.form.name}</label>
                    <input
                      type="text"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t.contact.form.department}</label>
                    <input
                      type="text"
                      value={contactForm.department}
                      onChange={(e) => setContactForm({ ...contactForm, department: e.target.value })}
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">{t.contact.form.email}</label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t.contact.form.company}</label>
                    <input
                      type="text"
                      value={contactForm.company}
                      onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t.contact.form.type}</label>
                  <select
                    value={contactForm.type}
                    onChange={(e) => setContactForm({ ...contactForm, type: e.target.value as any })}
                    className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {Object.entries(t.contact.form.types).map(([key, value]) => (
                      <option key={key} value={key}>{value}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t.contact.form.inquiry}</label>
                  <textarea
                    value={contactForm.inquiry}
                    onChange={(e) => setContactForm({ ...contactForm, inquiry: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>

                <button type="submit" className="btn-primary w-full flex items-center justify-center space-x-2">
                  <Send className="w-5 h-5" />
                  <span>{t.contact.form.submit}</span>
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="card">
                <h3 className="text-2xl font-semibold mb-6">{t.contact.info.title}</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-400">{t.contact.info.email}</p>
                    </div>
        </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-gray-400">{t.contact.info.phone}</p>
          </div>
        </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
            <div>
                      <p className="font-medium">Address</p>
                      <p className="text-gray-400">{t.contact.info.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 className="text-xl font-semibold mb-4">빠른 응답 보장</h3>
                <p className="text-gray-400 mb-4">
                  문의하신 내용에 대해 24시간 내에 답변드리겠습니다.
                </p>
                <div className="flex items-center space-x-2 text-primary-500">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm">무료 상담</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-900 border-t border-dark-800 py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold gradient-text">{t.footer.company.name}</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                {t.footer.company.description}
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-dark-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors duration-300 cursor-pointer">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-dark-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors duration-300 cursor-pointer">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-dark-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors duration-300 cursor-pointer">
                  <Phone className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.links.product}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors duration-300">기업 분석</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">개인 분석</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">분석 리포트</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">API</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t.footer.links.company}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors duration-300">회사 소개</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">팀</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">채용</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">뉴스</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-dark-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">{t.footer.copyright}</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                {t.footer.legal.privacy}
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                {t.footer.legal.terms}
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                {t.footer.legal.cookies}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
