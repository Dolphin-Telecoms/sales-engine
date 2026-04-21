"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { redirect, useSearchParams, useRouter } from "next/navigation";
import { getProductCategories } from "@/src/features/homeInternet/apis/productCategories";
import { HomeInternetProductCategory } from "@/src/features/homeInternet/types/type";
import cn from "classnames";

function PlanCardSkeleton() {
  return (
    <div className="relative border border-[#e5e7eb] bg-white rounded-xl p-5 animate-pulse mb-5">
      {/* Header */}
      <div className="flex justify-between items-center gap-x-4">
        <div className="h-8 w-full bg-gray-200 rounded"></div>
        <div className="w-20 h-8 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}

export default function Plan() {
  const [selected, setSelected] = useState("");
  const [categoryOpen, setCategoryOpen] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedAttribute, setSelectedAttribute] = useState<number[]>([]);
  const [categories, setCategories] = useState<HomeInternetProductCategory[]>(
    [],
  );
  const [price, setPrice] = useState<number | null>(null);

  const search = useSearchParams();
  const router = useRouter();

  const handleSelect = (attrIndex: number, valueId: number) => {
    setSelectedAttribute((prev) => {
      const updated = [...prev];
      updated[attrIndex] = valueId; // 👈 store by index
      return updated;
    });
  };

  const getCategories = async () => {
    try {
      setLoading(true);
      const res = await getProductCategories(search.get("homeCategory") || "");
      if (res.status) {
        setCategories(res.data as HomeInternetProductCategory[]);
        if (
          search.get("childCategory") &&
          search.get("product") &&
          search.get("price") &&
          search.get("attribute")
        ) {
          router.push(
            `/home-internet/plan?homeCategory=${search.get("homeCategory")}&location=${search.get("location")}&childCategory=${search.get("childCategory")}&product=${search.get("product")}&price=${search.get("price")}&attribute=${search.get("attribute")}`,
          );
          setSelectedAttribute(JSON.parse(search.get("attribute") ?? "[]"));
          setCategoryOpen(search.get("childCategory") ?? "");
          setSelected(search.get("product") ?? "");
          setPrice(parseInt(search.get("price") ?? "") ?? 0);
        }
      } else {
        setCategories([]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (search.get("homeCategory")) {
      getCategories();
    } else {
      router.push("/connect");
    }
  }, []);

  if (!search.get("homeCategory")) {
    redirect("/connect");
  } else if (!search.get("location")) {
    redirect(`/home-internet?homeCategory=${search.get("homeCategory")}`);
  } else {
    return (
      <div className="w-full">
        <div className="w-full lg:max-w-3xl bg-white rounded-xl p-4 xl:p-8 shadow-sm">
          {/* Header */}
          <div className="text-sm text-[#6b7280] mb-2">
            <div className="flex gap-1 items-center">
              <CiLocationOn color="#F2A413" size={15} strokeWidth={1} />
              <span className="font-medium text-[#F2A413]">
                {`${search.get("location")}`}
              </span>
              <button className="ml-2 text-[#2563eb] underline">
                <Link
                  href={`/home-internet?homeCategory=${search.get("homeCategory")}`}
                >
                  Change
                </Link>
              </button>
            </div>
          </div>

          <h1 className="font-exo font-bold text-[24px] lg:text-[34px] leading-[120%] tracking-normal mt-4">
            Choose Your Plan
          </h1>
          <p className="mt-2 font-exo font-normal text-[12px] lg:text-[14px] leading-[100%] tracking-[0%] text-[#2C6176] mb-6">
            Available services in your area. Expand a connection type to see
            packages.
          </p>

          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <PlanCardSkeleton key={i} />
              ))
            : categories.map((category) => (
                <div
                  className={cn("border border-[#d1d5db] rounded-xl mb-4", {
                    "opacity-50": category.products.length === 0,
                  })}
                  key={category.id}
                >
                  <div className="flex justify-between items-center p-4">
                    <div>
                      <h2 className="font-semibold text-[#111827]">
                        {category.name}
                      </h2>
                      {category.products.length > 0 ? (
                        <p className="text-sm text-[#6b7280]">
                          High-speed, stable wired connection
                        </p>
                      ) : (
                        <p className="text-sm text-[#6b7280]">
                          Not available at your address
                        </p>
                      )}
                    </div>
                    {category.products.length > 0 ? (
                      <button
                        onClick={() => {
                          setSelectedAttribute([]); // reset attribute selection when switching categories
                          setSelected(""); // reset plan selection when switching categories
                          if (categoryOpen === category.id.toString()) {
                            setCategoryOpen("");
                          } else {
                            setCategoryOpen(category.id.toString());
                          }
                        }}
                        className="px-4 py-2 border rounded-lg text-sm"
                      >
                        {category.id.toString() === categoryOpen
                          ? "Collapse"
                          : "Expand"}
                      </button>
                    ) : (
                      <span className="text-sm">Unavailable</span>
                    )}
                  </div>

                  {category.id.toString() === categoryOpen && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                      {category.products.map((plan) => {
                        const isSelected = selected === plan.id.toString();

                        return (
                          <div
                            key={plan.id}
                            className={`relative border rounded-xl p-5 cursor-pointer transition 
                        ${
                          isSelected
                            ? "border-[#f59e0b] bg-[#fff7ed]"
                            : "border-[#e5e7eb] bg-white"
                        }`}
                          >
                            {/* {plan.popular && (
                              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#f59e0b] text-white text-xs px-3 py-1 rounded-full">
                                MOST POPULAR
                              </span>
                            )} */}

                            <div className="flex justify-between items-center mb-3">
                              <h3 className="text-lg font-semibold">
                                {plan.name}
                              </h3>

                              <div
                                className={`w-5 h-5 rounded-full border flex items-center justify-center 
                            ${
                              isSelected
                                ? "bg-[#f59e0b] border-[#f59e0b]"
                                : "border-[#d1d5db]"
                            }`}
                                onClick={() => {
                                  setSelected(plan.id.toString());
                                  setPrice(plan.list_price);
                                  setSelectedAttribute([]); // reset attribute selection when switching categories
                                  // router.push(
                                  //   `/home-internet/plan?location=${search.get("location")}&label=${plan.name}&value=${plan.price}&type=price`,
                                  // );
                                }}
                              >
                                {isSelected && (
                                  <FaCheck className="w-3 h-3 text-white" />
                                )}
                              </div>
                            </div>

                            <p className="text-[#111827] font-medium mb-3">
                              {selected === plan.id.toString()
                                ? price
                                  ? `$${price}/ mo`
                                  : "Select to see pricing"
                                : "Select to see pricing"}
                            </p>

                            <hr className="mb-3" />

                            <ul className="space-y-2 text-sm text-[#374151]">
                              {plan.attributes.map((attr, attrIndex) => (
                                <li
                                  key={attrIndex}
                                  className="flex flex-col gap-2"
                                >
                                  {attr.display_name}
                                  <ul className="space-y-2 text-sm text-[#374151]">
                                    {attr.values.map((value, i) => {
                                      const isSelected =
                                        selectedAttribute[
                                          attrIndex
                                        ]?.toString() === value.id.toString();
                                      return (
                                        <li
                                          key={i}
                                          className="flex items-center gap-2 ml-4 cursor-pointer"
                                          onClick={() => {
                                            if (selected) {
                                              setPrice((prev) =>
                                                prev
                                                  ? prev +
                                                    value.default_extra_price
                                                  : plan.list_price +
                                                    value.default_extra_price,
                                              );
                                              handleSelect(attrIndex, value.id);
                                            }
                                          }}
                                        >
                                          <span
                                            className={cn(
                                              "w-4 h-4 rounded-full flex items-center justify-center text-white text-[10px]",
                                              {
                                                "bg-[#f59e0b]": isSelected,
                                                "bg-gray-300": !isSelected,
                                              },
                                            )}
                                          >
                                            {isSelected ? "✓" : ""}
                                          </span>
                                          {value.name}
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
          {/* Footer */}
          <div className="flex flex-col lg:flex-row gap-y-4 justify-between mt-6">
            <button
              className="px-6 py-3 border border-[#1f2937] rounded-lg"
              onClick={() => {
                router.back();
              }}
            >
              Back
            </button>
            <button
              className="px-6 py-3 bg-[#1f4d5a] text-white rounded-lg"
              disabled={loading}
              onClick={() => {
                if (search.get("location")) {
                  if (
                    price &&
                    selected &&
                    search.get("homeCategory") &&
                    search.get("location") &&
                    selectedAttribute.length &&
                    categoryOpen
                  ) {
                    router.push(
                      `/home-internet/extras?homeCategory=${search.get("homeCategory")}&location=${search.get("location")}&childCategory=${categoryOpen}&product=${selected}&price=${price}&attribute=${JSON.stringify(selectedAttribute)}`,
                    );
                  }
                }
              }}
            >
              Continue →
            </button>
          </div>
        </div>
      </div>
    );
  }
}
