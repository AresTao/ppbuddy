CREATE TABLE IF NOT EXISTS `post` (
    `postId`           VARCHAR(128)   NOT NULL          ,
    `title`            VARCHAR(128)   NOT NULL          ,
    `shortContent`     VARCHAR(128)   NOT NULL          ,
    `content`          VARCHAR(512)   NOT NULL          ,
    `createTime`       datetime       NOT NULL          ,
    `publishTime`      datetime                         ,
	`isPublish`        INT            default 0         ,
	`categoryId`       INT                              ,
	`level`            INT                              ,
	`bannerPath`       VARCHAR(128)                     ,
    `publisherName`    VARCHAR(512)                     ,
    PRIMARY KEY (`postId`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

CREATE TABLE IF NOT EXISTS `category` (
    `id`                                INT            AUTO_INCREMENT                        ,
	`name`                              VARCHAR(128)   NOT NULL                              ,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

CREATE TABLE IF NOT EXISTS `mimeFile` (
    `fileId`           INT            AUTO_INCREMENT    ,
    `name`             VARCHAR(128)   NOT NULL          ,
    `path`             VARCHAR(128)   NOT NULL          ,
    `createTime`       datetime       NOT NULL          ,
	`postId`           INT                              ,
    PRIMARY KEY (`fileId`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

CREATE TABLE IF NOT EXISTS `banner` (
    `bannerId`         INT            AUTO_INCREMENT    ,
    `name`             VARCHAR(128)   NOT NULL          ,
    `path`             VARCHAR(128)   NOT NULL          ,
    `createTime`       datetime       NOT NULL          ,
    PRIMARY KEY (`bannerId`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

CREATE TABLE IF NOT EXISTS `account` (
    `id`                 VARCHAR(128)   NOT NULL          ,
    `passwd`             VARCHAR(128)   NOT NULL          ,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;