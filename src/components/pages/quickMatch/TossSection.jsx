import React, { useState } from 'react';
import PlayerInput from './PlayerInput';

const TossSection = ({ team1Name, team2Name, over}) => {
  const [tossWinner, setTossWinner] = useState(''); // State for toss winner
  const [decision, setDecision] = useState(''); // State for decision (bat or bowl)
  const [overs, setOvers] = useState(''); // State for overs
  const [battingTeamName, setBattingTeamName] = useState(''); // State for batting team
  const [bowlingTeamName, setBowlingTeamName] = useState(''); // State for bowling team
  const [tossCompleted, setTossCompleted] = useState(false); // State for toss completion

  const handleCompleteToss = () => {
    if (tossWinner && decision) {
      let battingTeam, bowlingTeam;

      if (tossWinner === team1Name) {
        battingTeam = decision === 'bat' ? team1Name : team2Name;
        bowlingTeam = decision === 'bowl' ? team1Name : team2Name;
      } else if (tossWinner === team2Name) {
        battingTeam = decision === 'bat' ? team2Name : team1Name;
        bowlingTeam = decision === 'bowl' ? team2Name : team1Name;
      }

      setBattingTeamName(battingTeam);
      setBowlingTeamName(bowlingTeam);
      setTossCompleted(true); // Mark toss as completed
    }
  };

  return (
    <div>
      {!tossCompleted ? (
        <div className="mt-4 bg-gray-700 p-4 rounded-lg shadow-lg max-w-lg mx-auto">
          <h2 className="text-lg font-semibold mb-4 text-white text-center">Toss</h2>
          
          {/* Toss form */}
          <div className="mb-4 flex justify-between">
            <div className="w-1/2 mr-2">
              <label className="block mb-2 text-white font-bold">Who won the toss?</label>
              <select
                className="w-full p-2 outline-none bg-gradient-to-r from-blue-800 to-blue-600 rounded-lg text-white font-semibold"
                value={tossWinner}
                onChange={(e) => setTossWinner(e.target.value)}
              >
                <option value="">Select Team</option>
                <option value={team1Name}>{team1Name}</option>
                <option value={team2Name}>{team2Name}</option>
              </select>
            </div>
            <div className="w-1/2 ml-2">
              <label className="block mb-2 text-white font-bold">Decision</label>
              <select
                className="w-full p-2 outline-none rounded-lg text-white font-semibold bg-gradient-to-r from-blue-800 to-blue-600"
                value={decision}
                onChange={(e) => setDecision(e.target.value)}
              >
                <option value="">Select Decision</option>
                <option value="bat">Bat</option>
                <option value="bowl">Bowl</option>
              </select>
            </div>
          </div>

          {/* Overs Section */}
          <div className="mb-4">
            <label className="block mb-2 text-white font-bold">Overs</label>
            <input
              className="w-full p-2 bg-gray-600 rounded-lg text-white font-bold"
              type="text"
              placeholder="Enter number of overs"
              value={overs}
              onChange={(e) => setOvers(e.target.value)}
            />
          </div>

          <div className="text-center mt-4">
            <button
              onClick={handleCompleteToss}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Complete Toss
            </button>
          </div>
        </div>
      ) : (
        <PlayerInput
          battingTeamName={battingTeamName}
          bowlingTeamName={bowlingTeamName}
        />
      )}
    </div>
  );
};

export default TossSection;