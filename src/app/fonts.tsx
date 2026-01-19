import { Inter } from "next/font/google"
import { Inter_Tight } from "next/font/google"

export const inter = Inter({
    subsets: ["latin"],
    weight: ["500", "700"],
    variable: "--inter",
    display: "swap",
})

export const interTight = Inter_Tight({
    subsets: ["latin"],
    weight: ["700"],
    variable: "--inter-tight",
    display: "swap",
})