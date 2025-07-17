import React from 'react'

const FullscreenLoading = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-900 text-white flex-col gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-white"></div>
      <p className="text-lg font-medium">Loading your workspace...</p>
    </div>
  )
}

export default FullscreenLoading
