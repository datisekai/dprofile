import React, { FC } from "react";
import { ProjectModel } from "~/models/ProjectModel";
import { generateArray } from "~/utils";
import BlogCard from "./BlogCard";

interface ListProductProps {
  data: ProjectModel[];
}

const ListProduct: FC<ListProductProps> = ({ data }) => {
  return (
    <div className="mt-5">
      <h2 className="line-gradient relative inline text-lg md:text-xl">
        Sản phẩm của mình
      </h2>
      <div className="mt-7 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {data.map((item) => (
          <BlogCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
