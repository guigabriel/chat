import React from 'react';
import appConfig from '../../config.json';
import styles from '../styles/ButtonSendSticker.module.css'

export function ButtonSendSticker(props) {
    const [isOpen, setOpenState] = React.useState('');


    return (
        <div style={{ position: 'relative', }}>

            <button type='button' onClick={() => setOpenState(!isOpen)} className={styles.botao} 
           />
              
            {isOpen && (
                <div className={styles.div} onClick={() => setOpenState(false)}  >
                                    
                    <p className={styles.texto}>
                        Stickers
                    </p>

                    <div className={styles.lista}>
                        {appConfig.stickers.map((sticker) => (
                            <div 
                            className={styles.itens} 
                            onClick={() => { if (Boolean(props.onStickerClick)) { props.onStickerClick(sticker); } }}
                            key={sticker}
                             >
                                
                                <img src={sticker} className={styles.gif} />

                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}