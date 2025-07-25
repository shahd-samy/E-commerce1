import { createContext, useContext, useState } from "react";
import { tokenContext } from "./Token.context";
import toast from "react-hot-toast";
import Loading from './../comonents/Loading/Loading';
import axios from "axios";

export const CartContext = createContext(null);

export default function CartProvider({ children }) {

    const { token } = useContext(tokenContext);
    const [cartinfo, setcartinfo] = useState(null);


    async function addtocart(productId) {
        const loading = toast.loading('loading..')
        try {
            const options = {
                url: 'https://ecommerce.routemisr.com/api/v1/cart',
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
                getallcart()
            }
        } catch (error) {
            //console.log(error);
            toast.error('error');
        } finally {
            toast.dismiss(loading);
        }

    }


    async function getallcart() {
        const options = {
            url: 'https://ecommerce.routemisr.com/api/v1/cart',
            method: 'get',
            headers: {
                token,
            }
        }
        const { data } = await axios.request(options);
        setcartinfo(data);
        // console.log(data);
    }


    async function removefromcart(productid) {

        const loading = toast.loading('loading..')
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/cart/${productid}`,
                method: 'delete',
                headers: {
                    token,
                }
            }
            const { data } = await axios.request(options);
            //console.log(data);
            if (data.status == 'success') {
                toast.success(data.message);
                setcartinfo(data);
                getallcart();

            }
        } catch (error) {
            //console.log(error);
            toast.error('error');
        } finally {
            toast.dismiss(loading);
        }
    }


    async function clearcart() {

        const loading = toast.loading('loading..')

        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/cart`,
                method: 'delete',
                headers: {
                    token,
                }
            }
            const { data } = await axios.request(options);
            //console.log(data);
            setcartinfo({
                numOfCartItems: 0
            });
            if (data.status == 'success') {
                toast.success(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('error');
        } finally {
            toast.dismiss(loading);
        }


    }


    async function updatecart({ productid, count }) {

        const loading = toast.loading('loading..')
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/cart/${productid}`,
                method: 'put',
                headers: {
                    token,
                },
                data: {
                    count,
                }

            }
            const { data } = await axios.request(options);
            // console.log(data);
            setcartinfo(data);
            getallcart();

            toast.success(data.message);
        } catch (error) {
            //console.log(error);
            toast.error('error');
        } finally {
            toast.dismiss(loading);
        }


    }




    return <CartContext.Provider value={{ addtocart, getallcart, cartinfo, removefromcart, clearcart, updatecart }}>
        {children}
    </CartContext.Provider>
}
