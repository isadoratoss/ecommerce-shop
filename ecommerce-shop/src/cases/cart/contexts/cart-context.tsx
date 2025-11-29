import type { ProductDTO } from "@/cases/products/dtos/product.dto";
import { Item } from "@radix-ui/react-menu";
import { createContext, useEffect, useState, type ReactNode } from "react";

export interface CartItem{
    product: ProductDTO;
    quantity: number;
}
export interface Cart {
    items: CartItem[];
}

type CartContextType={
    cart: Cart;
    addProduct: (product: ProductDTO, quantity?: number) => void;
    removeProductCart:(productId: string) => void;

}

export const CartContext = createContext<CartContextType | undefined>(undefined)


type CartContextProviderProps = {
    children: ReactNode
}

export function CartContextProvider({children}: CartContextProviderProps){

    const [cart,setCart] = useState<Cart>({items: []});

    useEffect (() =>{
        const storageCart = localStorage.getItem('cart');

        if(storageCart){
            try{
                setCart(JSON.parse(storageCart));
            } catch {
                setCart({items: []});
            }

        }
    },[]);
    
    useEffect (() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart]);

    function addProduct(product: ProductDTO, quantity: number =1){
        setCart((prevCart) => {
            const existingItem = prevCart.items.find((item) => item.product.id === product.id);

            let updateItems : CartItem[];

            if (existingItem) {
                updateItems = prevCart.items.map((item) => 
                    item.product.id === product.id
                    ? {...item, quantity: item.quantity + quantity}
                    : item
                )

            }else{
                updateItems = [...prevCart.items, {product, quantity}]
            }
            return { items: updateItems }
        })
    }

        function removeProductCart(productId: string) {
            setCart((prevCart) => (
                {
                    items: prevCart.items.filter((item) => item.product.id != productId)
                }
            ))
        }

        function clearCart() {
            setCart({items: []})
        }

        return (
            <CartContext.Provider value={{cart, addProduct, removeProductCart, clearCart}}>
                {children}
            </CartContext.Provider>
        )
    }

