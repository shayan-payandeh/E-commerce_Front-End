import Cookies from 'js-cookie';
import { createContext, useContext, useReducer } from 'react';

// const StoreContext = createContext();
// const StoreContextDispatcher = createContext();

// const initialState = {
//   cart: {
//     cartItems: Cookies.get('cartItems')
//       ? JSON.parse(Cookies.get('cartItems'))
//       : [],

//     shippingAddress: Cookies.get('shippingAddress')
//       ? JSON.parse(Cookies.get('shippingAddress'))
//       : {},

//     paymentMethod: Cookies.get('paymentMethod')
//       ? Cookies.get('paymentMethod')
//       : '',
//   },

//   userInfo: Cookies.get('userInfo')
//     ? JSON.parse(Cookies.get('userInfo'))
//     : null,

//   language: Cookies.get('language') ? Cookies.get('language') : 'English',
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case 'LANGUAGE_CHANGE': {
//       Cookies.set('language', action.payload);
//       return { ...state, language: action.payload };
//     }

//     case 'CART_ADD_ITEM': {
//       const newItem = action.payload;
//       const existItem = state.cart.cartItems.find(
//         (item) => item._id === newItem._id
//       );

//       const cartItems = existItem
//         ? state.cart.cartItems.map((item) =>
//             item._id === existItem._id ? newItem : item
//           )
//         : [...state.cart.cartItems, newItem];

//       Cookies.set('cartItems', JSON.stringify(cartItems));
//       return { ...state, cart: { ...state.cart, cartItems } };
//     }

//     case 'CART_REMOVE_ITEM': {
//       const cartItems = state.cart.cartItems.filter(
//         (item) => item._id !== action.payload._id
//       );

//       Cookies.set('cartItems', JSON.stringify(cartItems));
//       return { ...state, cart: { ...state.cart, cartItems } };
//     }

//     case 'CART_CLEAR': {
//       Cookies.remove('cartItems');
//       return { ...state, cart: { ...state.cart, cartItems: [] } };
//     }

//     case 'SAVE_SHIPPING_ADDRESS': {
//       Cookies.set('shippingAddress', JSON.stringify(action.payload));
//       return {
//         ...state,
//         cart: { ...state.cart, shippingAddress: action.payload },
//       };
//     }

//     case 'SAVE_PAYMENT_METHOD': {
//       Cookies.set('paymentMethod', action.payload);
//       return {
//         ...state,
//         cart: { ...state.cart, paymentMethod: action.payload },
//       };
//     }

//     case 'USER_LOGIN': {
//       const userInfo = action.payload;
//       Cookies.set('userInfo', JSON.stringify(userInfo));
//       return { ...state, userInfo: userInfo };
//     }

//     case 'USER_LOGOUT': {
//       Cookies.remove('userInfo');
//       Cookies.remove('cartItems');
//       Cookies.remove('shippingAddress');
//       Cookies.remove('paymentMethod');
//       return {
//         ...state,
//         userInfo: null,
//         cart: { cartItems: [], shippingAddress: {}, paymentMethod: '' },
//       };
//     }

//     default:
//       return state;
//   }
// }

// const StoreProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   return (
//     <StoreContext.Provider value={state}>
//       <StoreContextDispatcher.Provider value={dispatch}>
//         {children}
//       </StoreContextDispatcher.Provider>
//     </StoreContext.Provider>
//   );
// };

// export default StoreProvider;

// export const useStore = () => useContext(StoreContext);
// export const useStoreAction = () => useContext(StoreContextDispatcher);

const StoreContext = createContext();

const initialState = {
  cart: {
    cartItems: Cookies.get('cartItems')
      ? JSON.parse(Cookies.get('cartItems'))
      : [],
    paymentMethod: Cookies.get('paymentMethod')
      ? Cookies.get('paymentMethod')
      : '',
    shippingAddress: Cookies.get('shippingAddress')
      ? JSON.parse(Cookies.get('shippingAddress'))
      : {},
  },
  userInfo: Cookies.get('userInfo')
    ? JSON.parse(Cookies.get('userInfo'))
    : null,

  language: Cookies.get('language') ? Cookies.get('language') : 'English',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'CART_ADD_ITEM': {
      const existItem = state.cart.cartItems.find(
        (item) => item._id === action.payload._id
      );

      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? action.payload : item
          )
        : [...state.cart.cartItems, action.payload];
      Cookies.set('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id === action.payload._id
      );
      Cookies.set('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'SAVE_SHIPPING_ADDRESS': {
      Cookies.set('shippingAddress', JSON.stringify(action.payload));
      return {
        ...state,
        cart: { ...state.cart, shippingAddress: action.payload },
      };
    }
    case 'SAVE_PAYMENT_METHOD': {
      Cookies.set('paymentMethod', action.payload);
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };
    }
    case 'CART_CLEAR': {
      Cookies.remove('cartItems');
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    }

    case 'USER_LOGIN': {
      Cookies.set('userInfo', JSON.stringify(action.payload));
      return { ...state, userInfo: action.payload };
    }
    case 'USER_LOGOUT': {
      Cookies.remove('userInfo');
      Cookies.remove('cartItems');
      Cookies.remove('shippingAddress');
      Cookies.remove('paymentMethod');
      return {
        ...state,
        cart: { cartItems: [], shippingAddress: {}, paymentMethod: '' },
        userInfo: null,
      };
    }

    default:
      return state;
  }
};

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export default StoreProvider;
