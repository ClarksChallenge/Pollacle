import Link from "next/link";

const links = [
  { href: "/fundraisers", label: "Browse Fundraisers" },
  { href: "/card-linking", label: "Card Linking" },
  { href: "/#how", label: "How It Works" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
        <Link href="/" className="text-2xl font-bold text-purple-700">
          Pollacle
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-purple-700 transition"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/fundraisers"
            className="hidden sm:inline-block bg-purple-700 hover:bg-purple-800 text-white px-5 py-2 rounded-xl font-semibold transition"
          >
            Support a Fundraiser
          </Link>

          <details className="relative md:hidden">
            <summary
              aria-label="Open menu"
              className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-xl border border-purple-700 text-purple-700 [&::-webkit-details-marker]:hidden"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </summary>
            <nav className="absolute right-0 mt-3 w-56 rounded-xl border bg-white p-2 shadow-lg">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
