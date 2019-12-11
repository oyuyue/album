import { useRef, useState, useEffect } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

export default function useMeasure(): [
  { ref: any },
  { left: number; width: number; top: number; height: number }
] {
  const ref = useRef()
  const [bounds, set] = useState({ left: 0, top: 0, width: 0, height: 0 })
  const [ro] = useState(
    () =>
      new ResizeObserver(([entry]) => {
        set(entry.contentRect)
      })
  )
  useEffect(() => (ro.observe(ref.current), () => ro.disconnect()), [ref, ro])

  return [{ ref }, bounds]
}
