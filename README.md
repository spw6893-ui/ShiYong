# 拾用

面向普通用户的 AI 效率内容与资料网站。产品以每周总结和可筛选资料库为核心，内容包括 AI 方法、工作流、工具和对比汇总。

AI 效率方向的产品与内容重构草案见：

- `docs/ai-efficiency-content-spec.md`
- `docs/ai-efficiency-roundups.md`

## 本地运行

```bash
npm install --legacy-peer-deps
npm run dev
```

打开 `http://localhost:3000`。

## 生产构建

```bash
npm run build
npm start
```

## 关键目录

- `src/app/page.tsx`：首页与两个核心入口
- `src/app/weekly/page.tsx`：每周总结
- `src/app/resources/page.tsx`：统一资料库与筛选交互
- `src/app/globals.css`：全站视觉和响应式样式
- `public/hero-resource-sharing.png`：首页主视觉插画
- `content/library/`：资料库 MDX 内容
- `content/weekly/`：每周总结 MDX 内容
- `docs/content-authoring.md`：内容添加与组件说明

## 持续集成与部署

- GitHub Actions 在 Pull Request 和 `main` 分支推送时执行 `npm ci` 与 `npm run build`。
- Vercel 连接 `main` 分支作为生产环境；Pull Request 自动生成预览部署。
