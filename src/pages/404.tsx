import Link from "next/link";
import React from "react";

const ErrorPage = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">404 Not Found</h1>
          <p className="py-6">
            This page does not exist, please return to the homepage
          </p>
          <Link href={"/"}>
            <button className="btn-primary btn">Home Page</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
