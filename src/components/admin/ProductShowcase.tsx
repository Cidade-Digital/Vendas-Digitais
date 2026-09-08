import { ExternalLink, ShoppingBag, Eye, CircleSlash } from "lucide-react";
import type { Product } from "../../types";
import { brl } from "../../lib/format";

/**
 * Vitrine: mostra cada produto do jeito que o cliente encontra do outro lado,
 * com atalho para a página de vendas (landing) e para o checkout.
 */
export default function ProductShowcase({ products }: { products: Product[] }) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="font-semibold text-slate-900">Vitrine — visão do cliente</h2>
        <p className="text-sm text-slate-500">
          Abra a página de vendas de cada produto para ver exatamente o que o
          cliente vê antes de comprar. Produtos inativos não recebem tráfego.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {products.map((p) => {
          const inactive = p.status !== "ativo";
          return (
            <div
              key={p.id}
              className={`flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm ${
                inactive ? "border-slate-200 opacity-60" : "border-slate-200"
              }`}
            >
              {/* mini-preview da landing */}
              <div className="relative aspect-video bg-gradient-to-br from-brand-50 to-brand-100 p-4">
                <div className="rounded-lg bg-white/80 p-3 shadow-sm">
                  <div className="h-2 w-16 rounded bg-brand-300" />
                  <div className="mt-2 h-2 w-28 rounded bg-slate-200" />
                  <div className="mt-1 h-2 w-20 rounded bg-slate-200" />
                  <div className="mt-3 h-5 w-24 rounded bg-brand-500" />
                </div>
                <span
                  className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    inactive
                      ? "bg-slate-200 text-slate-600"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {p.status}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="text-xs font-medium uppercase tracking-wide text-brand-600">
                  {p.category}
                </div>
                <h3 className="mt-1 text-lg font-bold text-slate-900">{p.name}</h3>
                <p className="mt-1 flex-1 text-sm text-slate-600">{p.description}</p>

                <div className="mt-4 text-2xl font-extrabold text-ink">
                  {brl(p.price)}
                </div>

                <div className="mt-4 grid gap-2">
                  <a
                    href={p.landingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold ${
                      inactive
                        ? "cursor-not-allowed bg-slate-100 text-slate-400"
                        : "bg-brand-600 text-white hover:bg-brand-700"
                    }`}
                    onClick={(e) => inactive && e.preventDefault()}
                  >
                    {inactive ? (
                      <CircleSlash className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                    Ver página de vendas
                  </a>
                  <a
                    href={p.checkoutUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    <ShoppingBag className="h-4 w-4" /> Ir para o checkout
                  </a>
                </div>

                <div className="mt-3 flex items-center gap-1 text-xs text-slate-400">
                  <ExternalLink className="h-3 w-3" />
                  <span className="truncate">{p.landingUrl}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
