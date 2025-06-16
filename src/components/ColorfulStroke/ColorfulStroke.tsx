import React from "react"
import styles from './ColorfulStroke.module.scss'

type Props = {
    str: string
    color?: string | null
}

export const ColorfulStroke = React.memo(({str, color}: Props) => {
    
    return(
        <div
            className={styles.container}
            style={{
                backgroundColor: `${color}`,
                outline: `${!color && '0.1vw solid black'}`
            }}
        >
            {str}
        </div>
    )
})