import Link from "next/link";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { asset } from "@/lib/asset";
import { Shot } from "@/components/Shot";

const pillBtn = "inline-flex items-center rounded-full font-semibold";
// 이메일이 채워지기 전엔 "#"
const mailHref = site.email.includes("@") ? `mailto:${site.email}` : "#";

export default function Home() {
  return (
    <>
      <header className="border-b border-line">
        <nav className="wrap flex h-[72px] items-center justify-between gap-6" aria-label="주 메뉴">
          <Link href="/" className="text-[18px] font-bold">
            {site.name}
            <span className="text-accent">.</span>
          </Link>
          <div className="flex items-center gap-8 text-[15px] font-medium max-[720px]:hidden">
            <a href="#projects">Projects</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <a href={asset(site.resume)} className="inline-flex h-11 items-center rounded-full border border-ink px-[18px]">
              이력서 PDF
            </a>
          </div>
        </nav>
      </header>

      <section className="wrap flex flex-col gap-7 pt-[120px] pb-28">
        <p className="eyebrow">FRONTEND DEVELOPER</p>
        <h1 className="m-0 text-[60px] leading-[1.25] font-bold tracking-[-0.03em] max-[720px]:text-[36px]">
          안녕하세요,
          <br />
          프론트엔드 개발자 {site.name}입니다.
        </h1>
        <p className="m-0 max-w-[560px] text-[19px] leading-[1.6] text-body">{site.intro}</p>
        <div className="mt-3 flex flex-wrap gap-3">
          <a href="#projects" className={`${pillBtn} h-[52px] gap-2 bg-ink px-6 text-[16px] text-white`}>
            프로젝트 보기
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </a>
          <a href="#contact" className={`${pillBtn} h-[52px] border border-line-strong px-6 text-[16px]`}>
            연락하기
          </a>
        </div>
      </section>

      <section id="projects" className="border-y border-line bg-soft">
        <div className="wrap flex flex-col gap-12 py-[104px]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex flex-col gap-3">
              <p className="eyebrow">PROJECTS</p>
              <h2 className="m-0 text-[40px] font-bold tracking-[-0.02em]">대표 프로젝트</h2>
            </div>
            <p className="m-0 text-[15px] text-muted">카드를 누르면 소개 · 문제 해결 · 고도화 과정을 볼 수 있어요.</p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,480px),1fr))] gap-7">
            {projects.map((p, i) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}/`}
                className="group flex flex-col overflow-hidden rounded-[20px] border border-line bg-white"
              >
                <Shot
                  shot={{ ...p.hero, alt: `${p.name} 화면`, placeholder: "[서비스 화면 캡처 · 16:10]" }}
                  className={`aspect-[16/10] text-[14px] group-hover:bg-thumb-hover ${p.hero.image ? "border-b border-line" : ""}`}
                />
                <div className="flex flex-auto flex-col gap-3.5 px-7 pt-7 pb-8">
                  <div className="flex items-center justify-between gap-3 text-[13px] text-muted">
                    <span className="font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <span>{p.card.meta}</span>
                  </div>
                  <h3 className="m-0 text-[24px] font-bold tracking-[-0.02em]">{p.name}</h3>
                  <p className="m-0 text-[16px] leading-[1.55] text-body">{p.card.summary}</p>
                  <p className="m-0 rounded-[10px] bg-accent-soft px-3.5 py-2.5 text-[14px] font-semibold text-accent-ink">
                    {p.card.highlight}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-1">
                    {p.card.tags.map((t) => (
                      <span key={t} className="rounded-full bg-chip px-3 py-1.5 text-[13px] font-medium text-sub">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="wrap flex flex-wrap gap-16 py-[104px]">
        <div className="flex flex-[1_1_360px] flex-col gap-4">
          <p className="eyebrow">ABOUT</p>
          <h2 className="m-0 text-[40px] font-bold tracking-[-0.02em]">이렇게 일해요</h2>
          <p className="m-0 text-[17px] leading-[1.7] text-body">{site.workStyle}</p>
        </div>
        <div className="flex flex-[999_1_480px] flex-col border-b border-line">
          {site.skills.map((s) => (
            <div key={s.group} className="flex flex-wrap gap-6 border-t border-line py-6">
              <p className="m-0 w-[120px] text-[15px] font-semibold">{s.group}</p>
              <div className="flex flex-[1_1_240px] flex-wrap gap-2">
                {s.items.map((t) => (
                  <span key={t} className="rounded-full border border-line px-3.5 py-1.5 text-[14px]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer id="contact" className="bg-ink text-white">
        <div className="wrap flex flex-col gap-14 pt-24 pb-12">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <h2 className="m-0 text-[40px] leading-[1.3] font-bold tracking-[-0.02em]">
              함께 일하고 싶다면
              <br />
              편하게 연락 주세요.
            </h2>
            <div className="flex flex-wrap gap-3 text-[15px]">
              <a href={mailHref} className={`${pillBtn} h-12 bg-white px-5 text-ink`}>
                {site.email}
              </a>
              {[
                ["GitHub", site.github],
                ["Blog", site.blog],
              ].map(([label, href]) => (
                <a key={label} href={href} className={`${pillBtn} h-12 border border-body px-5 text-white`}>
                  {label}
                </a>
              ))}
            </div>
          </div>
          <p className="m-0 border-t border-sub pt-6 text-[13px] text-faint">© 2026 {site.name}. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
