'use client'

import { useState } from 'react'
import BiasQuiz from './BiasQuiz'
import BiasSimulator from './BiasSimulator'
import BiasExamples from './BiasExamples'
import BiasDiscussion from './BiasDiscussion'

type Section = 'intro' | 'examples' | 'simulator' | 'quiz' | 'discussion' | 'conclusion'

export default function BiasEducationApp() {
  const [currentSection, setCurrentSection] = useState<Section>('intro')
  const [completedSections, setCompletedSections] = useState<Set<Section>>(new Set())

  const markSectionComplete = (section: Section) => {
    setCompletedSections(prev => new Set([...prev, section]))
  }

  const sections = [
    { id: 'intro', title: '📚 Introductie', description: 'Wat is AI bias?' },
    { id: 'examples', title: '🔍 Voorbeelden', description: 'Bias in de praktijk' },
    { id: 'simulator', title: '🧪 Simulator', description: 'Ervaar bias zelf' },
    { id: 'quiz', title: '🎯 Quiz', description: 'Test je kennis' },
    { id: 'discussion', title: '💭 Discussie', description: 'Gevolgen en oplossingen' },
    { id: 'conclusion', title: '🎉 Afsluiting', description: 'Wat heb je geleerd?' }
  ]

  const renderSection = () => {
    switch (currentSection) {
      case 'intro':
        return <IntroSection onComplete={() => markSectionComplete('intro')} />
      case 'examples':
        return <BiasExamples onComplete={() => markSectionComplete('examples')} />
      case 'simulator':
        return <BiasSimulator onComplete={() => markSectionComplete('simulator')} />
      case 'quiz':
        return <BiasQuiz onComplete={() => markSectionComplete('quiz')} />
      case 'discussion':
        return <BiasDiscussion onComplete={() => markSectionComplete('discussion')} />
      case 'conclusion':
        return <ConclusionSection completedSections={completedSections} />
      default:
        return <IntroSection onComplete={() => markSectionComplete('intro')} />
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Navigation */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📍 Jouw leerpad</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setCurrentSection(section.id as Section)}
              className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                currentSection === section.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : completedSections.has(section.id as Section)
                  ? 'bg-green-100 text-green-800 hover:bg-green-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <div className="font-semibold">{section.title}</div>
              <div className="text-xs mt-1 opacity-80">{section.description}</div>
              {completedSections.has(section.id as Section) && (
                <div className="text-green-600 mt-1">✓</div>
              )}
            </button>
          ))}
        </div>
        
        <div className="mt-4 bg-gray-100 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(completedSections.size / sections.length) * 100}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Voortgang: {completedSections.size} van {sections.length} secties voltooid
        </p>
      </div>

      {/* Current Section */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        {renderSection()}
      </div>
    </div>
  )
}

// Intro Section Component
function IntroSection({ onComplete }: { onComplete: () => void }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
    {
      title: "🤖 Wat is Kunstmatige Intelligentie (AI)?",
      content: (
        <div className="space-y-4">
          <p className="text-lg text-gray-700">
            AI is technologie die computers helpt om 'slim' te zijn - zoals herkennen wat er op foto's staat, 
            tekst vertalen, of voorspellen wat je leuk vindt op Netflix.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Voorbeelden van AI die je kent:</h4>
            <ul className="space-y-2 text-blue-700">
              <li>📱 Siri of Google Assistant</li>
              <li>📸 Gezichtsherkenning op je telefoon</li>
              <li>🎵 Spotify aanbevelingen</li>
              <li>🛒 "Mensen die dit kochten, kochten ook..."</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "🧠 Hoe leert AI?",
      content: (
        <div className="space-y-4">
          <p className="text-lg text-gray-700">
            AI leert door naar heel veel voorbeelden te kijken. Net zoals jij leert herkennen wat een hond is 
            door veel honden te zien, leert AI door duizenden voorbeelden te bestuderen.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">👶 Hoe jij leert:</h4>
              <p className="text-green-700">Je ziet veel honden → Je leert wat een hond is</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">🤖 Hoe AI leert:</h4>
              <p className="text-purple-700">AI ziet 1.000.000 foto's van honden → AI leert honden herkennen</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "⚠️ Wat is bias in AI?",
      content: (
        <div className="space-y-4">
          <p className="text-lg text-gray-700">
            <strong>Bias</strong> betekent vooroordeel. Als AI alleen bepaalde soorten voorbeelden ziet, 
            krijgt het vooroordelen - net zoals mensen.
          </p>
          <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
            <h4 className="font-semibold text-red-800 mb-2">🚨 Probleem:</h4>
            <p className="text-red-700">
              Als een AI alleen foto's van witte mensen heeft gezien, kan het moeite hebben 
              met het herkennen van mensen met een andere huidskleur.
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">💡 Belangrijk om te weten:</h4>
            <p className="text-yellow-700">
              AI is niet bewust bevooroordeeld - het leert gewoon van wat het ziet. 
              Maar de gevolgen kunnen wel heel echt zijn!
            </p>
          </div>
        </div>
      )
    }
  ]

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      onComplete()
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {slides[currentSlide].title}
        </h2>
        {slides[currentSlide].content}
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
        >
          ← Vorige
        </button>

        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {currentSlide === slides.length - 1 ? 'Voltooid! →' : 'Volgende →'}
        </button>
      </div>
    </div>
  )
}

// Conclusion Section Component
function ConclusionSection({ completedSections }: { completedSections: Set<Section> }) {
  const totalSections = 5 // excluding conclusion itself
  const completionRate = (completedSections.size / totalSections) * 100

  return (
    <div className="text-center space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">🎉 Gefeliciteerd!</h2>
      
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Je hebt {completedSections.size} van {totalSections} secties voltooid!
        </h3>
        
        <div className="bg-white rounded-full h-4 mb-4">
          <div 
            className="bg-gradient-to-r from-green-500 to-blue-500 h-4 rounded-full transition-all duration-500"
            style={{ width: `${completionRate}%` }}
          />
        </div>
        
        <p className="text-gray-700">
          {completionRate === 100 
            ? "Perfect! Je bent nu een echte AI Bias Detective! 🕵️‍♀️"
            : "Ga terug om alle secties te voltooien en een echte AI expert te worden!"
          }
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h4 className="text-lg font-semibold text-blue-800 mb-3">🧠 Wat heb je geleerd?</h4>
          <ul className="text-left space-y-2 text-blue-700">
            <li>✓ Wat AI bias is en hoe het ontstaat</li>
            <li>✓ Voorbeelden van bias in echte AI-systemen</li>
            <li>✓ Hoe bias mensen kan benadelen</li>
            <li>✓ Waarom diversiteit in data belangrijk is</li>
            <li>✓ Hoe we bias kunnen verminderen</li>
          </ul>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg">
          <h4 className="text-lg font-semibold text-purple-800 mb-3">🚀 Wat kun je nu?</h4>
          <ul className="text-left space-y-2 text-purple-700">
            <li>✓ Bias herkennen in AI-systemen</li>
            <li>✓ Kritisch nadenken over AI-beslissingen</li>
            <li>✓ Anderen uitleggen waarom bias gevaarlijk is</li>
            <li>✓ Bijdragen aan eerlijkere AI in de toekomst</li>
          </ul>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
        <h4 className="text-lg font-semibold text-yellow-800 mb-3">💡 Onthoud dit:</h4>
        <p className="text-yellow-700 text-lg">
          "AI is zo eerlijk als de mensen die het maken en de data die het gebruikt. 
          Jij kunt helpen om AI eerlijker te maken door bewust te zijn van bias!"
        </p>
      </div>

      <div className="pt-6">
        <p className="text-gray-600">
          Deel je nieuwe kennis met vrienden en familie! 
          Hoe meer mensen weten over AI bias, hoe beter we het kunnen voorkomen. 🌟
        </p>
      </div>
    </div>
  )
}