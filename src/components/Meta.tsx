import Head from "next/head";
import React, { FC } from "react";

interface MetaProps {
    title:string
    description?:string
}

const Meta:FC<MetaProps> = ({description = "This is datisekai profile",title}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default Meta;
