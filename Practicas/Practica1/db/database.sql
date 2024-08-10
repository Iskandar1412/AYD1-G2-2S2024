
CREATE DATABASE IF NOT EXISTS PRACTICA1;
USE PRACTICA1;

-- Tabla Categorias
DROP TABLE IF EXISTS Categorias;

CREATE TABLE IF NOT EXISTS Categorias (
    CategoriaID INT NOT NULL AUTO_INCREMENT,
    Categoria VARCHAR(20) NOT NULL,
    PRIMARY KEY (CategoriaID),
    UNIQUE INDEX Categoria_UNIQUE (Categoria ASC) VISIBLE
);


-- Tabla Notas
DROP TABLE IF EXISTS Notas;

CREATE TABLE IF NOT EXISTS Notas (
    NotaID INT NOT NULL AUTO_INCREMENT,
    Titulo VARCHAR(60) NOT NULL,
    Hora TIME NOT NULL,
    Fecha DATE NOT NULL,
    Pinned TINYINT,
    CategoriaID INT NOT NULL,
    PRIMARY KEY (NotaID, CategoriaID),
    INDEX fk_Notas_Categorias_idx (CategoriaID ASC) VISIBLE,
    CONSTRAINT fk_Notas_Categorias
        FOREIGN KEY (CategoriaID)
        REFERENCES Categorias (CategoriaID)
);


-- Tabla Recordatorios
DROP TABLE IF EXISTS Recordatorios;

CREATE TABLE IF NOT EXISTS Recordatorios (
    RecordatorioID INT NOT NULL AUTO_INCREMENT,
    NotaID INT NOT NULL,
    CategoriaID INT NOT NULL,
    Recordatorio VARCHAR(255) NOT NULL,
    PRIMARY KEY (RecordatorioID, NotaID, CategoriaID),
    INDEX fk_Recordatorios_Notas1_idx (NotaID ASC, CategoriaID ASC) VISIBLE,
    CONSTRAINT fk_Recordatorios_Notas1
        FOREIGN KEY (NotaID , CategoriaID)
        REFERENCES Notas (NotaID , CategoriaID)
);