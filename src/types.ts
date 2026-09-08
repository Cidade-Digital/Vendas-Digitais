export type ProductStatus = "ativo" | "inativo";

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  status: ProductStatus;
  landingUrl: string;
  checkoutUrl: string;
  sales: number;
  revenue: number;
  conversionRate: number; // 0-100
}

export type OrderStatus = "aprovado" | "pendente" | "reembolsado" | "recusado";
export type Gateway = "Hotmart" | "Kirvano" | "Kiwify" | "Stripe";

export interface Order {
  id: string;
  productId: string;
  productName: string;
  customer: string;
  email: string;
  amount: number;
  gateway: Gateway;
  status: OrderStatus;
  source: TrafficSource;
  createdAt: string; // ISO
}

export type TrafficSource =
  | "Instagram"
  | "Facebook Ads"
  | "TikTok"
  | "Google"
  | "Orgânico"
  | "Afiliado";

export interface AffiliateLink {
  id: string;
  productId: string;
  productName: string;
  label: string;
  source: TrafficSource;
  utm: string;
  clicks: number;
  sales: number;
  revenue: number;
}
