import { useState } from "react";

export default function useonline(){

     const [isonline, setisonline] = useState(true);
    
      window.addEventListener('online',function(){
        setisonline(true);
        
      })
       window.addEventListener('offline',function(){
            setisonline(false);
    
      })


      return {online:isonline};
}