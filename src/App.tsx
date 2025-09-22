import Dashboard from "./pages/Dashboard";
export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-pink-100 ">
      <div className="container mx-auto">
        <header className="p-6 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Flashcards Study App
          </h1>
        </header>
        <Dashboard />
      </div>
    </div>
  );
}
