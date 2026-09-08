import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "/" => publicado na raiz do domínio (ex.: https://vendas.institutohernandes.org/)
// Se publicar numa subpasta (ex.: institutohernandes.org/vendas/), troque para "/vendas/".
export default defineConfig({
  base: "/",
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
