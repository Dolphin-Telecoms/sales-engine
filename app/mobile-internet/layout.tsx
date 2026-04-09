"use client";

import AppBar from "@/src/components/AppBar";
import Container from "@/src/components/Container";
import Hero from "@/src/components/Hero";
import { useState, Suspense } from "react";

export default function MobileInternetLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [idType, setIdType] = useState<"sim" | "airtime">("sim");
  return (
    <Suspense>
      <AppBar />
      <div className="text-center pt-[70px] lg:pt-[93px] min-h-0" />
      <div className="bg-gray-100 pt-6 min-h-[100vh]">
        <Container className="flex flex-col gap-y-6">
          <Hero
            title="Dolphin Mobile"
            label="Mobile zimbabwe"
            highlight="Zimbabwe"
            description="Flexible mobile plans, simple top-ups, and reliable nationwide coverage."
          />
          {children}
        </Container>
      </div>
    </Suspense>
  );
}
