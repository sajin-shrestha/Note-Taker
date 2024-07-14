package routes

import (
	"github.com/gorilla/mux"
	"github.com/sajin-shrestha/Note-Taker/handlers"
	"github.com/sajin-shrestha/Note-Taker/middlewares"
)

func InitializeRoutes() *mux.Router {
	r := mux.NewRouter()

	r.Use(middlewares.CORS)

	r.HandleFunc("/post", handlers.CreateNote).Methods("POST")
	r.HandleFunc("/posts", handlers.GetNotes).Methods("GET")
	r.HandleFunc("/post/{id}", handlers.GetNoteByID).Methods("GET")
	r.HandleFunc("/post/{id}", handlers.UpdateNoteByID).Methods("PUT")
	r.HandleFunc("/post/{id}", handlers.DeleteNotesByID).Methods("DELETE")

	return r
}
