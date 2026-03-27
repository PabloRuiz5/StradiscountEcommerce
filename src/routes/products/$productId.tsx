import { Link, createFileRoute } from '@tanstack/react-router'
import products, { categories } from '../../data/products'
import { BuyButton } from '@/components/BuyButton'
import { AddToCartButton } from '@/components/AddToCartButton'
import { useCartCount } from '@/store/cart'


export const Route = createFileRoute('/products/$productId')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const product = products.find(
      (product) => product.id === +params.productId,
    )
    if (!product) {
      throw new Error('Product not found')
    }
    return product
  },
})

function RouteComponent() {
  const product = Route.useLoaderData()
  const categoryLabel = categories.find((c) => c.slug === product.category)?.label
  const cartCount = useCartCount()

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

      {/* Product Detail */}
      <main className="max-w-7xl mx-auto px-5 py-12">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-black mb-8 transition-colors">
          &larr; Todos los perfiles
        </Link>

        <div className="flex flex-col md:flex-row gap-12">
          <div className="w-full md:w-1/2">
            <div className="aspect-[3/4] overflow-hidden bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover scale-110w-full h-full object-cover transition-transform duration-500 hover:scale-145"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-start py-4">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">{categoryLabel}</p>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

            <div className="flex items-end gap-3 mb-6">
              <span className="text-5xl font-bold">${product.price}</span>
              <div className="pb-2">
                <span className="text-gray-400 line-through text-xl">$100</span>
                <p className="text-xs text-gray-400">simulación de salario tras rebaja estructural</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed mb-8">{product.description}</p>
            <span></span>
            <h4 className="text-xl font-bold mb-4">Composición</h4>
            <p className="text-gray-700 leading-relaxed mb-8">{product.composition}</p>

            <h4 className="text-xl font-bold mb-4">Cuidados</h4>
            <div className="flex items-center gap-3">
            <img
                src="/nolavar.png"
                className="w-12 h-12 object-contain"
              />{product.specific_care_img && (
              <img
                src={product.specific_care_img}
                className="w-8 h-8 object-contain"
            />
  )}
              </div><p className="text-gray-700 leading-relaxed mb-8">{product.cares}</p>

            

            <div className="flex gap-3">
              <AddToCartButton
                productId={product.id}
                className="flex-1 py-4 text-base bg-white text-black border-black hover:bg-gray-100 transition-colors"
              />
              
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
