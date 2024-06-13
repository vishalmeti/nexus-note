"use client";

import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import { FadeLoader } from "react-spinners";
import Navigation from "./_components/navigation";
import Image from "next/image";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center flex-col">
        <FadeLoader color="gray" width={5} />
        <h1 className="py-2 text-lg font-semibold text-muted-foreground" >Loading...</h1>
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect("/");
  }
  return (
    <div className="h-full flex dark:bg-[#1F1F1F]">
      <Navigation />
      <main className="flex-1 h-full overflow-y-auto">{children}</main>
    </div>
  );
};

export default MainLayout;
