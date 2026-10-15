import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The built site may only load its own files, YouTube thumbnails and the YouTube player.
// Added at build time only, because the dev server needs inline scripts for hot reload.
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self'",
  "img-src 'self' data: https://i.ytimg.com",
  "frame-src https://www.youtube-nocookie.com",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
].join("; ");

const contentSecurityPolicy = {
  name: "content-security-policy",
  apply: "build",
  transformIndexHtml: () => [
    {
      tag: "meta",
      attrs: {
        "http-equiv": "Content-Security-Policy",
        content: CONTENT_SECURITY_POLICY,
      },
      injectTo: "head-prepend",
    },
  ],
};

// If hosting under a subpath (e.g. GitHub Pages project site), set base: "/<repo-name>/".
export default defineConfig({
  plugins: [react(), contentSecurityPolicy],
  base: "./",
});
