export class TinyUrl {
    constructor(
        public id:string,
        public longUrl: string,
        public shortUrl: string,
        public urlCode: string,
        public date: Date
    ) { }
}