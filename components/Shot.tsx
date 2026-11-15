import type { Shot as ShotData } from "@/data/projects";
import { asset } from "@/lib/asset";

// 캡처 이미지가 있으면 이미지, 없으면 placeholder 문구가 든 회색 박스
export function Shot({ shot, className }: { shot: ShotData; className: string }) {
  if (shot.image) {
    return (
      <img
        src={asset(shot.image)}
        alt={shot.alt ?? ""}
        className={`block w-full bg-white object-cover object-top ${className}`}
      />
    );
  }
  return (
    <div className={`flex items-center justify-center bg-thumb text-muted ${className}`}>{shot.placeholder}</div>
  );
}
