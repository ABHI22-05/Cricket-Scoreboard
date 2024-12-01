import React from 'react';
import HeroVideo from '/home/abhishek/Cric-it/frontend/src/assets/heroVideo.mp4';

const Home = () => {
w  return (
    <div className="relative h-screen w-full overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        muted
        autoPlay
        loop
      >
        <source src={HeroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to Cric-it</h1>
        <p className="text-xl mb-8">Experience cricket like never before</p>
        <div className="space-x-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
            Quick Match
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300">
            Start Tournament
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
