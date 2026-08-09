"use client";

import {Icon} from "@iconify/react";
import {Button, Input} from "@heroui/react";
import {useEffect, useMemo, useState} from "react";

export type LibraryCardData = {
  slug: string;
  title: string;
  summary: string;
  type: "方法" | "工作流" | "工具" | "汇总";
  scenario: string;
  cost: "免费" | "免费基础版" | "付费可选";
  readingTime: number;
  difficulty: "小白" | "熟练";
  icon: string;
  color: string;
  publishedAt: string;
  verifiedAt?: string;
  externalUrl?: string;
  featured: boolean;
  status: "draft" | "published";
  priority: number;
  reviewOverdue: boolean;
};

const types = ["全部", "方法", "工作流", "工具", "汇总"];
const scenarios = ["全部场景", "通用助手", "搜索研究", "学习与文档", "写作编辑", "办公处理", "表格数据", "设计与图像", "视频与音频", "信息管理"];

export function LibraryBrowser({items}: {items: LibraryCardData[]}) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("全部");
  const [scenario, setScenario] = useState("全部场景");
  const [cost, setCost] = useState("全部成本");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get("q") ?? "");
    setType(params.get("type") ?? "全部");
    setScenario(params.get("scenario") ?? "全部场景");
  }, []);

  const filtered = useMemo(() => items.filter((item) => {
    const matchQuery = `${item.title}${item.summary}${item.type}${item.scenario}`.toLowerCase().includes(query.toLowerCase());
    return matchQuery && (type === "全部" || item.type === type) && (scenario === "全部场景" || item.scenario === scenario) && (cost === "全部成本" || item.cost === cost);
  }), [items, query, type, scenario, cost]);

  const reset = () => { setQuery(""); setType("全部"); setScenario("全部场景"); setCost("全部成本"); };

  return <div className="inner-shell">
    <section className="resource-page-hero"><span>AI EFFICIENCY LIBRARY</span><h1>一个资料库，找到真正能用的 AI 方法</h1><p>内容由 MDX 文档自动生成。按任务筛选，不需要在很多栏目之间来回找。</p><Input value={query} onValueChange={setQuery} placeholder="搜索任务，例如：总结 PDF、做 PPT、处理表格……" startContent={<Icon icon="solar:magnifer-linear" />} classNames={{inputWrapper: "resource-page-search"}} /></section>

    <section className="library-filter-panel" aria-label="资料筛选">
      <div className="filter-row"><b>内容</b><div className="filter-tabs">{types.map((item) => <button className={type === item ? "active" : ""} onClick={() => setType(item)} key={item}>{item}</button>)}</div></div>
      <div className="filter-row"><b>场景</b><div className="filter-tabs">{scenarios.map((item) => <button className={scenario === item ? "active" : ""} onClick={() => setScenario(item)} key={item}>{item}</button>)}</div></div>
      <div className="filter-row"><b>成本</b><div className="filter-tabs">{["全部成本", "免费", "免费基础版", "付费可选"].map((item) => <button className={cost === item ? "active" : ""} onClick={() => setCost(item)} key={item}>{item}</button>)}</div></div>
    </section>

    <div className="library-result-bar"><span>找到 <b>{filtered.length}</b> 条资料</span>{(query || type !== "全部" || scenario !== "全部场景" || cost !== "全部成本") && <button onClick={reset}>清除筛选</button>}</div>
    <section className="resource-page-grid library-page-grid">{filtered.map((item) => <article key={item.slug}>
      <div className="library-card-top"><div className="resource-page-logo" style={{background: item.color}}><Icon icon={item.icon} /></div><span className={`library-type type-${item.type}`}>{item.type}</span></div>
      <span>{item.scenario}</span><h2>{item.title}</h2><p>{item.summary}</p>
      <div className="library-card-facts"><b className={item.reviewOverdue ? "review-overdue" : ""}><Icon icon={item.reviewOverdue ? "solar:danger-triangle-bold" : "solar:clock-circle-bold"} />{item.reviewOverdue ? "超过 90 天，待复核" : item.type === "工具" && item.verifiedAt ? `验证于 ${item.verifiedAt}` : `${item.readingTime} 分钟`}</b><b><Icon icon="solar:wallet-money-bold" />{item.cost}</b></div>
      {item.externalUrl ? <Button as="a" href={item.externalUrl} target="_blank" rel="noreferrer" className="visit-button" endContent={<Icon icon="solar:arrow-up-linear" />}>打开官方入口</Button> : <Button as="a" href={`/resources/${item.slug}`} className="read-button" endContent={<Icon icon="solar:arrow-right-linear" />}>阅读内容</Button>}
    </article>)}{filtered.length === 0 && <div className="resource-empty"><Icon icon="solar:magnifer-linear" /><h2>没有找到匹配资料</h2><p>换个关键词，或者清除筛选后再试。</p><Button variant="flat" onPress={reset}>清除筛选</Button></div>}</section>
  </div>;
}
