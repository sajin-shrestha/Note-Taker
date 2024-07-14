package main

import (
	"net/http"

	"github.com/sajin-shrestha/Note-Taker/config"
	"github.com/sajin-shrestha/Note-Taker/handlers"
	"github.com/sajin-shrestha/Note-Taker/models"
	"github.com/sajin-shrestha/Note-Taker/routes"
)

func main() {
	config.ConnectDB()

	models.Migrate(config.DB)

	handlers.Initialize(config.DB)

	r := routes.InitializeRoutes()
	http.ListenAndServe(":8000", r)
}
