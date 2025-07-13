

'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { useEffect, useState } from 'react'

export function SearchBar() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [query, setQuery] = useState('')

  useEffect(() => {
    setQuery(searchParams.get('query') || '')
  }, [searchParams])

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    router.replace(`/?${params.toString()}`)
  }, 300)

  return (
    <div className="relative max-w-md w-full">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          handleSearch(e.target.value)
        }}
        className="w-full pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
      />
    <div className="absolute right-3 top-2.5 text-gray-400">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  </div>
    </div>
  )
}