import styles from '../styles/ChatBox.module.css'
import MessageList from './MessageList'
import { createClient } from '@supabase/supabase-js';
import Header from './Header';
import { useRouter } from 'next/router';
import React from 'react'
import { ButtonSendSticker } from './ButtonSendSticker';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

function escutaMensagemEmTempoReal(attMensagem) {
    return supabaseClient
        .from('mensagens')
        .on('INSERT', (attMensagem))
        .on('DELETE', (attMensagem))
        .subscribe()
}

export default function ChatBox() {

    const roteamento = useRouter()
    const usuarioLogado = roteamento.query.username
    const [mensagem, setMensagem] = React.useState('')
    const [ListaDeMensagens, setListaDeMensagens] = React.useState([])
    const username = (roteamento.query.username);
    const name = (roteamento.query.nome)



    function attMensagem() {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {

                setListaDeMensagens(data)
            })
    }


    React.useEffect(() => {
        attMensagem()
        escutaMensagemEmTempoReal(attMensagem)
    }, [])


    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            de: usuarioLogado,
            texto: novaMensagem,
        };

        supabaseClient
            .from('mensagens')
            .insert([
                mensagem
            ])
            .then(({ data }) => {
                console.log('Criando mensagem:', data)
            })
        setMensagem('')
    }


    function removeMensagem(id) {

        supabaseClient
            .from('mensagens')
            .delete(false)
            .match({ "id": id })
            .then(() => attMensagem)
    }


    return (
        <div className={styles.container}>

            <Header username={username}
                name={name} />
            <div className={styles.teste}>

                <MessageList
                    mensagens={ListaDeMensagens}
                    removeMensagem={removeMensagem}
                    username={username}

                />

                <form
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: 'auto',
                    }}>

                    <div className={styles.principal}>
                        <div className={styles.divInpt}>
                            <div className={styles.terceira}>
                                <input
                                    type="text"
                                    value={mensagem}
                                    onChange={(event) => {
                                        const valor = event.target.value
                                        setMensagem(valor)
                                    }}

                                    onKeyPress={(event) => {
                                        if (event.key === 'Enter') {
                                            event.preventDefault()
                                            handleNovaMensagem(mensagem)
                                        }

                                    }}
                                    placeholder="Insira sua mensagem aqui..."
                                    className={styles.text}

                                />
                            </div>
                        </div>
                        <div className={styles.sticker}>
                            <ButtonSendSticker
                                onStickerClick={(sticker) => {
                                    console.log('[USANDO O COMPONENTE] salva esse sticker no banco de dados', sticker)
                                    handleNovaMensagem(':sticker: ' + sticker)
                                }}
                            />
                        </div>
                    </div>

                    <button onClick={(event) => { event.preventDefault(handleNovaMensagem(mensagem)) }}
                        disabled={mensagem === "" ? true : false}
                        className={styles.btn} >
                        Enviar
                    </button>

                </form>

            </div>
        </div>
    )
}