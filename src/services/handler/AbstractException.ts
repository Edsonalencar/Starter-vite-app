export class AbstractException extends Error {

    constructor(message? : string | undefined) {
        super(message)
    }

    describe() : string {
        return this.message
    }

    errorArray() : any {
        return null;
    }
 }