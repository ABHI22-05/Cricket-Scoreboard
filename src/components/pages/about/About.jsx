import React from 'react'

const About = () => {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">About Cricket Scorer</h1>
        
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">What is Cricket Scorer?</h2>
          <p className="text-gray-300 mb-4">
            Cricket Scorer is a comprehensive cricket scoring application designed to help cricket enthusiasts keep track of matches easily and efficiently. Whether you're scoring a quick match or managing a full tournament, our app provides all the tools you need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Features</h3>
            <ul className="list-disc list-inside text-gray-300">
              <li>Quick Match Scoring</li>
              <li>Tournament Management</li>
              <li>Detailed Statistics</li>
              <li>Real-time Scoring</li>
              <li>Player Performance Tracking</li>
            </ul>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">How to Use</h3>
            <ul className="list-disc list-inside text-gray-300">
              <li>Create a new match</li>
              <li>Enter team details</li>
              <li>Select players</li>
              <li>Start scoring</li>
              <li>Track statistics</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About