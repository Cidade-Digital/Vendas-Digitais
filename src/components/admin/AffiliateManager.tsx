import { useState } from "react";
import { Copy, Plus, MousePointerClick } from "lucide-react";
import type { AffiliateLink, TrafficSource, Product } from "../../types";
import { brl, num } from "../../lib/format";

const sources: TrafficSource[] = [
  "Instagram", "Facebook Ads", "TikTok", "Google", "Orgânico", "Afiliado",
];

export default function AffiliateManager({
  links,
  setLinks,
  products,
}: {
  links: AffiliateLink[];
  setLinks: React.Dispatch<React.SetStateAction<AffiliateLink[]>>;
  products: Product[];
}) {
  const [form, setForm] = useState({
    productId: products[0]?.id ?? "",
    label: "",
    source: "Instagram" as TrafficSource,
  });
  const [copied, setCopied] = useState<string | null>(null);

  const base = "https://vendasdigitais.app/go";

  const add = () => {
    if (!form.label.trim()) return;
    const product = products.find((p) => p.id === form.productId)!;
    const utm = `?utm_source=${form.source.toLowerCase().replace(" ", "-")}&utm_medium=link&utm_campaign=${form.label
      .toLowerCase()
      .replace(/\s+/g, "-")}`;
    setLinks((prev) => [
      {
        id: `aff-${prev.length + 1}`,
        productId: product.id,
        productName: product.name,
        label: form.label,
        source: form.source,
        utm,
        clicks: 0,
        sales: 0,
        revenue: 0,
      },
      ...prev,
    ]);
    setForm((f) => ({ ...f, label: "" }));
  };

  const copy = (l: AffiliateLink) => {
    const url = `${base}/${l.productId}${l.utm}`;
    navigator.clipboard?.writeText(url);
    setCopied(l.id);
    setTimeout(() => setCopied(null), 1500);
  };

  const totalClicks = links.reduce((s, l) => s + l.clicks, 0);
  const totalRevenue = links.reduce((s, l) => s + l.revenue, 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="text-sm text-slate-500">Cliques rastreados</div>
          <div className="text-xl font-bold">{num(totalClicks)}</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="text-sm text-slate-500">Receita atribuída</div>
          <div className="text-xl font-bold">{brl(totalRevenue)}</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="text-sm text-slate-500">Links ativos</div>
          <div className="text-xl font-bold">{links.length}</div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="font-semibold text-slate-900">Novo link de tráfego</h2>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <select
            value={form.productId}
            onChange={(e) => setForm((f) => ({ ...f, productId: e.target.value }))}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <select
            value={form.source}
            onChange={(e) =>
              setForm((f) => ({ ...f, source: e.target.value as TrafficSource }))
            }
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            {sources.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <input
            value={form.label}
            onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
            placeholder="Nome da campanha"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <button
            onClick={add}
            className="inline-flex items-center justify-center gap-1 rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            <Plus className="h-4 w-4" /> Gerar
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4 font-semibold text-slate-900">
          Gerenciador de Links de Afiliados / Tráfego
        </div>

        {/* Mobile: cards */}
        <div className="divide-y divide-slate-100 lg:hidden">
          {links.map((l) => (
            <div key={l.id} className="space-y-2 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-medium text-slate-900">{l.label}</div>
                  <div className="text-xs text-slate-500">{l.productName}</div>
                </div>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs">
                  {l.source}
                </span>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
                <span className="inline-flex items-center gap-1">
                  <MousePointerClick className="h-3.5 w-3.5 text-slate-400" />
                  {num(l.clicks)} cliques
                </span>
                <span>{l.sales} vendas</span>
                <span className="font-semibold text-slate-800">{brl(l.revenue)}</span>
              </div>
              <button
                onClick={() => copy(l)}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs hover:bg-slate-50"
              >
                <Copy className="h-3.5 w-3.5" />
                {copied === l.id ? "Copiado!" : "Copiar UTM"}
              </button>
            </div>
          ))}
        </div>

        {/* Desktop: tabela */}
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-3">Campanha</th>
                <th className="px-5 py-3">Produto</th>
                <th className="px-5 py-3">Origem</th>
                <th className="px-5 py-3">Cliques</th>
                <th className="px-5 py-3">Vendas</th>
                <th className="px-5 py-3">Receita</th>
                <th className="px-5 py-3">Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {links.map((l) => (
                <tr key={l.id}>
                  <td className="px-5 py-3 font-medium">{l.label}</td>
                  <td className="px-5 py-3">{l.productName}</td>
                  <td className="px-5 py-3">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs">
                      {l.source}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className="inline-flex items-center gap-1">
                      <MousePointerClick className="h-3.5 w-3.5 text-slate-400" />
                      {num(l.clicks)}
                    </span>
                  </td>
                  <td className="px-5 py-3">{l.sales}</td>
                  <td className="px-5 py-3 font-medium">{brl(l.revenue)}</td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => copy(l)}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs hover:bg-slate-50"
                    >
                      <Copy className="h-3.5 w-3.5" />
                      {copied === l.id ? "Copiado!" : "Copiar UTM"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
