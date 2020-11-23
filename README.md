# CC16 project API MVP

This was created during my time as a student at Code Chrysalis,
under the instruction ath the very bottom.

## Mountains API

This API enebles you to CRUD (create, read, update and delete) mountain data.

There are 2 tables, mountain and area.
Mountain table has id, name, elevation, coordinates and areaId
id | name | elevation | coordinates | areaId
----+-----------+-----------+-------------------------------+--------
6 | Aconcagua | 6960 | -32.653179, -70.010864 | 1
7 | K2 | 8611 | 35.8799875, 76.51510009999993 | 2

Area table has id and name
id | name
----+-----------
1 | Andes
2 | Himalayas

These are supposed be connected using foreign key, but still under construction.
And it's not on service and not accessibe via web.

- Technologies
  TypeGraphQL, Express server, Apollo server, TypeORM, postgres
