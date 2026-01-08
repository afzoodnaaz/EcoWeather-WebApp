/// <reference types="cypress" />

describe("EcoWeather UI", () => {
  beforeEach(() => {
    cy.visit("index.html");
  });

  it("Renders the main headings and both weather panels", () => {
    cy.contains("EcoWeather Web App").should("be.visible");
    cy.contains("City Weather").should("be.visible");
    cy.contains("Crocodile Habitat Weather").should("be.visible");
  });

  it("has required city form elements", () => {
    cy.get("#cityForm").should("exist");
    cy.get("#cityInput").should("exist").and("have.attr", "type", "text");
    cy.get("#searchBtn").should("exist").and("contain", "Get Weather");
    cy.get("#cityStatus").should("exist");
    cy.get("#cityResult").should("exist").and("have.attr", "hidden");
  });

  it("has required habitat form elements and dropdown is populated", () => {
    cy.get("#habitatForm").should("exist");
    cy.get("#habitatSelect").should("exist");
    cy.get("#habitatBtn").should("exist").and("contain", "Get Habitat Weather");
    cy.get("#habitatStatus").should("exist");
    cy.get("#habitatResult").should("exist").and("have.attr", "hidden");


    cy.get("#habitatSelect").find("option").should("have.length.greaterThan", 5);
    cy.get("#habitatSelect").contains("Nile River").should("exist");
  });

  it("shows no results by default (clean initial state)", () => {
    cy.get("#cityResult").should("not.be.visible");
    cy.get("#habitatResult").should("not.be.visible");

    cy.get("#cityStatus").invoke("text").then((t) => {
      expect(t.trim()).to.eq("");
    });
    cy.get("#habitatStatus").invoke("text").then((t) => {
      expect(t.trim()).to.eq("");
    });
  });
});
