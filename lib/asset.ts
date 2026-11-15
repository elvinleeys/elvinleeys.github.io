// public/ 파일 경로에 GitHub Pages 하위 경로를 붙인다. 외부 URL·"#"은 그대로.
export const asset = (path: string) =>
  path.startsWith("/") ? `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}` : path;
