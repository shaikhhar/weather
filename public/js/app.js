const searchForm = document.querySelector('form')
const searchInput = document.querySelector('input')

const message1 = document.querySelector('#message1')
const temperature = document.querySelector('#temperature')
const address = document.querySelector('#location')
const weather = document.querySelector('#weather')

getWeather =(location)=>{fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
    // if(error){
    //     console.log(error)
    //     message1.textContent=error.error
    // }
    response.json().then(data=>{
        console.log(data)
        if(!data || !data.location){
            message1.textContent = 'Unable to find location'
        }
        else if(data.error){
            console.log('error ')
            message1.textContent=data.error;
        }else{
            message1.textContent = ''
            address.textContent = data.location
            temperature.textContent = 'min: '+data.forecast.temp_min+'  max:'+data.forecast.temp_max
            weather.textContent = data.description
        }
       
    })
})}


searchForm.addEventListener('submit', (ev)=>{
    ev.preventDefault()
    address.textContent = '';
    temperature.textContent = '';
    weather.textContent = '';
    message1.textContent = 'loading ...'
    const location = searchInput.value
    getWeather(location)
   
})