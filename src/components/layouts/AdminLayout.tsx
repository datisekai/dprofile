import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC } from "react";
import HeaderAdmin from "~/components/Headers/HeaderAdmin";
import dataSidebar from "../data/dataSidebar";
import {FiLogOut} from 'react-icons/fi'
import {deleteCookie} from 'cookies-next'

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie('token')
    router.push('/login')
  }

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
            <div className="menu flex flex-col justify-between w-64 bg-accent  p-4 text-base-100">
              <ul className="">
                {dataSidebar.map((item) => (
                  <li
                    className={`${
                      router.asPath === item.url ? "rounded-md bg-neutral" : ""
                    }`}
                    key={item.url}
                  >
                    <Link href={item.url}>{item.title}</Link>
                  </li>
                ))}
              </ul>
              <div>
                <button onClick={handleLogout} className="btn gap-2 w-full">
                 <FiLogOut className="text-lg"/>
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
