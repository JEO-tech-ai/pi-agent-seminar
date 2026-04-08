const { GoogleGenAI } = require("@google/genai");
const wav = require("wav");
const fs = require("fs");
const path = require("path");

const API_KEY = process.env.GEMINI_API_KEY || "";
const MODEL = "gemini-2.5-flash-preview-tts";
const VOICE = "Kore"; // Female, firm and confident - good for seminar
const OUTPUT_DIR = path.join(__dirname, "audio");
const STYLE_PROMPT = "세미나 발표자처럼 명확하고 전문적인 톤으로, 적절한 속도로 말해주세요: ";

const narrations = [
  // Slide 0: Title
  `안녕하세요. PI Agent 생태계 세미나에 오신 것을 환영합니다. 오늘은 OpenClaw, NanoClaw, PicoClaw, ZeroClaw, 그리고 Hermes Agent까지. 차세대 개인 AI 에이전트 프레임워크의 전체 생태계를 깊이 있게 살펴보겠습니다.`,

  // Slide 1: Agenda
  `오늘 발표는 네 파트로 구성됩니다. 먼저 PI Agent의 개념과 아키텍처를 알아보고, 이어서 NanoClaw, PicoClaw, ZeroClaw 등 다양한 변형 프레임워크를 탐험합니다. 그 다음 자기 학습 에이전트인 Hermes Agent와 종합 비교를 진행하고, 마지막으로 실전 설치 가이드와 활용 방법을 안내해 드리겠습니다.`,

  // Slide 2: What is PI Agent
  `PI Agent란 무엇일까요? PI는 Personal Intelligence의 약자로, LLM 기반 자율 AI 에이전트를 구축하기 위한 TypeScript 툴킷입니다. 마리오 체흐너가 만든 이 SDK는 네 개의 핵심 패키지로 구성됩니다. pi-ai는 LLM 추상화 레이어, pi-agent-core는 에이전트 루프와 도구 실행 엔진, pi-coding-agent는 고수준 세션 매니저, 그리고 pi-tui는 터미널 UI 컴포넌트입니다. 핵심 철학은 간단합니다. LLM이 코드를 잘 쓰니까, 그걸 최대한 활용하자. Read, Write, Edit, Bash 단 네 개의 도구만으로 동작합니다.`,

  // Slide 3: PI Architecture
  `PI Agent의 아키텍처를 살펴보겠습니다. OpenClaw Gateway가 웹소켓 프로토콜로 모든 컴포넌트를 조율합니다. WebChat, CLI, macOS 앱 등 다양한 인터페이스가 게이트웨이에 연결되고, 중앙의 PI Agent Core가 에이전트 루프를 실행합니다. createAgentSession 함수로 세션을 초기화하고, 에이전트 루프가 LLM에 요청을 보내고, 도구를 실행하고, 응답을 스트리밍하는 전체 사이클을 관리합니다.`,

  // Slide 4: OpenClaw Overview
  `이제 OpenClaw를 살펴보겠습니다. OpenClaw는 PI Agent 위에 구축된 플래그십 프레임워크로, 깃허브 스타 24만 7천 개 이상을 기록하며 역사상 가장 빠르게 성장한 오픈소스 프로젝트입니다. 25개 이상의 메시징 채널, 50개 이상의 외부 서비스 연동, 그리고 커뮤니티가 만든 5,700개 이상의 스킬을 ClawHub 마켓플레이스에서 제공합니다.`,

  // Slide 5: OpenClaw Features
  `OpenClaw의 핵심 기능을 하나씩 살펴보겠습니다. 멀티채널 라우팅으로 채널별 에이전트를 격리할 수 있고, 영속 메모리로 대화 간 개인화가 가능합니다. Canvas와 에이전트 주도 UI, 음성과 TTS 기능, Cron과 Webhook 자동화, 그리고 카메라와 화면 녹화 등 디바이스 노드까지 지원합니다. 말 그대로 개인 AI 비서의 올인원 솔루션입니다.`,

  // Slide 6: NanoClaw
  `NanoClaw는 OpenClaw의 경량 대안입니다. OpenClaw의 50만 줄 코드를 이해하기 쉬운 단일 프로세스로 줄인 것이 핵심입니다. 가장 큰 차별점은 컨테이너 기반 보안입니다. 에이전트가 Docker 컨테이너 안에서 실행되므로, 운영체제 수준의 격리를 제공합니다. 미니멀리즘, 격리, 개인화, 코드 주도, AI 네이티브라는 다섯 가지 원칙을 따릅니다.`,

  // Slide 7: PicoClaw
  `PicoClaw는 정말 놀라운 프로젝트입니다. 10달러짜리 하드웨어에서 실행되는 AI 에이전트를 목표로, Go 언어로 작성되었습니다. RAM 사용량 10메가바이트 미만, 부팅 시간 1초 미만. OpenClaw의 1기가바이트 이상 대비 100배 이상 경량입니다. RISC-V, ARM, MIPS까지 지원하며, 9.99달러짜리 LicheeRV-Nano에서도 동작합니다. MCP 네이티브 통합, 비전 파이프라인, 모델 라우팅, 18개 이상의 채널을 지원합니다.`,

  // Slide 8: ZeroClaw
  `ZeroClaw는 Rust로 작성된 미니멀 에이전트입니다. 하버드와 MIT 학생들이 만들었고, 2만 개 이상의 스타를 받았습니다. 슬로건은 Zero overhead, Zero compromise. RAM 5메가바이트 미만, 바이너리 크기 8.8메가바이트, 시작 시간 10밀리초 미만. 단일 실행 파일로 배포됩니다. 보안 우선 설계로 인증 페어링, 워크스페이스 스코핑, 커맨드 허용 목록, 암호화된 시크릿 저장을 제공합니다.`,

  // Slide 9: Hermes Agent
  `Hermes Agent는 Nous Research가 개발한 자기 학습 에이전트입니다. 33,900개 이상의 깃허브 스타를 받았으며, OpenClaw의 주요 대안으로 자리잡았습니다. 핵심 차별점은 학습 루프입니다. OpenClaw의 스킬이 사람이 작성하고 관리하는 정적 파일인 반면, Hermes의 스킬은 에이전트가 스스로 생성하고 사용하면서 개선합니다.`,

  // Slide 10: Hermes Learning Loop
  `Hermes의 학습 루프를 더 자세히 살펴보겠습니다. 사용자가 요청하면 에이전트가 작업을 수행합니다. 작업이 끝나면 경험을 분석하고 패턴을 추출합니다. 이 과정에서 스킬이 자동 생성되거나 개선되고, 사용자 모델이 업데이트되며, 메모리가 강화됩니다. 그 결과 다음 작업에서 더 나은 성능을 보여주는 선순환 구조입니다.`,

  // Slide 11: Comparison Table
  `이제 다섯 가지 프레임워크를 한 눈에 비교해 보겠습니다. 언어부터 다양합니다. TypeScript, Node.js, Go, Rust, Python. RAM 사용량은 OpenClaw의 1기가바이트 이상부터 ZeroClaw의 5메가바이트 미만까지 200배 이상 차이가 납니다. 스킬 시스템은 OpenClaw의 ClawHub 마켓플레이스와 Hermes의 자율 생성이 대조적입니다.`,

  // Slide 12: Ecosystem Hierarchy
  `생태계의 전체 계층 구조를 보겠습니다. 최하단에 PI Agent SDK가 코어 엔진으로 자리하고, 그 위에 OpenClaw가 플래그십으로 구축되었습니다. NanoClaw는 컨테이너 격리, PicoClaw는 엣지 디바이스, ZeroClaw는 미니멀 바이너리를 추구합니다. 별도 갈래인 Hermes Agent는 자기 학습이라는 독자적인 방향을 개척하고 있습니다.`,

  // Slide 13: Interoperability
  `상호운용성 표준을 알아보겠습니다. agentskills.io는 오픈 스킬 표준으로 프레임워크 간 스킬 호환성을 보장합니다. OGP는 서로 다른 프레임워크의 에이전트가 암호화 서명된 메시지를 교환하는 연합 레이어입니다. MCP는 PicoClaw가 네이티브로 지원하는 도구 연결 표준이며, Gateway WebSocket은 로컬 퍼스트 아키텍처의 핵심 제어 평면입니다.`,

  // Slide 14: Use Cases
  `어떤 상황에서 어떤 프레임워크를 선택해야 할까요? 다양한 채널에서 올인원 개인 비서가 필요하면 OpenClaw, 보안과 격리가 최우선이면 NanoClaw, IoT나 엣지 디바이스에서 실행해야 하면 PicoClaw, 최소 리소스로 최대 성능을 원하면 ZeroClaw, 에이전트가 스스로 학습하고 성장하길 원하면 Hermes Agent를 선택하시면 됩니다.`,

  // Slide 15: Quick Start
  `빠른 시작 가이드입니다. OpenClaw은 curl 한 줄로 설치합니다. NanoClaw은 깃 클론 후 Claude Code에서 setup을 실행합니다. PicoClaw는 소스를 빌드하면 WebUI에서 사용할 수 있습니다. ZeroClaw는 단일 바이너리를 다운로드받아 실행합니다. Hermes Agent도 install 스크립트 한 줄이면 됩니다.`,

  // Slide 16: Key Takeaways
  `핵심 요약입니다. 첫째, 다양성. 하나의 SDK에서 출발하여 각기 다른 문제를 해결하는 다섯 개 이상의 프레임워크로 발전했습니다. 둘째, 로컬 퍼스트. 모든 처리는 사용자 디바이스에서 이루어지며, 프라이버시와 데이터 주권을 최우선으로 합니다. 셋째, 선택의 자유. 풀스택 OpenClaw부터 마이크로 PicoClaw까지, 용도에 맞는 최적의 선택이 가능합니다.`,

  // Slide 17: Thank You
  `발표를 마치겠습니다. 오늘 PI Agent 생태계의 전체 그림을 함께 살펴보았습니다. 각각의 강점과 활용처를 이해하셨길 바랍니다. 궁금한 점이 있으시면 질문해 주세요. 감사합니다.`,
];

async function saveWaveFile(filename, pcmData) {
  return new Promise((resolve, reject) => {
    const writer = new wav.FileWriter(filename, {
      channels: 1,
      sampleRate: 24000,
      bitDepth: 16,
    });
    writer.on("finish", resolve);
    writer.on("error", reject);
    writer.write(Buffer.from(pcmData));
    writer.end();
  });
}

async function generateSlideAudio(ai, slideIndex, text) {
  const paddedIndex = String(slideIndex).padStart(2, "0");
  const outputFile = path.join(OUTPUT_DIR, `slide-${paddedIndex}.wav`);

  // Skip if already exists
  if (fs.existsSync(outputFile)) {
    console.log(`  [SKIP] slide-${paddedIndex}.wav already exists`);
    return;
  }

  console.log(`  [GEN]  slide-${paddedIndex}.wav ...`);

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: [{ parts: [{ text: STYLE_PROMPT + text }] }],
    config: {
      responseModalities: ["AUDIO"],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: VOICE },
        },
      },
    },
  });

  const data =
    response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!data) {
    throw new Error(`No audio data returned for slide ${slideIndex}`);
  }

  const audioBuffer = Buffer.from(data, "base64");
  await saveWaveFile(outputFile, audioBuffer);
  console.log(`  [DONE] slide-${paddedIndex}.wav (${(audioBuffer.length / 1024).toFixed(0)}KB)`);
}

async function main() {
  console.log("=== Gemini TTS Audio Generator ===");
  console.log(`Model: ${MODEL}`);
  console.log(`Voice: ${VOICE}`);
  console.log(`Slides: ${narrations.length}`);
  console.log("");

  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });

  // Generate sequentially to avoid rate limits
  for (let i = 0; i < narrations.length; i++) {
    try {
      await generateSlideAudio(ai, i, narrations[i]);
    } catch (err) {
      console.error(`  [ERR]  slide-${String(i).padStart(2, "0")}: ${err.message}`);
      // Wait and retry once
      console.log(`  [RETRY] waiting 5s...`);
      await new Promise((r) => setTimeout(r, 5000));
      try {
        await generateSlideAudio(ai, i, narrations[i]);
      } catch (retryErr) {
        console.error(`  [FAIL] slide-${String(i).padStart(2, "0")}: ${retryErr.message}`);
      }
    }
    // Small delay between requests
    if (i < narrations.length - 1) {
      await new Promise((r) => setTimeout(r, 1000));
    }
  }

  console.log("\n=== Generation Complete ===");
  const files = fs.readdirSync(OUTPUT_DIR).filter((f) => f.endsWith(".wav"));
  console.log(`Generated: ${files.length}/${narrations.length} files`);
  console.log(`Output: ${OUTPUT_DIR}/`);
}

main().catch(console.error);
