
import { create } from 'zustand'
import {devtools} from 'zustand/middleware'
import {persist, createJSONStorage} from 'zustand/middleware';

const userStore = create(devtools(persist(((set) => ({
  user: {
    token: "asd"
  },
    saveToken: (token:string) => {
    set((state:any) => ({
      ...state,
      user: {
        ...state.user,
        token: token
      }
    }))
  },
    logout: () => {
      set((state:any) => ({
        ...state,
        user: {
          ...state.user,
          token: false
        }
      }))
    }
})),
  {
  name: 'userStorage', // unique name
  storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
})))
export default userStore
