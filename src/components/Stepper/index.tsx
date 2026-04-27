"use client";

import React from "react";
import Link from "next/link";
import cn from "classnames";
import { Step } from "@/src/types";

interface StepperProps {
  steps: Step[];
  currentStep: number; // 0-based index
  className?: string;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep, className }) => {
  return (
    <div
      className={cn(
        "w-full border-b-2 border-t-1 border-[#DCDCDC] pt-8",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between max-w-3xl px-6 md:px-0 mx-auto",
        )}
      >
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <div
              key={index}
              className={cn("items-center pb-10", {
                "flex-1 flex": index !== steps.length - 1,
              })}
            >
              {/* Circle + Label */}
              <div className="flex flex-col items-center relative">
                <div
                  className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center
                  ${
                    isActive
                      ? "bg-teal-700 border-4 border-[#D5DFE4]"
                      : isCompleted
                        ? "bg-[#F2A413] border-4 border-[#FCEDD0]"
                        : "bg-white border-4 border-gray-300"
                  }
                `}
                >
                  {/* Inner dot */}
                  {(isActive || isCompleted) && (
                    <Link href={step.link}>
                      <div
                        className={cn("w-2.5 h-2.5 rounded-full", {
                          "bg-[#F2A413]": isCompleted,
                          "bg-teal-700": isActive,
                        })}
                      />
                    </Link>
                  )}
                </div>

                <span
                  className={cn(
                    `absolute top-8 font-[Exo] font-bold text-sm leading-none tracking-normal text-center`,
                    {
                      "text-teal-800": isActive || isCompleted,
                      "text-gray-400": !isActive,
                      "invisible w-[0px] lg:w-auto lg:visible": !isActive,
                    },
                  )}
                >
                  {step.label}
                </span>

                <div className="bg-gray-300 absolute top-15">
                  {index === currentStep ? (
                    <div
                      className={`h-[3px] w-[30px] lg:w-[2vw] ${
                        index === currentStep ? "bg-teal-700" : ""
                      }`}
                    />
                  ) : null}
                </div>
              </div>

              {/* Line */}
              {index !== steps.length - 1 && (
                <div className="flex-1 h-[2px] lg:mx-2 bg-gray-300 relative">
                  <div
                    className={`absolute top-0 left-0 h-full w-full ${
                      index < currentStep ? "bg-[#F2A413]" : ""
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
