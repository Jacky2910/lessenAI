import BiasEducationApp from '@/components/BiasEducationApp'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            AI Bias Detective
          </h1>
          
          <p className="text-xl text-blue-700 font-medium mb-6">
            Ontdek hoe vooroordelen in AI-systemen ontstaan en wat de gevolgen zijn
          </p>

          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">🎯 Wat ga je leren?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-blue-600 font-medium">📚 Wat is AI bias?</div>
                <div className="text-gray-600 mt-1">Begrijpen hoe vooroordelen ontstaan</div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <div className="text-purple-600 font-medium">🔍 Voorbeelden herkennen</div>
                <div className="text-gray-600 mt-1">Bias spotten in echte situaties</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-green-600 font-medium">⚠️ Gevolgen begrijpen</div>
                <div className="text-gray-600 mt-1">Impact op de samenleving</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main App */}
        <BiasEducationApp />

        {/* Footer */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-4 text-blue-600">
            <span>🧠</span>
            <span>Leren over AI bias is belangrijk voor de toekomst!</span>
            <span>🚀</span>
          </div>
          <p className="text-gray-500 text-sm mt-2">
            AI Bias Detective • Educatieve tool voor 1 HAVO • Powered by AI
          </p>
        </div>
      </div>
    </div>
  )
}