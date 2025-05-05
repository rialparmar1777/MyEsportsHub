import React from 'react';
import { FaTrophy, FaUsers, FaGamepad } from 'react-icons/fa';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Welcome to MyEsports
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Your premier destination for competitive gaming tournaments, team management, and esports community.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md font-semibold transition-colors">
                Join Tournament
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-md font-semibold transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose MyEsports?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <FaTrophy className="text-4xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Tournaments</h3>
              <p className="text-gray-300">
                Compete in professionally organized tournaments with fair matchmaking and exciting prizes.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <FaUsers className="text-4xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Team Management</h3>
              <p className="text-gray-300">
                Create and manage your team, track performance, and connect with other players.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <FaGamepad className="text-4xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Live Streaming</h3>
              <p className="text-gray-300">
                Watch live matches, follow your favorite teams, and engage with the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Tournaments */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Upcoming Tournaments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Tournament cards will be added here */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="text-gray-400 mb-2">Coming Soon</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Tournament Name</h3>
              <p className="text-gray-300 mb-4">Description of the tournament and its format.</p>
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-semibold transition-colors">
                Register Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
