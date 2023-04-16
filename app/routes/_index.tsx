import {
  V2_MetaFunction,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from '@remix-run/react'

import Tracks, { AddTrack } from '../components/tracks'

import {
  fetchAll as fetchAllTracks,
  insert as insertTrack,
} from '../services/tracks'

import { redirect, json, ActionArgs } from '@remix-run/node'

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: '🎷 | Smooth Remix Stack',
      httpEquiv: 'Content-Security-Policy',
      content:
        "default-src 'self'; media-src https://* ; img-src https://*; child-src 'none';",
    },
  ]
}

export const loader = async () => {
  console.log('Loader getting reached')

  const tracks = await fetchAllTracks()

  return json({ tracks })
}

export const action = async ({ request }: ActionArgs) => {
  const data = await request.formData()

  await insertTrack({
    title:
      data.get('title')?.length === 0
        ? '0K 601N8'
        : data.get('title')?.toString(),
    about:
      data.get('about')?.length === 0
        ? 'Something...'
        : data.get('about')?.toString(),
    t_url:
      data.get('link')?.length === 0
        ? 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        : data.get('link')?.toString(),
    author:
      data.get('author') !== null
        ? data.get('author')?.toString()
        : 'Rick Asty',
  })

  return redirect('/')
}

export function ErrorBoundary() {
  let error = useRouteError()

  console.log(error)

  if (isRouteErrorResponse(error)) {
    return (
      <>
        <h1>Some Error that needs to be handle by route</h1>
      </>
    )
  } else if (error instanceof Error) {
    return (
      <>
        <h1>Some error that needs to be handled by server</h1>
      </>
    )
  } else {
    return (
      <>
        <h1>Some random error that needs to be handled</h1>
      </>
    )
  }
}

const Index = () => {
  const { tracks } = useLoaderData<typeof loader>()

  return (
    <>
      <div className="content-center">
        <h1 className="font-bold border-b-2 text-5xl text-center p-8">
          Feel Your Soul!
        </h1>
        <p className="ml-35 p-5 font-mono font-medium tracking-wide">
          Join on apart of this sick beat and add a tune! But make sure you
          mention the artist, and put it in a list for better organization!
        </p>
      </div>
      <div className="content-body">
        <Tracks tracks={tracks} />
        <AddTrack />
      </div>
    </>
  )
}

export default Index
