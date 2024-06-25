import { create } from 'zustand';
import Toast from 'react-native-toast-message';
import { ShoppingCartState } from '../interfaces/shoppingCartState';

export const useShoppingCartStore = create<ShoppingCartState>((set) => ({
    isModalVisible: false,
    shoppingCart: [],
    
    addItem: (newItem: any) => set((state) => {
        const existingItemIndex = state.shoppingCart.findIndex(
            item => item.id === newItem.id && item.size === newItem.size
        );

        if (existingItemIndex > -1) {
            // El artículo ya está en el carrito, actualizamos la cantidad
            const updatedCart = [...state.shoppingCart];
            updatedCart[existingItemIndex].quantity = newItem.quantity + 1 || 1; // Añadir la cantidad o 1 si no está definida
            return { shoppingCart: updatedCart };
        } else {
            Toast.show({
              type: 'success',
              text1: 'Successful operation',
              text2: 'Product successfully added'
            });
            // El artículo no está en el carrito, lo añadimos
            return { shoppingCart: [...state.shoppingCart, { ...newItem, quantity: newItem.quantity + 1 || 1 }] };
        }
    }),

    removeItem: (item: any) => set((state) => {
        const { id, size } = item;
        const updatedCart = state.shoppingCart.map((element) => {
            if (element.id === id && element.size === size) {
                return element.quantity > 1 ? { ...element, quantity: element.quantity - 1 } : null;
            }
            return element;
        }).filter(element => element !== null); // Filtrar los artículos que no sean null

        return { shoppingCart: updatedCart };
    }),

    // Elimina un item del carrito por su id y tamaño
    deleteItem: (item: any) => set((state) => {
        const { id, size } = item;
        return { shoppingCart: state.shoppingCart.filter(item => item.id !== id || item.size !== size) };
    }),

    clearCart: () => set(() => ({
        shoppingCart: []
    })),

    setIsModalVisible: (value: any) => set((state) => ({
        isModalVisible: value
    })),
}));
