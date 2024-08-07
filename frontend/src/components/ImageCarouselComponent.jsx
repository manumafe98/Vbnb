import { ChevronLeftIcon, ChevronRightIcon } from "../constants/Icons";
import { useState } from "react";

export const ImageCarouselComponent = ({ children: slides }) => {
  const [curr, setCurr] = useState(0)

  const prev = () => setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1))
  const next = () => setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1))

  return (
    <div className="overflow-hidden relative group">
      <div
        className="max-h-64 flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides}
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="transition-transform duration-300 hover:scale-110">
          <ChevronLeftIcon className="fill-current text-white h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="transition-transform duration-300 hover:scale-110"
        >
          <ChevronRightIcon className="fill-current text-white h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
        </button>
      </div>
      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => ( <div key={i} className={`transition-all w-2 h-2 bg-white rounded-full ${curr === i ? "p-1" : "bg-opacity-50"}`}/> ))}
        </div>
      </div>
    </div>
  )
}
