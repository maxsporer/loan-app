# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

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