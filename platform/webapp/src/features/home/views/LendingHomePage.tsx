import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { lendoraApi } from "@/services/shared/infrastructure";
import { DecisionSeal } from "@/components/DecisionSeal";

export function LendingHomePage() {
  const [metrics, setMetrics] = useState<Record<string, unknown> | null>(null);
  const [apps, setApps] = useState<Record<string, unknown>[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  async function load() {
    setError(null);
    try {
      const [m, a] = await Promise.all([
        lendoraApi.getMetrics().catch(() => null),
        lendoraApi.listApplications(),
      ]);
      if (m?.data) setMetrics(m.data);
      setApps(a.data?.items ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function seedApplication() {
    setCreating(true);
    try {
      await lendoraApi.createApplication({
        productId: "personal-online",
        productLine: "personal",
        applicantRef: `applicant_${Date.now()}`,
        amount: 25000,
        currency: "USD",
      });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Create failed");
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between gap-4">
        <div>
          <p className="brand-mark text-sm mb-1">Lendora</p>
          <h1 className="text-3xl m-0">Digital lending home</h1>
          <p className="text-sm text-[rgba(26,31,36,0.6)] mt-1">
            Are we auto-deciding inside appetite within the published SLA?
          </p>
        </div>
        <div className="flex gap-2">
          <Link className="btn" to="/refer">
            Open refer backlog
          </Link>
          <button className="btn btn-brass" type="button" disabled={creating} onClick={seedApplication}>
            {creating ? "Creating…" : "Intake sample application"}
          </button>
        </div>
      </header>

      {error ? <p className="text-[var(--color-signal)] text-sm">{error}</p> : null}

      <section className="grid grid-cols-4 gap-3">
        {(
          [
            ["Straight-through", metrics?.straightThroughRate ?? "—"],
            ["Median decision ms", metrics?.medianDecisionMs ?? "—"],
            [
              "Accept / Refer / Decline",
              `${metrics?.acceptCount ?? 0} / ${metrics?.referCount ?? 0} / ${metrics?.declineCount ?? 0}`,
            ],
            ["SLA breaches", metrics?.slaBreachCount ?? 0],
          ] as Array<[string, string | number]>
        ).map(([label, value]) => (
          <div key={label} className="panel p-4">
            <div className="text-xs uppercase tracking-wide text-[rgba(26,31,36,0.55)]">
              {label}
            </div>
            <div className="display text-2xl mt-2">{String(value)}</div>
          </div>
        ))}
      </section>

      <section className="panel overflow-hidden">
        <div className="px-4 py-3 border-b border-[var(--color-stone-200)] flex justify-between">
          <h2 className="text-lg m-0">Applications funnel</h2>
          <button className="btn" type="button" onClick={() => void load()}>
            Refresh
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Application</th>
              <th>Product</th>
              <th>Amount</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {apps.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-[rgba(26,31,36,0.55)]">
                  Empty — connect LOS and create the first PolicyPack, or intake a sample.
                </td>
              </tr>
            ) : (
              apps.map((app) => (
                <tr key={String(app.id)}>
                  <td className="mono text-xs">{String(app.id)}</td>
                  <td>{String(app.productLine ?? app.productId ?? "—")}</td>
                  <td>
                    {String(app.amount ?? "—")} {String(app.currency ?? "")}
                  </td>
                  <td>
                    <DecisionSeal outcome={String(app.status)} />
                  </td>
                  <td>
                    <Link className="btn" to={`/applications/${app.id}`}>
                      Open
                    </Link>
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
