export default function KOLWaitlist() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">KOL Waitlist</h1>
        <p className="text-lg text-gray-600 mb-8">
          Join our KOL (Key Opinion Leader) program and be part of the Share eat! community.
        </p>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input type="text" className="w-full border rounded px-4 py-2" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input type="email" className="w-full border rounded px-4 py-2" placeholder="your@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Social Media Handle</label>
              <input type="text" className="w-full border rounded px-4 py-2" placeholder="@yourhandle" />
            </div>
            <button type="submit" className="w-full bg-yellow-400 text-black font-semibold py-3 rounded hover:bg-yellow-500 transition">
              Join KOL Waitlist
            </button>
          </form>
        </div>
        
        <p className="text-center mt-6">
          <a href="/#/" className="text-yellow-600 hover:underline">← Back to Home</a>
        </p>
      </div>
    </div>
  );
}
