import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product, CartItem } from '@/data/mock'

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  
  // Actions
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  
  // Getters
  getTotalItems: () => number
  getTotalPrice: () => number
  getItemQuantity: (productId: string) => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product: Product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(item => item.productId === product.id)
          
          if (existingItem) {
            return {
              items: state.items.map(item =>
                item.productId === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              )
            }
          } else {
            return {
              items: [...state.items, {
                productId: product.id,
                product,
                quantity,
                price: product.price
              }]
            }
          }
        })
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter(item => item.productId !== productId)
        }))
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }
        
        set((state) => ({
          items: state.items.map(item =>
            item.productId === productId
              ? { ...item, quantity }
              : item
          )
        }))
      },

      clearCart: () => {
        set({ items: [] })
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }))
      },

      getTotalItems: () => {
        const { items } = get()
        return items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        const { items } = get()
        return items.reduce((total, item) => total + (item.price * item.quantity), 0)
      },

      getItemQuantity: (productId: string) => {
        const { items } = get()
        const item = items.find(item => item.productId === productId)
        return item ? item.quantity : 0
      }
    }),
    {
      name: 'cart-storage', // Key for localStorage
      partialize: (state) => ({ items: state.items }) // Only persist items
    }
  )
)

// Search store for handling search functionality
interface SearchStore {
  query: string
  isSearching: boolean
  results: Product[]
  
  setQuery: (query: string) => void
  setResults: (results: Product[]) => void
  setIsSearching: (isSearching: boolean) => void
  clearSearch: () => void
}

export const useSearchStore = create<SearchStore>()((set) => ({
  query: '',
  isSearching: false,
  results: [],

  setQuery: (query: string) => set({ query }),
  setResults: (results: Product[]) => set({ results }),
  setIsSearching: (isSearching: boolean) => set({ isSearching }),
  clearSearch: () => set({ query: '', results: [], isSearching: false })
}))

// User store (for MVP - just basic state)
interface UserStore {
  user: { id: string; name: string; email: string } | null
  isLoggedIn: boolean
  
  login: (user: { id: string; name: string; email: string }) => void
  logout: () => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,

      login: (user) => set({ user, isLoggedIn: true }),
      logout: () => set({ user: null, isLoggedIn: false })
    }),
    {
      name: 'user-storage'
    }
  )
)
