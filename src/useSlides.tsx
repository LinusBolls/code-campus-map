import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { Slide } from './app/api/screen/slides/route';
import CampusMap, { MapDisplayMode } from './components/CampusMap';
import { Config } from './config';
import { useInterval } from './hooks/useInterval';

export function useDynamicSlides() {
    const slidesQuery = useQuery({
        queryKey: ['slides'],
        queryFn: async () => {
            const res = await fetch('/api/screen/slides');
            const data = await res.json();
            return data;
        },
        refetchInterval: Config.SLIDES_REFETCH_INTERVAL,
    });

    return { dynamicSlides: slidesQuery.data };
}

export default function useSlides() {
    const { dynamicSlides } = useDynamicSlides();

    const mapSlides: Slide[] = [
        {
            jsx: (
                <CampusMap
                    mode={MapDisplayMode.MAP}
                    style={{
                        height: '80vh',
                    }}
                />
            ),
        },
        {
            jsx: (
                <CampusMap
                    mode={MapDisplayMode.BOOKING}
                    style={{
                        height: '80vh',
                    }}
                />
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

    useInterval(goToNextSlide, slideInterval);

    const currentSlide = slides[currentSlideIndex];

    return {
        currentSlide,
        currentSlideIndex,
        numSlides: slides.length,
        slideDuration: Config.SLIDE_DURATION,
        goToNextSlide: manuallyGoToNextSlide,
        goToPrevSlide: manuallyGoToPrevSlide,
    };
}
