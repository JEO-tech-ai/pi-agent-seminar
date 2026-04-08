# PI Agent 생태계 세미나 - 사용 가이드

## 개요

이 프레젠테이션은 PI Agent 생태계(OpenClaw, NanoClaw, PicoClaw, ZeroClaw, Hermes Agent)를 소개하는 **18슬라이드 세미나 발표 자료**입니다.

브라우저 내장 **Web Speech API(TTS)**를 사용하여 각 슬라이드의 발표 스크립트를 자동으로 음성 출력하고, 음성이 끝나면 다음 슬라이드로 자동 전환됩니다.

---

## 파일 구조

```
openclaw-seminar/
├── presentation.html   # 메인 프레젠테이션 (단일 HTML, 외부 의존성 없음)
├── GUIDE.md            # 이 가이드 문서
└── .survey/            # 리서치 아카이브
```

---

## 실행 방법

### 1. 브라우저에서 열기

```bash
# macOS
open presentation.html

# Linux
xdg-open presentation.html

# Windows
start presentation.html
```

또는 파일을 **Chrome / Edge / Safari**에 드래그 앤 드롭합니다.

### 2. 발표 시작

1. 브라우저에 프레젠테이션이 로드되면 **시작 오버레이**가 표시됩니다
2. 중앙의 **재생 버튼(▶)**을 클릭합니다
3. TTS 음성이 첫 번째 슬라이드의 발표 스크립트를 읽기 시작합니다
4. 각 슬라이드의 음성이 끝나면 **0.8초 후 자동으로 다음 슬라이드**로 넘어갑니다

### 3. 전체 화면 모드 (권장)

발표 시 **F11** (Windows/Linux) 또는 **Ctrl+Cmd+F** (macOS)로 전체 화면 모드를 사용하세요.

---

## 컨트롤

### 하단 우측 버튼

| 버튼 | 기능 |
|------|------|
| ◀ | 이전 슬라이드 (음성 재시작) |
| ▶ | 다음 슬라이드 (음성 재시작) |
| ⏸ 일시정지 | TTS 일시정지 / 재개 토글 |
| ■ 정지 | 발표 중단, 시작 화면으로 복귀 |

### 키보드 단축키

| 키 | 기능 |
|----|------|
| `Space` | 일시정지 / 재개 |
| `→` 또는 `PageDown` | 다음 슬라이드 |
| `←` 또는 `PageUp` | 이전 슬라이드 |
| `Escape` | 발표 중단 |
| `Enter` | 발표 시작 (시작 화면에서) |

### 하단 좌측 표시기

음성 출력 중일 때 **파형 애니메이션**과 현재 슬라이드 번호가 표시됩니다.

### 하단 프로그레스 바

전체 발표 진행률을 보라색 그라데이션 바로 표시합니다.

---

## TTS(음성) 설정

### 지원 브라우저

| 브라우저 | 한국어 TTS | 비고 |
|----------|-----------|------|
| **Chrome** | Google 한국어 | 권장. 15초 이상 발화 시 자동 keep-alive 적용됨 |
| **Edge** | Microsoft Heami | 양호 |
| **Safari** | Yuna (ko-KR) | macOS/iOS 기본 지원 |
| **Firefox** | 제한적 | pause/resume이 불안정할 수 있음 |

### 음성이 나오지 않을 때

1. **브라우저 권한 확인**: 사이트의 오디오 자동재생이 허용되어 있는지 확인
2. **시스템 TTS 확인**:
   - macOS: 시스템 설정 > 손쉬운 사용 > 음성 콘텐츠에서 한국어 음성 설치
   - Windows: 설정 > 시간 및 언어 > 음성에서 한국어 음성 팩 설치
3. **시작 버튼 클릭 필수**: Web Speech API는 사용자 제스처(클릭) 없이는 작동하지 않습니다. 반드시 시작 버튼을 클릭해야 합니다.

### TTS 속도 조절

`presentation.html`의 JavaScript에서 `utterance.rate` 값을 수정합니다:

```javascript
utterance.rate = 1.05;  // 기본값 (약간 빠르게)
// 0.5 = 느리게, 1.0 = 보통, 1.5 = 빠르게, 2.0 = 매우 빠르게
```

---

## 슬라이드 구성 (18슬라이드)

| # | 섹션 | 제목 | 예상 시간 |
|---|------|------|----------|
| 1 | Title | PI Agent 생태계 | 30초 |
| 2 | Agenda | 오늘의 발표 순서 | 30초 |
| 3 | Part 1 | PI Agent란 무엇인가? | 50초 |
| 4 | Architecture | PI Agent SDK 아키텍처 | 40초 |
| 5 | OpenClaw | 플래그십 프레임워크 | 40초 |
| 6 | Features | OpenClaw 핵심 기능 | 40초 |
| 7 | NanoClaw | 컨테이너 격리 경량화 | 45초 |
| 8 | PicoClaw | 엣지 디바이스 초경량 | 50초 |
| 9 | ZeroClaw | Rust 미니멀 에이전트 | 45초 |
| 10 | Hermes | 자기 학습 에이전트 | 45초 |
| 11 | Learning | Hermes 학습 루프 | 40초 |
| 12 | Comparison | 생태계 종합 비교 | 45초 |
| 13 | Ecosystem | 생태계 계층 구조 | 40초 |
| 14 | Standards | 상호운용성과 표준 | 40초 |
| 15 | Use Cases | 프레임워크 선택 가이드 | 35초 |
| 16 | Quick Start | 빠른 시작 가이드 | 40초 |
| 17 | Takeaways | 핵심 요약 | 40초 |
| 18 | Thank You | 감사합니다 / Q&A | 20초 |

**총 예상 시간: 약 12-15분**

---

## 커스터마이징

### 슬라이드 내용 수정

`presentation.html` 내 `<div class="slide">` 블록을 수정합니다. 각 슬라이드는 순서대로 배치되어 있습니다.

### 발표 스크립트 수정

JavaScript의 `narrations` 배열을 수정합니다. 각 인덱스가 슬라이드 번호에 대응합니다:

```javascript
const narrations = [
  // Slide 0 (Title)
  `첫 번째 슬라이드의 발표 스크립트...`,
  // Slide 1 (Agenda)
  `두 번째 슬라이드의 발표 스크립트...`,
  // ...
];
```

### 디자인 토큰 수정

CSS의 `:root` 변수를 수정하여 전체 테마를 변경할 수 있습니다:

```css
:root {
  --color-accent-claw: #7c3aed;    /* 메인 보라색 */
  --color-accent-cyan: #06b6d4;    /* 보조 시안 */
  --color-bg-primary: #0a0a0f;     /* 배경색 */
  --color-text-primary: #f1f5f9;   /* 텍스트 색상 */
}
```

### 슬라이드 추가

1. `<div class="presentation">` 안에 새 `<div class="slide grid-bg">` 블록 추가
2. `narrations` 배열에 해당 인덱스에 스크립트 추가
3. `state.totalSlides` 값을 업데이트

---

## 디자인 시스템

### 색상 팔레트

| 용도 | 색상 | 코드 |
|------|------|------|
| OpenClaw (메인) | 보라 | `#7c3aed` |
| NanoClaw | 시안 | `#06b6d4` |
| PicoClaw | 에메랄드 | `#10b981` |
| ZeroClaw | 오렌지 | `#f97316` |
| Hermes Agent | 앰버 | `#f59e0b` |

### 컴포넌트

- **glass-card**: 글래스모피즘 카드 (반투명 배경 + 블러)
- **arch-diagram**: 아키텍처 다이어그램 (모노스페이스 박스)
- **code-block**: 코드 블록
- **data-table**: 비교 테이블
- **highlight-box**: 강조 박스
- **metric-value**: 큰 수치 표시

---

## 문제 해결

### Chrome에서 음성이 중간에 멈춤

Chrome은 15초 이상 연속 발화 시 자동 중단되는 버그가 있습니다. 이 프레젠테이션은 다음 두 가지로 대응합니다:
- 문장 단위 분할 발화 (sentences split)
- 10초 간격 keep-alive (pause/resume 사이클)

### Safari에서 첫 음성이 안 나옴

Safari iOS에서는 첫 발화가 반드시 사용자 제스처와 같은 콜 스택에서 실행되어야 합니다. 시작 버튼 클릭 시 바로 실행되도록 구현되어 있습니다.

### 한국어 음성이 없음

시스템에 한국어 TTS 음성이 설치되어 있지 않으면 기본 영어 음성으로 폴백됩니다.
- **macOS**: 시스템 설정 > 손쉬운 사용 > 음성 콘텐츠 > 시스템 음성 > 음성 관리에서 "Yuna" 설치
- **Windows**: 설정 > 시간 및 언어 > 음성 > 음성 추가에서 "한국어" 설치

---

## 기술 스택

- **HTML5**: 단일 파일, 외부 의존성 없음
- **CSS3**: CSS Grid, Flexbox, CSS Variables, Backdrop Filter, Animations
- **JavaScript**: Vanilla JS, Web Speech API (SpeechSynthesis)
- **폰트**: Pretendard (CDN), JetBrains Mono (시스템 폰트 폴백)
- **호환성**: Chrome 70+, Edge 79+, Safari 14+, Firefox 49+ (제한적)
