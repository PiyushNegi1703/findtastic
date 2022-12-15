function getRandomDish(){
    axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
    .then((resp) => {
        console.log(resp)
        document.getElementById('random-dish').innerHTML = `
        <div>
            <img src="${resp.data.meals[0].strMealThumb}" alt="">
        </div>

        <div>
            <h1>${resp.data.meals[0].strMeal}</h1>
        </div>
        `
    })
}

getRandomDish();

function getDishByCategory(){
    var inputValue = document.getElementById('search-category').value

    axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${inputValue}`).then((resp) => {
        var dishByCategory = document.getElementById('dish-by-category')
        console.log(resp)
        data = ''

        resp.data.meals.forEach((e) => {
            data += `
            <div>
                <img src="${e.strMealThumb}" alt="">
                <h4>${e.strMeal}</h4>
            </div>
            `
        })

        dishByCategory.innerHTML = data;
    })
}