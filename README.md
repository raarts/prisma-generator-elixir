# Prisma Generator Elixir Absinthe 

1. [What is it?](#what-is-it)
1. [Usage](#usage)
1. [Annotations](#annotations)
1. [Example](#example)
1. [Principles](#principles)
1. [License](#license)

## <a name="what-is-it"></a>What is it?

Generates `schema`, `resolvers`,  for models in your Prisma Schema. 

## <a name="usage"></a>Usage?

```sh
npm install --save-dev @raarts/prisma-generator-elixir absinthe
```

```prisma
generator elixirAbsinthe {
  provider                        = "prisma-generator-elixir-absinthe"
  output                          = "../hello/lib/hello_web"
  appname                         = "Hallo"
}
```

### Parameters

- [`output`]: (required) - output path relative to your `schema.prisma` file
- [`appname`]: (required) - Base name of the Elixir Application 


## <a name="example"></a>Example

<details>
  <summary>Prisma Schema</summary>
  
  ```prisma

generator elixirAbsinthe {
provider = "prisma-generator-elixir-absinthe"
output = "../src"
}

model Question {
id String @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
/// @DtoReadOnly
createdAt DateTime @default(now())
/// @DtoRelationRequired
createdBy User? @relation("CreatedQuestions", fields: [createdById], references: [id])
createdById String? @db.Uuid
updatedAt DateTime @updatedAt
/// @DtoRelationRequired
updatedBy User? @relation("UpdatedQuestions", fields: [updatedById], references: [id])
updatedById String? @db.Uuid

    /// @DtoRelationRequired
    /// @DtoRelationCanConnectOnCreate
    category   Category? @relation(fields: [categoryId], references: [id])
    categoryId String?   @db.Uuid

    /// @DtoCreateOptional
    /// @DtoRelationCanCreateOnCreate
    /// @DtoRelationCanConnectOnCreate
    /// @DtoRelationCanCreateOnUpdate
    /// @DtoRelationCanConnectOnUpdate
    tags Tag[]

    title     String
    content   String
    responses Response[]

}

````

</details>

<details>
<summary>Generated results</summary>

</details>

## <a name="license"></a>License

All files are released under the [Apache License 2.0](https://github.com/vegardit/prisma-generator-nestjs-dto/blob/master/LICENSE).
