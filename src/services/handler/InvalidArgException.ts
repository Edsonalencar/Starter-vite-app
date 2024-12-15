import { AbstractException } from "./AbstractException"

export class InvalidArgException extends AbstractException {

    public errors : object = {}
  
    constructor(message? : string | undefined, errors? : object) {
      super(message)
      this.errors = errors? errors: {}
    }

    describe(): string {
      if (Object.keys(this.errors).length == 1) {
        return Object.values(this.errors)[0]
      }

      return this.message
    }

    errorArray() : any {
        return this.errors
    }
}