'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AboutPage() {
  const [language, setLanguage] = useState('en');

  const translations = {
    en: {
      title: 'About Wedding Moments',
      subtitle: 'Creating unforgettable wedding experiences',
      mission: 'Our Mission',
      missionText: 'To transform every wedding into an extraordinary celebration by providing comprehensive digital solutions that connect couples, guests, and venues seamlessly.',
      features: 'Platform Features',
      featuresList: [
        {
          icon: 'ri-heart-line',
          title: 'For Couples',
          description: 'Complete wedding management dashboard with guest lists, invitations, and media galleries.'
        },
        {
          icon: 'ri-user-line',
          title: 'For Guests',
          description: 'Easy RSVP system, photo sharing, and digital gift registry access.'
        },
        {
          icon: 'ri-building-line',
          title: 'For Venues',
          description: 'Professional tools to manage multiple weddings and showcase services.'
        },
        {
          icon: 'ri-shield-user-line',
          title: 'For Administrators',
          description: 'Comprehensive platform management and analytics dashboard.'
        }
      ],
      contact: 'Contact Information',
      contactInfo: {
        email: 'hello@weddingmoments.com',
        phone: '+1 (555) 123-4567',
        address: '123 Wedding Street, Love City, LC 12345'
      },
      getStarted: 'Get Started',
      login: 'Login to Your Account'
    },
    tr: {
      title: 'Wedding Moments Hakkında',
      subtitle: 'Unutulmaz düğün deneyimleri yaratıyoruz',
      mission: 'Misyonumuz',
      missionText: 'Çiftler, misafirler ve mekanları sorunsuz bir şekilde birbirine bağlayan kapsamlı dijital çözümler sunarak her düğünü olağanüstü bir kutlamaya dönüştürmek.',
      features: 'Platform Özellikleri',
      featuresList: [
        {
          icon: 'ri-heart-line',
          title: 'Çiftler İçin',
          description: 'Misafir listeleri, davetiyeler ve medya galerileri ile tam düğün yönetim panosu.'
        },
        {
          icon: 'ri-user-line',
          title: 'Misafirler İçin',
          description: 'Kolay RSVP sistemi, fotoğraf paylaşımı ve dijital hediye listesi erişimi.'
        },
        {
          icon: 'ri-building-line',
          title: 'Mekanlar İçin',
          description: 'Birden fazla düğünü yönetmek ve hizmetleri sergilemek için profesyonel araçlar.'
        },
        {
          icon: 'ri-shield-user-line',
          title: 'Yöneticiler İçin',
          description: 'Kapsamlı platform yönetimi ve analitik panosu.'
        }
      ],
      contact: 'İletişim Bilgileri',
      contactInfo: {
        email: 'merhaba@weddingmoments.com',
        phone: '+90 (212) 123-4567',
        address: 'Düğün Sokak No:123, Aşk Mahallesi, İstanbul'
      },
      getStarted: 'Başlayın',
      login: 'Hesabınıza Giriş Yapın'
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center cursor-pointer">
              <span className="text-2xl font-['Pacifico'] text-rose-800">Wedding Moments</span>
            </Link>

            {/* Language Selector */}
            <div className="flex items-center space-x-4">
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

              <Link
                href="/auth/login"
                className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer"
              >
                {t.login}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-['Pacifico'] text-rose-800 mb-6">{t.title}</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">{t.subtitle}</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">{t.mission}</h2>
            <p className="text-lg text-gray-700 leading-relaxed">{t.missionText}</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">{t.features}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.featuresList.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mb-4">
                  <i className={`${feature.icon} text-xl text-rose-600`}></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">{t.contact}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <i className="ri-mail-line text-xl text-rose-600"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                <p className="text-gray-600">{t.contactInfo.email}</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <i className="ri-phone-line text-xl text-rose-600"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
                <p className="text-gray-600">{t.contactInfo.phone}</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <i className="ri-map-pin-line text-xl text-rose-600"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Address</h3>
                <p className="text-gray-600 text-sm">{t.contactInfo.address}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{t.getStarted}</h2>
          <Link
            href="/auth/login"
            className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors inline-block whitespace-nowrap cursor-pointer"
          >
            {t.login}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <span className="text-xl font-['Pacifico'] text-rose-400">Wedding Moments</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-gray-400 hover:text-white text-sm cursor-pointer">
                Home
              </Link>
              <Link href="/auth/login" className="text-gray-400 hover:text-white text-sm cursor-pointer">
                Login
              </Link>
              <Link href="/auth/register" className="text-gray-400 hover:text-white text-sm cursor-pointer">
                Register
              </Link>
              <a href="https://readdy.ai/?origin=logo" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm cursor-pointer">
                Made with Readdy
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 pt-6 text-center text-sm text-gray-400">
            © 2024 Wedding Moments. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}