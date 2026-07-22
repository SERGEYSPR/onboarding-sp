import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, LogIn, ShieldCheck, Clock, FileCheck } from "lucide-react";
import heroImage from "@/assets/welcome-hero.jpg";
import segpayLogo from "@/assets/segpay-logo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Welcome to Segpay — Merchant Onboarding" },
      {
        name: "description",
        content:
          "Start your Segpay merchant application or sign in to continue where you left off.",
      },
      { property: "og:title", content: "Welcome to Segpay" },
      {
        property: "og:description",
        content: "Begin your merchant onboarding application with Segpay.",
      },
    ],
  }),
  component: WelcomePage,
});

function WelcomePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={segpayLogo.url} alt="Segpay" className="h-7 w-auto" />
            <span className="text-xs text-muted-foreground border-l border-border pl-3">
              Merchant Onboarding
            </span>
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            <LogIn className="h-4 w-4" />
            Sign in
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Secure merchant application
            </div>

            <div className="space-y-6">
              <h1 className="font-serif text-5xl lg:text-6xl leading-[1.05] tracking-tight text-foreground">
                Welcome to Segpay
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                Please fill out your onboarding application to start accepting
                payments. It takes about 20 minutes — you can save progress
                and return at any time.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
              >
                Start new application
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
              >
                <LogIn className="h-4 w-4" />
                Returning user — sign in
              </Link>
            </div>

            <p className="text-sm text-muted-foreground">
              Already started an application?{" "}
              <Link to="/login" className="text-primary font-medium hover:underline">
                Log in to continue where you left off
              </Link>
              .
            </p>

            <div className="grid sm:grid-cols-3 gap-4 pt-6 border-t border-border">
              <Feature
                icon={Clock}
                title="~20 minutes"
                desc="Save and resume anytime"
              />
              <Feature
                icon={ShieldCheck}
                title="Bank-grade security"
                desc="Your data is encrypted"
              />
              <Feature
                icon={FileCheck}
                title="10 clear steps"
                desc="Guided from start to finish"
              />
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-transparent rounded-3xl blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-xl">
              <img
                src={heroImage}
                alt="Segpay merchant onboarding welcome"
                width={1024}
                height={1024}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-6 text-xs text-muted-foreground flex justify-between">
          <span>© {new Date().getFullYear()} Segpay</span>
          <span>Need help? support@segpay.com</span>
        </div>
      </footer>
    </div>
  );
}

function Feature({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-primary" />
        <div className="text-sm font-semibold text-foreground">{title}</div>
      </div>
      <div className="text-xs text-muted-foreground">{desc}</div>
    </div>
  );
}
