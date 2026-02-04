import { useEffect, useState } from "react";
import Logo from "../components/sidebar/Logo";
import { useLogin } from "../features/login/useLogin";
import { useCurrentUser } from "../features/login/useCurrentUser";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("devangranderia9@gmail.com");
  const [password, setPassword] = useState("devang9911");
  const navigate = useNavigate();
  const { isAuthenticated, isPending: isCurrentUser } = useCurrentUser();
  const { mutate: loginUser, isPending } = useLogin();

  useEffect(() => {
    if (!isCurrentUser && isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isCurrentUser, isAuthenticated, navigate]);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) return;

    loginUser(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      },
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>

        <h1 className="text-2xl font-semibold text-center text-gray-900 mb-2">
          Login to your account
        </h1>
        <p className="text-sm text-center text-gray-500 mb-6">
          Welcome back! Please enter your details.
        </p>

        <form className="space-y-4" onSubmit={handleOnSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {isPending ? "Logging in..." : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
