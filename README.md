# PhoneBookWebAppBackend
Add, update, search contacts
### In this project operations user can do :-

Add a contact 

Remove the contact 

Update the contact 

#### Search contact 

 -> By name (partial name can also be searched)

->  By phone number

->  By email 

->  Search results should be sorted alphabetically (by name).


### Contact :-

-> Will have a Name (required) - 

-> Will/Can have multiple phone numbers (should have at least 1 phone number) 

-> Will/Can have multiple emails 

-> Will/Can have single Date of birth (not mandatory)


### Constraints :

-> Two contacts cannot have same phone numbers 

-> Two contacts can have the same emails.

# TechStack
- NodeJs
- Mysql

# To run server
- Clone and cd Repo
- Create a copy of database locally and configure mysql by putting credentials in config/database.js file
- run command `npm start`

# To import database using database.sql dump file
- run command `mysql -u username -p database_name < database.sql`

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
