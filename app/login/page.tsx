export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-purple-50">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

        <h1 className="text-3xl font-bold text-purple-700 text-center">
          Welcome Back
        </h1>

        <p className="mt-2 text-center text-gray-600">
          Sign in to your Pollacle account
        </p>

        <form className="mt-8 space-y-5">

          <div>
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              className="w-full rounded-xl border p-3"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              className="w-full rounded-xl border p-3"
              placeholder="Password"
            />
          </div>

          <button
            className="w-full rounded-xl bg-purple-700 py-3 text-white hover:bg-purple-800"
            type="submit"
          >
            Sign In
          </button>

        </form>

      </div>
    </main>
  );
}