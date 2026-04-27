"use client";

import { redirect, useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { HomeInternetProductCategory } from "@/src/features/homeInternet/types/type";
import { getEquipment } from "@/src/features/homeInternet/apis/getEquipment";
import { FaTimes, FaCheckCircle } from "react-icons/fa";
import { RxPerson } from "react-icons/rx";
import { BsCurrencyDollar } from "react-icons/bs";
import { IoLockClosedOutline } from "react-icons/io5";
import Image from "next/image";
import { createCustomer } from "@/src/features/homeInternet/apis/createCustomer";

export default function EquipmentSetup() {
  const search = useSearchParams();

  if (!search.get("homeCategory")) {
    redirect("/connect");
  } else if (
    !search.get("location") ||
    !search.get("services") ||
    !search.get("coordinates") ||
    !search.get("city")
  ) {
    redirect(`/home-internet?homeCategory=${search.get("homeCategory")}`);
  } else if (
    !search.get("childCategory") ||
    !search.get("childCategoryName") ||
    !search.get("product") ||
    !search.get("price")
  ) {
    redirect(
      `/home-internet/plan?homeCategory=${search.get("homeCategory")}&location=${search.get("location")}&services=${search.get("services")}&coordinates=${search.get("coordinates")}&city=${search.get("city")}`,
    );
  } else {
    const router = useRouter();
    const searchParams = Object.fromEntries(search.entries());
    const params = new URLSearchParams(searchParams);
    const [loading, setLoading] = useState(true);
    const [equipment, setEquipment] =
      useState<HomeInternetProductCategory | null>(null);
    const [checkout, setCheckout] = useState<boolean>(false);
    const [submitLoader, setSubmitLoader] = useState<boolean>(false);

    const getProductEquipments = async () => {
      try {
        setLoading(true);
        const res = await getEquipment(
          search.get("homeCategory") || "",
          search.get("childCategoryName") ?? "",
        );
        if (res.status) {
          setEquipment(res.data as HomeInternetProductCategory);
        } else {
          setEquipment(null);
        }
      } catch (error) {
        console.error("Error fetching equipment:", error);
        setEquipment(null);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      if (search.get("homeCategory")) {
        getProductEquipments();
      } else {
        router.push("/connect");
      }
    }, []);

    const generateCustomer = async (
      email: string,
      name: string,
      phone: string,
    ) => {
      setSubmitLoader(true);
      const coordinates = JSON.parse(`${search.get("coordinates")}`);

      const body = {
        partner_latitude: coordinates?.lat,
        partner_longitude: coordinates?.lng,
        email: email,
        street: `${search.get("location")}`,
        city: `${search.get("city")}`,
        country_code: "ZW",
        name: name,
        phone: phone,
      };

      const response = await createCustomer(body);

      if (response.status && response.data) {
        params.set("equipmentName", `${equipment?.name}`);
        params.set("equipmentId", `${equipment?.id}`);
        params.set("customerId", `${response.data[0]}`);
        params.set("customerName", `${name}`);
        params.set("customerEmail", `${email}`);
        params.set("customerPhone", `${phone}`);
        router.push(`/home-internet/review?${params.toString()}`);
      }
      setSubmitLoader(false);
    };

    type FormData = {
      fullName: string;
      email: string;
      phone: string;
    };

    type FormErrors = {
      fullName?: string;
      email?: string;
      phone?: string;
    };

    const [form, setForm] = useState<FormData>({
      fullName: ``,
      email: ``,
      phone: ``,
    });

    useEffect(() => {
      if (
        search.get("customerName") &&
        search.get("customerEmail") &&
        search.get("customerPhone")
      ) {
        setForm({
          fullName: `${search.get("customerName")}`,
          email: `${search.get("customerEmail")}`,
          phone: `${search.get("customerPhone")}`,
        });
      }
    }, [search]);

    const [errors, setErrors] = useState<FormErrors>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));

      // clear error on typing
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    };

    const validate = (): FormErrors => {
      const newErrors: FormErrors = {};

      if (!form.fullName.trim()) {
        newErrors.fullName = "Full name is required";
      }

      if (!form.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
        newErrors.email = "Invalid email";
      }

      if (!form.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!/^\+?\d{7,15}$/.test(form.phone.replace(/\s/g, ""))) {
        newErrors.phone = "Invalid phone number";
      }

      return newErrors;
    };

    const handleSubmit = async () => {
      const validationErrors = validate();

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      await generateCustomer(form.email, form.fullName, form.phone); // your API call
    };
    return (
      <div className="w-full lg:max-w-3xl bg-white rounded-xl p-4 xl:p-8 shadow-sm">
        {checkout ? (
          <div className="w-full lg:max-w-3xl bg-white rounded-xl p-4 xl:p-8 shadow-sm">
            {/* Header */}
            <h1 className="font-exo font-bold text-[24px] lg:text-[34px] leading-[1.2] tracking-normal">
              Secure Customer Details
            </h1>
            <p className="mt-2 font-exo font-normal text-[12px] lg:text-[14px] leading-[1] tracking-normal text-[#2C6176]">
              Complete your details below to proceed to review the order.
            </p>

            {/* Customer Details */}
            <div className="mt-6 rounded-xl border border-[#D1D5DB] bg-[#F9FAFB]">
              <div className="flex items-center gap-3 border-b border-[#E5E7EB] p-4">
                <div className="p-2 rounded-lg bg-[#FFFFFF]">
                  <RxPerson
                    className="text-[#2F5D6C]"
                    size={20}
                    strokeWidth={0.4}
                  />
                </div>
                <h2 className="font-exo font-bold text-[20px] leading-[1.2] tracking-normal">
                  Customer Details
                </h2>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <label className="font-exo font-bold text-[14px] text-[#111827]">
                    Full Name
                  </label>
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="e.g. John Makumuri"
                    className="mt-1 w-full rounded-lg border px-4 py-3 text-[14px] outline-none focus:ring-2 focus:ring-[#2F5D6C]/30"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="font-exo font-bold text-[14px] text-[#111827]">
                    Email Address
                  </label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="e.g. john@email.com"
                    className="mt-1 w-full rounded-lg border px-4 py-3 text-[14px] outline-none focus:ring-2 focus:ring-[#2F5D6C]/30"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="font-exo font-bold text-[14px] text-[#111827]">
                    Phone Number
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="e.g. +263 77 123 4567"
                    className="mt-1 w-full rounded-lg border px-4 py-3 text-[14px] outline-none focus:ring-2 focus:ring-[#2F5D6C]/30"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs">{errors.phone}</p>
                  )}
                </div>
              </div>
              {/* Divider */}
              <div className="my-6 h-[1px] w-full bg-[#E5E7EB]" />

              {/* Buttons */}
              <div className="flex flex-col lg:flex-row gap-4 my-6 mx-3">
                <button
                  className="px-6 py-3 border-3 border-[#1f4d5a] rounded-lg"
                  onClick={() => {
                    setCheckout(false);
                  }}
                >
                  Back
                </button>
                <button
                  className="px-6 py-3 bg-[#1f4d5a] text-white rounded-lg flex items-center justify-center"
                  disabled={loading}
                  onClick={handleSubmit}
                >
                  Continue →&nbsp;&nbsp;
                  {submitLoader ? (
                    <div className="flex items-center justify-center w-fit h-fit rounded-full">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#C7DFE6] border-t-[#2F5D6C]"></div>
                    </div>
                  ) : null}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <h1 className="font-exo font-bold text-[24px] lg:text-[34px] leading-[1.2] tracking-normal mb-2">
              Equipment & Setup
            </h1>
            {loading ? (
              <div className="animate-pulse">
                <div className="h-3 lg:h-4 w-full bg-gray-300 rounded"></div>
                <div className="mt-2 h-3 lg:h-4 w-5/6 bg-gray-300 rounded"></div>
              </div>
            ) : (
              <p className="font-exo font-normal text-[12px] lg:text-[14px] leading-[1] tracking-normal text-[#2C6176]">
                Your {equipment?.name} is included with{" "}
                {search.get("childCategoryName")} installation – no router
                purchase required.
              </p>
            )}

            {/* Card */}
            {loading ? (
              <div className="mt-6 rounded-xl border border-[#D1D5DB] bg-[#F9FAFB] p-5 animate-pulse">
                <div className="flex items-start lg:items-center gap-4">
                  {/* Icon Skeleton */}
                  <div className="flex p-4 items-center justify-center rounded-lg bg-white">
                    <div className="w-8 h-8 bg-gray-300 rounded"></div>
                  </div>

                  {/* Content Skeleton */}
                  <div className="flex-1">
                    {/* Title */}
                    <div className="h-5 w-40 bg-gray-300 rounded"></div>

                    {/* Description lines */}
                    <div className="mt-3 space-y-2">
                      <div className="h-3 w-full bg-gray-300 rounded"></div>
                      <div className="h-3 w-5/6 bg-gray-300 rounded"></div>
                      <div className="h-3 w-4/6 bg-gray-300 rounded"></div>
                    </div>

                    {/* Bottom text */}
                    <div className="mt-3 h-3 w-36 bg-gray-300 rounded"></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-6 rounded-xl border border-[#D1D5DB] bg-[#F9FAFB] p-5">
                <div className="flex items-start lg:items-center gap-4">
                  {/* Icon */}
                  <div className="flex p-4 text-3xl items-center justify-center rounded-lg bg-[#FFFFFF]">
                    📦
                  </div>

                  {/* Content */}
                  <div>
                    <h2 className="font-exo font-bold text-[20px] leading-[1.2] tracking-normal">
                      {equipment?.name}
                    </h2>
                    <p className="font-exo font-normal text-[14px] leading-[1.2] tracking-normal mt-2 text-[#6B7280]">
                      Your {equipment?.name} is included with your&nbsp;
                      {search.get("childCategoryName")}&nbsp;installation at no
                      additional cost. Our technician will install and configure
                      it during your scheduled visit.
                    </p>
                    <p className="mt-2 font-exo font-bold text-[14px] leading-[1] tracking-normal text-[#16A34A]">
                      Included with installation
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Divider */}
            <div className="my-6 h-[1px] w-full bg-[#E5E7EB]" />

            {/* Buttons */}
            <div className="flex flex-col lg:flex-row gap-4 mt-6">
              <button
                className="px-6 py-3 border-3 border-[#1f4d5a] rounded-lg"
                onClick={() => {
                  router.push(`/home-internet/extras?${params.toString()}`);
                }}
              >
                Back
              </button>
              <button
                className="px-6 py-3 bg-[#1f4d5a] text-white rounded-lg"
                disabled={loading}
                onClick={() => {
                  setCheckout(true);
                }}
              >
                Continue →
              </button>
            </div>
          </>
        )}
      </div>
    );
  }
}
