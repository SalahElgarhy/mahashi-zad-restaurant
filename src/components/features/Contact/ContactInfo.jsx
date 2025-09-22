export default function ContactInfo(){
  return (
    <div className="mt-4 border border-[color:var(--borderc)] rounded-xl p-4 bg-[linear-gradient(180deg,#141b17,#101613)]">
      <h3 className="text-xl font-bold mb-2 text-[color:var(--accent)]">أرقام التواصل</h3>
      <ul className="grid gap-2">
        <li><a className="underline" href="https://wa.me/201105642820" target="_blank" rel="noopener noreferrer">01105642820</a> — للطلب واتساب</li>
        <li><a className="underline" href="tel:0227304080">0227304080</a> — للطلب والاستفسار</li>
        <li><a className="underline" href="tel:01021407307">01021407307</a> — للشكاوى والاقتراحات</li>
      </ul>
      <div className="mt-3 text-textdim">
        العنوان: عماره 18, شارع مدرسة البارون، Al Abageyah, El Mokattam, Cairo Governorate 4254005
        {' '}(<a className="underline" href="https://maps.app.goo.gl/cyB4BQjsJeTFhcbv7" target="_blank" rel="noopener noreferrer">افتح على الخريطة</a>)
      </div>
      <div className="mt-2 text-textdim">ساعات العمل: من 2:00 مساءً إلى 9:00 مساءً</div>
      <div className="mt-3 flex gap-3 flex-wrap">
        <a className="btn btn-primary" href="https://wa.me/201105642820" target="_blank" rel="noopener noreferrer">اطلب عبر واتساب</a>
        <a className="btn btn-outline" href="tel:0227304080">اتصل الآن</a>
        <a className="btn btn-outline" href="https://www.facebook.com/share/17HDh4Dkb2/" target="_blank" rel="noopener noreferrer">فيسبوك</a>
        <a className="btn btn-outline" href="https://www.instagram.com/mahashi.zad?igsh=dmp0c3J6ZmozZDAw" target="_blank" rel="noopener noreferrer">إنستجرام</a>
      </div>
    </div>
  )
}


