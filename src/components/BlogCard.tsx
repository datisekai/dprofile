import Link from "next/link";
import React, { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ProjectModel } from "~/models/ProjectModel";

const BlogCard: FC<ProjectModel> = ({
  active,
  createdAt,
  description,
  html,
  id,
  name,
  slug,
  thumbnail,
  updatedAt,
  url,
}) => {
  return (
    <Link href={`/${slug}`}>
      <div className="space-y-2">
        <LazyLoadImage src={thumbnail} className="rounded-md" alt="Blog" />
        <h1 className="text-xl link-hover line-clamp-2 text-primary">{name}</h1>
        <p className="line-clamp-3">{description}</p>
      </div>
    </Link>
  );
};

export default BlogCard;
