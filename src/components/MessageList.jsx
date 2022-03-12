import styles from '../styles/MessageList.module.css'


export default function MessageList(props) {

    return (

        <ul className={styles.conatiner} >

            {props.mensagens.map((mensagem) => {
                return (

                    <li
                        className={styles.lista}
                        key={mensagem.id}>

                        <div styleSheet={{ marginBottom: '8px', display: 'flex' }}>

                            <img className={styles.fotoGit}
                                src={`https://github.com/${mensagem.de}.png`}
                                alt="Imagem de usuário" />

                            <h3 className={styles.forte}>{mensagem.de}</h3>

                            <button onClick={() => props.onRemove(mensagem)  }>x</button>



                            <span styleSheet={{
                                fontSize: '10px',
                                marginLeft: '8px',
                                color: 'blue'
                            }}>
                                {(new Date().toLocaleDateString())}
                            </span>
                        </div>

                        {mensagem.texto.startsWith(':sticker:')
                            ? (
                                <img src={mensagem.texto.replace(':sticker:', '')} />
                            )
                            :
                            (mensagem.texto
                            )}
                    </li>
                )
            })}


        </ul>
    )
}