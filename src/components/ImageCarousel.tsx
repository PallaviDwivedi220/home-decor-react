import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

type Props = {
  images: string[]
  className?: string
}

export default function ImageCarousel({ images, className }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [origin, setOrigin] = useState('50% 50%')

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])
  const scrollTo = useCallback((i: number) => emblaApi && emblaApi.scrollTo(i), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, onSelect])

  return (
    <div className={className}>
      <div className="relative">
        <div className="overflow-hidden rounded-xl ring-1 ring-gray-200 shadow-soft" ref={emblaRef}>
          <div className="flex">
            {images.map((src, i) => (
              <div className="min-w-0 flex-[0_0_100%]" key={i}>
                <div className="group relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src={src}
                    alt={`Product image ${i + 1}`}
                    className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-110"
                    style={{ transformOrigin: origin as any }}
                    onMouseMove={(e) => {
                      const rect = (e.target as HTMLImageElement).getBoundingClientRect()
                      const x = ((e.clientX - rect.left) / rect.width) * 100
                      const y = ((e.clientY - rect.top) / rect.height) * 100
                      setOrigin(`${x}% ${y}%`)
                    }}
                    onClick={() => setLightboxOpen(true)}
                  />
                  <div className="pointer-events-none absolute inset-0 hidden items-end justify-end p-2 md:flex">
                    <span className="pointer-events-auto rounded-md bg-white/80 px-2 py-1 text-xs text-gray-700 ring-1 ring-gray-200">Click to zoom</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          aria-label="Previous image"
          onClick={scrollPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-white/90 ring-1 ring-gray-200 shadow hover:bg-white"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          aria-label="Next image"
          onClick={scrollNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-white/90 ring-1 ring-gray-200 shadow hover:bg-white"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex justify-center gap-2">
          {images.map((src, i) => (
            <button
              key={i}
              aria-label={`Go to image ${i + 1}`}
              onClick={() => scrollTo(i)}
              className={`relative overflow-hidden rounded-md ring-1 transition ${
                i === selectedIndex ? 'ring-gray-900' : 'ring-gray-300 hover:ring-gray-400'
              }`}
            >
              <img src={src} alt="" className="h-14 w-20 object-cover" />
            </button>
          ))}
        </div>
      )}

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            aria-label="Close"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-gray-900 shadow"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="flex h-full w-full items-center justify-center p-4">
            <img
              src={images[selectedIndex]}
              alt="Zoomed image"
              className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  )
}
