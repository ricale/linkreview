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
  }
}

const { subscribe, set, update } = writable<StoreState>({ currentUser: null })

const store = {
  subscribe,
  setCurrentUser: (currentUser: StoreState['currentUser']) => update(st => ({ ...st, currentUser }))
}

export default store;
