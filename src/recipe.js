/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from 'react'
import SpeechRecognition, {
  useSpeechRecognition
} from 'react-speech-recognition'
import { Ingredients } from './ingredients'
import { Steps } from './steps'

let wakeLock = null

const stayAwake = async () => {
  const requestWakeLock = async () => {
    try {
      wakeLock = await navigator.wakeLock.request('screen')
      console.log('Screen Wake Lock is active')
    } catch (err) {
      console.error(err)
    }
  }

  await requestWakeLock()
}

const startListening = () => {
  stayAwake()
  SpeechRecognition.startListening({ continuous: true })
}

const stopListening = async () => {
  wakeLock.release()
    .then(() => {
      wakeLock = null
    })
  SpeechRecognition.stopListening()
}
const Recipe = ({ recipe }) => {
  const { ingredients, title, steps } = recipe
  const [message] = useState('')
  const [currentStep, setStep] = useState(0)
  const [focusedId, setFocusId] = useState()
  const refEl = useRef(null)
  useEffect(() =>
    refEl && refEl.current ? refEl.current.scrollIntoView() : null
  )
  useEffect(() => stayAwake())

  const SECTION = {
    STEP: 'step',
    INGREDIENT: 'ingredient'
  }

  const setFocus = (section, key) => {
    setFocusId(`${section}-${key}`)
  }

  const goToStep = (stepNumber) => {
    console.log('go to step:', `'${stepNumber}'`, Number(stepNumber))
    setStep(Number(stepNumber))
    setFocus(SECTION.STEP, stepNumber)
  }

  const goToIngredient = (ingredient) => {
    setFocus(SECTION.INGREDIENT, ingredient)
  }

  const commands = [
    {
      command: 'Go to *',
      // command: ["Step *", "Top *", "Stop *"],
      callback: goToStep
      // isFuzzyMatch: true,
      // fuzzyMatchingThreshold: 0.2,
      // bestMatchOnly: true,
    },
    {
      command: 'Step *',
      // command: ["Step *", "Top *", "Stop *"],
      callback: goToStep
      // isFuzzyMatch: true,
      // fuzzyMatchingThreshold: 0.2,
      // bestMatchOnly: true,
    },
    {
      command: 'Stop *',
      callback: goToStep
    },
    {
      command: 'Top *',
      // command: ["Step *", "Top *", "Stop *"],
      callback: goToStep
      // isFuzzyMatch: true,
      // fuzzyMatchingThreshold: 0.2,
      // bestMatchOnly: true,
    },
    {
      command: 'How much *',
      callback: goToIngredient
    },
    {
      command: 'How many *',
      callback: goToIngredient
    },
    {
      command: ['next', 'okay'],
      callback: () => goToStep(currentStep + 1),
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
      bestMatchOnly: true
    },
    {
      command: ['back'],
      callback: () => goToStep(currentStep - 1),
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
      bestMatchOnly: true
    },
    // {
    //   command: "The weather is :condition today",
    //   callback: (condition) => setMessage(`Today, the weather is ${condition}`),
    // },
    // {
    //   command: "My top sports are * and *",
    //   callback: (sport1, sport2) => setMessage(`#1: ${sport1}, #2: ${sport2}`),
    // },
    // {
    //   command: "Pass the salt (please)",
    //   callback: () => setMessage("My pleasure"),
    // },
    // {
    //   command: ["Hello", "Hi"],
    //   callback: ({ command }) => setMessage(`Hi there! You said: "${command}"`),
    //   matchInterim: true,
    // },
    // {
    //   command: "Beijing",
    //   callback: (command, spokenPhrase, similarityRatio) =>
    //     setMessage(
    //       `${command} and ${spokenPhrase} are ${similarityRatio * 100}% similar`
    //     ),
    //   // If the spokenPhrase is "Benji", the message would be "Beijing and Benji are 40% similar"
    //   isFuzzyMatch: true,
    //   fuzzyMatchingThreshold: 0.2,
    // },
    // {
    //   command: ["eat", "sleep", "leave"],
    //   callback: (command) => setMessage(`Best matching command: ${command}`),
    //   isFuzzyMatch: true,
    //   fuzzyMatchingThreshold: 0.2,
    //   bestMatchOnly: true,
    // },
    {
      command: 'clear',
      callback: ({ resetTranscript }) => resetTranscript()
    }
  ]

  const { transcript } = useSpeechRecognition({ commands })

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <p>Your browser does not support this</p>
  }

  return (<>
    <div className="two-col">
      <div className="side">
        <h2>{title}</h2>
        <Ingredients
          refEl={refEl}
          focusedId={focusedId}
          ingredients={ingredients}
        />
        <Steps
          refEl={refEl}
          focusedId={focusedId}
          steps={steps}
        />
      </div>
      <div className="side">
        <button
          onClick={startListening}
        >
          Start
        </button>
        <button onClick={stopListening}>Stop</button>
        <button onClick={() => goToStep(currentStep + 1)}>Step</button>
        <button onClick={() => goToIngredient('eggs')}>Ingredient</button>
        <p>Current step: {currentStep}</p>
        <p>{message}</p>
        <p>TRANSCRIPT: {transcript}</p>
      </div>
    </div>
    </>
  )
}
export default Recipe
