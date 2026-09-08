# Deploy — Vendas Digitais (Hostinger / institutohernandes.org)

## 1. Tem banco de dados? Onde fica?

**Hoje, não.** O app é 100% front-end (React + Vite). Todos os dados
(`produtos`, `pedidos`, `links`) vivem em `src/data/mock.ts` e ficam só na
memória do navegador (`useState`) — ao recarregar a página, tudo volta ao
estado inicial. Nada é salvo em lugar nenhum.

Para ter persistência de verdade (produtos editáveis, pedidos reais vindos
dos gateways, métricas acumuladas) existem 2 caminhos:

| Opção | Onde fica o banco | Quando usar |
|---|---|---|
| **Supabase** (recomendado) | PostgreSQL hospedado na Supabase (nuvem, fora da Hostinger). Plano free serve para começar. | O front (estático na Hostinger) fala direto com o banco via HTTPS. Webhooks dos gateways entram por uma Edge Function. |
| **MySQL da Hostinger** | Banco MySQL do próprio plano Hostinger (hPanel > Bancos de Dados) | Só faz sentido se você criar uma API em PHP na mesma hospedagem. Mais trabalho. |

O schema pronto para a opção Supabase está em [`db/schema.sql`](db/schema.sql)
(tabelas + view de métricas + RLS + seed dos 4 produtos, todos com 0 vendas).

> **Enquanto o banco não estiver conectado**, o deploy abaixo publica o app
> funcionando com os dados de exemplo (vendas zeradas). O botão
> "Simular venda (webhook)" continua servindo para demonstração.

---

## 2. Deploy via Git + GitHub Actions (escolhido)

A Hostinger em plano compartilhado **não roda `npm run build`** sozinha no
Git dela — ela só copia arquivos. Então o build acontece no GitHub Actions e
o resultado (`dist/`) é enviado por FTP para a Hostinger.

### 2.1 Subir o repositório
```bash
git init
git add .
git commit -m "Vendas Digitais - setup inicial"
git branch -M main
git remote add origin git@github.com:<sua-conta>/vendas-digitais.git
git push -u origin main
```

### 2.2 Criar o acesso FTP na Hostinger
hPanel → **Arquivos → Contas FTP** → criar uma conta apontando para a pasta
do site. Anote host, usuário e senha.

- Domínio principal `institutohernandes.org` → pasta `/public_html/`
- Subdomínio (recomendado) `vendas.institutohernandes.org`:
  hPanel → **Domínios → Subdomínios** → criar `vendas` →
  pasta gerada, algo como `/domains/vendas.institutohernandes.org/public_html/`

### 2.3 Configurar os Secrets no GitHub
Repositório → **Settings → Secrets and variables → Actions → New secret**:

| Secret | Valor |
|---|---|
| `FTP_SERVER` | `ftp.institutohernandes.org` (ou o host mostrado no hPanel) |
| `FTP_USERNAME` | usuário FTP criado |
| `FTP_PASSWORD` | senha FTP |
| `FTP_REMOTE_DIR` | `/public_html/` **ou** `/domains/vendas.institutohernandes.org/public_html/` |
| `VITE_PUBLIC_BASE_URL` | `https://vendas.institutohernandes.org` |
| `VITE_SUPABASE_URL` | (só quando conectar o banco) |
| `VITE_SUPABASE_ANON_KEY` | (só quando conectar o banco) |

### 2.4 Publicar
Qualquer `git push` na branch `main` dispara o workflow
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):
`npm ci` → `npm run build` → envia `dist/` por FTP.
Também dá para rodar manualmente em **Actions → Deploy (Hostinger) → Run workflow**.

O arquivo [`public/.htaccess`](public/.htaccess) vai junto no build e cuida de:
rotas do SPA (`/admin`, `/lp/crm-familia`), redirect para HTTPS, cache e gzip.

---

## 3. Alternativa sem GitHub Actions (deploy manual)

```bash
npm run zip        # gera dist.zip (Windows PowerShell)
```
hPanel → **Gerenciador de Arquivos** → entrar na pasta do site →
enviar `dist.zip` → **Extrair** → apagar o `.zip`.
Garanta que o `.htaccess` ficou na raiz da pasta (ative "mostrar arquivos ocultos").

---

## 4. Domínio / subdomínio na Hostinger

1. hPanel → **Domínios**: `institutohernandes.org` já está na conta.
2. Criar subdomínio `vendas` (passo 2.2) — evita conflito com o site atual do instituto.
3. SSL: hPanel → **Segurança → SSL** → emitir para o subdomínio (grátis, Let's Encrypt).
4. Testar: `https://vendas.institutohernandes.org/admin`

Se preferir publicar na **raiz** do domínio, use `server-dir = /public_html/`
e mantenha `base: "/"` no `vite.config.ts`.
Para publicar numa **subpasta** (`institutohernandes.org/vendas/`), troque
`base` para `"/vendas/"` e ajuste o `RewriteBase` no `.htaccess`.

---

## 5. Próximo passo: ligar o Supabase

1. Criar projeto em supabase.com → rodar [`db/schema.sql`](db/schema.sql) no SQL Editor.
2. `npm i @supabase/supabase-js`
3. Criar `src/lib/supabase.ts`:
   ```ts
   import { createClient } from "@supabase/supabase-js";
   export const supabase = createClient(
     import.meta.env.VITE_SUPABASE_URL,
     import.meta.env.VITE_SUPABASE_ANON_KEY
   );
   ```
4. Trocar `initialProducts` / `initialAffiliateLinks` por leituras do Supabase
   (`supabase.from("products").select()` etc.) em `AdminDashboard.tsx`.
5. Webhook dos gateways → Supabase **Edge Function** que valida a assinatura e
   faz `insert` em `orders` usando a `service_role` key (nunca no front).
   URL a cadastrar nos gateways: `https://<projeto>.functions.supabase.co/checkout-webhook`.
