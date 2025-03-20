import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
// import { Providers } from "@/contexts";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Family Task Manager",
  description: "Manage your family's tasks and track progress",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* <Providers> */}
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        {/* </Providers> */}
      </body>
    </html>
  );
}

import "./globals.css";

// Add this to your app/layout.tsx to wrap the application

//
// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body>
//         <Providers>
//           {children}
//         </Providers>
//       </body>
//     </html>
//   );
// }
