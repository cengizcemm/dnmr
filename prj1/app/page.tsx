
'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center text-center"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Beautiful%20wedding%20ceremony%20with%20elegant%20floral%20decorations%2C%20golden%20accents%2C%20soft%20pink%20and%20white%20roses%2C%20romantic%20atmosphere%2C%20warm%20lighting%2C%20dreamy%20background%20with%20bokeh%20effects%2C%20luxury%20wedding%20venue%20setup&width=1920&height=1080&seq=wedding-hero&orientation=landscape')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-white max-w-4xl px-6">
          <h1 className="text-6xl font-[\'Pacifico\'] mb-6 text-gold-300">
            Wedding Moments
          </h1>
          <p className="text-xl mb-8 leading-relaxed">
            Share your special day with loved ones. Create beautiful invitations, collect memories, and celebrate together.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/auth/login" 
              className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-full font-semibold transition-colors whitespace-nowrap cursor-pointer"
            >
              Başla
            </Link>
            <Link 
              href="/scan" 
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-3 rounded-full font-semibold transition-colors whitespace-nowrap cursor-pointer border border-white/30"
            >
              QR Kod Tara
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-[\'Pacifico\'] text-center mb-16 text-rose-800">
            Perfect for Every Role
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Düğün Mekanları",
                description: "Birden fazla çifti yönetin, güzel profiller oluşturun ve içerik onayını denetleyin",
                icon: "ri-building-line",
                color: "bg-purple-100 text-purple-700"
              },
              {
                title: "Mutlu Çiftler",
                description: "Çarpıcı davetiyeler oluşturun, misafir yüklemelerini yönetin ve gizlilik ayarlarını kontrol edin",
                icon: "ri-heart-line",
                color: "bg-rose-100 text-rose-700"
              },
              {
                title: "Düğün Misafirleri",
                description: "Davetiyeleri görüntüleyin, fotoğraf ve video yükleyin, içten mesajlar bırakın",
                icon: "ri-group-line",
                color: "bg-pink-100 text-pink-700"
              },
              {
                title: "Yöneticiler",
                description: "Tam sistem yönetimi, analitik ve içerik denetim yetenekleri",
                icon: "ri-shield-user-line",
                color: "bg-amber-100 text-amber-700"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                  <i className={`${feature.icon} text-xl`}></i>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-[\'Pacifico\'] text-center mb-16 text-rose-800">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Düğün Profilinizi Oluşturun",
                description: "Çiftler kayıt olup fotoğraflar, detaylar ve davetiye tasarımı ile kişiselleştirilmiş düğün profillerini oluşturur"
              },
              {
                step: "2", 
                title: "QR Kod Oluşturun",
                description: "Misafirlerin davetiyenize ve içeriğinize erişmek için tarayabileceği benzersiz bir QR kod alın"
              },
              {
                step: "3",
                title: "Anıları Paylaşın",
                description: "Misafirler kodu tarar, davetiyeleri görüntüler ve izinle fotoğraf, video ve mesaj yükleyebilir"
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-rose-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-[\'Pacifico\'] text-rose-800 mb-4">Wedding Moments</h3>
          <p className="text-gray-600 mb-6">Making every wedding memory count</p>
          <div className="flex justify-center gap-6">
            <Link href="/auth/login" className="text-rose-600 hover:text-rose-700 cursor-pointer">Giriş</Link>
            <Link href="/scan" className="text-rose-600 hover:text-rose-700 cursor-pointer">QR Tara</Link>
            <Link href="/about" className="text-rose-600 hover:text-rose-700 cursor-pointer">Hakkında</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
