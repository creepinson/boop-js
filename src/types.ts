export class Action {
    id: string;
    name?: string;
    description?: string;
    author?: string;
    icon?: string;
    tags?: string[];
    main: (state: State) => Promise<void>;
}

export class State {
    text: string;
    selection: string;
    args: any[];
    debug: boolean;
}
