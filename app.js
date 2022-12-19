function getRandomDish() {
    document.querySelector('.modal-container').style.display = 'none'

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
            document.getElementById('random-dish').onclick = () => {
                document.getElementById('food-img').setAttribute('src',`${resp.data.meals[0].strMealThumb}`)
                var modal = document.getElementById('ing')
                modal.innerHTML = ''
                document.querySelector('.modal-container').style.display = 'flex'
                for(i=1; i<=20; i++){
                    let ing = 'strIngredient' + i
                    if(resp.data.meals[0][ing] != '' || resp.data.meals[0][ing] != null){
                        modal.innerHTML += `<li>${resp.data.meals[0][ing]}</li>`
                    }
                }
            }
        })
}

getRandomDish();

function getDishByCategory() {
    let inputValue = document.getElementById('search-category').value
    var searchByCategory = document.getElementById('searched-category')
    var dishByCategory = document.getElementById('dish-by-category')

    axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${inputValue}`).then((resp) => {
        if(resp.data.meals){
            console.log(resp)
            data = ''
            resp.data.meals.forEach((e) => {
                // console.log(e)
                data += `
                <div class="card-container" onclick="getIng(${(e.idMeal)})">
                    <div>
                        <img src="${e.strMealThumb}" alt="">
                    </div>
                    <div class="meal-name">
                        <h1>${e.strMeal}</h1>
                    </div>     
                </div>
                `
            })

            dishByCategory.innerHTML = data;

            searchByCategory.innerHTML = `<p>Your Searched Category's Dishes -</p>`
        }

        else{
            searchByCategory.innerHTML = 'Please enter a valid food category'
        }
    })
}

function getIng(id){
    axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((resp) => {
        document.getElementById('food-img').setAttribute('src',`${resp.data.meals[0].strMealThumb}`)
        var modal = document.getElementById('ing')
        modal.innerHTML = ''
        document.querySelector('.modal-container').style.display = 'flex'
        for(i=1; i<=20; i++){
            let ing = 'strIngredient' + i
            if(resp.data.meals[0][ing] != '' || resp.data.meals[0][ing] != 'null'){
                modal.innerHTML += `<li>${resp.data.meals[0][ing]}</li>`
            }
        }
    })
}

function closeModal() {
    document.querySelector('.modal-container').style.display = 'none'
}