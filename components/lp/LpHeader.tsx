"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  Menu,
  ArrowUpRight,
  Smartphone,
  HelpCircle,
  Briefcase,
  MapPin,
  ShoppingBag,
  X,
  PhoneCall,
  Phone,
  Headset,
} from "lucide-react";

import LpMobileNav from "../LpMobileNav";
import { useSearchParams } from "next/navigation";

const utilityIcons: Record<string, React.ReactNode> = {
  "Download mibPULSE App": <Smartphone className="h-3.5 w-3.5" />,
  "Have a Question?": <HelpCircle className="h-3.5 w-3.5" />,
  Careers: <Briefcase className="h-3.5 w-3.5" />,
  "Nearest Centres": <MapPin className="h-3.5 w-3.5" />,
  "Shop Now": <ShoppingBag className="h-3.5 w-3.5" />,
};
export const lpNav: any = [
  {
    label: "Why Madhavbaug",
    href: "#why-madhavbaug",
  },
  {
    label: "Doctor-Led Assessment",
    href: "#doctor-led-assessment",
  },
  {
    label: "Who Should Book",
    href: "#who-should-book",
  },
  {
    label: "What Happens Next",
    href: "#what-happens-next",
  },
  {
    label: "FAQs",
    href: "#faqs",
  },
]
interface Data {
  book: string;
  title: string;
}

export default function Navbar({ book, title }: Data) {
  const [active, setActive] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  const source = searchParams.get("utm_source");
  // const activeItem = mainNav.find((i) => i.label === active);
  const createLead = async () => {
    try {
      await fetch("https://powermap.in/api/v1/website/leads/create-page", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": "MB_PROD_yozER_nc6sCpwHAfCQZOe8Go4OvQIiGBQ_QzluQNs",
        },
        body: JSON.stringify({
          campaign: title,
          source: source,
          medium: "Health Us",
        }),
      });
    } catch (error) {
      console.error("Lead API Error:", error);
    }
  };
  // Absolute over the banner at the top; fixed (sticky) once scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the desktop mega-menu on outside click or Escape.
  useEffect(() => {
    if (!active) return;
    const onClick = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setActive(null);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [active]);
  useEffect(() => {
    const handleClick = (e: Event) => {
      const target = e.currentTarget as HTMLAnchorElement;
      const href = target.getAttribute("href");

      if (!href?.startsWith("#")) return;

      e.preventDefault();

      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // URL hash update
        history.replaceState(null, "", href);
      }
    };

    const links = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');

    links.forEach((link) => link.addEventListener("click", handleClick));

    return () => {
      links.forEach((link) => link.removeEventListener("click", handleClick));
    };
  }, []);
  return (
    <header
      className={`${scrolled ? "fixed animate-mm-in" : "absolute"
        } top-0 z-40 w-full`}
    >
      <div className="mx-auto w-full container px-2 sm:px-4 lg:px-5">
        <div
          ref={barRef}
          className="relative overflow-visible rounded-b-2xl bg-white shadow-[0px_4px_21.8px_0px_rgba(0,0,0,0.18)] lg:rounded-b-[32px]"
          onMouseLeave={() => setActive(null)}
        >
          {/* ---------- Utility bar ---------- */}
          {/* <div className="hidden bg-cream lg:block">
            <div className="flex items-center justify-between px-8 py-1.5 text-xs text-gray-700">
              <div className="flex items-center gap-6">
                {utilityLeft.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="flex items-center gap-1.5 hover:text-brand-purple"
                  >
                    {utilityIcons[l.label]}
                    {l.label}
                  </Link>
                ))}
              </div>
              <div className="flex items-center gap-6">
                {utilityRight.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="flex items-center gap-1.5 hover:text-brand-purple"
                  >
                    {utilityIcons[l.label]}
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div> */}

          {/* ---------- Main bar ---------- */}
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8 lg:py-4">
            {/* <Link href="/" className="shrink-0"> */}
            <Image
              src="/assets/logo.png"
              alt="Madhavbaug — Advanced Ayurveda Clinics and Hospitals"
              width={219}
              height={42}
              priority
              className="h-9 w-auto lg:h-7 xl:h-10"
            />
            {/* </Link> */}
            {/* Desktop nav */}
            <nav className="hidden items-center gap-7 lg:flex">
              {lpNav.map((item: any) => (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-expanded={active === item.label}
                  className={`flex items-center gap-1 text-sm lg:text-[13px] xl:text-sm transition-colors ${active === item.label
                    ? "text-brand-purple"
                    : "text-gray-800 hover:text-brand-purple"
                    }`}
                >
                  {item.label}

                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <Link
                onClick={() => {
                  createLead(); // fire-and-forget
                }}
                href={book ? `tel:${book}` : '#book'}
                className="hidden lg:inline-flex items-center group"
              >
                <span className="btn-gradient text-white group-hover:shadow-xl inline-flex items-center gap-2 rounded-full px-5 py-2 xl:py-3 text-sm lg:text-[13px] xl:text-sm font-medium  shadow-lg">
                  {book ? `Call Now` : 'Book a Consultation'}
                </span>
                {book ?
                  <span className="flex  w-8 h-8 xl:w-10 xl:h-10 items-center justify-center rounded-full bg-white/20">
                    <Headset className="font-thin w-full h-full p-2 rounded-full btn-gradient text-white group-hover:rotate-360 group-hover:shadow-xl duration-300 shadow-lg" />
                  </span>
                  :
                  <span className="flex  w-fit h-8 xl:h-10 items-center justify-center rounded-full bg-white/20">
                    <ArrowUpRight className="font-thin w-full h-full p-2 rounded-full btn-gradient text-white group-hover:rotate-45 group-hover:shadow-xl duration-300 shadow-lg" />
                  </span>}
              </Link>
              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                className="rounded-full p-2 text-gray-700 hover:bg-gray-100 lg:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* ---------- Mega-menu panel (desktop) ---------- */}
          {/* {activeItem && (
            <div className="absolute left-0 right-0 top-full z-40 hidden px-2 lg:block">
              <div className="thin-scroll mt-2 max-h-[70vh] overflow-y-auto rounded-2xl border border-gray-100 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
                <LpMegaMenuPanel item={lpNav} />
              </div>
            </div>
          )} */}
        </div>
      </div>
      <LpMobileNav book={book} lpNav={lpNav} open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <>
        {/* Backdrop */}
        <div
          onClick={() => setMobileOpen(false)}
          className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 lg:hidden ${mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
        />

        {/* Drawer */}
        <aside
          className={`thin-scroll fixed right-0 top-0 z-50 flex h-full w-[88%] max-w-sm flex-col overflow-y-auto bg-white shadow-2xl transition-transform duration-300 lg:hidden ${mobileOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <Image src="/assets/logo.png" alt="Madhavbaug" width={160} height={31} />
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 px-5 py-5 space-y-3">
            {lpNav.map((item: any) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                // aria-expanded={active === item.label}
                className={`flex items-center gap-1 text-base transition-colors `}
              >
                {item.label}

              </Link>
            ))}
          </nav>

          <div className="px-5 pb-4">
            <Link
              href={book ? `tel:${book}` : '#book'}
              onClick={() => {
                createLead(); // fire-and-forget
              }}
              // onClick={() => setMobileOpen(false)}
              className="inline-flex w-full items-center group"
            >
              <span className="btn-gradient w-full justify-center text-white group-hover:shadow-xl inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium  shadow-lg">
                {book ? `Call Now` : 'Book a Consultation'}
              </span>
              <span className="flex shrink-0 w-fit h-10 items-center justify-center rounded-full bg-white/20">
              {book ?
                <Headset className="font-thin w-full h-full p-2.5 rounded-full btn-gradient text-white group-hover:rotate-45 group-hover:shadow-xl duration-300 shadow-lg" />
                :
                <ArrowUpRight className="font-thin w-full h-full p-2.5 rounded-full btn-gradient text-white group-hover:rotate-45 group-hover:shadow-xl duration-300 shadow-lg" />
              }
              </span>
            </Link>
          </div>

          {/* <div className="space-y-2 border-t border-gray-100 bg-cream/50 px-5 py-4 text-sm text-gray-600">
          {[...utilityLeft, ...utilityRight].map((l) => (
            <Link key={l.label} href={l.href} onClick={onClose} className="block">
              {l.label}
            </Link>
          ))}
        </div> */}
        </aside>
      </>
      {book ?
      <Link
  onClick={() => {
    createLead(); // fire-and-forget
  }}
  href={book ? `tel:${book}` : "#book"}
  className="fixed bottom-5 right-5 z-50 flex items-center group"
>
  <span className="btn-gradient text-white group-hover:shadow-xl inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium shadow-lg">
    {book ? "Call Now" : "Book a Consultation"}
  </span>

  {book ? (
    <span className="flex w-10 h-10 items-center justify-center">
      <Headset className="w-full h-full p-2 rounded-full btn-gradient text-white group-hover:rotate-[360deg] duration-300 shadow-lg" />
    </span>
  ) : (
    <span className="flex w-10 h-10 items-center justify-center">
      <ArrowUpRight className="w-full h-full p-2 rounded-full btn-gradient text-white group-hover:rotate-45 duration-300 shadow-lg" />
    </span>
  )}
</Link>:''}
    </header>
  );
}
