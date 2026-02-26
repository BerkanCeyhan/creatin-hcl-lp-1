import React, { useEffect, useState } from 'react';
import { Star, ArrowRight } from 'lucide-react';

export default function StickyCTA() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const hero = document.querySelector('section:first-of-type');
            const checkout = document.getElementById('checkout-section');

            if (!hero || !checkout) return;

            const heroBottom = hero.getBoundingClientRect().bottom;
            const checkoutTop = checkout.getBoundingClientRect().top;
            const checkoutBottom = checkout.getBoundingClientRect().bottom;

            // Show when passed hero, hide when checkout section is clearly in view
            if (heroBottom < 0 && (checkoutTop > window.innerHeight || checkoutBottom < 0)) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToCheckout = () => {
        document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div
            className={`fixed bottom-0 left-0 w-full bg-brand-surface border-t border-brand-accent/20 z-50 transform transition-transform duration-500 ease-in-out ${isVisible ? 'translate-y-0 shadow-[0_-20px_40px_rgba(0,0,0,0.8)]' : 'translate-y-full shadow-none'}`}
        >
            <div className="max-w-6xl mx-auto px-4 py-3 pb-safe flex items-center justify-between gap-4">

                <div className="hidden md:flex flex-col">
                    <div className="font-heading font-bold uppercase text-white tracking-wide text-lg leading-none mb-1">
                        Creatin HCL (750mg)
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex text-brand-accent">
                            {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                        </div>
                        <span className="text-[10px] font-mono text-white/40 uppercase">Apothekenqualität</span>
                    </div>
                </div>

                <div className="flex-1 md:hidden flex items-center gap-1 text-brand-accent">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                    <span className="text-white ml-2 font-heading font-bold uppercase">HCL 750mg</span>
                </div>

                <button
                    onClick={scrollToCheckout}
                    className="bg-brand-accent text-brand-bg px-6 py-3 font-drama uppercase tracking-wider hover:bg-white transition-colors flex items-center gap-2 text-sm md:text-base group"
                >
                    JETZT BESTELLEN
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        .pb-safe { padding-bottom: max(0.75rem, env(safe-area-inset-bottom)); }
      `}} />
        </div>
    );
}
