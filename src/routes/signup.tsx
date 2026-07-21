import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, ArrowRight, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create your Segpay account" },
      { name: "description", content: "Create a Segpay merchant account to begin onboarding." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) return setError("Please fill in every field.");
    if (password.length < 8) return setError("Password must be at least 8 characters.");
    if (password !== confirm) return setError("Passwords do not match.");
    setError(null);
    navigate({ to: "/apply" });
  }

  return (
    <AuthShell
      eyebrow="Create account"
      title="Start your Segpay application"
      subtitle="Create an account so your progress is saved securely between sessions."
    >
      <form onSubmit={submit} className="space-y-4">
        <AuthField label="Email" icon={Mail}>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="auth-input"
          />
        </AuthField>
        <AuthField label="Password" icon={Lock}>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
            className="auth-input"
          />
        </AuthField>
        <AuthField label="Repeat password" icon={Lock}>
          <input
            type="password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Repeat your password"
            className="auth-input"
          />
        </AuthField>

        {error && (
          <div className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs text-destructive">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
        >
          Create account & continue <ArrowRight className="h-4 w-4" />
        </button>

        <div className="pt-2 text-center text-xs text-muted-foreground">
          Already registered?{" "}
          <Link to="/login" className="text-primary font-medium hover:underline">
            Sign in
          </Link>
        </div>
      </form>
    </AuthShell>
  );
}

export function AuthShell({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-surface/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-semibold">
              S
            </div>
            <div>
              <div className="font-semibold text-foreground">Segpay</div>
              <div className="text-xs text-muted-foreground">Merchant Onboarding</div>
            </div>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <div className="text-xs uppercase tracking-[0.14em] text-primary font-medium">
            {eyebrow}
          </div>
          <h1 className="font-display text-4xl mt-2 leading-[1.05] text-foreground">{title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">{subtitle}</p>

          <div className="mt-8 rounded-2xl border border-border bg-surface p-6 shadow-sm">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

export function AuthField({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="text-xs font-medium text-foreground mb-1.5">{label}</div>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        {children}
      </div>
    </label>
  );
}
