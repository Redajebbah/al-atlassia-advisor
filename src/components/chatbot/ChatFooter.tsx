import { Language } from '@/types/chatbot';
import { cn } from '@/lib/utils';
import { MessageCircle, Phone, AlertTriangle } from 'lucide-react';

interface ChatFooterProps {
  language: Language;
}

/** Quick-contact card shown in the conversation once the request is complete. */
const ChatFooter = ({ language }: ChatFooterProps) => {
  const isRtl = language === 'ar';

  return (
    <div className={cn('max-w-2xl mx-auto px-3 sm:px-5 pb-5', isRtl && 'font-arabic')}>
      <div
        className="rounded-2xl p-4 animate-fade-in-up"
        style={{
          background: '#ffffff',
          border: '1px solid rgba(30, 58, 138, 0.08)',
          boxShadow: '0 4px 16px rgba(30, 58, 138, 0.06)',
        }}
      >
        <p className="text-sm font-semibold" style={{ color: '#1a2947' }}>
          {isRtl ? 'تحتاج إلى مساعدة فورية؟' : "Besoin d'une réponse immédiate ?"}
        </p>
        <p className="text-xs mt-0.5" style={{ color: '#64748b' }}>
          {isRtl ? 'فريقنا متاح عبر واتساب أو الهاتف.' : 'Notre équipe est joignable sur WhatsApp ou par téléphone.'}
        </p>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <a href="https://wa.me/212662153757" target="_blank" rel="noopener noreferrer" className="btn-primary !py-2.5 text-sm">
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            WhatsApp
          </a>
          <a href="tel:+212539919354" className="btn-ghost !py-2.5">
            <Phone className="w-4 h-4" aria-hidden="true" />
            {isRtl ? 'اتصل' : 'Appeler'}
          </a>
        </div>

        <a
          href="tel:0522464644"
          className="mt-3 flex items-center gap-2 rounded-xl px-3 py-2 text-xs transition-colors"
          style={{ background: 'rgba(220, 38, 38, 0.06)', color: '#991b1b' }}
        >
          <AlertTriangle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
          <span>
            {isRtl ? 'عطب أو حادث (24/7): ' : 'Panne ou accident (24h/24) : '}
            <span className="font-semibold" dir="ltr">05 22 46 46 44</span>
          </span>
        </a>
      </div>
    </div>
  );
};

export default ChatFooter;
