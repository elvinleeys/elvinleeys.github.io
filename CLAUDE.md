# 포트폴리오 웹사이트 — 작업 가이드

프론트엔드 개발자 포트폴리오. Next.js(App Router) + Tailwind CSS v4, 정적 export → GitHub Pages.

## 명령
- `npm run dev` — 로컬 개발 (http://localhost:3000)
- `npm run build` — `out/`에 정적 파일 생성
- `npm start` — `out/`을 로컬에서 서빙해 배포본 확인

## 구조
```
data/site.ts                 이름·소개·일하는 방식·이메일·GitHub·Blog·이력서·기술 스택
data/projects.ts             프로젝트 4개 내용 전부 (배열 순서 = 번호 = 이전/다음 순서)
app/page.tsx                 메인 (Hero → 프로젝트 카드 → About → Contact)
app/projects/[slug]/page.tsx 상세 템플릿 1개 (헤더 → 01 소개 → 02 문제 해결 → 03 고도화 → 이전/다음)
app/globals.css              색 토큰(@theme), --color-accent 하나로 강조색 변경
components/Shot.tsx          이미지가 있으면 <img>, 없으면 회색 placeholder 박스
lib/asset.ts                 public 파일 경로에 GitHub Pages 하위 경로를 붙임 — <img src>, PDF 링크에 사용
public/images/               구조도·화면 이미지
.github/workflows/deploy.yml main push → GitHub Pages 배포
```

## 규칙
- 한 화면에 글자가 많지 않게 유지한다: 카드 소개 30자, 섹션 설명 2줄, 문제/원인/조치/결과 각 1~2줄, 고도화는 수치 1개 + 한 줄.
- 수치는 직접 측정한 값만 쓴다. 지어낸 수치·문구를 넣지 않는다.
- 색은 흰 배경 + 포인트 컬러 1개(`accent`). `globals.css`의 토큰만 쓰고 새 색을 늘리지 않는다.
- 폰트: Inter + Noto Sans KR (Google Fonts, `app/layout.tsx`).
- 터치 영역 최소 44px, 텍스트 대비 4.5:1 이상, 아이콘만 있는 버튼엔 `aria-label`.
- 글자 크기는 `text-[14px]`처럼 px로 쓴다. `text-sm` 등은 줄 높이까지 바꿔서 원본 디자인과 어긋난다.
- 이미지 파일명: `<slug>-hero.webp`, `<slug>-feature-<번호>.webp`, 한 칸에 여러 장이면 `<slug>-feature-<번호>-<순서>.webp`. 원본 PNG는 WebP로 변환해 넣는다.
- 세로 모바일 캡처는 `image: ["..."]`처럼 배열로 넣는다(자르지 않고 나란히 표시, 칸당 1~2장). 가로 데스크톱 캡처 2장은 `stack: true`로 위아래 배치.
- 한 장을 칸에 꽉 채울 땐 `image: "..."` + 필요하면 `fit`(object-contain / object-left-top / object-center).
- public 파일(`/images/...`, `/resume.pdf`)을 `<img>`/`<a>`에 쓸 땐 `asset()`으로 감싼다. 페이지 이동은 `next/link`.

## 배포
- 저장소 https://github.com/elvinleeys/elvinleeys.github.io , main push → GitHub Actions → https://elvinleeys.github.io/
- Bovo 대표 이미지(`bovo-hero.webp`)는 원본이 558px라 흐림 — 큰 캡처가 생기면 교체
