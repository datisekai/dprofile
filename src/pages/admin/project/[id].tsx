import { GetServerSideProps, NextPage } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { uploadCloudinary } from "~/actions";
import ProjectAction from "~/actions/ProjectAction";
import AdminLayout from "~/components/layouts/AdminLayout";
import Meta from "~/components/Meta";
import TextInput from "~/components/TextInput";
import { ProjectModel } from "~/models/ProjectModel";
import { prisma } from "~/server/db";
import { textError } from "~/utils";

const TextEditor = dynamic(() => import("~/components/TextEditor"), {
  ssr: false,
});

interface FormValues {
  url: string;
  active: boolean;
  name: string;
  description: string;
}

interface EditProjectProps {
  project: ProjectModel;
}

const EditProject: NextPage<EditProjectProps> = ({ project }) => {
  const {
    formState: { errors },
    control,
    reset,
    handleSubmit,
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      url: project.url || "",
      active: project.active,
      name: project.name,
      description: project.description,
    },
  });

  let active = watch("active");

  const router = useRouter();

  const { mutate, isLoading } = useMutation(ProjectAction.update, {
    onSuccess: () => {
      reset();
      Swal.fire("Success", "Edit successfull", "success");
      router.push("/admin/project");
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

  const [errorOutside, setErrorOutside] = useState({
    thumbnail: false,
    html: false,
  });

  const [html, setHtml] = useState(project.html);
  const [thumbnail, setThumbnail] = useState<{
    file: File | null | undefined;
    preview: string;
  }>({
    file: null,
    preview: project.thumbnail,
  });

  useEffect(() => {
    if (html.length > 0 && errorOutside.html) {
      setErrorOutside({ ...errorOutside, html: false });
    }
  }, [html]);

  const handleAdd = async (data: FormValues) => {
    console.log(thumbnail);
    if (!thumbnail.preview) {
      setErrorOutside({ ...errorOutside, thumbnail: true });
      return;
    }

    if (html.length === 0) {
      setErrorOutside({ ...errorOutside, html: true });
      return;
    }

    let thumbnailUrl = "";

    if (thumbnail.file) {
        thumbnailUrl = await uploadCloudinary(thumbnail.file || null);
      if (!thumbnailUrl) {
        Swal.fire({
          title: "Error!",
          text: "Image error, please choose another image",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }
    }

    const payload = {
      ...data,
      html,
      thumbnail: thumbnail.file ? thumbnailUrl : thumbnail.preview,
      id: router.query.id,
    };

    mutate(payload);
  };

  return (
    <>
      <Meta title="Datisekai | Edit Project" />
      <AdminLayout>
        <div className="overflow-hidden">
          <div className="mt-2 flex flex-col md:flex-row">
            <div className="w-full rounded-md border border-primary p-4 shadow-md md:w-[30%]">
              <h1 className="text-lg">Basic Information</h1>
              <div className="mt-4 space-y-2">
                <div className="space-y-1">
                  <label>Thumbnail</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files) {
                        const file = e.target.files[0];
                        file &&
                          setThumbnail({
                            file,
                            preview: URL.createObjectURL(file),
                          });
                        setErrorOutside({ ...errorOutside, thumbnail: false });
                      }
                    }}
                    className="file-input-bordered file-input w-full "
                  />
                  {thumbnail.preview && (
                    <Image
                      width={70}
                      height={70}
                      alt=""
                      src={thumbnail.preview}
                    />
                  )}
                  <p className={`py-1 text-sm text-primary`}>
                    {errorOutside.thumbnail && "Not be empty"}
                  </p>
                </div>
                <div className="space-y-1">
                  <label htmlFor="url">URL</label>
                  <TextInput
                    control={control}
                    error={errors}
                    name="url"
                    placeholder="Type here"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="name">Name</label>
                  <TextInput
                    control={control}
                    error={errors}
                    name="name"
                    placeholder="Type here"
                    rules={{
                      required: "Not be empty",
                    }}
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="year">Description</label>
                  <TextInput
                    control={control}
                    error={errors}
                    name="description"
                    placeholder="Type here"
                    rules={{
                      required: "Not be empty",
                    }}
                  />
                </div>

                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Active</span>
                    <Controller
                      name={"active"}
                      control={control}
                      render={({ field }: any) => (
                        <input
                          {...field}
                          checked={active}
                          type="checkbox"
                          className="toggle"
                        />
                      )}
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="mt-2 flex-1 rounded-md border border-primary p-4 shadow-md md:mt-0 md:ml-4">
              <h1 className="text-lg">Detail Project</h1>
              <p className={`py-1 text-sm text-primary`}>
                {errorOutside.html && "Not be empty"}
              </p>
              <div className="mt-4">
                <TextEditor initialContent={project.html} onChange={setHtml} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            disabled={isLoading}
            onClick={handleSubmit(handleAdd)}
            className="btn-primary btn mt-4 text-base-100"
          >
            Edit Project
          </button>
        </div>
      </AdminLayout>

      {/*Modal Add   */}
    </>
  );
};

export default EditProject;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const id = query.id as string;
  const project = await prisma.project.findUnique({
    where: {
      id,
    },
  });

  return {
    props: {
      project: JSON.parse(JSON.stringify(project)),
    },
  };
};
