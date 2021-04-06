
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messgaeOne = document.querySelector('#message-1');
const messgaeTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value
    messgaeOne.textContent = 'Loading...';
    messgaeTwo.textContent = ''
    fetch(`http://localhost:3001/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messgaeOne.textContent = data.error
            } else {
                messgaeOne.textContent = data.location
                messgaeTwo.textContent = data.forecast
            }
        })
    })
})