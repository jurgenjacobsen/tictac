export interface App extends Window {
    api: API;
}

export interface API {
    getNTAC: () => Promise<any>;
}