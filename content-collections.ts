import {defineCollection, defineConfig} from "@content-collections/core";
import {compileMDX} from "@content-collections/mdx";
import {z} from "zod";
import remarkGfm from "remark-gfm";

const contentTypes = ["方法", "工作流", "工具", "汇总"] as const;
const scenarios = [
  "处理 PDF", "制作 PPT", "处理表格", "整理会议", "搜索资料",
  "写作改稿", "处理图片", "绘制图表", "学习资料", "综合任务",
] as const;
const costs = ["免费", "免费基础版", "付费可选"] as const;
const statuses = ["draft", "published"] as const;

const library = defineCollection({
  name: "libraryItems",
  directory: "content/library",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string().min(1),
    summary: z.string().min(1),
    type: z.enum(contentTypes),
    scenario: z.enum(scenarios),
    cost: z.enum(costs),
    readingTime: z.number().int().positive(),
    difficulty: z.enum(["小白", "熟练"]).default("小白"),
    icon: z.string().min(1),
    color: z.string().regex(/^#[0-9a-fA-F]{6}$/),
    publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    verifiedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    externalUrl: z.string().url().optional(),
    featured: z.boolean().default(false),
    status: z.enum(statuses).default("published"),
    priority: z.number().int().min(0).default(0),
    updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    updatedBy: z.enum(["human", "agent"]).default("human"),
    sources: z.array(z.string().url()).default([]),
    content: z.string(),
  }),
  transform: async (document, context) => ({
    ...document,
    slug: document._meta.path,
    content: await compileMDX(context, document, {remarkPlugins: [remarkGfm]}),
  }),
});

const weekly = defineCollection({
  name: "weeklyIssues",
  directory: "content/weekly",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string().min(1),
    summary: z.string().min(1),
    issue: z.string().min(1),
    publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    readingTime: z.number().int().positive(),
    status: z.enum(statuses).default("published"),
    priority: z.number().int().min(0).default(0),
    updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    updatedBy: z.enum(["human", "agent"]).default("human"),
    sources: z.array(z.string().url()).default([]),
    content: z.string(),
  }),
  transform: async (document, context) => ({
    ...document,
    slug: document._meta.path,
    content: await compileMDX(context, document, {remarkPlugins: [remarkGfm]}),
  }),
});

export default defineConfig({content: [library, weekly]});
