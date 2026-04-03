import Container from "@/src/components/Container";
import Stepper from "@/src/components/Stepper";
import PlanSummary from "@/src/components/SummaryPlan";
import Service from "@/src/components/Services";
import { LuBuilding2 } from "react-icons/lu";
import { FiSmartphone, FiHome } from "react-icons/fi";

function Connect() {
  const steps = [
    { label: "Service" },
    { label: "Location" },
    { label: "Plan" },
    { label: "Extras" },
    { label: "Equipment" },
    { label: "Review" },
  ];

  // const items = [
  //   {
  //     id: "service",
  //     title: "Home Internet",
  //     subtitle: "Selected service",
  //     icon: "🏠",
  //   },
  //   {
  //     id: "address",
  //     title: "14 Samora Machel Ave",
  //     subtitle: "Service address",
  //     icon: "📍",
  //   },
  //   {
  //     id: "connection",
  //     title: "Fibre",
  //     subtitle: "Connection type",
  //     icon: "📡",
  //   },
  //   {
  //     id: "plan",
  //     title: "Lite Plan",
  //     subtitle: "50GB / 20Mbps",
  //     value: "$29/mo",
  //     icon: "📦",
  //   },
  // ];

  // const pricing = [
  //   { label: "Lite Plan", value: 29, type: "price" },
  //   { label: "Installation", value: 0, type: "free" },
  //   { label: "Est. installation", value: 0, type: "text" }, // custom display
  // ];

  // data/services.ts
  const services = [
    {
      id: "home",
      title: "Home Internet",
      description:
        "Reliable connectivity for your household. Fibre, LTE and wireless options available.",
      icon: <FiHome />,
      link: "/home-internet",
    },
    {
      id: "business",
      title: "Business",
      description:
        "Scalable internet solutions built for growing businesses and teams.",
      icon: <LuBuilding2 />,
      link: "/business-internet",
    },
    {
      id: "mobile",
      title: "Mobile",
      description:
        "Stay connected with flexible mobile plans and global eSIM across Zimbabwe, South Africa and beyond.",
      icon: <FiSmartphone />,
      link: "#",
    },
  ];

  return (
    <>
      <div className="text-center pt-[70px] lg:pt-[93px] min-h-0" />
      <Stepper steps={steps} currentStep={0} />
      <div className="bg-gray-100 pt-6 min-h-[100vh]">
        <Container>
          <div className="grid grid-cols-1 gap-y-6 gap-x-6 lg:grid-cols-12 justify-between">
            <div className="lg:col-span-8">
              <Service
                title="Let’s Get You Connected"
                subtitle="Select the service you'd like to set up."
                services={services}
              />
            </div>
            <div className="lg:col-span-4">
              <PlanSummary items={[]} pricing={[]} />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Connect;
