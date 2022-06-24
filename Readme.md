This simple CLI tool merges multiple prisma schema files from an input directory and allows you to use fragments 
by adding a preprocessing layer. 

```
fragment TimeStamps {
    updatedAt DateTime  @updatedAt
    createdAt DateTime  @default(now())
}

model User {
    id String @id @default(cuid())
    ...TimeStamps
}
```

### Installation

`npm i prisma-compositor --save-dev`

### Usage

`npx prisma-compositor ./schemas compiled-schema.prisma`