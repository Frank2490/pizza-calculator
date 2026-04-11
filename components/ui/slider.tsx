"use client"

import * as React from "react"
import * as RadixSlider from "@radix-ui/react-slider"
import { cn } from "@/lib/utils"

interface SliderProps {
  value?: number[]
  onValueChange?: (value: number[]) => void
  min?: number
  max?: number
  step?: number
  className?: string
}

function Slider({ value, onValueChange, min = 0, max = 100, step = 1, className }: SliderProps) {
  return (
    <RadixSlider.Root
      className={cn("relative flex w-full touch-none select-none items-center", className)}
      value={value}
      onValueChange={onValueChange}
      min={min}
      max={max}
      step={step}
    >
      <RadixSlider.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-gray-200">
        <RadixSlider.Range className="absolute h-full bg-[#C84B31]" />
      </RadixSlider.Track>
      <RadixSlider.Thumb className="block h-4 w-4 rounded-full border border-gray-300 bg-white shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-400 cursor-pointer" />
    </RadixSlider.Root>
  )
}

export { Slider }
