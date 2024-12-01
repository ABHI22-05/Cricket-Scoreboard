import { useState } from 'react'
import TeamInput from './TeamInput'
import TossSection from './TossSection' // Import TossSection component
import PlayerInput from './PlayerInput'

const QuickMatch = () => {
  const [team1Name, setTeam1Name] = useState('')
  const [team2Name, setTeam2Name] = useState('')
  const [showTossSection, setShowTossSection] = useState(false) // State to toggle TossSection visibility
  const [showPlayerInput, setShowPlayerInput] = useState(false)
  const [battingTeamName, setBattingTeamName] = useState('') // State to store the batting team name
  const [bowlingTeamName, setBowlingTeamName] = useState('') // State to store the bowling team name

  const handleTossClick = () => {
    setShowTossSection(true) // Show TossSection when button is clicked
  }

  // Function to handle the toss result and move to player input
  const handleTossComplete = (battingTeam, bowlingTeam) => {
    setBattingTeamName(battingTeam)
    setBowlingTeamName(bowlingTeam)
    setShowTossSection(false)
    setShowPlayerInput(true) // Show PlayerInput after the toss is completed
  }

  return (
    <div>
      {/* Conditionally render TeamInput only if neither TossSection nor PlayerInput is shown */}
      {!showTossSection && !showPlayerInput && (
        <div className='p-20'>
          <div className='flex justify-center gap-10'>
          <TeamInput teamNumber={1} teamName={team1Name} setTeamName={setTeam1Name} />
          <TeamInput teamNumber={2} teamName={team2Name} setTeamName={setTeam2Name} />
          </div>
          <div className='flex justify-center p-10 '>
            <div className='w-20 h-10 rounded-lg bg-blue-700 flex justify-center font-bold text-center'>
            <button onClick={handleTossClick}>Toss</button>
            </div>
          </div>

        </div>
      )}

      {/* Render TossSection if showTossSection is true */}
      {showTossSection && (
        <TossSection 
          team1Name={team1Name} 
          team2Name={team2Name} 
          onTossComplete={handleTossComplete} // Passing function to handle toss completion
        />
      )}

      {/* Render PlayerInput if showPlayerInput is true */}
      {showPlayerInput && (
          <PlayerInput battingTeamName={battingTeamName} bowlingTeamName={bowlingTeamName} />
      )}
    </div>
  )
}

export default QuickMatch
