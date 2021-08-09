import React from 'react'
import ErrorPage from 'next/error'
import {useRouter} from 'next/router'
import {groq} from 'next-sanity'

import {usePreviewSubscription} from '../lib/sanity'
import {getClient} from '../lib/sanity.server'
import ProseableText from '../src/components/ProseableText'

const pageQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    ...,
    "slug": slug.current,
  }
`

export default function Page({data, preview}) {
  const router = useRouter()

  const {data: page} = usePreviewSubscription(pageQuery, {
    params: data?.queryParams,
    initialData: data?.page,
    enabled: preview && data.page?.slug,
  })

  if (!router.isFallback && !data.page?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <article className="bg-blue-500 text-white p-4 md:px-4 md:py-8 xl:px-8 xl:py-16">
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-5xl xl:text-7xl font-bold text-yellow-400">
          {page?.title}
        </h1>
        {page?.content && <ProseableText blocks={page.content} />}
        <pre>{JSON.stringify(page, null, 2)}</pre>
      </div>
    </article>
  )
}

export async function getStaticProps({params, preview = true}) {
  const queryParams = {
    slug: params.slug,
  }

  const page = await getClient(preview).fetch(pageQuery, queryParams)

  return {
    props: {
      preview,
      data: {page, queryParams},
    },
  }
}

export async function getStaticPaths() {
  const paths = await getClient().fetch(
    groq`*[_type == "page" && defined(slug.current)][].slug.current`
  )

  return {
    paths: paths.map((slug) => ({params: {slug}})),
    fallback: true,
  }
}
