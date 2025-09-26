'use client';

import { useState } from 'react';

interface LegalLinksProps {
  className?: string;
  variant?: 'footer' | 'inline' | 'modal';
}

export default function LegalLinks({ className = '', variant = 'footer' }: LegalLinksProps) {
  const [showModal, setShowModal] = useState<string | null>(null);

  const handleOpenModal = (type: string) => {
    setShowModal(type);
  };

  const handleCloseModal = () => {
    setShowModal(null);
  };

  const legalContent = {
    privacy: {
      title: 'Gizlilik Politikası',
      content: `
        <h3>1. Kişisel Verilerin Toplanması</h3>
        <p>Wedding Moments platformu olarak, size daha iyi hizmet verebilmek için aşağıdaki kişisel verilerinizi topluyoruz:</p>
        <ul>
          <li>Ad, soyad, e-posta adresi, telefon numarası</li>
          <li>Düğün bilgileri ve fotoğraflar</li>
          <li>Platform kullanım bilgileri</li>
          <li>IP adresi ve cihaz bilgileri</li>
        </ul>

        <h3>2. Verilerin Kullanım Amacı</h3>
        <p>Toplanan veriler aşağıdaki amaçlarla kullanılır:</p>
        <ul>
          <li>Hesap oluşturma ve yönetme</li>
          <li>Düğün profilinizi oluşturma</li>
          <li>Misafirlerle iletişim kurma</li>
          <li>Güvenlik ve dolandırıcılık önleme</li>
        </ul>

        <h3>3. Veri Güvenliği</h3>
        <p>Kişisel verileriniz en yüksek güvenlik standartlarıyla korunmaktadır. Verileriniz şifrelenerek saklanır ve yetkisiz erişimlere karşı korunur.</p>

        <h3>4. Üçüncü Taraflarla Paylaşım</h3>
        <p>Kişisel verileriniz, yasal zorunluluklar dışında üçüncü taraflarla paylaşılmaz.</p>

        <h3>5. Haklarınız</h3>
        <p>KVKK kapsamında aşağıdaki haklara sahipsiniz:</p>
        <ul>
          <li>Verilerinizin işlenip işlenmediğini öğrenme</li>
          <li>Verilerinizin düzeltilmesini isteme</li>
          <li>Verilerinizin silinmesini isteme</li>
          <li>Verilerinizin aktarılmasını isteme</li>
        </ul>
      `
    },
    terms: {
      title: 'Kullanım Şartları',
      content: `
        <h3>1. Hizmet Kapsamı</h3>
        <p>Wedding Moments, düğün çiftleri ve misafirler arasında etkileşimi kolaylaştıran bir dijital platformdur.</p>

        <h3>2. Kullanıcı Sorumlulukları</h3>
        <ul>
          <li>Doğru ve güncel bilgi sağlamak</li>
          <li>Başkalarının haklarına saygı göstermek</li>
          <li>Platformu yasalara uygun şekilde kullanmak</li>
          <li>Uygunsuz içerik paylaşmamak</li>
        </ul>

        <h3>3. Yasak Faaliyetler</h3>
        <ul>
          <li>Spam ve istenmeyen içerik gönderme</li>
          <li>Telif hakları ihlali</li>
          <li>Diğer kullanıcıları rahatsız etme</li>
          <li>Sistemi hack etmeye çalışma</li>
        </ul>

        <h3>4. İçerik Politikası</h3>
        <p>Paylaştığınız tüm içerikler moderasyon sürecinden geçer. Uygunsuz içerikler kaldırılabilir.</p>

        <h3>5. Hesap Dondurma/Kapatma</h3>
        <p>Şartlara uymayan hesaplar uyarı almadan dondurulabilir veya kapatılabilir.</p>

        <h3>6. Sorumluluk Reddi</h3>
        <p>Platform, kullanıcılar arasındaki etkileşimlerden doğan zararlardan sorumlu değildir.</p>
      `
    },
    kvkk: {
      title: 'KVKK Aydınlatma Metni',
      content: `
        <h3>Veri Sorumlusu</h3>
        <p><strong>Wedding Moments</strong><br/>
        Adres: [Adres Bilgisi]<br/>
        Telefon: [Telefon Numarası]<br/>
        E-posta: privacy@weddingmoments.com</p>

        <h3>Kişisel Verilerin İşlenme Amacı</h3>
        <p>Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
        <ul>
          <li>Hizmet sunumu ve geliştirme</li>
          <li>Müşteri memnuniyeti araştırmaları</li>
          <li>Yasal yükümlülüklerin yerine getirilmesi</li>
          <li>Güvenlik önlemlerinin alınması</li>
        </ul>

        <h3>İşlenen Kişisel Veri Kategorileri</h3>
        <ul>
          <li>Kimlik verisi (Ad, soyad)</li>
          <li>İletişim verisi (E-posta, telefon)</li>
          <li>Görsel veriler (Fotoğraf, video)</li>
          <li>Konum verisi</li>
          <li>İşlem güvenliği verisi</li>
        </ul>

        <h3>Kişisel Verilerin Aktarılması</h3>
        <p>Verileriniz yalnızca aşağıdaki durumlarda aktarılabilir:</p>
        <ul>
          <li>Yasal zorunluluk</li>
          <li>Açık rızanızın bulunması</li>
          <li>Teknik hizmet sağlayıcıları</li>
        </ul>

        <h3>Haklarınız</h3>
        <p>KVKK'nın 11. maddesi kapsamında sahip olduğunuz haklar:</p>
        <ul>
          <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
          <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
          <li>Kişisel verilerinizin işlenme amacını öğrenme</li>
          <li>Kişisel verilerinizin eksiksiz ve doğru işlenmesini isteme</li>
          <li>Kişisel verilerinizin silinmesini isteme</li>
        </ul>

        <h3>İletişim</h3>
        <p>KVKK kapsamındaki haklarınızı kullanmak için privacy@weddingmoments.com adresine başvurabilirsiniz.</p>
      `
    }
  };

  if (variant === 'modal' && showModal) {
    const content = legalContent[showModal as keyof typeof legalContent];
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">{content.title}</h2>
            <button
              onClick={handleCloseModal}
              className="text-gray-400 hover:text-gray-600 cursor-pointer p-2"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>
          <div className="p-6 overflow-y-auto max-h-[70vh]">
            <div 
              className="prose prose-sm max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: content.content }}
            />
          </div>
          <div className="p-6 border-t border-gray-200 text-right">
            <button
              onClick={handleCloseModal}
              className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer"
            >
              Tamam
            </button>
          </div>
        </div>
      </div>
    );
  }

  const linkClass = variant === 'footer' 
    ? 'text-gray-600 hover:text-gray-900 cursor-pointer transition-colors'
    : 'text-rose-600 hover:text-rose-700 cursor-pointer transition-colors';

  if (variant === 'inline') {
    return (
      <div className={`flex flex-wrap gap-4 text-sm ${className}`}>
        <button onClick={() => handleOpenModal('privacy')} className={linkClass}>
          Gizlilik Politikası
        </button>
        <button onClick={() => handleOpenModal('terms')} className={linkClass}>
          Kullanım Şartları
        </button>
        <button onClick={() => handleOpenModal('kvkk')} className={linkClass}>
          KVKK Aydınlatma Metni
        </button>
        {showModal && <LegalLinks variant="modal" />}
      </div>
    );
  }

  return (
    <>
      <div className={`flex flex-wrap gap-6 ${className}`}>
        <button onClick={() => handleOpenModal('privacy')} className={linkClass}>
          Gizlilik Politikası
        </button>
        <button onClick={() => handleOpenModal('terms')} className={linkClass}>
          Kullanım Şartları
        </button>
        <button onClick={() => handleOpenModal('kvkk')} className={linkClass}>
          KVKK Aydınlatma Metni
        </button>
      </div>
      {showModal && <LegalLinks variant="modal" />}
    </>
  );
}