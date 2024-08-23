import React from 'react'

const DashBoard = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Musical Dashboard</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
          Log Out
        </button>
      </header>

      <main>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Playlist Card */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Your Playlists</h2>
            <ul>
              <li className="mb-2">🎵 Chill Vibes</li>
              <li className="mb-2">🎸 Rock Classics</li>
              <li className="mb-2">🎧 Workout Mix</li>
              <li className="mb-2">🎶 Indie Gems</li>
            </ul>
            <button className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded">
              Create New Playlist
            </button>
          </div>

          {/* Recently Played */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Recently Played</h2>
            <ul>
              <li className="mb-2">🎤 Song Title - Artist</li>
              <li className="mb-2">🎸 Song Title - Artist</li>
              <li className="mb-2">🎧 Song Title - Artist</li>
              <li className="mb-2">🎶 Song Title - Artist</li>
            </ul>
          </div>

          {/* Top Artists */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Top Artists</h2>
            <ul>
              <li className="mb-2">🎤 Artist 1</li>
              <li className="mb-2">🎸 Artist 2</li>
              <li className="mb-2">🎧 Artist 3</li>
              <li className="mb-2">🎶 Artist 4</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}

export default DashBoard