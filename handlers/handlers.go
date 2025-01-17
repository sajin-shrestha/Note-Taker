package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/sajin-shrestha/Note-Taker/models"
	"github.com/sajin-shrestha/Note-Taker/utils"
	"gorm.io/gorm"
)

var db *gorm.DB

func Initialize(database *gorm.DB) {
	db = database
}

// POST -> /notes
func CreateNote(w http.ResponseWriter, r *http.Request) {
	var note models.NotePost

	json.NewDecoder(r.Body).Decode(&note)

	db.Create(&note)

	utils.RespondJSON(w, http.StatusCreated, note)
}

// GET -> /notes
func GetNotes(w http.ResponseWriter, r *http.Request) {
	var posts []models.NotePost

	db.Find(&posts)

	utils.RespondJSON(w, http.StatusOK, posts)
}

// GET -> /notes/{id}
func GetNoteByID(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)

	id, _ := strconv.Atoi(params["id"])

	var notes models.NotePost
	db.First(&notes, id)
	if notes.ID == 0 {
		utils.RespondJSON(w, http.StatusNotFound, "User not found")
		return
	}

	utils.RespondJSON(w, http.StatusOK, notes)
}

// DELETE -> /note/{id}
func DeleteNotesByID(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)

	id, _ := strconv.Atoi(params["id"])

	var notes models.NotePost

	db.First(&notes, id)
	if notes.ID == 0 {
		utils.RespondJSON(w, http.StatusNotFound, "Post donot exists or has been already deleted")
		return
	}

	db.Delete(&notes)

	utils.RespondJSON(w, http.StatusOK, "Post deleted")
}

// PUT -> /notes/{id}
func UpdateNoteByID(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id, _ := strconv.Atoi(params["id"])

	var note models.NotePost
	db.First(&note, id)
	if note.ID == 0 {
		utils.RespondJSON(w, http.StatusNotFound, "Note not found")
		return
	}

	var updatedNote models.NotePost
	json.NewDecoder(r.Body).Decode(&updatedNote)

	note.Title = updatedNote.Title
	note.Author = updatedNote.Author
	note.Description = updatedNote.Description

	db.Save(&note)

	utils.RespondJSON(w, http.StatusOK, note)
}
