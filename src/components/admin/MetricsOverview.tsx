import { TrendingUp, DollarSign, Percent, Users } from "lucide-react";
import type { Order } from "../../types";
import { brl, num } from "../../lib/format";

function Card({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: typeof TrendingUp;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500">{label}</span>
        <span className="rounded-lg bg-brand-50 p-2 text-brand-600">
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <div className="mt-3 text-2xl font-bold text-slate-900">{value}</div>
      <div className="mt-1 text-xs text-emerald-600">{hint}</div>
    </div>
  );
}

export default function MetricsOverview({ orders }: { orders: Order[] }) {
  const approved = orders.filter((o) => o.status === "aprovado");
  const totalSales = approved.length;
  const revenue = approved.reduce((s, o) => s + o.amount, 0);
  const leads = new Set(orders.map((o) => o.email)).size;
  const conv = leads > 0 ? (totalSales / leads) * 100 : 0;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Card icon={TrendingUp} label="Total de Vendas" value={num(totalSales)} hint="Vendas aprovadas" />
      <Card icon={DollarSign} label="Receita Acumulada" value={brl(revenue)} hint="Somatório de vendas aprovadas" />
      <Card icon={Percent} label="Taxa de Conversão" value={`${conv.toFixed(1)}%`} hint="Vendas / leads" />
      <Card icon={Users} label="Leads" value={num(leads)} hint="Contatos únicos" />
    </div>
  );
}
