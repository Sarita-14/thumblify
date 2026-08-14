import { useContext } from 'react'
import { AppContext } from './AppContext.jsx'

export const useApp = () => useContext(AppContext)
