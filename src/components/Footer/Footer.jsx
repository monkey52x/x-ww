import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer glass">
      <div className="footer-inner">
        <p className="footer-copy">© {new Date().getFullYear()} x-ww</p>
      </div>
    </footer>
  )
}
