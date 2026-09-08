import { useState } from "react";
import AdminLayout, { type AdminTab } from "../components/admin/AdminLayout";
import MetricsOverview from "../components/admin/MetricsOverview";
import ProductCatalog from "../components/admin/ProductCatalog";
import ProductShowcase from "../components/admin/ProductShowcase";
import OrdersPanel from "../components/admin/OrdersPanel";
import AffiliateManager from "../components/admin/AffiliateManager";
import {
  initialProducts,
  initialOrders,
  initialAffiliateLinks,
} from "../data/mock";

export default function AdminDashboard() {
  const [tab, setTab] = useState<AdminTab>("overview");
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [links, setLinks] = useState(initialAffiliateLinks);

  return (
    <AdminLayout active={tab} onChange={setTab}>
      {tab === "overview" && (
        <div className="space-y-6">
          <MetricsOverview orders={orders} />
          <ProductCatalog products={products} setProducts={setProducts} />
        </div>
      )}
      {tab === "catalog" && (
        <ProductCatalog products={products} setProducts={setProducts} />
      )}
      {tab === "storefront" && <ProductShowcase products={products} />}
      {tab === "orders" && <OrdersPanel orders={orders} setOrders={setOrders} />}
      {tab === "affiliates" && (
        <AffiliateManager links={links} setLinks={setLinks} products={products} />
      )}
    </AdminLayout>
  );
}
