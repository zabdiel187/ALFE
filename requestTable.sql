create table requests (
requestNum INT UNIQUE AUTO_INCREMENT NOT NULL,
dateOrdered VARCHAR(11) NOT NULL,
customerName VARCHAR(25) NOT NULL,
customerNumber VARCHAR(10) NOT NULL,
cart VARCHAR(200) NOT NULL,
subtotal LONG NOT NULL,
pickupDate VARCHAR(11),
paymentType VARCHAR(10) NOT NULL,

PRIMARY KEY (requestNum) 
);

