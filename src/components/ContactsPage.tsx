import { motion } from 'motion/react';
import { Send, Mail, MapPin } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

import SectionTitle from './SectionTitle';

export default function ContactsPage() {

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
                href="mailto:ruslan-39kld@yandex.ru"
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
                  <p className="font-dm text-[16px] font-medium text-[var(--text-main)]">ruslan-39kld@yandex.ru</p>
                </div>
              </motion.a>

              <motion.a
                href="https://t.me/Ruslan39kld"
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
                  <p className="font-dm text-[16px] font-medium text-[var(--text-main)]">@Ruslan39kld</p>
                </div>
              </motion.a>

              <motion.a
                href="https://vk.com/beltugov39"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('contacts', 'click_vk')}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[#4680C2]/50 hover:shadow-[0_0_20px_rgba(70,128,194,0.25)] transition-all group p-card"
              >
                <div className="w-12 h-12 rounded-full bg-[#4680C2]/10 flex items-center justify-center text-[#4680C2] group-hover:scale-110 transition-transform">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C5.077 11.6 4.453 9.35 4.453 8.95c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.864c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.743c.372 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.814-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.762-.491h1.744c.525 0 .643.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.745-.576.745z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-dm text-[13px] text-[var(--text-secondary)] mb-1">ВКонтакте</p>
                  <p className="font-dm text-[16px] font-medium text-[var(--text-main)]">vk.com/beltugov39</p>
                </div>
              </motion.a>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-card"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--bg-primary)] flex items-center justify-center text-[var(--text-secondary)]">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="font-dm text-[13px] text-[var(--text-secondary)] mb-1">Локация</p>
                  <p className="font-dm text-[16px] font-medium text-[var(--text-main)]">Москва, Россия</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Image block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, y: -6 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[20px] overflow-hidden cursor-pointer"
            style={{ boxShadow: '0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)' }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,107,43,0.15), 0 0 24px rgba(255,107,43,0.12)')}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)')}
          >
            <img
              src="/images/projects/ai svyz.jpg"
              alt="AI collaboration"
              className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
              style={{ minHeight: '320px' }}
            />
          </motion.div>
        </div>
      </motion.div>

    </div>
  );
}
