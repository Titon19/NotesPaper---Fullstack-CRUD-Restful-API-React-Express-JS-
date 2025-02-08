import React from "react";
import MainLayout from "../../layouts/MainLayout";
const Index = () => {
  return (
    <>
      <MainLayout>
        <div className="flex gap-3 flex-wrap md:flex-nowrap items-start md:items-center min-h-screen">
          <div className="flex flex-col gap-3 py-28 px-8 bg-neutral-950 border-2 border-dashed rounded-xl p-4 w-full md:w-1/2 flex-shrink-0">
            <h1 className="text-5xl md:text-7xl font-bold text-white">
              NotesPaper
            </h1>
            <p className="text-2xl font-semibold text-white">
              Aplikasi simpel untuk menulis catatan
            </p>
          </div>
          <div>
            <p className="text-3xl font-bold">
              Catatan simpel yang dibuat dengan React, Vite, Express.js,
              Tailwinds CSS, Prisma, dan JWT Authentication
            </p>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Index;
