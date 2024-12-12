'use client';

import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { useEffect } from 'react';

import ProgressBar from '@/components/ProgressBar/index';
import useSlides from '@/useSlides';

dayjs.extend(isBetween);

export default function Page() {
    const {
        currentSlide,
        currentSlideIndex,
        numSlides,
        slideDuration,

        goToNextSlide,
        goToPrevSlide,
    } = useSlides();

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (
                e.key === 'ArrowRight' ||
                e.key === 'ArrowDown' ||
                e.key === ' '
            ) {
                goToNextSlide();
            }
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                goToPrevSlide();
            }
        };
        window.addEventListener('keydown', handleKeyPress);

        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [goToNextSlide, goToPrevSlide]);

    return (
        <>
            <ProgressBar
                step={currentSlideIndex}
                numSteps={numSlides}
                fillDurationMs={slideDuration}
                style={{
                    width: '80%',
                    margin: '2rem auto',
                    gap: '10rem',
                }}
            />
            {currentSlide.jsx ?? (
                <div
                    style={{
                        display: 'flex',
                        height: '100vh',
                        padding: '3rem',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <h1 style={{ color: currentSlide.color }}>
                            {currentSlide.title}
                        </h1>
                        <p style={{ whiteSpace: 'pre' }}>
                            {currentSlide.description}
                        </p>
                    </div>
                    {currentSlide.media?.map((media, idx) => {
                        if (media.type.startsWith('image/'))
                            return (
                                <img
                                    key={idx}
                                    style={{ height: '50%' }}
                                    src={media.src}
                                    alt={media.alt}
                                />
                            );

                        if (media.type.startsWith('video/'))
                            return (
                                <video
                                    key={idx}
                                    style={{ height: '50%' }}
                                    src={media.src}
                                    controls={false}
                                    autoPlay
                                />
                            );
                    })}
                </div>
            )}
        </>
    );
}
