function getRandomDish() {
    axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
        .then((resp) => {
            // console.log(resp)
            document.getElementById('random-dish').innerHTML = `
        <div>
            <img src="${resp.data.meals[0].strMealThumb}" alt="">
        </div>

        <div>
            <h1>${resp.data.meals[0].strMeal}</h1>
        </div>
        `
            document.querySelector('.modal-container').style.display = 'none'
            document.getElementById('random-dish').onclick = () => {
                var modal = document.querySelector('.modal-container')
                modal.style.display = 'flex'
                modal.innerHTML = `
            <div class="modal">
            
                <span onclick="closeModal()">X</span>
                <img src="${resp.data.meals[0].strMealThumb}" width="90%" margin-bottom="5px" />

                <h4>Ingriedients</h4>

                <ul>
                    <li>${resp.data.meals[0].strIngredient1}</li>
                    <li>${resp.data.meals[0].strIngredient2}</li>
                    <li>${resp.data.meals[0].strIngredient3}</li>
                    <li>${resp.data.meals[0].strIngredient4}</li>
                    <li>${resp.data.meals[0].strIngredient5}</li
                    <li>${resp.data.meals[0].strIngredient6}</li>
                    <li>${resp.data.meals[0].strIngredient7}</li>
                    <li>${resp.data.meals[0].strIngredient8}</li>
                    <li>${resp.data.meals[0].strIngredient9}</li>
                    <li>${resp.data.meals[0].strIngredient10}</li>
                    <li>${resp.data.meals[0].strIngredient11}</li>
                    <li>${resp.data.meals[0].strIngredient12}</li>
                    <li>${resp.data.meals[0].strIngredient13}</li>
                    <li>${resp.data.meals[0].strIngredient14}</li>
                    <li>${resp.data.meals[0].strIngredient15}</li>
                    <li>${resp.data.meals[0].strIngredient16}</li>
                    <li>${resp.data.meals[0].strIngredient17}</li>
                    <li>${resp.data.meals[0].strIngredient18}</li>
                    <li>${resp.data.meals[0].strIngredient19}</li>
                    <li>${resp.data.meals[0].strIngredient20}</li>
                </ul>
            </div>`
            }
        })
}

getRandomDish();

function getDishByCategory() {
    var inputValue = document.getElementById('search-category').value
    var searchByCategory = document.getElementById('searched-category')
    var dishByCategory = document.getElementById('dish-by-category')

    axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${inputValue}`).then((resp) => {
        if(resp.data.meals != null){
            console.log(resp)
            data = ''

            resp.data.meals.forEach((e) => {
                // console.log(e)
                data += `
                <div class="card-container">
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

function closeModal() {
    document.querySelector('.modal-container').style.display = 'none'
}