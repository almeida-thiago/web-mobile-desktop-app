import {ReactElement, useLayoutEffect, useState} from 'react'

type PreloaderProps = {
  children: ReactElement
  loading: ReactElement
  before: () => Promise<void>
}

const Preloader = ({loading, children, before}: PreloaderProps): ReactElement => {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useLayoutEffect(() => {
    before().finally(() => setIsLoading(false))
  }, [before])

  if (isLoading) {
    return loading
  }
  return children
}

export default Preloader
