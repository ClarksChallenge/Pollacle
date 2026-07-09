import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

        {/* Logo */}

        <Link
          href="/"
          className="text-2xl font-bold text-purple-700"
        >
          Pollacle
        </Link>


        {/* Navigation */}

        <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">

          <Link
            href="/"
            className="hover:text-purple-700 transition"
          >
            Home
          </Link>

          <Link
            href="/fundraisers"
            className="hover:text-purple-700 transition"
          >
            Browse Fundraisers
          </Link>

          <Link
            href="/#how"
            className="hover:text-purple-700 transition"
          >
            How It Works
          </Link>

          <Link
            href="/about"
            className="hover:text-purple-700 transition"
          >
            About
          </Link>

        </nav>


        {/* Right Side */}

        <div className="flex items-center gap-3">

          <Link
            href="/login"
            className="text-gray-700 hover:text-purple-700"
          >
            Login
          </Link>

          <Link
            href="/create"
            className="bg-purple-700 hover:bg-purple-800 text-white px-5 py-2 rounded-xl font-semibold transition"
          >
            Start a Fundraiser
          </Link>

        </div>

      </div>

    </header>
  );
}
