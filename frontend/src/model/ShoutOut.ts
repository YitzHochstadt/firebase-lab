export default interface ShoutOut{
    _id?: string;
    to:string;
    from:string|undefined|null;
    message:string;
    profilePhoto?:string;
}