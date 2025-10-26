'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Share2, 
  X, 
  Copy, 
  MessageCircle, 
  Facebook, 
  Twitter,
  Link as LinkIcon,
  Check
} from 'lucide-react';
import { AnalysisResult } from '@/types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: AnalysisResult;
}

export function ShareModal({ isOpen, onClose, result }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [shareType, setShareType] = useState<string>('');

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = `JDX 자동화 분석 결과 - ${result.type === 'enterprise' ? '기업' : '개인'} 분석`;
  const shareText = `자동화 가능성 ${result.summary.automationPotential}% | 평균 점수 ${result.summary.averageScore} | 예상 ROI ${result.summary.estimatedROI}%`;

  const shareOptions = [
    {
      id: 'kakao',
      name: '카카오톡',
      icon: MessageCircle,
      color: 'bg-yellow-500',
      action: () => shareToKakao()
    },
    {
      id: 'facebook',
      name: '페이스북',
      icon: Facebook,
      color: 'bg-blue-600',
      action: () => shareToFacebook()
    },
    {
      id: 'twitter',
      name: '트위터',
      icon: Twitter,
      color: 'bg-blue-400',
      action: () => shareToTwitter()
    },
    {
      id: 'link',
      name: '링크 복사',
      icon: LinkIcon,
      color: 'bg-gray-600',
      action: () => copyLink()
    }
  ];

  const shareToKakao = () => {
    if (typeof window !== 'undefined' && window.Kakao) {
      window.Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: shareTitle,
          description: shareText,
          imageUrl: `${window.location.origin}/og-image.png`,
          link: {
            mobileWebUrl: currentUrl,
            webUrl: currentUrl,
          },
        },
      });
    } else {
      // Kakao SDK가 없는 경우 웹 공유 API 사용
      if (navigator.share) {
        navigator.share({
          title: shareTitle,
          text: shareText,
          url: currentUrl,
        });
      } else {
        copyLink();
      }
    }
    setShareType('kakao');
  };

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
    setShareType('facebook');
  };

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
    setShareType('twitter');
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setShareType('link');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('링크 복사 실패:', err);
      // 폴백: 텍스트 선택 방식
      const textArea = document.createElement('textarea');
      textArea.value = currentUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setShareType('link');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-dark-800 rounded-xl p-6 w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">공유하기</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="text-center mb-6">
              <h4 className="text-lg font-medium text-white mb-2">{shareTitle}</h4>
              <p className="text-gray-400 text-sm">{shareText}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {shareOptions.map((option) => {
                const Icon = option.icon;
                const isActive = shareType === option.id;
                
                return (
                  <motion.button
                    key={option.id}
                    onClick={option.action}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      isActive 
                        ? 'border-blue-500 bg-blue-500 bg-opacity-10' 
                        : 'border-dark-600 hover:border-dark-500'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className={`p-3 rounded-full ${option.color}`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-sm font-medium text-white">
                        {option.name}
                      </span>
                      {isActive && option.id === 'link' && copied && (
                        <div className="flex items-center space-x-1 text-green-500 text-xs">
                          <Check className="w-3 h-3" />
                          <span>복사됨</span>
                        </div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-dark-600">
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>분석 결과 공유</span>
                <span>{result.summary.automationPotential}% 자동화 가능</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
