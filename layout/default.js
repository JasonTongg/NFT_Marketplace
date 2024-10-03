import React from "react";
import Footer from "../components/footer";

export default function Default({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#181C14] w-full min-h-screen text-[#ECDFCC]">
        {children}
        <Footer />
      </body>
    </html>
  );
}
