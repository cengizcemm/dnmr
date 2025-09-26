
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LegalLinks from '../../../components/LegalLinks';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
    twoFactorCode: ''
  });
  const [language, setLanguage] = useState('tr');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimeRemaining, setLockTimeRemaining] = useState(0);
  const [googleLoading, setGoogleLoading] = useState(false);
  const router = useRouter();

  const translations = {
    en: {
      title: 'Welcome Back',
      subtitle: 'Sign in to Wedding Moments',
      email: 'Email Address',
      password: 'Password',
      rememberMe: 'Remember me',
      login: 'Sign In',
      register: 'Create Account',
      noAccount: "Don't have an account?",
      forgotPassword: 'Forgot Password?',
      googleLogin: 'Continue with Google',
      twoFactorTitle: 'Two-Factor Authentication',
      twoFactorSubtitle: 'Enter the 6-digit code from your authenticator app',
      twoFactorCode: '6-digit code',
      verify: 'Verify',
      invalidCredentials: 'Invalid email or password',
      accountLocked: 'Account locked due to too many failed attempts. Try again in',
      minutes: 'minutes',
      networkError: 'Network error. Please try again.',
      twoFactorRequired: 'Two-factor authentication required',
      invalidTwoFactor: 'Invalid two-factor code'
    },
    tr: {
      title: 'Hoş Geldiniz',
      subtitle: 'Wedding Moments\'a Giriş Yapın',
      email: 'E-posta Adresi',
      password: 'Şifre',
      rememberMe: 'Beni hatırla',
      login: 'Giriş Yap',
      register: 'Hesap Oluştur',
      noAccount: 'Hesabınız yok mu?',
      forgotPassword: 'Şifremi Unuttum?',
      googleLogin: 'Google ile Devam Et',
      twoFactorTitle: 'İki Faktörlü Doğrulama',
      twoFactorSubtitle: 'Kimlik doğrulama uygulamanızdan 6 haneli kodu girin',
      twoFactorCode: '6 haneli kod',
      verify: 'Doğrula',
      invalidCredentials: 'Geçersiz e-posta veya şifre',
      accountLocked: 'Çok fazla başarısız deneme nedeniyle hesap kilitlendi. Tekrar deneyin:',
      minutes: 'dakika',
      networkError: 'Ağ hatası. Lütfen tekrar deneyin.',
      twoFactorRequired: 'İki faktörlü doğrulama gerekli',
      invalidTwoFactor: 'Geçersiz iki faktörlü doğrulama kodu'
    }
  };

  const t = translations[language as keyof typeof translations];

  // Brute force protection
  const handleLoginAttempt = () => {
    const newAttempts = loginAttempts + 1;
    setLoginAttempts(newAttempts);
    
    if (newAttempts >= 5) {
      setIsLocked(true);
      setLockTimeRemaining(15); // 15 minutes
      
      // Countdown timer
      const timer = setInterval(() => {
        setLockTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsLocked(false);
            setLoginAttempts(0);
            return 0;
          }
          return prev - 1;
        });
      }, 60000); // Every minute
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (isLocked) {
      setError(`${t.accountLocked} ${lockTimeRemaining} ${t.minutes}`);
      return;
    }

    if (!formData.email || !formData.password) {
      setError('Lütfen tüm alanları doldurun');
      return;
    }

    setIsLoading(true);

    try {
      // Audit log for login attempt
      const auditLog = {
        action: 'LOGIN_ATTEMPT',
        details: {
          email: formData.email,
          timestamp: new Date().toISOString(),
          ipAddress: '127.0.0.1', // Dynamic in real app
          userAgent: navigator.userAgent,
          success: false // Will be updated based on result
        }
      };

      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock authentication logic - Düzeltilmiş kullanıcı verileri
      const mockUsers = [
        { email: 'couple@demo.com', password: 'Demo123!', role: 'couple', twoFactorEnabled: false },
        { email: 'admin@demo.com', password: 'Admin123!', role: 'admin', twoFactorEnabled: false }, 
        { email: 'guest@demo.com', password: 'Guest123!', role: 'guest', twoFactorEnabled: false },
        { email: 'venue@demo.com', password: 'Venue123!', role: 'venue', twoFactorEnabled: false },
        // Geçici kolay giriş için
        { email: 'test@test.com', password: '123456', role: 'couple', twoFactorEnabled: false },
        { email: 'admin@test.com', password: '123456', role: 'admin', twoFactorEnabled: false }
      ];
      
      const user = mockUsers.find(u => u.email === formData.email && u.password === formData.password);
      
      if (!user) {
        handleLoginAttempt();
        auditLog.details.success = false;
        console.log('Failed login audit:', auditLog);
        setError(t.invalidCredentials);
        return;
      }

      // Check if 2FA is required
      if (user.twoFactorEnabled && !showTwoFactor) {
        setShowTwoFactor(true);
        setError('');
        return;
      }

      // Validate 2FA code if required
      if (user.twoFactorEnabled && showTwoFactor) {
        if (formData.twoFactorCode !== '123456') { // Mock code
          setError(t.invalidTwoFactor);
          return;
        }
      }

      // Successful login
      auditLog.details.success = true;
      console.log('Successful login audit:', auditLog);
      
      // Reset attempts on successful login
      setLoginAttempts(0);
      setIsLocked(false);
      
      // Store user info
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      // Redirect based on role
      switch (user.role) {
        case 'couple':
          router.push('/couple/dashboard');
          break;
        case 'admin':
          router.push('/admin/dashboard');
          break;
        case 'guest':
          router.push('/guest/dashboard');
          break;
        case 'venue':
          router.push('/venue/dashboard');
          break;
        default:
          router.push('/');
      }
    } catch (err) {
      setError(t.networkError);
      handleLoginAttempt();
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Mock Google OAuth - Guest olarak giriş
      const mockGoogleUser = { email: 'google@user.com', role: 'guest' };
      localStorage.setItem('currentUser', JSON.stringify(mockGoogleUser));
      router.push('/guest/dashboard');
    } catch (err) {
      setError('Google giriş başarısız oldu');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (error) setError('');
  };

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

          <div className="text-center mb-8">
            <h1 className="text-3xl font-['Pacifico'] text-rose-800 mb-2">
              {showTwoFactor ? t.twoFactorTitle : t.title}
            </h1>
            <p className="text-gray-600 text-base">
              {showTwoFactor ? t.twoFactorSubtitle : t.subtitle}
            </p>
          </div>

          {!showTwoFactor && (
            <>
              {/* Google Login Button */}
              <button
                onClick={handleGoogleLogin}
                disabled={googleLoading || isLocked}
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
                    {t.googleLogin}
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
            </>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-base">
                {error}
              </div>
            )}

            {isLocked && (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg text-base">
                <i className="ri-lock-line mr-2"></i>
                Hesap güvenlik nedeniyle {lockTimeRemaining} dakika kilitlendi
              </div>
            )}

            {!showTwoFactor ? (
              <>
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">
                    {t.email}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-base min-h-[44px]"
                    required
                    disabled={isLoading || isLocked}
                    aria-label={t.email}
                  />
                </div>

                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">
                    {t.password}
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-base min-h-[44px]"
                    required
                    disabled={isLoading || isLocked}
                    aria-label={t.password}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                      className="mr-2 text-rose-500 focus:ring-rose-500 w-5 h-5"
                      disabled={isLoading || isLocked}
                    />
                    <span className="text-base text-gray-700">{t.rememberMe}</span>
                  </label>
                  <Link href="/auth/forgot-password" className="text-rose-600 hover:text-rose-700 text-base cursor-pointer">
                    {t.forgotPassword}
                  </Link>
                </div>
              </>
            ) : (
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  {t.twoFactorCode}
                </label>
                <input
                  type="text"
                  name="twoFactorCode"
                  value={formData.twoFactorCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-base font-mono text-center text-2xl tracking-widest min-h-[44px]"
                  maxLength={6}
                  placeholder="000000"
                  required
                  disabled={isLoading}
                  aria-label={t.twoFactorCode}
                />
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Demo kodu: 123456
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || isLocked}
              className="w-full bg-rose-500 hover:bg-rose-600 disabled:bg-gray-300 text-white py-3 px-4 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center min-h-[44px] text-base"
            >
              {isLoading ? (
                <>
                  <i className="ri-loader-4-line animate-spin mr-2"></i>
                  {showTwoFactor ? 'Doğrulanıyor...' : 'Giriş yapılıyor...'}
                </>
              ) : (
                showTwoFactor ? t.verify : t.login
              )}
            </button>

            {!showTwoFactor && (
              <div className="text-center">
                <span className="text-gray-600 text-base">{t.noAccount} </span>
                <Link href="/auth/register" className="text-rose-600 hover:text-rose-700 text-base cursor-pointer font-medium">
                  {t.register}
                </Link>
              </div>
            )}

            {showTwoFactor && (
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setShowTwoFactor(false);
                    setFormData(prev => ({ ...prev, twoFactorCode: '' }));
                    setError('');
                  }}
                  className="text-gray-600 hover:text-gray-800 text-base cursor-pointer"
                >
                  ← Geri dön
                </button>
              </div>
            )}

            {/* Demo Credentials */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Demo Hesapları:</h4>
              <div className="text-sm text-blue-800 space-y-1">
                <div><strong>Çift:</strong> couple@demo.com / Demo123!</div>
                <div><strong>Admin:</strong> admin@demo.com / Admin123!</div>
                <div><strong>Misafir:</strong> guest@demo.com / Guest123!</div>
                <div><strong>Mekan:</strong> venue@demo.com / Venue123!</div>
              </div>
            </div>
          </form>

          {/* Legal Links */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                Giriş yaparak aşağıdaki koşulları kabul etmiş olursunuz:
              </p>
              <LegalLinks variant="inline" className="justify-center" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div
        className="flex-1 bg-cover bg-center relative hidden lg:block"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Wedding%20login%20security%20concept%20with%20elegant%20couple%20silhouettes%2C%20romantic%20lighting%2C%20secure%20digital%20interface%20elements%2C%20luxury%20venue%20background%2C%20trust%20and%20security%20symbolism%20with%20lock%20icons%20and%20encryption%20shields&width=800&height=1200&seq=login-security&orientation=portrait')`
        }}
      >
        <div className="absolute inset-0 bg-rose-900/20"></div>
      </div>
    </div>
  );
}
