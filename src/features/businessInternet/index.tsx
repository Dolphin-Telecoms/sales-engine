"use client";

import Service from "@/src/components/Services";
import { CiWifiOn, CiMobile2 } from "react-icons/ci";
import { BsBoxSeam } from "react-icons/bs";
import { useSearchParams, redirect } from "next/navigation";

function BusinessInternet() {
  const searchParam = useSearchParams();

  if (!searchParam.get("homeCategory")) {
    redirect("/");
  } else {
    // data/services.ts
    const services = [
      {
        id: `${searchParam.get("homeCategory")}`,
        title: "Business Internet",
        description: "Enterprise-grade connectivity for your business.",
        icon: <CiWifiOn />,
        link: `/business-internet/location`,
        disabled: false,
      },
      {
        id: "Mobile",
        title: "Business Mobile",
        description: "Mobile plans for your team on the go.",
        icon: <CiMobile2 />,
        link: "/business-internet/location?businesstype=mobile",
        disabled: true,
      },
      {
        id: "Bundle",
        title: "Business Bundle",
        description: "Internet + Mobile together. Save more.",
        icon: <BsBoxSeam />,
        link: "/business-internet/location?businesstype=bundle",
        disabled: true,
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
}

export default BusinessInternet;
