import { useState } from "react";
import Background from "../components/Background";
import Input from "../components/Input";
import { useAuth } from "../utils/hooks";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "error">("idle");

  const { login, lastPage, setLastPage } = useAuth();
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dataObject = Object.fromEntries(formData.entries());
    const credentials = JSON.parse(JSON.stringify(dataObject));
    try {
      setLoading(true);
      await login(credentials);
      // navigate
      if (lastPage) {
        navigate(lastPage);
        setLastPage(null);
      } else navigate("/blogs");
    } catch {
      setStatus("error");
      setLoading(false);
    }
  };

  return (
    <Background>
      <div className="relative w-full max-w-md p-8 rounded-2xl bg-zinc-900/60 backdrop-blur border border-zinc-800 shadow-xl shadow-zinc-900/40">
        {/* Logo + Title */}
        <div className="mb-6 place-items-center text-center">
          <img src="./icon2.png" alt="logo" className="h-10 mx-auto" />
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-100 mt-2">
            Welcome Back
          </h1>
          <p className="text-sm text-zinc-400 mt-1">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <form onSubmit={(e) => handleLogin(e)} className="flex flex-col gap-4">
          <Input
            key="email"
            label="Email"
            name="email"
            type="email"
            placeholder="john.doe@example.com"
          />
          <Input
            key="password"
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
          />

          {status === "error" && (
            <p className="text-red-400 text-sm mt-1">
              Invalid email or password
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`
              mt-2 w-full py-2.5 rounded-xl font-medium transition
              ${
                loading
                  ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                  : "bg-zinc-200 text-zinc-900 hover:bg-zinc-300"
              }
            `}
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-zinc-500 mt-6 text-center">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-zinc-300 hover:text-white cursor-pointer transition"
          >
            Sign up
          </span>
        </p>
      </div>
    </Background>
  );
}
