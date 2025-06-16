import React, { useEffect, useRef, useState } from 'react'
import { useFromStrokeToArray } from '../../hooks/useFromStrokeToArryy'
import { StrokeContainerRender } from '../StrokeContainerRender/StrokeContainerRender'
import { getMaxDivisor } from '../../helpers/getMaxDivisor'
import styles from './OrderContainer.module.scss'

type Props = { str1: string; str2: string }

export const OrderContainer = React.memo(({ str1, str2 }: Props) => {
  const [chunkSize, setChunkSize] = useState(0)
  const { coloredArr1, coloredArr2, matrix } = useFromStrokeToArray(str1, str2, chunkSize)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const updateChunkSize = () => {
      const windowWidth = window.innerWidth
      const len = coloredArr1.length
      if (!len) return

      // Проверяем ширину контейнера
      const containerWidth = containerRef.current?.offsetWidth || 0

      let maxParts = 0

      if (windowWidth < 400) {
        maxParts = 2
      } else if (windowWidth < 600) {
        maxParts = 4
      } else if (windowWidth < 800) {
        maxParts = len / 2
      } else {
        maxParts = len
      }

      // Если контейнер шире окна, уменьшаем maxParts для переноса
      if (containerWidth > windowWidth) {
        maxParts = Math.min(maxParts, Math.floor(len / 2))
      }

      setChunkSize(getMaxDivisor(len, Math.floor(maxParts)))
    }

    updateChunkSize()

    window.addEventListener('resize', updateChunkSize)
    return () => window.removeEventListener('resize', updateChunkSize)
  }, [coloredArr1.length])

  return (
    <div className={styles.container}>
      {!chunkSize && (
        <div  ref={containerRef}>
          <StrokeContainerRender arr={coloredArr1} />
          <StrokeContainerRender arr={coloredArr2} />
        </div>
      )}

      {chunkSize > 0 && (
        <div>
          {matrix.map((row, rowIndex) => (
            <StrokeContainerRender key={rowIndex} arr={row} />
          ))}
        </div>
      )}
    </div>
  )
})
