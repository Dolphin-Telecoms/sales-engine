// components/Header.tsx
import Image from "next/image";
import Link from "next/link";
import Container from "@/src/components/Container"; 
import { IoLockClosedOutline, IoShieldOutline  } from "react-icons/io5";
import { LuPhone } from "react-icons/lu";

export default function AppBar() {
  return (
    <header className="w-full bg-[#FFFFFF] fixed z-1000">
      <Container className="py-5 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <Link href="/connect">
            <Image
              src="/app-logo.png" // replace with your logo
              alt="DTEL Logo"
              width={180}
              height={130}
            />
          </Link> 
        </div>

        {/* Right: Features */}
        <div className="flex items-center gap-8 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <IoLockClosedOutline className="text-orange-500 text-sm" />
            <span>Secure Checkout</span>
          </div>

          <div className="flex items-center gap-2">
            <IoShieldOutline  className="text-orange-500 text-sm" />
            <span>No Hidden Fees</span>
          </div>

          <div className="flex items-center gap-2">
            <LuPhone className="text-orange-500 text-sm" />
            <span>Live Support</span>
          </div>
        </div>
      </Container>
    </header>
  );
}
