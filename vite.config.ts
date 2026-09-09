import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Publicado em institutohernandes.org/vendas/ (subpasta public_html/vendas).
// Se um dia mudar para domínio/subdomínio na raiz, volte base para "/".
export default defineConfig({
  base: "/vendas/",
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
