import { useState } from "react";
import Input from "../components/Input";
import Background from "../components/Background";
import { registerUser } from "../utils/requests.auth";
import { useNavigate } from "react-router-dom";

export default function Page() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username")?.toString();
    const email = formData.get("email")?.toString();
    const firstName = formData.get("firstName")?.toString();
    const lastName = formData.get("lastName")?.toString();
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;

    if (
      !username ||
      !email ||
      !firstName ||
      !lastName ||
      !password ||
      !confirmPassword ||
      password !== confirmPassword
    ) {
      alert("All fields are required and passwords must match!");
      return;
    }

    const payload = {
      username,
      email,
      firstName,
      lastName,
      password,
    };

    const data = await registerUser(payload);
    if (data) setSubmitted(true);
  };

  return (
    <Background>
      <div
        className="w-full max-w-md p-8 rounded-2xl bg-zinc-900/60 backdrop-blur border
       border-zinc-800 shadow-xl shadow-zinc-900/40"
      >
        <div className="mb-6 place-items-center text-center">
          <img src="./icon2.png" alt="logo" className="h-10 mx-auto" />
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">
            Create Account
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Join ZincBlogs and share your thoughts with me
          </p>
        </div>

        {submitted ? (
          <div className="text-center text-zinc-100 p-6 rounded-lg bg-zinc-800/50 shadow-inner shadow-zinc-900/30">
            ✅ Registration successful! <br />
            Please check your email to verify your account.
          </div>
        ) : (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input
              key="username"
              label="Username"
              name="username"
              placeholder="johndoe123"
            />
            <Input
              key="email"
              label="Email"
              name="email"
              type="email"
              placeholder="john.doe@example.com"
            />

            <div className="flex flex-col md:flex-row gap-4">
              <Input
                key="firstname"
                label="First Name"
                name="firstName"
                placeholder="John"
              />
              <Input
                key="lastname"
                label="Last Name"
                name="lastName"
                placeholder="Doe"
              />
            </div>

            <Input
              key="password"
              label="Password"
              name="password"
              type="password"
              placeholder="Password"
            />
            <Input
              key="confirm-password"
              label="Confirm Password"
              name="confirm-password"
              type="password"
              placeholder="Confirm Password"
            />

            <button
              disabled={loading}
              type="submit"
              className={`mt-2 w-full py-2.5 rounded-xl
                bg-linear-to-r from-zinc-200 via-zinc-300 to-zinc-200
                text-zinc-900 font-medium
                relative overflow-hidden
                before:absolute before:inset-0 before:bg-white/20 before:blur-xl before:opacity-0
                hover:before:opacity-100
                hover:scale-105
                transition-all duration-300
                active:scale-95
              ${
                loading
                  ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                  : "bg-zinc-200 text-zinc-900 hover:bg-zinc-300"
              }`}
            >
              {!loading ? "Sign up" : "Signing Up..."}
            </button>
          </form>
        )}

        <p className="text-sm text-zinc-500 mt-6 text-center">
          Already have an account?{" "}
          <span onClick={()=> navigate("/login")} className="text-zinc-300 hover:text-white cursor-pointer transition">
            Log in
          </span>
        </p>
      </div>
    </Background>
  );
}
