import { create } from 'zustand';
import { ShoppingCartState } from '../interfaces/shoppingCartState';

export const useShoppingCartStore = create<ShoppingCartState>((set) => ({
    shoppingCart: [],
    
    addItem: (item: any) => set((state) => ({
        shoppingCart: [...state.shoppingCart, item]
    })),

    removeItem: (id: number) => set((state) => ({
        shoppingCart: state.shoppingCart.filter(item => item.id !== id)
    })),

    clearCart: () => set(() => ({
        shoppingCart: []
    }))
}));
