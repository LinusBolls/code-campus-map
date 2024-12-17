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
import { useApiHealth } from '@/utils/useApiHealth';
import { useIsOnline } from '@/utils/useIsOnline';

import { LoadingScreen } from './LoadingScreen';

export default function View() {
    const router = useRouter();

    usePrefetchMapData();

    useApiHealth();

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

    const isOffline = !useIsOnline();

    if (!isAuthenticated) {
        router.push('/login');

        return <LoadingScreen />;
    }

    if (!currentSlide) return <LoadingScreen />;

    return (
        <div className="flex flex-col w-screen h-screen overflow-hidden">
            <div className="flex py-8 px-12 slide-header">
                <CODELogo className="fill-black dark:fill-white w-96 flex-shrink-0" />
                {numSlides > 1 && (
                    <ProgressBar
                        className="pl-6 gap-1"
                        step={currentSlideIndex}
                        numSteps={numSlides}
                        fillDurationMs={slideDuration}
                        isPaused={isPaused}
                    />
                )}
            </div>

            {currentSlide?.jsx ?? <SlackAnnouncement post={currentSlide} />}
            <div className="flex items-center px-8 py-4">
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
                    <span className="text-sm flex ml-auth gap-4 items-center font-semibold text-gray-400 dark:text-gray-600">
                        <WifiOff />
                        Offline
                    </span>
                )}
            </div>
        </div>
    );
}
