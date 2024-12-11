import { NextResponse } from 'next/server';

export type Slide = {
    jsx?: React.ReactElement;

    title?: string;
    color?: string;
    description?: string;
    people?: string[];
    media?: { type: 'image/png'; src: string; alt?: string }[];
    postedBy?: string;
};
const slides: Slide[] = [
    {
        title: 'Scrap Secret Santa',
        color: '#79014A',
        description:
            'Infos and Signing up on LP\n\n For questions, reach out to @Julien Kloevekorn',
        people: [],
        media: [],
        postedBy: '',
    },
    {
        title: 'Indian Cultural Evening + Movie Night!!',
        color: '#061ABD',
        description:
            'Moday Dec 16th starting at 18:00 with presentation and food, followed by a film!\n\nFor questions, reach out to Andrew, Jeel, or Plad',
        people: [],
        media: [],
        postedBy: '',
    },
    {
        title: 'Winter Expo Day 13.12.',
        color: '#0A7EA3',
        description:
            'Project Presentations\n15:00 - 15:30\n\nProject Exhitibion\n15:30 - 17:30\n\nGet-Together\n17:30',
        people: [],
        media: [],
        postedBy: '',
    },
    {
        title: 'Monday Movie Night',
        color: '#C4A007',
        description:
            'Every Monday at 18:00 in the Lounge\n\nFor questions, reach out to @Andrew',
        people: [],
        media: [
            // {
            //     type: 'image/png',
            //     src: '/movie-night-poster.png',
            // },
        ],
        postedBy: '',
    },
];

export async function GET() {
    return NextResponse.json(slides);
}
