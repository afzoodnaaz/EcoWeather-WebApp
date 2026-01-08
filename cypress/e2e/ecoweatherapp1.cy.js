describe("EcoWeather App - City Weather", () => {

  it("Shows an error when city input is empty", () => {
    cy.visit("index.html");

    cy.get("#searchBtn").click();

    cy.contains("City name is required.");
  });

});
