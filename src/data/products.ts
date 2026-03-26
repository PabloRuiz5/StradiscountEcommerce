

export interface Product {
  id: number
  name: string
  image: string
  description: string
  shortDescription: string
  price: number
  category: string,
  composition: string,
  cares: string,
  specific_care_img: string
}

const products: Array<Product> = [
  {
    id: 1,
    name: 'Art Director (20%)',
    category: 'dresses',
    image: "/cami1.png",
    shortDescription: 'Directora de arte de corte versátil con alta capacidad creativa y atención al detalle.',
    description:
      ' Rebaja aplicada automáticamente.',
    price: 80,
    composition: "Creatividad, pensamiento fuera de la caja, atención al detalle, mujer.",
    cares: "No lavar en igualdad.",
    specific_care_img: ""

  },
  {
    id: 2,
    name: 'Copywriter (30%)',
    category: 'blazers',
    image: '/cami2.png',
    shortDescription: 'Redactora creativa con cremallera conceptual, centrada en el desarrollo de ideas y construcción de mensajes. ',
    description:
      'Rebaja aplicada por conciliación activa.',
    price: 70,
    composition: "Redación creativa, humor inteligente, mujer, madre.",
    cares: "No lavar en igualdad. Secar en ciclo interrumpido.",
    specific_care_img: "/secarciclo.png"

  },
  {
    id: 3,
    name: 'Account Executive (29%)',
    category: 'tops',
    image: '/cami4.png',
    shortDescription: 'Ejecutiva de cuentas de cierre funcional orientada al seguimiento continuo.',
     description:
      'Rebaja ajustada por desviarse del estándar.',
    price: 71,
    composition: "Escucha activa, relación con el cliente, mujer, gorda.",
    cares: "No lavar en igualdad. No planchar al estándar.",
    specific_care_img: "/noplancha.png"
  },
  {
    id: 4,
    name: 'Community Manager (40%)',
    category: 'trousers',
    image: '/cami3.png',
    shortDescription: 'Community manager de tiro constante pensada para interacción continua.',
    description:
      'Rebaja aplicada por origen percibido.',
    price: 60,
    composition: "Paciencia digital, respuesta inmediata, mujer, racializada.",
    cares: "No lavar en igualdad. No blanquear, reducir visibilidad.",
    specific_care_img: "/noblanquear.png"
  },
  {
    id: 5,
    name: 'Graphic Designer (35%)',
    category: 'shoes',
    image: '/cami5.png',
    shortDescription: 'Diseñadora gráfica con escote visual preciso y coherencia estética.',
    description:
      'Rebaja aplicada por urgencia económica.',
    price: 65,
    composition: "Criterio visual, amor por la retícula, mujer, precaria.",
    cares: "No lavar en igualdad. Solo solvente económico.",
    specific_care_img: "/nosecar.png"
  },
  {
    id: 6,
    name: 'Strategic Planner (33%)',
    category: 'accessories',
    image: '/cami6.png',
    shortDescription: 'Planner estratégica de estructura analítica y enfoque a largo plazo.',
    description:
      'Rebaja ajustada a sus gustos.',
    price: 67,
    composition: "Estrategia creativa, obsesión por los datos, mujer, lesbiana.",
    cares: "No lavar en igualdad. No secar en público.",
    specific_care_img: "/secarpublico.png"
  },
]

export const categories = [
  { slug: 'dresses', label: 'Art Director' },
  { slug: 'blazers', label: 'Copywriter' },
  { slug: 'tops', label: 'Account Executive' },
  { slug: 'trousers', label: 'Community Manager' },
  { slug: 'shoes', label: 'Graphic Designer' },
  { slug: 'accessories', label: 'Planner' },
]

export default products
