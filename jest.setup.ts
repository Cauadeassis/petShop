import dotenv from "dotenv"
const result = dotenv.config({ path: ".env.local" })
if (result.error) {
    console.error("Erro ao carregar .env.local:", result.error.message)
    throw result.error
}
if (!process.env.NEXT_PUBLIC_SUPABASE_URL)
    throw new Error("NEXT_PUBLIC_SUPABASE_URL not found on .env.local")

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY not found on .env.local")

