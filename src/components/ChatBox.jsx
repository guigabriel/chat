import styles from '../styles/ChatBox.module.css'
import MessageList from './MessageList'
import { createClient } from '@supabase/supabase-js';
import Header from './Header';
import { useRouter } from 'next/router';
import React from 'react'




const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

function escutaMensagemEmTempoReal(adicionaMensagem) {
    return supabaseClient
        .from('mensagens')
        .on('INSERT', (respostaLive) => {
            adicionaMensagem(respostaLive.new)
        })
        .subscribe()
}





export default function ChatBox() {

    const roteamento = useRouter()
    const usuarioLogado = roteamento.query.username
    const [mensagem, setMensagem] = React.useState('')
    const [ListaDeMensagens, setListaDeMensagens] = React.useState([]) //O colchete dentro desse use state é porque é um array vazio e não tem nada dentro dele
    const username = (roteamento.query.username);
    const name = (roteamento.query.nome)

    React.useEffect(() => {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {

                setListaDeMensagens(data)
            })

        const subscription = escutaMensagemEmTempoReal((novaMensagem) => {
            console.log('Nova mensagem:', novaMensagem);
            console.log('listaDeMensagens:', ListaDeMensagens);
            setListaDeMensagens((valorAtualDaLista) => {
                console.log('valorAtualDaLista:', valorAtualDaLista);
                return [
                    novaMensagem,
                    ...valorAtualDaLista,
                ]
            });
        });

        return () => {
            subscription.unsubscribe();
        }
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


    function removeMensagem() {
        
            supabaseClient
                .from('mensagens')
                .delete()
                .match({ id: mensagem.id })
                .then(() => {
                    let indice = ListaDeMensagens.indexOf(mensagem);

                    ListaDeMensagens.splice(indice, 1)

                    setListaDeMensagens([...ListaDeMensagens])
                })
        }
    

        return (
            <div className={styles.container}>

                <Header username={username}
                    name={name} />
                <div className={styles.teste}>

                    <MessageList
                        mensagens={ListaDeMensagens}
                        onRemove={removeMensagem}
                        username={username}
                    />

                    <form
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}>

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
                    </form>
                </div>
            </div>
        )
    }