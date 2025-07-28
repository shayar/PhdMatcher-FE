import { useState, useEffect, useCallback } from 'react'

interface UseInfiniteScrollOptions {
  threshold?: number
  rootMargin?: string
}

export function useInfiniteScroll(
  callback: () => void,
  options: UseInfiniteScrollOptions = {}
) {
  const [isFetching, setIsFetching] = useState(false)
  const { threshold = 1.0, rootMargin = '0px' } = options

  useEffect(() => {
    if (!isFetching) return

    const fetchData = async () => {
      await callback()
      setIsFetching(false)
    }

    fetchData()
  }, [isFetching, callback])

  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (isFetching) return
      
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setIsFetching(true)
          }
        },
        { threshold, rootMargin }
      )

      if (node) observer.observe(node)

      return () => {
        if (node) observer.unobserve(node)
      }
    },
    [isFetching, threshold, rootMargin]
  )

  return { isFetching, lastElementRef }
}