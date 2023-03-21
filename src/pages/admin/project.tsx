import React from "react";
import AdminLayout from "~/components/layouts/AdminLayout";
import Meta from "~/components/Meta";
import { generateArray } from "~/utils";

const Project = () => {
  return (
    <>
      <Meta title="Datisekai | Timeline" />
      <AdminLayout>
        {" "}
        <div className="mt-2">
          <label
            htmlFor="add-modal"
            className="btn-bg-neutral btn-outline btn-circle btn fixed right-5 bottom-5 z-40 shadow-md"
          >
            Add
          </label>
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
                {generateArray(20).map((item, index) => (
                  <tr key={item}>
                    <th>{index + 1}</th>
                    <td>Cy Ganderton</td>
                    <td>Quality Control Specialist</td>
                    <td>Blue</td>
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

      {/*Modal Add   */}
      <div>
        <input type="checkbox" id="add-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <h3 className="text-lg font-bold">
              Congratulations random Internet user!
            </h3>
            <p className="py-4">
              You've been selected for a chance to get one year of subscription
              to use Wikipedia for free!
            </p>
            <div className="modal-action">
              <label htmlFor="my-modal" className="btn">
                Yay!
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Project;
