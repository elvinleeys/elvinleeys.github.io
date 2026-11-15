// 대괄호 [ ] 값과 "#" 링크는 아직 비어 있는 자리. 채우면 사이트 전체에 반영된다.
export const site = {
  name: "[이름]",
  intro: "[나를 표현하는 한 문장 · 40자 이내]",
  workStyle: "[일하는 방식 · 2줄 이내]",
  email: "[이메일 주소]",
  github: "#",
  blog: "#",
  resume: "#", // PDF를 public/resume.pdf에 넣고 "/resume.pdf"로 바꾸기
  skills: [
    { group: "Frontend", items: ["TypeScript", "JavaScript", "React", "Next.js", "React Query", "Zustand", "Redux Toolkit", "TailwindCSS", "Storybook"] },
    { group: "Backend", items: ["Node.js", "Express.js", "MongoDB", "Supabase"] },
    { group: "AI", items: ["OpenAI API", "Claude Code"] },
    { group: "Deploy", items: ["Vercel", "Cloudtype", "AWS S3"] },
  ],
};
