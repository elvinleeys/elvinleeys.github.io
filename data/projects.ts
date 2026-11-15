// 프로젝트 내용은 전부 여기서 관리한다. 배열 순서 = 번호(01~04) = 이전/다음 순서.
// image가 없는 곳은 placeholder 문구가 회색 박스로 표시된다. 캡처를 public/images/에 넣고 image에 경로를 적으면 교체된다.

// fit: 칸 비율과 이미지 비율이 다를 때 보여 줄 부분 (기본 "object-top" = 위쪽 기준으로 자름)
//   "object-contain" 자르지 않고 전체 표시 / "object-left-top" 왼쪽 위 기준 / "object-center" 가운데 기준
// image를 배열로 쓰면 세로 캡처(모바일 화면) 여러 장을 한 칸에 나란히 표시 (1~2장 권장)
// stack: 배열 이미지를 위아래로 쌓음 — 가로로 긴 데스크톱 캡처 2장을 한 칸에 넣을 때
export type Shot = { image?: string | string[]; stack?: boolean; alt?: string; placeholder: string; fit?: "object-contain" | "object-left-top" | "object-center" };

export type Project = {
  slug: string;
  name: string;
  badge: string;
  tagline: string; // 상세 상단 한 줄
  card: { summary: string; meta: string; highlight: string; tags: string[] };
  period: string;
  role: string;
  team: string;
  stack: string;
  links: { label: string; href: string }[]; // 첫 번째가 검은 버튼
  note?: string;
  hero: Shot;
  background: string;
  overview:
    | { kind: "figure"; image: string; alt: string; caption: string }
    | { kind: "steps"; steps: string[]; caption: string };
  features: ({ title: string; desc: string } & Shot)[];
  issues: { title: string; problem: string; cause: string; action: string; result: string }[];
  advanceIntro: string;
  metrics: { label: string; before: string; after: string; desc: string }[];
  extra: { title: string; items: string[] };
};

export const projects: Project[] = [
  {
    slug: "soridam",
    name: "소리담",
    badge: "kakao X Goorm Deepdive 해커톤 최우수상",
    tagline: "소음 측정 데이터 기반 조용한 공간 탐색 서비스",
    card: {
      summary: "소음 측정 데이터로 조용한 공간을 찾는 서비스",
      meta: "2024.12 – 2026.06 · 프론트엔드 전담",
      highlight: "지도 LCP 18~20초 → 2.4~3.3초",
      tags: ["Next.js", "TypeScript", "Zustand", "Storybook"],
    },
    period: "2024.12 – 2026.06",
    role: "프론트엔드 전담 → 개인 전환 후 재설계",
    team: "5인 팀 → 개인",
    stack: "Next.js 15 · TypeScript · Zustand · React Query · Storybook",
    links: [
      { label: "배포 사이트", href: "https://sorisoop-fe.vercel.app/" },
      { label: "GitHub", href: "https://github.com/elvinleeys/sorisoop_fe" },
      { label: "Storybook", href: "https://68b18c520a82ac63f9524bc5-rueqmotjmh.chromatic.com/?path=/docs/configure-your-project--docs" },
    ],
    note: "테스트 계정 test@gmail.com / !1q2w3e4r",
    hero: { image: "/images/soridam-hero.webp", alt: "소리담 서비스 화면", placeholder: "", fit: "object-contain" },
    background: "해커톤 최우수상 프로젝트를 개인 프로젝트로 전환해 디자인 시스템, Storybook 문서화, 지도 성능까지 다시 설계했습니다.",
    overview: {
      kind: "figure",
      image: "/images/soridam-architecture.webp",
      alt: "소리담 시스템 구조도",
      caption: "Next.js(화면·API) ↔ MongoDB · 위치·마이크·지도 API 연동 · GitHub → Vercel 자동 배포",
    },
    features: [
      {
        title: "실시간 소음 측정",
        desc: "마이크 입력을 도넛 차트에 dB·타이머와 함께 표시",
        image: ["/images/soridam-feature-1-1.webp", "/images/soridam-feature-1-2.webp"],
        placeholder: "[실시간 소음 측정 화면]",
      },
      { title: "소음 지도", desc: "장소별 평균 소음을 지도 마커로 확인", image: ["/images/soridam-feature-2.webp"], placeholder: "[소음 지도 화면]" },
      { title: "시간대별 통계", desc: "장소 상세에서 시간대별 소음을 막대 차트로 확인", image: ["/images/soridam-feature-3.webp"], placeholder: "[시간대별 통계 화면]" },
    ],
    issues: [
      {
        title: "실시간 소음 측정 중 과도한 리렌더링",
        problem: "측정값이 바뀔 때마다 여러 컴포넌트가 다시 그려짐 (최대 17.4ms)",
        cause: "짧은 주기로 들어오는 마이크 값이 상태를 과도하게 갱신",
        action: "Zustand 상태·컴포넌트를 역할별로 분리, 차트 전환은 opacity로 처리",
        result: "관련 컴포넌트만 렌더링, AnimatePresence 4.5ms → 1.3~2.3ms",
      },
      {
        title: "데이터가 늘수록 느려지는 장소 상세 조회",
        problem: "상세 조회마다 측정 데이터 전체를 훑어 시간대별 평균 계산",
        cause: "조회 비용이 데이터 수에 비례하는 O(N) 구조",
        action: "누적 합계·시간대별 통계 필드를 두고 $inc로 즉시 갱신",
        result: "10만 건 기준 서버 처리 시간 약 30%↓, O(1) 조회",
      },
    ],
    advanceIntro: "지도 코드를 FSD 구조로 나누고, 평균 소음을 미리 계산해 두는 방식으로 바꿨습니다.",
    metrics: [
      { label: "지도 LCP", before: "18~20초", after: "2.4~3.3초", desc: "SDK 1회 로드·마커 캐시·화면 영역 기준 요청" },
      { label: "Marker API 응답", before: "최대 2.9초", after: "20~30ms", desc: "저장 시 평균 소음을 미리 갱신해 계산 제거" },
      { label: "TBT", before: "2~3초", after: "330~700ms", desc: "지도 이동 시 debounce로 반복 요청 감소" },
    ],
    extra: {
      title: "기술 선택",
      items: [
        "Modal·SideBar는 Parallel Routes 대신 React Portal — 별도 라우팅이 필요 없는 화면이라 구조적으로 적합",
        "차트는 Canvas 대신 SVG 기반 라이브러리 — 도넛 내부 dB·타이머 표기를 위해",
        "AudioContext 미리 생성(3.6초 → 24ms)은 마이크 상시 점유 위험으로 미채택, ‘준비 중’ 안내로 보완",
      ],
    },
  },
  {
    slug: "agentblueprint",
    name: "AgentBlueprint",
    badge: "AI NATIVE CAREER CAMP · 1차 프로젝트",
    tagline: "AI 에이전트가 코드를 쓰기 전에, 구조부터 설계합니다",
    card: {
      summary: "AI 에이전트가 코드 전에 구조부터 설계하게 돕는 도구",
      meta: "2026.10 – 고도화 진행 중 · 개인",
      highlight: "초안 생성 첫 반응 14초+ → 0.6초",
      tags: ["Next.js", "TypeScript", "Supabase", "OpenAI"],
    },
    period: "2026.10.21 – 2026.10.26 (이후 리팩토링·고도화 진행 중)",
    role: "프론트엔드 개발 · 기획부터 배포까지",
    team: "개인",
    stack: "Next.js · TypeScript · Supabase(RLS) · OpenAI · Vercel",
    links: [
      { label: "배포 사이트", href: "https://agent-blueprint-cpvq.vercel.app/" },
      { label: "GitHub", href: "https://github.com/elvinleeys/agent_blueprint" },
    ],
    hero: { image: "/images/agentblueprint-hero.webp", alt: "AgentBlueprint 서비스 화면", placeholder: "" },
    background: "AI 코딩 에이전트가 컴포넌트 책임·상태 위치·파일 위치를 추측해, 결과를 고치는 데 시간이 더 드는 문제에서 출발했습니다.",
    overview: {
      kind: "steps",
      steps: ["입력", "AI 초안", "보기·편집", "구조 검사", "지시서"],
      caption: "Next.js · TypeScript · Supabase(RLS) · OpenAI · Vercel",
    },
    features: [
      {
        title: "스펙 → AI 초안",
        desc: "스펙 7개 항목이나 화면 이미지로 컴포넌트 구조 초안 생성",
        image: "/images/agentblueprint-feature-1.webp",
        fit: "object-left-top",
        placeholder: "[스펙 → AI 초안 화면]",
      },
      {
        title: "미리보기·트리 편집",
        desc: "배치 미리보기와 트리, 편집 패널로 구조 수정",
        image: ["/images/agentblueprint-feature-2-1.webp", "/images/agentblueprint-feature-2-2.webp"],
        stack: true,
        placeholder: "[미리보기·트리 편집 화면]",
      },
      {
        title: "구조 검사·지시서",
        desc: "규칙 20개로 오류·경고를 표시하고 작업 지시서 내보내기",
        image: "/images/agentblueprint-feature-3.webp",
        fit: "object-left-top",
        placeholder: "[구조 검사·지시서 화면]",
      },
    ],
    issues: [
      {
        title: "에이전트가 문서와 다른 구조를 말없이 판단",
        problem: "문서와 실제 폴더 경로가 다르자 에이전트가 한쪽을 ‘오기’로 판단",
        cause: "두 문서가 같은 트리를 서로 다르게 설명",
        action: "data-model.md 하나를 정본으로, 다르면 멈추고 질문하도록 규칙화",
        result: "기준 문서 하나로 판단 기준 통일, 다른 문서는 참조만",
      },
      {
        title: "AI 모델 선정 — 비용과 형식 안정성",
        problem: "저렴한 모델(Luna)이 응답 형식 오류를 자주 냄",
        cause: "grid에 flex 전용 값, 형제 순서 중복, 폴더 형식 오류",
        action: "같은 화면을 입력 방식별로 실행해 비교, 재시도 비용(약 27초) 포함 판단",
        result: "Terra 선택 — 기대 항목 14/14, 1회 $0.012~0.019",
      },
    ],
    advanceIntro: "응답 형식, 디자인 시스템 분석, 생성 대기 시간을 수치로 개선했습니다.",
    metrics: [
      { label: "client 아래 server 오류", before: "3/4", after: "0", desc: "프롬프트 규칙 추가 후 검사 규칙으로 차단" },
      { label: "디자인 시스템 ‘읽지 못함’", before: "54개", after: "0개", desc: "HTML·라이브러리 상속 구분, 상대 경로 타입 추적" },
      { label: "초안 생성 첫 반응", before: "14초+", after: "0.6초", desc: "진행 단계 스트리밍으로 첫 알림" },
    ],
    extra: {
      title: "AI 에이전트 통제",
      items: [
        "CLAUDE.md 규칙과 스킬로 반복 작업 고정 (스펙 → 계획 → 승인 → 구현)",
        "훅으로 금지된 셸 명령을 실행 전에 차단",
        "커밋 전 타입 검사·테스트 1,019개, 변이 실험으로 테스트 효과 확인",
      ],
    },
  },
  {
    slug: "oneul",
    name: "오늘",
    badge: "4인 팀 · 프론트엔드 + 백엔드",
    tagline: "지친 마음을 위로하는 다이어리 커뮤니티",
    card: {
      summary: "지친 마음을 위로하는 다이어리 커뮤니티",
      meta: "2024.05 – 2026.08 · 4인 팀",
      highlight: "Reaction endpoint 10개 → 1개",
      tags: ["React", "RTK Query", "Express", "MongoDB"],
    },
    period: "2024.05 – 2026.08",
    role: "게시글·댓글·Reaction, REST API",
    team: "4인 팀 (페이지별 분담)",
    stack: "React · RTK Query · Styled-components · Express · MongoDB",
    links: [
      { label: "배포 사이트", href: "https://web-oneul-client-mgurfw3q791cc2d7.sel3.cloudtype.app/logIn" },
      { label: "GitHub", href: "https://github.com/full-stack-team-02/project-oneul" },
    ],
    note: "테스트 계정 test@gmail.com / !1q2w3e4r",
    hero: { image: "/images/oneul-hero.webp", alt: "오늘 서비스 화면", placeholder: "", fit: "object-left-top" },
    background: "4인이 페이지별로 나눠 프론트엔드와 백엔드를 함께 맡았고, 게시글·댓글·Reaction·검색 기능을 개발했습니다.",
    overview: {
      kind: "figure",
      image: "/images/oneul-flow.webp",
      alt: "오늘 시스템 구조도",
      caption: "게시글 조회(RTK Query 캐시) · 반응(낙관적 업데이트 → PUT /reaction) · 댓글(BottomSheet → Comment API)",
    },
    features: [
      {
        title: "다이어리 게시글·댓글",
        desc: "게시글·댓글 작성·수정·삭제, BottomSheet 댓글",
        image: ["/images/oneul-feature-1-1.webp", "/images/oneul-feature-1-2.webp"],
        placeholder: "[다이어리 게시글·댓글 화면]",
      },
      { title: "Reaction 5종", desc: "반응을 누르면 서버 응답 전에 즉시 반영", image: ["/images/oneul-feature-2.webp"], placeholder: "[Reaction 5종 화면]" },
      {
        title: "검색·베스트 게시글",
        desc: "키워드 검색과 좋아요 수 기반 베스트 선정",
        image: ["/images/oneul-feature-3-1.webp", "/images/oneul-feature-3-2.webp"],
        placeholder: "[검색·베스트 게시글 화면]",
      },
    ],
    issues: [
      {
        title: "계속 늘어나는 Reaction endpoint",
        problem: "반응 5종 × 반응·취소로 endpoint 10개, 타입 추가마다 2개씩 증가",
        cause: "반응을 게시글 안 email 배열로 저장해 응답도 커짐",
        action: "Reaction Collection 분리, PUT /reaction 하나로 통합, 낙관적 업데이트",
        result: "endpoint 10개 → 1개, 응답 크기 약 85%↓",
      },
      {
        title: "같은 조회 API의 반복 호출",
        problem: "마운트·BottomSheet를 열 때마다 같은 API 재호출",
        cause: "캐시 부재, profileImg 별도 요청, useEffect 연쇄 재요청",
        action: "RTK Query 도입, invalidateTags로 필요한 데이터만 갱신",
        result: "요청 수 삭제 약 75%↓ · 댓글 수정 약 78%↓",
      },
    ],
    advanceIntro: "재사용이 어려운 게시글 컴포넌트를 나누고 상태를 분리했습니다.",
    metrics: [
      { label: "SearchPage 코드", before: "822줄", after: "109줄", desc: "PostCard를 Header·Content·Action으로 분리" },
      { label: "댓글 수정 시 렌더링", before: "목록 전체", after: "수정 항목만", desc: "ModalSlice·CommentUISlice 분리, React.memo" },
      { label: "컴포넌트 재사용", before: "강결합", after: "메인·검색 공용", desc: "Button·Avatar·Modal·BottomSheet 공용화" },
    ],
    extra: {
      title: "남은 과제",
      items: ["mutation 후 refetch를 낙관적 업데이트 중심으로 줄이기", "수정 페이지 분리 후 SearchBar 리렌더링으로 늘어난 요청 개선"],
    },
  },
  {
    slug: "bovo",
    name: "Bovo",
    badge: "Kakao X Goorm 부트캠프 · 프론트엔드 팀장",
    tagline: "템플릿 기반 독서 기록 + 퀘스트 + 실시간 독서 토론방",
    card: {
      summary: "독서 기록·퀘스트·실시간 독서 토론방 서비스",
      meta: "2025.02 – 2025.06 · 8인 팀",
      highlight: "STOMP 기반 실시간 독서 토론방",
      tags: ["React", "Redux Toolkit", "STOMP", "MUI"],
    },
    period: "2025.02 – 2025.06",
    role: "프론트엔드 팀장 · 기본 구조·라우팅",
    team: "8인 (FE 3 · BE 5)",
    stack: "React · Redux Toolkit · React Query · MUI · STOMP",
    links: [
      { label: "시연 영상", href: "https://velog.io/@herjun802/Bovo-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%8B%9C%EC%97%B0-%EC%98%81%EC%83%81" },
      { label: "GitHub", href: "https://github.com/elvinleeys/bovo-client" },
    ],
    note: "서버 비용 문제로 배포를 중단해 시연 영상으로 대체했습니다.",
    hero: { image: "/images/bovo-hero.webp", alt: "Bovo 서비스 화면", placeholder: "", fit: "object-center" },
    background: "8인 팀에서 프론트엔드 팀장을 맡아 기본 구조·라우팅, 마이페이지, 퀘스트, 실시간 토론방을 개발했습니다.",
    overview: {
      kind: "figure",
      image: "/images/bovo-architecture.webp",
      alt: "Bovo 시스템 구조도",
      caption: "React(S3) ↔ Spring Boot(EC2) ↔ MySQL · Kakao 로그인·도서 검색 API · GitHub Actions 배포",
    },
    features: [
      {
        title: "템플릿 독서 기록",
        desc: "템플릿에 맞춰 독서 기록 작성",
        image: ["/images/bovo-feature-1-1.webp", "/images/bovo-feature-1-2.webp"],
        placeholder: "[템플릿 독서 기록 화면]",
      },
      { title: "퀘스트·배지", desc: "퀘스트 달성도와 배지 확인", image: ["/images/bovo-feature-2.webp"], placeholder: "[퀘스트·배지 화면]" },
      {
        title: "실시간 독서 토론방",
        desc: "STOMP 채팅과 독서 기록 공유 모달",
        image: ["/images/bovo-feature-3-1.webp", "/images/bovo-feature-3-2.webp"],
        placeholder: "[실시간 독서 토론방 화면]",
      },
    ],
    issues: [
      {
        title: "실시간 독서 토론방의 통신 방식",
        problem: "여러 사용자가 동시에 대화하는 토론방이 필요",
        cause: "Spring 서버라 socket.io 불가, polling은 서버 부담·지연 우려",
        action: "WebSocket + STOMP pub/sub, reconnectDelay·heartbeat로 연결 유지",
        result: "이벤트 즉시 전달, 연결이 끊겨도 자동 재연결",
      },
      {
        title: "ngrok에선 되던 WebSocket이 EC2에서 실패",
        problem: "실배포(EC2) 환경에서 WebSocket 연결 실패",
        cause: "HTTPS는 wss, 도메인 없는 HTTP는 ws — 프로토콜 불일치",
        action: "EC2 배포는 ws 경로 유지, S3 배포 환경에서 동작 확인",
        result: "배포 환경(http/https)에 따라 ws/wss가 결정됨을 확인",
      },
    ],
    advanceIntro: "반복 코드를 줄이고, 추측 대신 측정으로 개선 여부를 판단했습니다.",
    metrics: [
      { label: "토큰 처리", before: "요청마다 반복", after: "공통 처리", desc: "Axios interceptor로 토큰 첨부·재발급 자동화" },
      { label: "프로필 입력 리렌더링", before: "전체 TextField", after: "입력 칸만", desc: "React-Hook-Form, onBlur 시점 검사" },
      { label: "MUI import (가설 검증)", before: "624.86KB", after: "624.87KB", desc: "효과 없음 확인 → 실제 원인 AdapterDayjs(181KB) 발견" },
    ],
    extra: {
      title: "남은 과제",
      items: ["도메인·SSL 적용 후 wss로 전환", "토큰 저장을 Redux·sessionStorage 중 하나로 일원화", "AdapterDayjs lazy loading·vendor chunk 분리"],
    },
  },
];
