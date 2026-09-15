import { FormEvent, useEffect, useState } from "react";
import { lendoraApi } from "@/services/shared/infrastructure";

export function TaxonomyPage() {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    code: "INCOME_INSUFFICIENT",
    underwriterWording: "DTI exceeds policy maximum",
    customerWording: "We could not approve based on your income and obligations",
  });

  async function load() {
    const res = await lendoraApi.listReasonCodes();
    setItems(res.data?.items ?? []);
  }

  useEffect(() => {
    void load().catch((err) =>
      setError(err instanceof Error ? err.message : "Load failed"),
    );
  }, []);

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    await lendoraApi.createReasonCode({
      ...form,
      decisionPaths: ["decline", "refer"],
    });
    await load();
  }

  return (
    <div className="space-y-6">
      <header>
        <p className="brand-mark text-sm mb-1">Lendora</p>
        <h1 className="text-3xl m-0">Reason taxonomy studio</h1>
        <p className="text-sm text-[rgba(26,31,36,0.6)] mt-1">
          Adverse-action suitable codes with underwriter and customer wording.
        </p>
      </header>
      {error ? <p className="text-[var(--color-signal)] text-sm">{error}</p> : null}

      <form className="panel p-4 grid grid-cols-1 gap-3 max-w-xl" onSubmit={onCreate}>
        {(["code", "underwriterWording", "customerWording"] as const).map((k) => (
          <label key={k} className="text-xs font-medium">
            {k}
            <input
              className="input mt-1"
              value={form[k]}
              onChange={(e) => setForm({ ...form, [k]: e.target.value })}
            />
          </label>
        ))}
        <button className="btn btn-primary" type="submit">
          Add code
        </button>
      </form>

      <section className="panel overflow-hidden">
        <table className="table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Underwriter</th>
              <th>Customer</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((r) => (
              <tr key={String(r.id)}>
                <td className="mono text-xs">{String(r.code)}</td>
                <td>{String(r.underwriterWording)}</td>
                <td>{String(r.customerWording)}</td>
                <td>{String(r.status)}</td>
                <td>
                  <button
                    className="btn"
                    type="button"
                    onClick={() =>
                      void lendoraApi.publishReasonCode(String(r.id)).then(load)
                    }
                  >
                    Publish
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
