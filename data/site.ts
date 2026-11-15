// 대괄호 [ ] 값과 "#" 링크는 아직 비어 있는 자리. 채우면 사이트 전체에 반영된다.
export const site = {
  name: "이영섭",
  intro: "사용자가 느끼는 불편을 화면에서 풀어내려는 프론트엔드 개발자",
  // \n 위치에서 줄바꿈된다
  workStyle:
    "1. 사용자 경험과 재사용성을 기준으로 화면과 컴포넌트를 설계하고, 문제가 생기면 개발자 도구와 Lighthouse로 원인부터 확인합니다.\n" +
    "2. 막히면 검색·라이브러리·AI를 활용하되 원리를 이해하고 넘어가며, 팀에서는 짧고 잦은 소통으로 충돌과 병목을 줄입니다.",
  email: "herjun802@naver.com",
  github: "https://github.com/elvinleeys",
  blog: "https://velog.io/@herjun802/posts",
  resume: "/resume.pdf", // PDF를 public/resume.pdf에 넣고 "/resume.pdf"로 바꾸기
  skills: [
    { group: "Frontend", items: ["TypeScript", "JavaScript", "React", "Next.js", "React Query", "Zustand", "Redux Toolkit", "TailwindCSS", "Storybook"] },
    { group: "Backend", items: ["Node.js", "Express.js", "MongoDB", "Supabase"] },
    { group: "AI", items: ["OpenAI API", "Claude Code"] },
    { group: "Deploy", items: ["Vercel", "Cloudtype", "AWS S3"] },
  ],
};
