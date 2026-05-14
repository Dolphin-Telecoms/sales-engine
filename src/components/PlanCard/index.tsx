import Image from "next/image";
import { FaCheck } from "react-icons/fa";
import cn from "classnames";

type SelectableCardProps = {
  title: string;
  description: string | false;
  price: string;
  image: string;
  selected: boolean;
  onClick: () => void;
};

export default function PlanCard({
  title,
  description,
  price,
  image,
  selected,
  onClick,
}: SelectableCardProps) {
  return (
    <div
      onClick={onClick}
      className={`flex justify-between items-center p-4 rounded-xl border cursor-pointer ${
        selected ? "border-2 border-[#f59e0b] bg-[#fff7ed]" : "border-[#e5e7eb]"
      }`}
    >
      {/* Left Section */}
      <div className="flex gap-3 items-start lg:items-center w-full">
        {/* Icon */}
        <div
          className={cn("p-3 rounded-lg", {
            "bg-[#fef3c7]": selected,
            "bg-[#e5e7eb]": !selected,
          })}
        >
          <Image src={image} alt={title} height={20} width={20} />
        </div>

        {/* Content */}
        <div className="w-full">
          <div className="flex lg:block justify-between">
            <p className="font-exo font-bold text-[14px] lg:text-[20px] leading-[1.2] mb-1">
              {title}
            </p>

            {/* Mobile Check */}
            <div
              className={`lg:hidden w-4 h-4 rounded-full border flex items-center justify-center ${
                selected ? "bg-[#f59e0b] border-[#f59e0b]" : "border-[#d1d5db]"
              }`}
            >
              {selected && <FaCheck className="text-white p-1" />}
            </div>
          </div>

          <div
            className="font-exo font-normal text-[12px] lg:text-[14px] leading-[1] text-[#6B7280]"
            dangerouslySetInnerHTML={{ __html: description }}
          />

          {/* Mobile Price */}
          <span className="lg:hidden flex mt-2 font-exo font-bold text-[14px] leading-[1.2] text-right text-[#2C6176]">
            {price}
          </span>
        </div>
      </div>

      {/* Desktop Right Section */}
      <div className="hidden lg:flex items-center gap-3">
        <span className="font-exo font-bold text-[16px] leading-[1.2] text-right text-[#2C6176]">
          {price}
        </span>

        <div
          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
            selected ? "bg-[#f59e0b] border-[#f59e0b]" : "border-[#d1d5db]"
          }`}
        >
          {selected && <FaCheck className="text-white text-xs" />}
        </div>
      </div>
    </div>
  );
}

export const PlanCardSkeleton = () => {
  return (
    <div className="flex justify-between items-center p-4 rounded-xl border border-[#e5e7eb] animate-pulse">
      {/* Left Section */}
      <div className="flex gap-3 items-start lg:items-center w-full">
        {/* Icon Skeleton */}
        <div className="w-[44px] h-[44px] rounded-lg bg-gray-200 shrink-0" />

        {/* Content */}
        <div className="w-full">
          <div className="flex lg:block justify-between items-center">
            {/* Title */}
            <div className="h-4 lg:h-6 w-[120px] bg-gray-200 rounded-md mb-2" />

            {/* Mobile Check */}
            <div className="lg:hidden w-4 h-4 rounded-full bg-gray-200" />
          </div>

          {/* Description */}
          <div className="h-3 lg:h-4 w-[180px] bg-gray-200 rounded-md mb-2" />

          {/* Mobile Price */}
          <div className="lg:hidden h-4 w-[70px] bg-gray-200 rounded-md mt-2" />
        </div>
      </div>

      {/* Desktop Right Section */}
      <div className="hidden lg:flex items-center gap-3">
        {/* Price */}
        <div className="h-5 w-[80px] bg-gray-200 rounded-md" />

        {/* Check Circle */}
        <div className="w-5 h-5 rounded-full bg-gray-200" />
      </div>
    </div>
  );
};
