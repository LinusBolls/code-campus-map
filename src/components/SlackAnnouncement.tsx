import { Slide } from '@/app/api/screen/slides/route';

import FormattedSlackText from './FormattedSlackText';

const mediaStyles = [
    {
        position: 'absolute',
        top: '0px',
        left: '0px',
    },
    {
        position: 'absolute',
        top: '0px',
        right: '0px',
    },
    {
        position: 'absolute',
        bottom: '0px',
        right: '0px',
    },
    {
        position: 'absolute',
        bottom: '0px',
        left: '0px',
    },
] as const;

export interface SlackAnnouncementProps {
    post: Slide;
}
export const SlackAnnouncement: React.FC<SlackAnnouncementProps> = ({
    post,
}) => {
    const numMedia = post.media?.length ?? 0;

    return (
        <div
            style={{
                overflow: 'hidden',

                display: 'flex',
                justifyContent: 'space-around',

                flex: 1,
                padding: '3rem',

                // fontSize: '2.5rem',
            }}
        >
            <FormattedSlackText
                blocks={post.blocks!}
                entities={post}
                style={{
                    overflow: 'hidden',

                    width: '42rem',
                }}
            />
            {numMedia > 0 && (
                <div
                    style={{
                        overflow: 'hidden',
                        position: 'relative',

                        width: '42rem',
                        height: '100%',
                    }}
                >
                    {post.media?.map((media, idx) => {
                        const style = {
                            ...(numMedia > 1
                                ? mediaStyles[idx % mediaStyles.length]
                                : {}),

                            width: 'auto',
                            height: (numMedia === 1 ? 100 : 45) + '%',
                            objectFit: 'contain' as const,
                        };

                        if (media.type.startsWith('image/'))
                            return (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    key={idx}
                                    style={style}
                                    src={media.src}
                                    alt={media.alt}
                                />
                            );

                        if (media.type.startsWith('video/'))
                            return (
                                <video
                                    key={idx}
                                    style={style}
                                    src={media.src}
                                    controls={false}
                                    autoPlay
                                />
                            );
                    })}
                </div>
            )}
        </div>
    );
};
