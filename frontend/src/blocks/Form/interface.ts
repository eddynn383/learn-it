export interface IPropsForm {
    classes: Array<string>;
    style?: Object | undefined;
    onSubmit?: (e:any) => void;
    children: any;
}