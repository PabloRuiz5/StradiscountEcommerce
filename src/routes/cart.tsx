import { Link, createFileRoute } from '@tanstack/react-router'
import products, { categories } from '@/data/products'
import { useCart, updateQuantity, removeFromCart, clearCart } from '@/store/cart'

export const Route = createFileRoute('/cart')({
  component: CartPage,
})

const FULL_PRICE = 100

function CartPage() {
  const cartItems = useCart()

  const itemsWithProducts = cartItems
    .map((item) => {
      const product = products.find((p) => p.id === item.productId)
      if (!product) return null
      return { ...item, product }
    })
    .filter(Boolean) as Array<{
    productId: number
    quantity: number
    product: (typeof products)[0]
  }>

  const subtotalFull = itemsWithProducts.reduce(
    (sum, item) => sum + FULL_PRICE * item.quantity,
    0,
  )
  const subtotalActual = itemsWithProducts.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  )
  const totalDiscount = subtotalFull - subtotalActual

  return (
    <div className="min-h-screen bg-white">
      {/* Marquee Banner */}
      <div className="bg-black text-white py-2 overflow-hidden text-sm font-medium tracking-widest uppercase">
        <div className="marquee-track">
          <span className="whitespace-nowrap px-4">
            Si os la suda la brecha salarial como sudáis vuestras camisetas, esta es vuestra tienda
          </span>
          <span className="whitespace-nowrap px-4">
            Si os la suda la brecha salarial como sudáis vuestras camisetas, esta es vuestra tienda
          </span>
          <span className="whitespace-nowrap px-4">
            Si os la suda la brecha salarial como sudáis vuestras camisetas, esta es vuestra tienda
          </span>
          <span className="whitespace-nowrap px-4">
            Si os la suda la brecha salarial como sudáis vuestras camisetas, esta es vuestra tienda
          </span>
          <span className="whitespace-nowrap px-4">
            Si os la suda la brecha salarial como sudáis vuestras camisetas, esta es vuestra tienda
          </span>
          <span className="whitespace-nowrap px-4">
            Si os la suda la brecha salarial como sudáis vuestras camisetas, esta es vuestra tienda
          </span>
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-5 py-6">
          <div className="text-center">
            <Link
              to="/"
              className="text-4xl font-bold tracking-tight hover:opacity-70 transition-opacity"
            >
              <img src="logo.png" className="adjust"></img>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-5 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-black mb-8 transition-colors"
        >
          &larr; Volver a los perfiles
        </Link>

        <h1 className="text-3xl font-bold mb-8">Tu carrito</h1>

        {itemsWithProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg mb-6">Tu carrito está vacío</p>
            <Link
              to="/"
              className="inline-block px-8 py-3 bg-black text-white text-sm font-medium uppercase tracking-widest hover:bg-white hover:text-black border border-black transition-colors"
            >
              Compra ahora
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Cart Items */}
            <div className="flex-1">
              <div className="border-b border-gray-200 pb-2 mb-4 hidden md:grid grid-cols-12 gap-4 text-xs uppercase tracking-widest text-gray-400">
                <div className="col-span-6">Perfil</div>
                <div className="col-span-2 text-center">Cantidad</div>
                <div className="col-span-2 text-right">Diferencia salarial</div>
                <div className="col-span-2 text-right">Subtotal</div>
              </div>

              {itemsWithProducts.map(({ product, quantity }) => {
                const discount = FULL_PRICE - product.price
                const categoryLabel = categories.find(
                  (c) => c.slug === product.category,
                )?.label

                return (
                  <div
                    key={product.id}
                    className="border-b border-gray-200 py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
                  >
                    {/* Product Info */}
                    <div className="md:col-span-6 flex gap-4">
                      <Link
                        to="/products/$productId"
                        params={{ productId: product.id.toString() }}
                        className="shrink-0"
                      >
                        <div className="w-20 h-24 bg-gray-100 overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </Link>
                      <div className="flex flex-col justify-center">
                        <p className="text-xs uppercase tracking-widest text-gray-400">
                          {categoryLabel}
                        </p>
                        <Link
                          to="/products/$productId"
                          params={{ productId: product.id.toString() }}
                        >
                          <h3 className="font-semibold hover:underline">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-gray-500 mt-1">
                          ${product.price}{' '}
                          <span className="line-through text-gray-300">
                            ${FULL_PRICE}
                          </span>
                        </p>
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="text-xs text-gray-400 hover:text-red-500 mt-1 text-left transition-colors"
                        >
                          Quitar
                        </button>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="md:col-span-2 flex items-center justify-center gap-2">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors text-sm"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-sm font-medium">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors text-sm"
                      >
                        +
                      </button>
                    </div>

                    {/* Pay Gap Discount */}
                    <div className="md:col-span-2 text-right">
                      <span className="text-red-600 font-medium text-sm">
                        -${discount * quantity}
                      </span>
                    </div>

                    {/* Line Total */}
                    <div className="md:col-span-2 text-right font-semibold">
                      ${product.price * quantity}
                    </div>
                  </div>
                )
              })}

              <div className="mt-4">
                <button
                  onClick={clearCart}
                  className="text-sm text-gray-400 hover:text-red-500 transition-colors"
                >
                  Borrar carrito
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-80 shrink-0">
              <div className="bg-gray-50 border border-gray-200 p-6">
                <h2 className="text-lg font-bold mb-6 uppercase tracking-widest">
                  Resumen de pedido
                </h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Salario original
                    </span>
                    <span className="line-through text-gray-400">
                      ${subtotalFull}
                    </span>
                  </div>

                  <div className="border-t border-gray-200 pt-3">
                    <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                      Rebaja por brecha salarial
                    </p>
                    {itemsWithProducts.map(({ product, quantity }) => {
                      const discount = FULL_PRICE - product.price
                      return (
                        <div
                          key={product.id}
                          className="flex justify-between text-sm py-1"
                        >
                          <span className="text-gray-600">
                            {product.name}
                            {quantity > 1 ? ` x${quantity}` : ''}
                          </span>
                          <span className="text-red-600">
                            -${discount * quantity}
                          </span>
                        </div>
                      )
                    })}
                  </div>

                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-red-600 font-medium">
                      <span>Ahorro Total</span>
                      <span>-${totalDiscount}</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Has pagado</span>
                      <span>${subtotalActual}</span>
                    </div>
                  </div>
                  <span></span>
                </div>
                    <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg ">
                      <span>Gracias por rebajarte a comprar trabajo rebajado</span>
                    </div>
                  </div>
                {/* Visual pay gap bar */}
                <div className="mt-6">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Cuánto pagas</span>
                    <span>Salario real</span>
                  </div>
                  <div className="w-full bg-gray-200 h-3 overflow-hidden">
                    <div
                      className="bg-black h-full transition-all duration-500"
                      style={{
                        width: `${(subtotalActual / subtotalFull) * 100}%`,
                      }}
                    />
                  </div>
                  
                </div>

                <Link
                  to="/"
                  className="block w-full mt-6 py-3 bg-black text-white text-center text-sm font-medium uppercase tracking-widest hover:bg-white hover:text-black border border-black transition-colors"
                >
                  Continuar Comprando
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 px-5 text-center text-sm text-gray-400">
        <p>
          Stradiscount · Todos los precios documentan la brecha salarial sufrida por las mujeres
        </p>
      </footer>
    </div>
  )
}
