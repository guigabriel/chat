import { useRouter } from "next/router"
import styles from '../styles/Header.module.css'
import Titulo from "./Titulo"

export default function Header({ username}) {
    const roteamento = useRouter()

    return (
        <div className={styles.Header}>
            <Titulo 
            className = {styles.chat} 
            texto = 'Chat'
            cor ='blue'
            />

                <img src={`https://github.com/${username}.png`} alt="Foto de usuário" className={styles.imagem} />
                <h3 className={styles.usuario} > {username} </h3>
                
                <button className={styles.botao}  onClick={() => roteamento.push('/')} >Sair</button>


            
            
        </div>
    )
}