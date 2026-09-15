import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { AppShell } from "@/components/chrome/AppShell";
import { LoginPage } from "@/features/auth/views/LoginPage";
import { LendingHomePage } from "@/features/home/views/LendingHomePage";
import { ApplicationDecisionPage } from "@/features/applications/views/ApplicationDecisionPage";
import { PoliciesPage } from "@/features/policies/views/PoliciesPage";
import { TaxonomyPage } from "@/features/policies/views/TaxonomyPage";
import { ReferQueuePage, ReferTaskPage } from "@/features/referrals/views/ReferPages";
import { EarlyWarningsPage } from "@/features/early-warnings/views/EarlyWarningsPage";
import { ModelsPage } from "@/features/models/views/ModelsPage";
import { AuditsPage } from "@/features/audits/views/AuditsPage";
import { AccessPage } from "@/features/access/views/AccessPage";
import { getAccessToken } from "@/services/shared/infrastructure";

function RequireAuth({ children }: { children: React.ReactNode }) {
  if (!getAccessToken()) return <Navigate to="/login" replace />;
  return children;
}

function ReferTaskRoute() {
  const { referTaskId = "" } = useParams();
  return <ReferTaskPage referTaskId={referTaskId} />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <AppShell />
          </RequireAuth>
        }
      >
        <Route index element={<LendingHomePage />} />
        <Route path="applications/:applicationId" element={<ApplicationDecisionPage />} />
        <Route path="policies" element={<PoliciesPage />} />
        <Route path="taxonomy" element={<TaxonomyPage />} />
        <Route path="refer" element={<ReferQueuePage />} />
        <Route path="refer/:referTaskId" element={<ReferTaskRoute />} />
        <Route path="early-warnings" element={<EarlyWarningsPage />} />
        <Route path="models" element={<ModelsPage />} />
        <Route path="audits" element={<AuditsPage />} />
        <Route path="access" element={<AccessPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
