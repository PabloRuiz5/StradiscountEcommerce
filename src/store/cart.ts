import { useSyncExternalStore } from 'react'

export interface CartItem {
  productId: number
  quantity: number
}

let cartItems: CartItem[] = []
const listeners = new Set<() => void>()

function loadFromStorage(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem('cart')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function persist() {
  if (typeof window === 'undefined') return
  localStorage.setItem('cart', JSON.stringify(cartItems))
}

function notify() {
  persist()
  listeners.forEach((l) => l())
}

export function addToCart(productId: number) {
  const existing = cartItems.find((i) => i.productId === productId)
  if (existing) {
    cartItems = cartItems.map((i) =>
      i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i,
    )
  } else {
    cartItems = [...cartItems, { productId, quantity: 1 }]
  }
  notify()
}

export function removeFromCart(productId: number) {
  cartItems = cartItems.filter((i) => i.productId !== productId)
  notify()
}

export function updateQuantity(productId: number, quantity: number) {
  if (quantity <= 0) {
    removeFromCart(productId)
    return
  }
  cartItems = cartItems.map((i) =>
    i.productId === productId ? { ...i, quantity } : i,
  )
  notify()
}

export function clearCart() {
  cartItems = []
  notify()
}

function getSnapshot(): CartItem[] {
  return cartItems
}

function getServerSnapshot(): CartItem[] {
  return []
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  // Initialize from storage on first subscribe
  if (cartItems.length === 0) {
    const stored = loadFromStorage()
    if (stored.length > 0) {
      cartItems = stored
      listener()
    }
  }
  return () => listeners.delete(listener)
}

export function useCart(): CartItem[] {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

export function useCartCount(): number {
  const items = useCart()
  return items.reduce((sum, i) => sum + i.quantity, 0)
}
