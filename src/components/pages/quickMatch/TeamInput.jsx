import React from 'react';

const TeamInput = ({ teamNumber, teamName, setTeamName }) => {
  const teamData = {
    name: teamName,   // Dynamic team name from input
    players: [],
    totalScore: 0,
    wickets: 0,
    overs: '',
    runrate: 0.0,
    toss: false,
  };

  return (
    <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white p-6 rounded-lg shadow-lg w-full md:w-1/3">
      <h2 className="text-2xl font-bold mb-4">Team {teamNumber}</h2>
      <div className="mb-4">
        <label className="block mb-2">Team Name</label>
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className="w-full p-2 rounded bg-blue-600 border border-blue-800 outline-none font-bold"
        />
      </div>
      {/* Additional team data could be displayed or managed here if needed */}
    </div>
  );
};

export default TeamInput;
