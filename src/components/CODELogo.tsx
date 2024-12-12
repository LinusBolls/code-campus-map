export interface CODELogoProps extends React.SVGProps<SVGSVGElement> {}
export default function CODELogo(props: CODELogoProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 2883 500"
            {...props}
        >
            <path d="M246.296 379.63c-66.666 0-120.37-59.26-120.37-131.482 0-72.222 53.704-131.481 120.37-131.481 31.482 0 61.111 14.814 83.334 37.037l85.185-83.334C368.518 27.778 309.259 0 242.593 0 109.259 0 0 111.111 0 250c0 137.037 109.259 250 242.593 250 66.666 0 127.777-27.778 170.37-72.222l-85.185-83.334c-20.371 22.223-50 35.186-81.482 35.186zm350-368.519l-235.185 229.63-7.407 7.407 242.592 238.889 83.334-81.481L514.815 250 679.63 92.593 596.296 11.11zm650.004 5.556h-159.26V481.48h161.11c146.29 0 251.85-88.888 251.85-231.481 0-144.444-105.56-233.333-253.7-233.333zm0 361.111h-38.89V122.222h38.89c85.18 0 129.63 55.556 129.63 127.778 0 68.519-48.15 127.778-129.63 127.778zM1900 122.222V16.667h-344.44V481.48H1900V377.778h-224.07v-79.63h218.51V194.444h-218.51v-72.222H1900zM792.593 11.112l-83.334 81.48L874.074 250 709.259 405.556l83.334 81.481 242.597-238.889-7.41-7.407-235.187-229.63zM2122.53 122.551c-5.17 0-10.03-.724-14.58-2.172-4.45-1.552-8.33-4.034-11.64-7.448-3.21-3.518-5.74-8.069-7.6-13.655-1.87-5.587-2.8-12.466-2.8-20.638V18.896h12.88v60.052c0 6.103.62 11.224 1.87 15.362 1.24 4.138 2.89 7.448 4.96 9.931 2.17 2.483 4.71 4.293 7.6 5.431 2.9 1.035 6 1.552 9.31 1.552 3.42 0 6.57-.517 9.47-1.552 2.9-1.138 5.43-2.948 7.6-5.431 2.18-2.483 3.88-5.793 5.12-9.931 1.25-4.138 1.87-9.259 1.87-15.362V18.896H2159v59.742c0 8.172-.93 15.051-2.79 20.638-1.87 5.586-4.45 10.137-7.76 13.655-3.21 3.414-7.04 5.896-11.48 7.448-4.45 1.448-9.26 2.172-14.44 2.172zM2191.05 120.689V18.896h13.34l36.78 63.931 11.02 21.104h.62c-.31-5.173-.68-10.5-1.09-15.983-.31-5.586-.47-11.069-.47-16.448V18.896h12.26V120.69h-13.34l-36.93-64.086-11.02-20.948h-.62c.41 5.172.78 10.448 1.09 15.828.41 5.275.62 10.603.62 15.982v53.224h-12.26zM2296.17 120.689V18.896h12.88V120.69h-12.88zM2360.21 120.689l-32.59-101.793h13.81l16.3 54.931c1.86 6.104 3.46 11.742 4.81 16.914a400.01 400.01 0 005.12 16.759h.62c1.86-6 3.52-11.587 4.96-16.759 1.45-5.172 3.06-10.81 4.81-16.914l16.3-54.93h13.19l-32.28 101.792h-15.05zM2426.1 120.689V18.896h58.66v10.862h-45.78v31.966h38.64V72.74h-38.64v36.931h47.33v11.017h-60.21zM2512.59 120.689V18.896h31.81c5.17 0 9.93.517 14.27 1.552 4.45.931 8.23 2.535 11.33 4.81 3.21 2.276 5.69 5.225 7.45 8.845 1.76 3.62 2.64 8.07 2.64 13.345 0 7.965-2.07 14.328-6.21 19.086-4.14 4.759-9.72 8.017-16.76 9.776l25.92 44.379h-14.59l-24.52-42.982h-18.46v42.982h-12.88zm12.88-53.534h17.07c7.96 0 14.07-1.604 18.31-4.81 4.24-3.31 6.36-8.276 6.36-14.897 0-6.724-2.12-11.431-6.36-14.12-4.24-2.69-10.35-4.035-18.31-4.035h-17.07v37.862zM2631.71 122.551c-7.14 0-13.76-1.344-19.86-4.034-6.11-2.69-11.38-6.362-15.83-11.017l7.76-9c3.62 3.827 7.86 6.931 12.72 9.31 4.97 2.276 10.09 3.414 15.36 3.414 6.73 0 11.95-1.5 15.68-4.5 3.72-3.104 5.58-7.138 5.58-12.104 0-2.586-.46-4.758-1.39-6.517-.83-1.862-2.02-3.414-3.57-4.655-1.45-1.345-3.21-2.534-5.28-3.569-2.07-1.035-4.29-2.12-6.67-3.259l-14.59-6.362a69.171 69.171 0 01-7.29-3.724 29.936 29.936 0 01-6.67-5.276c-1.97-2.069-3.57-4.5-4.81-7.293-1.24-2.896-1.87-6.207-1.87-9.93 0-3.828.78-7.397 2.33-10.708 1.66-3.31 3.88-6.155 6.67-8.534 2.9-2.483 6.26-4.397 10.09-5.742 3.93-1.344 8.22-2.017 12.88-2.017 6.1 0 11.74 1.19 16.91 3.57 5.18 2.275 9.57 5.275 13.19 9l-6.98 8.379c-3.1-3-6.57-5.328-10.4-6.983-3.72-1.759-7.96-2.638-12.72-2.638-5.69 0-10.29 1.345-13.81 4.034-3.41 2.587-5.12 6.207-5.12 10.862 0 2.483.46 4.604 1.4 6.362 1.03 1.656 2.37 3.156 4.03 4.5a41.006 41.006 0 005.43 3.414c1.97.931 3.98 1.81 6.05 2.638l14.43 6.207c2.9 1.241 5.64 2.69 8.23 4.345 2.58 1.552 4.81 3.414 6.67 5.586 1.86 2.069 3.31 4.552 4.35 7.448 1.13 2.793 1.7 6.052 1.7 9.776 0 4.035-.83 7.811-2.48 11.328-1.55 3.517-3.83 6.62-6.83 9.31-3 2.586-6.62 4.655-10.86 6.207-4.24 1.448-9.05 2.172-14.43 2.172zM2691.01 120.689V18.896h12.88V120.69h-12.88zM2757.53 120.689v-90.93h-30.72V18.895h74.48v10.862h-30.72v90.931h-13.04zM2838.61 120.689V81.276l-30.57-62.38h13.81l13.19 28.707c1.65 3.724 3.26 7.397 4.81 11.017 1.55 3.621 3.2 7.345 4.96 11.173h.62a575.71 575.71 0 015.28-11.173c1.76-3.62 3.41-7.293 4.96-11.017l13.04-28.707h13.5l-30.57 62.38v39.413h-13.03zM2114.62 484.621c-7.14 0-13.76-1.345-19.86-4.035-6.11-2.689-11.38-6.362-15.83-11.017l7.76-9c3.62 3.828 7.86 6.931 12.72 9.31 4.97 2.276 10.09 3.414 15.36 3.414 6.73 0 11.95-1.5 15.68-4.5 3.72-3.103 5.58-7.138 5.58-12.103 0-2.586-.46-4.759-1.39-6.518-.83-1.862-2.02-3.413-3.57-4.655-1.45-1.345-3.21-2.534-5.28-3.569-2.07-1.034-4.29-2.12-6.67-3.258l-14.59-6.362a69.322 69.322 0 01-7.29-3.724 29.957 29.957 0 01-6.67-5.276c-1.97-2.069-3.57-4.5-4.81-7.293-1.24-2.897-1.86-6.207-1.86-9.931 0-3.828.77-7.397 2.32-10.707 1.66-3.311 3.88-6.156 6.68-8.535 2.89-2.483 6.25-4.396 10.08-5.741 3.93-1.345 8.23-2.017 12.88-2.017 6.1 0 11.74 1.189 16.91 3.568 5.18 2.276 9.57 5.276 13.19 9l-6.98 8.38c-3.1-3-6.57-5.328-10.4-6.983-3.72-1.759-7.96-2.638-12.72-2.638-5.69 0-10.29 1.345-13.81 4.035-3.41 2.586-5.12 6.206-5.12 10.862 0 2.482.47 4.603 1.4 6.362 1.03 1.655 2.38 3.155 4.03 4.5a41.1 41.1 0 005.43 3.414c1.97.931 3.98 1.81 6.05 2.637l14.43 6.207c2.9 1.242 5.64 2.69 8.23 4.345 2.58 1.552 4.81 3.414 6.67 5.586 1.86 2.069 3.31 4.552 4.35 7.449 1.13 2.793 1.7 6.051 1.7 9.776 0 4.034-.82 7.81-2.48 11.327-1.55 3.517-3.83 6.621-6.83 9.31-3 2.587-6.62 4.656-10.86 6.207-4.24 1.449-9.05 2.173-14.43 2.173zM2212.41 484.621c-6.42 0-12.31-1.19-17.69-3.569-5.38-2.38-10.09-5.793-14.12-10.242-3.94-4.551-7.04-10.086-9.31-16.603-2.18-6.621-3.26-14.069-3.26-22.345 0-8.172 1.13-15.517 3.41-22.034 2.28-6.518 5.43-12.052 9.47-16.604 4.03-4.552 8.79-8.017 14.27-10.396 5.48-2.483 11.48-3.724 18-3.724 6.21 0 11.64 1.293 16.29 3.879 4.76 2.483 8.64 5.379 11.64 8.689l-6.98 8.38c-2.69-2.897-5.74-5.224-9.16-6.983-3.41-1.759-7.29-2.638-11.63-2.638-4.87 0-9.26.983-13.19 2.948-3.93 1.862-7.3 4.604-10.09 8.225-2.79 3.517-4.96 7.81-6.52 12.879-1.44 5.069-2.17 10.758-2.17 17.069 0 6.414.73 12.207 2.17 17.379 1.56 5.069 3.68 9.414 6.37 13.035 2.69 3.62 5.94 6.413 9.77 8.379 3.93 1.965 8.33 2.948 13.19 2.948 4.97 0 9.31-.983 13.04-2.948 3.72-2.069 7.24-4.914 10.55-8.535l7.14 8.069c-4.04 4.656-8.59 8.276-13.66 10.862-5.07 2.587-10.91 3.88-17.53 3.88zM2267.23 482.759V380.966h12.88v101.793h-12.88zM2312.64 482.759V380.966h58.66v10.862h-45.78v31.965h38.64v11.017h-38.64v36.931h47.33v11.018h-60.21zM2399.13 482.759V380.966h13.34l36.78 63.931L2460.27 466h.62c-.31-5.172-.67-10.5-1.09-15.983-.31-5.586-.46-11.069-.46-16.448v-52.603h12.25v101.793h-13.34l-36.93-64.087-11.02-20.948h-.62c.41 5.173.78 10.448 1.09 15.828.41 5.276.62 10.603.62 15.983v53.224h-12.26zM2542.74 484.621c-6.42 0-12.32-1.19-17.69-3.569-5.38-2.38-10.09-5.793-14.13-10.242-3.93-4.551-7.03-10.086-9.31-16.603-2.17-6.621-3.25-14.069-3.25-22.345 0-8.172 1.13-15.517 3.41-22.034 2.28-6.518 5.43-12.052 9.47-16.604 4.03-4.552 8.79-8.017 14.27-10.396 5.48-2.483 11.48-3.724 18-3.724 6.21 0 11.64 1.293 16.29 3.879 4.76 2.483 8.64 5.379 11.64 8.689l-6.98 8.38c-2.69-2.897-5.74-5.224-9.16-6.983-3.41-1.759-7.29-2.638-11.63-2.638-4.87 0-9.26.983-13.19 2.948-3.93 1.862-7.3 4.604-10.09 8.225-2.79 3.517-4.97 7.81-6.52 12.879-1.45 5.069-2.17 10.758-2.17 17.069 0 6.414.72 12.207 2.17 17.379 1.55 5.069 3.68 9.414 6.37 13.035 2.68 3.62 5.94 6.413 9.77 8.379 3.93 1.965 8.33 2.948 13.19 2.948 4.97 0 9.31-.983 13.04-2.948 3.72-2.069 7.24-4.914 10.55-8.535l7.13 8.069c-4.03 4.656-8.58 8.276-13.65 10.862-5.07 2.587-10.91 3.88-17.53 3.88zM2597.56 482.759V380.966h58.65v10.862h-45.77v31.965h38.63v11.017h-38.63v36.931h47.32v11.018h-60.2zM2712.28 484.621c-7.14 0-13.76-1.345-19.86-4.035-6.1-2.689-11.38-6.362-15.83-11.017l7.76-9c3.62 3.828 7.86 6.931 12.72 9.31 4.97 2.276 10.09 3.414 15.37 3.414 6.72 0 11.95-1.5 15.67-4.5 3.72-3.103 5.59-7.138 5.59-12.103 0-2.586-.47-4.759-1.4-6.518-.83-1.862-2.02-3.413-3.57-4.655-1.45-1.345-3.21-2.534-5.28-3.569a390.38 390.38 0 00-6.67-3.258l-14.58-6.362c-2.38-1.035-4.81-2.276-7.3-3.724a30.186 30.186 0 01-6.67-5.276c-1.97-2.069-3.57-4.5-4.81-7.293-1.24-2.897-1.86-6.207-1.86-9.931 0-3.828.77-7.397 2.33-10.707a26.704 26.704 0 016.67-8.535c2.89-2.483 6.26-4.396 10.08-5.741 3.93-1.345 8.23-2.017 12.88-2.017 6.11 0 11.74 1.189 16.92 3.568 5.17 2.276 9.57 5.276 13.19 9l-6.99 8.38c-3.1-3-6.57-5.328-10.39-6.983-3.73-1.759-7.97-2.638-12.73-2.638-5.69 0-10.29 1.345-13.81 4.035-3.41 2.586-5.12 6.206-5.12 10.862 0 2.482.47 4.603 1.4 6.362 1.03 1.655 2.38 3.155 4.03 4.5a41.1 41.1 0 005.43 3.414c1.97.931 3.99 1.81 6.06 2.637l14.43 6.207a57.117 57.117 0 018.22 4.345c2.59 1.552 4.81 3.414 6.67 5.586 1.87 2.069 3.31 4.552 4.35 7.449 1.14 2.793 1.71 6.051 1.71 9.776 0 4.034-.83 7.81-2.49 11.327-1.55 3.517-3.83 6.621-6.83 9.31-3 2.587-6.62 4.656-10.86 6.207-4.24 1.449-9.05 2.173-14.43 2.173zM2123.93 298.415c-6.41 0-12.31-1.242-17.69-3.724-5.28-2.483-9.83-6-13.65-10.552-3.83-4.655-6.83-10.242-9-16.759-2.07-6.62-3.11-14.017-3.11-22.189 0-8.173 1.04-15.466 3.11-21.88 2.17-6.517 5.17-12 9-16.448 3.82-4.552 8.37-8.017 13.65-10.397 5.38-2.379 11.28-3.569 17.69-3.569 6.41 0 12.26 1.242 17.53 3.725 5.38 2.379 9.99 5.844 13.82 10.396 3.93 4.448 6.93 9.931 9 16.448 2.17 6.414 3.25 13.656 3.25 21.725 0 8.172-1.08 15.569-3.25 22.189-2.07 6.517-5.07 12.104-9 16.759-3.83 4.552-8.44 8.069-13.82 10.552-5.27 2.482-11.12 3.724-17.53 3.724zm0-11.328c4.55 0 8.64-.983 12.26-2.948 3.72-1.966 6.88-4.759 9.46-8.379 2.69-3.725 4.76-8.121 6.21-13.19 1.45-5.173 2.17-10.966 2.17-17.379 0-6.311-.72-12-2.17-17.069-1.45-5.069-3.52-9.362-6.21-12.88-2.58-3.517-5.74-6.207-9.46-8.069-3.62-1.965-7.71-2.948-12.26-2.948s-8.69.983-12.41 2.948c-3.62 1.862-6.78 4.552-9.47 8.069-2.59 3.518-4.6 7.811-6.05 12.88-1.45 5.069-2.17 10.758-2.17 17.069 0 6.413.72 12.206 2.17 17.379 1.45 5.069 3.46 9.465 6.05 13.19 2.69 3.62 5.85 6.413 9.47 8.379 3.72 1.965 7.86 2.948 12.41 2.948zM2194.08 296.553V194.76h58.65v10.862h-45.77v34.448h38.79v10.862h-38.79v45.621h-12.88zM2328.66 239.604l-4.81 15.518h30.57l-4.81-15.518a615.88 615.88 0 01-5.27-16.913c-1.66-5.69-3.31-11.483-4.97-17.38h-.62a672.339 672.339 0 01-4.81 17.38 583.59 583.59 0 01-5.28 16.913zm-31.03 56.949l34.45-101.793h14.58l34.45 101.793h-13.81l-9.62-31.035h-37.08l-9.78 31.035h-13.19zM2400.19 296.553V194.76h29.02c5.69 0 10.86.517 15.52 1.551 4.75 1.035 8.79 2.742 12.1 5.121 3.31 2.276 5.9 5.328 7.76 9.155 1.86 3.828 2.79 8.535 2.79 14.121 0 5.379-.93 10.034-2.79 13.965-1.76 3.931-4.3 7.19-7.61 9.776-3.31 2.586-7.29 4.552-11.94 5.897-4.56 1.241-9.63 1.862-15.21 1.862h-16.76v40.345h-12.88zm12.88-50.897h15.21c8.89 0 15.46-1.655 19.7-4.965 4.35-3.414 6.52-8.742 6.52-15.983 0-7.345-2.27-12.414-6.83-15.207-4.44-2.897-11.12-4.345-20.01-4.345h-14.59v40.5zM2492.74 296.553V194.76h29.01c5.69 0 10.87.517 15.52 1.551 4.76 1.035 8.79 2.742 12.1 5.121 3.31 2.276 5.9 5.328 7.76 9.155 1.87 3.828 2.8 8.535 2.8 14.121 0 5.379-.93 10.034-2.8 13.965-1.76 3.931-4.29 7.19-7.6 9.776-3.31 2.586-7.29 4.552-11.95 5.897-4.55 1.241-9.62 1.862-15.21 1.862h-16.75v40.345h-12.88zm12.88-50.897h15.2c8.9 0 15.47-1.655 19.71-4.965 4.34-3.414 6.52-8.742 6.52-15.983 0-7.345-2.28-12.414-6.83-15.207-4.45-2.897-11.12-4.345-20.02-4.345h-14.58v40.5zM2585.28 296.553V194.76h12.88v90.775h44.54v11.018h-57.42zM2665.4 296.553V194.76h12.88v101.793h-12.88zM2710.82 296.553V194.76h58.66v10.862h-45.78v31.965h38.64v11.017h-38.64v36.931h47.33v11.018h-60.21zM2797.3 296.553V194.76h25.45c15.73 0 27.68 4.344 35.85 13.034 8.17 8.69 12.26 21.155 12.26 37.397 0 8.069-1.04 15.31-3.11 21.724-2.07 6.31-5.12 11.689-9.15 16.138-4.04 4.344-9 7.707-14.9 10.086-5.9 2.276-12.67 3.414-20.33 3.414h-26.07zm12.88-10.552h11.64c11.9 0 20.8-3.569 26.69-10.707 6-7.138 9-17.172 9-30.103 0-12.931-3-22.811-9-29.638-5.89-6.828-14.79-10.242-26.69-10.242h-11.64v80.69z" />
        </svg>
    );
}
