CREATE TABLE IF NOT EXISTS `post` (
    `postId`           VARCHAR(128)   NOT NULL          ,
    `title`            VARCHAR(128)   NOT NULL          ,
    `shortContent`     VARCHAR(1024)   NOT NULL          ,
    `content`          VARCHAR(9192)   NOT NULL          ,
    `createTime`       datetime       NOT NULL          ,
    `publishTime`      datetime                         ,
	`isPublish`        INT            default 0         ,
	`categoryId`       INT                              ,
	`level`            INT                              ,
	`bannerPath`       VARCHAR(128)                     ,
    `publisherName`    VARCHAR(128)                     ,
    PRIMARY KEY (`postId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `category` (
    `id`                                INT            AUTO_INCREMENT                        ,
	`name`                              VARCHAR(128)   NOT NULL                              ,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `mimefile` (
    `fileId`           INT            AUTO_INCREMENT    ,
    `name`             VARCHAR(128)   NOT NULL          ,
    `path`             VARCHAR(128)   NOT NULL          ,
    `createTime`       datetime       NOT NULL          ,
	`postId`           VARCHAR(128)   NOT NULL          ,
    PRIMARY KEY (`fileId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `banner` (
    `bannerId`         INT            AUTO_INCREMENT    ,
    `name`             VARCHAR(128)   NOT NULL          ,
    `path`             VARCHAR(128)   NOT NULL          ,
    `createTime`       datetime       NOT NULL          ,
    PRIMARY KEY (`bannerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `account` (
    `id`                 VARCHAR(128)   NOT NULL          ,
    `passwd`             VARCHAR(128)   NOT NULL          ,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `img` (
    `imgId`             INT            AUTO_INCREMENT    ,
    `name`              VARCHAR(128)   NOT NULL          ,
    `path`              VARCHAR(128)   NOT NULL          ,
    `type`              INT            default 0         ,
    `createTime`        datetime       NOT NULL          ,
    `publishTime`       datetime       NOT NULL          ,
	`isPublish`         INT            default 0         ,
    PRIMARY KEY (`imgId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;