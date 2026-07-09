import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t mt-20 bg-white">

      <div className="max-w-7xl mx-auto px-8 py-12 grid md:grid-cols-3 gap-10">


        {/* Brand */}

        <div>

          <h2 className="text-2xl font-bold text-purple-700">
            🐙 Pollacle
          </h2>

          <p className="mt-4 text-gray-600 leading-7">
            Turning survey participation into meaningful support
            for communities, creators, schools, and organizations.
          </p>

        </div>



        {/* Explore */}

        <div>

          <h3 className="font-bold text-gray-900 mb-4">
            Explore
          </h3>


          <div className="space-y-3 text-gray-600">

            <Link
              href="/"
              className="block hover:text-purple-700"
            >
              Home
            </Link>


            <Link
              href="/about"
              className="block hover:text-purple-700"
            >
              About Pollacle
            </Link>


            <Link
              href="/create"
              className="block hover:text-purple-700"
            >
              Create Fundraiser
            </Link>


            <Link
              href="/dashboard"
              className="block hover:text-purple-700"
            >
              Creator Dashboard
            </Link>

          </div>

        </div>




        {/* Trust */}

        <div>

          <h3 className="font-bold text-gray-900 mb-4">
            Trust & Support
          </h3>


          <div className="space-y-3 text-gray-600">


            <Link
              href="/privacy"
              className="block hover:text-purple-700"
            >
              Privacy Policy
            </Link>


            <Link
              href="/terms"
              className="block hover:text-purple-700"
            >
              Terms of Service
            </Link>


            <Link
              href="/contact"
              className="block hover:text-purple-700"
            >
              Contact Us
            </Link>


          </div>

        </div>


      </div>




      <div className="border-t py-6 text-center text-gray-500 text-sm">

        © {new Date().getFullYear()} Pollacle. All rights reserved.

      </div>


    </footer>
  );
}
