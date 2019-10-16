export class Bus{
constructor(
    private _name : string,
    private _color : string,
    private _icon : string){}

    get name() : string {
        return this._name;
    }

    get color() : string {
        return this._color;
    }

    get icon() : string {
        return this._icon;
    }
}