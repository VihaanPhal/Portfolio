import React from "react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

const heropage = () => {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center gap-6">
      <AnimatedThemeToggler className="absolute top-4 left-4 w-10 h-10" />
      <h1>heropage</h1>
    </div>
  );
};

export default heropage;
