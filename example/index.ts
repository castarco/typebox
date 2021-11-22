import { TypeBuilder, TSchema, Static, CustomOptions } from '@sinclair/typebox'

// -----------------------------------------------------------
// Open API Extended Types
// -----------------------------------------------------------

export type TNullable<T extends TSchema> = Omit<T, '$schema'> & {
    $static: Static<T> | null
} & { nullable: true } & CustomOptions

export type TStringUnion<T extends string[]> = TSchema & {
    $static: {[K in keyof T]: T[K] }[number]
    enum: T
} & CustomOptions

// -----------------------------------------------------------
// Open API TypeBuilder
// -----------------------------------------------------------

export class OpenApiTypeBuilder extends TypeBuilder {

    public Nullable<T extends TSchema>(schema: T, options: CustomOptions = {}): TNullable<T> {
        return { ...options, ...schema, nullable: true } as any
    }

    public StringUnion<T extends string[]>(values: [...T], options: CustomOptions = {}): TStringUnion<T> {
        return { ...options, enum: values } as any
    }
}

const Type = new OpenApiTypeBuilder()

// -----------------------------------------------------------
// Example
// -----------------------------------------------------------

const A = Type.StringUnion(['A', 'B', 'C'])

const B = Type.Nullable(Type.String())

type A = Static<typeof A>

type B = Static<typeof B>

console.log(A)
console.log(B)
