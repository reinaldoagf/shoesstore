export interface ProductState {
    currentProduct: any;
    products: any[];
    setCurrentProduct: (value: any) => void;
    updateProduct: (id: number, value: any) => void;
    getProductById: (id: string) => void;
}