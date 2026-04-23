"use client";

import Service from "@/src/components/Services";
import { CiWifiOn, CiMobile2 } from "react-icons/ci";
import { BsBoxSeam } from "react-icons/bs";
import { useSearchParams, useRouter } from "next/navigation";

function BusinessInternet() {
  const router = useRouter();
  const searchParam = useSearchParams();


  const steps = [
    { label: "Service" },
    { label: "Location" },
    { label: "Plan" },
    { label: "Extras" },
    { label: "Equipment" },
    { label: "Review" },
  ];

  // data/services.ts
  const services = [
    {
      id: "Internet",
      title: "Business Internet",
      description: "Enterprise-grade connectivity for your business.",
      icon: <CiWifiOn />,
      link: "/business-internet/location?businesstype=internet",
    },
    {
      id: "Mobile",
      title: "Business Mobile",
      description: "Mobile plans for your team on the go.",
      icon: <CiMobile2 />,
      link: "/business-internet/location?businesstype=mobile",
    },
    {
      id: "Bundle",
      title: "Business Bundle",
      description: "Internet + Mobile together. Save more.",
      icon: <BsBoxSeam />,
      link: "/business-internet/location?businesstype=bundle",
    },
  ];

  return (
    <div className="w-full lg:max-w-3xl bg-white rounded-xl shadow-sm">
      <Service
        title="Let's Get Your Business Connected"
        subtitle="Reliable internet solutions tailored to your business needs."
        services={services}
      />
    </div>
  );
}

export default BusinessInternet;
