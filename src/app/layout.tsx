import { inter, interTight } from "./fonts"

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Petshop",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-BR" className={`${inter.variable} ${interTight.variable}`}>
            <body>{children}</body>
        </html>
    );
}