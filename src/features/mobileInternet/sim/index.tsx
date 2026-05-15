"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiMinus, FiPlus, FiInfo, FiUploadCloud, FiX } from "react-icons/fi";
import Button from "@/src/components/Button";
import { getSimCard } from "@/src/features/mobileInternet/apis/getSimCard";
import { ProductTemplate } from "@/src/types";

const MAX_SIZE = 5 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "application/pdf"];

export default function SimCard() {
  const router = useRouter();
  const search = useSearchParams();
  const [quantity, setQuantity] = useState(1);
  const [accountType, setAccountType] = useState<"existing" | "new">(
    "existing",
  );
  const [airtimeEnabled, setAirtimeEnabled] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number>(5);

  // FILE STATE
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const pricePerSim = 0.1;

  /* ---------- FILE HANDLING ---------- */

  const handleFile = (selected: File) => {
    setError("");

    if (!ACCEPTED_TYPES.includes(selected.type)) {
      setError("Only PNG, JPG or PDF allowed");
      return;
    }

    if (selected.size > MAX_SIZE) {
      setError("File must be less than 5MB");
      return;
    }

    setFile(selected);
  };

  // create preview URL safely
  useEffect(() => {
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const [selected, setSelected] = useState("");
  const [categoryOpen, setCategoryOpen] = useState({ name: "", id: "" });
  const [loading, setLoading] = useState(true);
  const [selectedAttribute, setSelectedAttribute] = useState<number[]>([]);
  const [simcard, setSimCard] = useState<ProductTemplate | null>(null);
  const [price, setPrice] = useState<number | null>(null);

  const params = new URLSearchParams(search);

  const handleSelect = (attrIndex: number, valueId: number) => {
    setSelectedAttribute((prev) => {
      const updated = [...prev];
      updated[attrIndex] = valueId; // 👈 store by index
      return updated;
    });
    const updated = [...selectedAttribute];
    updated[attrIndex] = valueId;
    params.set("attribute", JSON.stringify([...updated]));
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}?${params.toString()}`,
    );
  };

  console.log("simcard :", simcard);

  const getSimCards = async () => {
    try {
      setLoading(true);
      const res = await getSimCard(`${search.get("homeCategory")}`);
      if (res.status && Array.isArray(res?.data)) {
        setSimCard(res.data[0] as ProductTemplate);
      } else {
        setSimCard(null);
      }
    } catch (error) {
      console.error("Error fetching simcard:", error);
      setSimCard(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSimCards();
  }, []);

    const total = quantity * (simcard?.list_price ? simcard?.list_price : pricePerSim) + (airtimeEnabled ? selectedAmount : 0);

  return (
    <div>
      {/* STEP 1 */}
      <SectionTitle step="1" title="SELECT QUANTITY" />

      <h2 className="text-lg font-semibold mb-4">
        How many SIM cards do you need?
      </h2>

      <div className="flex border border-[#DCDCDC] rounded-lg w-fit overflow-hidden">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="p-3 bg-gray-100"
        >
          <FiMinus />
        </button>

        <span className="px-6 flex items-center">{quantity}</span>

        <button
          onClick={() => setQuantity((q) => q + 1)}
          className="p-3 bg-gray-100"
        >
          <FiPlus />
        </button>
      </div>

      <p className="text-sm text-gray-500 mt-2">
        Each SIM card – ${simcard?.list_price || pricePerSim} (once-off)
      </p>

      <Divider />

      {/* STEP 2 */}
      <SectionTitle step="2" title="LINK YOUR SIM" />

      <h2 className="text-lg font-semibold mb-4">
        Connect to your Dolphin account
      </h2>

      {/* EXISTING */}
      <OptionCard
        active={accountType === "existing"}
        onClick={() => setAccountType("existing")}
        title="Add to Existing Dolphin Account"
        subtitle="Link directly to your current account"
      >
        {accountType === "existing" && (
          <>
            <p className="font-bold text-[12px] lg:text-[14px] leading-[100%] tracking-[0%] mt-3">
              Account Number
            </p>
            <input
              placeholder="e.g. DTL-0001234"
              className="mt-2 w-full md:w-72 border border-[#DCDCDC]  bg-white rounded-lg p-4 text-sm"
            />
          </>
        )}
      </OptionCard>

      {/* NEW ACCOUNT */}
      <OptionCard
        active={accountType === "new"}
        onClick={() => setAccountType("new")}
        title="Create New Dolphin Account"
        subtitle="ID verification required after payment"
      >
        {accountType === "new" && (
          <>
            <div className="bg-white rounded-xl border border-[#DCDCDC] w-full max-w-2xl p-6 mt-4">
              {/* Header */}
              <h2 className="font-bold text-[14px] leading-[100%] tracking-normal">
                Identity Verification
              </h2>
              <p className="font-normal text-[14px] leading-[100%] tracking-normal mt-2">
                Required for new account activation. Your SIM will be active
                after approval.
              </p>

              {/* Form */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="font-bold text-[14px] leading-[100%] tracking-normal text-gray-800">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="As on ID document"
                    className="mt-1 w-full border border-[#DCDCDC] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* ID Number */}
                <div className="mb-3">
                  <label className="font-bold text-[14px] leading-[100%] tracking-normal text-gray-800">
                    National ID / Passport
                  </label>
                  <input
                    type="text"
                    placeholder="ID number"
                    className="mt-1 w-full border border-[#DCDCDC] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <UploadBox
                file={file}
                preview={preview}
                error={error}
                setFile={setFile}
                setError={setError}
                inputRef={inputRef}
                handleFile={handleFile}
              />
            </div>
          </>
        )}
      </OptionCard>
      {/* INFO */}
      <div className="flex items-center gap-2 mt-4 p-3 border border-yellow-400 bg-yellow-50 rounded-lg text-sm">
        <FiInfo
          className="text-[#F2A413] hidden sm:block"
          strokeWidth={2}
          size={20}
        />
        <FiInfo
          className="text-[#F2A413] block sm:hidden"
          strokeWidth={2}
          size={35}
        />
        <p>
          SIM activation is subject to regulatory verification in accordance
          with POTRAZ requirements.
        </p>
      </div>

      <Divider />

      {/* STEP 3 */}
      <SectionTitle step="3" title="ADD AIRTIME" optional />

      <div className="flex items-center justify-between border border-[#DCDCDC] rounded-lg p-4 bg-gray-100">
        <span className="font-bold text-[16px] leading-[120%] tracking-normal">
          Add Airtime Now
        </span>

        <button
          onClick={() => setAirtimeEnabled(!airtimeEnabled)}
          className={`w-12 h-6 flex items-center rounded-full p-1 ${
            airtimeEnabled ? "bg-teal-600" : "bg-gray-300"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full transition ${
              airtimeEnabled ? "translate-x-6" : ""
            }`}
          />
        </button>
      </div>

      {airtimeEnabled && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[1, 2, 5, 10].map((amt) => (
            <button
              key={amt}
              onClick={() => setSelectedAmount(amt)}
              className={`rounded-lg py-3 ${
                selectedAmount === amt
                  ? "border-2 border-[#F2A413] bg-[#FEF4E1]"
                  : "border border-[#DCDCDC]"
              }`}
            >
              ${amt}
            </button>
          ))}
        </div>
      )}

      {airtimeEnabled && (
        <div className="mt-3">
          <label className="font-bold text-[14px] leading-[100%] tracking-normal text-gray-800">
            Custom Amount
          </label>
          <div className="flex items-center border border-[#DCDCDC]  rounded-lg px-3 py-2 mt-1">
            <span className="mr-2">$</span>
            <input
              type="number"
              placeholder="0.00"
              className="w-full outline-none text-sm"
            />
          </div>
          <label className="font-normal text-[10px] lg:text-[12px] text-[#6B7280] leading-[100%] tracking-normal pt-2">
            Airtime will be loaded once your SIM is activated.
          </label>
        </div>
      )}

      <Divider />

      {/* SUMMARY */}
      <div className="border border-[#DCDCDC] rounded-lg p-4 flex justify-between">
        <div>
          <p className="text-xs font-normal leading-[100%]">Order Summary</p>
          <p className="font-bold text-[16px] leading-[120%] tracking-normal mt-1">
            {quantity}× SIM Card – ${quantity * (simcard?.list_price ? simcard?.list_price : pricePerSim)}
          </p>
        </div>
        <p className="text-xl font-semibold">${total.toFixed(2)}</p>
      </div>

      <Button
        variant="filld"
        className="mt-6"
        onClick={() => {
          // router.push(`/checkout`);
        }}
      >
        Proceed to Checkout →
      </Button>
    </div>
  );
}

/* ---------- Upload Component ---------- */

function UploadBox({
  file,
  preview,
  error,
  setFile,
  setError,
  inputRef,
  handleFile,
}: any) {
  return (
    <>
      <label className="font-bold text-[14px] leading-[100%] tracking-normal text-gray-800">
        Upload ID Document
      </label>
      <div
        onClick={() => inputRef.current?.click()}
        onDrop={(e) => {
          e.preventDefault();
          if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
        }}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-[#DCDCDC] rounded-xl p-6 mt-1 text-center cursor-pointer bg-gray-50"
      >
        {!file ? (
          <>
            <FiUploadCloud className="mx-auto text-xl text-gray-400" />
            <p className="text-sm text-gray-500">
              Click to upload or drag & drop
            </p>
            <p className="text-xs text-gray-400">PNG, JPG or PDF - max 5MB</p>
          </>
        ) : (
          <p className="text-green-600 text-sm">{file.name}</p>
        )}
      </div>

      {/* Hidden Input */}
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept=".png,.jpg,.jpeg,.pdf"
        onChange={(e) => {
          if (e.target.files?.[0]) handleFile(e.target.files[0]);
        }}
      />

      {/* Error */}
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

      {/* Preview */}
      {file && (
        <div className="mt-4 relative">
          <button
            onClick={() => {
              setFile(null);
              setError("");
            }}
            className="absolute top-2 right-2 bg-white p-1 rounded-full shadow"
          >
            <FiX />
          </button>

          {file.type.startsWith("image") ? (
            <img
              src={preview}
              alt="preview"
              className="w-full max-h-64 object-cover rounded-lg"
            />
          ) : (
            <iframe
              src={preview}
              className="w-full h-[80vh] rounded-lg border"
            />
          )}
        </div>
      )}
    </>
  );
}

/* ---------- UI ---------- */

function SectionTitle({ step, title, optional }: any) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <div className="w-6 h-6 bg-teal-700 text-white rounded-full flex items-center justify-center text-xs">
        {step}
      </div>
      <p className="text-xs uppercase tracking-widest text-gray-500">
        {title} {optional && "(Optional)"}
      </p>
    </div>
  );
}

function Divider() {
  return <div className="my-6 border-t border-[#DCDCDC]" />;
}

function OptionCard({ active, onClick, title, subtitle, children }: any) {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl p-4 mb-3 cursor-pointer ${
        active
          ? "border-2 border-[#2C6176] bg-[#E9F4F6]"
          : "border border-[#DCDCDC]"
      }`}
    >
      <div className="flex gap-3">
        <div className="w-5 h-5 border rounded-full flex items-center justify-center">
          {active && <div className="w-2.5 h-2.5 bg-teal-700 rounded-full" />}
        </div>

        <div>
          <p className="font-bold text-[14px] lg:text-[16px] leading-[120%]">
            {title}
          </p>
          <p className="font-normal text-xs text-[12px] lg:text-[14px] leading-none text-[#6B7280]">
            {subtitle}
          </p>
        </div>
      </div>
      <div className="lg:ml-8">{children}</div>
    </div>
  );
}
