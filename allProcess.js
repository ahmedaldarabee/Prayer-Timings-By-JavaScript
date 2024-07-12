function timePlusDate(nameOFCity){
    let parameters = {
        country : "JO",
        city : nameOFCity
    }
    
    axios.get("http://api.aladhan.com/v1/timingsByCity",{
        params : parameters
    })
    
    .then( (response) => {
    
        const timing = response.data.data.timings;
    
        neededTime('duhar-id'  ,timing.Dhuhr)
        neededTime('asr-id'    ,timing.Asr)
        neededTime('maghrib-id',timing.Maghrib)
        neededTime('Isha-id'   ,timing.Isha)
        neededTime('fajr-id'   ,timing.Fajr)
    
        const currentDayTime = response.data.data.date.readable;
        document.getElementById("current-day").innerHTML = currentDayTime;
    
        const currentDay = response.data.data.date.hijri.weekday.en;
        document.getElementById("day-name").innerHTML = currentDay;
    
        // console.log(response.data.data.date.hijri.weekday.en)
    
    }).catch((errorMessage) => {
        console.log(errorMessage)
    })
}

function neededTime(name,timing){
    document.getElementById(name).innerHTML = timing;
}

function citiesProcess(){
    let arrCity = [
        {
            name : "Amman"
        },
        {
            name : "Balqa"
        },
        {
            name : "Irbid"
        },
        {
            name : "Jerash"
        },
        {
            name : "Karak"
        }
    ]
    let selectionParent =  document.getElementById('cities-options');
    
    for(city of arrCity){
        let content = ` <option> ${city.name} </option> `
        selectionParent.innerHTML += content; 
    }

    selectionParent.addEventListener("change",function(){
        let nameToTheCity = document.getElementById('city-name');
        let currentCityNeed = ""
            // this.value : represent the current selection option data ( المطلوب )
        for(city of arrCity){
            if(city.name == this.value){
                nameToTheCity.innerHTML = city.name;
                currentCityNeed = this.value;
            }
            // هان رح يعمل بحث عكل لعناصر اذا المطلوب هوا موجود ولا لا لحتى يخزنها ويروح يبحث عنها لقدام
        }
        timePlusDate(currentCityNeed)

    })

}

timePlusDate("Amman")/* Amman as a default value */
citiesProcess()