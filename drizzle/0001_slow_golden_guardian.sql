CREATE TABLE `grocery_lists` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`created_by_user_id` text(256) NOT NULL,
	`title` text(256) NOT NULL,
	`budget` real,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`created_by_user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
