export default function AboutSection(){
  return (
    <section id="about" className="py-16">
      <div className="max-w-container mx-auto px-5">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">من نحن</h2>
          <p className="text-textdim text-lg leading-relaxed mb-6">
            منذ سنين ونحن نلفّ المحشي بحب، على طريقة الجدّات، مع لمسة عصرية في التقديم. 
            نستخدم أفضل المكونات الطازجة لنقدّم لك وجبة دافئة تُشبه البيت.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-surface border border-[color:var(--borderc)] rounded-xl p-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌿</span>
              </div>
              <h3 className="font-bold mb-2">مكونات طازجة يوميًا</h3>
              <p className="text-textdim text-sm">نختار أجود الخضروات والأرز الطازج كل يوم</p>
            </div>
            
            <div className="bg-surface border border-[color:var(--borderc)] rounded-xl p-6">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👩‍🍳</span>
              </div>
              <h3 className="font-bold mb-2">خلطات سرّية بنكهات أصيلة</h3>
              <p className="text-textdim text-sm">وصفات عائلية متوارثة بلمسة عصرية</p>
            </div>
            
            <div className="bg-surface border border-[color:var(--borderc)] rounded-xl p-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="font-bold mb-2">تغليف أنيق وتوصيل سريع</h3>
              <p className="text-textdim text-sm">نصل إليك طازجًا ودافئًا في أسرع وقت</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


