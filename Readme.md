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
https://www.npmjs.com/package/prisma-compositor

`npm i prisma-compositor --save-dev`

### Usage

my-app/  
├─ schemas/  
│  ├─ user.prisma  
│  ├─ commerce.prisma  
│  ├─ robots.prisma  
├─ src/  

`npx prisma-compositor ./schemas compiled-schema.prisma`