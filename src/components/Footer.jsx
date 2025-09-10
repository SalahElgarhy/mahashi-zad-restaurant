export default function Footer(){
  return (
    <footer className="border-t border-[color:var(--borderc)] py-4">
      <div className="max-w-container mx-auto px-5 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-3 min-h-16">
        <div className="font-extrabold">محشي زاد</div>
        <ul className="flex gap-4 justify-center">
          <li><a href="#menu">القائمة</a></li>
          <li><a href="#about">من نحن</a></li>
          <li><a href="#contact">تواصل</a></li>
        </ul>
        <div className="justify-self-end text-textdim">© <span>{new Date().getFullYear()}</span> جميع الحقوق محفوظة</div>
      </div>
    </footer>
  )
}


