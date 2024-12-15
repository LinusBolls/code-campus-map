import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { Sache } from '@/screens/Sache';

dayjs.extend(isBetween);

export default async function Page() {
    const cookieStore = await cookies();

    const token = cookieStore.get('google:code-connect:access-token')?.value;

    if (!token) {
        redirect('/login');
    }
    return <Sache />;
}
