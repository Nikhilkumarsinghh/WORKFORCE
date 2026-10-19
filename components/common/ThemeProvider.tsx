// // "use client";

// // import { createContext, useContext, useEffect, useState, ReactNode } from "react";

// // type Theme = "dark" | "light";
// // const ThemeCtx = createContext<{ theme: Theme; toggle: () => void }>({ theme: "dark", toggle: () => {} });

// // export function ThemeProvider({ children }: { children: ReactNode }) {
// //   const [theme, setTheme] = useState<Theme>("dark");

// //   useEffect(() => {
// //     const saved = localStorage.getItem("ut-theme") as Theme | null;
// //     const t = saved || "dark";
// //     setTheme(t);
// //     document.documentElement.setAttribute("data-theme", t);
// //   }, []);

// //   const toggle = () => {
// //     const next: Theme = theme === "dark" ? "light" : "dark";
// //     setTheme(next);
// //     document.documentElement.setAttribute("data-theme", next);
// //     localStorage.setItem("ut-theme", next);
// //   };

// //   return <ThemeCtx.Provider value={{ theme, toggle }}>{children}</ThemeCtx.Provider>;
// // }

// // export const useTheme = () => useContext(ThemeCtx);
// "use client";

// import { useEffect, useState } from "react";

// export default function ThemeToggle() {
//   const [dark, setDark] = useState(false);

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme");

//     if (savedTheme === "dark") {
//       setDark(true);
//       document.documentElement.classList.add("dark");
//     }
//   }, []);

//   useEffect(() => {
//     if (dark) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   }, [dark]);

//   return (
//     <button
//       onClick={() => setDark(!dark)}
//       className="px-4 py-2 rounded-full border text-sm transition-all duration-300"
//       style={{
//         background: "var(--card)",
//         borderColor: "var(--border)",
//         color: "var(--text)",
//       }}
//     >
//       {dark ? "☀ Light" : "🌙 Dark"}
//     </button>
//   );
// }
"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const saved =
      (localStorage.getItem("ut-theme") as Theme) || "dark";

    setTheme(saved);

    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";

    setTheme(next);

    localStorage.setItem("ut-theme", next);

    document.documentElement.setAttribute("data-theme", next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);

  if (!ctx) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return ctx;
}