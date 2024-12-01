import React, { useState } from 'react';
import Scoreboard from './Scoreboard';

const PlayerInput = ({ battingTeamName, bowlingTeamName }) => {
  const [battingTeamPlayers, setBattingTeamPlayers] = useState(Array(11).fill({ name: '', role: '' }));
  const [bowlingTeamPlayers, setBowlingTeamPlayers] = useState(Array(11).fill({ name: '', role: '' }));
  const [battingCaptain, setBattingCaptain] = useState('');
  const [battingWicketkeeper, setBattingWicketkeeper] = useState('');
  const [bowlingCaptain, setBowlingCaptain] = useState('');
  const [bowlingWicketkeeper, setBowlingWicketkeeper] = useState('');
  const [showScoreboard, setShowScoreboard] = useState(false);

  const handleInputChange = (team, index, field, value) => {
    const updatePlayers = (players) =>
      players.map((player, i) => (i === index ? { ...player, [field]: value } : player));

    if (team === 'batting') {
      setBattingTeamPlayers(updatePlayers);
    } else {
      setBowlingTeamPlayers(updatePlayers);
    }
  };

  const handleOpenScoreboard = () => {
    setShowScoreboard(true);
  };

  if (showScoreboard) {
    return (
      <Scoreboard
        battingTeamName={battingTeamName}
        bowlingTeamName={bowlingTeamName}
        battingTeamPlayers={battingTeamPlayers}
        bowlingTeamPlayers={bowlingTeamPlayers}
      />
    );
  }

  const renderPlayerInputs = (team, players, setCaptain, setWicketkeeper, captain, wicketkeeper) => (
    <>
      {players.map((player, index) => (
        <div key={index} className="mb-4 flex space-x-2">
          <input
            className="w-2/3 p-2 bg-gray-600 rounded-lg text-white font-bold"
            type="text"
            placeholder={`Player ${index + 1} Name`}
            value={player.name}
            onChange={(event) => handleInputChange(team, index, 'name', event.target.value)}
          />
          <select
            className="w-1/3 p-2 rounded-lg font-semibold text-gray-200 bg-gradient-to-l from-blue-500 to-blue-700 outline-none"
            value={player.role}
            onChange={(event) => handleInputChange(team, index, 'role', event.target.value)}
          >
            <option value="">Select Role</option>
            <option value="batsman">Batsman</option>
            <option value="bowler">Bowler</option>
            <option value="allrounder">Allrounder</option>
          </select>
        </div>
      ))}
      <div className="mb-4">
        <label className="text-white font-semibold mr-2">Select Captain:</label>
        <select
          className="p-2 rounded-lg bg-blue-600 text-white font-bold"
          value={captain}
          onChange={(event) => setCaptain(event.target.value)}
        >
          <option value="">Choose Captain</option>
          {players.map((player, index) => (
            <option key={index} value={player.name}>
              {player.name || `Player ${index + 1}`}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="text-white font-semibold mr-2">Select Wicketkeeper:</label>
        <select
          className="p-2 rounded-lg bg-blue-600 text-white font-bold"
          value={wicketkeeper}
          onChange={(event) => setWicketkeeper(event.target.value)}
        >
          <option value="">Choose Wicketkeeper</option>
          {players.map((player, index) => (
            <option key={index} value={player.name}>
              {player.name || `Player ${index + 1}`}
            </option>
          ))}
        </select>
      </div>
    </>
  );

  return (
    <div className="w-full bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-center text-2xl font-semibold text-white mb-6">Player Input for Both Teams</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl text-white text-center mb-4">Players of {battingTeamName}</h3>
          {renderPlayerInputs('batting', battingTeamPlayers, setBattingCaptain, setBattingWicketkeeper, battingCaptain, battingWicketkeeper)}
        </div>
        <div>
          <h3 className="text-xl text-white text-center mb-4">Players of {bowlingTeamName}</h3>
          {renderPlayerInputs('bowling', bowlingTeamPlayers, setBowlingCaptain, setBowlingWicketkeeper, bowlingCaptain, bowlingWicketkeeper)}
        </div>
      </div>
      <div className="text-center mt-6">
        <button
          onClick={handleOpenScoreboard}
          className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg"
        >
          Open Scoreboard
        </button>
      </div>
    </div>
  );
};

export default PlayerInput;
