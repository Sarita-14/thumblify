import { useContext } from 'react'
import { AppContext } from './AppContextObject.js'

export const useApp = () => useContext(AppContext)
