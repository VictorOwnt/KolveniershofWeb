export class Activity {
    constructor(
        private _name: string,
        private _icon: string
    ) {}

    get name(): string {
        return this._name;
    }
    get icon(): string {
        return this._icon;
    }
    set name(description: string) {
        this._name = description;
    }
}
