export default function RestaurantWaitlist() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Restaurant Waitlist</h1>
        <p className="text-lg text-gray-600 mb-8">
          Sign up your restaurant to partner with Share eat! and reach new customers.
        </p>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Restaurant Name</label>
              <input type="text" className="w-full border rounded px-4 py-2" placeholder="Restaurant name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Contact Email</label>
              <input type="email" className="w-full border rounded px-4 py-2" placeholder="contact@restaurant.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Contact Phone</label>
              <input type="tel" className="w-full border rounded px-4 py-2" placeholder="Your phone number" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <input type="text" className="w-full border rounded px-4 py-2" placeholder="City/Address" />
            </div>
            <button type="submit" className="w-full bg-yellow-400 text-black font-semibold py-3 rounded hover:bg-yellow-500 transition">
              Join Restaurant Waitlist
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
