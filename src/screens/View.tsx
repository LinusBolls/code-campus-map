'use client';

import { WifiOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import CODELogo from '@/components/CODELogo';
import FormattedSlackText from '@/components/FormattedSlackText';
import ProgressBar from '@/components/ProgressBar/index';
import { SlackAnnouncement } from '@/components/SlackAnnouncement';
import { usePrefetchMapData } from '@/useMapData';
import useSlides from '@/useSlides';
import { useClientSideGoogleAuth } from '@/utils/parseCookies';
import { useIsOnline } from '@/utils/useIsOnline';

import { LoadingScreen } from './LoadingScreen';

export default function View() {
    const router = useRouter();

    usePrefetchMapData();

    const {
        currentSlide,
        currentSlideIndex,
        numSlides,
        slideDuration,

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
    }, [goToNextSlide, goToPrevSlide, togglePause]);

    const { isAuthenticated } = useClientSideGoogleAuth();

    if (!isAuthenticated) {
        router.push('/login');

        return <LoadingScreen />;
    }

    if (!currentSlide) return <LoadingScreen />;

    const isOffline = !useIsOnline();

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
                <CODELogo
                    fill="#fff"
                    style={{ width: '22rem', flexShrink: 0 }}
                />
                {numSlides > 1 && (
                    <ProgressBar
                        step={currentSlideIndex}
                        numSteps={numSlides}
                        fillDurationMs={slideDuration}
                        style={{
                            paddingLeft: '3rem',
                            gap: '0.25rem',
                        }}
                        isPaused={isPaused}
                    />
                )}
            </div>

            {currentSlide?.jsx ?? <SlackAnnouncement post={currentSlide} />}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',

                    padding: '1rem 2rem',
                }}
            >
                <FormattedSlackText
                    style={{
                        fontSize: '15px',
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
                {isOffline && (
                    <span
                        style={{
                            display: 'flex',
                            gap: '1rem',
                            fontWeight: 600,
                            color: '#ccc',

                            marginLeft: 'auto',
                        }}
                    >
                        <WifiOff />
                        Offline
                    </span>
                )}
            </div>
        </div>
    );
}
