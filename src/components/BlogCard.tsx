import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const BlogCard = () => {
  return (
    <div className="space-y-2">
      <LazyLoadImage src="/images/me.jpg" className="rounded-md" alt="Blog" />
      <h1 className="text-xl">DMovie</h1>
      <p className="">
        Dự án cá nhân mình phát triển với mục đích chia sẻ các giao diện đơn
        giản hay gặp, các bạn có thể lấy giao diện chỉ với 1 vài cú nhấp chuột.
      </p>
    </div>
  );
};

export default BlogCard;
