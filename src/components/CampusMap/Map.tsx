import React from 'react';

import { useMap } from '@/useMapData';

type SvgStyle = {
    fill?: string;
    stroke?: string;
    'stroke-width'?: number;
    'fill-opacity'?: number;
};

export type MapRoomStyles = Record<
    string,
    {
        style?: SvgStyle;
        label?: { style?: SvgStyle };
    }
>;

export interface MapProps {
    rooms?: MapRoomStyles;
    style?: React.CSSProperties;
}

export const Map: React.FC<MapProps> = ({ rooms = {}, ...rest }) => {
    /**
     * implementation details:
     *
     * we render the svg inside an iframe so we are able to independently style multiple floorplan instances on the same page without the styles interfering.
     *
     * before we used iframes, we first tried to just give each floorplan instance a unique id and prefix all style selectors with this prefix, but we ran into an issue:
     *
     * the figma floorplan export has multiple instances of styles like this: `<mask id="path-7-inside-1_7_746" fill="white">...</mask><path d="M780 871H913V956H780V871Z" stroke="#CF85EC" stroke-width="4" mask="url(#path-7-inside-1_7_746)" />`
     *
     * in this case, if we have multiple floorplans on a page, the `mask="url(#path-7-inside-1_7_746)"` of the second floorplan will always refer to the mask of the first floorplan.
     * meaning if we style the mask of the first floorplan, it overrides the styles of all other floorplans.
     *
     */
    const styleStr =
        Object.entries(rooms)
            .map(
                ([id, props]) =>
                    `[js-data-id="${id}"], [js-data-id="${id}"] * {${Object.entries(
                        props?.style ?? {}
                    )
                        .map(([key, value]) => key + ':' + value + '!important')
                        .join(';')}}` +
                    `[js-data-label-for="${id}"] * {${Object.entries(
                        props?.label?.style ?? {}
                    )
                        .map(([key, value]) => key + ':' + value + '!important')
                        .join(';')}}`
            )
            .join('') +
        'body{width:100vw;height:100vh;margin:0}svg{width:100%;height:100%}';

    return (
        <iframe
            {...rest}
            className="w-full h-full pointer-events-none"
            srcDoc={`<style>${styleStr}</style>` + useMap().svgString}
        />
    );
};
