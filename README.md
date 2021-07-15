# PhoneBookWebAppBackend
Add, update, search contacts

# TechStack
- NodeJs
- Mysql

# To run server
- Clone and cd Repo
- Create a copy of database locally and configure mysql by putting credentials in config/database.js file
- run command `npm start`

# To import database using database.sql dump file
mysql -u username -p database_name < database.sql

# SQL commands to make database locally
- create database phonebook;
- use phonebook;
- create table contacts(id varchar(200) PRIMARY KEY,name varchar(100) not null,dob varchar(100));

- create table phone(id varchar(200), pnumber varchar(10) not null unique, foreign key(id) references contacts(id) on update cascade on delete cascade );

- create table emails(id varchar(200), email varchar(100) not null, foreign key(id) references contacts(id) on update cascade on delete cascade );

- Command to search data
select c.id,c.name,c.dob, (select GROUP_CONCAT(DISTINCT pnumber separator';') from phone p where c.id=p.id group by id) as nos, (select GROUP_CONCAT(DISTINCT email separator';') from emails e where c.id=e.id group by id) as emails from contacts c;

# Documentation URL
API Docs=>[https://documenter.getpostman.com/view/11265641/TzmBCDQy](https://documenter.getpostman.com/view/11265641/TzmBCDQy)
