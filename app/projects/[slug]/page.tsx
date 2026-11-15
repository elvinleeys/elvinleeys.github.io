import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { asset } from "@/lib/asset";
import { Shot } from "@/components/Shot";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return { title: `${p?.name} | ${site.name} 포트폴리오`, description: p?.tagline };
}

const h2 = "m-0 text-[36px] font-bold tracking-[-0.02em]";
const label = "m-0 text-[15px] font-bold";
const steps = [
  ["problem", "문제", "text-bad"],
  ["cause", "원인", "text-muted"],
  ["action", "조치", "text-accent"],
  ["result", "결과", "text-good"],
] as const;

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = projects[i];
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];

  return (
    <>
      <header className="border-b border-line">
        <nav className="wrap flex h-[72px] items-center justify-between gap-6" aria-label="주 메뉴">
          <Link href="/" className="inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            전체 프로젝트
          </Link>
          <Link href="/" className="text-[18px] font-bold">
            {site.name}
            <span className="text-accent">.</span>
          </Link>
        </nav>
      </header>

      <section className="wrap flex flex-col gap-10 pt-[88px] pb-14">
        <div className="flex flex-col gap-[18px]">
          <div className="flex flex-wrap items-center gap-3">
            <p className="eyebrow">PROJECT {String(i + 1).padStart(2, "0")}</p>
            <span className="rounded-full bg-accent-soft px-3 py-[5px] text-[13px] font-semibold text-accent-ink">{p.badge}</span>
          </div>
          <h1 className="m-0 text-[56px] leading-[1.2] font-bold tracking-[-0.03em] max-[720px]:text-[36px]">{p.name}</h1>
          <p className="m-0 max-w-[680px] text-[19px] leading-[1.6] text-body">{p.tagline}</p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] border-y border-line">
          {[
            ["기간", p.period],
            ["역할", p.role],
            ["인원", p.team],
            ["기술 스택", p.stack],
          ].map(([k, v]) => (
            <div key={k} className="flex flex-col gap-2 py-6 pr-6">
              <span className="text-[13px] text-muted">{k}</span>
              <span className="text-[16px] leading-[1.5] font-semibold">{v}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-3">
            {p.links.map((l, n) =>
              n === 0 ? (
                <a key={l.href} href={l.href} target="_blank" rel="noopener" className="inline-flex h-12 items-center gap-2 rounded-full bg-ink px-[22px] text-[15px] font-semibold text-white">
                  {l.label}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 17L17 7M8 7h9v9" />
                  </svg>
                </a>
              ) : (
                <a key={l.href} href={l.href} target="_blank" rel="noopener" className="inline-flex h-12 items-center rounded-full border border-line-strong px-[22px] text-[15px] font-semibold">
                  {l.label}
                </a>
              ),
            )}
          </div>
          {p.note && <p className="m-0 text-[14px] text-muted">{p.note}</p>}
        </div>
        <Shot shot={p.hero} className={`aspect-[16/8] rounded-3xl text-[15px] ${p.hero.image ? "border border-line" : ""}`} />
      </section>

      <div className="border-y border-line bg-white">
        <nav className="wrap flex gap-2 overflow-x-auto" aria-label="섹션 이동">
          {[
            ["intro", "01", "소개"],
            ["problem", "02", "문제 해결"],
            ["advance", "03", "고도화"],
          ].map(([id, no, text], n) => (
            <a
              key={id}
              href={`#${id}`}
              className={`inline-flex h-[60px] items-center gap-2 px-4 text-[15px] whitespace-nowrap ${n === 0 ? "border-b-2 border-accent font-semibold" : "font-medium text-body"}`}
            >
              <span className={n === 0 ? "text-accent" : undefined}>{no}</span>
              {text}
            </a>
          ))}
        </nav>
      </div>

      <section id="intro" className="wrap flex flex-col gap-14 py-[104px]">
        <div className="flex flex-wrap gap-12">
          <div className="flex flex-[1_1_300px] flex-col gap-3">
            <p className="eyebrow">01 · 소개</p>
            <h2 className={h2}>어떤 서비스인가요?</h2>
          </div>
          <div className="flex flex-[999_1_520px] flex-col gap-2.5">
            <p className={label}>프로젝트 배경</p>
            <p className="m-0 text-[17px] leading-[1.7] text-body">{p.background}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {p.overview.kind === "figure" ? (
            <>
              <p className={label}>시스템 아키텍처</p>
              <figure className="m-0 flex flex-col gap-3.5">
                <img src={asset(p.overview.image)} alt={p.overview.alt} className="block max-h-[520px] w-full rounded-[20px] border border-line bg-white object-contain p-6" />
                <figcaption className="text-[14px] leading-[1.6] text-muted">{p.overview.caption}</figcaption>
              </figure>
            </>
          ) : (
            <>
              <p className={label}>사용 흐름</p>
              <div className="flex flex-col gap-3.5">
                <ol className="m-0 flex list-none flex-wrap gap-3 p-0">
                  {p.overview.steps.map((s, n) => (
                    <li key={s} className="flex flex-[1_1_150px] flex-col gap-1.5 rounded-[14px] bg-soft p-5">
                      <span className="text-[13px] font-bold text-accent">{n + 1}단계</span>
                      <span className="text-[16px] font-bold">{s}</span>
                    </li>
                  ))}
                </ol>
                <p className="m-0 text-[14px] text-muted">{p.overview.caption}</p>
              </div>
            </>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <p className={label}>핵심 기능</p>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-6">
            {p.features.map((f) => (
              <div key={f.title} className="flex flex-col gap-3.5">
                <Shot shot={{ ...f, alt: f.alt ?? `${f.title} 화면` }} className={`aspect-[4/3] rounded-2xl text-[14px] ${typeof f.image === "string" ? "border border-line" : ""}`} />
                <p className="m-0 text-[18px] font-bold">{f.title}</p>
                <p className="m-0 text-[15px] leading-[1.6] text-body">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="problem" className="border-y border-line bg-soft">
        <div className="wrap flex flex-col gap-12 py-[104px]">
          <div className="flex flex-col gap-3">
            <p className="eyebrow">02 · 문제 해결</p>
            <h2 className={h2}>어떤 문제를, 어떻게 풀었나요?</h2>
          </div>
          {p.issues.map((issue, n) => (
            <article key={issue.title} className="flex flex-col gap-7 rounded-[20px] border border-line bg-white p-9">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-ink px-3 py-1.5 text-[13px] font-semibold text-white">Issue {String(n + 1).padStart(2, "0")}</span>
                <h3 className="m-0 text-[22px] font-bold">{issue.title}</h3>
              </div>
              <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-4 p-0">
                {steps.map(([key, name, color]) => (
                  <li key={key} className={`flex flex-col gap-2.5 rounded-[14px] p-5 ${key === "result" ? "bg-accent-soft" : "bg-soft"}`}>
                    <span className={`text-[13px] font-bold ${color}`}>{name}</span>
                    <span className="text-[15px] leading-[1.6] text-sub">{issue[key]}</span>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </section>

      <section id="advance" className="wrap flex flex-col gap-12 py-[104px]">
        <div className="flex flex-col gap-3">
          <p className="eyebrow">03 · 고도화</p>
          <h2 className={h2}>무엇을 더 개선했나요?</h2>
          <p className="mt-1 mb-0 text-[17px] leading-[1.6] text-body">{p.advanceIntro}</p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-6">
          {p.metrics.map((m) => (
            <div key={m.label} className="flex flex-col gap-5 rounded-[20px] border border-line p-8">
              <p className={label}>{m.label}</p>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[20px] font-semibold text-muted line-through">{m.before}</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5F6672" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                {/* 긴 값은 한 줄에 들어가도록 작게 */}
                <span className={`font-bold tracking-[-0.02em] text-accent ${m.after.length >= 8 ? "text-[26px]" : "text-[36px]"}`}>{m.after}</span>
              </div>
              <p className="m-0 text-[15px] leading-[1.6] text-body">{m.desc}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-start gap-x-12 gap-y-6 rounded-[20px] bg-soft px-9 py-8">
          <p className={`${label} w-40`}>{p.extra.title}</p>
          <ul className="m-0 flex flex-[1_1_360px] list-disc flex-col gap-2.5 pl-[18px] text-[15px] leading-[1.6] text-sub">
            {p.extra.items.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </section>

      <nav className="border-t border-line" aria-label="다른 프로젝트">
        <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))]">
          <Link href={`/projects/${prev.slug}/`} className="flex flex-col gap-2 py-10">
            <span className="text-[13px] text-muted">← 이전 프로젝트</span>
            <span className="text-[20px] font-bold">{prev.name}</span>
          </Link>
          <Link href={`/projects/${next.slug}/`} className="flex flex-col items-end gap-2 py-10 text-right">
            <span className="text-[13px] text-muted">다음 프로젝트 →</span>
            <span className="text-[20px] font-bold">{next.name}</span>
          </Link>
        </div>
      </nav>

      <footer className="bg-ink">
        <p className="wrap py-8 text-[13px] text-faint">© 2026 {site.name}. All rights reserved.</p>
      </footer>
    </>
  );
}
