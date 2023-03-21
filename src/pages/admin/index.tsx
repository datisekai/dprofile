import React, { useEffect, useMemo, useState } from "react";
import AdminLayout from "~/components/layouts/AdminLayout";
import Meta from "~/components/Meta";

const Admin = () => {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      setTime({
        days: date.getDate(),
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const style: any = useMemo(() => {
    return {
      days: { "--value": time.days },
      hours: { "--value": time.hours },
      minutes: { "--value": time.minutes },
      seconds: { "--value": time.seconds },
    };
  }, [time]);

  return (
    <>
      <Meta title="Datisekai | Admin" />
      <AdminLayout>
        <div className="flex min-h-[calc(100vh-72px)] items-center justify-center">
          <div className="grid auto-cols-max grid-flow-col gap-5 text-center">
            <div className="rounded-box flex flex-col bg-neutral p-2 text-neutral-content">
              <span className="countdown font-mono text-5xl">
                <span style={style.days}></span>
              </span>
              days
            </div>
            <div className="rounded-box flex flex-col bg-neutral p-2 text-neutral-content">
              <span className="countdown font-mono text-5xl">
                <span style={style.hours}></span>
              </span>
              hours
            </div>
            <div className="rounded-box flex flex-col bg-neutral p-2 text-neutral-content">
              <span className="countdown font-mono text-5xl">
                <span style={style.minutes}></span>
              </span>
              min
            </div>
            <div className="rounded-box flex flex-col bg-neutral p-2 text-neutral-content">
              <span className="countdown font-mono text-5xl">
                <span style={style.seconds}></span>
              </span>
              sec
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default Admin;
