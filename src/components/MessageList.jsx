import styles from '../styles/MessageList.module.css'
import { DeleteButton } from './ButtonDelete'


export default function MessageList(props) {

    return (

        <div className={styles.container} >

            {props.mensagens.map((mensagem) => {
                return (

                    <div
                        className={styles.lista}
                        key={mensagem.id}  >

                        <div className={styles.cabecalho}>
                            
                            <img className={styles.fotoGit}
                                src={`https://github.com/${mensagem.de}.png`}
                                alt="Imagem de usuário" />

                            <h3 className={styles.forte}>{mensagem.de}</h3>

                            <span style={{
                                fontSize: '10px',
                                marginLeft: '15px',
                                color: '#FFFFFF',
                                marginRight:'5vw',
                            }}>{(new Date().toLocaleDateString())}
                                
                            </span>

                            
                           {mensagem.de === props.username ?  <DeleteButton id={mensagem.id} removeMensagem={props.removeMensagem} /> : "" } 

                        </div>

                        {mensagem.texto.startsWith(':sticker:')
                            ? (
                                <img src={mensagem.texto.replace(':sticker:', '')} className={styles.figurinha} />
                            )
                            :
                            (mensagem.texto
                            )}
                    </div>
                )
            })}


        </div>
    )
}