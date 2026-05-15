"use client";

import { useState, useEffect } from "react";
import { FiSmartphone, FiWifi, FiCheck } from "react-icons/fi";
import cn from "classnames";
import Button from "@/src/components/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { getAirtime } from "@/src/features/mobileInternet/apis/getAirTime";
import { ProductCategory } from "@/src/types";

const NetworkCardSkeleton = () => {
  return (
    <div className="relative border border-gray-200 rounded-xl p-4 animate-pulse">
      {/* Icon */}
      <div className="w-12 h-12 flex items-center justify-center rounded-lg mb-3 bg-gray-200" />

      {/* Title */}
      <div className="h-4 w-32 bg-gray-200 rounded-md mb-2" />

      {/* Description */}
      <div className="h-3 w-40 bg-gray-200 rounded-md" />

      {/* Check Icon */}
      <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-gray-200" />
    </div>
  );
};

export default function Airtime() {
  const router = useRouter();
  const search = useSearchParams();
  const [network, setNetwork] = useState({
    variant_id: 0,
    variant_name: "",
    variant_price: 0,
  });
  const [amount, setAmount] = useState(5);
  const [airtimeProducts, setAirtimeProducts] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(false);

  const getAitimeProducts = async () => {
    setLoading(true);
    try {
      const { status, data } = await getAirtime(
        `${search.get("homeCategory")}`,
      );
      if (status && data) {
        setAirtimeProducts(data);
      } else {
        setAirtimeProducts([]);
      }
    } catch (error) {
      console.error("Error fetching airtime products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAitimeProducts();
  }, []);

  return (
    <div className="w-full">
      {/* STEP 1 */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs tracking-widest text-gray-500 mb-2">
          <span className="w-6 h-6 flex items-center justify-center bg-[#2F5D62] text-white rounded-full text-xs">
            1
          </span>
          CHOOSE NETWORK
        </div>

        <h2 className="text-base font-bold mb-4">Select your mobile network</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {loading
            ? Array.from({ length: 2 }).map((_, index) => (
                <NetworkCardSkeleton key={index} />
              ))
            : airtimeProducts.map((item) =>
                item.products.map((product, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      setNetwork({
                        variant_id: product.product_variant_id[0],
                        variant_name: product.product_variant_id[1],
                        variant_price: product.list_price,
                      })
                    }
                    className={`relative border rounded-xl p-4 cursor-pointer transition ${
                      network.variant_id === product.product_variant_id[0]
                        ? "border-[#F59E0B] bg-[#FFF7ED]"
                        : "border-gray-200"
                    }`}
                  >
                    <div
                      className={cn(
                        "w-12 h-12 flex items-center justify-center rounded-lg mb-3",
                        {
                          "bg-[#FDE68A]":
                            network.variant_id ===
                            product.product_variant_id[0],
                          "bg-[#C9DFE4]":
                            network.variant_id !==
                            product.product_variant_id[0],
                        },
                      )}
                    >
                      {product.display_name.toLocaleLowerCase() ===
                      "dolphin airtime" ? (
                        <FiSmartphone
                          className={cn({
                            "text-[#F59E0B]":
                              network.variant_id ===
                              product.product_variant_id[0],
                            "text-[#2C6176]":
                              network.variant_id !==
                              product.product_variant_id[0],
                          })}
                        />
                      ) : (
                        <FiWifi
                          className={cn({
                            "text-[#F59E0B]":
                              network.variant_id ===
                              product.product_variant_id[0],
                            "text-[#2C6176]":
                              network.variant_id !==
                              product.product_variant_id[0],
                          })}
                        />
                      )}
                    </div>

                    <p className="font-semibold text-sm">
                      {product.display_name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {product.description || ""}
                    </p>

                    {network.variant_id === product.product_variant_id[0] && (
                      <div className="absolute top-3 right-3 bg-[#F59E0B] text-white p-1 rounded-full">
                        <FiCheck size={12} />
                      </div>
                    )}
                  </div>
                )),
              )} 
        </div>
      </div>

      {/* DIVIDER */}
      <div className="border-t border-[#DCDCDC] my-6" />

      {/* STEP 2 */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs tracking-widest text-gray-500 mb-2">
          <span className="w-6 h-6 flex items-center justify-center bg-[#2F5D62] text-white rounded-full text-xs">
            2
          </span>
          ENTER MOBILE NUMBER
        </div>

        <h2 className="text-base font-bold mb-3">
          Which number should receive airtime?
        </h2>

        <label className="text-xs font-semibold">Mobile Number</label>

        <div className="flex items-center border border-[#DCDCDC] rounded-lg px-3 py-2 mt-1">
          <span className="text-sm font-medium mr-2">+263</span>
          <input
            type="text"
            placeholder="7X XXX XXXX"
            className="w-full outline-none text-sm"
          />
        </div>

        <p className="text-[10px] text-gray-500 mt-1">
          Enter number without country code. e.g. 77 123 4567
        </p>
      </div>

      {/* DIVIDER */}
      <div className="border-t  border-[#DCDCDC] my-6" />

      {/* STEP 3 */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs tracking-widest text-gray-500 mb-2">
          <span className="w-6 h-6 flex items-center justify-center bg-[#2F5D62] text-white rounded-full text-xs">
            3
          </span>
          SELECT AMOUNT
        </div>

        <h2 className="text-base font-bold mb-3">How much airtime?</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {[1, 2, 5, 10].map((val) => (
            <button
              key={val}
              onClick={() => setAmount(val)}
              className={`rounded-lg py-2 text-sm font-semibold transition ${
                amount === val
                  ? "border-2 border-[#F59E0B] bg-[#FFF7ED]"
                  : "border border-gray-200"
              }`}
            >
              ${val}
            </button>
          ))}
        </div>

        <label className="font-bold text-[14px] leading-[100%] tracking-normal text-gray-800">
          Custom Amount
        </label>
        <div className="flex items-center border  border-[#DCDCDC] rounded-lg px-3 py-2 mt-1">
          <span className="mr-2">$</span>
          <input
            type="number"
            placeholder="0.00"
            className="w-full outline-none text-sm"
          />
        </div>
      </div>

      {/* DIVIDER */}
      <div className="border-t border-[#DCDCDC] my-6" />

      {/* STEP 4 */}
      <div>
        <div className="flex items-center gap-2 text-xs tracking-widest text-gray-500 mb-2">
          <span className="w-6 h-6 flex items-center justify-center bg-[#2F5D62] text-white rounded-full text-xs">
            4
          </span>
          CHECKOUT
        </div>

        <div className="flex justify-between items-center border border-[#DCDCDC] rounded-lg p-3 mb-4 bg-gray-50">
          <div>
            <p className="text-[10px] text-gray-500">Sending to</p>
            <p className="text-sm font-semibold">+263 ---</p>
          </div>
          <p className="text-[#2F5D62] font-bold">${amount.toFixed(2)}</p>
        </div>
        <Button
          variant="filld"
          className="mt-2"
          onClick={() => {
            router.push(`/checkout`);
          }}
        >
          Buy Airtime →
        </Button>
      </div>
    </div>
  );
}
