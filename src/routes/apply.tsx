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

export const Route = createFileRoute("/apply")({
  component: OnboardingPage,
});

type StepId =
  | "begin"
  | "edd"
  | "company"
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
  { id: "company", label: "Company Information", icon: Building2 },
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
        <Icon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
      )}
      <input
        {...props}
        className={`w-full rounded-lg border border-transparent bg-[#f5f5f5] ${
          Icon ? "pl-9" : "pl-3"
        } pr-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-ring transition`}
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
        <Icon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
      )}
      <select
        {...props}
        className={`w-full appearance-none rounded-lg border border-transparent bg-[#f5f5f5] ${
          Icon ? "pl-9" : "pl-3"
        } pr-9 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-ring transition`}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
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
      eyebrow="Step 03"
      title="Company Information"
      intro={
        <>
          Tell us about your registered entity and the people who own or control it.
          Reach out to{" "}
          <a href="mailto:tech@segpay.com" className="text-primary hover:underline">
            tech@segpay.com
          </a>{" "}
          if any of this needs clarification.
        </>
      }
    >
      <Card>
        <h3 className="font-semibold text-sm mb-4">Registered Entity</h3>
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

      <Card className="mt-5">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h3 className="font-semibold text-sm">Directors & UBOs</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Add every Director, Officer, and Ultimate Beneficial Owner. The first
              entry must be the Principal.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition">
            + Add Owner
          </button>
        </div>

        <div className="mt-5 rounded-xl border-2 border-dashed border-gray-300 bg-[#f5f5f5] p-8 text-center">
          <Users className="h-10 w-10 mx-auto text-primary" />
          <div className="mt-3 font-semibold">No owners added yet</div>
          <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
            Add your Principal first — they'll act as the primary representative in our system.
          </p>
        </div>

        <div className="mt-5 grid md:grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg border border-border bg-surface-muted p-3">
            <div className="font-medium text-xs">Ownership must total 100%</div>
            <p className="text-muted-foreground text-xs mt-1 leading-relaxed">
              Corporate owners require details of their own owners in a tree structure.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-surface-muted p-3">
            <div className="font-medium text-xs">Editing is easy</div>
            <p className="text-muted-foreground text-xs mt-1 leading-relaxed">
              Click any row to edit an owner's details or ownership breakdown before submission.
            </p>
          </div>
        </div>
      </Card>
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
            className="group rounded-2xl border-2 border-dashed border-gray-300 bg-[#f5f5f5] p-6 hover:border-primary hover:bg-accent/30 transition cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center transition">
                <Upload className="h-5 w-5 text-primary" />
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
                className="w-full rounded-lg border border-transparent bg-[#f5f5f5] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-ring transition"
                placeholder="Notes for our review team"
              />
            </Field>
          </div>
        </div>

        <div className="mt-5 rounded-xl border-2 border-dashed border-gray-300 bg-[#f5f5f5] p-5 text-center">
          <Upload className="h-5 w-5 mx-auto text-primary" />
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

/* -------------------- EDD (Adult Content Due Diligence) -------------------- */

function ContentTypeCheck({
  label,
  defaultChecked = false,
}: {
  label: string;
  defaultChecked?: boolean;
}) {
  const [on, setOn] = useState(defaultChecked);
  return (
    <button
      type="button"
      onClick={() => setOn(!on)}
      className={`w-full flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition ${
        on
          ? "border-primary bg-accent/40 text-foreground"
          : "border-border bg-surface hover:bg-muted"
      }`}
    >
      <span className="flex items-center gap-3">
        <span
          className={`flex h-5 w-5 items-center justify-center rounded border transition ${
            on ? "border-primary bg-primary text-primary-foreground" : "border-input bg-surface"
          }`}
        >
          {on && <Check className="h-3.5 w-3.5" />}
        </span>
        <span className="font-medium">{label}</span>
      </span>
      <HelpCircle className="h-4 w-4 text-primary/70" />
    </button>
  );
}

function Tag({
  tone = "neutral",
  children,
}: {
  tone?: "neutral" | "success" | "info";
  children: React.ReactNode;
}) {
  const map = {
    neutral: "bg-muted text-muted-foreground",
    success: "bg-success/15 text-success",
    info: "bg-primary/10 text-primary",
  } as const;
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${map[tone]}`}
    >
      {children}
    </span>
  );
}

function YesNo({ name }: { name: string }) {
  return (
    <div className="grid grid-cols-2 gap-3 mt-3 max-w-md">
      {["Yes", "No"].map((v) => (
        <label
          key={v}
          className="flex items-center gap-2.5 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm cursor-pointer hover:bg-muted transition"
        >
          <input
            type="radio"
            name={name}
            className="h-4 w-4 text-primary focus:ring-ring/40 border-input"
          />
          <span>{v}</span>
        </label>
      ))}
    </div>
  );
}

function UploadTile({
  title,
  bullets,
}: {
  title: string;
  bullets: string[];
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <div className="flex items-center gap-2">
        <h4 className="font-semibold text-sm">{title}</h4>
        <span className="text-destructive text-sm">*</span>
      </div>
      <div className="mt-2 text-xs text-muted-foreground">Your uploaded document must address:</div>
      <ul className="mt-2 list-disc pl-5 space-y-1 text-xs text-muted-foreground leading-relaxed">
        {bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
      <div className="mt-4 rounded-xl border-2 border-dashed border-gray-300 bg-[#f5f5f5] p-5 text-center hover:border-primary hover:bg-accent/30 transition cursor-pointer">
        <Upload className="h-5 w-5 mx-auto text-primary" />
        <div className="mt-2 text-sm font-medium">Add «{title}»</div>
        <div className="text-xs text-muted-foreground mt-0.5">
          Drag files here or click to select
        </div>
      </div>
    </div>
  );
}

function QuestionCard({
  n,
  question,
  tag = "All Merchants",
  tone = "success",
  hint,
  children,
}: {
  n: number;
  question: string;
  tag?: string;
  tone?: "success" | "info" | "neutral";
  hint?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <div className="flex items-start gap-3 flex-wrap">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold shrink-0">
          {n}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 flex-wrap">
            <p className="text-sm font-semibold text-foreground">{question}</p>
            <Tag tone={tone}>{tag}</Tag>
            <span className="text-destructive">*</span>
          </div>
          {hint && (
            <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{hint}</p>
          )}
          {children ?? <YesNo name={`q${n}`} />}
        </div>
      </div>
    </div>
  );
}

function EddStep() {
  const uploads = [
    {
      title: "Content Moderation Policy & Procedure",
      bullets: [
        "Step-by-step content review and approval process of all content before publication",
        "Acceptable content guidelines and list of prohibited content types",
        "All third-party tools used, and whether review is automated, manual, or both",
        "What is the volume reviewed by human moderators",
        "Size of the moderation team",
        "How age / ID verification and consent is collected for in-house produced content",
        "For licensed content, how models are age / ID verified and consent collected",
        "How non-compliant or illegal content is handled, and how offenders are dealt with",
        "Controls preventing the site from being used to facilitate human trafficking or abuse",
        "How marketing and search terms referencing child exploitation are restricted",
        "For live streaming: 24/7 monitoring, sampling, termination and identity controls",
      ],
    },
    {
      title: "Law Enforcement Contact Procedure",
      bullets: [
        "What circumstances trigger contact with law enforcement",
        "Who within your organisation handles these contacts",
      ],
    },
    {
      title: "Anti-Modern Slavery & Human Trafficking Statement",
      bullets: [
        "Proactive measures preventing the website(s) from facilitating human trafficking, sex trafficking, physical abuse, or prostitution",
        "List any organisations you work with or have active membership with",
      ],
    },
    {
      title: "Content Creator ID Verification & Consent Procedure",
      bullets: [
        "How you perform age and ID verification of content providers (collection and validation of government-issued ID)",
        "How written consent is collected from all content providers",
        "How you ensure providers verify age / ID and obtain consent from all individuals appearing in their content",
      ],
    },
    {
      title: "Sample of Written Agreement",
      bullets: [
        "A sample written agreement with a third-party / content provider. (If not in English, include a translation.)",
      ],
    },
    {
      title: "Consumer Age Verification Policy & Procedure",
      bullets: [
        "Technical measures and processes used to verify that users accessing adult content are aged 18 or over",
        "Name all third-party providers used",
      ],
    },
    {
      title: "Complaint & Content Removal Policy & Procedure",
      bullets: [
        "Complaint process for content or activity which is illegal or violates Card Brand rules",
        "Process for individuals depicted in content to appeal for removal",
        "Timeframes for resolution",
      ],
    },
  ];

  return (
    <StepShell
      eyebrow="Step 02"
      title="Adult Content Due Diligence"
      intro="Complete all questions and uploads based on your content types. This form adapts to your selections — required items must be completed before you can submit."
    >
      {/* Merchant identifiers */}
      <Card>
        <div className="grid md:grid-cols-2 gap-5">
          <Field label="Merchant Name" required>
            <Input icon={User} defaultValue="SegPay QA Team" readOnly />
          </Field>
          <Field label="Merchant Contact Email" required>
            <Input icon={Mail} defaultValue="qateam@segpay.com" readOnly />
          </Field>
        </div>
      </Card>

      {/* Before you begin */}
      <div className="mt-6 rounded-2xl border border-border bg-surface p-6">
        <h3 className="font-display text-2xl">Before You Begin</h3>
        <p className="text-sm text-muted-foreground mt-2">
          These questions apply to all your websites, paid and free, if any of the following apply:
        </p>
        <ul className="mt-2 list-disc pl-6 text-sm text-muted-foreground space-y-1">
          <li>Content is shared between your free and paid site(s)</li>
          <li>Your paid site(s) benefit directly or indirectly from ad revenue generated by your free site(s)</li>
        </ul>
        <div className="mt-4 rounded-xl border-l-4 border-primary/60 bg-primary/5 p-4">
          <div className="text-xs font-semibold text-foreground">Note:</div>
          <ul className="mt-1 list-disc pl-5 text-xs text-muted-foreground space-y-1 leading-relaxed">
            <li>Upload all required policies and answer all required questions.</li>
            <li>Some questions require a brief written summary in addition to policy documents.</li>
            <li>Incomplete or missing information will prevent submission.</li>
            <li>Use Save to come back later.</li>
            <li>Contact your Segpay Account Manager if you need assistance.</li>
          </ul>
        </div>
      </div>

      {/* Content types */}
      <div className="mt-6 rounded-2xl border border-border bg-surface p-6">
        <h3 className="font-display text-2xl leading-tight">
          What type of content is available on the website(s) you are boarding with Segpay?
        </h3>
        <p className="text-sm text-muted-foreground mt-2">
          Select all that apply. You cannot proceed without answering this question.
        </p>
        <div className="mt-4 grid gap-3">
          <ContentTypeCheck label="Studio produced (in-house)" />
          <ContentTypeCheck label="Studio produced (licensed content)" />
          <ContentTypeCheck label="User generated" />
          <ContentTypeCheck label="Livestreaming" defaultChecked />
          <ContentTypeCheck label="Fan sites" />
          <ContentTypeCheck label="Other (please specify)" />
        </div>
      </div>

      {/* Section 1: Policies & Procedures */}
      <div className="mt-8">
        <h3 className="font-display text-2xl">Section 1 · Policies & Procedures (Document Uploads)</h3>
        <p className="mt-2 text-sm text-muted-foreground max-w-3xl">
          Upload each required policy / procedure document below. The bullet points under each are
          the topics your document must address — they are not questions to answer here. Documents
          must be detailed and cover all listed points; where third-party providers are used, name
          them. Screenshots of system functionality are highly desirable.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          If you wish to merge multiple PDFs,{" "}
          <a className="text-primary hover:underline" href="#">click here</a>. If you wish to
          convert files to PDFs,{" "}
          <a className="text-primary hover:underline" href="#">click here</a>.
        </p>
        <div className="mt-5 grid md:grid-cols-2 gap-4">
          {uploads.map((u) => (
            <UploadTile key={u.title} title={u.title} bullets={u.bullets} />
          ))}
        </div>
      </div>

      {/* Section 2: Questionnaire */}
      <div className="mt-10">
        <h3 className="font-display text-2xl">Section 2 · Questionnaire</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Important: All questions below are mandatory. Name any third-party service providers
          where relevant.
        </p>

        <div className="mt-5 space-y-4">
          <QuestionCard
            n={1}
            question="Do you have controls in place to prevent the following content on your website(s)?"
            hint="This includes real, implied, AI-generated or animated content: (a) CSAM (Child sexual abuse material), (b) Bestiality, (c) Rape / Hate / Violence (including but not limited to hypnosis, drug / alcohol use, extreme content, racial slurs, etc.), (d) Non-consensual activity."
          />
          <QuestionCard
            n={2}
            question="Do you prohibit third-party processing (aggregation / factoring) on your website(s)?"
            hint="You may only process payments for websites you own and have registered with Segpay."
          />
          <QuestionCard
            n={3}
            question="Provide non-expiring login credentials with full access to all content and services."
            hint="The login must have 2FA disabled and no IP address restrictions. Segpay requires full access to assess your website for compliance. Failure to provide this will likely delay or result in rejection."
          >
            <div className="grid md:grid-cols-2 gap-4 mt-3">
              <Field label="Username" required>
                <Input icon={User} defaultValue="elenaro@segpay.com" />
              </Field>
              <Field label="Password" required>
                <Input type="password" defaultValue="••••••••••" />
              </Field>
            </div>
          </QuestionCard>
          <QuestionCard
            n={4}
            question="Is all website content reviewed before publishing to confirm it is legal and complies with Card Brand rules and bank policy?"
          />
          <QuestionCard
            n={5}
            question="Do you have a policy allowing individuals depicted in content to request its removal, and a process to action valid requests?"
          />
          <QuestionCard
            n={6}
            question="Do you have a complaint process to allow reporting of illegal or Card-Brand-violating content, and resolve complaints within five (5) business days, including removal of content?"
          >
            <div className="mt-3 space-y-4">
              {[
                "a. Complaint process in place",
                "b. Resolved within 5 business days",
                "c. Illegal content removed immediately",
              ].map((sub, i) => (
                <div key={sub}>
                  <div className="text-xs font-medium">{sub}</div>
                  <YesNo name={`q6${i}`} />
                </div>
              ))}
            </div>
          </QuestionCard>
          <QuestionCard n={7} question="Transparency reporting (required by card brands)">
            <div className="mt-3 space-y-4">
              <div>
                <div className="text-xs font-medium">
                  a. Will you submit monthly reports via the Segpay Merchant Portal detailing any
                  flagged content, removals, takedowns or complaints, by the 5th of the following
                  month?
                </div>
                <YesNo name="q7a" />
              </div>
              <div>
                <div className="text-xs font-medium">
                  b. If there is nothing to report for the prior month, will you submit a "Zero
                  Incident Report" via the Segpay Merchant Portal, by the 5th of the following
                  month?
                </div>
                <YesNo name="q7b" />
              </div>
            </div>
          </QuestionCard>
          <QuestionCard
            n={8}
            question="Do you have policies in place to prohibit your website(s) from being used to promote or facilitate human trafficking, sex trafficking, physical abuse, or prostitution?"
            hint="Active membership in an anti-human trafficking and anti-child exploitation organization is strongly recommended."
          />
          <QuestionCard
            n={9}
            question="Do you prohibit marketing and search terms that reference or allude to child exploitation or non-consensual activities?"
          />
          <QuestionCard
            n={10}
            question="Do you prohibit the use of content which is potentially illegal or violates card brand rules for attracting users to your website(s)?"
            hint="Includes advertisements, keywords or affiliate marketing."
          />
          <QuestionCard
            n={11}
            question="Explain the process you follow when content or behaviour that is illegal or violates card brand rules is identified, whether by a studio, performer, or user."
          >
            <div className="mt-3">
              <div className="text-xs font-medium mb-1.5">Your response</div>
              <textarea
                rows={4}
                className="w-full rounded-lg border border-transparent bg-[#f5f5f5] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-ring transition"
                placeholder="Describe your process…"
              />
            </div>
          </QuestionCard>
          <QuestionCard
            n={12}
            question="Do you comply with all applicable age-verification laws for consumers, in every country and state you do not block, before granting access to content?"
          />
          <QuestionCard
            n={13}
            question="What consumer age verification method(s) do you use? (select all that apply)"
          >
            <div className="mt-3 grid gap-3">
              <ContentTypeCheck label="Third-party service" />
              <ContentTypeCheck label="SFW content shown before sign-up, with age verification via a third-party service" />
              <ContentTypeCheck label="Blocking countries / states where age verification is required" />
              <ContentTypeCheck label="Other" />
            </div>
          </QuestionCard>
          <QuestionCard
            n={14}
            question="Do you block UK-based customers from purchasing on your website(s)?"
          />
          <QuestionCard
            n={15}
            tag="Licensed Content"
            tone="info"
            question="Are record-keeping and age-verification records (18 USC 2257 documents) requested for each content producer / studio to validate all models?"
          />
          <QuestionCard
            n={16}
            question="Do you allow content providers to upload, broadcast, stream, or generate content on any of your website(s)?"
            hint="A 'content provider' is a third-party user who uploads or generates content on your site (separate from in-house / licensed studios)."
          />
          <QuestionCard
            n={17}
            tag="User Generated"
            tone="info"
            question="Do you have written agreements in place with each content provider who uploads or generates content on your website(s)?"
            hint="If content creators are only required to tick T&Cs on the website during the registration process, you must provide evidence including an electronic signature, date / time stamp and IP address."
          />
        </div>
      </div>
    </StepShell>
  );
}
