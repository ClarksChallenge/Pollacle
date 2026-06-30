export default function Navbar() {
  return (
    <header className="w-full flex items-center justify-between px-8 py-4 border-b">

      <div className="text-xl font-bold text-purple-700">
        🟣 Pollacle
      </div>

      <nav className="flex gap-6 text-gray-600">
        <a href="#" className="hover:text-purple-700">Home</a>
        <a href="#" className="hover:text-purple-700">How it works</a>
        <a href="#" className="hover:text-purple-700">Impact</a>
      </nav>

      <button className="bg-purple-700 text-white px-4 py-2 rounded-xl">
        Start
      </button>

    </header>
  );
}