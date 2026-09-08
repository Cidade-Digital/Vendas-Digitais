import { useMemo, useState } from "react";
import { Webhook, Plus } from "lucide-react";
import type { Order, OrderStatus, Gateway } from "../../types";
import { brl, dateBR } from "../../lib/format";

const statusStyle: Record<OrderStatus, string> = {
  aprovado: "bg-emerald-100 text-emerald-700",
  pendente: "bg-amber-100 text-amber-700",
  reembolsado: "bg-slate-200 text-slate-600",
  recusado: "bg-red-100 text-red-700",
};

const gateways: Gateway[] = ["Hotmart", "Kirvano", "Kiwify", "Stripe"];

function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${statusStyle[status]}`}
    >
      {status}
    </span>
  );
}

export default function OrdersPanel({
  orders,
  setOrders,
}: {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}) {
  const [filter, setFilter] = useState<"todos" | OrderStatus>("todos");

  const filtered = useMemo(
    () => (filter === "todos" ? orders : orders.filter((o) => o.status === filter)),
    [orders, filter]
  );

  const simulateWebhook = () => {
    const g = gateways[Math.floor(Math.random() * gateways.length)];
    const now = new Date().toISOString();
    setOrders((prev) => [
      {
        id: `#${10240 + prev.length + 1}`,
        productId: "crm-familia",
        productName: "CRM Família",
        customer: "Cliente Webhook",
        email: "webhook@cliente.com",
        amount: 197,
        gateway: g,
        status: "aprovado",
        source: "Instagram",
        createdAt: now,
      },
      ...prev,
    ]);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-dashed border-brand-300 bg-brand-50 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Webhook className="h-5 w-5 shrink-0 text-brand-600" />
          <div className="flex-1 text-sm text-slate-700">
            <strong>Integração via Webhook:</strong> aponte a URL{" "}
            <code className="break-all rounded bg-white px-1.5 py-0.5 text-xs">
              https://api.vendasdigitais.app/webhooks/checkout
            </code>{" "}
            nos gateways Hotmart, Kirvano, Kiwify ou Stripe. Eventos:{" "}
            <em>purchase.approved</em>, <em>purchase.refunded</em>.
          </div>
          <button
            onClick={simulateWebhook}
            className="inline-flex items-center justify-center gap-1 rounded-lg bg-brand-600 px-3 py-2 text-xs font-semibold text-white hover:bg-brand-700"
          >
            <Plus className="h-4 w-4" /> Simular venda (webhook)
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <h2 className="font-semibold text-slate-900">Vendas / Pedidos</h2>
          <div className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1">
            {(["todos", "aprovado", "pendente", "reembolsado", "recusado"] as const).map(
              (s) => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium capitalize ${
                    filter === s
                      ? "bg-ink text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {s}
                </button>
              )
            )}
          </div>
        </div>

        {filtered.length === 0 && (
          <div className="px-5 py-12 text-center text-sm text-slate-500">
            Nenhuma venda registrada ainda. Use{" "}
            <strong>Simular venda (webhook)</strong> para testar o fluxo.
          </div>
        )}

        {/* Mobile: cards */}
        <div className="divide-y divide-slate-100 lg:hidden">
          {filtered.map((o) => (
            <div key={o.id} className="space-y-2 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold text-slate-900">{o.productName}</div>
                  <div className="text-xs text-slate-500">
                    {o.customer} · {o.email}
                  </div>
                </div>
                <StatusBadge status={o.status} />
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
                <span className="font-mono">{o.id}</span>
                <span>{o.gateway}</span>
                <span>Origem: {o.source}</span>
                <span>{dateBR(o.createdAt)}</span>
                <span className="font-semibold text-slate-800">{brl(o.amount)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: tabela */}
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-3">Pedido</th>
                <th className="px-5 py-3">Produto</th>
                <th className="px-5 py-3">Cliente</th>
                <th className="px-5 py-3">Gateway</th>
                <th className="px-5 py-3">Origem</th>
                <th className="px-5 py-3">Valor</th>
                <th className="px-5 py-3">Data</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((o) => (
                <tr key={o.id}>
                  <td className="px-5 py-3 font-mono text-xs">{o.id}</td>
                  <td className="px-5 py-3">{o.productName}</td>
                  <td className="px-5 py-3">
                    <div>{o.customer}</div>
                    <div className="text-xs text-slate-400">{o.email}</div>
                  </td>
                  <td className="px-5 py-3">{o.gateway}</td>
                  <td className="px-5 py-3">{o.source}</td>
                  <td className="px-5 py-3 font-medium">{brl(o.amount)}</td>
                  <td className="px-5 py-3">{dateBR(o.createdAt)}</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={o.status} />
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
