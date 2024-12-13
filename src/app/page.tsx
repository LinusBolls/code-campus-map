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
        isPaused,
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
            <div
                className="slide-header"
                style={{ display: 'flex', padding: '2rem 3rem' }}
            >
                <CODELogo fill="#fff" style={{ height: '5rem' }} />
                {numSlides > 0 && (
                    <ProgressBar
                        step={currentSlideIndex}
                        numSteps={numSlides}
                        fillDurationMs={slideDuration}
                        style={{
                            marginTop: '12px',
                            paddingLeft: '3rem',
                            gap: '2rem',
                        }}
                        isPaused={isPaused}
                    />
                )}
            </div>

            {currentSlide?.jsx ?? <SlackAnnouncement post={currentSlide} />}
            <FormattedSlackText
                style={{
                    padding: '1rem 2rem',
                }}
                blocks={[
                    {
                        // @ts-expect-error the typing is so fucked lol
                        type: 'rich_text',
                        elements: [
                            {
                                type: 'text',
                                // @ts-expect-error the typing is so fucked lol
                                text: 'Add your announcements to this screen by posting a message in ',
                            },
                            {
                                type: 'channel',
                                // @ts-expect-error the typing is so fucked lol
                                channel_id: 'campusScreen',
                            },
                            {
                                type: 'text',
                                // @ts-expect-error the typing is so fucked lol
                                text: ' ツ',
                            },
                        ],
                    },
                ]}
                entities={{
                    channels: { campusScreen: { name: 'campus-screen' } },
                }}
            />
        </div>
    );
}
