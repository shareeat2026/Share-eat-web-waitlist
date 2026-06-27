export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p className="text-gray-700">
              Share eat! ("we", "us", "our", or "Company") operates the Share eat! website and application. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our service.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Information Collection and Use</h2>
            <p className="text-gray-700 mb-4">
              We collect several different types of information for various purposes to provide and improve our service.
            </p>
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-semibold mb-2">Types of data collected:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Personal Information (name, email, phone)</li>
                <li>Usage Data (how you interact with our service)</li>
                <li>Location Data (if permitted)</li>
                <li>Device Information</li>
              </ul>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Use of Data</h2>
            <p className="text-gray-700">
              Share eat! uses the collected data for various purposes, including but not limited to providing and maintaining our service, notifying you about changes, and allowing you to participate in interactive features of our service.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Security of Data</h2>
            <p className="text-gray-700">
              The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions about this Privacy Policy, please contact us at hello@shareeat.io
            </p>
          </section>
        </div>
        
        <p className="text-center mt-12">
          <a href="/#/" className="text-yellow-600 hover:underline">← Back to Home</a>
        </p>
      </div>
    </div>
  );
}
