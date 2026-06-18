import './App.css'
import Header from './component/Header'
import Footer from './component/Footer'
import Main from './component/Main'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <Main />
      </main>

      <Footer />
    </div>
  )
}

export default App