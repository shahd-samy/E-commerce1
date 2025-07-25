import { createContext, useContext, useState } from "react";
import { tokenContext } from "./Token.context";
import toast from "react-hot-toast";
import Loading from './../comonents/Loading/Loading';
import axios from "axios";

export const WishlistContext = createContext(null);

export default function WishlistProvider({ children }) {

    const { token } = useContext(tokenContext);
    const [wishlist, setwishlist] = useState([]);


    async function addtowishlist(productId) {
console.log(wishlist);

        const loading = toast.loading('loading..')

        try {
            const options = {
                url: 'https://ecommerce.routemisr.com/api/v1/wishlist',
                method: 'post',
                data: {
                    productId,
                },
                headers: {
                    token,
                }
            }

            const { data } = await axios.request(options);
            //console.log(data);
            if (data.status == 'success') {
                toast.success(data.message);
                getwishlist()
            }
        } catch (error) {
            console.log(error);
            toast.error('error');
        } finally {
            toast.dismiss(loading);
        }

    }



    async function getwishlist() {
        const options = {
            url: 'https://ecommerce.routemisr.com/api/v1/wishlist',
            method: 'get',
            headers: {
                token,
            }
        }
        const { data } = await axios.request(options);
        setwishlist(data.data);
        console.log(data);
    }


    async function removefromwishlist(productid) {

        const loading = toast.loading('loading..')
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/wishlist/${productid}`,
                method: 'delete',
                headers: {
                    token,
                }
            }
            const { data } = await axios.request(options);
            console.log(data);
            if (data.status == 'success') {
                toast.success(data.message);
                getwishlist();


            }
        } catch (error) {
            console.log(error);
            toast.error('error');
        } finally {
            toast.dismiss(loading);
        }


    }



    return <WishlistContext.Provider value={{ wishlist, addtowishlist, removefromwishlist, getwishlist}}>
        {children}
    </WishlistContext.Provider>
}
