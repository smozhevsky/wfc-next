"use client";

import { useState } from "react";
import { Header, Sidebar, Footer } from "./components";
import { MainContent } from "./components/main";

export default function Main() {
  const [active, setActive] = useState(false);

  const handleSidebarShow = () => setActive(!active);

  return (
    <main>
      <Header toggleActive={handleSidebarShow} />
      <Sidebar isActive={active} toggleActive={handleSidebarShow} />
      <MainContent />
      <Footer />
    </main>
  );
}
