use calendar;

CREATE TABLE groupList (
groupId INT UNIQUE PRIMARY KEY auto_increment NOT NULL,
groupName VARCHAR(50) NOT NULL,
leaderId INT NOT NULL,
groupLeader VARCHAR(25) NOT NULL,
numOfPeeps INT NOT NULL,
dateCreated DATETIME NOT NULL,
FOREIGN KEY (leaderId) REFERENCES users(user_Id)
);

CREATE TABlE users (
user_Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
first_Name VARCHAR(20) NOT NULL,
last_Name VARCHAR(20) NOT NULL,
user_Email VARCHAR(100) NOT NULL,
user_Password VARCHAR(20) NOT NULL
);

DROP TABLE test;
SHOW TABLES;



SELECT * FROM calendar.users;
SELECT * FROM calendar.groupList;
SELECT * FROM newgroup1;
DROP TABLE newgroup1;
TRUNCATE TABLE groupList;

SELECT groupId FROM groupList WHERE groupName = "newgroup5" AND leaderId = 10;

SELECT * FROM groupList;

DESCRIBE users;

SHOW TABLES;

INSERT INTO newgroup1(groupId, isGroupLeader, userId, userName) VALUES (1,1,1,"Zab");





