import React from 'react'
import renderer from 'react-test-renderer'
import {MemoryRouter} from 'react-router'
import mockAsyncStorage from '../__mocks__/@react-native-async-storage/async-storage'
import PageHome from '../pages/home'

beforeAll(() => {
  jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage)
})
describe('web app demo unit test', () => {
  it('renders correctly page home', () => {
    renderer.create(
      <MemoryRouter>
        <PageHome />
      </MemoryRouter>,
    )
  })
})

afterAll(() => {
  jest.unmock('@react-native-async-storage/async-storage')
})
