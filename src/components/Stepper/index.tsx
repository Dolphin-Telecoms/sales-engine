"use client";

import React from "react";
import cn from "classnames";
import Container from "@/src/components/Container";

type Step = {
  label: string;
};

interface StepperProps {
  steps: Step[];
  currentStep: number; // 0-based index
  className?: string;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep, className }) => {
  return (
    <div className={cn("w-full border-b-2 border-t-2 border-[#DCDCDC] pt-8", className)}>
      <Container
        className={cn("flex items-center justify-between")}
      >
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <div
              key={index}
              className={cn("items-center", {
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
                    <div
                      className={cn("w-2.5 h-2.5 rounded-full", {
                        "bg-[#F2A413]": isCompleted,
                        "bg-teal-700": isActive,
                      })}
                    />
                  )}
                </div>

                <span
                  className={`mt-2 "font-[Exo] font-bold text-sm leading-none tracking-normal text-center" ${
                    isActive ? "text-teal-800" : "text-gray-400"
                  }`}
                >
                  {step.label}
                </span>

                <div className="mt-6 bg-gray-300">
                  {index === currentStep ? (
                    <div
                      className={`h-[3px] w-[2vw] ${
                        index === currentStep ? "bg-teal-700" : ""
                      }`}
                    />
                  ) : null}
                </div>
              </div>

              {/* Line */}
              {index !== steps.length - 1 && (
                <div className="flex-1 h-[2px] mx-2 bg-gray-300 relative -top-5">
                  <div
                    className={`absolute top-0 left-0 h-full ${
                      index < currentStep ? "bg-[#F2A413] w-full" : "w-0"
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </Container>
    </div>
  );
};

export default Stepper;
