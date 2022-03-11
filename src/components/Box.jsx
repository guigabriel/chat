import Titulo from "./Titulo";
import Sub from "./SubTitulo";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Box.module.css"

export default function Box() {
    const [username, setUsername] = useState('')
    const [dadosDoGit, setDadosDoGit] = useState('')
    const roteamento = useRouter()
    const nome = dadosDoGit.name


    const campoVazio = 'https://imagensemoldes.com.br/wp-content/uploads/2021/04/Personagens-Rick-and-Morty-PNG.png'
    const statusUsuario = `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&langs_count=7&theme=dracula`

    useEffect(() => {
        fetch(`https://api.github.com/users/${username}`)
            .then((resposta) => resposta.json())
            .then(dataConvertida => {
                console.log('data', dataConvertida)
                setDadosDoGit(dataConvertida)
            })
    }, [username])

    


    const handleChange = e => {
        setUsername(e.target.value)
    }

    return (
        <div className={styles.container}>
            <form className={styles.formulario} >
                <Titulo texto='wubba lubba dub dub' />
                <Sub sub='Projeto Rick and Morty Chat' />

                <input
                    type="text"
                    value={username}
                    onChange={handleChange}
                    placeholder='Digite seu usuário do GitHub'
                    className={styles.caixa}
                    onKeyPress={(event) => {
                        if(event.key === 'Enter' && username.length > 3){
                           event.preventDefault(roteamento.push(`/chat?username=${username}`)) 
                        }
                    }} />

                <button
                    type="button"
                    onClick={() => roteamento.push(`/chat?username=${username}`)}
                    
                    disabled={username.length < 3 ? true : false}
                    className={styles.botao}
                >
                    Entrar
                </button>
            </form>

            <div className={styles.imagem}>
                <img src={`${username.length >= 3 ? `https://github.com/${username}.png` : campoVazio}`}
                    alt="Imagem de Usuário do GitHub"
                    className={styles.foto} />


                <div>
                   <h2 className={styles.nome} >{nome} </h2> 
                </div>
                


                <img className={styles.vercel} src={` ${username.length >= 3 ? statusUsuario : ''}`} />

            </div>

        </div>

    )
}