import React, {
  memo,
  useState,
  useCallback,
  CSSProperties,
  ReactElement,
  ReactNode,
  useEffect
} from 'react'
import { useTransition, animated, interpolate } from 'react-spring'
import clsx from 'clsx'
import Button from 'components/Button'
import Skeleton from 'components/Skeleton'
import useMeasure from '../../hooks/useMeasure'
import './index.scss'

interface CarouselProps<T extends object> {
  itemNumber?: number
  scaleStep?: number
  className?: string
  style?: CSSProperties
  itemClassName?: string
  itemWidth?: CSSProperties['width']
  dataSource: T[]
  renderItem: (item: T) => ReactNode
}

interface Item {
  id: number
  zIndex: number
  scale: number
  x: number
  distance: number
}

let gap = 60

const Carousel: <T extends {}>(
  p: CarouselProps<T>
) => ReactElement<CarouselProps<T>> = ({
  dataSource = [],
  renderItem,
  style,
  className,
  itemClassName,
  itemNumber = 5,
  scaleStep = 0.15,
  itemWidth: iw = '50%'
}) => {
  const [data, setData] = useState((): Item[] => {
    const median = Math.ceil(itemNumber / 2)
    return new Array(itemNumber).fill(null).map((_, i) => {
      const distance = -median + 1 + i
      const absD = Math.abs(distance)

      return {
        id: i,
        zIndex: median - absD,
        scale: 1 - absD * scaleStep,
        x: distance * gap,
        distance
      }
    })
  })
  const [isLeft, setIsLeft] = useState(true)

  const turn = useCallback(
    (step = 1) => (): void => {
      setIsLeft(step > 0)
      setData(state => {
        const l = state.length
        const gt0 = step > 0
        const inc = gt0 ? 1 : -1
        for (let i = gt0 ? 0 : l - 1; gt0 ? i < l : i >= 0; i += inc) {
          state[i].id = state[i + step]
            ? state[i + step].id
            : state[i].id + step
        }
        return [...state]
      })
    },
    []
  )

  const [bindWrapper, { width: wrapperWidth }] = useMeasure()
  const [bindItem, { width: itemWidth }] = useMeasure()

  useEffect(() => {
    setData(state => {
      let _gap = (wrapperWidth - itemWidth) / (itemNumber + 1)
      if (_gap < 10) _gap = 0

      gap = _gap + (itemWidth - itemWidth * (1 - scaleStep)) / 2

      return state.map(d => {
        return {
          ...d,
          x: d.distance * gap
        }
      })
    })
  }, [itemNumber, itemWidth, scaleStep, wrapperWidth])

  const fromX = (-data[0].x + gap) * (isLeft ? 1 : -1)
  const edgeScale = data[0].scale - scaleStep
  const transitions = useTransition<Item, Partial<Item> & CSSProperties>(
    data,
    x => x.id,
    {
      from: { opacity: 0, scale: edgeScale, x: fromX, zIndex: 0 },
      leave: { opacity: 0, scale: edgeScale, x: -fromX, zIndex: 0 },
      enter: data => ({ ...data, opacity: 1 }),
      update: data => ({ ...data, opacity: 1 }),
      immediate: k => k === 'zIndex'
    }
  )

  return (
    <div {...bindWrapper} className={clsx('carousel', className)} style={style}>
      <Button
        icon="angle-left"
        className="carousel__btn carousel__btn--left"
        size="big"
        onClick={turn(-1)}
      />
      <Button
        icon="angle-right"
        className="carousel__btn carousel__btn--right"
        size="big"
        onClick={turn()}
      />
      <div
        {...bindItem}
        className={clsx('carousel__item', itemClassName)}
        style={{ zIndex: -1, opacity: 0, width: iw, visibility: 'hidden' }}
      />
      {transitions.map(
        ({ item: { id, distance }, props: { x, scale, ...rest }, key }) => {
          const dsIndex = id % dataSource.length
          const isMedian = distance === 0
          return (
            <animated.div
              key={key}
              className="carousel__item"
              style={{
                ...rest,
                width: iw,
                transform: interpolate(
                  [x, scale],
                  (x, s) => `translate3d(${x}px, 0, 0) scale(${s})`
                )
              }}
            >
              {!isMedian && (
                <div
                  className="carousel__item__mask"
                  onClick={turn(distance)}
                />
              )}
              {dataSource.length ? (
                <div className={clsx('carousel__item__inner', itemClassName)}>
                  {renderItem(
                    dataSource[dsIndex + (dsIndex < 0 ? dataSource.length : 0)]
                  )}
                </div>
              ) : (
                <Skeleton height="100%" />
              )}
            </animated.div>
          )
        }
      )}
    </div>
  )
}

export default (memo as <T>(t: T) => T)(Carousel)
