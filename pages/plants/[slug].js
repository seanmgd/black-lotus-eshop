import { useRouter } from 'next/router'

export async function getStaticPaths() {
  const request = await fetch(
    'https://exoticplant.vercel.app/public/api/products',
  )
  const json = await request.json()
  const paths = json.map((product) => ({
    params: { slug: product.slug },
  }))

  return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
  const request = await fetch(
    'https://exoticplant.vercel.app/public/api/product/' + params.slug,
  )

  const json = await request.json()
  return {
    props: {
      product: json,
    },
  }
}

export default function Plants({ product }) {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  } else {
    return <div>{product.name}</div>
  }
}
