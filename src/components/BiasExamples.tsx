'use client'

import { useState } from 'react'

interface Example {
  id: string
  title: string
  category: string
  description: string
  problem: string
  impact: string
  solution: string
  icon: string
  color: string
}

export default function BiasExamples({ onComplete }: { onComplete: () => void }) {
  const [selectedExample, setSelectedExample] = useState<string | null>(null)
  const [viewedExamples, setViewedExamples] = useState<Set<string>>(new Set())

  const examples: Example[] = [
    {
      id: 'facial-recognition',
      title: 'Gezichtsherkenning',
      category: 'Computer Vision',
      description: 'AI die gezichten herkent in foto\'s en video\'s',
      problem: 'Werkt slechter bij mensen met een donkere huidskleur omdat het vooral getraind is op foto\'s van witte mensen.',
      impact: 'Mensen worden ten onrechte verdacht van misdaden, of kunnen hun telefoon niet ontgrendelen.',
      solution: 'Trainen met foto\'s van mensen van alle etnische achtergronden.',
      icon: '👤',
      color: 'blue'
    },
    {
      id: 'job-applications',
      title: 'Sollicitatie-algoritmes',
      category: 'HR & Recruitment',
      description: 'AI die cv\'s beoordeelt en kandidaten selecteert',
      problem: 'Discrimineert tegen vrouwen omdat het geleerd heeft van oude sollicitaties waar vooral mannen werden aangenomen.',
      impact: 'Vrouwen krijgen minder kans op bepaalde banen, vooral in technische sectoren.',
      solution: 'Data controleren op genderbias en algoritme aanpassen voor eerlijke selectie.',
      icon: '💼',
      color: 'green'
    },
    {
      id: 'loan-approval',
      title: 'Lening goedkeuring',
      category: 'Financiële diensten',
      description: 'AI die beslist of iemand een lening krijgt',
      problem: 'Wijst vaker leningen af voor mensen uit bepaalde wijken of met bepaalde achternamen.',
      impact: 'Mensen kunnen geen huis kopen of bedrijf starten door discriminatie.',
      solution: 'Verbieden van discriminerende factoren en regelmatige controle op eerlijkheid.',
      icon: '🏦',
      color: 'purple'
    },
    {
      id: 'search-results',
      title: 'Zoekresultaten',
      category: 'Internet & Media',
      description: 'AI die bepaalt welke zoekresultaten je ziet',
      problem: 'Toont stereotypen, zoals alleen mannen bij zoeken naar "CEO" of alleen vrouwen bij "verpleegster".',
      impact: 'Versterkt vooroordelen en beperkt hoe mensen over beroepen denken.',
      solution: 'Bewust diverse resultaten tonen en stereotypen doorbreken.',
      icon: '🔍',
      color: 'orange'
    },
    {
      id: 'voice-assistants',
      title: 'Spraakassistenten',
      category: 'Smart Devices',
      description: 'AI die je stem begrijpt (zoals Siri of Alexa)',
      problem: 'Verstaat accenten en dialecten van bepaalde groepen slechter.',
      impact: 'Mensen kunnen hun apparaten niet goed gebruiken door taalbarrières.',
      solution: 'Trainen met spraakdata van diverse groepen en accenten.',
      icon: '🗣️',
      color: 'red'
    },
    {
      id: 'content-moderation',
      title: 'Content moderatie',
      category: 'Social Media',
      description: 'AI die bepaalt welke posts worden verwijderd',
      problem: 'Verwijdert vaker content van bepaalde groepen of over bepaalde onderwerpen.',
      impact: 'Sommige stemmen worden onderdrukt terwijl andere vrijuit kunnen spreken.',
      solution: 'Diverse teams en transparante regels voor content moderatie.',
      icon: '📱',
      color: 'indigo'
    }
  ]

  const handleExampleClick = (exampleId: string) => {
    setSelectedExample(exampleId)
    setViewedExamples(prev => new Set([...prev, exampleId]))
  }

  const selectedExampleData = examples.find(ex => ex.id === selectedExample)

  const getColorClasses = (color: string, variant: 'bg' | 'text' | 'border') => {
    const colorMap = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
      green: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
      orange: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
      red: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
      indigo: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' }
    }
    return colorMap[color as keyof typeof colorMap]?.[variant] || colorMap.blue[variant]
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          🔍 Bias in de echte wereld
        </h2>
        <p className="text-gray-600 mb-6">
          Ontdek hoe AI bias zich manifesteert in systemen die we dagelijks gebruiken. 
          Klik op een voorbeeld om meer te leren over het probleem en mogelijke oplossingen.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {examples.map((example) => (
          <div
            key={example.id}
            onClick={() => handleExampleClick(example.id)}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedExample === example.id
                ? `${getColorClasses(example.color, 'bg')} ${getColorClasses(example.color, 'border')} shadow-lg`
                : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-3">{example.icon}</span>
              <div>
                <h3 className={`font-semibold ${
                  selectedExample === example.id ? getColorClasses(example.color, 'text') : 'text-gray-800'
                }`}>
                  {example.title}
                </h3>
                <p className="text-xs text-gray-500">{example.category}</p>
              </div>
              {viewedExamples.has(example.id) && (
                <span className="ml-auto text-green-500">✓</span>
              )}
            </div>
            <p className="text-sm text-gray-600">{example.description}</p>
          </div>
        ))}
      </div>

      {selectedExampleData && (
        <div className={`${getColorClasses(selectedExampleData.color, 'bg')} ${getColorClasses(selectedExampleData.color, 'border')} border rounded-xl p-6 mb-6`}>
          <div className="flex items-center mb-4">
            <span className="text-3xl mr-4">{selectedExampleData.icon}</span>
            <div>
              <h3 className={`text-xl font-bold ${getColorClasses(selectedExampleData.color, 'text')}`}>
                {selectedExampleData.title}
              </h3>
              <p className="text-gray-600">{selectedExampleData.category}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-red-700 mb-2 flex items-center">
                🚨 Het probleem
              </h4>
              <p className="text-gray-700 text-sm">{selectedExampleData.problem}</p>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-orange-700 mb-2 flex items-center">
                ⚠️ De impact
              </h4>
              <p className="text-gray-700 text-sm">{selectedExampleData.impact}</p>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-green-700 mb-2 flex items-center">
                💡 De oplossing
              </h4>
              <p className="text-gray-700 text-sm">{selectedExampleData.solution}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
        <h4 className="font-semibold text-yellow-800 mb-2">🤔 Denk na:</h4>
        <ul className="text-yellow-700 text-sm space-y-1">
          <li>• Welk voorbeeld vind je het meest schokkend? Waarom?</li>
          <li>• Kun je nog andere voorbeelden bedenken waar AI bias kan voorkomen?</li>
          <li>• Hoe zou jij ervoor zorgen dat AI eerlijker wordt?</li>
        </ul>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          {viewedExamples.size} van {examples.length} voorbeelden bekeken
        </div>
        
        <button
          onClick={onComplete}
          disabled={viewedExamples.size < 3}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            viewedExamples.size >= 3
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {viewedExamples.size >= 3 ? 'Voltooid! →' : `Bekijk nog ${3 - viewedExamples.size} voorbeelden`}
        </button>
      </div>
    </div>
  )
}