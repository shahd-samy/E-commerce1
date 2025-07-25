import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { tokenContext } from '../../context/Token.context';

export default function Protectedroutes({ children }) {

const {token}= useContext(tokenContext);


    if (token) {
        return children;

    }
    else {
       return <Navigate to={'/login'}></Navigate>;
    }

}
