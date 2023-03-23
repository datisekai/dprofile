import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";
import HeaderAdmin from "~/components/Headers/HeaderAdmin";
import dataSidebar from "../data/dataSidebar";
import { FiLogOut } from "react-icons/fi";
import { deleteCookie } from "cookies-next";
import { useQuery } from "react-query";
import AuthAction from "~/actions/AuthAction";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
  const router = useRouter();

  const { data, isLoading } = useQuery(["me"], AuthAction.me);

  const handleLogout = () => {
    deleteCookie("token");
    router.push("/login");
  };

  return (
    <>
      <div className="bg-base-100">
        <div className="drawer-mobile drawer">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <HeaderAdmin />
            <div className="p-1">{children}</div>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
            <div className="menu flex w-64 flex-col justify-between bg-accent  p-4 text-base-100">
              <ul className="">
                {dataSidebar.map((item) => (
                  <li
                    className={`${
                      router.asPath === "/admin" && item.url === "/admin" ? "rounded-md bg-neutral" : ""
                    } ${
                      item.url !== "/admin" &&
                      router.asPath.includes(item.url)
                        ? "rounded-md bg-neutral"
                        : ""
                    }`}
                    key={item.url}
                  >
                    <Link href={item.url}>{item.title}</Link>
                  </li>
                ))}
              </ul>
              <div>
                <button onClick={handleLogout} className="btn w-full gap-2">
                  <FiLogOut className="text-lg" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
