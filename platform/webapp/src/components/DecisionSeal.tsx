export function DecisionSeal({
  outcome,
}: {
  outcome?: string | null;
}) {
  const value = (outcome || "pending").toLowerCase();
  const cls =
    value === "accept"
      ? "seal-accept"
      : value === "refer"
        ? "seal-refer"
        : value === "decline"
          ? "seal-decline"
          : "seal-refer";
  return (
    <span className={`seal ${cls}`} aria-label={`Decision ${value}`}>
      <span aria-hidden>
        {value === "accept" ? "●" : value === "refer" ? "◆" : "■"}
      </span>
      {value}
    </span>
  );
}
