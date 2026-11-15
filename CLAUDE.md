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
- public 파일(`/images/...`, `/resume.pdf`)을 `<img>`/`<a>`에 쓸 땐 `asset()`으로 감싼다. 페이지 이동은 `next/link`.

## 남은 작업
- `data/site.ts`의 `[이름]`, `[나를 표현하는 한 문장]`, `[일하는 방식]`, `[이메일 주소]`, GitHub·Blog·이력서 링크(`"#"`) 채우기
- 회색 박스 → 캡처를 `public/images/`에 넣고 `data/projects.ts`의 해당 `hero`/`features` 항목에 `image: "/images/파일명.webp"` 추가
- GitHub 저장소 생성 → push → Settings → Pages → Source: "GitHub Actions"
