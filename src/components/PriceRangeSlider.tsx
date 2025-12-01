import { useEffect, useState } from 'react'

type Props = {
  min: number
  max: number
  valueMin: number
  valueMax: number
  step?: number
  onChange: (min: number, max: number) => void
}

// A lightweight dual range slider using two native input[type="range"]
// with track fill between thumbs. Accessible and keyboard friendly.
export default function PriceRangeSlider({ min, max, valueMin, valueMax, step = 1, onChange }: Props) {
  const [localMin, setLocalMin] = useState(valueMin)
  const [localMax, setLocalMax] = useState(valueMax)

  // Keep local state in sync with external values
  useEffect(() => setLocalMin(valueMin), [valueMin])
  useEffect(() => setLocalMax(valueMax), [valueMax])

  const range = max - min
  const left = ((localMin - min) / range) * 100
  const right = ((localMax - min) / range) * 100

  function handleMin(next: number) {
    // Ensure min <= max - step
    const clamped = Math.min(Math.max(next, min), localMax - step)
    setLocalMin(clamped)
    onChange(clamped, localMax)
  }

  function handleMax(next: number) {
    // Ensure max >= min + step
    const clamped = Math.max(Math.min(next, max), localMin + step)
    setLocalMax(clamped)
    onChange(localMin, clamped)
  }

  return (
    <div className="relative w-full">
      <div className="relative h-2 rounded-full bg-gray-200">
        <div
          className="absolute h-2 rounded-full bg-yellow-600/60"
          style={{ left: `${left}%`, width: `${right - left}%` }}
        />
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localMin}
          onChange={(e) => handleMin(Number(e.target.value))}
          className="pointer-events-auto absolute -top-2 h-2 w-full appearance-none bg-transparent"
          aria-label="Minimum price"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localMax}
          onChange={(e) => handleMax(Number(e.target.value))}
          className="pointer-events-auto absolute -top-2 h-2 w-full appearance-none bg-transparent"
          aria-label="Maximum price"
        />
      </div>
      <style>{`
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 9999px;
          background: #ca8a04; /* yellow-600 */
          border: 2px solid white;
          box-shadow: 0 1px 2px rgba(0,0,0,0.2);
          cursor: pointer;
          position: relative;
          z-index: 10;
        }
        input[type=range]::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 9999px;
          background: #ca8a04;
          border: 2px solid white;
          box-shadow: 0 1px 2px rgba(0,0,0,0.2);
          cursor: pointer;
          position: relative;
          z-index: 10;
        }
        input[type=range]::-webkit-slider-runnable-track {
          height: 2px;
          background: transparent;
        }
        input[type=range]::-moz-range-track {
          height: 2px;
          background: transparent;
        }
      `}</style>
    </div>
  )
}
