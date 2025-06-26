'use client'

import { useState } from 'react'

interface DataPoint {
  id: number
  name: string
  gender: 'man' | 'vrouw'
  age: number
  education: string
  experience: number
  skills: number
  hired: boolean
}

export default function BiasSimulator({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedDataset, setSelectedDataset] = useState<'biased' | 'balanced' | null>(null)
  const [simulationResults, setSimulationResults] = useState<any>(null)
  const [hasRunSimulation, setHasRunSimulation] = useState(false)

  // Biased dataset (mostly men hired)
  const biasedDataset: DataPoint[] = [
    { id: 1, name: 'Jan', gender: 'man', age: 28, education: 'HBO', experience: 3, skills: 8, hired: true },
    { id: 2, name: 'Piet', gender: 'man', age: 32, education: 'WO', experience: 5, skills: 7, hired: true },
    { id: 3, name: 'Klaas', gender: 'man', age: 26, education: 'HBO', experience: 2, skills: 6, hired: true },
    { id: 4, name: 'Anna', gender: 'vrouw', age: 29, education: 'WO', experience: 4, skills: 9, hired: false },
    { id: 5, name: 'Lisa', gender: 'vrouw', age: 31, education: 'HBO', experience: 6, skills: 8, hired: false },
    { id: 6, name: 'Emma', gender: 'vrouw', age: 27, education: 'WO', experience: 3, skills: 7, hired: false },
    { id: 7, name: 'Tom', gender: 'man', age: 30, education: 'HBO', experience: 4, skills: 6, hired: true },
    { id: 8, name: 'Sophie', gender: 'vrouw', age: 28, education: 'WO', experience: 5, skills: 9, hired: false }
  ]

  // Balanced dataset
  const balancedDataset: DataPoint[] = [
    { id: 1, name: 'Jan', gender: 'man', age: 28, education: 'HBO', experience: 3, skills: 8, hired: true },
    { id: 2, name: 'Anna', gender: 'vrouw', age: 29, education: 'WO', experience: 4, skills: 9, hired: true },
    { id: 3, name: 'Piet', gender: 'man', age: 32, education: 'WO', experience: 5, skills: 7, hired: true },
    { id: 4, name: 'Lisa', gender: 'vrouw', age: 31, education: 'HBO', experience: 6, skills: 8, hired: true },
    { id: 5, name: 'Klaas', gender: 'man', age: 26, education: 'HBO', experience: 2, skills: 6, hired: false },
    { id: 6, name: 'Emma', gender: 'vrouw', age: 27, education: 'WO', experience: 3, skills: 7, hired: false },
    { id: 7, name: 'Tom', gender: 'man', age: 30, education: 'HBO', experience: 4, skills: 6, hired: false },
    { id: 8, name: 'Sophie', gender: 'vrouw', age: 28, education: 'WO', experience: 5, skills: 9, hired: true }
  ]

  const newCandidates = [
    { name: 'Maria', gender: 'vrouw', age: 30, education: 'WO', experience: 4, skills: 8 },
    { name: 'Ahmed', gender: 'man', age: 29, education: 'HBO', experience: 3, skills: 7 },
    { name: 'Fatima', gender: 'vrouw', age: 27, education: 'WO', experience: 5, skills: 9 },
    { name: 'Lars', gender: 'man', age: 31, education: 'HBO', experience: 4, skills: 6 }
  ]

  const runSimulation = () => {
    if (!selectedDataset) return

    const dataset = selectedDataset === 'biased' ? biasedDataset : balancedDataset
    
    // Simulate AI learning from the dataset
    const menHired = dataset.filter(p => p.gender === 'man' && p.hired).length
    const menTotal = dataset.filter(p => p.gender === 'man').length
    const womenHired = dataset.filter(p => p.gender === 'vrouw' && p.hired).length
    const womenTotal = dataset.filter(p => p.gender === 'vrouw').length

    const menHireRate = menHired / menTotal
    const womenHireRate = womenHired / womenTotal

    // Predict new candidates based on learned bias
    const predictions = newCandidates.map(candidate => {
      const baseScore = (candidate.skills * 0.4) + (candidate.experience * 0.3) + 
                       (candidate.education === 'WO' ? 3 : 2) + (candidate.age > 25 ? 1 : 0)
      
      // Apply gender bias if using biased dataset
      let finalScore = baseScore
      if (selectedDataset === 'biased') {
        finalScore = candidate.gender === 'man' ? baseScore + 2 : baseScore - 1
      }

      return {
        ...candidate,
        predicted: finalScore > 8,
        confidence: Math.min(95, Math.max(60, finalScore * 10))
      }
    })

    setSimulationResults({
      dataset: selectedDataset,
      trainingStats: {
        menHireRate: Math.round(menHireRate * 100),
        womenHireRate: Math.round(womenHireRate * 100)
      },
      predictions
    })
    setHasRunSimulation(true)
  }

  const steps = [
    {
      title: "🎯 Doel van de simulatie",
      content: (
        <div className="space-y-4">
          <p className="text-lg text-gray-700">
            Je gaat nu zelf ervaren hoe AI bias ontstaat! We simuleren een AI-systeem dat 
            sollicitanten beoordeelt voor een baan.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Wat ga je doen?</h4>
            <ol className="list-decimal list-inside space-y-1 text-blue-700">
              <li>Kiezen welke data de AI gebruikt om te leren</li>
              <li>De AI laten voorspellen wie wordt aangenomen</li>
              <li>Zien hoe verschillende data tot verschillende resultaten leidt</li>
            </ol>
          </div>
        </div>
      )
    },
    {
      title: "📊 Kies je trainingsdata",
      content: (
        <div className="space-y-6">
          <p className="text-gray-700">
            De AI moet leren van oude sollicitaties. Welke dataset wil je gebruiken?
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              onClick={() => setSelectedDataset('biased')}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedDataset === 'biased' 
                  ? 'border-red-500 bg-red-50' 
                  : 'border-gray-200 hover:border-red-300'
              }`}
            >
              <h4 className="font-semibold text-red-700 mb-2">📈 Dataset A (Historische data)</h4>
              <p className="text-sm text-gray-600 mb-3">
                Echte data van de afgelopen 10 jaar van een tech-bedrijf
              </p>
              <div className="text-xs space-y-1">
                <div>👨 Mannen aangenomen: 75%</div>
                <div>👩 Vrouwen aangenomen: 25%</div>
              </div>
            </div>

            <div 
              onClick={() => setSelectedDataset('balanced')}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedDataset === 'balanced' 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-200 hover:border-green-300'
              }`}
            >
              <h4 className="font-semibold text-green-700 mb-2">⚖️ Dataset B (Aangepaste data)</h4>
              <p className="text-sm text-gray-600 mb-3">
                Gecorrigeerde data voor eerlijke vertegenwoordiging
              </p>
              <div className="text-xs space-y-1">
                <div>👨 Mannen aangenomen: 50%</div>
                <div>👩 Vrouwen aangenomen: 50%</div>
              </div>
            </div>
          </div>

          {selectedDataset && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="font-semibold mb-2">Trainingsdata preview:</h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                {(selectedDataset === 'biased' ? biasedDataset : balancedDataset).map(person => (
                  <div key={person.id} className={`p-2 rounded ${person.hired ? 'bg-green-100' : 'bg-red-100'}`}>
                    <div className="font-medium">{person.name}</div>
                    <div>{person.gender === 'man' ? '👨' : '👩'} {person.age}j</div>
                    <div>Skills: {person.skills}/10</div>
                    <div className={person.hired ? 'text-green-700' : 'text-red-700'}>
                      {person.hired ? '✅ Aangenomen' : '❌ Afgewezen'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )
    },
    {
      title: "🤖 AI training & voorspellingen",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <button
              onClick={runSimulation}
              disabled={!selectedDataset || hasRunSimulation}
              className={`px-6 py-3 rounded-lg font-semibold text-lg ${
                !selectedDataset || hasRunSimulation
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {hasRunSimulation ? '✅ Simulatie voltooid' : '🚀 Start AI training'}
            </button>
          </div>

          {simulationResults && (
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">📊 Wat de AI heeft geleerd:</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {simulationResults.trainingStats.menHireRate}%
                    </div>
                    <div className="text-sm text-gray-600">Mannen aangenomen in training</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {simulationResults.trainingStats.womenHireRate}%
                    </div>
                    <div className="text-sm text-gray-600">Vrouwen aangenomen in training</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">🔮 AI voorspellingen voor nieuwe kandidaten:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {simulationResults.predictions.map((candidate: any, index: number) => (
                    <div 
                      key={index}
                      className={`p-4 rounded-lg border-2 ${
                        candidate.predicted 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-red-500 bg-red-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold">{candidate.name}</div>
                        <div className="text-lg">
                          {candidate.gender === 'man' ? '👨' : '👩'}
                        </div>
                      </div>
                      <div className="text-sm space-y-1 mb-3">
                        <div>Leeftijd: {candidate.age}</div>
                        <div>Opleiding: {candidate.education}</div>
                        <div>Ervaring: {candidate.experience} jaar</div>
                        <div>Skills: {candidate.skills}/10</div>
                      </div>
                      <div className={`text-center font-semibold ${
                        candidate.predicted ? 'text-green-700' : 'text-red-700'
                      }`}>
                        {candidate.predicted ? '✅ AANGENOMEN' : '❌ AFGEWEZEN'}
                        <div className="text-xs opacity-75">
                          Zekerheid: {candidate.confidence}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`p-4 rounded-lg ${
                simulationResults.dataset === 'biased' 
                  ? 'bg-red-50 border border-red-200' 
                  : 'bg-green-50 border border-green-200'
              }`}>
                <h4 className="font-semibold mb-2">
                  {simulationResults.dataset === 'biased' ? '⚠️ Bias gedetecteerd!' : '✅ Eerlijke resultaten!'}
                </h4>
                <p className="text-sm">
                  {simulationResults.dataset === 'biased' 
                    ? 'De AI heeft geleerd dat mannen vaker worden aangenomen, dus voorspelt het dat vrouwen minder kans hebben - zelfs als ze even gekwalificeerd zijn!'
                    : 'De AI heeft geleerd van eerlijke data, dus beoordeelt het kandidaten op hun kwalificaties, niet op hun geslacht.'
                  }
                </p>
              </div>
            </div>
          )}
        </div>
      )
    }
  ]

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {steps[currentStep].title}
        </h2>
        {steps[currentStep].content}
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
        >
          ← Vorige
        </button>

        <div className="flex space-x-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentStep ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextStep}
          disabled={currentStep === 2 && !hasRunSimulation}
          className={`px-4 py-2 rounded-lg transition-colors ${
            (currentStep === 2 && !hasRunSimulation)
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {currentStep === steps.length - 1 ? 'Voltooid! →' : 'Volgende →'}
        </button>
      </div>
    </div>
  )
}