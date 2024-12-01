import React, { useState } from 'react'
import Scorecard from './Scorecard'

const Scoreboard = ({battingTeamName, battingTeamPlayers, bowlingTeamName, bowlingTeamPlayers}) => {
  const [score, setScore] = useState(0)
  const [wickets, setWickets] = useState(0)
  const [overs, setOvers] = useState(0)
  const [balls, setBalls] = useState(0)
  const [runrate, setRunrate] = useState(0.0)
  
  const [strikeBatsman, setStrikeBatsman] = useState('')
  const [nonStrikeBatsman, setNonStrikeBatsman] = useState('')
  const [batsmanScores, setBatsmanScores] = useState({})

  const [bowler, setBowler] = useState('')
  const [bowlerStats, setBowlerStats] = useState({})

  const [showPopUp, setShowPopUp] = useState(true)
  const [showNewBatsmanPopUp, setShowNewBatsmanPopUp] = useState(false)
  const [showRunoutPopUp, setShowRunoutPopUp] = useState(false)
  const [showCatchPopUp, setShowCatchPopUp] = useState(false)
  const [showNewBowlerPopUp, setShowNewBowlerPopUp] = useState(false)
  const [showExtraPopUp, setShowExtraPopUp] = useState(false)
  const [showNoBallsPopUp, setShowNoBallsPopUp] = useState(false)

  const [outBatsman, setOutBatsman] = useState('')
  const [end, setEnd] = useState('')
  const [runsCompleted, setRunsCompleted] = useState(0)
  const [newBatsman, setNewBatsman] = useState('')
  const [eachBall, setEachBall] = useState([])

  const handleRun = (runs) => {
    setScore((prevScore) => prevScore + runs);
    setBatsmanScores((prevScores) => ({
      ...prevScores,
      [strikeBatsman]: {
        ...prevScores[strikeBatsman],
        runs: prevScores[strikeBatsman].runs + runs,
        balls: prevScores[strikeBatsman].balls + 1,
        foursHit: runs === 4 ? prevScores[strikeBatsman].foursHit + 1 : prevScores[strikeBatsman].foursHit,
        sixesHit: runs === 6 ? prevScores[strikeBatsman].sixesHit + 1 : prevScores[strikeBatsman].sixesHit,
      },
    }));
    const newBalls = balls + 1;
    if (newBalls === 6) {
      setOvers((prevOvers) => prevOvers + 1);
      setBalls(0);
      setShowNewBowlerPopUp(true);
      // For last ball of over
      if (runs % 2 !== 0) {
        // Don't swap strike since end of over will swap it back
        // This keeps original striker on strike for next over
      } else {
        // For even runs on last ball, need to swap to maintain strike
        setStrikeBatsman(nonStrikeBatsman);
        setNonStrikeBatsman(strikeBatsman);
      }
    } else {
      setBalls(newBalls);
      if (runs % 2 !== 0) {
        setStrikeBatsman(nonStrikeBatsman);
        setNonStrikeBatsman(strikeBatsman);
      }
    }
    
    setEachBall((prevEachBall) => [
      ...prevEachBall,
      runs > 0 ? `${bowler} to ${strikeBatsman} ${runs} runs` : 
      wickets > 0 ? `${bowler} to ${strikeBatsman} OUT` :
      extras > 0 ? `${bowler} to ${strikeBatsman} ${extraType}` :
      `${bowler} to ${strikeBatsman} no run`
    ]);
    updateRunRate();
    updateBowlerStats(runs, 0);
  };

  const updateBowlerStats = (runs, wickets) => {
    setBowlerStats((prevStats) => {
      const bowlerCurrentStats = prevStats[bowler] || { runs: 0, wickets: 0, overs: 0, balls: 0 };
      const newBalls = bowlerCurrentStats.balls + 1;
      const newOvers = bowlerCurrentStats.overs + Math.floor(newBalls / 6);
      const remainingBalls = newBalls % 6;
  
      return {
        ...prevStats,
        [bowler]: {
          runs: bowlerCurrentStats.runs + runs,
          wickets: bowlerCurrentStats.wickets + wickets,
          overs: newOvers,
          balls: remainingBalls,
        }
      };
    });
  };

  const handleWicket = (wicketType) => {
    setWickets((prevWickets) => {
      const newWickets = prevWickets + 1;
      return newWickets;
    });

    setBalls(prevBalls => prevBalls + 1);
    
    // Only update bowler stats if not run out, timed out or obstructing the field
    if (wicketType !== 'R' && wicketType !== 'Time' && wicketType !== 'obs') {
      updateBowlerStats(0, 1);
    }

    if (wicketType === 'R') {
      setShowRunoutPopUp(true);
    } else if (wicketType === 'C') {
      setShowCatchPopUp(true);
    }
    else {
      setShowNewBatsmanPopUp(true);
    }

    updateRunRate();
  }

  const handleExtra = (extraType) => {
    if (extraType === 'WD' || extraType === 'NB') {
      setScore((prevScore) => prevScore + 1);
      if (extraType === 'WD') {
        setShowExtraPopUp(true);
      } else {
        setShowNoBallsPopUp(true);
      }
    } else {
      // For LB and B, only increment the balls faced by batsman
      setBatsmanScores((prevScores) => ({
        ...prevScores,
        [strikeBatsman]: {
          ...prevScores[strikeBatsman],
          balls: prevScores[strikeBatsman].balls + 1
        }
      }));
      setShowExtraPopUp(true);
    }
    updateRunRate();
  }

  const updateRunRate = () => {
    const totalOvers = overs + (balls / 6);
    if (totalOvers > 0) {
      setRunrate((score / totalOvers).toFixed(2));
    }
  }

  const handlePopUpSubmit = () => {
    setShowPopUp(false);
    setBatsmanScores({
      [strikeBatsman]: { runs: 0, balls: 0, foursHit: 0, sixesHit: 0 },
      [nonStrikeBatsman]: { runs: 0, balls: 0, foursHit: 0, sixesHit: 0 },
    });
  }

  const handleRunOutConfirm = () => {
    setWickets((prevWickets) => prevWickets + 1);
    setScore((prevScore) => prevScore + runsCompleted);
    setShowRunoutPopUp(false);
    setShowNewBatsmanPopUp(true);
  }

  const handleWidesConfirm = () => {
    setShowExtraPopUp(false);
  }

  const handleNoBallsConfirm = () => {
    setShowNoBallsPopUp(false);
  }

  return (
    <div className="bg-black text-white min-h-screen">
      {showPopUp && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6 text-center">Select Players</h2>
            <div className="mb-6">
              <label className="block mb-2 font-semibold">Select Strike Batsman</label>
              <select
                className="p-2 border rounded w-full bg-gray-700 text-white"
                value={strikeBatsman}
                onChange={(e) => setStrikeBatsman(e.target.value)}
              >
                <option value="">Select Strike Batsman</option>
                {battingTeamPlayers.map((player, index) => (
                  <option key={index} value={player.name}>
                    {player.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-6">
              <label className="block mb-2 font-semibold">Select Non-Strike Batsman</label>
              <select
                className="p-2 border rounded w-full bg-gray-700 text-white"
                value={nonStrikeBatsman}
                onChange={(e) => setNonStrikeBatsman(e.target.value)}
              >
                <option value="">Select Non-Strike Batsman</option>
                {battingTeamPlayers.map((player, index) => (
                  <option key={index} value={player.name}>
                    {player.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-6">
              <label className="block mb-2 font-semibold">Select Bowler</label>
              <select
                className="p-2 border rounded w-full bg-gray-700 text-white"
                value={bowler}
                onChange={(e) => setBowler(e.target.value)}
              >
                <option value="">Select Bowler</option>
                {bowlingTeamPlayers.map((player, index) => (
                  <option key={index} value={player.name}>
                    {player.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-blue-700 transition duration-300"
              onClick={handlePopUpSubmit}
            >
              Start Match
            </button>
          </div>
        </div>
      )}
      {!showPopUp && (
        <div className="flex flex-col">
          <div className="h-20 w-full flex mb-4">
            <div className='w-4/12 h-full bg-gray-800 flex justify-around items-center'>
              <div>
                <div className='font-bold text-4xl'>{battingTeamName}</div>
                <div className='text-xl'>
                  <span>{overs}.{balls}</span><span className='text-sm'> OVR</span>
                </div>
              </div>
              <div className='text-5xl font-bold'>
                <span>{score}</span>-{wickets}
              </div>
            </div>
            <div className='w-3/12 h-full bg-gray-700 border-l border-gray-600'>
              <div className='border-b border-gray-600 h-1/2 flex justify-between px-5 items-center'>
                <div className='text-xl font-bold'>{strikeBatsman} *</div>
                <div className='text-xl font-bold'>
                  {batsmanScores[strikeBatsman]?.runs}<span className='text-sm font-bold'> ({batsmanScores[strikeBatsman]?.balls})</span>
                </div>
              </div>
              <div className='h-1/2 flex justify-between px-5 items-center'>
                <div className='text-xl font-bold'>{nonStrikeBatsman}</div>
                <div className='text-xl font-bold'>
                  {batsmanScores[nonStrikeBatsman]?.runs}<span className='text-sm font-bold'> ({batsmanScores[nonStrikeBatsman]?.balls})</span>
                </div>
              </div>
            </div>
            <div className='w-2/12 h-full bg-gray-800 items-center border-r border-gray-600'>
              <div className='font-bold text-xl flex justify-center p-2'>Run Rate</div>
              <div className='flex justify-center text-2xl font-bold'>{runrate}</div>
            </div>
            <div className='w-3/12 h-full bg-gray-700 flex flex-col justify-center'>
              <div className='text-white flex justify-between px-5 h-1/2 items-center'>
                <div className='font-bold text-xl'>{bowler}</div>
                <div className='text-xl font-bold'>
                  {bowlerStats[bowler]?.wickets}-{bowlerStats[bowler]?.runs} <span className='text-sm font-normal'> {bowlerStats[bowler]?.overs}.{bowlerStats[bowler]?.balls}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-6 px-6">
            <div className="w-1/3 py-6">
              <Scorecard onRun={handleRun} onWicket={handleWicket} onExtra={handleExtra} />
            </div>
            <div className="w-1/3">
              <h3 className="text-2xl font-bold mb-4 text-gray-100"></h3>
              <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-900/50">
                      <th className="p-3 text-left font-medium text-gray-300">Batsman</th>
                      <th className="p-3 text-right font-medium text-gray-300">Runs</th>
                      <th className="p-3 text-right font-medium text-gray-300">Balls</th>
                      <th className="p-3 text-right font-medium text-gray-300">4s</th>
                      <th className="p-3 text-right font-medium text-gray-300">6s</th>
                      <th className="p-3 text-right font-medium text-gray-300">SR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(batsmanScores).map(([name, score]) => (
                      <tr key={name} className="border-t border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                        <td className="p-3 font-medium">{name}</td>
                        <td className="p-3 text-right">{score.runs}</td>
                        <td className="p-3 text-right">{score.balls}</td>
                        <td className="p-3 text-right">{score.foursHit}</td>
                        <td className="p-3 text-right">{score.sixesHit}</td>
                        <td className="p-3 text-right">{((score.runs / score.balls) * 100).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-gray-800 rounded-xl shadow-lg mt-6 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-900/50">
                      <th className="p-3 text-left font-medium text-gray-300">Bowler</th>
                      <th className="p-3 text-right font-medium text-gray-300">Overs</th>
                      <th className="p-3 text-right font-medium text-gray-300">Runs</th>
                      <th className="p-3 text-right font-medium text-gray-300">Wickets</th>
                      <th className="p-3 text-right font-medium text-gray-300">Eco</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(bowlerStats).map(([name, stats]) => (
                      <tr key={name} className="border-t border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                        <td className="p-3 font-medium">{name}</td>
                        <td className="p-3 text-right">{`${stats.overs}.${stats.balls}`}</td>
                        <td className="p-3 text-right">{stats.runs}</td>
                        <td className="p-3 text-right">{stats.wickets}</td>
                        <td className="p-3 text-right">{((stats.runs / ((stats.overs * 6) + stats.balls)) * 6).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="w-1/3">
              <h3 className="text-2xl font-bold mb-4 text-gray-100"></h3>
              <div className="bg-gray-800 rounded-xl shadow-lg p-4 h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                {eachBall.map((event, index) => (
                  <div key={index} className="mb-2 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700/70 transition-colors">
                    <span className="font-medium text-blue-400">{`${Math.floor(index / 6) + 1}.${index % 6 + 1}`}</span>
                    <span className="ml-2">{event}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {showNewBowlerPopUp && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Select New Bowler</h2>
            <select 
              className="p-2 border rounded w-full bg-gray-700 text-white mb-4"
              value={bowler} 
              onChange={(e) => setBowler(e.target.value)}
            >
              <option value="">Select Bowler</option>
              {bowlingTeamPlayers.map((player, index) => (
                <option key={index} value={player.name}>
                  {player.name}
                </option>
              ))}
            </select>
            <button 
              className="bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-blue-700 transition duration-300"
              onClick={() => setShowNewBowlerPopUp(false)}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
      {showNewBatsmanPopUp && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Select New Batsman</h2>
            <select 
              className="p-2 border rounded w-full bg-gray-700 text-white mb-4"
              onChange={(e) => {
                setNewBatsman(e.target.value);
                setBatsmanScores(prevScores => ({
                  ...prevScores,
                  [e.target.value]: { runs: 0, balls: 0, foursHit: 0, sixesHit: 0 }
                }));
              }}
            >
              <option value="">Select Batsman</option>
              {battingTeamPlayers.map((player, index) => (
                <option key={index} value={player.name}>
                  {player.name}
                </option>
              ))}
            </select>
            <button 
              className="bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-blue-700 transition duration-300"
              onClick={() => {
                setStrikeBatsman(newBatsman);
                setShowNewBatsmanPopUp(false);
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
      {showRunoutPopUp && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Run Out</h2>
            
            <div className="mb-4">
              <label className="block mb-2">Select Out Batsman:</label>
              <select 
                className="p-2 border rounded w-full bg-gray-700 text-white"
                value={outBatsman} 
                onChange={(e) => setOutBatsman(e.target.value)}
              >
                <option value="">Select Batsman</option>
                <option value={strikeBatsman}>{strikeBatsman}</option>
                <option value={nonStrikeBatsman}>{nonStrikeBatsman}</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Select End:</label>
              <select 
                className="p-2 border rounded w-full bg-gray-700 text-white"
                value={end} 
                onChange={(e) => setEnd(e.target.value)}
              >
                <option value="keeperEnd">Keeper End</option>
                <option value="bowlerEnd">Bowler End</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Runs Completed:</label>
              <input
                type="number"
                value={runsCompleted}
                onChange={(e) => setRunsCompleted(Number(e.target.value))}
                className="p-2 border rounded w-full bg-gray-700 text-white"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Fielder Name:</label>
              <select 
                className="p-2 border rounded w-full bg-gray-700 text-white"
                onChange={(e) => {}}
              >
                <option value="">Select Fielder</option>
                {bowlingTeamPlayers.map((player, index) => (
                  <option key={index} value={player.name}>
                    {player.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Select New Batsman:</label>
              <select 
                className="p-2 border rounded w-full bg-gray-700 text-white"
                value={newBatsman} 
                onChange={(e) => setNewBatsman(e.target.value)}
              >
                <option value="">Select Batsman</option>
                {battingTeamPlayers.map((player, index) => (
                  <option key={index} value={player.name}>
                    {player.name}
                  </option>
                ))}
              </select>
            </div>

            <button 
              className="bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-blue-700 transition duration-300"
              onClick={handleRunOutConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
      {showCatchPopUp && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Select New Batsman</h2>
            <select 
              className="p-2 border rounded w-full bg-gray-700 text-white mb-4"
              onChange={(e) => setNewBatsman(e.target.value)}
            >
              <option value="">Select Batsman</option>
              {battingTeamPlayers.map((player, index) => (
                <option key={index} value={player.name}>
                  {player.name}
                </option>
              ))}
            </select>
            <h2 className="text-2xl font-bold mb-4">Select Fielder</h2>
            <select 
              className="p-2 border rounded w-full bg-gray-700 text-white mb-4"
              onChange={(e) => {}}
            >
              <option value="">Select Fielder</option>
              {bowlingTeamPlayers.map((player, index) => (
                <option key={index} value={player.name}>
                  {player.name}
                </option>
              ))}
            </select>
            <button 
              className="bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-blue-700 transition duration-300"
              onClick={() => {
                setStrikeBatsman(newBatsman);
                setShowCatchPopUp(false);
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
      {showExtraPopUp && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Wides</h2>
            <div className="flex justify-around mb-4">
              {[1, 2, 3, 4, 6].map(run => (
                <button 
                  key={run}
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                  onClick={() => handleRun(run)}
                >
                  {run} Run{run > 1 ? 's' : ''}
                </button>
              ))}
            </div>
            <h3 className="text-xl font-bold mb-4">Extras:</h3>
            <div className="flex justify-around mb-4">
              <button 
                className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300"
                onClick={() => {setShowRunoutPopUp(true)}}
              >
                Run Out
              </button>
              <button 
                className="bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700 transition duration-300"
                onClick={() => {setShowCatchPopUp(true)}}
              >
                Stumping
              </button>
            </div>
            <button 
              className="bg-green-600 text-white py-2 px-4 rounded w-full hover:bg-green-700 transition duration-300"
              onClick={handleWidesConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
      {showNoBallsPopUp && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">No Ball</h2>
            <div className="flex justify-around mb-4">
              {[1, 2, 3, 4, 6].map(run => (
                <button 
                  key={run}
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                  onClick={() => handleRun(run)}
                >
                  {run}
                </button>
              ))}
            </div>
            <h3 className="text-xl font-bold mb-4">Extras:</h3>
            <div className="flex justify-around mb-4">
              <button 
                className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300"
                onClick={() => {setShowRunoutPopUp(true)}}
              >
                Run Out
              </button>
            </div>
            <button 
              className="bg-green-600 text-white py-2 px-4 rounded w-full hover:bg-green-700 transition duration-300"
              onClick={handleNoBallsConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Scoreboard