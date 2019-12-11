import React, {
  memo,
  useRef,
  useEffect,
  useCallback,
  useState,
  ReactNode
} from 'react'
import { useSprings, animated, interpolate } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import clsx from 'clsx'
import Button from 'components/Button'
import './index.scss'
import Typography from 'components/Typography'
import useForceUpdate from 'hooks/useForceUpdate'
import { isFunction } from 'lodash-es'

interface SliderProps<T> {
  initIndex?: number
  className?: string
  dataSource: T[]
  onChange?: (current: number) => void
  renderItem: (o: T, index: number) => ReactNode
}

const Slider = <T extends {}>({
  initIndex = 0,
  className,
  onChange,
  dataSource,
  renderItem
}: SliderProps<T>) => {
  const len = dataSource.length
  const index = useRef(initIndex)
  const forceUpdate = useForceUpdate()
  const itemWidth = useRef(0)
  const itemRef = useRef<HTMLDivElement>()

  const changeHandler = useCallback(() => {
    forceUpdate()
    itemWidth.current = itemRef.current.offsetWidth
    if (isFunction(onChange)) onChange(index.current)
  }, [forceUpdate, onChange])

  const [springs, set] = useSprings(len, i => ({
    x: 0,
    s: 1,
    zIndex: i === 0 ? 1 : 0
  }))

  const bind = useDrag(
    ({ down, distance, movement: [xm], cancel, direction: [xDir] }) => {
      const prevIndex = index.current
      if (down && distance > itemWidth.current / 2) {
        index.current = Math.max(
          Math.min(index.current - (xDir < 0 ? -1 : 1), len - 1),
          0
        )
        cancel()
      }

      set(((i: number) => ({
        x: (i - index.current) * itemWidth.current + (down ? xm : 0),
        s: down ? 1 - distance / itemWidth.current : 1,
        zIndex: i === index.current ? 1 : 0,
        immediate: (k: string) => k === 'zIndex'
      })) as any)
      if (prevIndex !== index.current) changeHandler()
    },
    { domTarget: itemRef }
  )

  useEffect(bind as () => void, [bind])
  useEffect(() => {
    itemWidth.current = itemRef.current.offsetWidth
    set(((i: number) => ({
      x: (i - index.current) * itemWidth.current,
      s: 1,
      zIndex: i === index.current ? 1 : 0,
      immediate: true
    })) as any)
  }, [set])

  const turn = useCallback(
    (i: number) => () => {
      index.current += i
      if (index.current < len && index.current >= 0) {
        set(((i: number) => ({
          x: (i - index.current) * itemWidth.current,
          zIndex: i === index.current ? 1 : 0,
          immediate: (k: string) => k === 'zIndex'
        })) as any)
        changeHandler()
      } else {
        index.current -= i
      }
    },
    [changeHandler, len, set]
  )

  return (
    <div ref={itemRef} className={clsx('slider', className)}>
      <div className="slider_items">
        {
          <div className="slider_itemReference">
            {renderItem(dataSource[index.current], index.current)}
          </div>
        }
        {springs.map(({ x, s, zIndex }, i) => (
          <animated.div
            key={i}
            className="slider_item"
            style={{
              zIndex,
              transform: interpolate(
                [x, s],
                (x, s) => `translate3d(${x}px,0,0) scale(${s})`
              )
            }}
          >
            {renderItem(dataSource[i], i)}
          </animated.div>
        ))}
      </div>
      <Button
        hidden={!index.current}
        className="slider_btn slider_btn-prev"
        icon="angle-left"
        variant="circle"
        color="white"
        onClick={turn(-1)}
      />
      <Button
        hidden={len - 1 <= index.current}
        className="slider_btn slider_btn-next"
        icon="angle-right"
        variant="circle"
        color="white"
        onClick={turn(1)}
      />
      <div className="slider_indicator">
        <Typography variant="subtitle1">{index.current + 1}</Typography>
        <Typography variant="caption">/{len}</Typography>
      </div>
    </div>
  )
}

export default (memo as <T>(t: T) => T)(Slider)
