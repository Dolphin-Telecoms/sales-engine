import { SignJWT, importPKCS8 } from "jose";
import { v4 as uuidv4 } from "uuid";

export async function generateVoucherToken(userAgent: string = "server"): Promise<string> {
  const privateKeyPem = process.env.PRIVATE_KEY_PEM;
  if (!privateKeyPem) {
    throw new Error("PRIVATE_KEY_PEM not configured");
  }
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
