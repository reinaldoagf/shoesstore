import { create } from 'zustand';
import { ProductState } from '../interfaces/productState';

export const useProductStore = create<ProductState>((set, get) => ({
  currentProduct: null,
  products: [
    {
      id: "1",
      image: require("../../assets/shoes/airmax270-1.png"),
      price: 10.9,
      color: "#b1baee",
      title: "Nike Air Max 270",
      description: "Nike womens Moderns",
      liked: false,
      colors: []
    },
    {
      id: "2",
      image: require("../../assets/shoes/junipertrail-2.png"),
      price: 10.5,
      color: "#f88268",
      title: "Nike Juniper Trail",
      description: "Zapatillas de trail running - Hombre",
      liked: false,
      colors: []
    },
    {
      id: "3",
      image: require("../../assets/shoes/streakfly-1.png"),
      price: 20.5,
      color: "#caeb7e",
      title: "Nike Streakfly",
      description: "Zapatillas de competición",
      liked: false,
      colors: []
    },
    {
      id: "4",
      image: require("../../assets/shoes/zoomfly-1.png"),
      price: 40.5,
      color: "#ff4583",
      title: "Nike Zoom Fly 3",
      description: "Amortiguación de la puntera al talón",
      liked: false,
      colors: [{
        id: "5",
        color: "#ec83ab",
      },{
        id: "6",
        color: "#00b2a4",
      },{
        id: "7",
        color: "#f0a5d2",
      }],
    },
    {
      id: "5",
      image: require("../../assets/shoes/zoomfly-2.png"),
      price: 40.5,
      color: "#ec83ab",
      title: "Nike Zoom Fly 3",
      description: "Amortiguación de la puntera al talón",
      liked: false,
      colors: [{
        id: "4",
        color: "#ff4583",
      },{
        id: "6",
        color: "#00b2a4",
      },{
        id: "7",
        color: "#f0a5d2",
      }]
    },
    {
      id: "6",
      image: require("../../assets/shoes/zoomfly-3.png"),
      price: 40.5,
      color: "#00b2a4",
      title: "Nike Zoom Fly 3",
      description: "Amortiguación de la puntera al talón",
      liked: false,
      colors: [{
        id: "5",
        color: "#ec83ab",
      },{
        id: "4",
        color: "#ff4583",
      },{
        id: "7",
        color: "#f0a5d2",
      }]
    },
    {
      id: "7",
      image: require("../../assets/shoes/zoomfly-4.png"),
      price: 40.5,
      color: "#f0a5d2",
      title: "Nike Zoom Fly 3",
      description: "Amortiguación de la puntera al talón",
      liked: false,
      colors: [{
        id: "5",
        color: "#ec83ab",
      },{
        id: "4",
        color: "#ff4583",
      },{
        id: "6",
        color: "#00b2a4",
      }]
    },
  ],
  setCurrentProduct: (value: any) => set({ currentProduct: value }),
  updateProduct: (id, value) => set((state) => ({
    products: state.products.map((product) =>
      product.id === id ? { ...product, ...value } : product
    ),
  })),
  getProductById: (id: string) => {
    const products = get().products; // Obtén los productos del estado actual
    return products.find((product) => product.id === id); // Busca el producto por ID
  }
}));
