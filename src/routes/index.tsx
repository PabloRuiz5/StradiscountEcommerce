import { Link, createFileRoute } from '@tanstack/react-router'
import products, { categories } from '@/data/products'
import { BuyButton } from '@/components/BuyButton'
import { AddToCartButton } from '@/components/AddToCartButton'
import { useCartCount } from '@/store/cart'

export const Route = createFileRoute('/')({
  component: ProductsIndex,
})

const MARQUEE_TEXT =
  'Si os la suda la brecha salarial como sudáis vuestras camisetas, esta es vuestra tienda'

function ProductsIndex() {
  const cartCount = useCartCount()

  return (
    <div className="min-h-screen bg-white">
      {/* Marquee Banner */}
      <div className="bg-black text-white py-2 overflow-hidden text-sm font-medium tracking-widest uppercase">
        <div className="marquee-track">
          <span className="whitespace-nowrap px-4">{MARQUEE_TEXT}</span>
          <span className="whitespace-nowrap px-4">{MARQUEE_TEXT}</span>
          <span className="whitespace-nowrap px-4">{MARQUEE_TEXT}</span>
          <span className="whitespace-nowrap px-4">{MARQUEE_TEXT}</span>
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-5 py-6">

          {/* Logo row — desktop: cart absolutely positioned right; mobile: stacked */}
          <div className="relative flex items-center justify-center mb-2">
            <img src="logo.png" className="adjust" />

            <Link
              to="/cart"
              className="
                absolute right-0 top-1/2 -translate-y-1/2
                flex items-center gap-2 px-4 py-2
                text-sm font-medium uppercase tracking-widest
                border border-gray-300
                hover:bg-black hover:text-white hover:border-black transition-colors
                hidden sm:flex
              "
            >
              Carrito
              {cartCount > 0 && (
                <span className="bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile-only cart row — shown below logo, right-aligned, above nav */}
          <div className="flex justify-end mb-4 sm:hidden">
            <Link
              to="/cart"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium uppercase tracking-widest border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-colors"
            >
              Carrito
              {cartCount > 0 && (
                <span className="bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Category Navigation */}
          <nav className="flex flex-wrap justify-center gap-1">
            {categories.map((cat) => {
              const product = products.find((p) => p.category === cat.slug)
              if (!product) return null
              return (
                <Link
                  key={cat.slug}
                  to="/products/$productId"
                  params={{ productId: product.id.toString() }}
                  className="px-8 py-4 text-sm font-medium uppercase tracking-widest border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-colors rounded-none"
                >
                  {cat.label}
                </Link>
              )
            })}
          </nav>

        </div>
      </header>

      {/* Hero Statement */}
      <section className="bg-gray-50 border-b border-gray-200 py-5 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-2xl font-light leading-relaxed">
            Todos los salarios de mujeres en {' '}
            <span className="font-bold">
              REBAJAS
            </span>{' '}
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <main className="max-w-7xl mx-auto px-5 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group">
              <Link
                to="/products/$productId"
                params={{ productId: product.id.toString()  }}
                className="block"
              >
                <div className="aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </Link>
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
                      {categories.find((c) => c.slug === product.category)?.label}
                    </p>
                    <Link
                      to="/products/$productId"
                      params={{ productId: product.id.toString() }}
                    >
                      <h2 className="font-semibold text-lg hover:underline">{product.name}</h2>
                    </Link>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-2xl font-bold">${product.price}</div>
                    <div className="text-xs text-gray-400 line-through">$100</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{product.shortDescription}</p>
                
                <div className="flex gap-2 mt-2">
                  <AddToCartButton
                    productId={product.id}
                    className="flex-1 bg-white text-black border-black hover:bg-gray-100 transition-colors"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
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
