describe("Appointments", () => {
  //visit and reset before each tests
  beforeEach(() => {
    //reset the server db at the start
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
  });
  it("should book an interview", () => {
    //get the empty button and click it
    cy.get('[alt="Add"]').click();
    //type student name into the form
    cy.get('[placeholder="Enter Student Name"]').type("Lydia Miller-Jones");
    //select an interviewer
    cy.get('[alt="Sylvia Palmer"]').click();
    //save the interview form
    cy.contains("Save").click();
    //verify the student and interviewer is shown
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    //click the edit button for Archie Cohen
    cy.get('[alt="Edit"]').click({ force: true });
    //clear the input and type in new name
    cy.get('[placeholder="Enter Student Name"]').clear().type("Xihai Luo");
    //select tori malcolm as new interviewer
    cy.get('[alt="Tori Malcolm"]').click();
    //save the edit
    cy.contains("Save").click();
    //verify the new name and interviewer is shown
    cy.contains(".appointment__card--show", "Xihai Luo", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    //click the delete button for Archie
    cy.get('[alt="Delete"]').click({ force: true });
    //click confirm
    cy.contains("Confirm").click();
    //verify form is empty
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
});
