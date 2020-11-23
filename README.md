# CC16 project API MVP

This was created during my time as a student at Code Chrysalis,
under the instruction ath the very bottom.

## Mountains API

This API enebles you to CRUD (create, read, update and delete) mountain data.

There are 2 tables, mountain and area.
Mountain table has id, name, elevation, coordinates and areaId
Example --> 6 | Aconcagua | 6960 | -32.653179, -70.010864 | 1

Area table has id and name
Example --> 1 | Andes

These are supposed be connected using foreign key, but still under construction.
And it's not on service and not accessibe via web.

- Technologies
  TypeGraphQL, Express server, Apollo server, TypeORM, postgres
