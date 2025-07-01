'use client'

import { PropsWithChildren } from 'react'

interface SilentLinkProps {
  href: string
  replace?: boolean
  scroll?: boolean
  ariaLabel?: string
}

export function SilentLink({
  href,
  scroll = true,
  ariaLabel,
  children
}: PropsWithChildren<SilentLinkProps>) {
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.history.pushState(null, '', href)
    if (scroll) window.scrollTo(0, 0)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return (
    <a href={href} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </a>
  )
}
