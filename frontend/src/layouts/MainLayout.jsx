import React from "react";
import Header from "../components/Header";
import { Outlet, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
const MainLayout = ({ children, title, to, buttonTopText, icon }) => {
  return (
    <>
      <div className="min-h-screen max-w-6xl mx-auto">
        <Header />
        <main className="min-h-screen max-w-6xl mx-auto p-4">
          <Outlet />

          <div className="flex flex-col gap-3">
            <div className="flex justify-between gap-3 my-8">
              <h1 className="text-3xl font-bold">{title}</h1>
              {buttonTopText && (
                <Button>
                  <Link to={to}>{buttonTopText}</Link>
                  {icon}
                </Button>
              )}
            </div>
            {children}
          </div>
        </main>
      </div>
    </>
  );
};

export default MainLayout;
