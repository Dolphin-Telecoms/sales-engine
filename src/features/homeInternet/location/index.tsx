"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, redirect } from "next/navigation";
import useDebounce from "@/src/hooks/useDebounce";
import { checkCoverage } from "@/src/features/homeInternet/apis/checkCoverage";

type Address = {
  description: string;
  place_id: string;
};

export const formatList = (items: string[]) => {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];

  return items.slice(0, -1).join(", ") + " and " + items[items.length - 1];
};

export default function AvailabilityChecker() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Address[]>([]);
  const [selected, setSelected] = useState<Address | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [noService, setNoService] = useState(false);
  const [serviceAvailable, setServiceAvailable] = useState<string[]>([]);

  const debouncedQuery = useDebounce(query, 300);

  const handleSelect = (item: Address) => {
    setQuery(item.description);
    setSelected(item);
    setShowDropdown(false);
    setIsChecking(false);
    setNoService(false);
  };

  const checkAddress = async () => {
    setIsLoading(true);
    const response = await checkCoverage(selected?.description || query);
    if (response.status && response?.data?.available) {
      setIsChecking(true);
      setServiceAvailable(response?.data?.available_service_types);
    } else {
      setIsChecking(false);
      setNoService(true);
    }
    setIsLoading(false);
  };

  const handleChange = (value: string) => {
    setQuery(value);
    setSelected(null);
    setShowDropdown(true);
  };

  const router = useRouter();
  const search = useSearchParams();

  useEffect(() => {
    if (!debouncedQuery) {
      setSuggestions([]);
      return;
    }

    if (!(window as any).google) return;

    const service = new (
      window as any
    ).google.maps.places.AutocompleteService();

    service.getPlacePredictions(
      {
        input: debouncedQuery,
        types: ["address"],
        componentRestrictions: { country: "zw" }, // 🇿🇼 restriction
      },
      (predictions: any, status: string) => {
        if (status === "OK" && predictions) {
          setSuggestions(predictions);
        } else {
          setSuggestions([]);
        }
      },
    );
  }, [debouncedQuery]);

  if (search.get("homeCategory")) {
    return (
      <div className="w-full">
        <div className="w-full lg:max-w-3xl bg-white rounded-xl p-4 xl:p-8 shadow-sm">
          {/* Title */}
          <h1 className="font-exo font-bold text-[24px] lg:text-[34px] leading-[120%] tracking-normal">
            Check Availability in Your Area
          </h1>
          <p className="mt-2 font-exo font-normal text-[12px] lg:text-[14px] leading-[100%] tracking-normal text-[#2C6176]">
            Enter your address to see which connection options are available.
          </p>

          {/* Input */}
          <div className="mt-6">
            <label className="text-sm font-medium text-gray-800">
              Street Address
            </label>

            <div className="relative mt-2">
              <input
                value={query}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="e.g. 14 Samora Machel Ave"
                className={`w-full rounded-lg border px-4 py-3 outline-none text-sm ${
                  showDropdown ? "border-[#2F5D67]" : "border-gray-300"
                }`}
              />

              {/* Dropdown */}
              {showDropdown && query && !selected && (
                <div className="absolute z-10 mt-2 w-full rounded-lg border bg-white shadow-sm max-h-40 overflow-y-auto">
                  {suggestions.length > 0 ? (
                    suggestions.map((item) => (
                      <div
                        key={item.place_id}
                        onClick={() => handleSelect(item)}
                        className="px-4 py-3 text-sm cursor-pointer hover:bg-gray-50"
                      >
                        {item.description}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-sm text-gray-500">
                      No results found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Success Message */}
          {isChecking && (
            <div className="mt-6 rounded-lg border border-[#86EFAC] bg-[#DCFCE7] p-4 flex gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#BBF7D0]">
                <span className="text-green-700 font-bold">✓</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-green-800">
                  Great news — we&lsquo;re available in your area.
                </p>
                <p className="text-sm text-green-700 mt-1">
                  {formatList(
                    serviceAvailable.length > 0
                      ? serviceAvailable
                      : ["Fibre", "LTE", "FWA"],
                  )}{" "}
                  are available at your address.
                </p>
              </div>
            </div>
          )}
          {noService && (
            <div className="mt-6 rounded-lg border border-[#FCA5A5] bg-[#FEF2F2] p-4 flex gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FECACA]">
                <span className="text-red-700 font-bold">✕</span>
              </div>

              <div>
                <p className="text-sm font-semibold text-red-800">
                  Sorry — we’re not available in your area.
                </p>

                <p className="text-sm text-red-700 mt-1">
                  services are currently not available at your address.
                </p>
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="my-6 border-t border-gray-200" />

          {/* Buttons */}
          <div className="flex flex-col lg:flex-row gap-4">
            <button
              onClick={() => {
                setQuery("");
                setSelected(null);
                setShowDropdown(false);
                router.back();
              }}
              className="px-6 py-2.5 rounded-lg border border-[#2F5D67] text-[#2F5D67] font-medium hover:bg-gray-50"
            >
              Back
            </button>

            <button
              className="flex items-center justify-center px-6 py-2.5 rounded-lg bg-[#2F5D67] text-white font-medium hover:bg-[#254c54]"
              disabled={!selected}
              onClick={() => {
                if (isChecking) {
                  if (selected) {
                    router.push(
                      `/home-internet/plan?homeCategory=${search.get("homeCategory")}&location=${selected.description}&services=${JSON.stringify(serviceAvailable)}`,
                    );
                  }
                } else {
                  checkAddress();
                }
              }}
            >
              {isChecking ? "Continue →" : `Check Availability`}&nbsp;&nbsp;
              {isLoading ? (
                <div className="flex items-center justify-center w-fit h-fit rounded-full">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#C7DFE6] border-t-[#2F5D6C]"></div>
                </div>
              ) : null}
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    redirect("/connect");
  }
}
