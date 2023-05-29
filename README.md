In the project directory, you can run:

### `npm install`
### `npm start`


# Greystone Labs Frontend Code Challenge

Start a new private GitHub repo for this project. Part of this assessment includes your usage of git.

In this challenge, you will create a frontend for a [Loan Amortization](https://www.investopedia.com/terms/a/amortization.asp) app against our provided API spec. The purpose of the app is for a user to calculate and view their [loan amortization schedule](https://www.investopedia.com/thmb/FE1dtCb5tV4xsLYQ_a-KDqn-lzM=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/dotdash_Final_Amortized_Loan_Oct_2020-01-3a606fa9285943098248ac92e8d03b40.jpg), as well as some summarizing figures. 

## The Nouns

****User:**** Users have loans that they would like to view the schedule of payments and amortization for. Users may also want to share these results with other users.

**********Loan:********** This exercise (and the API endpoint), assume all loans are fully amortizing with interest accruing on a 30/360 schedule. Every loan has an initial principal balance, an interest rate and an amortization term. With those inputs, the API can return a table representing the monthly payments from start to end.

## The Verbs

**************Create a User**************

**Create a Loan**

**********************************************Fetch all User’s Loans**********************************************

**Fetch the amortization term for a Loan**

************************Share a Loan with another User************************

## The Challenge

Craft a frontend, with React, that allows a user to perform all of the actions listed in **The Verbs**. 

This will require taking user input, communicating with an API, parsing the API results and displaying the information to the user.

At a minimum, a user should be able to view all of their saved loans, the amortization schedule for each, as well as be able to see a summary of the remaining balance and total principal/interest paid given a specific period (or date). 

The API is hosted here:

[https://lending-api.azurewebsites.net](https://lending-api.azurewebsites.net/)

and interactive API docs are available here:

https://lending-api.azurewebsites.net/docs

## **********************The Scoring**********************

********Core********

- The app should be able to perform all of the above actions.
- The forms should be clear and simple for a user to complete.
- React components should be well structured and properly manage state.

**********Extra**********

- Form validation
- Proper error handling
- Good style (using a component library is totally fine)
- State & component testing

When you are finished, please add `odandia` and `atranchida` as collaborators and submit your response here:

[Repo Submission](https://docs.google.com/forms/d/1KI8GQ3NpPT2qYyKE2DEo9L4JMCI-xuDN5uTdsqTc-2k/viewform)

We appreciate you taking the time to complete this challenge.

Thank you.