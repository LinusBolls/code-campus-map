import React, { useEffect, useState } from 'react';

import './ProgressBar.css';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
    step: number;
    numSteps: number;
    fillDurationMs: number;
}
const ProgressBar = ({
    step,
    numSteps,
    fillDurationMs,
    ...rest
}: ProgressBarProps) => {
    const [progress, setProgress] = useState<number | null>(null);

    useEffect(() => {
        setProgress(null); // reset progress to restart animation
        setTimeout(() => setProgress(step), 50); // allow css reflow before starting animation
    }, [step]);

    return (
        <div
            {...rest}
            className="progress-bar"
            // @ts-expect-error custom css variable
            style={{ '--fill-duration': fillDurationMs + 'ms', ...rest.style }}
        >
            {Array.from({ length: numSteps })
                .fill(null)
                .map((_, idx) => (
                    <div
                        key={idx}
                        className={`progress-section ${idx === progress ? 'fill' : ''}`}
                    />
                ))}
        </div>
    );
};

export default ProgressBar;
