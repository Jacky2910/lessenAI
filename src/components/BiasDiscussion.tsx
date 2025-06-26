'use client'

import { useState } from 'react'

interface DiscussionTopic {
  id: string
  title: string
  description: string
  questions: string[]
  scenarios: string[]
  icon: string
  color: string
}

export default function BiasDiscussion({ onComplete }: { onComplete: () => void }) {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [exploredTopics, setExploredTopics] = useState<Set<string>>(new Set())
  const [userResponses, setUserResponses] = useState<{[key: string]: string}>({})

  const topics: DiscussionTopic[] = [
    {
      id: 'dangers',
      title: 'Gevaren van AI Bias',
      description: 'Welke schade kan AI bias aanrichten in de samenleving?',
      questions: [
        'Wat gebeurt er als een AI-systeem voor sollicitaties vrouwen discrimineert?',
        'Hoe kan bias in gezichtsherkenning leiden tot onterechte arrestaties?',
        'Waarom is bias in leningsystemen gevaarlijk voor bepaalde groepen?',
        'Wat zijn de gevolgen als AI in de zorg bepaalde groepen benadeelt?'
      ],
      scenarios: [
        'Een AI-systeem voor sollicitaties wijst systematisch vrouwen af voor technische functies',
        'Gezichtsherkenning identificeert onschuldige mensen ten onrechte als verdachten',
        'Een AI voor leningen discrimineert tegen mensen uit bepaalde wijken',
        'Een medische AI geeft slechtere diagnoses voor bepaalde etnische groepen'
      ],
      icon: '⚠️',
      color: 'red'
    },
    {
      id: 'prevention',
      title: 'Bias Voorkomen',
      description: 'Hoe kunnen we ervoor zorgen dat AI eerlijker wordt?',
      questions: [
        'Waarom is diverse trainingsdata zo belangrijk?',
        'Hoe kunnen diverse teams helpen bij het maken van eerlijkere AI?',
        'Wat is de rol van regelmatige testing op bias?',
        'Hoe kunnen we AI-systemen transparanter maken?'
      ],
      scenarios: [
        'Een tech-bedrijf stelt een divers team samen om AI bias te voorkomen',
        'Onderzoekers testen hun AI-systeem op verschillende groepen mensen',
        'Een overheid maakt wetten over eerlijke AI in sollicitatieprocedures',
        'Een bedrijf publiceert hoe hun AI-algoritme werkt voor transparantie'
      ],
      icon: '🛡️',
      color: 'green'
    },
    {
      id: 'responsibility',
      title: 'Wie is Verantwoordelijk?',
      description: 'Wie moet ervoor zorgen dat AI eerlijk is?',
      questions: [
        'Zijn programmeurs verantwoordelijk voor bias in hun AI?',
        'Wat is de rol van bedrijven die AI maken en verkopen?',
        'Hoe kunnen overheden helpen bij het voorkomen van AI bias?',
        'Wat kunnen gewone mensen doen om AI eerlijker te maken?'
      ],
      scenarios: [
        'Een programmeur ontdekt bias in het systeem dat hij heeft gemaakt',
        'Een bedrijf moet kiezen tussen winst en eerlijke AI',
        'De overheid overweegt wetten over AI bias',
        'Burgers protesteren tegen discriminerende AI-systemen'
      ],
      icon: '⚖️',
      color: 'blue'
    },
    {
      id: 'future',
      title: 'De Toekomst van AI',
      description: 'Hoe ziet een wereld met eerlijke AI eruit?',
      questions: [
        'Hoe zou een perfecte, bias-vrije AI eruit zien?',
        'Welke nieuwe problemen kunnen ontstaan als AI eerlijker wordt?',
        'Hoe kunnen we ervoor zorgen dat toekomstige AI eerlijk blijft?',
        'Wat is jouw rol in het creëren van eerlijkere AI?'
      ],
      scenarios: [
        'Een wereld waar AI-systemen alle mensen eerlijk behandelen',
        'Nieuwe uitdagingen die ontstaan bij het maken van perfecte AI',
        'Jongeren die opgroeien met bewustzijn van AI bias',
        'Technologie die automatisch bias detecteert en corrigeert'
      ],
      icon: '🚀',
      color: 'purple'
    }
  ]

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopic(topicId)
    setExploredTopics(prev => new Set([...prev, topicId]))
  }

  const handleResponseChange = (questionId: string, response: string) => {
    setUserResponses(prev => ({
      ...prev,
      [questionId]: response
    }))
  }

  const selectedTopicData = topics.find(t => t.id === selectedTopic)

  const getColorClasses = (color: string) => {
    const colorMap = {
      red: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', button: 'bg-red-600 hover:bg-red-700' },
      green: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', button: 'bg-green-600 hover:bg-green-700' },
      blue: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', button: 'bg-blue-600 hover:bg-blue-700' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', button: 'bg-purple-600 hover:bg-purple-700' }
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          💭 Discussie: Gevolgen en Oplossingen
        </h2>
        <p className="text-gray-600 mb-6">
          Nu je weet wat AI bias is en hoe het werkt, gaan we dieper in op de gevolgen 
          en wat we eraan kunnen doen. Kies een onderwerp om te verkennen.
        </p>
      </div>

      {/* Topic Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {topics.map((topic) => (
          <div
            key={topic.id}
            onClick={() => handleTopicSelect(topic.id)}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedTopic === topic.id
                ? `${getColorClasses(topic.color).bg} ${getColorClasses(topic.color).border} shadow-lg`
                : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-3">{topic.icon}</span>
              <div>
                <h3 className={`font-semibold ${
                  selectedTopic === topic.id ? getColorClasses(topic.color).text : 'text-gray-800'
                }`}>
                  {topic.title}
                </h3>
              </div>
              {exploredTopics.has(topic.id) && (
                <span className="ml-auto text-green-500">✓</span>
              )}
            </div>
            <p className="text-sm text-gray-600">{topic.description}</p>
          </div>
        ))}
      </div>

      {/* Selected Topic Content */}
      {selectedTopicData && (
        <div className={`${getColorClasses(selectedTopicData.color).bg} ${getColorClasses(selectedTopicData.color).border} border rounded-xl p-6 mb-6`}>
          <div className="flex items-center mb-4">
            <span className="text-3xl mr-4">{selectedTopicData.icon}</span>
            <div>
              <h3 className={`text-xl font-bold ${getColorClasses(selectedTopicData.color).text}`}>
                {selectedTopicData.title}
              </h3>
              <p className="text-gray-600">{selectedTopicData.description}</p>
            </div>
          </div>

          {/* Scenarios */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-3">🎭 Scenario's om over na te denken:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {selectedTopicData.scenarios.map((scenario, index) => (
                <div key={index} className="bg-white p-3 rounded-lg text-sm">
                  <span className="font-medium text-gray-700">Scenario {index + 1}:</span>
                  <p className="text-gray-600 mt-1">{scenario}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Discussion Questions */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">🤔 Denkvragen:</h4>
            <div className="space-y-4">
              {selectedTopicData.questions.map((question, index) => (
                <div key={index} className="bg-white p-4 rounded-lg">
                  <p className="font-medium text-gray-800 mb-2">{question}</p>
                  <textarea
                    value={userResponses[`${selectedTopicData.id}-${index}`] || ''}
                    onChange={(e) => handleResponseChange(`${selectedTopicData.id}-${index}`, e.target.value)}
                    placeholder="Schrijf hier je gedachten..."
                    className="w-full p-2 border border-gray-200 rounded text-sm resize-none"
                    rows={2}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Class Discussion Prompts */}
      <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg mb-6">
        <h4 className="font-semibold text-yellow-800 mb-3">👥 Voor klassendiscussie:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h5 className="font-medium text-yellow-700 mb-2">Discussiepunten:</h5>
            <ul className="space-y-1 text-yellow-600">
              <li>• Welk voorbeeld van AI bias vind je het meest schokkend?</li>
              <li>• Hoe kunnen scholen helpen bij het voorkomen van AI bias?</li>
              <li>• Wat zou jij doen als je bias ontdekt in een AI-systeem?</li>
              <li>• Hoe ziet een eerlijke AI-toekomst eruit?</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-yellow-700 mb-2">Activiteiten:</h5>
            <ul className="space-y-1 text-yellow-600">
              <li>• Debat: "AI moet volledig transparant zijn"</li>
              <li>• Rollenspel: Verschillende stakeholders in AI bias</li>
              <li>• Onderzoek: Zoek echte voorbeelden van AI bias</li>
              <li>• Ontwerp: Maak een plan voor eerlijke AI</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Key Takeaways */}
      <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg mb-6">
        <h4 className="font-semibold text-blue-800 mb-3">🎯 Belangrijkste inzichten:</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-3 rounded-lg">
            <h5 className="font-medium text-blue-700 mb-1">⚠️ Gevaren</h5>
            <p className="text-blue-600 text-sm">AI bias kan discriminatie versterken en mensen benadelen</p>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <h5 className="font-medium text-green-700 mb-1">🛡️ Oplossingen</h5>
            <p className="text-green-600 text-sm">Diverse teams, eerlijke data en regelmatige testing</p>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <h5 className="font-medium text-purple-700 mb-1">🚀 Toekomst</h5>
            <p className="text-purple-600 text-sm">Jij kunt helpen bij het maken van eerlijkere AI</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          {exploredTopics.size} van {topics.length} onderwerpen verkend
        </div>
        
        <button
          onClick={onComplete}
          disabled={exploredTopics.size < 2}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            exploredTopics.size >= 2
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {exploredTopics.size >= 2 ? 'Voltooid! →' : `Verken nog ${2 - exploredTopics.size} onderwerpen`}
        </button>
      </div>
    </div>
  )
}