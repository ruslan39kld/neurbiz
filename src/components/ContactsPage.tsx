import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Mail, Phone, MapPin } from 'lucide-react';
import Toast from './Toast';
import { trackEvent } from '../utils/analytics';

import SectionTitle from './SectionTitle';

export default function ContactsPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowToast(true);
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <div className="px-[20px] py-[24px] md:px-[32px] md:py-[32px] lg:px-[72px] lg:py-[56px] max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <SectionTitle>КОНТАКТЫ</SectionTitle>
        <p className="font-dm text-[16px] text-[var(--text-secondary)] mb-8">
          Открыт к обсуждению проектов и сотрудничеству
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="font-orbitron text-[24px] text-[var(--text-main)] mb-6">Свяжитесь со мной</h2>
            
            <div className="space-y-6">
              <motion.a 
                href="mailto:B.ruslan39kld@gmail.com"
                onClick={() => trackEvent('contacts', 'click_email')}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[#FF6B2B]/50 hover:shadow-[var(--glow)] transition-all group p-card"
              >
                <div className="w-12 h-12 rounded-full bg-[#FF6B2B]/10 flex items-center justify-center text-[#FF6B2B] group-hover:scale-110 transition-transform">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="font-dm text-[13px] text-[var(--text-secondary)] mb-1">Email</p>
                  <p className="font-dm text-[16px] font-medium text-[var(--text-main)]">B.ruslan39kld@gmail.com</p>
                </div>
              </motion.a>

              <motion.a 
                href="https://t.me/ruslan_beltyugov"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('contacts', 'click_telegram')}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[#4A9EFF]/50 hover:shadow-[0_0_20px_rgba(74,158,255,0.25)] transition-all group p-card"
              >
                <div className="w-12 h-12 rounded-full bg-[#4A9EFF]/10 flex items-center justify-center text-[#4A9EFF] group-hover:scale-110 transition-transform">
                  <Send size={24} />
                </div>
                <div>
                  <p className="font-dm text-[13px] text-[var(--text-secondary)] mb-1">Telegram</p>
                  <p className="font-dm text-[16px] font-medium text-[var(--text-main)]">@ruslan_beltyugov</p>
                </div>
              </motion.a>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-card"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--bg-primary)] flex items-center justify-center text-[var(--text-secondary)]">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="font-dm text-[13px] text-[var(--text-secondary)] mb-1">Локация</p>
                  <p className="font-dm text-[16px] font-medium text-[var(--text-main)]">Россия</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[20px] p-6 sm:p-8 p-card"
          >
            <h2 className="font-orbitron text-[24px] text-[var(--text-main)] mb-6">Написать сообщение</h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block font-dm text-[14px] text-[var(--text-secondary)] mb-2">
                  Ваше имя
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-main)] font-dm focus:outline-none focus:border-[#FF6B2B] focus:ring-1 focus:ring-[#FF6B2B] transition-all"
                  placeholder="Иван Иванов"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block font-dm text-[14px] text-[var(--text-secondary)] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-main)] font-dm focus:outline-none focus:border-[#FF6B2B] focus:ring-1 focus:ring-[#FF6B2B] transition-all"
                  placeholder="ivan@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block font-dm text-[14px] text-[var(--text-secondary)] mb-2">
                  Сообщение
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-main)] font-dm focus:outline-none focus:border-[#FF6B2B] focus:ring-1 focus:ring-[#FF6B2B] transition-all resize-none"
                  placeholder="Расскажите о вашем проекте..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#FF6B2B] text-white font-orbitron text-[14px] py-4 rounded-xl hover:bg-[#e55a1f] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Отправка...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Отправить сообщение
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </motion.div>

      <Toast 
        message="Сообщение успешно отправлено!" 
        isVisible={showToast} 
        onClose={() => setShowToast(false)} 
      />
    </div>
  );
}
