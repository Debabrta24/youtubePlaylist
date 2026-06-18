import './App.css'
import { Analytics } from "@vercel/analytics/react"
import Header from './component/Header'
import Footer from './component/Footer'
import Main from './component/Main'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Analytics/>
      <Header />

      <main className="flex-1">
        <Main />
      </main>

      <Footer />
    </div>
  )
}

export default App