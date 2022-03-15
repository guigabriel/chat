import {BsFillTrashFill} from 'react-icons/bs'
import React from 'react';

export function DeleteButton(props) {
    return (
        <>
            <button
                onClick={() => props.removeMensagem(props.id)}
            >
               <BsFillTrashFill/>
            </button>
       
        </>
    )
}