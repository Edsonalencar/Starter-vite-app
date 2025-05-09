import { z } from "zod";

const envSchema = z.object({
  VITE_BACKEND: z.string().url().default("http://localhost:8080"),
  VITE_FRONTEND: z.string().url().default("http://localhost:3000"),
  VITE_SECRET_KEY: z.string().default("brocolis"),
  VITE_NEXT_AUTH_TOKEN_NAME: z.string().default("nextauth.token"),
  VITE_NEXT_AUTH_REDIRECT_NAME: z.string().default("nextauth.redirect"),
});

const parsedEnv = envSchema.parse(import.meta.env);

export const config = {
  BACKEND_URL: parsedEnv.VITE_BACKEND,
  FRONT_URL: parsedEnv.VITE_FRONTEND,
  SECRET_KEY: parsedEnv.VITE_SECRET_KEY,
  NEXT_AUTH_TOKEN_NAME: parsedEnv.VITE_NEXT_AUTH_TOKEN_NAME,
  NEXT_AUTH_REDIRECT_NAME: parsedEnv.VITE_NEXT_AUTH_REDIRECT_NAME,
} as const;
