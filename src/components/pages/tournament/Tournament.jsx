import React, { useState } from 'react';

const Tournament = () => {
    const [selectedFormat, setSelectedFormat] = useState('T20');

    const tournamentCategories = [
        { name: 'Round-Robin Stage', description: 'Each team plays every other team in the group.' },
        { name: 'Group Stage', description: 'Teams are divided into groups, playing round-robin matches within each group.' },
        { name: 'Super 8 or Super 12', description: 'Top teams from each group advance to a new round-robin stage.' },
        { name: 'Knockout Stage', description: 'Teams play elimination matches where the losing team is eliminated.' },
        { name: 'Quarterfinals, Semifinals, Finals', description: 'Elimination rounds leading to the final match.' },
        { name: 'Playoffs (Qualifier and Eliminator)', description: 'Top teams play qualifiers, others play eliminators in leagues.' },
        { name: 'Double Round-Robin Stage', description: 'Each team plays every other team twice in the league stage.' },
        { name: 'Tri-Series or Multi-Nation Series', description: 'A mini-tournament with three or more teams, usually followed by a final.' }
    ];

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center">Tournament Types</h1>

                <div className="flex justify-center gap-4 mb-8">
                    {['T20', 'ODI', 'Test'].map((format) => (
                        <button
                            key={format}
                            onClick={() => setSelectedFormat(format)}
                            className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                                selectedFormat === format
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-800 hover:bg-gray-700'
                            }`}
                        >
                            {format}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {tournamentCategories.map((tournament) => (
                        <div 
                            key={tournament.name}
                            className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-all duration-300 group relative cursor-pointer"
                        >
                            <h3 className="text-xl font-semibold mb-2">{tournament.name}</h3>
                            
                            {/* Hover Details */}
                            <div className="absolute inset-0 bg-gray-900/95 rounded-lg p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <p className="text-sm text-gray-200 text-center">
                                    {tournament.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Tournament;
