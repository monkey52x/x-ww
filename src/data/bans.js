import { writable, derived } from 'svelte/store'

const KEY = 'xww-dota-bans'

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return new Set()
    const arr = JSON.parse(raw)
    return new Set(Array.isArray(arr) ? arr.filter((x) => typeof x === 'string') : [])
  } catch {
    return new Set()
  }
}

function createBans() {
  const { subscribe, update, set } = writable(load())

  try {
    subscribe((val) => {
      localStorage.setItem(KEY, JSON.stringify([...val]))
    })
  } catch {
    // private mode etc. — bans just won't persist
  }

  return {
    subscribe,
    toggle: (heroKey) =>
      update((set) => {
        const next = new Set(set)
        if (next.has(heroKey)) next.delete(heroKey)
        else next.add(heroKey)
        return next
      }),
    clear: () => set(new Set()),
  }
}

export const banned = createBans()
export const banCount = derived(banned, ($banned) => $banned.size)
