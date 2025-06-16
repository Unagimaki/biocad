import React, { useEffect, useState } from 'react'
import { useFromStrokeToArray } from '../../hooks/useFromStrokeToArryy'
import { StrokeContainerRender } from '../StrokeContainerRender/StrokeContainerRender'
import { getMaxDivisor } from '../../helpers/getMaxDivisor'
import styles from './OrderContainer.module.scss'

type Props = { str1: string, str2: string }

export const OrderContainer = React.memo(({str1, str2}: Props) => {
    const [chunkSize, setChunkSize] = useState(0)
    const {coloredArr1, coloredArr2, matrix} = useFromStrokeToArray(str1, str2, chunkSize)
    
    useEffect(() => {
        const updateChunkSize = () => {
            const w = window.innerWidth;
            const len = coloredArr1.length;
            if (!len) return;
          
            const maxParts =
              w < 400 ? 2 :
              w < 600 ? 4 :
              w < 800 ? len / 2 :
              null;
          
            maxParts
              ? setChunkSize(getMaxDivisor(len, Math.floor(maxParts)))
              : setChunkSize(len);
          };
          
          
        
        updateChunkSize();
        window.addEventListener('resize', updateChunkSize);
        return () => window.removeEventListener('resize', updateChunkSize);
      }, [coloredArr1.length]);      
    
    return(
        <div className={styles.container}>
            {
                !chunkSize &&
                <div>
                    <StrokeContainerRender arr={coloredArr1}/>
                    <StrokeContainerRender arr={coloredArr2}/>
                </div>
            }

            {
                chunkSize > 0 &&  
                <div>
                    {
                        matrix.map((row, rowIndex) => (
                            <StrokeContainerRender key={rowIndex} arr={row}/>
                        ))
                    }
                </div>
            }                
        </div>
    )
})