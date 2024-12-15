import { AbstractException } from "./AbstractException";

export class UnauthorizedException extends AbstractException {
  
    constructor(message? : string | undefined) {
      super(message)
    }

    describe(): string {
        return this.message
    }

    errorArray () : any {
        return null
    }
}