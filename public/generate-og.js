<script>
// OG Image 생성 및 저장
const canvas = document.createElement('canvas');
canvas.width = 1200;
canvas.height = 630;
const ctx = canvas.getContext('2d');

// 배경
const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
gradient.addColorStop(0, '#1e293b');
gradient.addColorStop(1, '#0f172a');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 1200, 630);

// 텍스트
ctx.fillStyle = '#ffffff';
ctx.font = 'bold 72px -apple-system, sans-serif';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';

const centerX = 600;
const centerY = 200;

// JDX (Transformation)
ctx.font = 'bold 48px -apple-system, sans-serif';
ctx.fillStyle = '#60a5fa';
ctx.fillText('JDX (Transformation)', centerX, centerY - 100);

// 메인 제목
ctx.font = 'bold 84px -apple-system, sans-serif';
ctx.fillStyle = '#ffffff';
ctx.fillText('AI 에이전트로', centerX, centerY);
ctx.fillText('비즈니스 혁신', centerX, centerY + 100);

// 설명
ctx.font = '36px -apple-system, sans-serif';
ctx.fillStyle = '#cbd5e1';
ctx.fillText('직무 분석을 통해 생산성과 효율성을 극대화하세요', centerX, centerY + 200);

// Canvas를 이미지로 변환
const img = document.createElement('img');
img.src = canvas.toDataURL('image/png');
document.body.appendChild(img);
</script>
