let userData = {
    'USD': 1000,
    'EUR': 900,
    'UAH': 15000,
    'BIF': 20000,
    'AOA': 100
},

bankData = {
    'USD': {
        max: 3000,
        min: 100,
        img: '💵'
    },
    'EUR': {
        max: 1000,
        min: 50,
        img: '💶'
    },
    'UAH': {
        max: 0,
        min: 0,
        img: '💴'
    },
    'GBP': {
        max: 10000,
        min: 100,
        img: '💷'
    }
}

function bank (){

    return new Promise (
        function(resolve, reject){
            check = confirm('Посмотреть баланс на карте?','');

            check ? resolve() : reject()
        }
    )
}

bank()
    .then(
        function (){
            do{
                nemeCash = prompt('Введите название валюты(USD/EUR/UAH/BIF/AOA)','UAH');
            }while(nemeCash !== "USD" && nemeCash !== "EUR" && nemeCash !== "UAH" && nemeCash !== "BIF" && nemeCash !=="AOA")
            let checkBalanse = '';
            for(let key in userData){
                if(key === nemeCash){
                    checkBalanse = userData[key];
                }
            }
            console.log(`Баланс составляет ${checkBalanse} ${nemeCash}`)
        }

    )
    .catch(
        function(){
            do{
                nemeCash = prompt('Введите название валюты для снятия средств (USD/EUR/UAH/GBP)','USD');
            }while(nemeCash !== "USD" && nemeCash !== "EUR" && nemeCash !== "UAH" && nemeCash !== "GBP")

            let yourCash = '';

            for(let key in userData){
                if(key === nemeCash){
                    yourCash = userData[key]
                }
            }
            if(!yourCash){
                yourCash = 0;
            }

            let cashMinMax = '';
            for(let key in bankData) {
                if(key === nemeCash){
                    cashMinMax = bankData[key]
                }
            }

            let amount = +prompt(`Введите ссумму которую хотите снять (на вашем счету ${yourCash} ${nemeCash}, минимальная сумма${cashMinMax.min}, максимальная ${cashMinMax.max})`)
            
            if(amount){
               function finCheck(num){
                    return new Promise(function(resolve, reject){
                        num > cashMinMax.max || num < cashMinMax.min ? resolve(amount) : reject(amount)
                    })
                }

                finCheck(amount)
                    .then(
                        function(num){
                            num < cashMinMax.min ? console.log(`Введенная сумма меньше допустимой. Минимальная сумма снятия: ${cashMinMax.min}`) : console.log(`Введенная сумма больше допустимой. Максимальная сумма снятия: ${cashMinMax.max}`)
                        },
                        function(num){
                            num < yourCash ? console.log(`Вот Ваши денежки ${amount} ${cashMinMax.img}`) : console.log(`Введенная сумма больше чем у вас на карте. На вашем счету: ${yourCash}`)
                        }
                    )
            } else{
                console.log(`Введите коректное число`)
            }
        }
    )
    .finally(()=> console.log('Спасибо хорошего дня:)'))