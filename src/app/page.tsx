import Image from "next/image";
import {Icon} from "@iconify/react";
import {allLibraryItems, allWeeklyIssues} from "content-collections";
import {HomeSearch} from "@/components/home-search";
import {SiteFooter} from "@/components/site-footer";
import {SiteHeader} from "@/components/site-header";
import {isPublished, isReviewOverdue, sortByPriorityAndDate} from "@/lib/content";

const taskEntries = [
  ["solar:document-text-bold", "#3b82f6", "处理文档", "总结 PDF、提取问题和待办", "学习与文档"],
  ["solar:microphone-3-bold", "#13a47c", "整理会议", "录音、纪要、责任人与截止时间", "办公处理"],
  ["solar:pen-new-square-bold", "#7c5cff", "写作编辑", "邮件、周报、大纲和内容修改", "写作编辑"],
  ["solar:table-2-bold", "#16a05d", "表格数据", "公式、分析、清洗和图表建议", "表格数据"],
  ["solar:presentation-graph-bold", "#e7852e", "演示设计", "PPT、流程图和内容配图", "设计与图像"],
  ["solar:magnifer-bold", "#d55d9a", "搜索研究", "查资料、找来源和比较信息", "搜索研究"],
];

export default function Home() {
  const publishedItems = sortByPriorityAndDate(allLibraryItems.filter(isPublished));
  const latestItems = publishedItems.filter((item) => item.featured && item.type !== "工具").slice(0, 4);
  const tools = publishedItems.filter((item) => item.type === "工具" && item.featured && item.externalUrl).slice(0, 4);
  const latestWeekly = sortByPriorityAndDate(allWeeklyIssues.filter(isPublished))[0];
  const storyTones = ["mint", "blue", "orange", "violet"];

  return <main><SiteHeader /><div className="page-shell" id="top">
    <section className="hero">
      <div className="hero-copy">
        <span className="eyebrow"><Icon icon="solar:stars-bold" />每周筛选，少而有用</span>
        <h1>让 AI 真正帮你<br /><span>省时间</span></h1>
        <p>筛选实用方法、工作流和工具，把 AI 用进每天的学习与工作。少看一点资讯，多完成一点事情。</p>
        <HomeSearch />
        <div className="hot-search"><span>常用任务：</span>{["总结 PDF", "制作 PPT", "整理会议", "分析表格"].map((tag) => <a key={tag} href={`/resources?q=${encodeURIComponent(tag)}`}>{tag}</a>)}</div>
      </div>
      <div className="hero-visual"><Image src="/hero-resource-sharing.png" alt="使用 AI 提升工作效率的插画" fill priority sizes="(max-width: 900px) 100vw, 50vw" /></div>
    </section>

    <section className="core-paths">
      <a href="/weekly" className="core-path weekly-path"><span><Icon icon="solar:calendar-mark-bold" /></span><div><b>每周总结</b><h2>这周先看什么，我们替你筛好</h2><p>一个变化、一个方法、一个工作流、一个工具和一个五分钟行动。</p></div><Icon icon="solar:arrow-right-linear" /></a>
      <a href="/resources" className="core-path library-path"><span><Icon icon="solar:folder-with-files-bold" /></span><div><b>资料库</b><h2>按任务找到方法、工作流和工具</h2><p>所有长期内容集中在一个地方，通过关键词和场景筛选。</p></div><Icon icon="solar:arrow-right-linear" /></a>
    </section>

    <section className="task-section">
      <div className="section-heading"><div><span className="section-kicker">START WITH A TASK</span><h2>你现在想完成什么？</h2><p>不用先研究工具，从眼前的任务开始。</p></div><a href="/resources">查看全部资料 <Icon icon="solar:arrow-right-linear" /></a></div>
      <div className="task-grid">{taskEntries.map(([icon, color, title, text, scenario]) => <a href={`/resources?scenario=${encodeURIComponent(scenario)}`} key={title} style={{"--task-color": color} as React.CSSProperties}><span><Icon icon={icon} /></span><h3>{title}</h3><p>{text}</p><b>开始筛选 <Icon icon="solar:arrow-right-linear" /></b></a>)}</div>
    </section>

    <section className="weekly" id="weekly">
      <div className="weekly-content"><span className="section-kicker">WEEKLY DIGEST · {latestWeekly.issue}</span><h2>{latestWeekly.title}</h2><p>{latestWeekly.summary}</p><div className="weekly-points"><span><Icon icon="solar:clock-circle-bold" /> {latestWeekly.readingTime} 分钟读完</span><span><Icon icon="solar:check-circle-bold" /> 5 个行动点</span><span><Icon icon="solar:medal-star-bold" /> 小白友好</span></div><a href="/weekly" className="dark-button">阅读本周总结 <Icon icon="solar:arrow-right-linear" /></a></div>
      <div className="weekly-note"><span className="note-label">本周行动</span><Icon className="note-icon" icon="solar:lightbulb-bolt-bold" /><h3>把一个重复任务交给 AI</h3><p>选一封要回复的邮件，用“背景 + 目标 + 约束 + 示例”重新提问一次。</p><b>只需要 5 分钟</b></div>
    </section>

    <section className="content-section">
      <div className="section-heading"><div><span className="section-kicker">LATEST PICKS</span><h2>最新实用资料</h2><p>方法、工作流和汇总都进入同一个资料库。</p></div><a href="/resources">进入资料库 <Icon icon="solar:arrow-right-linear" /></a></div>
      <div className="story-grid">{latestItems.map((item, index) => <a className="story-card" href={`/resources/${item.slug}`} key={item.slug}><div className={`story-cover ${storyTones[index]}`}><Icon icon={item.icon} /><span>{item.type}</span></div><div className="story-body"><div className="meta"><span>{item.scenario}</span><i>·</i><span>{item.readingTime} 分钟</span><i>·</i><span>{item.difficulty}</span></div><h3>{item.title}</h3><p>{item.summary}</p><footer><span>{item.publishedAt} 更新</span><span>阅读内容</span></footer></div></a>)}</div>
    </section>

    <section className="resources-section">
      <div className="section-heading"><div><span className="section-kicker">VERIFIED TOOLS</span><h2>近期复核的工具</h2><p>只展示官方入口，并说明它最适合完成什么任务。</p></div><a href="/resources?type=工具">查看全部工具 <Icon icon="solar:arrow-right-linear" /></a></div>
      <div className="resource-list">{tools.map((tool) => <article className="resource-row" key={tool.slug}><div className="resource-logo" style={{background: tool.color}}><Icon icon={tool.icon} /></div><div className="resource-main"><div><h3>{tool.title}</h3><span className="resource-chip">{tool.scenario}</span></div><p>{tool.summary}</p><div className="resource-tags"><span><Icon icon="solar:check-circle-bold" />官方入口</span><span className={isReviewOverdue(tool.verifiedAt) ? "review-overdue" : ""}><Icon icon="solar:calendar-mark-bold" />{isReviewOverdue(tool.verifiedAt) ? "超过 90 天，待复核" : `${tool.verifiedAt} 已复核`}</span></div></div><div className="resource-actions"><a href={tool.externalUrl} target="_blank" rel="noreferrer" className="visit-button">打开网站 <Icon icon="solar:arrow-up-linear" /></a></div></article>)}</div>
    </section>

    <section className="simple-cta"><Icon icon="solar:stars-bold" /><div><span>第一次来？</span><h2>先从小白友好的资料开始</h2><p>不用系统学完 AI，先解决一个真实任务。</p></div><a href="/resources?type=工作流" className="dark-button">查看入门资料</a></section>
  </div><SiteFooter /></main>;
}
