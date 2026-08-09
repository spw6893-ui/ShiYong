# 拾用内容编写指南

网站内容使用 MDX，不需要修改页面 TSX 或手写 HTML。

## 新增资料

1. 复制 `content/templates/library-item.mdx.example`。
2. 保存到 `content/library/{slug}.mdx`。
3. 填写 Frontmatter 和正文。
4. 运行 `npm run build`。字段缺失或类型错误会导致构建失败并指出文件。

新文档建议先保持 `status: draft`。完成检查后改成 `status: published`，才会进入网站和静态页面。

资料详情地址自动生成：

```text
content/library/summarize-long-pdf.mdx
→ /resources/summarize-long-pdf
```

资料库卡片、搜索和筛选数据也会从 Frontmatter 自动生成。

## 新增每周总结

复制 `content/templates/weekly-issue.mdx.example` 到：

```text
content/weekly/2026-08-week-3.mdx
```

`/weekly` 会自动展示 `publishedAt` 最新的一期。
更早的已发布内容会自动进入页面底部的“往期总结”，并生成 `/weekly/{slug}` 独立页面。

## 可用组件

### 提示框

```mdx
<Callout type="warning" title="注意">
不要上传敏感资料。
</Callout>
```

`type` 支持 `info` 和 `warning`。

### 行动框

```mdx
<ActionBox title="今天可以做">
选择一个重复任务，用四步公式重新提问。
</ActionBox>
```

### 可复制提示词

```mdx
<PromptBlock title="可复制模板">
背景：[填写背景]\n目标：[填写目标]\n约束：[填写约束]
</PromptBlock>
```

使用 `\n` 表示复制后的换行。

### 步骤

```mdx
<Steps>
### 第一步

准备输入资料。

### 第二步

检查输出结果。
</Steps>
```

### 工具卡

```mdx
<ToolCard name="NotebookLM" href="https://notebooklm.google.com" label="打开官方入口">
适合基于自己的资料提问。
</ToolCard>
```

## 字段规则

- `type`：方法 / 工作流 / 工具 / 汇总
- `scenario`：必须使用 `content-collections.ts` 中定义的任务分类；含义见 `docs/content-taxonomy.md`
- `cost`：免费 / 免费基础版 / 付费可选
- `difficulty`：小白 / 熟练
- `publishedAt`、`verifiedAt`：`YYYY-MM-DD`
- `color`：六位十六进制颜色
- `externalUrl`：工具的官方入口，可选
- `featured`：是否进入精选内容池
- `status`：`draft` / `published`，草稿不会出现在网站中
- `priority`：非负整数；数字越大越靠前，同优先级按发布日期倒序
- `updatedAt`：正文最近更新时间
- `updatedBy`：`human` / `agent`，标记最后编辑者
- `sources`：核查信息使用的官方来源 URL 数组

## 维护原则

- 工具内容必须填写 `verifiedAt`。
- 工具超过 90 天未更新 `verifiedAt` 时，页面会自动显示“待复核”。
- 只使用官方入口。
- 免费范围和价格变化后及时更新。
- 重要事实、数字和来源需要人工复核。
- 不在 MDX 中引入任意脚本或第三方嵌入代码。
