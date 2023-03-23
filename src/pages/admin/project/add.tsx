import dynamic from "next/dynamic";
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

const AddProject = () => {
  const {
    formState: { errors },
    control,
    reset,
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      url: "",
      active: true,
      name: "",
      description: "",
    },
  });

  const router = useRouter();

  const { mutate, isLoading } = useMutation(ProjectAction.add, {
    onSuccess: () => {
      reset();
      Swal.fire("Success", "Add successfull", "success");
      router.push('/admin/project')
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

  const [html, setHtml] = useState("");
  const [thumbnail, setThumbnail] = useState<{
    file: File | null | undefined;
    preview: string;
  }>({
    file: null,
    preview: "",
  });

  useEffect(() => {
    if (html.length > 0 && errorOutside.html) {
      setErrorOutside({ ...errorOutside, html: false });
    }
  }, [html]);

  const handleAdd = async (data: FormValues) => {
    if (!thumbnail.file || !thumbnail.preview) {
      setErrorOutside({ ...errorOutside, thumbnail: true });
      return;
    }

    if (html.length === 0) {
      setErrorOutside({ ...errorOutside, html: true });
      return;
    }

    const thumbnailUrl = await uploadCloudinary(thumbnail.file);
    if (!thumbnailUrl) {
      Swal.fire({
        title: "Error!",
        text: "Image error, please choose another image",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const payload = {
      ...data,
      html,
      thumbnail: thumbnailUrl,
    };

    mutate(payload);
  };

  return (
    <>
      <Meta title="Datisekai | Add Project" />
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
                        <input {...field} type="checkbox" className="toggle" />
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
                <TextEditor onChange={setHtml} />
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
            Add Project
          </button>
        </div>
      </AdminLayout>

      {/*Modal Add   */}
    </>
  );
};

export default AddProject;
