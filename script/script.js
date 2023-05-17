// Assets
const doc = document
const body = doc.body
const header = doc.querySelector('.header')
const main = doc.querySelector('.main')
const arrow = createDOMElement('span', 'material-icons')
arrow.textContent = 'navigate_next'
let allProducts = [];

// Current account
let currentAccount;
let db;


function createDOMElement(type, className) {
    const element = doc.createElement(type)
    element.className = className
    return element
}
function clearMain() {
    main.innerHTML = ''
}



const categories = doc.querySelectorAll('.category')
const catalogSub = doc.querySelector('.catalog__subcategories')





// ---------------------------------------------HEADER-------------------------------------------------



//search-bar 
const searchBarInput = doc.querySelector('.search-bar input')
const searchMenu = doc.querySelector('.search-menu')
{// Анимация выпадения подсказок в поиске
searchBarInput.addEventListener('focus', () => {
    searchMenu.classList.toggle('hide')
})
searchBarInput.addEventListener('blur', () => {
    searchMenu.classList.toggle('hide')
})
}

// Адаптивный search-bar
const searchBarAdapt = doc.querySelector('.search-bar-adapt')
const searchBarAdaptInput = doc.querySelector('.search-bar-adapt input')
const searchBarClose = doc.querySelector('.search__close')
{// Анимация расширения поиска
searchBarAdaptInput.addEventListener('click', () => {
    searchBarAdapt.classList.add('search-bar-adapt__focus')
    searchBarClose.style = 'display:block'
})

searchBarClose.addEventListener('click', () => {
    searchBarAdapt.classList.remove('search-bar-adapt__focus')
    searchBarClose.style = 'display:none;'
})}


// Каталог комп версия 
const catalog = doc.querySelector('.catalog')
// Линк "Ещё"
const more = doc.querySelector('#more')
const catalogMenu = doc.querySelector('.catalog-menu')
{// Выезжает каталог при клике.
    catalog.addEventListener('click', () => {
    catalogMenu.classList.toggle('active')
})
more.addEventListener('click', () => {
    catalogMenu.classList.toggle('active')
})}


function getSubCategories (category) {
    // Массив со всеми подкатегориями
    const subCategories = []
    for(let product of db.products[category]) {
        // Достаём название подкатегории только один раз
        if(!subCategories.includes(product.subCategory.trim())) {
            subCategories.push(product.subCategory.trim())
        }
    }
    return subCategories
}




for(let category of categories) {
    category.addEventListener('click', () => {
        catalogSub.innerHTML = ''

        // Добавить название категории
        const subCategoryName = createDOMElement('h2', 'category__name')
        subCategoryName.textContent = category.children[1].textContent
        catalogSub.append(subCategoryName)

        // Добавить названия подкатегорий
        const subcategories = getSubCategories(category.id)
        for(let i = 0; i < subcategories.length; i++) {
            let subcategory = createDOMElement('p', 'subcategory')
            subcategory.textContent = subcategories[i]
            catalogSub.append(subcategory)
        }

    })
}

// -----------------------------------------------------Main---------------------------------------------------- 
function renderMain() {
    renderSwiper()
    renderCompilation('Электроника', 'appliances')
    renderBanner(2)

}
let swiper = doc.querySelector('.swiper')
const swiperSlidesImg = doc.querySelectorAll('.swiper-slide img') 
function renderSwiper() {

        // Слайды
        for(let count = 0; count < 3; count++) {
            swiperSlidesImg[count].src = db.banners.src[count]
        }

        main.append(swiper)
}
function renderBanner(count) {
    // Баннер
    const banner = createDOMElement('div', 'banner')
    main.append(banner)

    const bannerImg = createDOMElement('img', 'banner-image')
    bannerImg.src = db.banners.src[count]
    banner.append(bannerImg)

}
function renderCompilation(compName,category) {
    // Поборка
    const comp = createDOMElement('div', 'comp')
    main.append(comp)

    // Заголовок 
    const compHeading = createDOMElement('h3', 'comp__heading')
    compHeading.textContent = compName
    compHeading.append(arrow)
    comp.append(compHeading)
    
    // Товары
    const compContent = createDOMElement('div', 'comp__content')

    // Добавление товаров
    for(let i = 0; i < 9; i++) {
        let dbProduct = db.products[category][i]
        let product = createProduct(dbProduct)
        compContent.append(product)
    }
    comp.append(compContent)

}
function createProduct(dbProduct) {
    // Product-div
    const product = createDOMElement('div', 'product')

    const productTop = createDOMElement('div', 'product-top')
    product.append(productTop)
    
        //product-image 
        const productImage = createDOMElement('img', 'product__image')
        productImage.src = dbProduct.imgURL
        productTop.append(productImage)

        // product-basket
        const productSetBasket = createDOMElement('div', 'product-basket')
        productSetBasket.src = ''

        // Зарегистрирован ли пользователь
        if(currentAccount) {
            // Есть ли уже этот продукт в избранном
            if(currentAccount.basket.includes(dbProduct.id)) productSetBasket.textContent = '-'
            else  productSetBasket.textContent = '+'
        }else  productSetBasket.textContent = '+'

        productSetBasket.addEventListener('click', (event) => {
            //Не дать родительским элементам отзываться на клик
            event.stopPropagation()

            // Менять значки на кнопке после нажатия
            if(productSetBasket.textContent == '+') {
                alert('Продукт успешно добавлен в корзину')
                productSetBasket.textContent = '-'
            }
            else {
                alert('Продукт успешно удален из корзины')
                productSetBasket.textContent = '+'
            } 

            addToUser(dbProduct, 'basket')
        })
        productTop.append(productSetBasket)

        // product-favorite
        const productSetFavorite = createDOMElement('span', 'material-icons product-favorite')
        productSetFavorite.textContent = 'favorite_border'
        // Зарегистрирован ли пользователь
        if(currentAccount) {
            // Есть ли уже этот продукт в избранном
            if(currentAccount.favorites.includes(dbProduct.id)) productSetFavorite.textContent = 'favorite'
            else  productSetFavorite.textContent = 'favorite_border'
        }else  productSetFavorite.textContent = 'favorite_border'

        productSetFavorite.addEventListener('click', (event) => {
            //Не дать родительским элементам отзываться на клик
            event.stopPropagation()

            // Менять значки на кнопке после нажатия
            if(productSetFavorite.textContent == 'favorite_border') {
                alert('Продукт успешно добавлен в избранное')
                productSetFavorite.textContent = 'favorite'
            }
            else {
                alert('Продукт успешно удален из избранных')
                productSetFavorite.textContent = 'favorite_border'
            } 

            addToUser(dbProduct, 'favorites')
        })
        productTop.append(productSetFavorite)

    // product-info 
    const productInfo = createDOMElement('div', 'product__info')
    product.append(productInfo)
    // product-name
    const productName = createDOMElement('p', 'product__name')
    productName.textContent = dbProduct.name
    productInfo.append(productName)
    
    // product-rating
    const productRating = createDOMElement('div', 'product__rating')
        // star
        const productRatingStar = createDOMElement('img', 'product__star');
        productRatingStar.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Gold_Star.svg/2048px-Gold_Star.svg.png';
        productRating.append(productRatingStar)
    
    productRating.append(dbProduct.rating)
    productInfo.append(productRating)

    //product-monthly
    const productMonthly = createDOMElement('p', 'product__monthly')
    productMonthly.textContent = (dbProduct.price / 8) + ' сум / месяц'
    productInfo.append(productMonthly)

    // product-price
    const productPrice = createDOMElement('p', 'product__price')
    productPrice.textContent = dbProduct.price + ' сум'
    productInfo.append(productPrice)

    
    // Создание старницы товара при клике.
    product.addEventListener('click', () => {
        clearMain()
        renderProductPage(dbProduct)
    })
    // product id
    product.id = dbProduct.id
    return product
}

function addToUser(product, place) {
    // Добавить id продукта если пользователь зарегистрирован
    if(currentAccount) {
        // Проверить чтобы значение еще не было в массиве
        if(!currentAccount[place].includes(product.id)){
            currentAccount[place].push(product.id)
        }
        //Убрать значение из массива если оно было
        else {
            currentAccount[place].splice(currentAccount[place].indexOf(product.id), 1);
        }

        // Отправить измененный массив
        fetch('http://localhost:3000/users/' + currentAccount.id, {
                method:'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                 },
                body: JSON.stringify({[place]:currentAccount[place]})
            })
            .then(res => res.json())
            .then(res => console.log(res))
    }else {
        showHideModal()
    }
}
// Product page

function renderProductPage (product) {
    // Product page
    const productPage = createDOMElement('div', 'product-page')
    main.append(productPage)

        // Product page-top
        const productPageTop = createDOMElement('div', 'product-page__top')
        productPage.append(productPageTop)
            //product-page__left
            const productPageLeft = createDOMElement('div', 'product-page__left')
            productPageTop.append(productPageLeft)
                // Image
                const productPageImg = createDOMElement('img', 'product-page__img') 
                productPageImg.src = product.imgURL
                productPageLeft.append(productPageImg)

            //product-page__right
            const productPageRight = createDOMElement('div', 'product-page__right')
            productPageTop.append(productPageRight)
                // product-rating
                const productRating = createDOMElement('div', 'product__rating')
                    // star
                    const productRatingStar = createDOMElement('img', 'product__star');
                    productRatingStar.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Gold_Star.svg/2048px-Gold_Star.svg.png';
                    productRating.append(productRatingStar)
                    //span inside
                    const span = createDOMElement('span', '')
                    span.textContent = product.rating
                    const span2 = createDOMElement('span', '')
                    span2.textContent = product.numberOfOrders + ' заказов'
                    productRating.append(span, span2)
                productPageRight.append(productRating)

                //product-name
                const productPageName = createDOMElement('p', 'product-page__name')
                productPageName.textContent = product.name
                productPageRight.append(productPageName)

                //product-seller
                const productPageSeller = createDOMElement('div', 'product-page__seller')
                productPageRight.append(productPageSeller)
                    //spans inside
                    const span3 = createDOMElement('span', '')
                    span3.textContent = 'Продавец: '
                    const span4 = createDOMElement('span', '')
                    span4.textContent = product.seller
                    productPageSeller.append(span3, span4)

                //product-delivery
                const productPageDelivery = createDOMElement('div', 'product-page__delivery')
                productPageRight.append(productPageDelivery)
                    //spans inside
                    const span5 = createDOMElement('span', '')
                    span5.textContent = 'Доставка: '
                    const span6 = createDOMElement('span', '')
                    span6.textContent = '1 день, бесплатно'
                    productPageDelivery.append(span5, span6)
                
                //hr
                const hr = createDOMElement('hr', '')
                productPageRight.append(hr)

                // product-colors
                const productPageColors = createDOMElement('div', 'product-page__colors')
                productPageRight.append(productPageColors)
                    // buttons
                    const buttonColor1 = createDOMElement('button', 'button-color1')
                    buttonColor1.textContent = 'White'
                    const buttonColor2 = createDOMElement('button', 'button-color2')
                    buttonColor2.textContent = 'Black'
                    productPageColors.append(buttonColor1, buttonColor2)

                // product-price
                const productPagePrice = createDOMElement('div', 'product-page__price')
                productPageRight.append(productPagePrice)
                    // p
                    const p = createDOMElement('p', '')
                    p.textContent = 'Цена:'
                    productPagePrice.append(p)
                    // p2
                    const p2 = createDOMElement('p', '')
                    p2.textContent = product.price + ' сум'
                    productPagePrice.append(p2)
                
                // product-page__monthly
                const productPageMonthly = createDOMElement('div', 'product-page__monthly')
                productPageRight.append(productPageMonthly)
                    // spans inside
                    const span7 = createDOMElement('span', '')
                    span7.textContent = `От ${(product.price / 8)} + сум / месяц`
                    const span8 = createDOMElement('span', '')
                    span8.textContent = 'в рассрочку'
                    productPageMonthly.append(span7, span8, arrow)
                    
                // product-page__actions
                const productPageActions = createDOMElement('div', 'product-page__actions')
                productPageRight.append(productPageActions)
                    //product-page__basket
                    const productPageBasket = createDOMElement('button', 'product-page__basket')

                    // textContent
                    if(currentAccount) {
                        if(currentAccount.basket.includes(product.id)) {
                            productPageBasket.textContent = 'Убрать из корзины'
                        }else {
                            productPageBasket.textContent = 'Добавить в корзину'
                        }
                    }else {
                        productPageBasket.textContent = 'Добавить в корзину'
                    }
                    // click
                    productPageBasket.addEventListener('click', () => {

                        if(productPageBasket.textContent == 'Убрать из корзины') {
                            alert('Успешно удаленно из корзины')
                            productPageBasket.textContent = 'Добавить в корзину'
                        }else {
                            alert('Успешно добавлено в корзину')
                            productPageBasket.textContent = 'Убрать из корзины'
                        }
                        addToUser(product, 'basket')
                    })
                    productPageActions.append(productPageBasket)

                    //product-page__favorite
                    const productPageFavorite = createDOMElement('button', 'product-page__favorite')

                    if(currentAccount) {
                        if(currentAccount.favorites.includes(product.id)) {
                            productPageFavorite.textContent = 'Убрать из избранных'
                        }else {
                            productPageFavorite.textContent = 'Добавить в избранное'
                        }
                    }else {
                        productPageFavorite.textContent = 'Добавить в избранное'
                    }
                    productPageFavorite.addEventListener('click', () => {

                        if(productPageFavorite.textContent == 'Убрать из избранных') {
                            alert('Успешно удаленно из избранных')
                            productPageFavorite.textContent = 'Добавить в избранное'
                        }else {
                            alert('Успешно удаленно в избранное')
                            productPageFavorite.textContent = 'Убрать из избранных'
                        }
                        addToUser(product, 'favorites')
                    })
                    productPageActions.append(productPageFavorite)
                
                //product-page__description
                const productPageDescription = createDOMElement('p', 'product-page__description')
                    const h3 = createDOMElement('h3', '')
                    h3.textContent = 'Описание товара:'
                    productPageDescription.append(h3)
                productPageDescription.append(product.description)
                productPageRight.append(productPageDescription)




        // Product-page__bottom
        const productPageBottom = createDOMElement('div', 'product-page__bottom')
        productPage.append(productPageBottom)
            //product-page__heading 
            const productPageHeading = createDOMElement('h2', 'product-page__heading')
            productPageHeading.textContent = 'Отзывы'
            productPageBottom.append(productPageHeading)

            //product-page__reviews
            const productPageReviews = createDOMElement('div', 'reviews')
                //product-page__review
                addReview(productPageReviews, 'Alex',3.5,'Рот твой шатал')
            productPageBottom.append(productPageReviews)
                


        

}
const date = new Date()
const months = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь']
function addReview(reviews,author,rating,text) {

        const review = createDOMElement('div', 'review')
        
            //review__author
            const reviewAuthor = createDOMElement('h3', 'review__author')
            reviewAuthor.textContent = author
            // div
            const div = createDOMElement('div', 'hz')
            
                //review__rating
                const reviewRating = createDOMElement('div', 'review__rating')
                    // star
                    const productRatingStar = createDOMElement('img', 'product__star');
                    productRatingStar.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Gold_Star.svg/2048px-Gold_Star.svg.png';
                    
                    //span inside
                    const span = createDOMElement('span', '')
                    span.textContent = rating
                reviewRating.append(productRatingStar, span)
                //review__date
                const reviewDate = createDOMElement('div', 'review__date')
                reviewDate.textContent = `${date.getDate()} ${months[date.getMonth()]} 2023 г.`
            div.append(reviewRating, reviewDate)
            //review__text
            const reviewText = createDOMElement('p', 'review__text')
            reviewText.textContent = text
        review.append(reviewAuthor, div, reviewText)
    reviews.append(review)
        
    
}





// -----------------------------Account-modal---------------------------
const logIn = doc.querySelector('.log-in')
const accountModal = doc.querySelector('.account-modal')
const registration = doc.querySelector('.registration')
const signIn = doc.querySelector('.sign-in')
const changeP = doc.querySelector('.change')
const changeText = doc.querySelector('.change span')
const changeSpan = doc.querySelector('#change')
const closeModal = doc.querySelector('.close')
{// Менять контент модалки входа-регистрации
function changeRegistrationForm () {
registration.classList.toggle('hide')
signIn.classList.toggle('hide')

if(registration.className == 'registration form-content hide') {
    changeText.textContent = 'Нету аккаунта?'
    changeSpan.textContent = 'Зарегистрироваться'
}else {
    changeText.textContent = 'Уже есть аккаунт?'
    changeSpan.textContent = 'Войти'
}
}

changeSpan.addEventListener('click', changeRegistrationForm)
}
function showHideModal () {
    accountModal.classList.toggle('hide')
}
closeModal.addEventListener('click', () => {
    showHideModal()
})
logIn.addEventListener('click', () => {
    if(!currentAccount) showHideModal()
    else renderAccountPage()
})


const regForm = doc.querySelector('.reg__form')
const signInForm = doc.querySelector('.sign-in__form')

const signInButton = doc.querySelector('.sign-in button')
const regButton = doc.querySelector('.registration button')

regForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    
    let formInputs = regForm.children
    let formData = {}
    
    
    // Добавить ключи и значения в formData.
    for(let input of formInputs) {
        if(input.tagName == 'INPUT') {
            formData[input.name] = input.value
        }
    }
    
    // Проверить существует ли юзер с таким логином
    for(let user of db.users) {
        console.log(user.username)
        if(user.username == formInputs[2].value) {
            formInputs[2].value = ''
            return alert('Пользователь с таким логином уже существует!')
        }
    }
    // Убрать слово "Войти"
    logIn.classList.remove('log-in')
    // Current account
    // Убрать модальное окно
    showHideModal()
    // Отправить данные в ДБ
    sendData(formData)
    
    currentAccount = formData
    formData.email = '';
    formData.tel = '';
    
    

})
signInForm.addEventListener('submit', (event) => {
    event.preventDefault()
    formInputs = signInForm.children

    // Проверим совпадает ли логин с логинами в ДБ
    
    for(let user of db.users) {
        if(user.username == formInputs[0].value) {
            if(user.password == formInputs[1].value) {
                alert(`Добро пожаловать, ${user.name}`)
                showHideModal()

                // Убрать слово "Войти"
                logIn.classList.remove('log-in')
                logIn.style.width = '20%'

                currentAccount = user

                // Сменить active в ДБ
                fetch('http://localhost:3000/users/' + currentAccount.id, {
                    method:'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                     },
                    body: JSON.stringify({active:true})
                })
                .then(res => res.json())
                .then(res => console.log(res))

                return
            }else {
                return alert('Указан не тот пароль. Подумай ещё :(')
            }
        }
    }
    signInForm.reset()
    alert('Пользователь с таким логином не был найден!')

})

async function sendData(formData) {
    console.log(formData)
    formData.active = true;
    formData.email = '';
    formData.tel = '';
    formData.basket = [];
    formData.favorites = [];
    let response = await fetch('http://localhost:3000/users', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
         },
        body: JSON.stringify(formData)
    });
    
    let result = await response.json()
    console.log(result)
    return result
    
}


function renderAccountPage() {
    clearMain()

    const accountPage = createDOMElement('div', 'account-page')
    main.append(accountPage)

    const accountNav = createDOMElement('div', 'account-nav')
    accountPage.append(accountNav)
        // account__settings
        const accountSettings = createDOMElement('p', 'account-nav__settings')
        accountSettings.textContent = 'Мои данные'
        accountSettings.addEventListener('click', () => {
            accountContent.textContent = ''
            accountContent.append(getSettings())
        })
        accountNav.append(accountSettings)
        // account__favorites
        const accountFavorites = createDOMElement('p', 'account-nav__favorites')
        accountFavorites.textContent = 'Избранное'
        accountFavorites.addEventListener('click', () => {
            accountContent.textContent = ''
            accountContent.append(getFavorites())
        }) 
        accountNav.append(accountFavorites)
        // account__basket
        const accountBasket = createDOMElement('p', 'account-nav__bucket')
        accountBasket.textContent = 'Корзина'
        accountBasket.addEventListener('click', () => {
            accountContent.textContent = ''
            accountContent.append(getBasket())
        })
        accountNav.append(accountBasket)

    const accountContent = createDOMElement('div', 'account-content')
    accountPage.append(accountContent)

    
    
    accountContent.append(getFavorites())
}
function getSettings() {
    const settings = createDOMElement('div', 'settings')
        //account-heading 
        const settingsHeading = createDOMElement('h4', 'settings-heading')
        settingsHeading.textContent = 'Мои данные'
        settings.append(settingsHeading)
        // account-form
        const settingsForm = createDOMElement('form', 'settings-form')
        settings.append(settingsForm)
            //top - bottom
            const top = createDOMElement('div', 'settings__top row')
            const middle = createDOMElement('div', 'settings__middle row')
            const bottom = createDOMElement('div', 'settings__bottom row')
            settingsForm.append(top)

            const settingsSurname = createDOMElement('input', '')
            settingsSurname.name = 'surname'
            settingsSurname.placeholder = 'Фамилия'
            settingsSurname.value = currentAccount.surname
            const settingsName = createDOMElement('input', '')
            settingsName.name = 'name'
            settingsName.placeholder = 'Имя'
            settingsName.value = currentAccount.name
            top.append(settingsSurname, settingsName)

            const hr1 = createDOMElement('hr', 'hr')
            settingsForm.append(hr1)

            const settingsEmail = createDOMElement('input', '')
            settingsEmail.type = 'email'
            settingsEmail.name = 'email'
            settingsEmail.value = currentAccount.email
            settingsEmail.placeholder = 'Email'
            const settingsTel = createDOMElement('input', '')
            settingsTel.name = 'tel'
            settingsTel.placeholder = 'Номер телефона'
            settingsTel.value = currentAccount.tel

            
            middle.append(settingsEmail, settingsTel)
            settingsForm.append(middle)

            const settingsSubmit = createDOMElement('button', 'settings-button settings__submit')
            settingsSubmit.textContent = 'Сохранить'
            settingsSubmit.type = 'submit'
            // Сохранить сделанные изменения
            settingsForm.addEventListener('submit', event => {
                event.preventDefault()

                let formData = {

                };
                formInputs = doc.querySelectorAll('.settings-form input')
                for(let input of formInputs) {
                    if(input.value) formData[input.name] = input.value
                }
                
                fetch('http://localhost:3000/users/' + currentAccount.id, {
                    method:'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                     },
                    body: JSON.stringify(formData)
                })
                .then(res => res.json())
                .then(res =>{ 
                    console.log(res)
                    alert('Успешно сохранено!')
                })
            })

            // Кнопка - Выход из системы
            const settingsExit = createDOMElement('button', 'settings-button settings__exit')
            settingsExit.addEventListener('click', (event) => {
                event.preventDefault()

                
                let accountPage = doc.querySelector('.account-page')
                accountPage.remove()
                renderMain()
                exitAccount()
                logIn.classList.add('log-in')
                alert('Вы успешно вышли из системы!')
            })
            settingsExit.textContent = 'Выйти из системы'
            
            bottom.append(settingsSubmit, settingsExit)
            settingsForm.append(bottom)



        

    
    return settings


}
function getFavorites() {
    const accountFavorites = createDOMElement('div', 'account-favorites')
    
    if(currentAccount.favorites[0]) {
        console.log(currentAccount.favorites);
        for(let productId of currentAccount.favorites) {
            let product = createProduct(allProducts[productId - 1])
            console.log(product)
            accountFavorites.append(product)
        }
    }else {
        accountFavorites.append('Ничего не нашлось')
    }
    return accountFavorites
}
function exitAccount() {
    
    fetch('http://localhost:3000/users/' + currentAccount.id, {
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({active:false})

        })    
        .then(res => res.json())
        .then(res => console.log(res))

        currentAccount = undefined
}
function getBasket() {
    const accountBasket = createDOMElement('div', 'account-basket')
    
    if(currentAccount.basket[0]) {
        console.log(currentAccount.basket);
        for(let productId of currentAccount.basket) {
            let product = createProduct(allProducts[productId - 1])
            console.log(product)
            accountBasket.append(product)
        }
    }else {
        accountBasket.append('Ничего не нашлось')
    }
    return accountBasket
}


// Загрузка страницы после принятия ДБ
fetch('http://localhost:3000/db')
    .then(res => res.json())
    .then(res => {
        db = res
        console.log(db.users);
        // Привязка к аккаунту
        currentAccount = db.users.find(user => user.active == true)
        renderMain()
        // renderProductPage(db.products.electronics[0])

        

        // Добавить все продукты из ДБ в один массив
        allProducts = Object.values(db.products)
        allProducts = allProducts.flat(2)
        console.log(allProducts)

        // Убрать слово "Войти" если аккаунт уже есть
        if(currentAccount) logIn.classList.remove('log-in')
        // Добавить swiper
        const swiper = new Swiper('.swiper', {
            // Optional parameters
            direction: 'horizontal',
            loop: true,
          
            // If we need pagination
            pagination: {
              el: '.swiper-pagination',
            },
          
            // Navigation arrows
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          
            // And if we need scrollbar
            scrollbar: {
              el: '.swiper-scrollbar',
            },
        });
    })