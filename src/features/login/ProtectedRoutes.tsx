import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "./useCurrentUser";
import FullScreenSpinner from "../../components/ui/FullScreenSpinner";

type ProtectedRoutesProps = {
  children: ReactNode;
};

function ProtectedRoutes({ children }: ProtectedRoutesProps) {
  const navigate = useNavigate();
  const { isPending, isAuthenticated } = useCurrentUser();

  useEffect(() => {
    if (!isPending && !isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isPending, isAuthenticated, navigate]);

  if (isPending) return <FullScreenSpinner />;

  return isAuthenticated ? <>{children}</> : null;
}

export default ProtectedRoutes;


