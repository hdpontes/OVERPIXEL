# Overpixel — Landing Page V2

Landing page de alta conversão para o **Kit Comece nos Personalizados**, feita em React + Vite e servida como build estático pelo Nginx.

## Stack
- React
- Vite
- CSS próprio (sem CDN em produção)
- Nginx Alpine
- Docker / Portainer

## Porta
O compose publica `8088:80`.

## Subir no Portainer
1. Envie a pasta do projeto para a VPS.
2. Portainer → Stacks → Add stack.
3. Use o `docker-compose.yml` desta pasta ou envie o conteúdo da pasta para um repositório e faça deploy pelo Git.
4. Aguarde o build da imagem.
5. No Nginx Proxy Manager/Cloudflare, aponte seu subdomínio para `IP_DA_VPS:8088`.

Sugestão de subdomínio: `comece.overpixel.com.br`.

## Checkout
Edite `src/main.jsx` e altere:

```js
const CONFIG = {
  checkoutUrl: '/checkout/',
  pixelId: '',
  gaMeasurementId: '',
};
```

Exemplo se usar uma URL externa:
`checkoutUrl: 'https://SEU-CHECKOUT-AQUI'`

Os parâmetros UTM da URL da landing são preservados no clique para checkout.

## Tracking
A página já possui eventos estruturados para:
- `ViewContent`
- `InitiateCheckout`

Para ativar Meta Pixel, preencha `pixelId`.
Para GA4, preencha `gaMeasurementId`.

Não coloque IDs reais no repositório público.

## Rotas / Termos / Privacidade
A landing possui links para `/privacidade` e `/termos`. Se essas páginas ainda não existirem no seu proxy/servidor, crie-as no WordPress ou substitua os links por URLs reais antes de publicar.

## Assets
As prévias do e-book e da planilha foram geradas a partir dos materiais reais do produto e ficam em `public/assets/`.

## Build local
```bash
npm install
npm run build
npm run dev
```
