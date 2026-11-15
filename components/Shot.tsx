import type { Shot as ShotData } from "@/data/projects";
import { asset } from "@/lib/asset";

// 캡처 이미지가 있으면 이미지, 없으면 placeholder 문구가 든 회색 박스.
// image가 배열이면 잘리지 않게 나란히(stack이면 위아래로) 놓는다.
export function Shot({ shot, className }: { shot: ShotData; className: string }) {
  if (Array.isArray(shot.image)) {
    return (
      // min-h-0: 세로로 긴 이미지가 칸을 늘리지 않고 칸 비율(aspect)이 높이를 정하게 한다
      <div className={`flex min-h-0 items-center justify-center gap-3 overflow-hidden bg-thumb p-4 ${shot.stack ? "flex-col" : ""} ${className}`}>
        {shot.image.map((src, n) => (
          <img
            key={src}
            src={asset(src)}
            alt={shot.image!.length > 1 ? `${shot.alt} ${n + 1}` : (shot.alt ?? "")}
            // stack: 두 장이 gap(12px)을 나눠 가진 높이
            className={`${shot.stack ? "h-[calc(50%-6px)]" : "h-full"} w-auto min-w-0 rounded-lg border border-line bg-white object-contain`}
          />
        ))}
      </div>
    );
  }
  if (shot.image) {
    return (
      <img
        src={asset(shot.image)}
        alt={shot.alt ?? ""}
        className={`block w-full bg-white ${shot.fit === "object-contain" ? "object-contain" : `object-cover ${shot.fit ?? "object-top"}`} ${className}`}
      />
    );
  }
  return (
    <div className={`flex items-center justify-center bg-thumb text-muted ${className}`}>{shot.placeholder}</div>
  );
}
