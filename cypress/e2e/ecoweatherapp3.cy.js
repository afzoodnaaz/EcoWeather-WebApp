 <reference types="cypress" />

describe("EcoWeather LIVE API - Habitat Weather", () => {
  it("Loads real weather for a selected habitat and displays numeric values", () => {
    cy.visit("index.html");

    
    cy.get("#habitatSelect")
      .find("option")
      .should("have.length.greaterThan", 5);


    cy.get("#habitatSelect").select("Nile River (Africa)");
    cy.get("#habitatBtn").click();

    
    cy.get("#habitatStatus", { timeout: 20000 })
      .should("contain", "Habitat weather loaded successfully.");

   
    cy.get("#habitatResult").should("be.visible");

    
    cy.get("#habitatTitle").should("contain", "Nile River (Africa)");

    
    cy.get("#habitatDesc").should("contain", "Description:");

    
    cy.get("#habTemp")
      .invoke("text")
      .then((t) => t.trim())
      .should("match", /^-?\d+(\.\d+)?$/);

    
    cy.get("#habHumidity")
      .invoke("text")
      .then((t) => t.trim())
      .should("match", /^\d+$/);

    
    cy.get("#habWind")
      .invoke("text")
      .then((t) => t.trim())
      .should("match", /^-?\d+(\.\d+)?$/);

    
    cy.get("#habCoords")
      .invoke("text")
      .then((t) => t.trim())
      .should("match", /^-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?$/);
  });
});
