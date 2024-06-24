export interface ShoppingCartState {
    isModalVisible: boolean;
    shoppingCart: any[];
    addItem: (value: any) => void;
    setIsModalVisible: (value: any) => void;
    removeItem: (value: number) => void;
    deleteItem: (value: number) => void;
}