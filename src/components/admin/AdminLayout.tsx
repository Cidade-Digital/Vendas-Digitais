import { useState } from "react";
import {
  LayoutDashboard, Package, ShoppingCart, Link2, Menu, X, Store, Rocket,
} from "lucide-react";

export type AdminTab =
  | "overview"
  | "catalog"
  | "storefront"
  | "orders"
  | "affiliates";

const nav: { id: AdminTab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Visão Geral", icon: LayoutDashboard },
  { id: "catalog", label: "Catálogo de Produtos", icon: Package },
  { id: "storefront", label: "Vitrine (visão do cliente)", icon: Store },
  { id: "orders", label: "Vendas / Pedidos", icon: ShoppingCart },
  { id: "affiliates", label: "Links de Tráfego", icon: Link2 },
];

export default function AdminLayout({
  active,
  onChange,
  children,
}: {
  active: AdminTab;
  onChange: (t: AdminTab) => void;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-ink text-slate-100 transition-transform lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-2 px-5 py-5 text-lg font-bold">
          <Rocket className="h-6 w-6 text-brand-500" />
          Vendas Digitais
        </div>
        <nav className="mt-2 space-y-1 px-3">
          {nav.map((n) => {
            const Icon = n.icon;
            return (
              <button
                key={n.id}
                onClick={() => {
                  onChange(n.id);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  active === n.id
                    ? "bg-brand-600 text-white"
                    : "text-slate-300 hover:bg-white/5"
                }`}
              >
                <Icon className="h-4.5 w-4.5" />
                {n.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white/80 px-4 py-3 backdrop-blur lg:px-8">
          <button className="lg:hidden" onClick={() => setOpen((v) => !v)}>
            {open ? <X /> : <Menu />}
          </button>
          <h1 className="text-sm font-semibold text-slate-500">
            Painel Administrativo · Vendas Digitais
          </h1>
          <div className="h-8 w-8 rounded-full bg-brand-500 text-center text-sm font-bold leading-8 text-white">
            F
          </div>
        </header>
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
