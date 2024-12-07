import { ReactNode } from 'react'
import AuthProvider from './AuthProvider'
import { ExpenseProvider } from './ExpenseProvider'
import ThemeProvider from './ThemeProvider'

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <ExpenseProvider>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </ExpenseProvider>
    </AuthProvider>
  )
}

export default Provider