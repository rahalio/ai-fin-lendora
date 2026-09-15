import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  lendoraApi,
  setAccessToken,
} from "@/services/shared/infrastructure";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@demo.local");
  const [password, setPassword] = useState("sandbox-admin-8");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await lendoraApi.login(email, password);
      const token = res.data?.accessToken;
      if (!token) throw new Error("No access token returned");
      setAccessToken(token);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid place-items-center px-4">
      <div className="w-full max-w-md panel p-8">
        <div className="brand-mark text-4xl mb-2">Lendora</div>
        <h1 className="text-2xl mb-1">Policy first. Minutes to yes.</h1>
        <p className="text-sm text-[rgba(26,31,36,0.6)] mb-6">
          Sign in to the credit-decisioning console.
        </p>
        <form className="flex flex-col gap-3" onSubmit={onSubmit}>
          <label className="text-xs font-medium">
            Email
            <input
              className="input mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </label>
          <label className="text-xs font-medium">
            Password
            <input
              className="input mt-1"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </label>
          {error ? (
            <p className="text-sm text-[var(--color-signal)]">{error}</p>
          ) : null}
          <button className="btn btn-primary mt-2" disabled={loading} type="submit">
            {loading ? "Signing in…" : "Enter console"}
          </button>
        </form>
      </div>
    </div>
  );
}
