import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Background from "../components/Background";
import { env } from "../config/env";
import { Check, Clear } from "@mui/icons-material";

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [timeLeft, setTimeLeft] = useState(0);

  // Initialize expiration timestamp (10 minutes)
  useEffect(() => {
    if (!token) return;

    const storageKey = `verifyTokenExpiration_${token}`;
    let expiration = localStorage.getItem(storageKey);

    if (!expiration) {
      const expireAt = Date.now() + 10 * 60 * 1000;
      localStorage.setItem(storageKey, expireAt.toString());
      expiration = expireAt.toString();
    }

    const updateTimer = () => {
      const remaining = Math.max(
        0,
        Math.floor((parseInt(expiration!) - Date.now()) / 1000),
      );
      setTimeLeft(remaining);
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [token]);

  const handleVerify = async () => {
    if (!token || timeLeft <= 0) return setStatus("error");

    setLoading(true);
    setStatus("idle");

    try {
      const res = await fetch(
        `${env.VITE_BACKEND_URL}/api/subscribe/verify-email?token=${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        },
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Verification failed");

      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  // Format countdown as MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <Background>
      <div className="relative w-full max-w-md p-8 rounded-2xl bg-zinc-900/60 backdrop-blur border border-zinc-800 shadow-xl shadow-zinc-900/40 z-10 text-center">
        <h1 className="text-2xl font-semibold text-zinc-100 mb-2">
          Verify Your Email
        </h1>
        <p className="text-sm text-zinc-400 mb-6">
          Click the button below to confirm your email address.
        </p>

        {status === "success" && (
          <>
            <p className="text-green-400 mb-4 font-medium">
              <Check
                className="text-green-400! aspect-square rounded-full bg-green-100 p-1"
                fontSize="medium"
              />{" "}
              Email verified successfully! You may now log in.
            </p>
            <button
              onClick={() => navigate("/login")}
              disabled={loading || !token || timeLeft <= 0}
              className={`
                mt-2 w-full py-2.5 rounded-xl font-medium transition
                ${
                  loading || !token || timeLeft <= 0
                    ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                    : "bg-zinc-200 text-zinc-900 hover:bg-zinc-300"
                }
              `}
            >
              Log in
            </button>
          </>
        )}
        {status === "error" && (
          <p className="text-red-400 mb-4 font-medium">
            <Clear className="text-red-400!" /> Verification failed. Please
            check your link or request a new one.
          </p>
        )}

        {status !== "success" && (
          <>
            <button
              onClick={handleVerify}
              disabled={loading || !token || timeLeft <= 0}
              className={`
                mt-2 w-full py-2.5 rounded-xl font-medium transition
                ${
                  loading || !token || timeLeft <= 0
                    ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                    : "bg-zinc-200 text-zinc-900 hover:bg-zinc-300"
                }
              `}
            >
              {loading ? "Verifying..." : "Verify Email"}
            </button>

            <p className="text-sm text-zinc-400 mt-4">
              Token expires in:{" "}
              <span className="font-medium text-zinc-200">
                {minutes.toString().padStart(2, "0")}:
                {seconds.toString().padStart(2, "0")}
              </span>
            </p>

            {timeLeft <= 0 && (
              <p className="text-red-400 mt-2 font-medium">
                Your token has expired. Please request a new verification email.
              </p>
            )}
          </>
        )}
      </div>
    </Background>
  );
}
