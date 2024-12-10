import { describe, expect, it } from 'vitest';

import { parseFloorplanInfoFromSvg } from './parsing';

describe('parseFloorplanInfoFromSvg', () => {
    it('should throw an error if the id attribute of the top level element is not a valid JSON string', () => {
        const svgString = `
            <svg>
                <g id="invalid json string"></g>
            </svg>
        `;
        const act = () => parseFloorplanInfoFromSvg(svgString);

        expect(act).toThrowError();
    });
});
