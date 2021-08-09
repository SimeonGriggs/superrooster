import sanityClient from 'part:@sanity/base/client'

const previewSecret = `p2avlffp4eg3urdg9s2wxotyoln97bq5azb6`
const remoteUrl = `https://candicorp.sanity.build`
const localUrl = `http://localhost:3000`

const client = sanityClient.withConfig({apiVersion: `2021-05-19`})

export default async function resolveProductionUrl(doc, returnProd = false) {
  const baseUrl = window.location.hostname === 'localhost' && !returnProd ? localUrl : remoteUrl
  const previewUrl = new URL(`${baseUrl}/api/preview`)
  previewUrl.searchParams.append(`secret`, previewSecret)
  previewUrl.searchParams.append(`slug`, doc?.slug?.current ?? `/`)

  return previewUrl.toString()
}
