import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: process.env.GITHUB_PAGES === "true" ? "/web3-repo-risk-review-agent/" : "/",
  plugins: [react()],
});
