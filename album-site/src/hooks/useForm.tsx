import React, {
  useCallback,
  cloneElement,
  ReactElement,
  useState,
  memo
} from 'react'

const Wrapper = memo(
  ({
    node,
    value,
    onChange
  }: {
    node: ReactElement
    value: any
    onChange: Function
  }) => {
    return cloneElement(node, { value, onChange })
  }
)

export default function useForm() {
  const [state, setState] = useState<any>({})

  const onChange = useCallback(
    (name: string) => ({ currentTarget: { value } }: any) => {
      setState((state: any) => ({ ...state, [name]: value }))
    },
    []
  )

  const cover = useCallback(
    ({
      name,
      initValue,
      node
    }: {
      name: string
      initValue?: any
      node: ReactElement
    }) => {
      setState((state: any) => ({ ...state, [name]: initValue }))

      return (
        <Wrapper node={node} value={state[name]} onChange={onChange(name)} />
      )
    },
    [onChange, state]
  )
}
