const ARROW_KEYS = [37, 38, 39, 40];
const PAGE_KEYS = [33, 34];
const HOME_KEYS = [35, 36];

export default {
    ARROW_KEYS,
    PAGE_KEYS,
    HOME_KEYS,
    ALL_KEYS: [...ARROW_KEYS, ...PAGE_KEYS, ...HOME_KEYS]
};
