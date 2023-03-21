import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Select from "react-select";
import dataTheme from "../data/dataTheme";

const Header = () => {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    const themeHistory =
      (localStorage && localStorage.getItem("theme")) || "mytheme";
    if (themeHistory) {
      setTheme(themeHistory);
    }
  }, []);

  const handleSetTheme = (newTheme: string) => {
    document?.querySelector("html")?.setAttribute("data-theme", newTheme);
    localStorage && localStorage.setItem("theme", theme);
  };

  useEffect(() => {
    if (theme != "") {
      handleSetTheme(theme);
    }
  }, [theme]);

  return (
    <div className="flex items-center justify-between py-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          repeat: Infinity,
        }}
      >
        <div className="text-xl text-base-100 md:text-2xl">
          <span className="text-primary">Dat</span>isekai
        </div>
      </motion.div>

      <div>
        <Select
          id="selectTheme"
          instanceId="selectTheme"
          className="w-[150px] text-primary"
          value={{ value: theme, label: theme }}
          onChange={(e) => e && setTheme(e?.value)}
          options={dataTheme.map((item) => ({ value: item, label: item }))}
        />
      </div>
    </div>
  );
};

export default Header;
