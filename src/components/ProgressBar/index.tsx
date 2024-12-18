import React, { useEffect, useState } from 'react';

import './ProgressBar.css';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
    step: number;
    numSteps: number;
    fillDurationMs: number;
    isPaused?: boolean;
}
const ProgressBar = ({
    step,
    numSteps,
    fillDurationMs,
    isPaused = false,
    ...rest
}: ProgressBarProps) => {
    const [progress, setProgress] = useState<number | null>(null);

    useEffect(() => {
        setProgress(null); // reset progress to restart animation
        setTimeout(() => setProgress(step), 50); // allow css reflow before starting animation
    }, [step]);

    return (
        <div className="flex flex-col w-full">
            <div
                {...rest}
                className={
                    'progress-bar flex w-full h-2 overflow-hidden' +
                    (isPaused ? ' progress-bar--paused' : '') +
                    ' ' +
                    (rest.className ?? '')
                }
                style={{
                    // @ts-expect-error custom css variable
                    '--fill-duration': fillDurationMs + 'ms',
                    ...rest.style,
                }}
            >
                {Array.from({ length: numSteps })
                    .fill(null)
                    .map((_, idx) => (
                        <div
                            key={idx}
                            className={`progress-section ${idx === progress ? 'fill' : ''} flex items-center justify-center flex-1 font-bold relative rounded-full overflow-hidden bg-gray-300 dark:bg-gray-900`}
                        >
                            <div className="content bg-gray-800 dark:bg-gray-600 h-full w-0 left-0 top-0 absolute" />
                        </div>
                    ))}
            </div>
            <span
                className="progress-bar__hint"
                style={{
                    textAlign: 'center',
                    color: '#333',
                    marginTop: '1rem',
                    cursor: 'default',
                }}
            >
                Use the space bar to pause and the arrow keys to switch slides
            </span>
        </div>
    );
};

export default ProgressBar;
