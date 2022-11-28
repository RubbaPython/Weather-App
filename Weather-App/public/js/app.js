const form = document.querySelector('form');
const input = document.querySelector('input');
const messageOne = document.querySelector('#messageOne');
const messageTwo = document.querySelector('#messageTwo');
const img = document.querySelector('.img');



form.addEventListener('submit', e => {
  e.preventDefault();
  const location = input.value;

  fetch(`/weather?address=${location}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        messageOne.textContent = '';
        messageTwo.textContent = '';
        img.classList.replace('messageIcon', 'img')
        messageOne.append(data.error)
      }
      else {


        messageOne.textContent = '';
        messageTwo.textContent = '';

        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;

        img.classList.replace('img', 'messageIcon')
        img.src = data.icon;

        input.value = '';
      }
    })
})




