/*Drop Table graffiti*/
CREATE TABLE graffiti (
index  varchar not null,
creation_date  varchar not null,
status  varchar not null,
completion_date varchar not null,
surface_type varchar not null,
graffiti_spot varchar not null,
address varchar not null,
zipcode varchar not null,
ward varchar not null,
police_district varchar not null,
community_area varchar not null,
latitude varchar not null,
longitude varchar not null,
location varchar not null);
select * from graffiti;