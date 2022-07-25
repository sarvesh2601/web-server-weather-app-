
const SearchButton = document.querySelector('form');
const inputValue = document.querySelector('input')
const message1 = document.querySelector('#Message-1')
const message2 = document.querySelector('#Message-2')

SearchButton.addEventListener('submit', (e)=>{

    e.preventDefault();
    
    const location = inputValue.value
    message1.textContent = 'Loading Forecast..'
    message2.textContent = ''
    const url = 'http://localhost:3000/Weather?address=' + encodeURIComponent(location)
    fetch(url).then((response)=>{
        response.json().then((data) =>{
           if(data.error){
            message1.textContent = '';
            message2.textContent = 'Could not find the Address!';
           }else{
            message1.textContent = data.Location 
            message2.textContent = 'Temperature is ' + data.Temperature + ' degree celcius.' + ' It feels like ' + data.FeelLike + ' degree celcius' + '. Wind speed is currently ' + data.WindSpeed + 'km/h' + '. The Chance of rain is ' + data.ChanceOfRain + '%.' ;
           }
        })
    })

    
})