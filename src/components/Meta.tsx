import Head from "next/head";
import React, { FC } from "react";

interface MetaProps {
  title: string;
  description?: string;
  image?: string;
}

const Meta: FC<MetaProps> = ({
  description = "This is datisekai profile",
  title,
  image,
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      {image && <meta property="twitter:image" content={image} />}
    </Head>
  );
};

export default Meta;
