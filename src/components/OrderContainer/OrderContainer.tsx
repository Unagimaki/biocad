import React, { useEffect, useState, useRef } from 'react';
import { useFromStrokeToArray } from '../../hooks/useFromStrokeToArryy';
import { StrokeContainerRender } from '../StrokeContainerRender/StrokeContainerRender';
import { getMaxDivisor } from '../../helpers/getMaxDivisor';
import styles from './OrderContainer.module.scss';

type Props = { str1: string; str2: string };

export const OrderContainer = React.memo(({ str1, str2 }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [chunkSize, setChunkSize] = useState(0);

  const { coloredArr1, coloredArr2, matrix } = useFromStrokeToArray(str1, str2, chunkSize);

  useEffect(() => {
    if (!containerRef.current) return;

    // Функция для обновления ширины контейнера
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();

    // Создаем ResizeObserver, чтобы слушать изменения размеров контейнера
    const resizeObserver = new ResizeObserver(() => {
      updateWidth();
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const len = coloredArr1.length;
    if (!len) return;

    const maxParts =
      containerWidth < 400 ? 2 :
      containerWidth < 600 ? 4 :
      containerWidth < 800 ? len / 2 :
      null;

    if (maxParts) {
      setChunkSize(getMaxDivisor(len, Math.floor(maxParts)));
    } else {
      setChunkSize(len);
    }
  }, [containerWidth, coloredArr1.length]);

  return (
    <div className={styles.container} ref={containerRef}>
      {!chunkSize && (
        <div>
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
  );
});
