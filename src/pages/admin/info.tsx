import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { FC, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { uploadCloudinary } from "~/actions";
import InfoAction from "~/actions/InfoAction";
import AdminLayout from "~/components/layouts/AdminLayout";
import Meta from "~/components/Meta";
import TextInput from "~/components/TextInput";
import { InfoModel } from "~/models/InfoModel";
import { prisma } from "~/server/db";
import { generateArray, textError } from "~/utils";

interface InfoProps {
  infos: InfoModel[];
}

interface TdTableProps {
  data: InfoModel;
  index: number;
  onDisplayEdit: (data: InfoModel) => void;
  handleDelete: (id: string) => void;
}
const TdTable: FC<TdTableProps> = ({
  data,
  index,
  onDisplayEdit,
  handleDelete,
}) => {
  const [isShowMore, setIsShowMore] = useState(false);

  return (
    <tr key={data.id}>
      <th>{index + 1}</th>
      <td>{data.code}</td>
      <td>{data.title}</td>
      <td>
        <p
          className=" whitespace-normal break-words"
          dangerouslySetInnerHTML={{
            __html: isShowMore ? data.content : data.content.slice(0, 100),
          }}
        />
        {data.content.length > 100 && (
          <button className="link" onClick={() => setIsShowMore(!isShowMore)}>
            {isShowMore ? "Shortcut" : "Show more"}
          </button>
        )}
      </td>
      <td>
        <div className="flex space-x-2">
          <button onClick={() => onDisplayEdit(data)}>Edit</button>

          <button onClick={() => handleDelete(data.id)}>Delete</button>
        </div>
      </td>
    </tr>
  );
};

interface FormValues {
  code: string;
  title: string;
  content: string;
}

const Info: NextPage<InfoProps> = ({ infos }) => {
  const router = useRouter();

  const updateModalRef = useRef<any>();
  const addModalRef = useRef<any>();

  const [currentEdit, setCurrentEdit] = useState<InfoModel>();
  const [image, setImage] = useState<{
    file: File | null | undefined;
    preview: string;
    url: string;
    loading: boolean;
  }>({
    file: null,
    preview: "",
    url: "",
    loading: false,
  });

  const {
    formState: { errors },
    control,
    reset,
    setValue,
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      code: "",
      title: "",
      content: "",
    },
  });

  const { mutate: addInfo, isLoading: isLoadingAdd } = useMutation(
    InfoAction.add,
    {
      onSuccess: (data) => {
        reset();
        Swal.fire("Success", "Add successfull", "success");
        router.replace(router.asPath);
        addModalRef.current.checked = false;
      },
      onError: (err) => {
        Swal.fire({
          title: "Error!",
          text: textError,
          icon: "error",
          confirmButtonText: "OK",
        });
      },
    }
  );

  const { mutate: deleteInfo, isLoading: isLoadingDelete } = useMutation(
    InfoAction.delete,
    {
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
    }
  );

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
        deleteInfo(id);
      }
    });
  };

  const handleDisplayEdit = (data: InfoModel) => {};

  const handleDisplayAdd = () => {
    reset();
    setImage({file:null,loading:false, preview:"", url:""})
    addModalRef.current.checked = true;
  };

  const handleAdd = (data: FormValues) => {
    addInfo(data)
   
  };

  const handleUpload = async () => {
    if (image.file) {
      setImage({ ...image, loading: true });
      try {
        const url = await uploadCloudinary(image.file);
        setImage({ ...image, url, loading: false });
      } catch (error) {
        setImage({ ...image, url: "", loading: false });
        Swal.fire({
          title: "Error!",
          text: "Upload error",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  return (
    <>
      <Meta title="Datisekai | Info" />
      <AdminLayout>
        {" "}
        <div className="mt-2">
          <button
            onClick={handleDisplayAdd}
            className="btn-bg-neutral btn-outline btn-circle btn fixed right-10 bottom-5 z-40 shadow-md"
          >
            Add
          </button>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>Code</th>
                  <th>Title</th>
                  <th>Content</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {infos.map((item, index) => (
                  <TdTable
                    key={item.id}
                    data={item}
                    index={index}
                    handleDelete={handleDelete}
                    onDisplayEdit={handleDisplayEdit}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Modal Add */}
        <div>
          <input
            type="checkbox"
            ref={addModalRef}
            id="add-modal"
            className="modal-toggle"
          />
          <div className="modal">
            <div className="modal-box relative">
              <label
                htmlFor="add-modal"
                className="btn-sm btn-circle btn absolute right-2 top-2"
              >
                ✕
              </label>
              <h3 className="text-lg font-bold">Create New Info</h3>
              <div className="mt-4 space-y-1">
                <div className="space-y-1">
                  <label htmlFor="code">Code</label>
                  <TextInput
                    control={control}
                    error={errors}
                    name="code"
                    placeholder="Type here"
                    rules={{
                      required: "Not be empty",
                    }}
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="title">Title</label>
                  <TextInput
                    control={control}
                    error={errors}
                    name="title"
                    placeholder="Type here"
                    rules={{ required: "Not be empty" }}
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="content">Content</label>
                  <TextInput
                    control={control}
                    error={errors}
                    name="content"
                    placeholder="Type here"
                    rules={{ required: "Not be empty" }}
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="image">Get Link Image</label>
                  <div className="flex items-center justify-between space-x-2">
                    <input
                      type="file"
                      name="image"
                      onChange={(e) => {
                        if (e.target.files) {
                          const file = e.target.files[0];
                          file &&
                            setImage({
                              ...image,
                              file,
                              preview: URL.createObjectURL(file),
                            });
                        }
                      }}
                      className="file-input-bordered file-input w-full "
                    />
                    <button
                      onClick={handleUpload}
                      disabled={image.loading}
                      className="btn-outline btn-primary btn"
                    >
                      GET
                    </button>
                  </div>
                  {image.preview && (
                    <Image width={70} height={70} alt="" src={image.preview} />
                  )}
                  <p className="text-primary break-words">
                    {image.loading ? "Loading..." : image.url && image.url}
                  </p>
                </div>
              </div>
              <div onClick={handleSubmit(handleAdd)} className="modal-action ">
                <button className="btn">Create</button>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default Info;

export const getServerSideProps: GetServerSideProps = async () => {
  const infos = await prisma.info.findMany();

  return {
    props: {
      infos: JSON.parse(JSON.stringify(infos)),
    },
  };
};
