# CC16 project CRUD API MVP

This was created during my time as a student at Code Chrysalis,
under the instruction ath the very bottom.

## Mountains API

This API enebles you to CRUD (create, read, update and delete) mountain data.

There are 2 tables, mountain and area.

Mountain table has id, name, elevation, coordinates and area.

Example -->
6 | Aconcagua | 6960 | -32.653179, -70.010864 | Andes

Area table has id and name

Example -->
1 | Andes

Here are the methods you can use.

- mountains --- get all the maountains
- mountainByName --- get 1 mountain matching the input name
- mountainByArea --- mountains matching the input area name
- mountainsByElevationMoreThan --- get mountains whose elevation is higher the input number
- createMountain --- insert a mountain with name, elevation, coordinates and area name
- updateMountain --- update a mountain matching the input name
- deleteMountain --- delete a mountain matching the input name
- areas --- get all the areas from area table

Mountain and area table are supposed be connected using foreign key, but still under construction.
And it's not on service and not accessibe via web.
You can use GrappfQL Playground as UI for now (https://www.apollographql.com/docs/apollo-server/testing/graphql-playground/)

- Technologies

  TypeGraphQL, Apollo server, Express, NodeJS, TypeORM, postgres
