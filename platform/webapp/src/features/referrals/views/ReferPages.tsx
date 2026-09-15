import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { lendoraApi } from "@/services/shared/infrastructure";

export function ReferQueuePage() {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      const res = await lendoraApi.listReferTasks();
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
        <h1 className="text-3xl m-0">Refer queue</h1>
        <p className="text-sm text-[rgba(26,31,36,0.6)] mt-1">
          Same fact pack the model saw — no blind re-collection.
        </p>
      </header>
      {error ? <p className="text-[var(--color-signal)] text-sm">{error}</p> : null}
      <section className="panel overflow-hidden">
        <table className="table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Application</th>
              <th>Product</th>
              <th>Status</th>
              <th>Reasons</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-[rgba(26,31,36,0.55)]">
                  Empty — straight-through healthy.
                </td>
              </tr>
            ) : (
              items.map((t) => (
                <tr key={String(t.id)} className="refer-row">
                  <td className="mono text-xs">{String(t.id)}</td>
                  <td className="mono text-xs">{String(t.applicationId)}</td>
                  <td>{String(t.productLine ?? "—")}</td>
                  <td>{String(t.status)}</td>
                  <td className="text-xs">
                    {Array.isArray(t.reasonCodes) ? t.reasonCodes.join(", ") : "—"}
                  </td>
                  <td>
                    <Link className="btn" to={`/refer/${t.id}`}>
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

export function ReferTaskPage({ referTaskId }: { referTaskId: string }) {
  const [task, setTask] = useState<Record<string, unknown> | null>(null);
  const [justification, setJustification] = useState("");
  const [outcome, setOutcome] = useState<"accept" | "decline">("accept");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function load() {
    const res = await lendoraApi.getReferTask(referTaskId);
    setTask(res.data);
  }

  useEffect(() => {
    void load().catch((err) =>
      setError(err instanceof Error ? err.message : "Load failed"),
    );
  }, [referTaskId]);

  async function claim() {
    await lendoraApi.claimReferTask(referTaskId);
    await load();
    setMessage("Task claimed");
  }

  async function override(e: FormEvent) {
    e.preventDefault();
    if (!justification.trim()) {
      setError("Override reason required");
      return;
    }
    await lendoraApi.createOverride(referTaskId, {
      finalOutcome: outcome,
      justification,
    });
    setMessage(`Override recorded: ${outcome}`);
    await load();
  }

  return (
    <div className="space-y-6">
      <header className="flex justify-between gap-4">
        <div>
          <p className="brand-mark text-sm mb-1">Lendora</p>
          <h1 className="text-3xl m-0">Refer task</h1>
          <p className="mono text-xs mt-2">{referTaskId}</p>
        </div>
        <button className="btn btn-primary" type="button" onClick={() => void claim()}>
          Claim task
        </button>
      </header>
      {error ? <p className="text-[var(--color-signal)] text-sm">{error}</p> : null}
      {message ? <p className="text-[var(--color-mint-ok)] text-sm">{message}</p> : null}

      <section className="panel p-4">
        <h2 className="text-lg m-0 mb-3">Fact pack mirror</h2>
        <pre className="text-xs overflow-auto m-0">
          {JSON.stringify(task?.factPackSummary ?? task ?? {}, null, 2)}
        </pre>
      </section>

      <section className="panel p-4">
        <h2 className="text-lg m-0 mb-3">Record override</h2>
        <form className="space-y-3 max-w-lg" onSubmit={override}>
          <label className="text-xs font-medium block">
            Final outcome
            <select
              className="select mt-1"
              value={outcome}
              onChange={(e) => setOutcome(e.target.value as "accept" | "decline")}
            >
              <option value="accept">accept</option>
              <option value="decline">decline</option>
            </select>
          </label>
          <label className="text-xs font-medium block">
            Justification
            <textarea
              className="textarea mt-1"
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              required
            />
          </label>
          <button className="btn btn-brass" type="submit">
            Decide with override
          </button>
        </form>
      </section>
    </div>
  );
}
