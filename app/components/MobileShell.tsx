import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  backgroundColor?: string;
}

export default function MobileShell({
  children,
  backgroundColor = "#F8F7F4",
}: Props) {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <main
        style={{
          width: "100%",
          maxWidth: 430,
          backgroundColor,
          minHeight: "100vh",
        }}
      >
        {children}
      </main>
    </div>
  );
}
