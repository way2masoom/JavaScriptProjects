// secltors 
const buttons = document.querySelectorAll('.button');
const body = document.querySelector('body');

// loop through all buttons
buttons.forEach(function (button) {
    console.log(button);
    button.addEventListener('click', function (e) {
        console.log(e);
        console.log(e.target);

        // condition to check the colors
        if (e.target.id === 'grey') {
            body.style.backgroundColor = e.target.id;
        }
        if (e.target.id === 'white') {
            body.style.backgroundColor = e.target.id;
        }
        if (e.target.id === 'blue') {
            body.style.backgroundColor = 'blue'
        }
        if (e.target.id === 'yellow') {
            body.style.backgroundColor = 'yellow'
        }
        if (e.target.id === 'green') {
            body.style.backgroundColor = e.target.id;
        }

        if (e.target.id === 'red') {
            body.style.backgroundColor = e.target.id
        }

    })
})


// Another way
// loop through buttons
buttons.forEach(function (button) {
    // add click event on every button
    button.addEventListener('click', function (e) {
        // change body background color
        body.style.backgroundColor = e.target.id;

    });

});
