import {
  StrictMode,
  useEffect,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const BOOKING_URL = "https://socalashbeauty.glossgenius.com/";
const INSTAGRAM_URL = "https://www.instagram.com/socalashbeauty";
const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, "");

function assetPath(fileName: string) {
  return `/assets/${fileName}`;
}

function appPath(path: string) {
  return `${BASE_PATH}${path}` || "/";
}

function stripBasePath(pathname: string) {
  if (!BASE_PATH || !pathname.startsWith(BASE_PATH)) {
    return pathname;
  }

  return pathname.slice(BASE_PATH.length) || "/";
}

type LashSet = {
  label: string;
  service: string;
  bestFor: string;
  description: string;
  price: string;
  duration: string;
  deposit: string;
  cta: string;
  image: string;
  imageClass: string;
  alt: string;
};

type Offer = {
  title: string;
  price: string;
  regular: string;
  bestFor: string;
  cta: string;
};

type Service = {
  title: string;
  price: string;
  time: string;
  deposit?: string;
  copy: string;
  cta: string;
};

type ImageItem = [src: string, alt: string];

type GalleryGroup = {
  title: string;
  images: ImageItem[];
};

type LocationState = {
  pathname: "/" | "/new-clients";
  hash: string;
};

const galleryFilters = ["All", "Classic", "Wet Set", "Anime", "Medusa"] as const;

const newClientOffers: Offer[] = [
  {
    title: "Classic Full Set",
    price: "$80 first time price",
    regular: "Regular price $100 after first appointment",
    bestFor: "Best for soft everyday definition.",
    cta: "Book Classic Offer",
  },
  {
    title: "Volume Full Set",
    price: "$110 first time price",
    regular: "Regular price $130 after first appointment",
    bestFor: "Best for a fuller lash line with soft glam dimension.",
    cta: "Book Volume Offer",
  },
  {
    title: "Wet Set / Angel Full Set",
    price: "$110 first time price",
    regular: "Regular price $130 after first appointment",
    bestFor: "Best for textured, defined lashes with soft spikes.",
    cta: "Book Wet Set Offer",
  },
];

const lashSets: LashSet[] = [
  {
    label: "Natural and clean",
    service: "Classic Full Set",
    bestFor: "Best for soft everyday definition and a polished natural look.",
    description:
      "A clean, natural lash enhancement customized for clients who want subtle definition and an effortless everyday finish.",
    price: "$100",
    duration: "120 min",
    deposit: "$20 deposit",
    cta: "Book Classic",
    image: assetPath("classic-1.jpeg"),
    imageClass: "classic-frame",
    alt: "Classic lash extension set with soft natural definition",
  },
  {
    label: "Fuller and soft glam",
    service: "Volume Full Set",
    bestFor: "Best for a fuller lash line with soft glam dimension.",
    description:
      "A fuller set using lightweight fans to create softness, depth and a more defined lash line without feeling heavy.",
    price: "$130",
    duration: "130 min",
    deposit: "$20 deposit",
    cta: "Book Volume",
    image: assetPath("volume-set.jpeg"),
    imageClass: "volume-frame",
    alt: "Volume lash extension set with soft glam fullness",
  },
  {
    label: "Textured and defined",
    service: "Wet Set / Angel Full Set",
    bestFor: "Best for soft spikes, texture and a more styled lash look.",
    description:
      "A textured set designed for definition and dimension, ideal for clients who want a darker lash line with soft spikes.",
    price: "$130",
    duration: "120 min",
    deposit: "$20 deposit",
    cta: "Book Wet Set",
    image: assetPath("wet-set-1.jpeg"),
    imageClass: "wet-frame",
    alt: "Textured wet set lash extensions close up",
  },
  {
    label: "Doll like and editorial",
    service: "Anime Full Set",
    bestFor: "Best for expressive, doll like styling and open eye effect.",
    description:
      "A custom lash set with strategic spikes and styling placement to create a playful, eye opening and editorial look.",
    price: "$150",
    duration: "130 min",
    deposit: "$20 deposit",
    cta: "Book Anime",
    image: assetPath("anime-set-1.jpeg"),
    imageClass: "anime-frame",
    alt: "Anime lash extension styling on a client",
  },
  {
    label: "Bold and dramatic",
    service: "Medusa Manhua Full Set",
    bestFor: "Best for dramatic styling, bold spikes and maximum impact.",
    description:
      "A statement lash set with advanced styling and texture for clients who want a more eye catching, creative finish.",
    price: "$160",
    duration: "135 min",
    deposit: "$20 deposit",
    cta: "Book Medusa",
    image: assetPath("medusa-1.jpeg"),
    imageClass: "medusa-frame",
    alt: "Bold Medusa lash styling detail",
  },
];

const modelSets = [
  ["Classic Model Set", "$60"],
  ["Volume Model Set", "$85"],
  ["Wet Set / Angel Model Set", "$85"],
  ["Anime Model Set", "$100"],
  ["Medusa Manhua Model Set", "$110"],
] as const;

const addOns: Service[] = [
  {
    title: "1 Week Mini Fill",
    price: "$45",
    time: "Quick refresh",
    copy: "A quick refresh for very recent lash sets.",
    cta: "Book Mini Fill",
  },
  {
    title: "2 Week Fill",
    price: "$65",
    time: "Maintenance fill",
    copy: "Refreshes grown out lashes and keeps your set full.",
    cta: "Book 2 Week Fill",
  },
  {
    title: "3 Week Fill",
    price: "$80",
    time: "Fuller maintenance",
    copy: "A fuller maintenance appointment for sets that need more work.",
    cta: "Book 3 Week Fill",
  },
  {
    title: "Lash Removal",
    price: "$30",
    time: "25 min",
    copy: "Safe professional removal to protect your natural lashes.",
    cta: "Book Removal",
  },
  {
    title: "Bottom Lashes",
    price: "$20",
    time: "20 min",
    copy: "Adds lower lash definition for a complete styled look.",
    cta: "Add Bottom Lashes",
  },
];

const heroShowcase = [
  [assetPath("medusa-4.png"), "Bold Medusa lash set portrait"],
  [assetPath("wet-set-2.png"), "Wet set lash detail"],
  [assetPath("medusa-1.jpeg"), "Medusa lash set portrait"],
] as const;

const galleryGroups: GalleryGroup[] = [
  {
    title: "Classic",
    images: [
      [assetPath("classic-2.jpeg"), "Classic lash set detail"],
      [assetPath("classic-3.jpg"), "Classic lash set result"],
    ],
  },
  {
    title: "Wet Set",
    images: [[assetPath("wet-set-3.jpeg"), "Wet set lash result"]],
  },
  {
    title: "Anime",
    images: [
      [assetPath("anime-set-2.jpg"), "Anime lash set detail"],
      [assetPath("anime-set-3.jpeg"), "Anime lash set result"],
    ],
  },
  {
    title: "Medusa",
    images: [[assetPath("medusa-3.jpeg"), "Medusa lash set detail"]],
  },
];

const socialImages = galleryGroups.flatMap((group) => group.images).slice(0, 5);

function normalizePath(pathname: string): LocationState["pathname"] {
  pathname = stripBasePath(pathname);
  return pathname.endsWith("/new-clients") ? "/new-clients" : "/";
}

function getCurrentLocation(): LocationState {
  return {
    pathname: normalizePath(window.location.pathname),
    hash: window.location.hash,
  };
}

function BookingLink({
  children,
  className = "button primary",
  ariaLabel,
}: {
  children: string;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <a className={className} href={BOOKING_URL} aria-label={ariaLabel ?? children}>
      {children}
    </a>
  );
}

function ActionLink({
  children,
  href,
  className = "button secondary",
  ariaLabel,
}: {
  children: string;
  href: string;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <a className={className} href={href} aria-label={ariaLabel ?? children}>
      {children}
    </a>
  );
}

function SiteLink({
  children,
  href,
  onNavigate,
  className,
  ariaLabel,
}: {
  children: ReactNode;
  href: string;
  onNavigate: (href: string) => void;
  className?: string;
  ariaLabel?: string;
}) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    event.preventDefault();
    onNavigate(href);
  }

  return (
    <a className={className} href={href} aria-label={ariaLabel} onClick={handleClick}>
      {children}
    </a>
  );
}

function PalmLogo() {
  return (
    <img className="palm-logo" src={assetPath("soca-palm-logo.png")} alt="" aria-hidden="true" />
  );
}

function Header({
  location,
  onNavigate,
}: {
  location: LocationState;
  onNavigate: (href: string) => void;
}) {
  return (
    <header className="site-header">
      <SiteLink
        className="brand"
        href={appPath("/")}
        ariaLabel="Soca Lash Beauty home"
        onNavigate={onNavigate}
      >
        <PalmLogo />
        <span>Soca Lash Beauty</span>
      </SiteLink>
      <nav aria-label="Main navigation">
        <SiteLink
          className={location.pathname === "/" && location.hash === "#lash-sets" ? "active" : undefined}
          href={appPath("/#lash-sets")}
          onNavigate={onNavigate}
        >
          Lash Sets
        </SiteLink>
        <SiteLink
          className={location.pathname === "/new-clients" ? "active" : undefined}
          href={appPath("/new-clients")}
          onNavigate={onNavigate}
        >
          New Clients
        </SiteLink>
        <SiteLink href={appPath("/#maintenance")} onNavigate={onNavigate}>
          Maintenance
        </SiteLink>
        <SiteLink href={appPath("/#gallery")} onNavigate={onNavigate}>
          Gallery
        </SiteLink>
        <SiteLink href={appPath("/#policies")} onNavigate={onNavigate}>
          Policies
        </SiteLink>
      </nav>
      <BookingLink className="button nav-button">Book Now</BookingLink>
    </header>
  );
}

function HomePage({
  activeGalleryFilter,
  setActiveGalleryFilter,
  onNavigate,
}: {
  activeGalleryFilter: (typeof galleryFilters)[number];
  setActiveGalleryFilter: (filter: (typeof galleryFilters)[number]) => void;
  onNavigate: (href: string) => void;
}) {
  const visibleGalleryGroups =
    activeGalleryFilter === "All"
      ? galleryGroups
      : galleryGroups.filter((group) => group.title === activeGalleryFilter);

  return (
      <main id="top">
        <section className="hero section">
          <div className="hero-copy">
            <p className="eyebrow">Brooklyn Lash Appointments</p>
            <h1>Custom Lash Sets Designed for Your Eyes</h1>
            <p>
              Soft, detailed lash sets by licensed esthetician Sherissa Redhead, styled around
              your eye shape, natural lashes and personal look.
            </p>
            <p className="trust-line">
              First full set includes a complimentary lash consultation.
            </p>
            <div className="hero-actions">
              <BookingLink>Book Your First Set</BookingLink>
              <SiteLink className="button secondary" href={appPath("/new-clients")} onNavigate={onNavigate}>
                View New Client Offer
              </SiteLink>
            </div>
            <p className="hero-note">
              Private appointments in Brooklyn with clean application, custom styling and a focus
              on lash health.
            </p>
          </div>
          <div className="hero-media hero-showcase" aria-label="Featured Soca Lash Beauty work">
            <img className="hero-featured-image" src={heroShowcase[0][0]} alt={heroShowcase[0][1]} />
            <div className="hero-side-images">
              {heroShowcase.slice(1).map(([src, alt]) => (
                <img key={src} src={src} alt={alt} />
              ))}
            </div>
            <div className="float-card">
              <span>Licensed care</span>
              <strong>Custom styling for your natural lashes</strong>
            </div>
          </div>
        </section>

        <section className="trust-strip" aria-label="Soca Lash Beauty highlights">
          <span>Private lash appointments in Brooklyn</span>
          <span>Clean application and lash health focus</span>
          <span>Complimentary consultation for first appointments</span>
        </section>

        <section className="section lash-sets" id="lash-sets">
          <div className="section-heading">
            <p className="eyebrow">Full Sets</p>
            <h2>Choose Your Lash Set</h2>
            <p>Each set is customized to your eye shape, natural lashes and desired look.</p>
          </div>
          <article className="new-client-teaser">
            <div>
              <p className="eyebrow">First Appointment</p>
              <h3>New to Soca Lash Beauty?</h3>
              <p>
                Begin with a complimentary lash consultation and access selected first-time
                pricing on your first full set.
              </p>
            </div>
            <SiteLink className="button secondary" href={appPath("/new-clients")} onNavigate={onNavigate}>
              Explore the New Client Experience
            </SiteLink>
          </article>
          <div className="lash-set-grid">
            {lashSets.map((set) => (
              <article className="lash-set-card" key={set.service}>
                <img className={`lash-set-media ${set.imageClass}`} src={set.image} alt={set.alt} />
                <div className="lash-set-body">
                  <p className="mini">{set.label}</p>
                  <h3>{set.service}</h3>
                  <p className="lash-set-best">{set.bestFor}</p>
                  <p>{set.description}</p>
                  <div className="lash-set-info" aria-label={`${set.service} appointment details`}>
                    <span>{set.price}</span>
                    <span>{set.duration}</span>
                    <span>{set.deposit}</span>
                  </div>
                  <BookingLink className="button small">{set.cta}</BookingLink>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section services" id="maintenance">
          <p className="eyebrow">Returning Clients</p>
          <h2>Maintenance, Fills & Add Ons</h2>
          <p>
            Keep your lash set fresh with fill appointments, safe removals and finishing details.
          </p>
          <div className="addon-grid">
            {addOns.map((service) => (
              <article className="service-card addon" key={service.title}>
                <div className="service-top">
                  <h3>{service.title}</h3>
                  <span>{service.price}</span>
                </div>
                <div className="service-meta">
                  <span>{service.time}</span>
                  {service.deposit && <span>{service.deposit}</span>}
                </div>
                <p>{service.copy}</p>
                <BookingLink className="button small secondary">{service.cta}</BookingLink>
              </article>
            ))}
          </div>
          <article className="returning-card">
            <p className="mini">For Returning Clients</p>
            <h3>Keep your set fresh with regular fills</h3>
            <p>
              Keeping up with your fills helps maintain your look, protect your natural lashes
              and reduce the need for a brand new full set too soon.
            </p>
            <BookingLink className="button secondary">Book a Fill</BookingLink>
          </article>
        </section>

        <section className="section intro" id="gallery">
          <p className="eyebrow">Recent Work</p>
          <h2>A Closer Look</h2>
          <p>A closer look at soft glam, textured sets, anime styling and custom lash designs.</p>
          <div className="filter-pills" aria-label="Gallery categories">
            {galleryFilters.map((filter) => (
              <button
                className={filter === activeGalleryFilter ? "filter-pill active" : "filter-pill"}
                key={filter}
                type="button"
                aria-pressed={filter === activeGalleryFilter}
                onClick={() => setActiveGalleryFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="gallery-groups">
            {visibleGalleryGroups.map((group) => (
              <article className="gallery-group" key={group.title}>
                <h3>{group.title}</h3>
                <div className="gallery-grid">
                  {group.images.map(([src, alt]) => (
                    <img key={src} src={src} alt={alt} />
                  ))}
                </div>
              </article>
            ))}
          </div>
          <ActionLink className="button secondary gallery-cta" href={INSTAGRAM_URL}>
            See More on Instagram
          </ActionLink>
        </section>

        <section className="founder section">
          <img
            className="founder-photo"
            src={assetPath("sherissa-redhead.jpg")}
            alt="Sherissa Redhead, founder of Soca Lash Beauty"
          />
          <div>
            <p className="eyebrow">Meet Your Artist</p>
            <h2>Meet Sherissa</h2>
            <p>
              Soca Lash Beauty is a Brooklyn based lash and beauty brand founded by
              Sherissa Redhead, a licensed esthetician and certified lash technician. Sherissa
              creates custom lash sets with a focus on clean application, comfort, styling and
              lash health.
            </p>
            <p>
              Each set is planned around your eye shape, natural lashes and desired look.
              Whether you want something soft and natural or bold and styled, the goal is to
              create lashes that feel flattering, wearable and detailed.
            </p>
            <p className="signature">building something beautiful</p>
            <BookingLink>Book With Sherissa</BookingLink>
          </div>
        </section>

        <section className="section reasons">
          <p className="eyebrow">Why Book</p>
          <h2>Why Book With Soca Lash Beauty?</h2>
          <div className="reason-grid">
            <article>
              <span>01</span>
              <h3>Custom styling</h3>
              <p>Your set is designed for your eye shape, features and desired look.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Private, focused appointments</h3>
              <p>
                A calm, one to one lash appointment where the focus is on your style, comfort
                and lash health.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>Lash health matters</h3>
              <p>Application is done with care to support retention and protect your natural lashes.</p>
            </article>
            <article>
              <span>04</span>
              <h3>Simple online booking</h3>
              <p>Reserve your appointment online with a deposit where required.</p>
            </article>
          </div>
        </section>

        <section className="section policies" id="policies">
          <p className="eyebrow">Before You Book</p>
          <h2>Booking Policies</h2>
          <p>
            Please arrive on time with clean lashes and no eye makeup. A deposit is required
            to secure most appointments. Late arrivals may reduce service time or require
            rescheduling depending on availability. Cancellations or reschedules should be
            made in advance to respect appointment time.
          </p>
          <div className="policy-list">
            <span>$20 deposit required to secure most full sets and fills</span>
            <span>First time pricing applies to your first full set only</span>
            <span>Deposits may be non refundable but transferable with proper notice</span>
            <span>24 to 48 hours notice is required for cancellations or rescheduling</span>
            <span>Late arrivals may affect appointment completion</span>
            <span>No shows may forfeit the deposit</span>
            <span>Clients should arrive with clean lashes and no eye makeup</span>
          </div>
          <BookingLink>Reserve Your Appointment</BookingLink>
        </section>

        <section className="section social">
          <p className="eyebrow">On Instagram</p>
          <h2>Follow the latest sets</h2>
          <p>Fresh transformations, behind the chair moments, aftercare tips and real availability.</p>
          <div className="social-strip">
            {socialImages.map(([src, alt]) => (
              <img key={src + "social"} src={src} alt={alt} />
            ))}
          </div>
          <a className="button secondary" href={INSTAGRAM_URL} aria-label="Follow Soca Lash Beauty on Instagram">
            Follow on Instagram
          </a>
        </section>

        <section className="section testimonials">
          <p className="eyebrow">Client Love</p>
          <h2>Kind words from the chair</h2>
          <div className="testimonial-grid">
            <blockquote>
              <p>“Sherissa made me feel so comfortable and my lashes came out exactly how I wanted.”</p>
              <cite>Client note</cite>
            </blockquote>
            <blockquote>
              <p>“My set lasted beautifully and felt lightweight.”</p>
              <cite>Client note</cite>
            </blockquote>
            <blockquote>
              <p>“The detail was everything. I felt so pretty after my appointment.”</p>
              <cite>Client note</cite>
            </blockquote>
          </div>
        </section>

        <section className="section model-sets">
          <div>
            <p className="eyebrow">Limited Availability</p>
            <h2>Model Set Opportunities</h2>
            <p>
              Occasionally, Soca Lash Beauty offers discounted model sets for clients who are
              comfortable being photographed or filmed for content. Model pricing is limited,
              style led and requires photo and video consent.
            </p>
            <ul className="model-rules">
              <li>$20 deposit required</li>
              <li>Photo and video consent required</li>
              <li>Style may be guided by Sherissa</li>
              <li>Appointment may take longer due to content creation</li>
              <li>Cannot be combined with first time client offers</li>
              <li>Limited availability only</li>
            </ul>
            <BookingLink className="button secondary">Apply for a Model Set</BookingLink>
          </div>
          <div className="model-grid">
            {modelSets.map(([title, price]) => (
              <article key={title}>
                <h3>{title}</h3>
                <span>{price}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="section waitlist">
          <div>
            <p className="eyebrow">Launching Soon</p>
            <h2>Lash Care Coming Soon</h2>
            <p>
              Soca Lash Beauty is growing into lash care essentials, aftercare kits and
              beauty maintenance products designed to support soft, lasting lashes.
            </p>
          </div>
          <form aria-label="Lash care updates" onSubmit={(event) => event.preventDefault()}>
            <input type="email" placeholder="Your email" aria-label="Email address" />
            <button type="submit">Join the List</button>
          </form>
        </section>

        <section
          className="final-cta"
          style={{ "--final-logo": `url("${assetPath("soca-palm-logo.png")}")` } as CSSProperties}
        >
          <p className="eyebrow">Book Your Appointment</p>
          <h2>Ready for your first set?</h2>
          <p>
            Book your first appointment with Soca Lash Beauty and receive a complimentary lash
            consultation before your full set.
          </p>
          <div className="hero-actions">
            <BookingLink>Book Your First Set</BookingLink>
            <SiteLink className="button secondary" href={appPath("/#lash-sets")} onNavigate={onNavigate}>
              View Lash Sets
            </SiteLink>
          </div>
        </section>
      </main>
  );
}

function NewClientsPage({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <main id="top">
      <section className="section new-client-hero">
        <div className="section-heading">
          <p className="eyebrow">Welcome to Soca Lash Beauty</p>
          <h1>Your First Lash Appointment</h1>
          <p className="subtle-reminder">
            First-time pricing is subject to eligibility and the standard booking policies.
          </p>
          <p>
            Welcome to Soca Lash Beauty. Your first appointment begins with a complimentary lash
            consultation, giving us time to understand your natural lashes, eye shape, lifestyle
            and the look you would like to achieve.
          </p>
          <p>
            Whether you prefer something soft and natural or fuller and more defined, your lash
            set will be tailored to suit you.
          </p>
          <p>
            New clients can book selected full sets at introductory pricing. After your first
            appointment, standard service and maintenance pricing will apply.
          </p>
          <div className="hero-actions centered-actions">
            <SiteLink className="button primary" href={appPath("/new-clients#first-time-offers")} onNavigate={onNavigate}>
              View First-Time Offers
            </SiteLink>
            <BookingLink className="button secondary">Book a Consultation</BookingLink>
          </div>
        </div>
      </section>

      <section className="section offer-section" id="first-time-offers">
        <div className="section-heading">
          <p className="eyebrow">First Appointment</p>
          <h2>Introductory Full Set Offers</h2>
          <p>
            These selected first-time offers include a complimentary consultation so Sherissa can
            recommend a set that suits your natural lashes, eye shape and desired look.
          </p>
        </div>
        <div className="offer-grid">
          {newClientOffers.map((offer) => (
            <article className="offer-card" key={offer.title}>
              <p className="mini">New Client Offer</p>
              <h3>{offer.title}</h3>
              <div className="offer-price">{offer.price}</div>
              <p>{offer.regular}</p>
              <p>{offer.bestFor}</p>
              <p>Includes a complimentary consultation.</p>
              <BookingLink className="button small">{offer.cta}</BookingLink>
            </article>
          ))}
        </div>
        <aside className="terms-note" aria-label="Introductory offer terms">
          <p>
            <strong>Terms apply:</strong> Introductory pricing is available to first-time Soca Lash
            Beauty clients only and is limited to one qualifying full-set appointment per client.
            Offers cannot be combined with other promotions. Deposits, cancellations,
            rescheduling, lateness, maintenance and refill policies still apply. The final
            service may be adjusted following consultation based on the condition and suitability
            of the client’s natural lashes.
          </p>
          <SiteLink className="terms-link" href={appPath("/#policies")} onNavigate={onNavigate}>
            View booking policies
          </SiteLink>
        </aside>
        <article className="before-book-box">
          <h3>Before You Book</h3>
          <p>
            First-time pricing is available to new Soca Lash Beauty clients only and applies to
            one qualifying full-set appointment. Standard pricing applies to future appointments,
            fills and maintenance services.
          </p>
          <p>
            Please arrive with clean lashes and no mascara or eye makeup. A consultation is
            included so your lash artist can recommend the most suitable set for your natural
            lashes and desired look.
          </p>
          <BookingLink>Book Your First Set</BookingLink>
        </article>
      </section>
    </main>
  );
}

function Footer({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <footer>
      <div>
        <SiteLink className="brand" href={appPath("/")} onNavigate={onNavigate}>
          <PalmLogo />
          <span>Soca Lash Beauty</span>
        </SiteLink>
        <p>
          Custom lash sets in Brooklyn, NY by Sherissa Redhead, a licensed esthetician and
          certified lash technician.
        </p>
      </div>
      <div>
        <h2>Explore</h2>
        <SiteLink href={appPath("/#lash-sets")} onNavigate={onNavigate}>
          Lash Sets
        </SiteLink>
        <SiteLink href={appPath("/new-clients")} onNavigate={onNavigate}>
          New Clients
        </SiteLink>
        <SiteLink href={appPath("/#maintenance")} onNavigate={onNavigate}>
          Maintenance
        </SiteLink>
        <SiteLink href={appPath("/#gallery")} onNavigate={onNavigate}>
          Gallery
        </SiteLink>
        <SiteLink href={appPath("/#policies")} onNavigate={onNavigate}>
          Policies
        </SiteLink>
      </div>
      <div>
        <h2>Booking</h2>
        <BookingLink className="footer-link">Book Now</BookingLink>
      </div>
    </footer>
  );
}

function App() {
  const [activeGalleryFilter, setActiveGalleryFilter] =
    useState<(typeof galleryFilters)[number]>("All");
  const [location, setLocation] = useState<LocationState>(getCurrentLocation);

  function navigateTo(href: string) {
    const nextUrl = new URL(href, window.location.origin);
    const nextLocation = {
      pathname: normalizePath(nextUrl.pathname),
      hash: nextUrl.hash,
    };
    const nextPath = `${appPath(nextLocation.pathname)}${nextLocation.hash}`;

    if (nextPath !== `${appPath(location.pathname)}${location.hash}`) {
      window.history.pushState({}, "", nextPath);
    }

    setLocation(nextLocation);
  }

  useEffect(() => {
    function handlePopState() {
      setLocation(getCurrentLocation());
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => {
      if (location.hash) {
        document.querySelector(location.hash)?.scrollIntoView({ behavior: "smooth" });
        return;
      }

      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }, [location]);

  return (
    <>
      <Header location={location} onNavigate={navigateTo} />
      {location.pathname === "/new-clients" ? (
        <NewClientsPage onNavigate={navigateTo} />
      ) : (
        <HomePage
          activeGalleryFilter={activeGalleryFilter}
          setActiveGalleryFilter={setActiveGalleryFilter}
          onNavigate={navigateTo}
        />
      )}

      <Footer onNavigate={navigateTo} />

      <div className="mobile-booking">
        <BookingLink>Book Now</BookingLink>
      </div>
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
