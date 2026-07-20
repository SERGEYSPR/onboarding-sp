import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  ChevronDown,
  ClipboardCheck,
  CreditCard,
  FileText,
  Globe,
  HelpCircle,
  Landmark,
  Mail,
  Phone,
  Save,
  ShieldCheck,
  Sparkles,
  Upload,
  User,
  Users,
  X,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: OnboardingPage,
});

type StepId =
  | "begin"
  | "edd"
  | "company"
  | "directors"
  | "processing"
  | "contacts"
  | "documents"
  | "websites"
  | "banks"
  | "review";

type Step = {
  id: StepId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  complete?: boolean;
};

const STEPS: Step[] = [
  { id: "begin", label: "Begin", icon: Sparkles, complete: true },
  { id: "edd", label: "Due Diligence", icon: ClipboardCheck },
  { id: "company", label: "Company", icon: Building2 },
  { id: "directors", label: "Directors & UBOs", icon: Users },
  { id: "processing", label: "Processing", icon: CreditCard },
  { id: "contacts", label: "Contacts", icon: User },
  { id: "documents", label: "Documents", icon: FileText, complete: true },
  { id: "websites", label: "Websites", icon: Globe },
  { id: "banks", label: "Payment Banks", icon: Landmark, complete: true },
  { id: "review", label: "Review", icon: ShieldCheck, complete: true },
];

function OnboardingPage() {
  const [active, setActive] = useState<StepId>("begin");
  const index = STEPS.findIndex((s) => s.id === active);
  const progress = useMemo(() => ((index + 1) / STEPS.length) * 100, [index]);

  const go = (dir: 1 | -1) => {
    const next = STEPS[Math.min(STEPS.length - 1, Math.max(0, index + dir))];
    setActive(next.id);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="border-b border-border bg-surface/80 backdrop-blur sticky top-0 z-30">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-semibold">
              S
            </div>
            <div>
              <div className="text-sm text-muted-foreground leading-none">Segpay</div>
              <h1 className="font-display text-xl leading-tight">
                Merchant Onboarding
              </h1>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3.5 py-2 text-sm font-medium hover:bg-muted transition">
              <Save className="h-4 w-4" /> Save
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3.5 py-2 text-sm font-medium text-muted-foreground hover:bg-muted transition">
              <X className="h-4 w-4" /> Cancel
            </button>
          </div>
        </div>

        {/* Progress + Tabs */}
        <div className="mx-auto max-w-7xl px-6 pb-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span>
              Step <span className="text-foreground font-medium">{index + 1}</span> of{" "}
              {STEPS.length}
            </span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary transition-[width] duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Horizontal tabs */}
        <nav className="border-t border-border">
          <div className="mx-auto max-w-7xl px-3 overflow-x-auto">
            <ul className="flex items-stretch gap-1 min-w-max">
              {STEPS.map((s, i) => {
                const isActive = s.id === active;
                const Icon = s.icon;
                return (
                  <li key={s.id}>
                    <button
                      onClick={() => setActive(s.id)}
                      className={`group relative flex items-center gap-2.5 px-4 py-3.5 text-sm font-medium transition whitespace-nowrap ${
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : s.complete
                              ? "bg-success/15 text-success"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {s.complete && !isActive ? (
                          <Check className="h-3.5 w-3.5" />
                        ) : (
                          i + 1
                        )}
                      </span>
                      <Icon className="h-4 w-4" />
                      {s.label}
                      {isActive && (
                        <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-primary" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          <section className="min-w-0">
            <StepContent active={active} />

            {/* Footer navigation */}
            <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
              <button
                onClick={() => go(-1)}
                disabled={index === 0}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              <div className="flex items-center gap-2">
                <button className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium hover:bg-muted transition">
                  <Save className="h-4 w-4" /> Save draft
                </button>
                <button
                  onClick={() => go(1)}
                  disabled={index === STEPS.length - 1}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 disabled:opacity-40 transition"
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </section>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-48 space-y-4">
              <div className="rounded-2xl border border-border bg-surface p-5">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  Application
                </div>
                <div className="font-display text-lg mt-1">Bumble Bee and Co</div>
                <div className="mt-3 text-xs text-muted-foreground">
                  ID · 653fd24a-1395-4927-25cd
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <div className="text-muted-foreground">Created</div>
                    <div className="font-medium mt-0.5">Mar 3, 2026</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Region</div>
                    <div className="font-medium mt-0.5">United States</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Sales Rep</div>
                    <div className="font-medium mt-0.5">TestMerchant</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Email</div>
                    <div className="font-medium mt-0.5 truncate">
                      eromanova@segpay.com
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-accent/40 p-5">
                <div className="flex items-center gap-2 text-accent-foreground">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="text-sm font-semibold">Need help?</span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  Contact your sales representative or email{" "}
                  <a
                    href="mailto:tech@segpay.com"
                    className="text-primary font-medium hover:underline"
                  >
                    tech@segpay.com
                  </a>{" "}
                  for assistance at any step.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

/* ------------------------- Step Content ------------------------- */

function StepContent({ active }: { active: StepId }) {
  switch (active) {
    case "begin":
      return <BeginStep />;
    case "edd":
      return <EddStep />;
    case "company":
      return <CompanyStep />;
    case "directors":
      return <DirectorsStep />;
    case "processing":
      return <ProcessingStep />;
    case "contacts":
      return <ContactsStep />;
    case "documents":
      return <DocumentsStep />;
    case "websites":
      return <WebsitesStep />;
    case "banks":
      return <BanksStep />;
    case "review":
      return <ReviewStep />;
  }
}

function StepShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="max-w-2xl">
        <div className="text-xs uppercase tracking-[0.14em] text-primary font-medium">
          {eyebrow}
        </div>
        <h2 className="font-display text-4xl md:text-5xl mt-2 leading-[1.05]">
          {title}
        </h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">{intro}</p>
      </div>
      <div className="mt-8">{children}</div>
    </div>
  );
}

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="text-xs font-medium text-foreground mb-1.5 flex items-center gap-1">
        {label}
        {required && <span className="text-destructive">*</span>}
      </div>
      {children}
      {hint && <div className="mt-1.5 text-xs text-muted-foreground">{hint}</div>}
    </label>
  );
}

function Input({
  icon: Icon,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="relative">
      {Icon && (
        <Icon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      )}
      <input
        {...props}
        className={`w-full rounded-lg border border-input bg-surface ${
          Icon ? "pl-9" : "pl-3"
        } pr-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-ring transition`}
      />
    </div>
  );
}

function Select({
  icon: Icon,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="relative">
      {Icon && (
        <Icon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      )}
      <select
        {...props}
        className={`w-full appearance-none rounded-lg border border-input bg-surface ${
          Icon ? "pl-9" : "pl-3"
        } pr-9 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-ring transition`}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-border bg-surface p-6 ${className}`}>
      {children}
    </div>
  );
}

function Toggle({ label, defaultOn = false }: { label: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      type="button"
      onClick={() => setOn(!on)}
      className="flex items-start gap-3 text-left"
    >
      <span
        className={`mt-0.5 relative inline-flex h-6 w-11 shrink-0 rounded-full transition ${
          on ? "bg-primary" : "bg-muted"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
            on ? "left-[22px]" : "left-0.5"
          }`}
        />
      </span>
      <span className="text-sm text-foreground">{label}</span>
    </button>
  );
}

/* -------- individual steps -------- */

function BeginStep() {
  return (
    <StepShell
      eyebrow="Step 01"
      title="Welcome to Segpay."
      intro="We're excited to help you grow your business. This short application collects everything we need to activate your merchant account. Progress saves automatically at every step."
    >
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {[
          { t: "Complete all sections", d: "Provide required info for every tab." },
          { t: "Navigate freely", d: "Use tabs at the top or Continue below." },
          { t: "Save & return", d: "Pick up exactly where you left off." },
        ].map((f) => (
          <div key={f.t} className="rounded-xl border border-border bg-surface-muted p-4">
            <div className="text-sm font-semibold">{f.t}</div>
            <div className="text-xs text-muted-foreground mt-1">{f.d}</div>
          </div>
        ))}
      </div>

      <Card className="max-w-xl">
        <Field
          label="Merchant Name"
          required
          hint="Prefilled by our team based on the info you provided. Editable, but should represent your company name."
        >
          <Input icon={User} defaultValue="Bumble Bee and Co" />
        </Field>
      </Card>
    </StepShell>
  );
}

function CompanyStep() {
  return (
    <StepShell
      eyebrow="Step 04"
      title="Company information"
      intro={
        <>
          Tell us about your registered entity. Reach out to{" "}
          <a href="mailto:tech@segpay.com" className="text-primary hover:underline">
            tech@segpay.com
          </a>{" "}
          if any of this needs clarification.
        </>
      }
    >
      <Card>
        <div className="grid md:grid-cols-2 gap-5">
          <Field label="Company Type" required>
            <Select icon={Building2} defaultValue="corp">
              <option value="corp">Corporation</option>
              <option value="llc">LLC</option>
              <option value="sole">Sole Proprietor</option>
            </Select>
          </Field>
          <Field label="Registered Company Name" required>
            <Input icon={Building2} defaultValue="Bumble Bee and Co" />
          </Field>
          <Field label="Registered DBA">
            <Input icon={FileText} placeholder="Doing business as" />
          </Field>
          <Field label="Registration Number" required>
            <Input icon={FileText} placeholder="e.g. 12345678" />
          </Field>
          <Field label="Date of Incorporation" required>
            <Input type="date" />
          </Field>
          <Field label="Country of Incorporation" required>
            <Select>
              <option>United States</option>
              <option>United Kingdom</option>
              <option>Canada</option>
            </Select>
          </Field>
          <Field label="Phone Number" required>
            <Input icon={Phone} placeholder="+1 555 000 0000" />
          </Field>
          <Field label="Tax ID">
            <Input placeholder="EIN / VAT" />
          </Field>
        </div>

        <div className="mt-8 border-t border-border pt-6">
          <h3 className="font-semibold text-sm mb-4">Registered Address</h3>
          <div className="grid md:grid-cols-2 gap-5">
            <Field label="Street Address" required>
              <Input placeholder="123 Market Street" />
            </Field>
            <Field label="City" required>
              <Input placeholder="City" />
            </Field>
            <Field label="State / Province" required>
              <Input placeholder="State" />
            </Field>
            <Field label="ZIP / Postal Code" required>
              <Input placeholder="00000" />
            </Field>
          </div>
          <div className="mt-6">
            <Toggle
              defaultOn
              label="Operating address is the same as registered address"
            />
          </div>
        </div>
      </Card>
    </StepShell>
  );
}

function DirectorsStep() {
  return (
    <StepShell
      eyebrow="Step 04"
      title="Directors & UBOs"
      intro="Provide details for your Directors, Officers, and authorized signatories for Bumble Bee and Co. The first entry must be the Principal."
    >
      <div className="rounded-2xl border border-dashed border-border bg-surface-muted p-8 text-center">
        <Users className="h-10 w-10 mx-auto text-muted-foreground" />
        <div className="mt-3 font-semibold">No owners added yet</div>
        <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
          Add your Principal first — they'll act as the primary representative in
          our system.
        </p>
        <button className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition">
          + Add Owner (Director / UBO)
        </button>
      </div>

      <div className="mt-6 grid md:grid-cols-2 gap-4 text-sm">
        <div className="rounded-xl border border-border bg-surface p-4">
          <div className="font-medium">Ownership must total 100%</div>
          <p className="text-muted-foreground text-xs mt-1">
            Add each owner with their percentage. Corporate owners require details of
            their own owners in a tree structure.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4">
          <div className="font-medium">Editing is easy</div>
          <p className="text-muted-foreground text-xs mt-1">
            Click any row to edit an owner's details or ownership breakdown at any
            time before submission.
          </p>
        </div>
      </div>
    </StepShell>
  );
}

function ProcessingStep() {
  return (
    <StepShell
      eyebrow="Step 04"
      title="Processing details"
      intro="Estimated volumes help us tailor your Segpay processing setup. You can revise these later."
    >
      <Card>
        <Field label="Billing Descriptor" required hint="Appears on the cardholder statement.">
          <Input icon={CreditCard} placeholder="SEGPAY*YOURBRAND" />
        </Field>
        <div className="mt-6 grid md:grid-cols-2 gap-5">
          <Toggle label="Have you processed payments previously?" />
          <Toggle label="Been terminated from accepting bank cards?" />
        </div>
      </Card>

      {[
        { title: "Credit Card Estimated Volumes", key: "cc" },
        { title: "PayPal Estimated Volumes", key: "pp" },
      ].map((section) => (
        <Card key={section.key} className="mt-5">
          <h3 className="font-semibold text-sm">{section.title}</h3>
          <div className="mt-4 grid md:grid-cols-3 gap-5">
            <Field label="Processing Currency" required>
              <Select defaultValue="USD">
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
              </Select>
            </Field>
            <Field label="Estimated Transaction Count" required>
              <Input type="number" placeholder="0" />
            </Field>
            <Field label="Average Transaction Value" required>
              <Input type="number" placeholder="0.00" />
            </Field>
            <Field label="Min Transaction Value" required>
              <Input type="number" placeholder="0.00" />
            </Field>
            <Field label="Max Transaction Value" required>
              <Input type="number" placeholder="0.00" />
            </Field>
            <Field label="Estimated Monthly Sales">
              <Input placeholder="Auto-calculated" disabled />
            </Field>
          </div>
        </Card>
      ))}
    </StepShell>
  );
}

function ContactsStep() {
  return (
    <StepShell
      eyebrow="Step 05"
      title="Contacts"
      intro="Add the people we should reach for day-to-day operations, contracts, and technical questions."
    >
      <Card>
        <h3 className="font-semibold text-sm mb-4">Primary Contact</h3>
        <div className="grid md:grid-cols-2 gap-5">
          <Field label="First Name" required>
            <Input icon={User} />
          </Field>
          <Field label="Last Name" required>
            <Input icon={User} />
          </Field>
          <Field label="Position" required>
            <Input placeholder="e.g. CEO" />
          </Field>
          <Field label="Email Address" required>
            <Input icon={Mail} type="email" />
          </Field>
          <Field label="Phone Number" required>
            <Input icon={Phone} />
          </Field>
          <Field label="Messenger / Social">
            <Select defaultValue="teams">
              <option value="teams">Microsoft Teams</option>
              <option value="slack">Slack</option>
              <option value="telegram">Telegram</option>
            </Select>
          </Field>
        </div>
      </Card>

      <Card className="mt-5">
        <h3 className="font-semibold text-sm mb-4">Contract Signatory</h3>
        <Field label="Signer's Contact">
          <Select>
            <option>No contract signer selected</option>
          </Select>
        </Field>
      </Card>
    </StepShell>
  );
}

function DocumentsStep() {
  const docs = [
    "Tax Document (SS4 or W9 form)",
    "Proof of Address (Utility Bill)",
    "Incorporation Documents",
    "Operating Agreement",
    "Register of Shareholders",
    "Register of Directors",
  ];
  return (
    <StepShell
      eyebrow="Step 06"
      title="Upload documentation"
      intro="Upload the following required documents for Bumble Bee and Co. Drag and drop or click any tile to browse."
    >
      <div className="grid md:grid-cols-2 gap-4">
        {docs.map((d) => (
          <div
            key={d}
            className="group rounded-2xl border border-dashed border-border bg-surface p-6 hover:border-primary hover:bg-accent/30 transition cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition">
                <Upload className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold">{d}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Drop files here or click to browse
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </StepShell>
  );
}

function WebsitesStep() {
  return (
    <StepShell
      eyebrow="Step 07"
      title="Websites"
      intro="Register every domain used with Segpay. Credentials must not expire, and your site must display Billing Support, T&Cs, Privacy Policy, and your Registered Name."
    >
      <Card>
        <h3 className="font-semibold text-sm mb-4">First website</h3>
        <div className="grid md:grid-cols-2 gap-5">
          <Field label="Website URL" required>
            <Input icon={Globe} placeholder="https://" />
          </Field>
          <Field label="Support Email" required>
            <Input icon={Mail} type="email" />
          </Field>
          <Field label="Member Area Username">
            <Input icon={User} />
          </Field>
          <Field label="Member Area Password">
            <Input type="password" />
          </Field>
          <div className="md:col-span-2">
            <Field label="Comment">
              <textarea
                rows={3}
                className="w-full rounded-lg border border-input bg-surface px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-ring transition"
                placeholder="Notes for our review team"
              />
            </Field>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-dashed border-border bg-surface-muted p-5 text-center">
          <Upload className="h-5 w-5 mx-auto text-muted-foreground" />
          <div className="text-sm font-medium mt-2">Website Ownership Proof</div>
          <div className="text-xs text-muted-foreground mt-1">
            Drop the document here or click to select
          </div>
        </div>
      </Card>
    </StepShell>
  );
}

function BanksStep() {
  return (
    <StepShell
      eyebrow="Step 08"
      title="Payment banks"
      intro="Configure at least one bank type. A checkmark next to the type means its configuration is complete. Empty configurations are not accepted."
    >
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { label: "ACH", active: true },
          { label: "Wire", active: false },
          { label: "SEPA", active: false },
        ].map((b) => (
          <button
            key={b.label}
            className={`rounded-2xl border p-5 text-left transition ${
              b.active
                ? "border-primary bg-accent/40"
                : "border-border bg-surface hover:bg-muted"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold">{b.label}</span>
              {b.active && (
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-success text-success-foreground">
                  <Check className="h-3.5 w-3.5" />
                </span>
              )}
            </div>
            <div className="text-xs text-muted-foreground mt-2">
              {b.active ? "Configured" : "Not configured"}
            </div>
          </button>
        ))}
      </div>

      <Card className="mt-6">
        <h3 className="font-semibold text-sm mb-4">Payment Configuration</h3>
        <Field label="Payment Frequency">
          <Select defaultValue="weekly">
            <option value="weekly">Weekly</option>
            <option value="biweekly">Bi-weekly</option>
            <option value="monthly">Monthly</option>
          </Select>
        </Field>
      </Card>
    </StepShell>
  );
}

function ReviewStep() {
  const items = [
    "Company Information",
    "Processing",
    "Primary Contact",
    "Upload Documentation",
    "Websites",
    "Directors & UBOs",
    "Payment Banks",
  ];
  return (
    <StepShell
      eyebrow="Step 09"
      title="Review & submit"
      intro="Please review each section. Uncheck any section that is incomplete and add a comment — we'll send it back for another pass."
    >
      <Card>
        <ul className="divide-y divide-border">
          {items.map((it) => (
            <li key={it} className="flex items-center justify-between py-3">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded border-input text-primary focus:ring-ring/40"
                />
                <span className="text-sm font-medium">{it}</span>
              </label>
              <span className="text-xs text-success font-medium inline-flex items-center gap-1">
                <Check className="h-3.5 w-3.5" /> Complete
              </span>
            </li>
          ))}
        </ul>
        <button className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition">
          <ShieldCheck className="h-4 w-4" /> Accept and create MID
        </button>
      </Card>
    </StepShell>
  );
}
