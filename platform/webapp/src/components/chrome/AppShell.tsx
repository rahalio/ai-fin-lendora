import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { setAccessToken } from "@/services/shared/infrastructure";

const NAV = [
  { to: "/", label: "Lending home", end: true },
  { to: "/policies", label: "Policy packs" },
  { to: "/refer", label: "Refer queue" },
  { to: "/early-warnings", label: "Early warning" },
  { to: "/models", label: "Models" },
  { to: "/audits", label: "Decision audits" },
  { to: "/taxonomy", label: "Reason taxonomy" },
  { to: "/access", label: "Access / SoD" },
];

export function AppShell() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen grid grid-cols-[240px_1fr]">
      <aside className="border-r border-[var(--color-stone-200)] bg-[rgba(255,255,255,0.35)] px-4 py-6">
        <div className="mb-8">
          <div className="brand-mark text-2xl">Lendora</div>
          <p className="mt-1 text-xs text-[rgba(26,31,36,0.55)]">
            Credit committee at API speed
          </p>
        </div>
        <nav className="flex flex-col gap-1">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `rounded-[var(--radius-sm)] px-3 py-2 text-sm no-underline transition-colors ${
                  isActive
                    ? "bg-[rgba(176,141,87,0.16)] text-[var(--color-ink)] font-medium"
                    : "text-[rgba(26,31,36,0.72)] hover:bg-[rgba(255,255,255,0.5)]"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button
          className="btn mt-10 w-full"
          type="button"
          onClick={() => {
            setAccessToken(null);
            navigate("/login");
          }}
        >
          Sign out
        </button>
      </aside>
      <main className="px-8 py-7">
        <Outlet />
      </main>
    </div>
  );
}
