export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand"><a className="brand" href="/"><span className="brand-star">★</span><span>拾用</span></a><p>每周 10 分钟，拾取一点真正有用的内容。</p></div>
      <div className="footer-links"><div><b>开始</b><a href="/weekly">每周总结</a><a href="/resources">资料库</a></div><div><b>资料类型</b><a href="/resources?type=工作流">工作流</a><a href="/resources?type=工具">工具</a><a href="/resources?type=汇总">对比汇总</a></div><div><b>原则</b><span>少而有用</span><span>小白友好</span><span>定期复核</span></div></div>
      <div className="copyright">© 2026 拾用 · 内容仅供学习参考</div>
    </footer>
  );
}
