import React from 'react';
import { motion as Motion } from 'framer-motion';

export default function BuildingModal({ config, onClose, onEnter }) {
  if (!config) return null;

  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-auto"
      onClick={onClose}
    >
      <Motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="bg-white rounded-3xl shadow-2xl p-8 max-w-md text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-6xl mb-4">{config.icon}</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          {config.name}
        </h2>
        <p className="text-gray-600 mb-6">
          {config.description}
        </p>
        <div className="space-y-3">
          {config.canEnter ? (
            <Motion.button
              onClick={onEnter}
              className="w-full px-6 py-3 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600 transition shadow-lg"
              whileTap={{ scale: 0.95 }}
            >
              Enter {config.name}
            </Motion.button>
          ) : (
            <div className="w-full px-6 py-3 bg-gray-300 text-gray-500 font-bold rounded-full cursor-not-allowed">
              Locked
            </div>
          )}
          <Motion.button
            onClick={onClose}
            className="w-full px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-full hover:bg-gray-300 transition"
            whileTap={{ scale: 0.95 }}
          >
            Cancel
          </Motion.button>
        </div>
      </Motion.div>
    </Motion.div>
  );
}
