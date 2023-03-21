import { motion } from "framer-motion";
import { GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import { AiFillLinkedin, AiOutlineGithub } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Typed from "react-typed";
import Footer from "~/components/Footer";
import Header from "~/components/Headers/Header";
import ListProduct from "~/components/ListProduct";
import Meta from "~/components/Meta";
import TimeLine from "~/components/TimeLine";
import { TimelineModel } from "~/models/TimelineModel";
import { prisma } from "~/server/db";

interface HomeProps{
  timelines:TimelineModel[]
}

const Home: NextPage<HomeProps> = ({timelines}) => {
  return (
    <>
      <Meta title="Datisekai | Profile" />
      <main className="min-h-screen bg-gradient-to-b from-accent to-neutral text-base-100">
        <div className="relative mx-auto min-h-screen w-[calc(100%-16px)] max-w-[1200px]">
          <Header />

          <div className="mt-5 flex flex-col justify-between space-y-4 md:flex-row md:space-x-4">
            <div className="w-full space-y-4 md:w-[30%]">
              <p className="text-2xl md:text-4xl">Chào bạn, mình là </p>
              <p className="text-4xl text-primary md:text-6xl">
                <Typed
                  strings={["Datisekai"]}
                  typeSpeed={150}
                  backSpeed={100}
                  loop
                />
              </p>
              <p className="text-2xl leading-5 md:text-4xl">
                Intern/Fresher Frontend Developer
              </p>
              <div className="leading-8">
                <p>
                  Mình là Đạt, sinh viên trường Đại Học Sài Gòn, chuyên ngành Kĩ
                  Thuật Phần Mềm.
                </p>
                <p>Mình thích đi ăn, đi chơi, đi dạo phố vào buổi tối.</p>
                  {/* <p>
                    Đặc biệt là mình{" "}
                    <span className="text-primary">độc thân</span> nhaa
                  </p> */}
              </div>
              <div className="flex space-x-2">
                <button className="btn-primary btn-outline btn-sm btn gap-2  md:btn-md">
                  <BsFacebook />
                  Facebook
                </button>
                <button className="btn-primary btn-outline btn-sm btn gap-2 md:btn-md">
                  <AiFillLinkedin />
                  Linkedin
                </button>
                <button className="btn-primary btn-outline btn-sm btn gap-2 md:btn-md">
                  <AiOutlineGithub />
                  Github
                </button>
              </div>
            </div>
            <div className="flex-1 cursor-pointer">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex  flex-col justify-end  md:flex-row">
                  <div className="">
                    <LazyLoadImage
                      src="/images/me.jpg"
                      className="w-full rounded-2xl md:w-[500px] md:rounded-br-none md:rounded-tr-none md:rounded-bl-2xl md:rounded-tl-2xl"
                      alt="Datisekai"
                    />
                  </div>
                  <div className="stats stats-vertical mt-2 shadow md:mt-0 md:rounded-tl-none md:rounded-bl-none">
                    <div className="stat">
                      <div className="stat-title">Ngày sinh</div>
                      <div className="stat-value">03</div>
                      <div className="stat-desc">01/2002</div>
                    </div>

                    <div className="stat">
                      <div className="stat-title">Địa chỉ</div>
                      <div className="stat-value">222</div>
                      <div className="stat-desc">Võ Thành Trang</div>
                    </div>

                    <div className="stat">
                      <div className="stat-title">Năm học</div>
                      <div className="stat-value">3</div>
                      <div className="stat-desc">SGU</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <TimeLine data={timelines} />
          <ListProduct />
        </div>
        <div className="pb-10"></div>
        <Footer />
      </main>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const timelines = await prisma.timeLine.findMany({
    where: {
      active: true,
    },
    orderBy: {
      year: "asc",
    },
  });

  return {
    props: {
      timelines: JSON.parse(JSON.stringify(timelines)),
    },
    revalidate:60
  };
};
