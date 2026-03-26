import { useState } from 'react'
import { addToCart } from '@/store/cart'

export function AddToCartButton({
  productId,
  className = '',
}: {
  productId: number
  className?: string
}) {
  const [added, setAdded] = useState(false)

  const handleClick = () => {
    addToCart(productId)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <button
      onClick={handleClick}
      className={`px-6 py-2 border transition-colors ${className}`}
    >
      {added ? 'Añadido!' : 'Añadir al carrito'}
    </button>
  )
}
