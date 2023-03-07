import React from "react";
import { generateArray } from "~/utils";
import BlogCard from "./BlogCard";

const ListProduct = () => {
  return (
    <div className="mt-5">
      <h2 className="line-gradient relative inline text-lg md:text-xl">
        Sản phẩm của mình
      </h2>
      <div className="mt-7 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {generateArray(8).map((item) => (
          <BlogCard key={item} />
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
