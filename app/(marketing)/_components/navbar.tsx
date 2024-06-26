"use client";

//Clerk auth imports
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import Logo from "./logo";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { BeatLoader } from "react-spinners";
import Link from "next/link";

const Navbar = () => {
  const scrolled = useScrollTop();
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#0a0a0a]fixed top-0 flex items-center w-full p-6",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {isLoading && (
          <>
            <BeatLoader color="#478ecc" speedMultiplier={1.5} />
          </>
        )}{" "}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button size="sm">Explore Nexus</Button>
            </SignInButton>
          </>
        )}
        {
          isAuthenticated && !isLoading &&(
            <>
            <Button variant="ghost" size="sm" asChild >
              <Link href="/documents" >
              Enter Nexus
              </Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
            </>
          )
        }
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
