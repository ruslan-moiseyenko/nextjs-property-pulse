import Link from "next/link";
import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <section className="min-h-screen flex-grow bg-blue-100">
      <div className="container m-auto max-w-2xl py-24">
        <div className="m-4 mb-4 rounded-md border bg-white px-6 py-24 shadow-md md:m-0">
          <div className="flex justify-center">
            <FaExclamationTriangle className="fas fa-exclamation-triangle fa-5x text-8xl text-yellow-400"></FaExclamationTriangle>
          </div>
          <div className="text-center">
            <h1 className="mb-2 mt-4 text-3xl font-bold">Page Not Found</h1>
            <p className="mb-10 text-xl text-gray-500">
              The page you are looking for does not exist.
            </p>
            <Link
              href="/"
              className="rounded bg-blue-700 px-6 py-4 font-bold text-white hover:bg-blue-800"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
      <div className="flex-grow"></div>
    </section>
  );
};

export default NotFoundPage;
