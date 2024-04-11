const BASE_URL = "https://api.apilayer.com/fixer";
const API_KEY = "lYXUkOo5H5aAqX75XB1uTwuPrWu10sPH";

fetch(`${BASE_URL}/SYMBOLS`,{
    headers: {
        apikey:API_KEY
    }
})
    .then(response => response.json())
    .then(({symbols}) => {
        const currencies = Object.keys(symbols);
        currencies.forEach(item => {
            const option = document.createElement('option');
            option.text = item;
            option.value = item;
            to.appendChild(option);
            // from.appendChild(option);
            from.appendChild(new Option(item,item));
        });

        calculate.onclick = function () {
            const currencyFrom = from.value.trim().toUpperCase();
            const currencyTo = to.value.trim().toUpperCase();
            fetch(`${BASE_URL}/convert?to=${currencyTo}&from=${currencyFrom}&amount=${sum.value}`,{
                headers: {
                    apikey: API_KEY
                }
            })
                .then(response => response.json())
                .then(data => {
                    if(!data.success){
                        throw new Error(`wrong data, info: ${data.error.info}`);
                    }
                    return data.result;
                })
                .then(res => {
                    const elementRes = createElement(`Result: ${res.toFixed(2)}`,'h1');
                    addResult(elementRes);
                })
                .catch(e => {
                    const elementError = createElement(`Error: ${e.message}`, 'h1');
                    addResult(elementError);
                })
        }
    })
    .catch(e => {
        const elementError = createElement(`Error: ${e.message}`, 'h1');
        addResult(elementError);
    })
function addResult(element) {
    if(result.firstElementChild){
        result.replaceChild(element, result.firstElementChild);
    }else{
        result.appendChild(element);
    }
}

function createElement(content, tag) {
    const element = document.createElement(tag);
    const text = document.createTextNode(content);
    element.appendChild(text);
    return element;
}