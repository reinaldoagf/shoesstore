import { create } from 'zustand';
import { ProductState } from '../interfaces/productState';

export const useProductStore = create<ProductState>((set) => ({
    products: [
        {
          id: "1",
          image: require("../../assets/shoes/airmax270-1.png"),
          price: 10.9,
          title: "Nike Air Max 270",
          description: "Nike womens Moderns",
          liked: false
        },
        {
          id: "2",
          image: require("../../assets/shoes/junipertrail-2.png"),
          price: 10.5,
          title: "Nike Juniper Trail",
          description: "Zapatillas de trail running - Hombre",
          liked: false
        },
        {
          id: "3",
          image: require("../../assets/shoes/streakfly-1.png"),
          price: 20.5,
          title: "Nike Streakfly",
          description: "Zapatillas de competición para asfalto",
          liked: false
        },
        {
          id: "4",
          image: require("../../assets/shoes/zoomfly-1.png"),
          price: 40.5,
          title: "Nike Zoom Fly 3",
          description: "Amortiguación de la puntera al talón",
          liked: false
        },
        {
          id: "5",
          image: require("../../assets/shoes/zoomfly-2.png"),
          price: 40.5,
          title: "Nike Zoom Fly 3",
          description: "Amortiguación de la puntera al talón",
          liked: false
        },
        {
          id: "6",
          image: require("../../assets/shoes/zoomfly-3.png"),
          price: 40.5,
          title: "Nike Zoom Fly 3",
          description: "Amortiguación de la puntera al talón",
          liked: false
        },
        {
          id: "7",
          image: require("../../assets/shoes/zoomfly-4.png"),
          price: 40.5,
          title: "Nike Zoom Fly 3",
          description: "Amortiguación de la puntera al talón",
          liked: false
        },
      ],
      updateProduct: (id, value) => set((state) => ({
        products: state.products.map((product) =>
          product.id === id ? { ...product, ...value } : product
        ),
      }))
}));
