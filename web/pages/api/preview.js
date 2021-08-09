export default function preview(req, res) {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (req.query.secret !== process.env.SANITY_PREVIEW_SECRET) {
    return res.status(401).json({message: `Invalid Secret`})
  }

  if (!req.query.slug) {
    return res.status(401).json({message: 'No slug in query'})
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({})

  const pathname = req?.query?.slug ? `/${req.query.slug}` : `/`

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  return res.writeHead(307, {Location: pathname}).end()
}
