import { useEffect, useState } from "react";
import { lendoraApi } from "@/services/shared/infrastructure";

export function EarlyWarningsPage() {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      const res = await lendoraApi.listEarlyWarnings();
      setItems(res.data?.items ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Load failed");
    }
  }

  useEffect(() => {
    void load();
  }, []);

  return (
    <div className="space-y-6">
      <header>
        <p className="brand-mark text-sm mb-1">Lendora</p>
        <h1 className="text-3xl m-0">Early-warning monitor</h1>
        <p className="text-sm text-[rgba(26,31,36,0.6)] mt-1">
          Booked vintages diverging from appetite — before charge-off.
        </p>
      </header>
      {error ? <p className="text-[var(--color-signal)] text-sm">{error}</p> : null}
      <section className="panel overflow-hidden">
        <table className="table">
          <thead>
            <tr>
              <th>Alert</th>
              <th>Account</th>
              <th>Signal</th>
              <th>Severity</th>
              <th>Vintage</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-[rgba(26,31,36,0.55)]">
                  Healthy vintages — last alert age: none.
                </td>
              </tr>
            ) : (
              items.map((a) => (
                <tr key={String(a.id)} className="ews-row">
                  <td className="mono text-xs">{String(a.id)}</td>
                  <td className="mono text-xs">{String(a.accountId)}</td>
                  <td>{String(a.signal)}</td>
                  <td style={{ color: "var(--color-signal)" }}>{String(a.severity)}</td>
                  <td>{String(a.vintageWindow)}</td>
                  <td>{String(a.status)}</td>
                  <td className="space-x-2">
                    <button
                      className="btn"
                      type="button"
                      onClick={() =>
                        void lendoraApi.acknowledgeEarlyWarning(String(a.id)).then(load)
                      }
                    >
                      Ack
                    </button>
                    <button
                      className="btn"
                      type="button"
                      onClick={() =>
                        void lendoraApi.escalateEarlyWarning(String(a.id)).then(load)
                      }
                    >
                      Escalate
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
