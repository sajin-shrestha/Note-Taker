package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/sajin-shrestha/Note-Taker/config"
	"github.com/sajin-shrestha/Note-Taker/handlers"
	"github.com/sajin-shrestha/Note-Taker/models"
	"github.com/sajin-shrestha/Note-Taker/routes"
)

func main() {
	// Connect to the database
	config.ConnectDB()

	// Migrate models
	models.Migrate(config.DB)

	// Initialize handlers with DB connection
	handlers.Initialize(config.DB)

	// Initialize routes
	r := routes.InitializeRoutes()

	// Get the port number from the PORT environment variable
	port := os.Getenv("PORT")
	if port == "" {
		log.Fatal("$PORT must be set")
	}

	// Start the server
	addr := fmt.Sprintf("0.0.0.0:%s", port)
	fmt.Printf("Starting server on %s...\n", addr)
	log.Fatal(http.ListenAndServe(addr, r))
}
