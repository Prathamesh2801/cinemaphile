import { Layout } from "../layout/Layout";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(username, email, password);
      }
      navigate("/"); // Redirect to home page after successful auth
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 font-inter">
        <button
          onClick={() => window.history.back()}
          className="mb-12 flex items-center text-neutral-400 hover:text-emerald-100 transition-colors cursor-pointer"
          title="Go Back"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <div className="max-w-md mx-auto mt-20">
          <h1 className="text-4xl font-bold mb-12 font-doto tracking-tight">
            {isLogin ? "Login" : "Register"}
          </h1>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-2 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative">
              <label className="block text-sm font-doto mb-3 text-neutral-300">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-transparent border border-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-400 transition-all font-doto"
                  placeholder="Enter your email"
                  required
                />
                <div className="absolute inset-0 rounded-lg -z-10 bg-[linear-gradient(110deg,#000,45%,#333,55%,#000)] opacity-40"></div>
              </div>
            </div>

            {!isLogin && (
              <div className="relative">
                <label className="block text-sm font-doto mb-3 text-neutral-300">
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-transparent border border-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-400 transition-all font-doto"
                    placeholder="Choose a username"
                    required={!isLogin}
                    minLength={3}
                  />
                  <div className="absolute inset-0 rounded-lg -z-10 bg-[linear-gradient(110deg,#000,45%,#333,55%,#000)] opacity-40"></div>
                </div>
              </div>
            )}

            <div className="relative">
              <label className="block text-sm font-doto mb-3 text-neutral-300">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-transparent border border-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-400 transition-all font-doto"
                  placeholder="Enter your password"
                  required
                  minLength={6}
                />
                <div className="absolute inset-0 rounded-lg -z-10 bg-[linear-gradient(110deg,#000,45%,#333,55%,#000)] opacity-40"></div>
              </div>
            </div>

            <button
              className="relative inline-flex h-12 active:scale-95 transition overflow-hidden rounded-lg p-[1px] focus:outline-none w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={isLoading}
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#f8f8ff_0%,#0a0a0a_50%,#a8a8a8_100%)]"></span>
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-neutral-950 px-7 text-base text-white backdrop-blur-3xl font-doto">
                {isLoading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                ) : (
                  isLogin ? "Sign in" : "Create account"
                )}
              </span>
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-zinc-400 font-inter">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
                setEmail("");
                setPassword("");
                setUsername("");
              }}
              className="text-neutral-200 hover:text-white transition-colors font-medium font-doto ml-1 cursor-pointer"
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </Layout>
  );
};
