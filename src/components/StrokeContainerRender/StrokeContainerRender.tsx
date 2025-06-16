import { ColoredChar } from "../../types"
import { ColorfulStroke } from "../ColorfulStroke/ColorfulStroke"
import styles from './StrokeContainer.module.scss'

type Props = {
    arr: ColoredChar[]
}

export const StrokeContainerRender = ({arr}: Props) => {
    return(
        <div className={styles.container}>
            {
                arr.map(item => {
                    return <ColorfulStroke str={item.value} color={item.color}/>
                })
            }
        </div>
    )
}