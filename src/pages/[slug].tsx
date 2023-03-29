import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React from "react";
import Header from "~/components/Headers/Header";
import Meta from "~/components/Meta";
import useScrollY from "~/hooks/useScrollY";
import { ProjectModel } from "~/models/ProjectModel";
import { prisma } from "~/server/db";

interface DetailProjectProps {
  project: ProjectModel;
}
const DetailProject: NextPage<DetailProjectProps> = ({ project }) => {
  const scroll = useScrollY();

  const handleOnTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Meta
        image={project.thumbnail}
        title={`${project.name} | Datisekai`}
        description={project.description}
      />
      <div className="bg-gradient-to-b from-neutral to-accent px-2">
        <div className="mx-auto max-w-[1200px]  px-2">
          <Header />
          <div className="mx-auto mt-4 min-h-[calc(100vh-70px)] max-w-[800px] pb-10 text-base-100">
            <h1 className="text-xl text-primary">{project.name}</h1>
            <h4 className="mt-4 text-lg">{project.description}</h4>
            <div
              className="mt-4 detail"
              dangerouslySetInnerHTML={{ __html: project.html }}
            />
          </div>
        </div>
        {scroll > 400 && (
          <button onClick={handleOnTop} className="btn-outline btn-primary btn fixed right-5 bottom-5">
            TOP
          </button>
        )}
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  const project = await prisma.project.findFirst({
    where: {
      slug,
      active: true,
    },
  });

  return {
    props: {
      project: JSON.parse(JSON.stringify(project)),
    },
    revalidate: 60,
  };
};

export default DetailProject;
