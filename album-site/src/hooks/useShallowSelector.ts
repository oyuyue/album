import { shallowEqual, useSelector } from 'react-redux'

export default function useShallowSelector<State, Selected>(
  selector: (s: State) => Selected
) {
  return useSelector(selector, shallowEqual)
}
