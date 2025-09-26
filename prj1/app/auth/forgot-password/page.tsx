'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [language, setLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const translations = {
    en: {
      title: 'Reset Password',
      subtitle: 'Enter your email to receive reset instructions',
      email: 'Email Address',
      send: 'Send Reset Link',
      back: 'Back to Login',
      success: 'Password reset email sent! Please check your inbox and follow the instructions.',
      placeholder: 'Enter your email address',
      emailRequired: 'Email is required',
      emailInvalid: 'Please enter a valid email address',
      networkError: 'Network error. Please try again.'
    },
    tr: {
      title: 'Şifre Sıfırla',
      subtitle: 'Sıfırlama talimatları için e-postanızı girin',
      email: 'E-posta Adresi',
      send: 'Sıfırlama Bağlantısı Gönder',
      back: 'Girişe Dön',
      success: 'Şifre sıfırlama e-postası gönderildi! Lütfen gelen kutunuzu kontrol edin ve talimatları takip edin.',
      placeholder: 'E-posta adresinizi girin',
      emailRequired: 'E-posta gerekli',
      emailInvalid: 'Geçerli bir e-posta adresi girin',
      networkError: 'Ağ hatası. Lütfen tekrar deneyin.'
    }
  };

  const t = translations[language as keyof typeof translations];

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError(t.emailRequired);
      return;
    }

    if (!validateEmail(email)) {
      setError(t.emailInvalid);
      return;
    }

    setIsLoading(true);

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate success
      setSuccess(true);
    } catch (err) {
      setError(t.networkError);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-br from-pink-50 to-rose-100">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-mail-check-line text-2xl text-green-600"></i>
          </div>
          <h1 className="text-2xl font-[`Pacifico`] text-rose-800 mb-4">E-posta Gönderildi!</h1>
          <p className="text-gray-600 mb-6">{t.success}</p>
          <Link
            href="/auth/login"
            className="w-full bg-rose-500 hover:bg-rose-600 text-white py-3 px-4 rounded-lg font-medium transition-colors inline-block whitespace-nowrap cursor-pointer"
          >
            {t.back}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-br from-pink-50 to-rose-100">
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

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-lock-password-line text-2xl text-rose-600"></i>
            </div>
            <h1 className="text-2xl font-[`Pacifico`] text-rose-800 mb-2">{t.title}</h1>
            <p className="text-gray-600">{t.subtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.email}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.placeholder}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm"
                required
                disabled={isLoading}
                aria-label={t.email}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-rose-500 hover:bg-rose-600 disabled:bg-gray-300 text-white py-3 px-4 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <i className="ri-loader-4-line animate-spin mr-2"></i>
                  Sending...
                </>
              ) : (
                <>
                  <i className="ri-mail-send-line mr-2"></i>
                  {t.send}
                </>
              )}
            </button>

            <div className="text-center">
              <Link href="/auth/login" className="text-rose-600 hover:text-rose-700 text-sm cursor-pointer">
                ← {t.back}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}