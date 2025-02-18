import React from 'react'

const InformationCard: React.FC = () => {
  return (
    <div
    className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4">
    <div className="p-6">
      <h3 className="text-lg font-semibold">Heading</h3>
      <p className="mt-2 text-sm text-gray-500 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor auctor
        arcu, at fermentum dui. Maecenas</p>
      <button type="button"
        className="mt-4 px-5 py-2.5 rounded-lg text-white text-sm tracking-wider border-none outline-none bg-blue-600 hover:bg-blue-700">View</button>
    </div>
  </div>
  )
}

export default InformationCard
