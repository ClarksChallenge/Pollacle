"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {

  return (

    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-8">

      <div className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-md w-full">

        <h1 className="text-4xl font-bold text-purple-700 mb-4">
          Welcome to Pollacle
        </h1>

        <p className="text-gray-600 mb-8">
          Sign in to create and manage your fundraisers.
        </p>

        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl"
        >
          Continue with Google
        </button>

      </div>

    </main>

  );

}
