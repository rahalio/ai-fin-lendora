import { useEffect, useState } from "react";
import { lendoraApi } from "@/services/shared/infrastructure";

const SOD_MATRIX = [
  { role: "admin", policyEdit: true, modelOps: true, note: "Platform admin — dual-control config" },
  { role: "analyst", policyEdit: true, modelOps: false, note: "Policy editors cannot promote models" },
  { role: "ops", policyEdit: false, modelOps: true, note: "Model operators cannot loosen packs alone" },
  { role: "viewer", policyEdit: false, modelOps: false, note: "Read-only assurance" },
];

export function AccessPage() {
  const [users, setUsers] = useState<Record<string, unknown>[]>([]);
  const [me, setMe] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      try {
        const [u, m] = await Promise.all([
          lendoraApi.listUsers(),
          lendoraApi.me(),
        ]);
        setUsers(u.data?.items ?? []);
        setMe((m.data as Record<string, unknown>) ?? null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Load failed");
      }
    })();
  }, []);

  return (
    <div className="space-y-6">
      <header>
        <p className="brand-mark text-sm mb-1">Lendora</p>
        <h1 className="text-3xl m-0">Access and separation of duties</h1>
        <p className="text-sm text-[rgba(26,31,36,0.6)] mt-1">
          Policy editors and model operators cannot unilaterally loosen credit.
        </p>
      </header>
      {error ? <p className="text-[var(--color-signal)] text-sm">{error}</p> : null}

      <section className="panel p-4 text-sm">
        <h2 className="text-lg m-0 mb-2">Current session</h2>
        <pre className="m-0 text-xs overflow-auto">{JSON.stringify(me, null, 2)}</pre>
      </section>

      <section className="panel overflow-hidden">
        <div className="px-4 py-3 border-b border-[var(--color-stone-200)]">
          <h2 className="text-lg m-0">Role matrix</h2>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Role</th>
              <th>Policy edit</th>
              <th>Model ops</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {SOD_MATRIX.map((row) => (
              <tr key={row.role}>
                <td className="mono">{row.role}</td>
                <td>{row.policyEdit ? "yes" : "no"}</td>
                <td>{row.modelOps ? "yes" : "no"}</td>
                <td>{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="panel overflow-hidden">
        <div className="px-4 py-3 border-b border-[var(--color-stone-200)]">
          <h2 className="text-lg m-0">Tenant operators</h2>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={String(u.userId ?? u.id)}>
                <td>{String(u.displayName ?? "—")}</td>
                <td>{String(u.email ?? "—")}</td>
                <td className="mono">{String(u.role ?? "—")}</td>
                <td>{String(u.status ?? "—")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
