-- para docker hub
-- docker build -t iskandar1412/proyecto1_201906051:<tag>(local) .
-- docker tag iskandar1412/proyecto1_201906051:<tag>(local) iskandar1412/proyecto1_201906051:<tag>(repositorio)
-- docker push iskandar1412/proyecto1_201906051:<tag>(repo)

-- docker pull redis:latest
-- docker pull redislabs/redisinsight:latest
-- apt install docker-compose
-- netstat -tuln | grep 6379

CREATE DATABASE IF NOT EXISTS Practica1;
USE Practica1;

-- DROP TABLE IF EXISTS Notas;
-- DROP TABLE IF EXISTS Recordatorios;

-- Tabla Notas
CREATE TABLE IF NOT EXISTS Notas (
    NotaID INT NOT NULL AUTO_INCREMENT,
    Titulo VARCHAR(60) NOT NULL UNIQUE,
    Hora TIME NOT NULL,
    Fecha DATE NOT NULL,
    Pinned BOOLEAN DEFAULT FALSE,
    Archived BOOLEAN DEFAULT FALSE,
    Categoria VARCHAR(30) NOT NULL,
    PRIMARY KEY (NotaID)
);

-- Tabla Recordatorios
CREATE TABLE IF NOT EXISTS Recordatorios (
    RecordatorioID INT NOT NULL AUTO_INCREMENT,
    NotaID INT NOT NULL,
    Recordatorio VARCHAR(255) NOT NULL,
    PRIMARY KEY (RecordatorioID, NotaID),
    FOREIGN KEY (NotaID)
        REFERENCES Notas (NotaID)
);