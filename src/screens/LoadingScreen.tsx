import { LoadingSpinner } from '@/components/LoadingSpinner';

export const LoadingScreen: React.FC = () => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                minHeight: '100vh',
            }}
        >
            <LoadingSpinner />
        </div>
    );
};
