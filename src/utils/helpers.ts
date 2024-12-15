import { decodeJwt } from 'jose';

export function isTokenValid(token: string | undefined): boolean {
  if (!token) return false;
  const { exp } = decodeJwt(token);
  const currentTime = Math.floor(Date.now() / 1000);
  return exp !== undefined && exp > currentTime;
}
