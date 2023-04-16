import { Track } from '@prisma/client'

import { Form } from '@remix-run/react'

import { random } from '../utils'

import MediaPlayer from 'react-player'

export function AddTrack() {
  return (
    <>
      <div className="form-main">
        <Form method="POST">
          <div className="form-component">
            <label className="text-white" htmlFor="title">
              Track Title
            </label>{' '}
            <br />
            <input
              placeholder="Insert Title"
              type="text"
              name="title"
              id="title"
            />
          </div>
          <div className="form-component">
            <label className="text-white" htmlFor="link">
              Track Link
            </label>{' '}
            <br />
            <input
              placeholder="Insert Track Link!"
              type="text"
              name="link"
              id="link"
            />
          </div>
          <div className="form-component">
            <label className="text-white" htmlFor="about">
              About The Track
            </label>{' '}
            <br />
            <input type="text" placeholder="About?" name="about" id="about" />
          </div>
          <div className="form-component">
            <button
              className="bg-cyan-500 hover:bg-cyan-700 ml-12 text-white btn"
              type="submit"
              name="intent"
              value="submit"
            >
              Add Track!
            </button>
          </div>
        </Form>
      </div>
    </>
  )
}

type ListTracksProps = { tracks: Track[] }

export default function ListTracks({ tracks }: ListTracksProps) {
  return (
    <>
      {tracks.length !== 0 ? (
        tracks.map((track) => (
          <div key={random('number')} className="track-card">
            <div className="flex justify-content">
              <MediaPlayer url={track.t_url} />
            </div>
            <h2 className="track-title">Track Title - {track.title}</h2>
            <p className="track-about">Track Description - {track.about}</p>
          </div>
        ))
      ) : (
        <div className="track-card">
          <h2>No Tracks Found...</h2>
        </div>
      )}
    </>
  )
}
