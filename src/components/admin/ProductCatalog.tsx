import { useState } from "react";
import { Pencil, Check, X, ExternalLink } from "lucide-react";
import type { Product } from "../../types";
import { brl, num } from "../../lib/format";

export default function ProductCatalog({
  products,
  setProducts,
}: {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}) {
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState<Partial<Product>>({});

  const toggle = (id: string) =>
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "ativo" ? "inativo" : "ativo" }
          : p
      )
    );

  const startEdit = (p: Product) => {
    setEditing(p.id);
    setDraft({ landingUrl: p.landingUrl, checkoutUrl: p.checkoutUrl, price: p.price });
  };

  const save = (id: string) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...draft } : p)));
    setEditing(null);
  };

  const Toggle = ({ p }: { p: Product }) => (
    <button
      onClick={() => toggle(p.id)}
      aria-label={`Alternar status de ${p.name}`}
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
        p.status === "ativo" ? "bg-brand-500" : "bg-slate-300"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
          p.status === "ativo" ? "left-[22px]" : "left-0.5"
        }`}
      />
    </button>
  );

  const LinkInputs = () => (
    <div className="space-y-2">
      <input
        value={draft.landingUrl ?? ""}
        onChange={(e) => setDraft((d) => ({ ...d, landingUrl: e.target.value }))}
        placeholder="Landing URL"
        className="w-full max-w-xs rounded border border-slate-300 px-2 py-1 text-xs"
      />
      <input
        value={draft.checkoutUrl ?? ""}
        onChange={(e) => setDraft((d) => ({ ...d, checkoutUrl: e.target.value }))}
        placeholder="Checkout URL"
        className="w-full max-w-xs rounded border border-slate-300 px-2 py-1 text-xs"
      />
    </div>
  );

  const LinkView = ({ p }: { p: Product }) => (
    <div className="flex gap-4 text-xs sm:block sm:space-y-1">
      <a href={p.landingUrl} className="flex items-center gap-1 text-brand-600 hover:underline">
        <ExternalLink className="h-3 w-3" /> Landing
      </a>
      <a href={p.checkoutUrl} className="flex items-center gap-1 text-brand-600 hover:underline">
        <ExternalLink className="h-3 w-3" /> Checkout
      </a>
    </div>
  );

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="font-semibold text-slate-900">Catálogo de Produtos</h2>
        <p className="text-sm text-slate-500">
          Ative/desative produtos e edite links de landing page e checkout.
        </p>
      </div>

      {/* Mobile: cards */}
      <div className="divide-y divide-slate-100 lg:hidden">
        {products.map((p) => {
          const isEditing = editing === p.id;
          return (
            <div key={p.id} className="space-y-3 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold text-slate-900">{p.name}</div>
                  <div className="text-xs text-slate-500">{p.category}</div>
                </div>
                <Toggle p={p} />
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-lg bg-slate-50 p-2">
                  <div className="text-slate-400">Preço</div>
                  {isEditing ? (
                    <input
                      type="number"
                      value={draft.price ?? 0}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, price: Number(e.target.value) }))
                      }
                      className="mt-1 w-full rounded border border-slate-300 px-1 py-0.5 text-center"
                    />
                  ) : (
                    <div className="font-semibold text-slate-800">{brl(p.price)}</div>
                  )}
                </div>
                <div className="rounded-lg bg-slate-50 p-2">
                  <div className="text-slate-400">Vendas</div>
                  <div className="font-semibold text-slate-800">{num(p.sales)}</div>
                </div>
                <div className="rounded-lg bg-slate-50 p-2">
                  <div className="text-slate-400">Conversão</div>
                  <div className="font-semibold text-slate-800">
                    {p.conversionRate.toFixed(1)}%
                  </div>
                </div>
              </div>

              {isEditing ? <LinkInputs /> : <LinkView p={p} />}

              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={() => save(p.id)}
                      className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-brand-500 py-2 text-xs font-semibold text-white"
                    >
                      <Check className="h-4 w-4" /> Salvar
                    </button>
                    <button
                      onClick={() => setEditing(null)}
                      className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-slate-200 py-2 text-xs font-semibold"
                    >
                      <X className="h-4 w-4" /> Cancelar
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => startEdit(p)}
                    className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-slate-300 py-2 text-xs font-medium"
                  >
                    <Pencil className="h-3.5 w-3.5" /> Editar
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop: tabela */}
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
            <tr>
              <th className="px-5 py-3">Produto</th>
              <th className="px-5 py-3">Preço</th>
              <th className="px-5 py-3">Vendas</th>
              <th className="px-5 py-3">Conversão</th>
              <th className="px-5 py-3">Links</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((p) => {
              const isEditing = editing === p.id;
              return (
                <tr key={p.id} className="align-top">
                  <td className="px-5 py-4">
                    <div className="font-semibold text-slate-900">{p.name}</div>
                    <div className="text-xs text-slate-500">{p.category}</div>
                  </td>
                  <td className="px-5 py-4">
                    {isEditing ? (
                      <input
                        type="number"
                        value={draft.price ?? 0}
                        onChange={(e) =>
                          setDraft((d) => ({ ...d, price: Number(e.target.value) }))
                        }
                        className="w-24 rounded border border-slate-300 px-2 py-1"
                      />
                    ) : (
                      brl(p.price)
                    )}
                  </td>
                  <td className="px-5 py-4">{num(p.sales)}</td>
                  <td className="px-5 py-4">{p.conversionRate.toFixed(1)}%</td>
                  <td className="px-5 py-4">
                    {isEditing ? <LinkInputs /> : <LinkView p={p} />}
                  </td>
                  <td className="px-5 py-4">
                    <Toggle p={p} />
                    <div className="mt-1 text-xs text-slate-500">{p.status}</div>
                  </td>
                  <td className="px-5 py-4 text-right">
                    {isEditing ? (
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => save(p.id)}
                          className="rounded bg-brand-500 p-1.5 text-white"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setEditing(null)}
                          className="rounded bg-slate-200 p-1.5"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => startEdit(p)}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium hover:bg-slate-50"
                      >
                        <Pencil className="h-3.5 w-3.5" /> Editar
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
