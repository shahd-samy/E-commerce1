import React from 'react'
import useonline from '../../hooks/Useonline'

export default function Online({children}) {
      const {online}= useonline()

      if(online)
        return children

}
