'use client'

import { useState } from 'react'

interface Question {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
  category: string
}

export default function BiasQuiz({ onComplete }: { onComplete: () => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<boolean[]>([])

  const questions: Question[] = [
    {
      id: 1,
      question: "Wat is de hoofdoorzaak van bias in AI-systemen?",
      options: [
        "AI is van nature bevooroordeeld",
        "De trainingsdata bevat vooroordelen",
        "AI wil mensen discrimineren",
        "Computers zijn racistisch"
      ],
      correct: 1,
      explanation: "AI leert van de data die het krijgt. Als die data vooroordelen bevat (bijvoorbeeld meer foto's van witte mensen), dan leert de AI ook die vooroordelen.",
      category: "Basis begrip"
    },
    {
      id: 2,
      question: "Een gezichtsherkenning-AI werkt slechter bij mensen met een donkere huidskleur. Wat is de meest waarschijnlijke oorzaak?",
      options: [
        "Donkere huid is moeilijker te herkennen",
        "De AI is getraind met vooral foto's van witte mensen",
        "De camera's zijn van slechte kwaliteit",
        "Het is toeval"
      ],
      correct: 1,
      explanation: "Als een AI vooral getraind is op foto's van witte mensen, leert het die gezichten beter herkennen. Dit is een klassiek voorbeeld van bias door onvolledige trainingsdata.",
      category: "Praktijkvoorbeeld"
    },
    {
      id: 3,
      question: "Een sollicitatie-AI wijst vaker vrouwen af, ook al zijn ze even gekwalificeerd. Hoe kan dit worden opgelost?",
      options: [
        "Vrouwen moeten betere cv's schrijven",
        "De AI vervangen door een nieuwe",
        "De trainingsdata controleren en aanpassen voor genderbias",
        "Alleen mannen laten solliciteren"
      ],
      correct: 2,
      explanation: "De oplossing is om de trainingsdata te onderzoeken en aan te passen zodat het eerlijk is voor alle geslachten. Ook moet het algoritme getest worden op bias.",
      category: "Oplossingen"
    },
    {
      id: 4,
      question: "Waarom is bias in AI gevaarlijk voor de samenleving?",
      options: [
        "Het maakt computers langzamer",
        "Het versterkt discriminatie en ongelijkheid",
        "Het kost veel geld",
        "Het is niet gevaarlijk"
      ],
      correct: 1,
      explanation: "AI bias kan bestaande discriminatie versterken en nieuwe ongelijkheden creëren, bijvoorbeeld in sollicitaties, leningen, of rechtspraak. Dit schaadt mensen en de samenleving.",
      category: "Maatschappelijke impact"
    },
    {
      id: 5,
      question: "Wat is de beste manier om bias in AI te voorkomen?",
      options: [
        "Alleen mannen laten programmeren",
        "Diverse teams en diverse trainingsdata gebruiken",
        "AI helemaal niet meer gebruiken",
        "Alleen eenvoudige AI maken"
      ],
      correct: 1,
      explanation: "Diverse teams (verschillende achtergronden) en diverse, representatieve trainingsdata zijn essentieel om bias te voorkomen. Ook regelmatige testing op eerlijkheid is belangrijk.",
      category: "Preventie"
    },
    {
      id: 6,
      question: "Een AI-systeem voor leningen wijst vaker mensen uit bepaalde wijken af. Dit is een voorbeeld van:",
      options: [
        "Goede risicobeoordeling",
        "Geografische bias",
        "Toeval",
        "Correcte werking"
      ],
      correct: 1,
      explanation: "Dit is geografische bias, waarbij de AI discrimineert op basis van woonplaats. Dit kan leiden tot oneerlijke behandeling van mensen uit bepaalde buurten.",
      category: "Bias herkenning"
    }
  ]

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return
    
    setSelectedAnswer(answerIndex)
    setShowExplanation(true)
    
    const isCorrect = answerIndex === questions[currentQuestion].correct
    setAnswers([...answers, isCorrect])
    
    if (isCorrect) {
      setScore(score + 1)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      onComplete()
    }
  }

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100
    if (percentage >= 80) return 'text-green-600'
    if (percentage >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100
    if (percentage >= 80) return "Uitstekend! Je begrijpt AI bias heel goed! 🌟"
    if (percentage >= 60) return "Goed gedaan! Je hebt de basis goed begrepen. 👍"
    return "Je kunt nog wat bijleren over AI bias. Geen probleem! 📚"
  }

  if (currentQuestion >= questions.length) {
    return (
      <div className="text-center space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">🎉 Quiz voltooid!</h2>
        
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
          <div className={`text-4xl font-bold mb-2 ${getScoreColor()}`}>
            {score} / {questions.length}
          </div>
          <div className="text-lg text-gray-700 mb-4">
            {Math.round((score / questions.length) * 100)}% correct
          </div>
          <div className="text-gray-600">
            {getScoreMessage()}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">✅ Goed beantwoord:</h4>
            <div className="space-y-1">
              {questions.map((q, index) => (
                answers[index] && (
                  <div key={q.id} className="text-sm text-green-700">
                    Vraag {index + 1}: {q.category}
                  </div>
                )
              ))}
            </div>
          </div>

          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-semibold text-red-800 mb-2">❌ Nog oefenen:</h4>
            <div className="space-y-1">
              {questions.map((q, index) => (
                !answers[index] && (
                  <div key={q.id} className="text-sm text-red-700">
                    Vraag {index + 1}: {q.category}
                  </div>
                )
              ))}
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">💡 Onthoud:</h4>
          <p className="text-blue-700 text-sm">
            AI bias is een echt probleem, maar het kan worden opgelost met bewustzijn, 
            diverse teams, en eerlijke data. Jij kunt helpen door kritisch te blijven 
            over AI-systemen die je tegenkomt!
          </p>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            🎯 Test je kennis
          </h2>
          <div className="text-sm text-gray-600">
            Vraag {currentQuestion + 1} van {questions.length}
          </div>
        </div>
        
        <div className="bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <div className="text-xs text-purple-600 font-medium mb-2">
          {question.category}
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {question.question}
        </h3>
        
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={showExplanation}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                showExplanation
                  ? index === question.correct
                    ? 'border-green-500 bg-green-50 text-green-800'
                    : index === selectedAnswer
                    ? 'border-red-500 bg-red-50 text-red-800'
                    : 'border-gray-200 bg-gray-100 text-gray-500'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              <div className="flex items-center">
                <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center mr-3 text-sm font-bold">
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
                {showExplanation && index === question.correct && (
                  <span className="ml-auto text-green-600">✓</span>
                )}
                {showExplanation && index === selectedAnswer && index !== question.correct && (
                  <span className="ml-auto text-red-600">✗</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {showExplanation && (
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6">
          <h4 className="font-semibold text-blue-800 mb-2">💡 Uitleg:</h4>
          <p className="text-blue-700">{question.explanation}</p>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Score: {score} / {currentQuestion + (showExplanation ? 1 : 0)}
        </div>
        
        <button
          onClick={nextQuestion}
          disabled={!showExplanation}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            !showExplanation
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {currentQuestion === questions.length - 1 ? 'Bekijk resultaat →' : 'Volgende vraag →'}
        </button>
      </div>
    </div>
  )
}