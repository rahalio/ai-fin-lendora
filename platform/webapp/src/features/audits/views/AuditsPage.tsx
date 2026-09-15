import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { lendoraApi } from "@/services/shared/infrastructure";

export function AuditsPage() {
  const [params] = useSearchParams();
  const [applicationId, setApplicationId] = useState(
    params.get("applicationId") || "",
  );
  const [pack, setPack] = useState<Record<string, unknown> | null>(null);
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function loadList() {
    const res = await lendoraApi.listAudits();
    setItems(res.data?.items ?? []);
  }

  useEffect(() => {
    void loadList().catch(() => undefined);
  }, []);

  async function onLookup(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      let res;
      try {
        res = await lendoraApi.getAuditByApplication(applicationId);
      } catch {
        res = await lendoraApi.createAudit(applicationId);
      }
      setPack(res.data);
      await loadList();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Audit failed");
    }
  }

  return (
    <div className="space-y-6">
      <header>
        <p className="brand-mark text-sm mb-1">Lendora</p>
        <h1 className="text-3xl m-0">Decision audit reproduction</h1>
        <p className="text-sm text-[rgba(26,31,36,0.6)] mt-1">
          Immutable pack by application id — decision, policy, model, features.
        </p>
      </header>
      {error ? <p className="text-[var(--color-signal)] text-sm">{error}</p> : null}

      <form className="panel p-4 flex gap-2 max-w-2xl" onSubmit={onLookup}>
        <input
          className="input mono"
          placeholder="application id"
          value={applicationId}
          onChange={(e) => setApplicationId(e.target.value)}
          required
        />
        <button className="btn btn-primary" type="submit">
          Reproduce
        </button>
      </form>

      {pack ? (
        <section className="panel p-4 space-y-2">
          <div className="text-sm">
            Integrity hash: <span className="mono">{String(pack.integrityHash ?? "—")}</span>
          </div>
          <pre className="text-xs overflow-auto m-0 bg-[rgba(255,255,255,0.7)] p-3">
            {JSON.stringify(pack, null, 2)}
          </pre>
        </section>
      ) : null}

      <section className="panel overflow-hidden">
        <div className="px-4 py-3 border-b border-[var(--color-stone-200)]">
          <h2 className="text-lg m-0">Recent packs</h2>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Audit</th>
              <th>Application</th>
              <th>Hash</th>
            </tr>
          </thead>
          <tbody>
            {items.map((a) => (
              <tr key={String(a.id)}>
                <td className="mono text-xs">{String(a.id)}</td>
                <td className="mono text-xs">{String(a.applicationId)}</td>
                <td className="mono text-xs">{String(a.integrityHash ?? "—")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
