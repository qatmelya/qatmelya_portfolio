export const PAGE_SIZE = 10

export interface ManifestItem {
  id: string
  date: string // ISO date
}

export interface BlogPostData {
  title: string
  contentHtml: string
}

export async function fetchManifest(): Promise<ManifestItem[]> {
  const res = await fetch('/blogs/manifest.json', { cache: 'no-store' })
  const contentType = res.headers.get('content-type') || ''
  if (!res.ok || !contentType.includes('application/json')) {
    throw new Error('Failed to load blog manifest')
  }
  let data: ManifestItem[]
  try {
    data = (await res.json()) as ManifestItem[]
  } catch {
    throw new Error('Failed to parse blog manifest')
  }
  // Sort by date desc if not already
  return [...data].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
}

export function paginate(manifest: ManifestItem[], page: number) {
  const totalPages = Math.max(1, Math.ceil(manifest.length / PAGE_SIZE))
  const safePage = Math.min(Math.max(1, page), totalPages)
  const start = (safePage - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE
  return { items: manifest.slice(start, end), totalPages, page: safePage }
}

export async function fetchPost(id: string): Promise<BlogPostData> {
  const res = await fetch(`/blogs/${id}.json`, { cache: 'no-store' })
  const contentType = res.headers.get('content-type') || ''
  if (!res.ok || !contentType.includes('application/json')) {
    throw new Error('Blog not found')
  }
  try {
    return (await res.json()) as BlogPostData
  } catch {
    throw new Error('Blog not found')
  }
}

export function extractExcerptFromHtml(html: string, wordCount = 50): string {
  const tmp = document.createElement('div')
  tmp.innerHTML = html
  const text = (tmp.textContent || tmp.innerText || '').trim()
  if (!text) return ''
  const words = text.split(/\s+/)
  return words.slice(0, wordCount).join(' ') + '...'
}
