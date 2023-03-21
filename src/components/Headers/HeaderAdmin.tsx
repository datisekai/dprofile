import Link from "next/link";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import dataTheme from "../data/dataTheme";

const HeaderAdmin = () => {
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
    <div className="navbar sticky top-0 z-50 bg-base-100 shadow-md">
      <div className="navbar-start">
        <div className="dropdown">
          <label htmlFor="my-drawer-2" className="btn-ghost btn-circle btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
        </div>
      </div>
      <div className="navbar-center">
        <Link href={"/"}>
          <div className="btn-ghost btn text-xl normal-case">Datisekai</div>
        </Link>
      </div>
      <div className="navbar-end">
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
    </div>
  );
};

export default HeaderAdmin;
