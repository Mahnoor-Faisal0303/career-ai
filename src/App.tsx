import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import Dashboard from './pages/Dashboard'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#635bdb', dark: '#5149c5', light: '#eeedff' },
    background: { default: '#f7f8fc', paper: '#ffffff' },
    text: { primary: '#20243a', secondary: '#747b91' },
    success: { main: '#2f9a78' },
  },
  typography: {
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h4: { fontWeight: 750, letterSpacing: '-0.045em' },
    h6: { fontWeight: 700, letterSpacing: '-0.025em' },
    button: { textTransform: 'none', fontWeight: 650 },
  },
  shape: { borderRadius: 14 },
  components: {
    MuiCard: { styleOverrides: { root: { border: '1px solid #e9ebf3', boxShadow: '0 8px 28px rgba(31, 40, 75, 0.045)' } } },
    MuiButton: { styleOverrides: { root: { borderRadius: 10, boxShadow: 'none' } } },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Dashboard />
    </ThemeProvider>
  )
}

export default App
