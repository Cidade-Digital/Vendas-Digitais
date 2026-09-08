-- ============================================================
-- Vendas Digitais — schema do banco (PostgreSQL / Supabase)
-- Rode em: Supabase > SQL Editor
-- ============================================================

create table if not exists products (
  id            text primary key,
  name          text not null,
  category      text not null,
  description   text not null default '',
  price         numeric(10,2) not null default 0,
  status        text not null default 'ativo' check (status in ('ativo','inativo')),
  landing_url   text not null default '',
  checkout_url  text not null default '',
  created_at    timestamptz not null default now()
);

create table if not exists affiliate_links (
  id           uuid primary key default gen_random_uuid(),
  product_id   text not null references products(id) on delete cascade,
  label        text not null,
  source       text not null,
  utm          text not null,
  clicks       integer not null default 0,
  created_at   timestamptz not null default now()
);

create table if not exists orders (
  id           uuid primary key default gen_random_uuid(),
  external_id  text,                         -- id do pedido no gateway
  product_id   text references products(id),
  customer     text,
  email        text,
  amount       numeric(10,2) not null default 0,
  gateway      text not null,                -- Hotmart | Kirvano | Kiwify | Stripe
  status       text not null,               -- aprovado | pendente | reembolsado | recusado
  source       text,                        -- origem do tráfego / utm_source
  affiliate_id uuid references affiliate_links(id),
  created_at   timestamptz not null default now()
);

create index if not exists orders_product_idx on orders(product_id);
create index if not exists orders_created_idx on orders(created_at desc);
create index if not exists aff_product_idx on affiliate_links(product_id);

-- ------------------------------------------------------------
-- Métricas agregadas (a coluna "sales"/"revenue" do front sai daqui)
-- ------------------------------------------------------------
create or replace view product_metrics as
select
  p.id,
  p.name,
  count(o.*) filter (where o.status = 'aprovado')                as sales,
  coalesce(sum(o.amount) filter (where o.status = 'aprovado'),0) as revenue
from products p
left join orders o on o.product_id = p.id
group by p.id, p.name;

-- ------------------------------------------------------------
-- Row Level Security
-- ------------------------------------------------------------
alter table products        enable row level security;
alter table affiliate_links enable row level security;
alter table orders          enable row level security;

-- Catálogo público (a landing page lê preço/links sem login)
create policy "products public read"
  on products for select using (true);

-- Painel admin: apenas usuários autenticados leem/gravam tudo
create policy "admin all products"
  on products for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin all links"
  on affiliate_links for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin read orders"
  on orders for select using (auth.role() = 'authenticated');

-- Os INSERTs de pedidos vêm do webhook (Edge Function usando a service_role key,
-- que ignora RLS). O front nunca escreve em orders diretamente.

-- ------------------------------------------------------------
-- Seed inicial (os 4 produtos, sem nenhuma venda)
-- ------------------------------------------------------------
insert into products (id, name, category, description, price, status, landing_url, checkout_url) values
  ('agilis',             'Agilis',             'Gestão / Produtividade', 'App de produtividade e organização de tarefas para o dia a dia.', 97,  'ativo',   'https://vendasdigitais.app/lp/agilis',             'https://pay.hotmart.com/agilis'),
  ('crm-familia',        'CRM Família',        'Gestão Familiar',        'Gestão completa da rotina, finanças, filhos e negócios da família em um só lugar.', 197, 'ativo', '/lp/crm-familia', 'https://pay.kirvano.com/crm-familia'),
  ('dieta-biblica',      'Dieta Bíblica',      'Saúde / Bem-estar',      'Programa alimentar baseado em princípios bíblicos.', 67, 'ativo', 'https://vendasdigitais.app/lp/dieta-biblica', 'https://pay.kiwify.com.br/dieta-biblica'),
  ('arvore-genealogica', 'Árvore Genealógica', 'Família / Memória',      'Monte e compartilhe a história da sua família.', 47, 'inativo', 'https://vendasdigitais.app/lp/arvore-genealogica', 'https://pay.stripe.com/arvore')
on conflict (id) do nothing;
