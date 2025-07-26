// import { create } from  "zustand";
// import { OrderItem } from "./types";
// import { Product } from "@prisma/client";

// interface Store {
//     order: OrderItem[]
//     addToOrder: (product: Product) => void
//     increaseQuantity: (id: Product['id']) => void
//     decreaseQuantity: (id: Product['id']) => void
//     removeItem: (id: Product['id']) => void
//     clearOrder: () => void
// }

// export const useStore = create<Store>((set, get) => ({
//     order: [],
//     addToOrder: (product) => {
            
//         const { categoryId, image, ...data } = product;

//         let order : OrderItem[] = get().order;

//         if(get().order.find(item => item.id === product.id)) {
//             order = get().order.map(item => item.id === product.id ? {
//                 ...item,
//                 quantity: item.quantity + 1,
//                 subTotal: (item.quantity + 1) * item.price
//             } : item);

//         } else {
//             order = [...get().order, {
//                 ...data,
//                 quantity: 1,
//                 subTotal: 1 * product.price,
//             }];
//         }
        
//         set(() => ({
//             order
//         }));
//     },
//     increaseQuantity: (id) => {
//         set((state) => ({
//             order: state.order.map(item => item.id === id ? {
//                 ...item,
//                 quantity: item.quantity + 1,
//                 subTotal: (item.quantity + 1) * item.price
//             } : item)
//         }));
//     },
//     decreaseQuantity: (id) => {
//         const order = get().order.map(item => item.id === id ? {
//             ...item,
//             quantity: item.quantity - 1,
//             subTotal: (item.quantity - 1) * item.price
//         } : item)
//         set(() => ({
//             order
//         }))
//     },
//     removeItem: (id) => {
//         set((state) => ({
//             order: state.order.filter(item => item.id !== id)
//         }))
//     },
//     clearOrder: () => {
//         set(() => ({
//             order: []
//         }))
//     }
// }));


import { create } from "zustand";
import { OrderItem } from "./types";
import { Product } from "@prisma/client";

interface Store {
  order: OrderItem[];
  addToOrder: (product: Product) => void;
  increaseQuantity: (id: Product["id"]) => void;
  decreaseQuantity: (id: Product["id"]) => void;
  removeItem: (id: Product["id"]) => void;
  clearOrder: () => void;
}

export const useStore = create<Store>((set, get) => ({
  order: [],

  addToOrder: (product) => {
    let order = get().order;

    const existingItem = order.find((item) => item.id === product.id);

    if (existingItem) {
      order = order.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
              subTotal: (item.quantity + 1) * item.price,
            }
          : item
      );
    } else {
      const newItem: OrderItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        subTotal: product.price,
      };

      order = [...order, newItem];
    }

    set(() => ({ order }));
  },

  increaseQuantity: (id) => {
    set((state) => ({
      order: state.order.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
              subTotal: (item.quantity + 1) * item.price,
            }
          : item
      ),
    }));
  },

  decreaseQuantity: (id) => {
    const updatedOrder = get().order.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity - 1,
            subTotal: (item.quantity - 1) * item.price,
          }
        : item
    );

    set(() => ({ order: updatedOrder }));
  },

  removeItem: (id) => {
    set((state) => ({
      order: state.order.filter((item) => item.id !== id),
    }));
  },

  clearOrder: () => {
    set(() => ({ order: [] }));
  },
}));
