'use client';

import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { useEffect } from 'react';

import CODELogo from '@/components/CODELogo';
import FormattedSlackText from '@/components/FormattedSlackText';
import ProgressBar from '@/components/ProgressBar/index';
import { SlackAnnouncement } from '@/components/SlackAnnouncement';
import useSlides from '@/useSlides';

dayjs.extend(isBetween);

export default function Page() {
    const {
        currentSlide,
        currentSlideIndex,
        numSlides,
        slideDuration,
        isLoadingSlides,

        goToNextSlide,
        goToPrevSlide,
        togglePause,
    } = useSlides();

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === ' ') {
                togglePause();
            }
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                goToNextSlide();
            }
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                goToPrevSlide();
            }
        };
        window.addEventListener('keydown', handleKeyPress);

        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [goToNextSlide, goToPrevSlide]);

    if (!currentSlide || isLoadingSlides) return null;

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',

                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
            }}
        >
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
            <CODELogo fill="#fff" style={{ width: '5rem' }} />
            {currentSlide?.jsx ?? <SlackAnnouncement post={currentSlide} />}
            <div>
                Add a slide to this screen by posting a message in
                #campus-screen ツ
            </div>
        </div>
    );
}
