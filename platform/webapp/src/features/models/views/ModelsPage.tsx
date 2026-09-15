import { FormEvent, useEffect, useState } from "react";
import { lendoraApi } from "@/services/shared/infrastructure";

export function ModelsPage() {
  const [models, setModels] = useState<Record<string, unknown>[]>([]);
  const [envelope, setEnvelope] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("challenger-candidate");

  async function load() {
    try {
      const [m, e] = await Promise.all([
        lendoraApi.listModels(),
        lendoraApi.getLearningEnvelope().catch(() => null),
      ]);
      setModels(m.data?.items ?? []);
      setEnvelope(e?.data ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Load failed");
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function register(e: FormEvent) {
    e.preventDefault();
    await lendoraApi.registerModel({
      name,
      role: "challenger",
      stabilityScore: 0.8,
      discriminationScore: 0.75,
    });
    await load();
  }

  return (
    <div className="space-y-6">
      <header>
        <p className="brand-mark text-sm mb-1">Lendora</p>
        <h1 className="text-3xl m-0">Models and challengers</h1>
        <p className="text-sm text-[rgba(26,31,36,0.6)] mt-1">
          Stability before promote. Learning stays inside locked envelopes.
        </p>
      </header>
      {error ? <p className="text-[var(--color-signal)] text-sm">{error}</p> : null}

      <section className="panel p-4">
        <h2 className="text-lg m-0 mb-2">Learning envelope</h2>
        {envelope ? (
          <div className="text-sm space-y-1">
            <div>
              Locked:{" "}
              <strong style={{ color: envelope.locked ? "var(--color-mint-ok)" : "var(--color-signal)" }}>
                {String(envelope.locked)}
              </strong>
            </div>
            <div>
              Max loosen %: <span className="mono">{String(envelope.maxLoosenPct ?? "—")}</span>
            </div>
            <button
              className="btn mt-2"
              type="button"
              onClick={() =>
                void lendoraApi
                  .updateLearningEnvelope({ locked: true, maxLoosenPct: 5 })
                  .then(load)
              }
            >
              Lock envelope
            </button>
          </div>
        ) : (
          <p className="text-sm text-[rgba(26,31,36,0.55)]">
            Envelope missing — promote disabled until BR-4 governance is set.
          </p>
        )}
      </section>

      <section className="panel p-4">
        <h2 className="text-lg m-0 mb-3">Register challenger</h2>
        <form className="flex gap-2 max-w-xl" onSubmit={register}>
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
          <button className="btn btn-primary" type="submit">
            Register
          </button>
        </form>
      </section>

      <section className="panel overflow-hidden">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Stability</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {models.map((m) => (
              <tr key={String(m.id)}>
                <td>{String(m.name)}</td>
                <td>{String(m.role)}</td>
                <td>{String(m.status)}</td>
                <td className="mono">{String(m.stabilityScore ?? "—")}</td>
                <td className="space-x-2">
                  <button
                    className="btn"
                    type="button"
                    onClick={() => void lendoraApi.proposePromote(String(m.id)).then(load)}
                  >
                    Propose promote
                  </button>
                  <button
                    className="btn btn-brass"
                    type="button"
                    onClick={() => void lendoraApi.approvePromote(String(m.id)).then(load)}
                  >
                    Dual approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
