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
