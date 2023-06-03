import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const [cities, setCities] = useState("");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCityChange = (event) => {
    setCities(event.target.value);
  };

  const handleGetWeather = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("https://purpledeterminedequipment.tathagatmaitra1.repl.co/getWeather", {
        cities: cities.split(","),
      });
      setWeather(response.data.weather);
    } catch (error) {
      setError("An error occurred while fetching the weather data.");
    }

    setLoading(false);
  };

  return (
    <Container className="app-container">
      <h1 className="app-title">Weather App</h1>
      <Form className="app-form">
        <Form.Group controlId="cityInput">
          <Form.Label>Enter city names separated by commas</Form.Label>
          <Form.Control
            type="text"
            value={cities}
            onChange={handleCityChange}
            disabled={loading}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleGetWeather} disabled={loading}>
          Get Weather
        </Button>
      </Form>
      <h3 className="results-title">Weather Results:</h3>
      {loading && <p>Loading...</p>}
      {error && <Alert variant="danger">{error}</Alert>}
      {Object.keys(weather).length > 0 && (
        <div className="weather-results">
          {Object.entries(weather).map(([city, temperature]) => (
            <Card className="weather-card" key={city}>
              <Card.Body>
                <Card.Title>{city}</Card.Title>
                <Card.Text>{temperature}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
      <h1 className="app-title-ii">Made by Tathagat Maitray</h1>
    </Container>
  );
};

export default App;
