"use client";

import Container from "@/src/components/Container";
import Stepper from "@/src/components/Stepper";
import PlanSummary from "@/src/components/SummaryPlan";
import { usePathname } from "next/navigation";

export default function HomeInternetLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const steps = [
    { label: "Service" },
    { label: "Location" },
    { label: "Plan" },
    { label: "Extras" },
    { label: "Equipment" },
    { label: "Review" },
  ];

  const pathname = usePathname();

  console.log("pathname :: ", pathname);

  return (
    <>
      <div className="text-center pt-[100px] min-h-0" />
      <Stepper
        steps={steps}
        currentStep={pathname === "/home-internet" ? 1 : 0}
      />
      <div className="bg-gray-100 pt-6 min-h-[100vh]">
        <Container className="grid grid-cols-12 justify-between">
          <div className="col-span-8">{children}</div>
          <div className="col-span-4">
            <PlanSummary items={[]} pricing={[]} />
          </div>
        </Container>
      </div>
    </>
  );
}
