
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LegalLinks from '../../../components/LegalLinks';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'guest',
    weddingCode: '',
    twoFactorEnabled: false
  });
  const [language, setLanguage] = useState('tr');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showQuickRegister, setShowQuickRegister] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const router = useRouter();

  const translations = {
    en: {
      title: 'Create Account',
      subtitle: 'Join Wedding Moments',
      quickTitle: 'Quick Guest Registration',
      quickSubtitle: 'Join the wedding celebration',
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      role: 'Account Type',
      weddingCode: 'Wedding Code (Optional)',
      register: 'Create Account',
      quickRegister: 'Join Wedding',
      login: 'Sign In',
      haveAccount: 'Already have an account?',
      guestRegister: 'Quick Guest Registration',
      fullRegister: 'Full Registration',
      googleRegister: 'Continue with Google',
      twoFactor: 'Enable Two-Factor Authentication (Recommended)',
      roles: {
        guest: 'Guest - Join wedding celebrations',
        couple: 'Couple - Create and manage wedding'
      },
      success: 'Account created successfully! Please check your email to verify your account.',
      quickSuccess: 'Welcome to the wedding! You can now access the celebration.',
      passwordMismatch: 'Passwords do not match',
      minPassword: 'Password must be 8-12 characters with uppercase, lowercase, number and special character',
      networkError: 'Network error. Please try again.',
      validation: {
        nameRequired: 'Full name is required (minimum 2 characters)',
        emailRequired: 'Email is required',
        emailInvalid: 'Please enter a valid email',
        passwordRequired: 'Password is required',
        phoneRequired: 'Phone number is required',
        phoneInvalid: 'Please enter a valid phone number'
      },
      roleDescriptions: {
        guest: 'Join wedding celebrations, view content, upload memories, leave voice messages',
        couple: 'Create wedding profile, manage guests, moderate content, receive voice messages'
      },
      passwordStrength: {
        0: 'Very Weak',
        1: 'Weak',
        2: 'Fair',
        3: 'Good',
        4: 'Strong'
      }
    },
    tr: {
      title: 'Hesap Oluştur',
      subtitle: 'Wedding Moments\'a Katılın',
      quickTitle: 'Hızlı Misafir Kaydı',
      quickSubtitle: 'Düğün kutlamasına katılın',
      name: 'Ad Soyad',
      email: 'E-posta Adresi',
      phone: 'Telefon Numarası',
      password: 'Şifre',
      confirmPassword: 'Şifre Tekrar',
      role: 'Hesap Türü',
      weddingCode: 'Düğün Kodu (İsteğe bağlı)',
      register: 'Hesap Oluştur',
      quickRegister: 'Düğüne Katıl',
      login: 'Giriş Yap',
      haveAccount: 'Zaten hesabınız var mı?',
      guestRegister: 'Hızlı Misafir Kaydı',
      fullRegister: 'Tam Kayıt',
      googleRegister: 'Google ile Devam Et',
      twoFactor: 'İki Faktörlü Doğrulama Etkinleştir (Önerilen)',
      roles: {
        guest: 'Misafir - Düğün kutlamalarına katıl',
        couple: 'Çift - Düğün oluştur ve yönet'
      },
      success: 'Hesap başarıyla oluşturuldu! Hesabınızı doğrulamak için e-postanızı kontrol edin.',
      quickSuccess: 'Düğüne hoş geldiniz! Artık kutlamaya erişebilirsiniz.',
      passwordMismatch: 'Şifreler eşleşmiyor',
      minPassword: 'Şifre 8-12 karakter olmalı ve büyük harf, küçük harf, rakam ve özel karakter içermeli',
      networkError: 'Ağ hatası. Lütfen tekrar deneyin.',
      validation: {
        nameRequired: 'Ad soyad gerekli (minimum 2 karakter)',
        emailRequired: 'E-posta gerekli',
        emailInvalid: 'Geçerli bir e-posta girin',
        passwordRequired: 'Şifre gerekli',
        phoneRequired: 'Telefon numarası gerekli',
        phoneInvalid: 'Geçerli bir telefon numarası girin'
      },
      roleDescriptions: {
        guest: 'Düğün kutlamalarına katıl, içerikleri görüntüle, anıları yükle, sesli mesaj bırak',
        couple: 'Düğün profili oluştur, misafirleri yönet, içerikleri modere et, sesli mesajları al'
      },
      passwordStrength: {
        0: 'Çok Zayıf',
        1: 'Zayıf',
        2: 'Orta',
        3: 'İyi',
        4: 'Güçlü'
      }
    }
  };

  const t = translations[language as keyof typeof translations];

  const checkPasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    return Math.min(strength, 4);
  };

  const validatePassword = (password: string): boolean => {
    const hasMinLength = password.length >= 8 && password.length <= 12;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return hasMinLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^(\+90|0)?[5][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validateForm = () => {
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setError(t.validation.nameRequired);
      return false;
    }
    if (!formData.email.trim()) {
      setError(t.validation.emailRequired);
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError(t.validation.emailInvalid);
      return false;
    }
    if (formData.phone && !validatePhone(formData.phone)) {
      setError(t.validation.phoneInvalid);
      return false;
    }
    if (!showQuickRegister && !formData.password) {
      setError(t.validation.passwordRequired);
      return false;
    }
    if (!showQuickRegister && !validatePassword(formData.password)) {
      setError(t.minPassword);
      return false;
    }
    if (!showQuickRegister && formData.password !== formData.confirmPassword) {
      setError(t.passwordMismatch);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Audit log için kayıt
      const auditLog = {
        action: 'USER_REGISTRATION',
        details: {
          email: formData.email,
          role: formData.role,
          registrationType: showQuickRegister ? 'quick' : 'full',
          twoFactorEnabled: formData.twoFactorEnabled,
          timestamp: new Date().toISOString(),
          ipAddress: '127.0.0.1', // Gerçek uygulamada dinamik olacak
          userAgent: navigator.userAgent
        }
      };
      console.log('Audit Log:', auditLog);

      // Mock API call with bcrypt simulation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock user creation with hashed password
      const userData = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        weddingCode: formData.weddingCode,
        passwordHash: `$2b$12$${Math.random().toString(36).substring(2, 15)}`, // Mock bcrypt hash
        twoFactorEnabled: formData.twoFactorEnabled,
        createdAt: new Date().toISOString(),
        emailVerified: false,
        auditLog: auditLog
      };

      console.log('User registered:', userData);
      
      // If quick register with wedding code, redirect to wedding
      if (showQuickRegister && formData.weddingCode) {
        router.push(`/w/${formData.weddingCode}/feed`);
        return;
      }
      
      setSuccess(true);
    } catch (err) {
      setError(t.networkError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setGoogleLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Mock Google OAuth
      const googleUser = {
        id: Date.now(),
        name: 'Google User',
        email: 'user@gmail.com',
        role: 'guest',
        provider: 'google',
        createdAt: new Date().toISOString()
      };
      console.log('Google registration:', googleUser);
      router.push('/guest/dashboard');
    } catch (err) {
      setError('Google kayıt başarısız oldu');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Password strength check
    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }
    
    if (error) setError('');
  };

  const getStrengthColor = (strength: number) => {
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
    return colors[strength] || 'bg-gray-300';
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-br from-pink-50 to-rose-100">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-check-line text-2xl text-green-600"></i>
          </div>
          <h1 className="text-2xl font-['Pacifico'] text-rose-800 mb-4">Başarılı!</h1>
          <p className="text-gray-600 mb-6">
            {showQuickRegister ? t.quickSuccess : t.success}
          </p>
          {formData.twoFactorEnabled && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <i className="ri-shield-check-line text-blue-600 text-lg mb-2"></i>
              <p className="text-sm text-blue-800">
                İki faktörlü doğrulama etkinleştirildi. E-postanızdan QR kodu tarayın.
              </p>
            </div>
          )}
          <Link
            href="/auth/login"
            className="w-full bg-rose-500 hover:bg-rose-600 text-white py-3 px-4 rounded-lg font-medium transition-colors inline-block whitespace-nowrap cursor-pointer"
          >
            {t.login}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
        <div className="max-w-md w-full">
          {/* Language Selector */}
          <div className="flex justify-end mb-8">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setLanguage('tr')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap cursor-pointer min-h-[44px] ${
                  language === 'tr' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                Türkçe
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap cursor-pointer min-h-[44px] ${
                  language === 'en' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                English
              </button>
            </div>
          </div>

          {/* Registration Type Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
            <button
              onClick={() => setShowQuickRegister(false)}
              className={`flex-1 px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap cursor-pointer min-h-[44px] ${
                !showQuickRegister ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              {t.fullRegister}
            </button>
            <button
              onClick={() => setShowQuickRegister(true)}
              className={`flex-1 px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap cursor-pointer min-h-[44px] ${
                showQuickRegister ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              {t.guestRegister}
            </button>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-['Pacifico'] text-rose-800 mb-2">
              {showQuickRegister ? t.quickTitle : t.title}
            </h1>
            <p className="text-gray-600 text-base">
              {showQuickRegister ? t.quickSubtitle : t.subtitle}
            </p>
          </div>

          {/* Google Registration Button */}
          <button
            onClick={handleGoogleRegister}
            disabled={googleLoading}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white py-3 px-4 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center mb-6 min-h-[44px] text-base"
          >
            {googleLoading ? (
              <>
                <i className="ri-loader-4-line animate-spin mr-2"></i>
                Yükleniyor...
              </>
            ) : (
              <>
                <i className="ri-google-line mr-2"></i>
                {t.googleRegister}
              </>
            )}
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">veya</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-base">
                {error}
              </div>
            )}

            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">
                {t.name} *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-base min-h-[44px]"
                required
                disabled={isLoading}
                aria-label={t.name}
                minLength={2}
              />
            </div>

            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">
                {t.email} *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-base min-h-[44px]"
                required
                disabled={isLoading}
                aria-label={t.email}
              />
            </div>

            {(showQuickRegister || formData.role === 'guest') && (
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  {t.phone}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+90 555 123 45 67"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-base min-h-[44px]"
                  disabled={isLoading}
                  aria-label={t.phone}
                />
              </div>
            )}

            {showQuickRegister && (
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  {t.weddingCode} *
                </label>
                <input
                  type="text"
                  name="weddingCode"
                  value={formData.weddingCode}
                  onChange={handleInputChange}
                  placeholder="WEDDING-2024-SARAH-MICHAEL"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-base font-mono min-h-[44px]"
                  required
                  disabled={isLoading}
                  aria-label={t.weddingCode}
                />
              </div>
            )}

            {!showQuickRegister && (
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  {t.role}
                </label>
                <div className="space-y-3">
                  {Object.entries(t.roles).map(([key, label]) => (
                    <label key={key} className="flex items-start cursor-pointer min-h-[44px]">
                      <input
                        type="radio"
                        name="role"
                        value={key}
                        checked={formData.role === key}
                        onChange={handleInputChange}
                        className="mt-2 mr-3 text-rose-500 focus:ring-rose-500 w-5 h-5"
                        disabled={isLoading}
                      />
                      <div className="py-1">
                        <div className="font-medium text-gray-900 text-base">{label}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          {t.roleDescriptions[key as keyof typeof t.roleDescriptions]}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {!showQuickRegister && (
              <>
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">
                    {t.password} *
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-base min-h-[44px]"
                    required
                    disabled={isLoading}
                    aria-label={t.password}
                    minLength={8}
                    maxLength={12}
                  />
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">
                          {t.passwordStrength[passwordStrength as keyof typeof t.passwordStrength]}
                        </span>
                        <span className="text-xs text-gray-500">{passwordStrength}/4</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all ${getStrengthColor(passwordStrength)}`}
                          style={{ width: `${(passwordStrength / 4) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">
                    {t.confirmPassword} *
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-base min-h-[44px]"
                    required
                    disabled={isLoading}
                    aria-label={t.confirmPassword}
                    minLength={8}
                    maxLength={12}
                  />
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    name="twoFactorEnabled"
                    checked={formData.twoFactorEnabled}
                    onChange={(e) => setFormData(prev => ({ ...prev, twoFactorEnabled: e.target.checked }))}
                    className="mt-1 mr-3 text-rose-500 focus:ring-rose-500 w-5 h-5"
                    disabled={isLoading}
                  />
                  <div>
                    <div className="font-medium text-gray-900 text-base">{t.twoFactor}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      Hesabınızı daha güvenli hale getirmek için iki faktörlü doğrulama kullanın
                    </div>
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-rose-500 hover:bg-rose-600 disabled:bg-gray-300 text-white py-3 px-4 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center min-h-[44px] text-base"
            >
              {isLoading ? (
                <>
                  <i className="ri-loader-4-line animate-spin mr-2"></i>
                  {showQuickRegister ? 'Katılıyor...' : 'Oluşturuluyor...'}
                </>
              ) : (
                showQuickRegister ? t.quickRegister : t.register
              )}
            </button>

            {/* Legal Links */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Kayıt olarak aşağıdaki koşulları kabul etmiş olursunuz:
                </p>
                <LegalLinks variant="inline" className="justify-center" />
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Image */}
      <div
        className="flex-1 bg-cover bg-center relative hidden lg:block"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=$%7BshowQuickRegister%20%3F%20Wedding%20guests%20registration%20check-in%20area%20with%20elegant%20welcome%20signs%2C%20floral%20decorations%2C%20warm%20lighting%2C%20luxury%20venue%20entrance%2C%20celebration%20atmosphere%2C%20modern%20digital%20registration%20kiosk%20:%20Wedding%20registry%20and%20planning%20concept%20with%20elegant%20stationery%2C%20floral%20arrangements%2C%20rose%20gold%20details%2C%20soft%20romantic%20lighting%2C%20luxury%20wedding%20planner%20workspace%20with%20invitations%20and%20decorative%20elements%2C%20security%20shields%20symbolizing%20data%20protection%7D&width=800&height=1200&seq=register-bg-${showQuickRegister ? 'quick' : 'full'}-security&orientation=portrait')`
        }}
      >
        <div className="absolute inset-0 bg-rose-900/20"></div>
      </div>
    </div>
  );
}
