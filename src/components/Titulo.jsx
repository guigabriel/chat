import styles from '../styles/Titulo.module.css'


export default function Titulo(props) {
    return (
        <div className={styles.container}>
            <h1 className={styles.titulo} style={{
                backgroundColor: props.fundo ?? 'none',
                color: props.cor ?? '#adff00'
            }} >{props.texto}
            </h1>
        </div>
    )
}