import type { NextConfig } from "next";

// GitHub Actions가 저장소 이름에 맞는 경로(예: /portfolio)를 넣어 준다. 로컬에선 빈 값.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  // <img src>에는 basePath가 자동으로 붙지 않아서 코드에서 직접 붙인다 (lib/asset.ts)
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default config;
