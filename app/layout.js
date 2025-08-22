import { AntdRegistry } from "@ant-design/nextjs-registry";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

import MainLayout from "@/components/MainLayout";
import AuthProvider from "@/providers/AuthProvider";
import StoreProvider from "@/providers/StoreProvider";
import SwrProvider from "@/providers/SwrProvider";
import { Plus_Jakarta_Sans } from "next/font/google";

const plus_jakarta_sans = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata = {
  title: "EazyBuy",
  description: "Buy easy and fast",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <SwrProvider>
          <StoreProvider>
            <AntdRegistry>
              <body className={plus_jakarta_sans.className}>
                <MainLayout>
                  <NextTopLoader showSpinner={false} color="rgb(37 99 235)" />
                  {children}
                </MainLayout>
              </body>
            </AntdRegistry>
          </StoreProvider>
        </SwrProvider>
      </AuthProvider>
    </html>
  );
}
