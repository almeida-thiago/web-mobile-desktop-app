import React from 'react'
import renderer from 'react-test-renderer'
import Preloader from '../preloader'

beforeAll(() => {})

describe('preloader component should works', () => {
  it('preloader renders correctly', () => {
    renderer.create(
      <Preloader loading={<p>loading...</p>} before={() => new Promise<void>(resolve => resolve())}>
        <div>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam autem vitae excepturi, porro debitis non error doloremque ex deserunt labore
          facere distinctio similique, delectus accusantium beatae repellendus. Odio, assumenda aut!
        </div>
      </Preloader>,
    )
  })
})

afterAll(() => {})
