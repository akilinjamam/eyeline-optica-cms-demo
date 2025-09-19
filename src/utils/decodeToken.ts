/* eslint-disable @typescript-eslint/no-explicit-any */
// src/utils/jwt.ts
export interface DecodedToken {
  exp: number; // expiry timestamp
  iat: number; // issued at
  [key: string]: any; // any extra fields your server adds
}

/**
 * Verify JWT token (client-side).
 * - Decodes the token payload
 * - Checks expiry
 */
export function verifyToken(token: string): boolean {
  try {
    if (!token) return false;

    // remove "Bearer " prefix if included
    const pureToken = token.startsWith("Bearer ") ? token.split(" ")[1] : token;

    const base64Url = pureToken.split(".")[1];
    if (!base64Url) return false;

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(base64)) as DecodedToken;

    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp > currentTime; // token is valid if not expired
  } catch (err: any) {
    console.log(err);
    return false;
  }
}

/**
 * Decode JWT payload without verifying
 */
export function decodeToken(token: string): DecodedToken | null {
  try {
    const pureToken = token.startsWith("Bearer ") ? token.split(" ")[1] : token;

    const base64Url = pureToken.split(".")[1];
    if (!base64Url) return null;

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}
