import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { useMutation } from "react-query";
import Swal from "sweetalert2";
import ProjectAction from "~/actions/ProjectAction";
import AdminLayout from "~/components/layouts/AdminLayout";
import Meta from "~/components/Meta";
import { ProjectModel } from "~/models/ProjectModel";
import { prisma } from "~/server/db";
import { textError } from "~/utils";

interface ProjectProps {
  projects: ProjectModel[];
}

interface TdTableProps {
  data: ProjectModel;
  index: number;
  handleDelete: (id: string) => void;
}
const TdTable: FC<TdTableProps> = ({ data, index, handleDelete }) => {
  const [isShowMore, setIsShowMore] = useState(false);

  console.log(data.description.length)
  return (
    <tr>
      <th>{index + 1}</th>
      <td>
        <Image
          width={70}
          height={70}
          className={"object-cover"}
          alt={data.name}
          src={data.thumbnail}
        />
      </td>
      <td>{data.url || "Không có"}</td>
      <td>
        <p className="whitespace-normal">{data.name}</p>
      </td>
      <td>
        <p className="whitespace-normal">{isShowMore ? data.description : data.description.slice(0,100)}</p>
        {data.description.length > 100 && (
          <button className="link" onClick={() => setIsShowMore(!isShowMore)}>
            {isShowMore ? "Shortcut" : "Show more"}
          </button>
        )}
      </td>
      <td>
        <div className="flex space-x-2">
          <Link href={`/admin/project/${data.id}`}>
            <button>Edit</button>
          </Link>
          <button onClick={() => handleDelete(data.id)}>Delete</button>
        </div>
      </td>
    </tr>
  );
};

const Project: NextPage<ProjectProps> = ({ projects }) => {
  const router = useRouter();

  const { mutate, isLoading } = useMutation(ProjectAction.delete, {
    onSuccess: () => {
      Swal.fire("Success", "Delete successfull", "success");
      router.replace(router.asPath);
    },
    onError: () => {
      Swal.fire({
        title: "Error!",
        text: textError,
        icon: "error",
        confirmButtonText: "OK",
      });
    },
  });

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutate(id);
      }
    });
  };
  return (
    <>
      <Meta title="Datisekai | Timeline" />
      <AdminLayout>
        {" "}
        <div className="mt-2">
          <Link href={"/admin/project/add"}>
            <button className="btn-bg-neutral btn-outline btn-circle btn fixed right-5 bottom-5 z-40 shadow-md">
              Add
            </button>
          </Link>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>Thumbnail</th>
                  <th>URL</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {projects.map((item, index) => (
                  <TdTable
                    data={item}
                    handleDelete={handleDelete}
                    index={index}
                    key={item.id}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AdminLayout>

      {/*Modal Add   */}
    </>
  );
};

export default Project;

export const getServerSideProps: GetServerSideProps = async () => {
  const projects = await prisma.project.findMany({
    where: {
      active: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return {
    props: {
      projects: JSON.parse(JSON.stringify(projects)),
    },
  };
};
