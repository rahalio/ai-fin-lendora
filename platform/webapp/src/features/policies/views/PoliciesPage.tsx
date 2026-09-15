import { FormEvent, useEffect, useState } from "react";
import { lendoraApi } from "@/services/shared/infrastructure";

export function PoliciesPage() {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [selected, setSelected] = useState<Record<string, unknown> | null>(null);
  const [sim, setSim] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    productId: "personal-online",
    productLine: "personal",
    version: "v1",
    maxDti: "0.45",
    maxAmount: "50000",
  });

  async function load() {
    try {
      const res = await lendoraApi.listPolicies();
      setItems(res.data?.items ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Load failed");
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await lendoraApi.createPolicy({
        productId: form.productId,
        productLine: form.productLine,
        version: form.version,
        maxDti: Number(form.maxDti),
        maxAmount: Number(form.maxAmount),
        excludedSegments: [],
      });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Create failed");
    }
  }

  async function openPack(id: string) {
    const res = await lendoraApi.getPolicy(id);
    setSelected(res.data);
    setSim(null);
  }

  async function simulate() {
    if (!selected?.id) return;
    const res = await lendoraApi.simulatePolicy(String(selected.id), {
      sampleScore: 0.72,
      dti: 0.5,
      amount: 40000,
      segment: "retail",
    });
    setSim(res.data);
  }

  return (
    <div className="space-y-6">
      <header>
        <p className="brand-mark text-sm mb-1">Lendora</p>
        <h1 className="text-3xl m-0">Policy packs</h1>
        <p className="text-sm text-[rgba(26,31,36,0.6)] mt-1">
          Appetite overlays that hard-veto model scores — personal vs SME stay separate.
        </p>
      </header>
      {error ? <p className="text-[var(--color-signal)] text-sm">{error}</p> : null}

      <div className="grid grid-cols-[1.1fr_1fr] gap-4">
        <section className="panel p-4">
          <h2 className="text-lg m-0 mb-3">Create draft pack</h2>
          <form className="grid grid-cols-2 gap-3" onSubmit={onCreate}>
            {(["productId", "productLine", "version", "maxDti", "maxAmount"] as const).map((k) => (
              <label key={k} className="text-xs font-medium col-span-1">
                {k}
                <input
                  className="input mt-1"
                  value={form[k]}
                  onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                />
              </label>
            ))}
            <button className="btn btn-primary col-span-2" type="submit">
              Create draft
            </button>
          </form>
        </section>

        <section className="panel overflow-hidden">
          <div className="px-4 py-3 border-b border-[var(--color-stone-200)]">
            <h2 className="text-lg m-0">Packs</h2>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Version</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={String(p.id)}>
                  <td>{String(p.productLine)}</td>
                  <td className="mono text-xs">{String(p.version)}</td>
                  <td>{String(p.status)}</td>
                  <td>
                    <button className="btn" type="button" onClick={() => void openPack(String(p.id))}>
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>

      {selected ? (
        <section className="panel p-5 space-y-3">
          <h2 className="text-xl m-0">Veto simulation</h2>
          <p className="text-sm mono">{String(selected.id)}</p>
          <div className="flex gap-2">
            <button className="btn" type="button" onClick={() => void simulate()}>
              Simulate veto
            </button>
            <button
              className="btn"
              type="button"
              onClick={() => void lendoraApi.submitPolicyApproval(String(selected.id)).then(load)}
            >
              Submit dual approve
            </button>
            <button
              className="btn btn-brass"
              type="button"
              onClick={() => void lendoraApi.approvePolicy(String(selected.id)).then(load)}
            >
              Approve / publish
            </button>
          </div>
          {sim ? (
            <pre className="text-xs bg-[rgba(255,255,255,0.7)] p-3 overflow-auto">
              {JSON.stringify(sim, null, 2)}
            </pre>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}
