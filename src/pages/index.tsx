import { motion } from "framer-motion";
import { GetStaticProps, type NextPage, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { AiFillLinkedin, AiOutlineGithub } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Typed from "react-typed";
import Footer from "~/components/Footer";
import Header from "~/components/Headers/Header";
import ListProduct from "~/components/ListProduct";
import Meta from "~/components/Meta";
import TimeLine from "~/components/TimeLine";
import { InfoModel } from "~/models/InfoModel";
import { ProjectModel } from "~/models/ProjectModel";
import { TimelineModel } from "~/models/TimelineModel";
import { prisma } from "~/server/db";

interface HomeProps {
  timelines: TimelineModel[];
  projects: ProjectModel[];
  info: InfoModel[];
}

const initInfo = {
  avatar: "/images/me1.jpg",
  position: "Fresher Frontend Developer",
};

const Home: NextPage<HomeProps> = ({
      timelines,
      projects,
      info,
    }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const infoRender = useMemo(() => {
    const infoAvatar = info.find((item: any) => item.code === "avatar");
    const infoFacebook = info.find((item: any) => item.code === "facebook");
    const infoLinkedin = info.find((item: any) => item.code === "linkedin");
    const infoGithub = info.find((item: any) => item.code === "github");
    const position = info.find((item: any) => item.code === "position");
    const resume = info.find((item: any) => item.code === "cv");

    return {
      avatar: infoAvatar ? infoAvatar.content : initInfo.avatar,
      position: position ? position.content : initInfo.position,
      facebook: infoFacebook ? infoFacebook.content : undefined,
      linkedin: infoLinkedin ? infoLinkedin.content : undefined,
      github: infoGithub ? infoGithub.content : undefined,
      resume,
    };
  }, [info]);

  const router = useRouter();
  return (
    <>
      <Meta
        title="Datisekai | Profile"
        description="Datisekai"
        image={"/images/logo.png"}
      />
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
                {infoRender.position}
              </p>
              <div className="leading-8">
                <p>
                  Mình là Đạt, sinh viên trường Đại Học Sài Gòn, chuyên ngành Kĩ
                  Thuật Phần Mềm.
                </p>
                {/* <p>Mình thích đi ăn, đi chơi, đi dạo phố vào buổi tối.</p> */}
                {infoRender.resume && (
                  <a
                    href={infoRender.resume.content}
                    className="link-hover link btn-wide btn mt-2 font-bold capitalize"
                  >
                    <p>Xem CV của mình tại đây</p>
                  </a>
                )}
                {/* <p>
                    Đặc biệt là mình{" "}
                    <span className="text-primary">độc thân</span> nhaa
                  </p> */}
              </div>
              <div className="flex space-x-2">
                {infoRender.facebook && (
                  <button
                    onClick={() => router.push(infoRender.facebook as string)}
                    className="btn-outline btn-primary btn-sm btn gap-2  md:btn-md"
                  >
                    <BsFacebook />
                    Facebook
                  </button>
                )}
                {infoRender.linkedin && (
                  <button
                    onClick={() => router.push(infoRender.linkedin as string)}
                    className="btn-outline btn-primary btn-sm btn gap-2 md:btn-md"
                  >
                    <AiFillLinkedin />
                    Linkedin
                  </button>
                )}
                {infoRender.github && (
                  <button
                    onClick={() => router.push(infoRender.github as string)}
                    className="btn-outline btn-primary btn-sm btn gap-2 md:btn-md"
                  >
                    <AiOutlineGithub />
                    Github
                  </button>
                )}
              </div>
            </div>
            <div className="flex-1 cursor-pointer">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex  flex-col justify-end  md:flex-row">
                  <div className="">
                    <LazyLoadImage
                      src="/images/me1.jpg"
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
                      <div className="stat-value">4</div>
                      <div className="stat-desc">SGU</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <TimeLine data={timelines} />
          <ListProduct data={projects} />
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

  const projects = await prisma.project.findMany({
    where: {
      active: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  const info = await prisma.info.findMany();

  return {
    props: {
      timelines: JSON.parse(JSON.stringify(timelines)),
      projects: JSON.parse(JSON.stringify(projects)),
      info: JSON.parse(JSON.stringify(info)),
    },
    revalidate: 60,
  };
};
