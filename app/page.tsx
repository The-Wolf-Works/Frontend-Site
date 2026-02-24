import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"

/* ── Shared sub-components ─────────────────────────────────── */

function CtaBanner() {
  return (
    <section className="bg-wolf-teal text-white text-center px-6 py-14">
      <h2 className="text-2xl font-bold leading-snug mb-8">
        Have questions? Get in touch with us today!
      </h2>
      <Link
        href="/contact"
        className="inline-block border border-white/80 text-white px-10 py-4 uppercase tracking-widest hover:bg-white hover:text-wolf-teal transition-colors"
      >
        Reach Out
      </Link>
    </section>
  )
}

function CheckItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-4 items-start">
      <span className="shrink-0 mt-0.5">✓</span>
      <span>{children}</span>
    </li>
  )
}

function PricingCard({
  bg,
  title,
  description,
  priceText,
  subNote,
  features,
  ctaLabel,
  ctaHref,
  bestFor,
}: {
  bg: string
  title: string
  description: ReactNode
  priceText: ReactNode
  subNote?: string
  features: string[]
  ctaLabel: string
  ctaHref: string
  bestFor: ReactNode
}) {
  return (
    <div className={`${bg} rounded-2xl p-6 shadow-md mb-6`}>
      <Image
        src="/logo.png"
        alt="The Wolf Works"
        width={120}
        height={40}
        className="mb-6 h-auto w-auto"
        style={{ maxHeight: "40px", width: "auto" }}
      />
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-800 mb-6 leading-relaxed">{description}</p>
      <p className="text-gray-400 text-xl mb-4 leading-snug">{priceText}</p>
      {subNote && <p className="text-gray-700 mb-6">{subNote}</p>}
      <hr className="border-gray-300 mb-6" />
      <ul className="space-y-4 mb-8 text-gray-700 leading-relaxed">
        {features.map((f, i) => (
          <CheckItem key={i}>{f}</CheckItem>
        ))}
      </ul>
      <Link
        href={ctaHref}
        className="block text-center border border-gray-900 text-gray-900 py-4 mb-6 hover:bg-gray-900 hover:text-white transition-colors"
      >
        {ctaLabel}
      </Link>
      <p className="text-gray-700 leading-relaxed">
        <strong>Best for:</strong> {bestFor}
      </p>
    </div>
  )
}

/* ── Page ──────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <>
      <main className="pt-[74px]">

        {/* ── 1. Hero ──────────────────────────────── */}
        <section className="bg-white px-6 pt-12 pb-16">
          <h1
            className="font-thin uppercase leading-none text-gray-900"
            style={{ fontSize: "clamp(3.5rem, 17vw, 8rem)", letterSpacing: "0.04em" }}
          >
            DIGITAL
            <br />
            GROWTH
            <br />
            AGENCY
          </h1>
          <p className="mt-10 text-[1.75rem] font-bold leading-tight text-gray-900">
            We{" "}
            <span className="text-wolf-red">master design</span>
            {" "}to ensure the highest quality of service.
          </p>
        </section>

        {/* ── 2. Audit Card ────────────────────────── */}
        <section className="bg-wolf-dark text-white px-6 py-12">
          <p className="text-sm text-gray-400 mb-5">Website &amp; business review from £15</p>
          <h2 className="text-3xl font-bold leading-snug mb-8">
            Get your website &amp; business review
          </h2>
          <div className="space-y-5 text-gray-300 mb-10">
            <p>Stop guessing. Start growing. Get your AI-Powered digital audit.</p>
            <p>See your website and business through the eyes of your prospective clients.</p>
            <p>The Wolf Works website &amp; business audit start from £15.00 and will arm you with an action plan to increase sales, and grow your business.</p>
            <p>Let The Wolf Works help <strong className="text-white">grow</strong> your business.</p>
          </div>
          <Link
            href="/#pricing"
            className="block text-center border border-white/70 text-white py-4 mb-10 hover:bg-white hover:text-wolf-dark transition-colors"
          >
            Review my website
          </Link>
          {/* Colourful bars — placeholder until actual image is added to /public */}
          <div
            className="w-full h-56 rounded overflow-hidden"
            style={{ background: "linear-gradient(160deg, #0d1b8e 0%, #1a3ad4 60%, #2b5ff5 100%)" }}
            aria-hidden="true"
          >
            <div className="flex items-end justify-center gap-2 h-full px-4">
              {[
                ["#e040fb", "#7c4dff"],
                ["#448aff", "#00bcd4"],
                ["#00e5ff", "#00bfa5"],
                ["#76ff03", "#64dd17"],
                ["#ffea00", "#ff6d00"],
                ["#ff6d00", "#dd2c00"],
                ["#f50057", "#d500f9"],
                ["#651fff", "#304ffe"],
              ].map(([from, to], i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-full"
                  style={{
                    height: `${55 + (i % 3) * 15}%`,
                    background: `linear-gradient(to bottom, ${from}, ${to})`,
                    opacity: 0.9,
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. How It Works ──────────────────────── */}
        <section id="how-it-works" className="bg-white px-6 pt-14 pb-10">
          <h2 className="text-3xl mb-12">
            <span className="font-thin">How it </span>
            <strong>works</strong>
          </h2>

          {/* Step 1 */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-4">Review</h3>
            <p className="text-gray-700 leading-relaxed mb-8">
              Our AI engine and three specialist personas (UX, Strategy, SEO) instantly scan your website or idea for critical flaws. Choose from a £15 initial report, or enhanced specialist reports. All we need is your website URL or business idea.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-xl font-thin text-gray-400 shrink-0">Step 01</span>
              {/* Replace with actual isometric desk illustration */}
              <div
                className="flex-1 h-44 rounded overflow-hidden"
                style={{ background: "linear-gradient(135deg, #1565c0 0%, #42a5f5 100%)" }}
                aria-label="Step 1 illustration"
              />
            </div>
          </div>

          {/* Step 2 */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-4">The plan</h3>
            <p className="text-gray-700 leading-relaxed mb-8">
              From the report we will work with you to find the best solutions to make you stand out against your competitors. We will put together a strategy and explain the detailed quote. If you are happy to proceed, sign the contract and let us get to work.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-xl font-thin text-gray-400 shrink-0">Step 02</span>
              {/* Replace with actual lightbulb illustration */}
              <div
                className="flex-1 h-44 rounded overflow-hidden"
                style={{ background: "linear-gradient(135deg, #f9a825 0%, #ef6c00 100%)" }}
                aria-label="Step 2 illustration"
              />
            </div>
          </div>

          {/* Step 3 */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-4">Launch and learn</h3>
            <p className="text-gray-700 leading-relaxed mb-8">
              Once we have met all your requirements, it is time to push live. Our specialists will work with you to monitor the improvements made. The Wolf Works have your back. Always.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-xl font-thin text-gray-400 shrink-0">Step 03</span>
              {/* Replace with actual rocket illustration */}
              <div
                className="flex-1 h-44 rounded overflow-hidden"
                style={{ background: "#f9a825" }}
                aria-label="Step 3 illustration"
              />
            </div>
          </div>
        </section>

        {/* ── 4. CTA Banner (first) ────────────────── */}
        <CtaBanner />

        {/* ── 5. Pricing Guide ─────────────────────── */}
        <section id="pricing" className="bg-white px-6 pt-14 pb-10">
          <h2 className="text-3xl mb-10">
            <span className="font-thin">Pricing </span>
            <strong>Guide</strong>
          </h2>

          <PricingCard
            bg="bg-white"
            title="Website review"
            description={
              <>
                We love helping businesses and entrepreneurs. Get specialist insights into your website. Laser focused on helping your business <strong>grow</strong>.
              </>
            }
            priceText={
              <>Proprietary AI website reviews from <strong className="text-gray-900">£15</strong></>
            }
            subNote="3 different website reviews including expert human analysis."
            features={[
              "Website review and analysis.",
              "See how you compare to competitors.",
              "Option for expert human review",
              "No strings, no commitments.",
              "Expert feedback on content, strategy, trust signals and growth opportunities.",
            ]}
            ctaLabel="Review my website"
            ctaHref="/review"
            bestFor="All business that want to understand how they are viewed by clients, stand up against competitors & want a clear path to growth."
          />

          <PricingCard
            bg="bg-[#c5caff]"
            title="Business idea review"
            description="We know how to help those looking to develop a business idea. Providing expert reviews, advice and options of mentorship to help you benefit from the learnings of those who have been where you are now."
            priceText={
              <>Business idea reviews and support from <strong className="text-gray-900">£15</strong></>
            }
            subNote="Additional mentorship and guidance available"
            features={[
              "Business idea review.",
              "Developing strategies and business plans.",
              "Finding you business partners and mentorship.",
              "Web build, design and tech support from The Wolf Works.",
            ]}
            ctaLabel="Review my idea"
            ctaHref="/review"
            bestFor="Entrepreneurs at the beginning of the journey. Those who need objective advice & tech support to help turn their business from a dream into a reality."
          />

          <PricingCard
            bg="bg-white"
            title="Consultancy"
            description="The Wolf Works can help provide the expert support to take the findings from the reports, turn that into a plan and make those changes to increase growth."
            priceText="Priced on requirements"
            subNote="Monthly or one-off pricing structures available."
            features={[
              "Taking the insights from the website or business idea review and using our specialists to grow your business.",
              "The right specialist, for the right need.",
              "Expert consultants working to make changes that increase sales.",
              "In house development skills to make updates... Wolf Works fast.",
              "Post release monitoring and measuring with quarterly check ins.",
            ]}
            ctaLabel="Reach out"
            ctaHref="/contact"
            bestFor={
              <>
                Those who want increased sales without worrying about the techy stuff. The Wolf Works are the &lsquo;All skills&rsquo; under one roof agency, that will partner with you to beat the competition at highly competitive consultancy rates. Get in touch with Chris or Michael today.
              </>
            }
          />
        </section>

        {/* ── 6. CTA Banner (second) ───────────────── */}
        <CtaBanner />

        {/* ── 7. Why the Wolf Works ────────────────── */}
        <section className="bg-wolf-dark text-white px-6 py-12">
          <h2 className="text-2xl font-bold mb-6">Why the Wolf works</h2>
          <h3 className="text-lg font-bold mb-6">Insight-led website &amp; business reviews</h3>
          <div className="space-y-5 text-gray-300 leading-relaxed">
            <p>Clarity first. Action made simple.</p>
            <p>No upfront cost to get started. Clear review options. Specialist support when you&apos;re ready to act.</p>
            <p>
              You excel in your professional field — we help you see what&apos;s really happening in your digital presence and business ideas. The Wolf Works provides{" "}
              <strong className="text-white">independent website and business concept reviews</strong>, combining proprietary AI insight with specialist human expertise.
            </p>
            <p>
              We don&apos;t just tell you <em>what</em> could be better — we show you{" "}
              <strong className="text-white">why it matters and how to fix it</strong>, then support you in making those changes{" "}
              <strong className="text-white">without disruption or hassle</strong>.
            </p>
            <p className="font-bold text-white">
              Website reviews · Business idea validation · Specialist-led improvements
            </p>
            <p>Flexible support options available.</p>
          </div>
          {/* Replace with actual rocket illustration */}
          <div
            className="mt-8 w-full h-72 rounded overflow-hidden"
            style={{ background: "#f9a825" }}
            aria-label="Rocket illustration"
          />
        </section>

        {/* ── 8. Team ──────────────────────────────── */}
        <section id="about" className="bg-white px-6 pt-14 pb-16">
          <p className="text-sm font-medium uppercase tracking-widest text-gray-500 text-center mb-3">
            Team
          </p>
          <h2 className="text-3xl text-center mb-10">
            <span className="font-thin">About the </span>
            <strong className="text-wolf-teal">Wolf</strong>
            <br />
            <span className="font-thin">pack</span>
          </h2>

          {/* Michael */}
          <div className="bg-white rounded-2xl shadow-md p-8 mb-6 text-center">
            <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-6" aria-label="Michael photo placeholder" />
            <p className="text-gray-600 mb-2">Lead Engineer / AI Specialist / Founder</p>
            <h3 className="text-2xl font-bold text-wolf-teal mb-4">Michael</h3>
            <p className="text-gray-400 leading-relaxed">
              Michael has been at the forefront of software engineering for over 15 years. With a focus on security and building lightning-fast bespoke websites for the professional services sector.
            </p>
          </div>

          {/* Christopher */}
          <div className="bg-white rounded-2xl shadow-md p-8 text-center">
            <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-6" aria-label="Christopher photo placeholder" />
            <p className="text-gray-600 mb-2">UX Leader / Designer / Founder</p>
            <h3 className="text-2xl font-bold text-wolf-teal mb-4">Christopher</h3>
            <p className="text-gray-400 leading-relaxed">
              Chris is a UX/UI designer in the legal sector focused on matching your needs as a business with those of your clients. With expertise in AI solutions, usability and accessibility.
            </p>
          </div>
        </section>

      </main>

      {/* ── 9. Footer ────────────────────────────── */}
      <footer className="bg-wolf-footer text-white px-6 pt-10 pb-6">
        <Image
          src="/logo.png"
          alt="The Wolf Works"
          width={150}
          height={50}
          className="mb-8 invert"
          style={{ maxHeight: "56px", width: "auto", height: "auto" }}
        />
        <div className="grid grid-cols-2 gap-8 mb-10">
          <div>
            <h4 className="font-bold text-white mb-4">Contact Us</h4>
            <address className="not-italic text-gray-400 leading-loose text-sm">
              <p>The Wolf Works</p>
              <p>Keytes Lane</p>
              <p>Bourton on the Hill</p>
              <p>Gloucestershire</p>
              <p>GL56 9AG</p>
            </address>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Links</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              {[
                { href: "/", label: "Home" },
                { href: "/#how-it-works", label: "How It Works" },
                { href: "/#pricing", label: "Pricing Guide" },
                { href: "/#about", label: "About Us" },
                { href: "/contact", label: "Contact Us" },
                { href: "/privacy-policy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms & Conditions" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="text-gray-500 text-sm">© 2025 Wolf Works.</p>
      </footer>
    </>
  )
}
