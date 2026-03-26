import { useState } from "react"

export default function ProductCarousel({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0)

  const next = () => setIndex((index + 1) % images.length)
  const prev = () =>
    setIndex((index - 1 + images.length) % images.length)

  return (
    <div style={{ textAlign: "center" }}>
      <img
        src={images[index]}
        alt="product"
        style={{ width: "300px" }}
      />

      <div>
        <button onClick={prev}>⬅</button>
        <button onClick={next}>➡</button>
      </div>
    </div>
  )
}