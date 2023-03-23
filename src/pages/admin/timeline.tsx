import React, { FC, useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import AdminLayout from "~/components/layouts/AdminLayout";
import Meta from "~/components/Meta";
import TextInput from "~/components/TextInput";
import { generateArray, textError } from "~/utils";
import { useMutation } from "react-query";
import TimeLineAction from "~/actions/TimeLineAction";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { GetServerSideProps, NextPage } from "next";
import { prisma } from "~/server/db";
import { TimelineModel } from "~/models/TimelineModel";
import TextArea from "~/components/TextArea";

interface FormValues {
  year: number;
  title: string;
  content: string;
}

interface TimeLineProps {
  timelines: TimelineModel[];
}

interface TdTableProps {
  data: TimelineModel;
  index: number;
  onDisplayEdit: (data: TimelineModel) => void;
  handleDelete:(id:string) => void
}
const TdTable: FC<TdTableProps> = ({ data, index, onDisplayEdit,handleDelete }) => {
  const [isShowMore, setIsShowMore] = useState(false);

  return (
    <tr key={data.id}>
      <th>{index + 1}</th>
      <td>{data.year}</td>
      <td>{data.title}</td>
      <td>
        <p
          className=" whitespace-normal "
          dangerouslySetInnerHTML={{
            __html: isShowMore ? data.content : data.content.slice(0, 100),
          }}
        />
        {data.content.length > 100 && <button className="link" onClick={() => setIsShowMore(!isShowMore)}>
          {isShowMore ? "Shortcut" : "Show more"}
        </button>}
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

const TimeLine: NextPage<TimeLineProps> = ({ timelines }) => {
  const {
    formState: { errors },
    control,
    reset,
    handleSubmit,
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      year: 0,
      title: "",
      content: "",
    },
  });

  const router = useRouter();
  const updateModalRef = useRef<any>();
  const addModalRef = useRef<any>();

  const [currentEdit, setCurrentEdit] = useState<TimelineModel>();

  const { mutate: addTimeline, isLoading: isLoadingAdd } = useMutation(
    TimeLineAction.add,
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

  const {mutate:deleteTimeline, isLoading:isLoadingDelete} = useMutation(TimeLineAction.delete,{
    onSuccess:() => {
      Swal.fire("Success", "Delete successfull", "success");
      router.replace(router.asPath);
    },
    onError:() => {
      Swal.fire({
        title: "Error!",
        text: textError,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  })

  const handleDelete = (id:string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTimeline(id)
      }
    })
  }

  const { mutate: updateTimeline, isLoading: isLoadingUpdate } = useMutation(
    TimeLineAction.update,
    {
      onSuccess: (data) => {
        Swal.fire("Success", "Update successfull", "success");
        router.replace(router.asPath);
        updateModalRef.current.checked = false;
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

  const handleAdd = (data: FormValues) => {
    addTimeline({ ...data, content: data.content.replace(/\n/g, "<br/>") });
  };

  const handleDisplayEdit = (data: TimelineModel) => {
    setCurrentEdit(data);
    updateModalRef.current.checked = true;
    setValue("title", data.title);
    setValue("year", data.year);
    setValue("content", data.content.replace(/<br\/>/g, "\n"));
  };

  const handleDisplayAdd = () => {
    reset();
    addModalRef.current.checked = true;
  };

  const handleUpdate = (data: FormValues) => {
    updateTimeline({ ...data, id: currentEdit?.id, content:data.content.replace(/\n/g, "<br/>") });
  };

  return (
    <>
      <Meta title="Datisekai | Timeline" />
      <AdminLayout>
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
                  <th>Year</th>
                  <th>Title</th>
                  <th>Content</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {timelines?.map((item, index) => (
                  <TdTable
                    key={item.id}
                    onDisplayEdit={handleDisplayEdit}
                    data={item}
                    handleDelete={handleDelete}
                    index={index}
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
              <h3 className="text-lg font-bold">Create New TimeLine</h3>
              <div className="mt-4 space-y-1">
                <div className="space-y-1">
                  <label htmlFor="year">Year</label>
                  <TextInput
                    type="number"
                    control={control}
                    error={errors}
                    name="year"
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
                  <TextArea
                    control={control}
                    error={errors}
                    name="content"
                    placeholder="Type here"
                    rules={{ required: "Not be empty" }}
                  />
                </div>
              </div>
              <div onClick={handleSubmit(handleAdd)} className="modal-action ">
                <button className="btn">Create</button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal update */}
        <div>
          <input
            type="checkbox"
            ref={updateModalRef}
            id="update-modal"
            className="modal-toggle"
          />
          <div className="modal">
            <div className="modal-box relative">
              <label
                htmlFor="update-modal"
                className="btn-sm btn-circle btn absolute right-2 top-2"
              >
                ✕
              </label>
              <h3 className="text-lg font-bold">Update TimeLine #1</h3>
              <div className="mt-4 space-y-1">
                <div className="space-y-1">
                  <label htmlFor="year">Year</label>
                  <TextInput
                    type="number"
                    control={control}
                    error={errors}
                    name="year"
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
                  <TextArea
                    control={control}
                    error={errors}
                    name="content"
                    placeholder="Type here"
                    rules={{ required: "Not be empty" }}
                  />
                </div>
              </div>
              <div
                onClick={handleSubmit(handleUpdate)}
                className="modal-action "
              >
                <button className="btn">Update</button>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default TimeLine;

export const getServerSideProps: GetServerSideProps = async () => {
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
  };
};
