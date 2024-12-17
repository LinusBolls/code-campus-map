import { HTMLElement, parse } from 'node-html-parser';

import { ElSchema, isLabel, isRoom, MapEl } from './mapElements';

export function parseFloorplanInfoFromSvg(svgString: string) {
    let root: HTMLElement;
    try {
        root = parse(svgString);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
        throw new Error(
            'parseFloorplanInfoFromSvg: Failed to parse parameter as svg'
        );
    }
    const topLevelElements = root.querySelectorAll('svg > #floorplan > *');

    if (topLevelElements.length === 0) {
        throw new Error(
            'parseFloorplanInfoFromSvg: No top level elements found in svg. Did you remember to enable the "Include \'id\' attribute" option in the Figma export? ' +
                svgString
        );
    }

    const data = topLevelElements.map<MapEl>((el) => {
        const id = el.getAttribute('id');

        if (!id) {
            throw new Error(
                'parseFloorplanInfoFromSvg: No id attribute found for top level element: ' +
                    el.toString()
            );
        }

        let elData: unknown;

        try {
            elData = JSON.parse(id);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            throw new Error(
                'parseFloorplanInfoFromSvg: Failed to JSON.parse id attribute of top level element: ' +
                    id
            );
        }
        try {
            const data = ElSchema.parse(elData);

            if (isLabel(data)) {
                el.setAttribute('js-data-label-for', data.label);
            }
            if (isRoom(data)) {
                el.setAttribute('js-data-id', data.id);
                el.setAttribute('js-data-type', data.type);
                el.setAttribute(
                    'js-data-bookable',
                    data.google ? 'true' : 'false'
                );
                if (data.parent) el.setAttribute('js-data-parent', data.parent);
                if (data.googleName)
                    el.setAttribute('js-data-google-name', data.googleName);

                // we want to set the fill color as a style attribute rather than using the fill attribute, because this way we can animate the fill color using css
                if (el.getAttribute('fill'))
                    el.setAttribute('style', 'fill:' + el.getAttribute('fill'));
                el.removeAttribute('fill');
            }

            return data;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            throw new Error(
                'parseFloorplanInfoFromSvg: Failed to validate top level element: ' +
                    JSON.stringify(elData)
            );
        }
    });
    const labels = data.filter((i) => 'label' in i);
    const rooms = data.filter((i) => 'id' in i);
    const childRooms = rooms.filter((i) => 'parent' in i);

    for (const label of labels) {
        if (!rooms.find((i) => i.id === label.label)) {
            throw new Error(
                'parseFloorplanInfoFromSvg: Label element with id ' +
                    label.label +
                    ' does not have a corresponding room element'
            );
        }
    }
    for (const room of childRooms) {
        if (!rooms.find((i) => i.id === room.parent)) {
            throw new Error(
                'parseFloorplanInfoFromSvg: Child element with id ' +
                    room.parent +
                    ' does not have a corresponding parent element'
            );
        }
    }
    return { str: root.toString(), data };
}
