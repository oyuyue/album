import { useState } from 'react'

export default function useForceUpdate() {
  const [, set] = useState(false)
  return () => set(s => !s)
}
