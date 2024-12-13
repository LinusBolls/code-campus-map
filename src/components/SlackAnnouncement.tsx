import { Slide } from '@/app/api/screen/slides/route';

import FormattedSlackText from './FormattedSlackText';

export interface SlackAnnouncementProps {
    post: Slide;
}
export const SlackAnnouncement: React.FC<SlackAnnouncementProps> = ({
    post,
}) => {
    const hasMedia = post.media?.length ?? 0 > 0;

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

                    maxWidth: '42rem',
                }}
            />
            {hasMedia && (
                <div
                    style={{
                        overflow: 'hidden',

                        maxWidth: '42rem',
                        height: '100%',
                    }}
                >
                    {post.media?.map((media, idx) => {
                        if (media.type.startsWith('image/'))
                            return (
                                <img
                                    key={idx}
                                    style={{ height: '100%' }}
                                    src={media.src}
                                    alt={media.alt}
                                />
                            );

                        if (media.type.startsWith('video/'))
                            return (
                                <video
                                    key={idx}
                                    style={{ height: '100%' }}
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
