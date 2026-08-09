"use client";

import {Icon} from "@iconify/react";
import {usePathname} from "next/navigation";
import {useState} from "react";

const navItems = [
  ["首页", "/"],
  ["每周总结", "/weekly"],
  ["资料库", "/resources"],
];

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <a className="brand" href="/"><span className="brand-star">★</span><span>拾用</span><small>拾取真正有用的内容</small></a>
      <nav className={`desktop-nav ${menuOpen ? "menu-open" : ""}`} aria-label="主导航">
        {navItems.map(([label, href]) => <a key={href} className={pathname === href ? "active" : ""} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
      </nav>
      <div className="header-actions">
        <a className="icon-button" aria-label="进入资源搜索" href="/resources"><Icon icon="solar:magnifer-linear" /></a>
        <button className="icon-button menu-button" aria-label="切换导航" onClick={() => setMenuOpen((open) => !open)}><Icon icon={menuOpen ? "solar:close-circle-linear" : "solar:hamburger-menu-linear"} /></button>
        <div className="avatar">好</div>
      </div>
    </header>
  );
}
