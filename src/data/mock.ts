import type { Product, Order, AffiliateLink } from "../types";

export const initialProducts: Product[] = [
  {
    id: "agilis",
    name: "Agilis",
    category: "Gestão / Produtividade",
    description: "App de produtividade e organização de tarefas para o dia a dia.",
    price: 97,
    status: "ativo",
    landingUrl: "https://vendasdigitais.app/lp/agilis",
    checkoutUrl: "https://pay.hotmart.com/agilis",
    sales: 0,
    revenue: 0,
    conversionRate: 0,
  },
  {
    id: "crm-familia",
    name: "CRM Família",
    category: "Gestão Familiar",
    description:
      "Gestão completa da rotina, finanças, filhos e negócios da família em um só lugar.",
    price: 197,
    status: "ativo",
    landingUrl: "/lp/crm-familia",
    checkoutUrl: "https://pay.kirvano.com/crm-familia",
    sales: 0,
    revenue: 0,
    conversionRate: 0,
  },
  {
    id: "dieta-biblica",
    name: "Dieta Bíblica",
    category: "Saúde / Bem-estar",
    description: "Programa alimentar baseado em princípios bíblicos.",
    price: 67,
    status: "ativo",
    landingUrl: "https://vendasdigitais.app/lp/dieta-biblica",
    checkoutUrl: "https://pay.kiwify.com.br/dieta-biblica",
    sales: 0,
    revenue: 0,
    conversionRate: 0,
  },
  {
    id: "arvore-genealogica",
    name: "Árvore Genealógica",
    category: "Família / Memória",
    description: "Monte e compartilhe a história da sua família.",
    price: 47,
    status: "inativo",
    landingUrl: "https://vendasdigitais.app/lp/arvore-genealogica",
    checkoutUrl: "https://pay.stripe.com/arvore",
    sales: 0,
    revenue: 0,
    conversionRate: 0,
  },
];

// Nenhuma venda aconteceu ainda — histórico começa vazio.
// Use o botão "Simular venda (webhook)" no painel para testar o fluxo.
export const initialOrders: Order[] = [];

// Links de tráfego cadastrados, ainda sem cliques/vendas registrados.
export const initialAffiliateLinks: AffiliateLink[] = [
  {
    id: "aff-1", productId: "crm-familia", productName: "CRM Família",
    label: "Reels rotina da casa", source: "Instagram",
    utm: "?utm_source=instagram&utm_medium=reels&utm_campaign=rotina",
    clicks: 0, sales: 0, revenue: 0,
  },
  {
    id: "aff-2", productId: "crm-familia", productName: "CRM Família",
    label: "Campanha Casais - FB", source: "Facebook Ads",
    utm: "?utm_source=facebook&utm_medium=cpc&utm_campaign=casais",
    clicks: 0, sales: 0, revenue: 0,
  },
  {
    id: "aff-3", productId: "agilis", productName: "Agilis",
    label: "TikTok produtividade", source: "TikTok",
    utm: "?utm_source=tiktok&utm_medium=organic&utm_campaign=foco",
    clicks: 0, sales: 0, revenue: 0,
  },
];
