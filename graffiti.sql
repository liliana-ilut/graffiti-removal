Drop Table graffiti
CREATE TABLE graffiti (
index varchar not null primary key ,
creation_date date,
status  varchar not null,
completion_date date,
surface_type varchar not null,
graffiti_spot varchar not null,
address varchar not null,
zipcode varchar not null,
ward int,
police_district int,
community_area int,
latitude varchar not null,
longitude varchar not null,
location varchar not null);
select * from graffiti;