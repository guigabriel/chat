import styles from '../styles/SubTitulo.module.css'


export default function Sub (props) {
    return (
        <>
            <h3 className={styles.sub} style={{
                backgroundColor: props.cor ?? 'none'
            }} > {props.sub} </h3>
        </>
    )
}