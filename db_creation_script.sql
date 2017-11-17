CREATE TABLE IF NOT EXISTS type_enum(
    id INT PRIMARY Key AUTO_INCREMENT,
    data VARCHAR(255) NOT NULL UNIQUE
    )

INSERT INTO type_enum(data) 
VALUES('Invoice'), ('General Journal'), ('Credit Memo')

CREATE TABLE IF NOT EXISTS class_enum(
    id INT PRIMARY KEY AUTO_INCREMENT,
    data VARCHAR(255) NOT NULL UNIQUE
    )

INSERT INTO class_enum(data) 
VALUES('E-Bus'), ('Informatica'), ('JDE'), ('MAX'), ('Mobile'), ('SAP')

CREATE TABLE IF NOT EXISTS subscription_enum(
    id INT PRIMARY KEY AUTO_INCREMENT,
    data VARCHAR(255) NOT NULL UNIQUE
    )
INSERT INTO subscription_enum(data) 
VALUES('New'), ('Renewel')

CREATE TABLE IF NOT EXISTS status_enum(
    id INT PRIMARY KEY AUTO_INCREMENT,
    data VARCHAR(255) NOT NULL UNIQUE
    )
INSERT INTO status_enum(data) 
VALUES('Open'), ('Implemented'), ("Cancelled")

CREATE TABLE IF NOT EXISTS currency_enum(
    id INT PRIMARY KEY AUTO_INCREMENT,
    data VARCHAR(255) NOT NULL UNIQUE,
    )
INSERT INTO currency_enum(data) 
VALUES('USD'), ('CAD'), ('AUD'), ('GBP')

CREATE TABLE IF NOT EXISTS revenue_type_enum(
    id INT PRIMARY KEY AUTO_INCREMENT,
    data VARCHAR(255) NOT NULL UNIQUE
    )
INSERT INTO revenue_type_enum(data) 
VALUES('SAAS'), ('Annual Support'), ('License'), ('Consulting'), ('Hosted'), ('Other')

CREATE TABLE IF NOT EXISTS product_enum(
    id INT PRIMARY KEY AUTO_INCREMENT,
    data VARCHAR(255) NOT NULL UNIQUE
    )

CREATE TABLE IF NOT EXISTS month_enum(
    id INT PRIMARY KEY,
    data VARCHAR(255) NOT NULL UNIQUE
    )
INSERT INTO month_enum(id, data) 
VALUES(1, 'Jan'), (2,'Feb'), (3, 'Mar'), (4, 'Apr'), (5, 'May'), (6, 'Jun'),(7, 'Jul'),(8, 'Aug'), (9, 'Sep'), (10, 'Oct'), (11, 'Nov'), (12, 'Dec')


CREATE TABLE invoice(
    id INT PRIMARY KEY AUTO_INCREMENT,
    type INT,
    customerName VARCHAR(255) NOT NULL,
    product INT NOT NULL,
    class INT NOT NULL,
    invoiceNumber INT NOT NULL,
    invoiceAmount DECIMAL(10,2) NOT NULL,
    invoiceDate DATE NOT NULL,
    comments VARCHAR(255),
    description VARCHAR(255),
    subscriptionType INT NOT NULL,
    billingMonth INT NOT NULL,
    status INT NOT NULL,
    recognitionStartMonth INT NOT NULL,
    lengthMonth SMALLINT UNSIGNED NOT NULL,
    currency INT NOT NULL,
    FXRate DECIMAL(10,2) NOT NULL DEFAULT 1,
    revenueType INT NOT NULL,
    cancellationDate DATETIME,
    annualIncreaseEli BIT NOT NULL DEFAULT 0,
    dateLastIncrease DATE,
    increasePercentage DECIMAL(10,2) DEFAULT 0,
    invoiceAmountUSD DECIMAL(10,2) NOT NULL,
    MonthlyRecoginitionAmountUSD DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (revenueType)
    	REFERENCES revenue_type_enum(id),
    FOREIGN KEY (currency)
    	REFERENCES currency_enum(id),
    FOREIGN KEY(billingMonth)
    	REFERENCES month_enum(id),
    FOREIGN KEY (recognitionStartMonth)
    	REFERENCES month_enum(id),
    FOREIGN KEY (status)
    	REFERENCES status_enum(id),
    FOREIGN KEY (subscriptionType)
    	REFERENCES subscription_enum(id),
    FOREIGN KEY (class)
    	REFERENCES class_enum(id),
    FOREIGN KEY (product)
    	REFERENCES product_enum(id),
    FOREIGN KEY (type)
    	REFERENCES type_enum(id)
    )


INSERT INTO product_enum(data) 
VALUES("Civic"), ("Accord"), ("Corrola"),("Model S")
