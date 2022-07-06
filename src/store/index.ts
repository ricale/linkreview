import { writable } from "svelte/store";

type StoreState = {
  currentUser: {
    email: string
    name?: string
    provider: string
    thumbnailUrl?: string
    uidInProvider: string
    uid: string
    openid: string
  } | null
}

const { subscribe, set, update } = writable<StoreState>({ currentUser: undefined })

const store = {
  subscribe,
  setCurrentUser: (currentUser: StoreState['currentUser']) => update(st => ({ ...st, currentUser }))
}

export default store;
