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
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',

                width: '100%',
            }}
        >
            <div
                {...rest}
                className={
                    'progress-bar' + (isPaused ? ' progress-bar--paused' : '')
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
                            className={`progress-section ${idx === progress ? 'fill' : ''}`}
                        >
                            <div className="content" />
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
