# Vendas Digitais — Plataforma Multiprodutos

Painel administrativo + landing pages de venda para o ecossistema de produtos
digitais (Agilis, CRM Família, Dieta Bíblica, Árvore Genealógica, etc.).

## Stack
- React 18 + TypeScript
- Vite
- Tailwind CSS
- lucide-react (ícones)
- react-router-dom

## Rodar
```bash
npm install
npm run dev
```

- Painel Admin: `/admin`
- Landing CRM Família: `/lp/crm-familia`

## Estrutura de arquivos
```
src/
  main.tsx                     # rotas
  types.ts                     # tipos de domínio (Product, Order, AffiliateLink)
  lib/format.ts                # helpers brl / num / data
  data/mock.ts                 # dados simulados (produtos, pedidos, links)
  pages/
    AdminDashboard.tsx         # estado + composição do painel
    landing/CrmFamiliaLanding.tsx  # landing page completa
  components/admin/
    AdminLayout.tsx            # sidebar + topo + navegação por abas
    MetricsOverview.tsx        # cards: vendas, receita, conversão, leads
    ProductCatalog.tsx         # tabela editável (ativar/desativar, links, preço) — vira cards no mobile
    ProductShowcase.tsx        # Vitrine: visão do cliente, atalho p/ landing e checkout de cada produto
    OrdersPanel.tsx            # histórico (começa vazio) + simulador de webhook de gateway
    AffiliateManager.tsx       # gerador e rastreio de links de tráfego (UTM)
```

## Integração de Webhooks (conceitual)
Configurar nos gateways (Hotmart / Kirvano / Kiwify / Stripe) a URL:
```
POST https://api.vendasdigitais.app/webhooks/checkout
```
Eventos relevantes: `purchase.approved`, `purchase.refunded`, `purchase.chargeback`.
O painel (`OrdersPanel`) traz um botão "Simular venda (webhook)" que injeta um
pedido aprovado para demonstrar o fluxo.

## Próximos passos sugeridos
- Persistir produtos/pedidos/links no Supabase (tabelas `products`, `orders`, `affiliate_links`).
- Edge Function para receber os webhooks e validar assinatura de cada gateway.
- Auth (Supabase Auth) para o painel admin.
- Reaproveitar `CrmFamiliaLanding` como template parametrizável para os demais produtos.
