/// <reference types="cypress" />

describe("EcoWeather LIVE API - City Weather", () => {
  it("Loads real weather for a valid city and displays numeric values", () => {

    cy.visit("index.html");
    

    cy.get("#cityInput").clear().type("Berlin");
    cy.get("#searchBtn").click();
    

    cy.get("#cityStatus", { timeout: 20000 })
      .should("contain", "City weather loaded successfully.");
    

    cy.get("#cityResult").should("be.visible");
    

    cy.get("#cityTitle").should("contain", "Berlin");
    

    cy.get("#cityTemp")
      .invoke("text")
      .then((t) => t.trim())
      .should("match", /^-?\d+(\.\d+)?$/);
    

    cy.get("#cityHumidity")
      .invoke("text")
      .then((t) => t.trim())
      .should("match", /^\d+$/);
    

    cy.get("#cityWind")
      .invoke("text")
      .then((t) => t.trim())
      .should("match", /^-?\d+(\.\d+)?$/);
    
 
    cy.get("#cityCoords")
      .invoke("text")
      .then((t) => t.trim())
      .should("match", /^-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?$/);
  });
});
