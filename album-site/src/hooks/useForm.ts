import { useRef, useMemo } from 'react'
import { isFunction } from 'lodash-es'

export default function useForm(): [
  { ref: any },
  {
    report: (name: string) => boolean
    check: (name: string) => boolean
    value: (name?: string) => any
  }
] {
  const form = useRef<HTMLFormElement>()

  const op = useMemo(
    () => ({
      report(name?: string): boolean {
        let node = form.current
        if (!node || !node.elements) return true
        if (name) node = (form.current.elements as any)[name]
        return isFunction(node.reportValidity) ? node.reportValidity() : true
      },
      check(name?: string): boolean {
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
        const res: { [k: string]: any } = {}
        Array.from(form.current.elements).forEach((el: any) => {
          if (el.name) {
            res[el.name] = el.value
          }
        })
        return res
      }
    }),
    []
  )

  return [{ ref: form }, op]
}
