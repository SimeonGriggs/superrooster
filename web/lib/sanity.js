/* eslint-disable react/display-name */
// lib/sanity.js
import {
  createImageUrlBuilder,
  createPortableTextComponent,
  createPreviewSubscriptionHook,
  createCurrentUserHook,
} from 'next-sanity'
import dynamic from 'next/dynamic'

import {config} from './config'

const VideoPlayer = dynamic(() => import('../src/components/VideoPlayer'))

/**
 * Set up a helper function for generating Image URLs with only the asset reference data in your documents.
 * Read more: https://www.sanity.io/docs/image-url
 **/
export const urlFor = (source) => createImageUrlBuilder(config).image(source)

// Set up the live preview subscription hook
export const usePreviewSubscription = createPreviewSubscriptionHook(config)

// Set up Portable Text serialization
export const PortableText = createPortableTextComponent({
  ...config,
  // Serializers passed to @sanity/block-content-to-react
  // (https://github.com/sanity-io/block-content-to-react)
  serializers: {
    container: ({children}) => children,
    types: {
      video: ({node}) => <VideoPlayer url={node?.url} />,
    },
  },
})

// Helper function for using the current logged in user account
export const useCurrentUser = createCurrentUserHook(config)
