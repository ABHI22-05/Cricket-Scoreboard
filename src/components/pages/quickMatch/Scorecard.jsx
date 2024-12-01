import React from 'react';

const Scorecard = ({ onRun, onWicket, onExtra }) => {
  return (
    <div className='flex flex-col space-y-6 items-center py-6 bg-gray-800 rounded-xl shadow-lg max-w-4xl mx-auto'>
      {/* Runs Section */}
      <div className='flex justify-between items-center w-11/12 bg-gray-700/50 rounded-lg p-4'>
        <div className='text-gray-300 font-medium text-lg'>Runs</div>
        <div className='flex space-x-3'>
          {['Dot', 1, 2, 3, 4, 6].map((run, index) => (
            <button
              key={index}
              className='bg-blue-600 hover:bg-blue-700 text-white font-medium w-12 h-12 rounded-lg transition-colors text-lg'
              onClick={() => onRun(run === 'Dot' ? 0 : run)}
            >
              {run}
            </button>
          ))}
        </div>
      </div>

      {/* Wickets Section */}
      <div className='flex justify-between items-center w-11/12 bg-gray-700/50 rounded-lg p-4'>
        <div className='text-gray-300 font-medium text-lg'>Wicket</div>
        <div className='grid grid-cols-4 gap-3'>
          {[
            {key: 'B', label: 'Bowled'},
            {key: 'C', label: 'Caught'}, 
            {key: 'LBW', label: 'LBW'},
            {key: 'R', label: 'Run Out'},
            {key: 'HIT', label: 'Hit Wicket'},
            {key: 'S', label: 'Stumped'},
            {key: 'OBS', label: 'Obstr.'},
            {key: 'TIME', label: 'Timed Out'}
          ].map(({key, label}) => (
            <button
              key={key}
              className='bg-red-600 hover:bg-red-700 text-white font-medium w-20 h-12 rounded-lg transition-colors text-base'
              onClick={() => onWicket()}
              title={label}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      {/* Extras Section */}
      <div className='flex justify-between items-center w-11/12 bg-gray-700/50 rounded-lg p-4'>
        <div className='text-gray-300 font-medium text-lg'>Extras</div>
        <div className='flex space-x-3'>
          {['WD', 'NB', 'B', 'LB'].map((extra, index) => (
            <button
              key={index}
              className='bg-yellow-600 hover:bg-yellow-700 text-white font-medium w-12 h-12 rounded-lg transition-colors text-base'
              onClick={() => onExtra(extra)}
            >
              {extra}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Scorecard;
