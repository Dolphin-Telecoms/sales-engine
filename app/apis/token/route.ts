// app/api/token/route.ts

import { NextResponse } from "next/server";
import { SignJWT, importPKCS8 } from "jose";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function GET(req: Request) {
  try {
    // ✅ Extract User-Agent from request headers
    const userAgent = req.headers.get("user-agent") || "unknown-client";

    // ✅ Read private key (server-side only)
    const privateKeyPath = path.join(
      process.cwd(),
      "keys",
      "private_pkcs8.pem",
    );
    const privateKeyPem = fs.readFileSync(privateKeyPath, "utf8");
    const privateKey = await importPKCS8(privateKeyPem, "RS256");

    const token = await new SignJWT({
      sub: "storefront-service",
      client_id: userAgent, // 👈 using user-agent here
      scopes: [
        "vouchers:reserve",
        "vouchers:validate",
        "vouchers:redeem",
        "vouchers:status",
      ],
      jti: uuidv4(),
    })
      .setProtectedHeader({ alg: "RS256" })
      .setIssuedAt()
      .setExpirationTime("15m")
      .sign(privateKey);

    const response = NextResponse.json({ token });

    // ✅ THIS is how you set cookie in Next.js server
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true, // must be true on Vercel
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60, // optional (1 hour)
    });

    return response;
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Token generation failed" }, { status: 500 });
  }
}
