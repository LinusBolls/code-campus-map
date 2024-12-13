import { Slide } from '@/app/api/screen/slides/route';

import FormattedSlackText from './FormattedSlackText';

export interface SlackAnnouncementProps {
    post: Slide;
}
export const SlackAnnouncement: React.FC<SlackAnnouncementProps> = ({
    post,
}) => {
    return (
        <div
            style={{
                display: 'flex',

                flex: 1,

                padding: '3rem',

                // fontSize: '2.5rem',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <FormattedSlackText blocks={post.blocks!} entities={post} />
            </div>
            {post.media?.map((media, idx) => {
                if (media.type.startsWith('image/'))
                    return (
                        <img
                            key={idx}
                            style={{ height: '50%' }}
                            src={media.src}
                            alt={media.alt}
                        />
                    );

                if (media.type.startsWith('video/'))
                    return (
                        <video
                            key={idx}
                            style={{ height: '50%' }}
                            src={media.src}
                            controls={false}
                            autoPlay
                        />
                    );
            })}
        </div>
    );
};
