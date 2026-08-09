# 拾用任务分类规范

## Purpose

资料库按用户正在处理的任务组织内容，不再使用“通用助手、办公处理、设计工具”等抽象产品分类。

## Scope

本规范约束首页任务入口、资料库筛选、MDX `scenario` 字段和后续 Agent 自动更新生成的内容。

## Status

当前生效。代码枚举以 `content-collections.ts` 为最终校验来源。

## 分类

| 任务分类 | 用户手上的输入 | 期望结果 | 首批工具 |
|---|---|---|---|
| 处理 PDF | PDF、报告、论文、合同 | 摘要、问答、引用、表格、待办 | ChatGPT、NotebookLM |
| 制作 PPT | 大纲、Word、PDF、旧演示 | 页面结构、可编辑初稿、配图 | Gamma、Canva、NotebookLM |
| 处理表格 | XLSX、CSV、业务数据 | 清洗、公式、汇总、图表 | ChatExcel、ChatGPT |
| 整理会议 | 录音、转写稿、会议记录 | 纪要、决定、责任人、截止时间 | NotebookLM、通用助手 |
| 搜索资料 | 问题、关键词、指定网站 | 来源清单、证据表、研究报告 | Perplexity、ChatGPT |
| 写作改稿 | 邮件、周报、文章初稿 | 初稿、局部修改、检查结果 | ChatGPT |
| 处理图片 | 图片、截图、设计素材 | 放大、配图、版式素材 | Upscayl、Canva |
| 绘制图表 | 流程描述、页面需求 | 流程图、思维导图、线框图 | Whimsical |
| 学习资料 | 讲义、教材、题目 | 解释、测验、复习卡、学习计划 | NotebookLM、ChatGPT Study |
| 综合任务 | 多种材料或尚未拆解的任务 | 拆解步骤、输出标准、隐私检查 | ChatGPT |

## 内容要求

每个任务分类至少应包含：

1. 一篇完整工作流，说明输入、步骤、输出和检查方法。
2. 两个以上工具或一种不依赖具体工具的方法。
3. 一份可以复制的提示模板。
4. 文件、权限、隐私或事实核查提醒。
5. 当前工具入口和最近验证日期。

工具详情页按“当前入口 → 具体步骤 → 免费或计划限制 → 不适用情况 → 核查来源”编写，禁止只放产品简介。

## Evidence

- 分类枚举：`content-collections.ts`
- 首页任务入口：`src/app/page.tsx`
- 资料库筛选：`src/components/library-browser.tsx`
- 内容文件：`content/library/*.mdx`
- 调研规则：`docs/content-research-playbook.md`

## Related

- `docs/content-authoring.md`
- `docs/ai-efficiency-content-spec.md`
- `docs/ai-efficiency-roundups.md`

## Changelog

- 2026-08-10：从抽象工具场景改为 PDF、PPT、表格、会议等任务分类。
