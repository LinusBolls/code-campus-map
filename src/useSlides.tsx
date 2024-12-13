import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { Slide } from './app/api/screen/slides/route';
import CampusMap, { MapDisplayMode } from './components/CampusMap';
import { Config } from './config';
import { useInterval } from './hooks/useInterval';

export function useDynamicSlides() {
    return useQuery({
        queryKey: ['slides'],
        queryFn: async () => {
            const res = await fetch('/api/screen/slides');
            const data = await res.json();
            return data;
        },
        refetchInterval: Config.SLIDES_REFETCH_INTERVAL,
    });
}

export default function useSlides() {
    const { data: dynamicSlides, isLoading: isLoadingSlides } =
        useDynamicSlides();

    const mapSlides: Slide[] = [
        {
            jsx: (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        flex: 1,
                    }}
                >
                    <CampusMap
                        mode={MapDisplayMode.MAP}
                        style={{
                            width: '40%',
                        }}
                    />
                    <CampusMap
                        mode={MapDisplayMode.BOOKING}
                        style={{
                            width: '40%',
                        }}
                    />
                </div>
            ),
        },
    ];

    const slides: Slide[] = [...mapSlides, ...(dynamicSlides || [])];

    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    function goToNextSlide() {
        setCurrentSlideIndex((prev) =>
            prev >= slides.length - 1 ? 0 : prev + 1
        );
    }
    function goToPrevSlide() {
        setCurrentSlideIndex((prev) =>
            prev <= 0 ? slides.length - 1 : prev - 1
        );
    }

    const [slideInterval, setSlideInterval] = useState<number | null>(
        Config.SLIDE_DURATION
    );

    function manuallyGoToNextSlide() {
        goToNextSlide();
        // resetting the interval to reset the timeout of going to the next slide
        setSlideInterval(null);
        setTimeout(() => setSlideInterval(Config.SLIDE_DURATION), 0);
    }

    function manuallyGoToPrevSlide() {
        goToPrevSlide();
        // resetting the interval to reset the timeout of going to the next slide
        setSlideInterval(null);
        setTimeout(() => setSlideInterval(Config.SLIDE_DURATION), 0);
    }
    function togglePause() {
        setSlideInterval((prev) => (prev ? null : Config.SLIDE_DURATION));
    }

    useInterval(goToNextSlide, slideInterval);

    const currentSlide = slides[currentSlideIndex] as Slide | undefined;

    return {
        currentSlide,
        currentSlideIndex,
        numSlides: slides.length,
        slideDuration: Config.SLIDE_DURATION,
        isLoadingSlides,
        goToNextSlide: manuallyGoToNextSlide,
        goToPrevSlide: manuallyGoToPrevSlide,
        togglePause,
    };
}
