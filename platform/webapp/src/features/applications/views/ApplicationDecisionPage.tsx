import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { lendoraApi } from "@/services/shared/infrastructure";
import { DecisionSeal } from "@/components/DecisionSeal";

export function ApplicationDecisionPage() {
  const { applicationId = "" } = useParams();
  const [app, setApp] = useState<Record<string, unknown> | null>(null);
  const [decision, setDecision] = useState<Record<string, unknown> | null>(null);
  const [features, setFeatures] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function load() {
    setError(null);
    try {
      const a = await lendoraApi.getApplication(applicationId);
      setApp(a.data);
      const [d, f] = await Promise.all([
        lendoraApi.getDecision(applicationId).catch(() => null),
        lendoraApi.getFeaturePack(applicationId).catch(() => null),
      ]);
      setDecision(d?.data ?? null);
      setFeatures(f?.data ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Load failed");
    }
  }

  useEffect(() => {
    if (applicationId) void load();
  }, [applicationId]);

  async function runDecision() {
    setBusy(true);
    try {
      const res = await lendoraApi.decideApplication(applicationId);
      setDecision(res.data);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Decide failed");
    } finally {
      setBusy(false);
    }
  }

  const reasons = (decision?.reasonCodes as string[] | undefined) ?? [];
  const provenance = (features?.provenance as string[] | undefined) ?? [];
  const topFactors = (decision?.topFactors as Array<Record<string, unknown>> | undefined) ?? [];

  return (
    <div className="space-y-6">
      <header className="flex justify-between gap-4 items-start">
        <div>
          <p className="brand-mark text-sm mb-1">Lendora</p>
          <h1 className="text-3xl m-0">Application decision</h1>
          <p className="mono text-xs mt-2 text-[rgba(26,31,36,0.55)]">{applicationId}</p>
        </div>
        <div className="flex gap-2">
          <Link className="btn" to={`/audits?applicationId=${applicationId}`}>
            Open audit
          </Link>
          <button className="btn btn-primary" type="button" disabled={busy} onClick={runDecision}>
            {busy ? "Deciding…" : "Run decision"}
          </button>
        </div>
      </header>

      {error ? <p className="text-[var(--color-signal)] text-sm">{error}</p> : null}

      <section className="panel p-5 grid grid-cols-[1fr_auto] gap-4 items-start">
        <div>
          <h2 className="text-xl m-0 mb-2">Decision seal</h2>
          <DecisionSeal outcome={String(decision?.outcome ?? app?.status ?? "pending")} />
          <div className="mt-4 text-sm space-y-1">
            <div>
              Policy version:{" "}
              <span className="mono">{String(decision?.policyVersionId ?? "—")}</span>
            </div>
            <div>
              Model version:{" "}
              <span className="mono">{String(decision?.modelVersionId ?? "—")}</span>
            </div>
            <div>
              Score: <span className="mono">{String(decision?.score ?? "—")}</span>
            </div>
          </div>
        </div>
        <div className="text-right text-sm text-[rgba(26,31,36,0.6)]">
          Amount {String(app?.amount ?? "—")} {String(app?.currency ?? "")}
          <div>{String(app?.productLine ?? "")}</div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4">
        <div className="panel p-4">
          <h3 className="m-0 mb-3">Reason codes</h3>
          {reasons.length === 0 ? (
            <p className="text-sm text-[rgba(26,31,36,0.55)]">No reason codes yet.</p>
          ) : (
            <ul className="m-0 pl-5 text-sm space-y-1">
              {reasons.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="panel p-4">
          <h3 className="m-0 mb-3">Feature provenance</h3>
          <div className="flex flex-wrap gap-2">
            {provenance.length === 0 ? (
              <span className="text-sm text-[rgba(26,31,36,0.55)]">No pack attached</span>
            ) : (
              provenance.map((p) => (
                <span
                  key={p}
                  className="text-xs px-2 py-1 border border-[var(--color-stone-200)] rounded-[var(--radius-sm)]"
                >
                  {p}
                </span>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="panel p-4">
        <h3 className="m-0 mb-3">Top factors</h3>
        {topFactors.length === 0 ? (
          <p className="text-sm text-[rgba(26,31,36,0.55)]">No explanation artefacts yet.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Direction</th>
                <th>Weight</th>
              </tr>
            </thead>
            <tbody>
              {topFactors.map((f, i) => (
                <tr key={i}>
                  <td>{String(f.code ?? f.label ?? "—")}</td>
                  <td>{String(f.direction ?? "—")}</td>
                  <td className="mono">{String(f.weight ?? "—")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
