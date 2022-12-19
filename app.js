// Function to get the Random Dish
function getRandomDish() {
    document.querySelector('.modal-container').style.display = 'none'

    // Fetching the api
    axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
        .then((resp) => {

            // Creating the Random Dish Card and putting all the required values inside it
            document.getElementById('random-dish').innerHTML = `
                <div>
                    <img src="${resp.data.meals[0].strMealThumb}" alt="">
                </div>

                <div>
                    <h1>${resp.data.meals[0].strMeal}</h1>
                </div>
                `

            // Onclick function for the Random Dish Card to display the Modal and show it's ingredients
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

// Calling the Random dish function
getRandomDish();

// Getting the dishes by searching the categories
function getDishByCategory() {

    // Taking the value of the input of the user
    let inputValue = document.getElementById('search-category').value

    var searchByCategory = document.getElementById('searched-category')
    var dishByCategory = document.getElementById('dish-by-category')

    // Using the input value fetching the required api
    axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${inputValue}`).then((resp) => {

        // If-else condition to see whether the value input by the user is a valid category or not (as per the api)
        if(resp.data.meals){

            // If the category is valid then all the dishes in that category will be shown
            data = ''
            resp.data.meals.forEach((e) => {
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

        // else it will ask to enter a valid food category
        else{
            searchByCategory.innerHTML = 'Please enter a valid food category'
            dishByCategory.innerHTML = ''
        }
    })
}

// function to get the ingredients of the Dishes in the searched section
function getIng(id){
    axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((resp) => {
        document.getElementById('food-img').setAttribute('src',`${resp.data.meals[0].strMealThumb}`)
        var modal = document.getElementById('ing')
        modal.innerHTML = ''
        document.querySelector('.modal-container').style.display = 'flex'
        for(i=1; i<=20; i++){
            let ing = 'strIngredient' + i
            if(resp.data.meals[0][ing] != '' && resp.data.meals[0][ing] != null && resp.data.meals[0][ing] != 'null'){
                modal.innerHTML += `<li>${resp.data.meals[0][ing]}</li>`
            }
        }
    })
}

// function to provide onclick to close the modal
function closeModal() {
    document.querySelector('.modal-container').style.display = 'none'
}