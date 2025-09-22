import Navigation from './Navigation'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[color:var(--bg)] text-[color:var(--text)] font-cairo">
      <Navigation />
      <main className="pt-16"> {/* padding for fixed navigation */}
        {children}
      </main>
      <Footer />
    </div>
  )
}
