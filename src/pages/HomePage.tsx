export default function HomePage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold mb-4">Share eat!</h1>
        <p className="text-xl text-gray-600 mb-12">Eat Free. Go Viral. Together.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a href="/#/kol" className="block p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-bold mb-3">KOL Waitlist</h2>
            <p className="text-gray-600">Join our influencer program and grow with Share eat!</p>
          </a>
          
          <a href="/#/restaurant" className="block p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-bold mb-3">Restaurant Waitlist</h2>
            <p className="text-gray-600">Partner with us and reach new customers today.</p>
          </a>
        </div>
        
        <div className="mt-8">
          <a href="/#/privacy" className="text-yellow-600 hover:underline">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
}
