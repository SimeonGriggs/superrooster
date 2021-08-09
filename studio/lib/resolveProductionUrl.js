const previewSecret = `p2avlffp4eg3urdg9s2wxotyoln97bq5azb6`
const remoteUrl = `https://superrooster.vercel.app`
const localUrl = `http://localhost:3000`

export default function resolveProductionUrl(doc, returnProd = false) {
  const baseUrl = window.location.hostname === 'localhost' && !returnProd ? localUrl : remoteUrl
  const previewUrl = new URL(`${baseUrl}/api/preview`)
  previewUrl.searchParams.append(`secret`, previewSecret)
  previewUrl.searchParams.append(`slug`, doc?.slug?.current ?? `/`)

  return previewUrl.toString()
}
