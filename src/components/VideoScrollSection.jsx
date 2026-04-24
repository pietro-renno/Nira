import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 151;

export default function VideoScrollSection() {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const contentRef = useRef(null);
    
    // Estado para controlar o progresso do carregamento (opcional, mas pro)
    const [imagesLoaded, setImagesLoaded] = useState(0);
    const imagesRef = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d', { alpha: false });
        
        // 1. Pré-carregar todas as imagens
        const preloadImages = () => {
            for (let i = 1; i <= TOTAL_FRAMES; i++) {
                const img = new Image();
                // Gerando o caminho dinâmico dos frames
                const frameNum = i.toString().padStart(3, '0');
                const path = `/src/assets/ezgif-frame-${frameNum}.jpg`;
                
                img.src = path;
                img.onload = () => {
                    setImagesLoaded(prev => prev + 1);
                };
                imagesRef.current.push(img);
            }
        };

        const renderFrame = (index) => {
            if (!context) return;
            const img = imagesRef.current[index];
            if (!img) return;
            
            if (img.complete) {
                // Desenha no canvas mantendo o aspecto "cover"
                const canvasAspect = canvas.width / canvas.height;
                const imgAspect = img.width / img.height;
                let drawW, drawH, drawX, drawY;

                if (canvasAspect > imgAspect) {
                    drawW = canvas.width;
                    drawH = canvas.width / imgAspect;
                    drawX = 0;
                    drawY = (canvas.height - drawH) / 2;
                } else {
                    drawW = canvas.height * imgAspect;
                    drawH = canvas.height;
                    drawX = (canvas.width - drawW) / 2;
                    drawY = 0;
                }

                context.drawImage(img, drawX, drawY, drawW, drawH);
            }
        };

        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            // Renderiza o frame atual após resize
            const progress = ScrollTrigger.getById('video-scroll')?.progress || 0;
            renderFrame(Math.floor(progress * (TOTAL_FRAMES - 1)));
        };

        preloadImages();
        window.addEventListener('resize', setCanvasSize);
        setCanvasSize();

        // 2. Lógica de Scroll GSAP vinculada aos Frames
        ScrollTrigger.create({
            id: 'video-scroll',
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.1, // Suavidade extrema
            onUpdate: (self) => {
                const frameIndex = Math.floor(self.progress * (TOTAL_FRAMES - 1));
                renderFrame(frameIndex);
            }
        });

        // 3. Animação de Texto sincronizada
        gsap.to(contentRef.current, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: true,
            },
            onUpdate: function() {
                const p = this.progress();
                const visible = p > 0.1 && p < 0.9;
                const blurValue = p < 0.18 || p > 0.82 ? 15 : 0;
                
                gsap.set(contentRef.current, {
                    opacity: visible ? 1 : 0,
                    scale: 1 + (0.05 * p),
                    y: (0.2 - p) * 80,
                    filter: `blur(${blurValue}px)`
                });
            }
        });

        return () => {
            window.removeEventListener('resize', setCanvasSize);
            ScrollTrigger.getById('video-scroll')?.kill();
        };
    }, []);

    return (
        <section ref={containerRef} className="relative h-[800vh] bg-[#11111B]">
            <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
                
                {/* Canvas de Alta Performance */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full"
                    style={{ 
                        filter: 'brightness(0.9)',
                        willChange: 'contents' 
                    }}
                />

                {/* Overlays Cinematográficas */}
                <div className="absolute inset-0 pointer-events-none z-10">
                    <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#11111B] via-[#11111B]/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-full h-80 bg-gradient-to-t from-[#11111B] via-[#11111B]/90 to-transparent" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(17,17,27,0.7)_100%)]" />
                </div>

                {/* Feedback de Carregamento (Só aparece enquanto as imagens baixam) */}
                {imagesLoaded < TOTAL_FRAMES && (
                    <div className="absolute top-8 right-8 z-50 flex items-center gap-3">
                        <div className="w-4 h-4 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">
                            Buffer: {Math.floor((imagesLoaded / TOTAL_FRAMES) * 100)}%
                        </span>
                    </div>
                )}

                {/* Conteúdo Central */}
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-6 text-center">
                    <div ref={contentRef} className="opacity-0">
                        <span className="text-brand-primary text-[10px] font-black uppercase tracking-[0.6em] mb-6 block animate-pulse">
                            Conectividade Segura
                        </span>
                        <h1 className="text-5xl md:text-8xl font-black text-white leading-none max-w-5xl tracking-tighter">
                            A Nira transforma o <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-purple-400 to-brand-primary bg-[length:200%_auto] animate-gradient-x">
                                silêncio em voz
                            </span>
                        </h1>
                        <p className="text-text-muted text-xl mt-8 max-w-2xl mx-auto font-light leading-relaxed opacity-70">
                            Uma rede global de suporte, alimentada por tecnologia 100% anônima e humana.
                        </p>
                    </div>

                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
                        <div className="w-px h-12 bg-gradient-to-b from-brand-primary to-transparent animate-bounce" />
                        <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Deslize para ver a mudança</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

