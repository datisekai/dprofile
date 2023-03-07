import React from "react";
import { motion } from "framer-motion";

const dataTimeLine = [2020, 2021, 2022, 2023];

const TimeLine = () => {
  const [timeline, setTimeLine] = React.useState(2020);
  return (
    <div className="mt-5">
      <h2 className="line-gradient relative inline text-lg md:text-xl">
        Timeline
      </h2>
      <div className="mt-7 flex flex-col justify-between md:flex-row md:items-center">
        <ul className="steps steps-vertical">
          {dataTimeLine.map((item) => (
            <li
              key={item}
              onClick={() => setTimeLine(item)}
              className={`step cursor-pointer ${
                item === timeline ? "step-primary" : ''
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
        {timeline === 2020 && (
          <div className="ml-0 flex-1 rounded-2xl bg-accent p-4 text-xl md:ml-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              <div className="">
                <h2>2020</h2>
                <h3>Khởi đầu hành trình</h3>
                <p className="mt-4 text-lg">
                  Bắt đầu học CNTT tại Đại Học Sài Gòn, lúc này vẫn chưa biết
                  lập trình là gì, vẫn còn chật vật với C/C++ khi xung quanh bạn
                  bè đều đã học hoặc biết lập trình trước thì mới vào ngành này.
                  Mình đã cày rất nhiều, cắm mặt vào máy tính giải các bài tập
                  C/C++.
                </p>
              </div>
            </motion.div>
          </div>
        )}
        {timeline === 2021 && (
          <div className="ml-0 flex-1 rounded-2xl bg-accent p-4 text-xl md:ml-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              <div>
                <h2>2021</h2>
                <h3>Biết tới lập trình Web</h3>
                <p className="mt-4 text-lg">
                  Lúc này được thằng bạn cấp 3 cũ rủ học web, chỉ vào f8.edu.vn
                  để học HTML, CSS, JS. Thật ra lúc đầu cũng rất chán, nhưng khi
                  học và làm được những project đầu tay theo F8 như TheBand,
                  Shopee đã bắt đầu có hứng thú với web. Một thời gian sau thấy
                  quá nhiều website mà mình tiếp cận sử dụng PHP, bắt đầu học và
                  đặt mục tiêu sau 2 tháng hè phải làm được một website có thể
                  bán hàng. Cuối cùng ra được website bán hàng đầu tay với PHP
                  là NRODICHVU.
                </p>
              </div>
            </motion.div>
          </div>
        )}
        {timeline === 2022 && (
          <div className="ml-0 flex-1 rounded-2xl bg-accent p-4 text-xl md:ml-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              <div>
                <h2>2022</h2>
                <h3>Biết tới React</h3>
                <p className="mt-4 text-lg">
                  Lúc mới học chỉ biết mỗi useState, useEffect. Nhưng cũng cố
                  gắng thực hiện được DANIME, tự tay code một project cá nhân
                  hoàn chỉnh. Sau đó cảm thấy mỗi React thôi thì chưa đủ, bắt
                  đầu tìm tới ExpressJS, thực hiện một số project cá nhân như
                  DShoes, Dtube, DMovie, Vietnamsao, DarkNovel,...
                  <br />
                  05/2022 được nhận vào F5Second với vai trò Intern ReactJS, làm
                  remote được 3 tháng thì vào học kì chính nên nghỉ.
                  <br />
                  11/2022 được nhận vào CodeGym với vai trò là Mentor JS,
                  ReactJS và vẫn đang làm cho đến hiện tại.
                </p>
              </div>
            </motion.div>
          </div>
        )}
        {timeline === 2023 && (
          <div className="ml-0 flex-1 rounded-2xl bg-accent p-4 text-xl md:ml-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              <div>
                <h2>2023</h2>
                <h3>Loading....</h3>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeLine;
