import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/hooks";

export default function Page() {

  const {login} = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dataObject = Object.fromEntries(formData.entries());
    const credentials = JSON.parse(JSON.stringify(dataObject));
    await login(credentials);
    navigate('/blog/posts')
  };

  return (
    <main className="h-screen w-screen place-content-center place-items-center">
      <form onSubmit={handleSubmit} className="login-form">
        <p className="label">Log in</p>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            id="email"
            placeholder="johndoe@example.com"
            required
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
          />
        </label>
        <input type="submit" name="login" id="login" />
      </form>
    </main>
  );
}
