import { useRef, useMemo } from 'react'
import { isFunction } from 'lodash-es'

interface Op {
  report: (name?: string) => boolean
  check: (name?: string) => boolean
  value(name: string): any
  value(): Record<string, any>
}

export default function useForm(): [
  { ref: any },
  {
    report: (name?: string) => boolean
    check: (name?: string) => boolean
    value(name: string): any
    value(): Record<string, any>
  }
] {
  const form = useRef<HTMLFormElement>()

  const op = useMemo<Op>(
    () => ({
      report(name) {
        let node = form.current
        if (!node || !node.elements) return true
        if (name) node = (form.current.elements as any)[name]
        return isFunction(node.reportValidity) ? node.reportValidity() : true
      },
      check(name) {
        let node = form.current
        if (!node || !node.elements) return true
        if (name) node = (form.current.elements as any)[name]
        return isFunction(node.checkValidity) ? node.checkValidity() : true
      },
      value(name?: string) {
        const node = form.current
        if (!node || !node.elements) return null
        if (name) {
          return (node.elements as any)[name]
            ? (node.elements as any)[name].value
            : null
        }
        return Object.fromEntries(new FormData(node).entries())
      }
    }),
    []
  )

  return [{ ref: form }, op]
}
