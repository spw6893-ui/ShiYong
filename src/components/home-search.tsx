"use client";

import {Icon} from "@iconify/react";
import {Button, Input} from "@heroui/react";
import {useState} from "react";

export function HomeSearch() {
  const [query, setQuery] = useState("");

  return <form className="hero-search" onSubmit={(event) => {
    event.preventDefault();
    window.location.href = `/resources${query ? `?q=${encodeURIComponent(query)}` : ""}`;
  }}>
    <Input value={query} onValueChange={setQuery} aria-label="搜索资料" placeholder="搜索任务，例如：总结 PDF、做 PPT……" startContent={<Icon icon="solar:magnifer-linear" />} classNames={{inputWrapper: "search-input"}} />
    <Button type="submit" className="search-button">搜索资料</Button>
  </form>;
}
