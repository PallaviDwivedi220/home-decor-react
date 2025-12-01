import { useSearchParams } from 'react-router-dom';
import { products } from '@/data/products';
import { useCart } from '@/store/cart';
import { useEffect, useMemo, useState } from 'react';
import PriceRangeSlider from '@/components/PriceRangeSlider';
import { toast } from 'sonner';
import ProductCardCompact from '@/components/ProductCardCompact';
import { Select } from '@/components/ui/select';

type Category = 'all' | 'wall-art' | 'lamps' | 'rugs' | 'plants' | 'furniture'
type Style = 'all' | 'modern' | 'boho' | 'minimal' | 'classic'
type SortBy = 'popular' | 'new' | 'price-asc' | 'price-desc'

export default function Products() {
  const add = useCart((s) => s.add);
  const [searchParams, setSearchParams] = useSearchParams();

  // Helpers to validate params
  const validCategory = new Set<Category>(['all','wall-art','lamps','rugs','plants','furniture'])
  const validStyle = new Set<Style>(['all','modern','boho','minimal','classic'])
  const validSort = new Set<SortBy>(['popular','new','price-asc','price-desc'])

  // Initialize state from URL params (lazy initializer to avoid double work)
  const hasQuery = searchParams.toString().length > 0

  const [category, setCategory] = useState<Category>(() => {
    const v = searchParams.get('category') as Category | null
    if (v && validCategory.has(v)) return v
    if (!hasQuery) {
      try {
        const saved = JSON.parse(localStorage.getItem('productFilters') || '{}')
        if (saved?.category && validCategory.has(saved.category)) return saved.category
      } catch {}
    }
    return 'all'
  })
  const [style, setStyle] = useState<Style>(() => {
    const v = searchParams.get('style') as Style | null
    if (v && validStyle.has(v)) return v
    if (!hasQuery) {
      try {
        const saved = JSON.parse(localStorage.getItem('productFilters') || '{}')
        if (saved?.style && validStyle.has(saved.style)) return saved.style
      } catch {}
    }
    return 'all'
  })
  const [minPrice, setMinPrice] = useState<number>(() => {
    const sp = searchParams.get('min')
    if (sp != null) {
      const v = Number(sp)
      return Number.isFinite(v) ? v : 0
    }
    if (!hasQuery) {
      try {
        const saved = JSON.parse(localStorage.getItem('productFilters') || '{}')
        if (typeof saved?.min === 'number') return saved.min
      } catch {}
    }
    return 0
  })
  const [maxPrice, setMaxPrice] = useState<number>(() => {
    const sp = searchParams.get('max')
    if (sp != null) {
      const v = Number(sp)
      return Number.isFinite(v) ? v : 600
    }
    if (!hasQuery) {
      try {
        const saved = JSON.parse(localStorage.getItem('productFilters') || '{}')
        if (typeof saved?.max === 'number') return saved.max
      } catch {}
    }
    return 600
  })
  const [sortBy, setSortBy] = useState<SortBy>(() => {
    const v = searchParams.get('sort') as SortBy | null
    if (v && validSort.has(v)) return v
    if (!hasQuery) {
      try {
        const saved = JSON.parse(localStorage.getItem('productFilters') || '{}')
        if (saved?.sort && validSort.has(saved.sort)) return saved.sort
      } catch {}
    }
    return 'popular'
  })
  const [visible, setVisible] = useState<number>(() => {
    const sp = searchParams.get('visible')
    if (sp != null) {
      const v = Number(sp)
      return Number.isFinite(v) && v > 0 ? v : 8
    }
    if (!hasQuery) {
      try {
        const saved = JSON.parse(localStorage.getItem('productFilters') || '{}')
        if (typeof saved?.visible === 'number' && saved.visible > 0) return saved.visible
      } catch {}
    }
    return 8
  })

  // Initial loading skeleton (small delay for UX)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(t)
  }, [])

  // Sync URL when state changes
  const buildParams = () => {
    const next: Record<string, string> = {}
    if (category !== 'all') next.category = category
    if (style !== 'all') next.style = style
    if (minPrice !== 0) next.min = String(minPrice)
    if (maxPrice !== 600) next.max = String(maxPrice)
    if (sortBy !== 'popular') next.sort = sortBy
    if (visible !== 8) next.visible = String(visible)
    return next
  }

  // Write state -> URL
  const currentKey = searchParams.toString()
  const stateKey = new URLSearchParams(buildParams()).toString()
  if (stateKey !== currentKey) {
    // replace to avoid history spam when adjusting sliders/inputs
    setSearchParams(buildParams(), { replace: true })
  }

  // Read URL -> state (back/forward) while avoiding loops
  const spCategory = searchParams.get('category') as Category | null
  const spStyle = searchParams.get('style') as Style | null
  const spMin = searchParams.get('min')
  const spMax = searchParams.get('max')
  const spSort = searchParams.get('sort') as SortBy | null
  const spVisible = searchParams.get('visible')
  if (spCategory && validCategory.has(spCategory) && spCategory !== category) setCategory(spCategory)
  if (spStyle && validStyle.has(spStyle) && spStyle !== style) setStyle(spStyle)
  if (spSort && validSort.has(spSort) && spSort !== sortBy) setSortBy(spSort)
  if (spMin) {
    const v = Number(spMin)
    if (Number.isFinite(v) && v !== minPrice) setMinPrice(v)
  }
  if (spMax) {
    const v = Number(spMax)
    if (Number.isFinite(v) && v !== maxPrice) setMaxPrice(v)
  }
  if (spVisible) {
    const v = Number(spVisible)
    if (Number.isFinite(v) && v > 0 && v !== visible) setVisible(v)
  }

  // Persist to localStorage as a fallback (does not override URL)
  useEffect(() => {
    const payload = { category, style, min: minPrice, max: maxPrice, sort: sortBy, visible }
    try {
      localStorage.setItem('productFilters', JSON.stringify(payload))
    } catch {}
  }, [category, style, minPrice, maxPrice, sortBy, visible])

  const filtered = useMemo(() => {
    let list = products.slice()
    if (category !== 'all') list = list.filter((p) => p.category === category)
    if (style !== 'all') list = list.filter((p) => p.style === style)
    list = list.filter((p) => p.price >= minPrice && p.price <= maxPrice)

    switch (sortBy) {
      case 'popular':
        list.sort((a, b) => b.rating - a.rating)
        break
      case 'new':
        // mock: higher id considered newer
        list.sort((a, b) => (a.id < b.id ? 1 : -1))
        break
      case 'price-asc':
        list.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list.sort((a, b) => b.price - a.price)
        break
    }
    return list
  }, [category, style, minPrice, maxPrice, sortBy])

  const visibleItems = filtered.slice(0, visible)
  const canLoadMore = visible < filtered.length
  const fmt = useMemo(() => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }), [])

  function resetFilters() {
    setCategory('all')
    setStyle('all')
    setMinPrice(0)
    setMaxPrice(600)
    setSortBy('popular')
    setVisible(8)
    toast.success('Filters reset')
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">All Products</h1>
          <div className="text-sm text-gray-600">{visibleItems.length} of {filtered.length} items</div>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-700">Sort</label>
            <Select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortBy)} className="h-9 px-2 py-1 text-sm w-[160px]">
              <option value="popular">Popular</option>
              <option value="new">New</option>
              <option value="price-asc">Price ↑</option>
              <option value="price-desc">Price ↓</option>
            </Select>
          </div>
          <button onClick={resetFilters} className="text-sm underline text-gray-700">Reset</button>
        </div>
      </div>

      {/* Active filter chips */}
      <div className="mb-4 flex flex-wrap gap-2 text-sm">
        {category !== 'all' && (
          <button
            className="rounded-full bg-gray-100 px-3 py-1 text-gray-800 ring-1 ring-gray-200 hover:bg-gray-200"
            onClick={() => setCategory('all')}
          >
            Category: {category} ×
          </button>
        )}
        {style !== 'all' && (
          <button
            className="rounded-full bg-gray-100 px-3 py-1 text-gray-800 ring-1 ring-gray-200 hover:bg-gray-200"
            onClick={() => setStyle('all')}
          >
            Style: {style} ×
          </button>
        )}
        {(minPrice !== 0 || maxPrice !== 600) && (
          <button
            className="rounded-full bg-gray-100 px-3 py-1 text-gray-800 ring-1 ring-gray-200 hover:bg-gray-200"
            onClick={() => { setMinPrice(0); setMaxPrice(600); }}
          >
            Price: {fmt.format(minPrice)}–{fmt.format(maxPrice)} ×
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Filters */}
        <aside className="lg:col-span-3 space-y-4">
          <div className="rounded-xl ring-1 ring-gray-200 bg-white p-4 shadow-soft lg:sticky lg:top-24">
            <div className="font-medium text-gray-900 mb-3">Filters</div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Category</label>
                <Select value={category} onChange={(e) => setCategory(e.target.value as Category)}>
                  <option value="all">All</option>
                  <option value="wall-art">Wall Art</option>
                  <option value="lamps">Lamps</option>
                  <option value="rugs">Rugs</option>
                  <option value="plants">Plants</option>
                  <option value="furniture">Furniture</option>
                </Select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Style</label>
                <Select value={style} onChange={(e) => setStyle(e.target.value as Style)}>
                  <option value="all">All</option>
                  <option value="modern">Modern</option>
                  <option value="boho">Boho</option>
                  <option value="minimal">Minimal</option>
                  <option value="classic">Classic</option>
                </Select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Price range</label>
                <PriceRangeSlider
                  min={0}
                  max={600}
                  valueMin={minPrice}
                  valueMax={maxPrice}
                  step={5}
                  onChange={(lo, hi) => {
                    setMinPrice(lo)
                    setMaxPrice(hi)
                  }}
                />
                <div className="mt-2 flex justify-between text-xs text-gray-600">
                  <span>{fmt.format(minPrice)}</span>
                  <span>{fmt.format(maxPrice)}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Grid */}
        <section className="lg:col-span-9">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-xl ring-1 ring-gray-200 bg-white overflow-hidden shadow-soft animate-pulse">
                  <div className="aspect-square bg-gray-200" />
                  <div className="p-3 space-y-2">
                    <div className="h-3 w-2/3 bg-gray-200 rounded" />
                    <div className="h-3 w-1/3 bg-gray-200 rounded" />
                    <div className="h-8 w-full bg-gray-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
          <div className="rounded-xl ring-1 ring-gray-200 bg-white p-8 text-center text-gray-700">
            No products match your filters.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6">
              {visibleItems.map((p) => (
                <ProductCardCompact key={p.id} product={p} onAdd={() => { add(p, 1); toast.success('Added to cart'); }} />
              ))}
            </div>

            {canLoadMore && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setVisible((v) => v + 8)}
                  className="rounded-md ring-1 ring-gray-300 px-4 py-2.5 text-gray-900 hover:bg-gray-50"
                >
                  Load more
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  </div>
);
}
