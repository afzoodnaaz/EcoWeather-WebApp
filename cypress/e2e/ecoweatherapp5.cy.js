/// <reference types="cypress" />

describe("EcoWeather - Errors", () => {
  beforeEach(() => {
    cy.visit("index.html");
  });

  it("disables the city button while loading and re-enables afterward", () => {
    
    cy.intercept("GET", "**/geocoding-api.open-meteo.com/**", (req) => {
      req.reply((res) => {
        res.delay = 1000;
        res.send({
          results: [
            { name: "Berlin", latitude: 52.52, longitude: 13.405, country: "DE" }
          ]
        });
      });
    }).as("geocode");

    cy.intercept("GET", "**/api.open-meteo.com/**", {
      body: {
        current: {
          temperature_2m: 10,
          relative_humidity_2m: 40,
          wind_speed_10m: 2
        }
      }
    }).as("weather");

    cy.get("#cityInput").type("Berlin");
    cy.get("#searchBtn").click();


    cy.get("#searchBtn").should("be.disabled");

    cy.wait("@geocode");
    cy.wait("@weather");


    cy.get("#searchBtn").should("not.be.disabled");
    cy.get("#cityStatus").should("contain", "loaded successfully");
  });

  it("Shows city error message if geocoding fails (network error)", () => {
    cy.intercept("GET", "**/geocoding-api.open-meteo.com/**", {
      forceNetworkError: true
    });

    cy.get("#cityInput").type("Berlin");
    cy.get("#searchBtn").click();

    cy.get("#cityStatus", { timeout: 10000 })
      .should("contain", "Error fetching city weather.");

    cy.get("#cityResult").should("not.be.visible");
  });

  it("Shows habitat error message if weather API fails", () => {
    cy.intercept("GET", "**/api.open-meteo.com/**", {
      forceNetworkError: true
    });

    cy.get("#habitatSelect").select("Nile River (Africa)");
    cy.get("#habitatBtn").click();

    cy.get("#habitatStatus", { timeout: 10000 })
      .should("contain", "Error fetching habitat weather.");

    cy.get("#habitatResult").should("not.be.visible");
  });

  it("clears previous city results when a new search begins", () => {

    cy.intercept("GET", "**/geocoding-api.open-meteo.com/**", {
      body: {
        results: [
          { name: "Berlin", latitude: 52.52, longitude: 13.405, country: "DE" }
        ]
      }
    });

    cy.intercept("GET", "**/api.open-meteo.com/**", {
      body: {
        current: {
          temperature_2m: 12,
          relative_humidity_2m: 55,
          wind_speed_10m: 3
        }
      }
    });

    cy.get("#cityInput").type("Berlin");
    cy.get("#searchBtn").click();
    cy.get("#cityResult").should("be.visible");


    cy.intercept("GET", "**/geocoding-api.open-meteo.com/**", {
      body: { results: [] }
    });

    cy.get("#cityInput").clear().type("zzzzzzzzzzzzzzzz");
    cy.get("#searchBtn").click();


    cy.get("#cityResult").should("not.be.visible");
    cy.get("#cityStatus", { timeout: 10000 }).should("contain", "City not found");
  });
});
