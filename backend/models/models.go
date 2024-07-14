package models

import "gorm.io/gorm"

type NotePost struct {
	gorm.Model
	Title       string `json:"title"`
	Author      string `json:"author"`
	Description string `json:"description"`
}

func Migrate(db *gorm.DB) {
	db.AutoMigrate(&NotePost{})
}
