CREATE TABLE `cvAnalyses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`fileName` varchar(255) NOT NULL,
	`fileKey` varchar(255) NOT NULL,
	`fileUrl` varchar(500),
	`targetRole` varchar(100) NOT NULL,
	`personalInfo` text,
	`skills` text,
	`experience` text,
	`education` text,
	`certifications` text,
	`overallScore` int NOT NULL,
	`skillsScore` int NOT NULL,
	`experienceScore` int NOT NULL,
	`educationScore` int NOT NULL,
	`certificationsScore` int NOT NULL,
	`completenessScore` int NOT NULL,
	`matchedSkills` text,
	`missingSkills` text,
	`skillGapPercentage` int NOT NULL,
	`recommendations` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `cvAnalyses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `jobRoles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text,
	`requiredSkills` text,
	`preferredSkills` text,
	`experienceYearsRequired` int,
	`educationRequirement` varchar(100),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `jobRoles_id` PRIMARY KEY(`id`),
	CONSTRAINT `jobRoles_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
ALTER TABLE `cvAnalyses` ADD CONSTRAINT `cvAnalyses_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;