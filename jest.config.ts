import type {Config} from '@jest/types';
    //sync object
    const config: Config.InitialOptions = {
        verbose: true,
        transform: {
            '^.+\\.tsx?$': 'ts-jest',
        },
    };
    export default config;