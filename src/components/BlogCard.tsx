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
        <LazyLoadImage
          effect="blur"
          src={thumbnail}
          className="aspect-video rounded-md"
          alt="Blog"
        />
        <h1 className="link-hover text-xl text-primary line-clamp-2">{name}</h1>
        <p className="line-clamp-3">{description}</p>
      </div>
    </Link>
  );
};

export default BlogCard;
