
export class Product {
    constructor(public readonly name: string, public readonly quantity: number) {}
}

export class Order {
    constructor(public readonly products: Product[], public readonly timestamp: Date) {}
}