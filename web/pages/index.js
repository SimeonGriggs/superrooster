import {groq} from 'next-sanity'
import Head from 'next/head'

import {urlFor} from '../lib/sanity'
import {getClient} from '../lib/sanity.server'

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export default function Home({data}) {
  const {menuItems} = data

  return (
    <div className="bg-blue-500 text-white flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="p-4 md:p-8 xl:p-16 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 xl:gap-8">
        {menuItems?.length > 0 &&
          menuItems
            .filter((item) => item?._id)
            .map((item) => (
              <article key={item._id}>
                {item?.image && (
                  <img
                    loading="lazy"
                    alt={item?.title}
                    src={urlFor(item.image).width(300).height(200).url()}
                  />
                )}
                {item?.title && <h2>{item.title}</h2>}
                {item?.price && <div>{formatter.format(item.price / 100)}</div>}
              </article>
            ))}
      </section>
    </div>
  )
}

export async function getStaticProps({params, preview = false}) {
  const query = groq`*[_type == "menuItem"]`
  const menuItems = await getClient(preview).fetch(query)

  return {
    props: {
      preview,
      data: {menuItems},
    },
  }
}
