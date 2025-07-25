import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { tokenContext } from '../../context/Token.context';

export default function Guardroute({children}) {
const {token}= useContext(tokenContext);

    if (token) {
        return <Navigate to={'/home'}></Navigate>;

    }
    else {
       return children;
    }

}
