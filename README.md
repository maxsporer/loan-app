## To start app, in the project directory, run:

`npm install`<br>
`npm start`

## Packages

[axios](https://axios-http.com/)<br>
[react-select](https://react-select.com/home)<br>
[material-react-table](https://www.material-react-table.com/)<br>
[sass](https://sass-lang.com/)<br>
[tailwind](https://tailwindcss.com/)<br>

## Potential Improvements
For pages with dropdown, wait to render dropdown until API has successfully sent data that fills dropdown. If user clicks dropdown too quickly, "no options" will appear because data hasn't loaded yet.<br><br>
HTML code that creates the 5 forms in the application are a bit repititve. Would be better to turn the layout of forms into a component whose inner elements are arguments.<br><br>
Forms are setup such that user cannot make a request with invalid arguments e.g. sharing a loan that an owner does not own. I've encountered network errors that result from valid requests. Ideally a message would display to users noting that the server is non-responsive.<br><br>
Component testing.