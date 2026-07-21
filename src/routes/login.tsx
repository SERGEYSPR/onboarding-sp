import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { AuthShell, AuthField } from "./signup";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Segpay Onboarding" },
      { name: "description", content: "Sign in to continue your Segpay merchant application." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) return setError("Please enter your email and password.");
    setError(null);
    navigate({ to: "/apply" });
  }

  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Continue your application"
      subtitle="Sign in to pick up exactly where you left off."
    >
      <form onSubmit={submit} className="space-y-4">
        <AuthField label="Email" icon={Mail}>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="w-full rounded-md border border-input bg-surface-muted pl-9 pr-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-ring transition"
          />
        </AuthField>
        <AuthField label="Password" icon={Lock}>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            className="w-full rounded-md border border-input bg-surface-muted pl-9 pr-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-ring transition"
          />
        </AuthField>

        <div className="flex justify-end">
          <button type="button" className="text-xs text-primary font-medium hover:underline">
            Forgot password?
          </button>
        </div>

        {error && (
          <div className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs text-destructive">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
        >
          Sign in & continue <ArrowRight className="h-4 w-4" />
        </button>

        <div className="pt-2 text-center text-xs text-muted-foreground">
          New to Segpay?{" "}
          <Link to="/signup" className="text-primary font-medium hover:underline">
            Create an account
          </Link>
        </div>
      </form>
    </AuthShell>
  );
}
