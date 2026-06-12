import "./globals.css";
import type { Metadata } from "next";
import Footer from "@/src/components/Footer";
import Script from "next/script";
import { Exo } from "next/font/google";

const exo = Exo({
  subsets: ["latin"],
  weight: ["400", "700"],
});
export const metadata: Metadata = {
  title: "Dolphin Telecoms | Connectivity for Every Part of Your Life",
  description:
    "Reliable internet and mobile services for home, business, and life on the move. Fibre, LTE, FWA, and mobile plans across Zimbabwe and South Africa.",
  keywords: [
    "dolphin telecoms",
    "fibre internet zimbabwe",
    "LTE internet zimbabwe",
    "home internet zimbabwe",
    "business internet zimbabwe",
    "mobile plans zimbabwe",
    "broadband zimbabwe",
  ],
  authors: [{ name: "Dolphin Telecoms" }],
  openGraph: {
    title: "Dolphin Telecoms | Connectivity for Every Part of Your Life",
    description:
      "Reliable internet and mobile services for home, business, and life on the move. Fibre, LTE, FWA, and mobile plans across Zimbabwe and South Africa.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Exo:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${exo.className}`}>
        {children}
        <Footer />
        <Script
          async
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&loading=async&libraries=places`}
        ></Script>
        {/* LiveChat Widget */}
        <Script id="livechat-init" strategy="afterInteractive">
          {`
            window.__lc = window.__lc || {};
            window.__lc.license = ${process.env.LIVE_CHAT_ID};
            window.__lc.integration_name = "manual_channels";
            window.__lc.product_name = "livechat";
            ;(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[LiveChatWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.livechatinc.com/tracking.js",t.head.appendChild(n)}};!n.__lc.asyncInit&&e.init(),n.LiveChatWidget=n.LiveChatWidget||e}(window,document,[].slice));
          `}
        </Script>
        <noscript>
          <a
            href={`https://www.livechat.com/chat-with/${process.env.LIVE_CHAT_ID}/`}
            rel="nofollow"
          >
            Chat with us
          </a>
          , powered by{" "}
          <a
            href="https://www.livechat.com/?welcome"
            rel="noopener nofollow"
            target="_blank"
          >
            LiveChat
          </a>
        </noscript>
      </body>
    </html>
  );
}
