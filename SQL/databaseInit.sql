CREATE TABLE Users (
    id INT PRIMARY KEY IDENTITY(1,1),
    user_guid UNIQUEIDENTIFIER NOT NULL,
    user_name NVARCHAR(50) UNIQUE NOT NULL,
    email NVARCHAR(100) UNIQUE NOT NULL,
    first_name NVARCHAR(50),
    last_name NVARCHAR(50),
    password_hash NVARCHAR(MAX) NOT NULL,
    refresh_token NVARCHAR(MAX),
    refresh_token_expiration DATETIME2,
    created_at DATETIME2 DEFAULT SYSDATETIME()
);

Create TABLE Orders (
    id INT PRIMARY KEY IDENTITY(1,1),
    user_id INT NOT NULL,
    order_date DATETIME2 DEFAULT SYSDATETIME(),
    status INT NOT NULL,
    total_amount DECIMAL(18, 2) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

Create TABLE OrderLines (
    id INT PRIMARY KEY IDENTITY(1,1),
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(18, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(id),
    FOREIGN KEY (product_id) REFERENCES Products(id)
);

Create TABLE Products (
    id INT PRIMARY KEY IDENTITY(1,1),
    name NVARCHAR(100) NOT NULL,
    description NVARCHAR(MAX),
    price DECIMAL(18, 2) NOT NULL,
    sku NVARCHAR(100) UNIQUE NOT NULL,
    stock INT NOT NULL,
    desired_stock INT NOT NULL,
    minimum_stock INT NOT NULL,
    status INT NOT NULL,
    is_enabled BIT NOT NULL DEFAULT 1,
    created_at DATETIME2 DEFAULT SYSDATETIME(),
    FOREIGN KEY (sku) REFERENCES SupplyerProducts(sku)
);

Create TABLE RefillOrders (
    id INT PRIMARY KEY IDENTITY(1,1),
    order_date DATETIME2 DEFAULT SYSDATETIME(),
    status INT NOT NULL,
    order_total DECIMAL(18, 2) NOT NULL
);

Create TABLE RefillOrderLines (
    id INT PRIMARY KEY IDENTITY(1,1),
    refill_order_id INT NOT NULL,
    sku NVARCHAR(100) UNIQUE NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(18, 2) NOT NULL,
    unit_by_crate INT NOT NULL,
    FOREIGN KEY (refill_order_id) REFERENCES RefillOrders(id),
    FOREIGN KEY (sku) REFERENCES SupplyerProducts(sku)
);

Create Table SupplyerProducts (
    id INT PRIMARY KEY IDENTITY(1,1),
    name NVARCHAR(100) NOT NULL,
    price DECIMAL(18, 2) NOT NULL,
    unit_by_crate INT NOT NULL,
    sku NVARCHAR(100) UNIQUE NOT NULL,
    stock INT NOT NULL,
    status INT NOT NULL,
    is_enabled BIT NOT NULL DEFAULT 1,
    creation_date DATETIME2 DEFAULT SYSDATETIME()
);