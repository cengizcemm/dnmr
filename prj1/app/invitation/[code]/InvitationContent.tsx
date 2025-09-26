'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface WeddingInvitation {
  id: string;
  coupleNames: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  description: string;
  dresscode?: string;
  rsvpDeadline: string;
  isValid: boolean;
}

export default function InvitationContent() {
  const params = useParams();
  const router = useRouter();
  const [language, setLanguage] = useState('en');
  const [invitation, setInvitation] = useState<WeddingInvitation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const translations = {
    en: {
      loading: 'Loading invitation...',
      invalidCode: 'Invalid Invitation Code',
      invalidMessage: 'The invitation code you entered is not valid or has expired.',
      tryAgain: 'Try Another Code',
      backToScan: 'Back to Scanner',
      youreInvited: "You're Invited!",
      weddingOf: 'Wedding of',
      date: 'Date',
      time: 'Time',
      venue: 'Venue',
      address: 'Address',
      dresscode: 'Dress Code',
      rsvpBy: 'Please RSVP by',
      rsvpNow: 'RSVP Now',
      viewAsGuest: 'Continue as Guest',
      loginToRsvp: 'Login to RSVP'
    },
    tr: {
      loading: 'Davetiye yükleniyor...',
      invalidCode: 'Geçersiz Davetiye Kodu',
      invalidMessage: 'Girdiğiniz davetiye kodu geçerli değil veya süresi dolmuş.',
      tryAgain: 'Başka Kod Dene',
      backToScan: 'Tarayıcıya Dön',
      youreInvited: 'Davetlisiniz!',
      weddingOf: 'Düğün',
      date: 'Tarih',
      time: 'Saat',
      venue: 'Mekan',
      address: 'Adres',
      dresscode: 'Kıyafet Kodu',
      rsvpBy: 'Lütfen şu tarihe kadar yanıtlayın:',
      rsvpNow: 'Yanıtla',
      viewAsGuest: 'Misafir Olarak Devam Et',
      loginToRsvp: 'Yanıtlamak için Giriş Yap'
    }
  };

  const t = translations[language as keyof typeof translations];

  // Mock invitation data
  const mockInvitations: { [key: string]: WeddingInvitation } = {
    'WEDDING-2024-SARAH-MICHAEL': {
      id: 'WEDDING-2024-SARAH-MICHAEL',
      coupleNames: 'Sarah & Michael',
      date: 'June 15, 2024',
      time: '4:00 PM',
      venue: 'Grand Rose Garden',
      address: '123 Garden Street, Rose City, RC 12345',
      description: 'Join us as we celebrate our love and begin our journey together as husband and wife.',
      dresscode: 'Formal Attire',
      rsvpDeadline: 'May 15, 2024',
      isValid: true
    },
    'WEDDING-2024-SARAH-MICHAEL-DEMO': {
      id: 'WEDDING-2024-SARAH-MICHAEL-DEMO',
      coupleNames: 'Sarah & Michael',
      date: 'June 15, 2024',
      time: '4:00 PM',
      venue: 'Grand Rose Garden',
      address: '123 Garden Street, Rose City, RC 12345',
      description: 'Join us as we celebrate our love and begin our journey together as husband and wife.',
      dresscode: 'Formal Attire',
      rsvpDeadline: 'May 15, 2024',
      isValid: true
    },
    'WEDDING-2024-DEMO': {
      id: 'WEDDING-2024-DEMO',
      coupleNames: 'John & Jane',
      date: 'August 20, 2024',
      time: '6:00 PM',
      venue: 'Sunset Beach Resort',
      address: '456 Beach Avenue, Sunset Bay, SB 67890',
      description: 'Celebrate with us as we exchange vows by the beautiful sunset beach.',
      dresscode: 'Beach Formal',
      rsvpDeadline: 'July 20, 2024',
      isValid: true
    }
  };

  useEffect(() => {
    const code = params.code as string;
    
    // Simulate API call
    setTimeout(() => {
      const invitationData = mockInvitations[code];
      
      if (invitationData) {
        setInvitation(invitationData);
      } else {
        setError('Invalid invitation code');
      }
      
      setLoading(false);
    }, 1000);
  }, [params.code]);

  const handleRSVP = () => {
    // Redirect to guest dashboard or RSVP page
    router.push(`/guest/${params.code}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-loader-4-line text-2xl text-rose-600 animate-spin"></i>
          </div>
          <p className="text-gray-600">{t.loading}</p>
        </div>
      </div>
    );
  }

  if (error || !invitation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 flex items-center justify-center px-6">
        <div className="max-w-md w-full">
          {/* Language Selector */}
          <div className="flex justify-end mb-8">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  language === 'en' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('tr')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  language === 'tr' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                Türkçe
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-error-warning-line text-2xl text-red-600"></i>
            </div>
            <h1 className="text-2xl font-[`Pacifico`] text-gray-800 mb-4">{t.invalidCode}</h1>
            <p className="text-gray-600 mb-6">{t.invalidMessage}</p>
            <div className="space-y-3">
              <Link
                href="/scan"
                className="w-full bg-rose-500 hover:bg-rose-600 text-white py-3 px-4 rounded-lg font-medium transition-colors inline-block whitespace-nowrap cursor-pointer"
              >
                {t.tryAgain}
              </Link>
              <Link
                href="/"
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium transition-colors inline-block whitespace-nowrap cursor-pointer"
              >
                {t.backToScan}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100">
      {/* Language Selector */}
      <div className="absolute top-6 right-6 z-10">
        <div className="flex bg-white/80 backdrop-blur-sm rounded-lg p-1 shadow-sm">
          <button
            onClick={() => setLanguage('en')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
              language === 'en' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLanguage('tr')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
              language === 'tr' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
            }`}
          >
            Türkçe
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center min-h-screen px-6 py-12">
        <div className="max-w-2xl w-full">
          {/* Invitation Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Header Image */}
            <div 
              className="h-64 bg-cover bg-center relative"
              style={{
                backgroundImage: `url('https://readdy.ai/api/search-image?query=Elegant%20wedding%20invitation%20design%20with%20soft%20pink%20roses%2C%20golden%20details%2C%20romantic%20floral%20border%2C%20luxury%20wedding%20stationery%20background%2C%20beautiful%20script%20typography%20elements%2C%20dreamy%20bokeh%20lighting%20effects&width=800&height=400&seq=invitation-header&orientation=landscape')`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-sm opacity-90">{t.youreInvited}</p>
                <h1 className="text-3xl font-[`Pacifico`]">{t.weddingOf}</h1>
                <h2 className="text-4xl font-bold mt-2">{invitation.coupleNames}</h2>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <p className="text-gray-700 text-center mb-8 leading-relaxed">
                {invitation.description}
              </p>

              {/* Wedding Details */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="ri-calendar-line text-rose-600"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{t.date}</h3>
                    <p className="text-gray-600">{invitation.date}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="ri-time-line text-rose-600"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{t.time}</h3>
                    <p className="text-gray-600">{invitation.time}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="ri-building-line text-rose-600"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{t.venue}</h3>
                    <p className="text-gray-600">{invitation.venue}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="ri-map-pin-line text-rose-600"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{t.address}</h3>
                    <p className="text-gray-600">{invitation.address}</p>
                  </div>
                </div>

                {invitation.dresscode && (
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="ri-shirt-line text-rose-600"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{t.dresscode}</h3>
                      <p className="text-gray-600">{invitation.dresscode}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* RSVP Section */}
              <div className="mt-8 p-6 bg-rose-50 rounded-2xl">
                <p className="text-center text-gray-700 mb-4">
                  <strong>{t.rsvpBy} {invitation.rsvpDeadline}</strong>
                </p>
                <div className="space-y-3">
                  <button
                    onClick={handleRSVP}
                    className="w-full bg-rose-500 hover:bg-rose-600 text-white py-3 px-4 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center"
                  >
                    <i className="ri-heart-line mr-2"></i>
                    {t.rsvpNow}
                  </button>
                  <Link
                    href="/auth/login"
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium transition-colors text-center inline-block whitespace-nowrap cursor-pointer"
                  >
                    {t.loginToRsvp}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="text-center mt-6">
            <Link href="/scan" className="text-rose-600 hover:text-rose-700 cursor-pointer">
              ← {t.backToScan}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}