import { SignJWT, importPKCS8 } from "jose";
import { v4 as uuidv4 } from "uuid";

export async function generateVoucherToken(userAgent: string = "server"): Promise<string> {
  const raw = process.env.PRIVATE_KEY_PEM;
  if (!raw) {
    throw new Error("PRIVATE_KEY_PEM not configured");
  }
  // CF dashboard may collapse newlines — restore proper PEM line breaks
  const privateKeyPem = raw.includes("\\n")
    ? raw.replace(/\\n/g, "\n")
    : raw;
  const privateKey = await importPKCS8(privateKeyPem, "RS256");

  return new SignJWT({
    sub: "storefront-service",
    client_id: userAgent,
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
}
