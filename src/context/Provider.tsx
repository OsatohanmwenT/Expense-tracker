import { ReactNode } from 'react'
import AuthProvider from './AuthProvider'
import { ExpenseProvider } from './ExpenseProvider'

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <ExpenseProvider>
        {children}
      </ExpenseProvider>
    </AuthProvider>
  )
}

export default Provider