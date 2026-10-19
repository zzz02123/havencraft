# Shopify Storefront API 接入说明

这个前端不再吃本地 mock 数据，商品、价格、图片、结账全部走
`https://td5kxa-2d.myshopify.com/api/2025-07/graphql.json`（Storefront API）。

## 环境变量

`.env.local`（已被 `.gitignore` 忽略，模板见 `.env.example`）：

```bash
VITE_SHOPIFY_SHOP_DOMAIN=td5kxa-2d.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=1b79f0225e90f1b6c94941ca775e9d46
VITE_SHOPIFY_API_VERSION=2025-07
```

Storefront token 是**公开只读**令牌，打进前端 bundle 是设计允许的。
Admin API 的 `SHOPIFY_CLIENT_ID/SECRET` 绝不能出现在这里。

## 代码结构

| 文件 | 作用 |
|---|---|
| `src/lib/storefront.ts` | GraphQL 客户端：`fetchProducts` / `fetchAllProducts` / `fetchProductByHandle` / `createCheckout` |
| `src/lib/mapProduct.ts` | Shopify 商品 → `HavenCraftProductPDP`：解析 `Ficha técnica` 表格出尺寸/重量/材质，映射房间分类 |
| `src/App.tsx` | 启动时拉全量商品；失败回落到本地 mock；支持 `?p=<handle>` 与 `?c=<category>` 深链 |
| `src/components/CartDrawer.tsx` | 结账改为真实 `cartCreate` → 跳转 Shopify hosted checkout |

## 数据映射要点

- 标题去掉 `Casalivo ` 前缀（`mapProduct.ts` 的 `STRIP_PREFIX`，换品牌只改这里）。
- 价格来自 `priceRange.minVariantPrice`，划线价来自 `compareAtPriceRange`。
- 尺寸/重量/材质从生成的规格表 `<tr><td><strong>Medidas (cm)</strong></td>…` 解析。
- `roomCategory` 由 `productType` 关键词推断：Garden/Greenhouse → `patio`，Nightstand/Storage → `bedroom`，Table/Sofa → `dining`/`living`，Office → `office`。
- 真实库存数量需要 Storefront scope `unauthenticated_read_product_inventory`；
  未开启前用 `availableForSale` 判断，`stockCount` 只作展示，不显示"仅剩 X 件"。
- 评价为空（`reviewCount: 0`），UI 已验证会自动隐藏星级模块。

## 结账

购物车抽屉点击结账 → `cartCreate` → `window.location.href = cart.checkoutUrl`
（Shopify 托管结账页，币种 EUR，库存校验、税费、支付都在 Shopify 侧完成）。

## 部署（Vercel）

1. 项目已在 Vercel（`havencraft-seven.vercel.app`）。
2. Project → Settings → Environment Variables 加上面三个 `VITE_*` 变量（Production / Preview）。
3. 重新部署即可；构建产物是纯静态，无服务端。

## 已知限制

- Storefront token 只能看到**已发布到它所属渠道**的商品。当前店铺有三个渠道
  （Online Store / Casalivo Headless / Casalivo Headless 02），34 个商品三处都已发布。
  以后新增商品若只在 Online Store 发布，这个前端看不到（接口不报错，只是少几条）。
- 商品描述是西语（供货商原文），前端 UI 文案是英语 —— 需要统一语种时在 `mapProduct.ts` 里做映射或接翻译。
