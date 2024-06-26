"use client";

import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { BeatLoader, GridLoader, HashLoader } from "react-spinners";

const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your Ideas, Documents, & Plans. Unified. Welcome to{" "}
        <span className="underline">Nexus</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Nexus Note is the connected workspace where better,faster work happens
      </h3>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <BeatLoader color="grey" speedMultiplier={1.2} />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/documents">
            Enter Nexus <ArrowRight className="h-4 w-4 ml-2" />{" "}
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button>
            Get Nexus for free
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
};

export default Heading;
