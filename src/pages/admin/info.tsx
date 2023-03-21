import React from "react";
import AdminLayout from "~/components/layouts/AdminLayout";
import Meta from "~/components/Meta";
import { generateArray } from "~/utils";

const Info = () => {
  return (
    <>
      <Meta title="Datisekai | Timeline" />
      <AdminLayout>
        {" "}
        <div className="mt-2">
          <div className="btn-bg-neutral btn-outline btn-circle btn fixed right-5 bottom-5 z-40 shadow-md">
            Add
          </div>
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
                {generateArray(20).map((item, index) => (
                  <tr key={item}>
                    <th>{index + 1}</th>
                    <td>Cy Ganderton</td>
                    <td>Quality Control Specialist</td>
                    <td>Blue</td>
                    <td>
                      <div className="flex space-x-2">
                        <button>Edit</button>
                        <button>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default Info;
