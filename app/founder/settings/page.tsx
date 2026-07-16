import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/app/lib/auth";

export default async function FounderSettingsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const productionUrl =
    process.env.NEXTAUTH_URL || "Not configured";

  const cpxConfigured =
    !!process.env.CPX_CALLBACK_SECRET;

  const databaseConfigured =
    !!process.env.DATABASE_URL;

  return (
    <main className="min-h-screen bg-gray-100">

      <div className="max-w-5xl mx-auto py-12 px-6">

        <h1 className="text-5xl font-bold text-purple-700">
          Founder Settings
        </h1>

        <p className="mt-2 text-gray-600">
          Private operational settings for the Pollacle launch.
        </p>

        <div className="grid gap-6 mt-10">

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold">
              Launch Mode
            </h2>

            <p className="mt-3 text-gray-600">
              Single-Founder Launch
            </p>

            <span className="inline-block mt-4 rounded-full bg-green-100 text-green-700 px-4 py-2 font-semibold">
              ACTIVE
            </span>

            <p className="mt-4 text-sm text-gray-500">
              Public fundraiser creation is disabled.
              Only your founder fundraiser is live.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold">
              CPX Research
            </h2>

            <p className="mt-3">
              Callback Secret:
            </p>

            <span
              className={`inline-block mt-3 rounded-full px-4 py-2 font-semibold ${
                cpxConfigured
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {cpxConfigured ? "Configured" : "Missing"}
            </span>

            <p className="mt-5 font-semibold">
              Callback Endpoint
            </p>

            <code className="block mt-2 bg-gray-100 rounded p-3 break-all text-sm">
              {productionUrl}/api/cpx/callback
            </code>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold">
              Database
            </h2>

            <span
              className={`inline-block mt-4 rounded-full px-4 py-2 font-semibold ${
                databaseConfigured
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {databaseConfigured ? "Connected" : "Missing"}
            </span>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold">
              Founder Account
            </h2>

            <p className="mt-3 text-gray-700">
              {session.user?.email}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold">
              Quick Links
            </h2>

            <div className="flex flex-wrap gap-4 mt-6">

              <Link
                href="/founder"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-bold"
              >
                Dashboard
              </Link>

              <Link
                href="/founder/edit"
                className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-6 py-3 rounded-xl font-bold"
              >
                Edit Fundraiser
              </Link>

              <Link
                href="/founder/analytics"
                className="bg-green-100 hover:bg-green-200 text-green-700 px-6 py-3 rounded-xl font-bold"
              >
                Analytics
              </Link>

              <Link
                href="/"
                className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-xl font-bold"
              >
                Public Site
              </Link>

            </div>
          </div>

        </div>

      </div>

    </main>
  );
}
