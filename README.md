# phonebookwebapp

SQL FILE
create database phonebook;
use phonebook;
create table contacts(id int AUTO_INCREMENT PRIMARY KEY,name varchar(100) not null,dob varchar(100));
create table phone(id int, pnumber varchar(10) not null, foreign key(id) references contacts(id) on update cascade on delete cascade );
create table emails(id int, email varchar(100) not null, foreign key(id) references contacts(id) on update cascade on delete cascade );
alter table phone add unique(pnumber);


select c.id,c.name,c.dob, (select GROUP_CONCAT(DISTINCT pnumber separator';') from phone p where c.id=p.id group by id) as nos, (select GROUP_CONCAT(DISTINCT email separator';') from emails e where c.id=e.id group by id) as emails from contacts c;