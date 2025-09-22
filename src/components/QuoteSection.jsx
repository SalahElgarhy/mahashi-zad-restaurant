export default function QuoteSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-[#1a2e23] to-[#0f1412] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 text-[120px] font-bold text-primary rotate-12">"</div>
        <div className="absolute bottom-10 left-10 text-[120px] font-bold text-accent rotate-180">"</div>
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <blockquote className="text-3xl md:text-4xl font-light text-textdim leading-relaxed max-w-4xl mx-auto animate-fadeInUp">
          "أطعمنا تحمل في طياتها حكايات الأجداد وأسرار المطبخ المصري الأصيل، 
          نقدمها لكم بحب وشغف ليبقى الطعم في القلب قبل الذاكرة"
        </blockquote>
        
        <div className="mt-8 animate-fadeInUp delay-300">
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto"></div>
        </div>
      </div>
    </section>
  )
}
