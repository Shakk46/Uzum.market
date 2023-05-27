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

//------------------Burger--------------------

const burgerButton = doc.querySelector('.burger')
const burgerMenu = doc.querySelector('.burger-menu')
const burgerClose = doc.querySelector('.menu__close')
burgerButton.addEventListener('click', () => {
    burgerMenu.classList.remove('hide')
    main.style = 'display:none;'
})
burgerClose.addEventListener('click', () => {
    burgerMenu.classList.add('hide')
    main.style = 'dispaly:block;'
})

const burgerProfile = doc.querySelector('.burger-profile')
burgerProfile.onclick = () => {
    if(currentAccount) {
        burgerMenu.classList.add('hide')
        main.style.display = 'block'
        renderAccountPage()
    }else {
        burgerMenu.classList.add('hide')
        main.style.display = 'block'
        showHideModal()
    }
}

const burgerCatalog = doc.querySelector('.menu-catalog')
const burgerCatalogButton = doc.querySelector('.menu-catalog__button')
burgerCatalogButton.onclick = () => {
    let burgerArrow = burgerCatalogButton.children[2]
    if(burgerArrow.textContent == 'expand_more') {
        burgerArrow.textContent = 'expand_less'
    }
    else if(burgerArrow.textContent == 'expand_less') {
        burgerArrow.textContent = 'expand_more'
    }else {
        burgerArrow.textContent = 'expand_less'
    }
    burgerCatalog.classList.toggle('hide-catalog')
}

const burgerCategories = doc.querySelectorAll('.menu-category')
for(let i = 1; i <= 10; i++) {
    burgerCategories[i].onclick = () => {
        renderSearchPage(burgerCategories[i].id)
        burgerMenu.classList.add('hide')
        main.style.display = 'block'
        console.log('worked')
    }
}


//search-bar
const searchBar = doc.querySelector('.search-bar')
const searchBarInput = doc.querySelector('.search-bar input')
const searchMenu = doc.querySelector('.search-menu')
{// Анимация выпадения подсказок в поиске
searchBarInput.addEventListener('focus', () => {
    searchMenu.classList.remove('hide')
})
main.onclick = () => {
    searchMenu.classList.add('hide')
}

}



let searchBarSuggestion = doc.querySelector('.suggestion')


// Добавлять подсказки.
searchBarInput.addEventListener('input', () => {
    // Обнуляем после каждого ввода
    searchMenu.textContent = ''
    // Создаём Regex
    let regex = new RegExp(searchBarInput.value, 'gi')
    
    // Получаем совпадения
    for(let product of allProducts) {
        if(product.name.match(regex)) {
            if(searchMenu.children.length < 5) {
                let newSuggestion = searchBarSuggestion.cloneNode(true)
                newSuggestion.children[1].textContent = product.name
                newSuggestion.id = product.id
                newSuggestion.addEventListener('click', () => {
                    clearMain()
                    renderProductPage(allProducts[newSuggestion.id])
                    
                    searchMenu.classList.add('hide')
                })
                searchMenu.append(newSuggestion)
            }
            
        }
    }
})


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

const navLinks = doc.querySelectorAll('.nav__link')
for(let link of navLinks) {
    link.addEventListener('click', () => {
        renderSearchPage(link.id)
    })
   
}


// Добавление названий подкатегорий в каталоге
for(let category of categories) {
    category.addEventListener('click', () => {
        catalogSub.innerHTML = ''

        // Добавить название категории
        const subCategoryName = createDOMElement('h2', 'category__name')
        subCategoryName.textContent = category.children[1].textContent
        subCategoryName.onclick = () => {
            renderSearchPage(category.id)
            catalogMenu.classList.toggle('active')
        }
        catalogSub.append(subCategoryName)

        // Добавить названия подкатегорий
        const subcategories = getSubCategories(category.id)
        for(let i = 0; i < subcategories.length; i++) {
            let subcategory = createDOMElement('p', 'subcategory')
            subcategory.textContent = subcategories[i]
            subcategory.onclick = () => {
                renderSearchPage(category.id, subcategory.textContent)
                catalogMenu.classList.toggle('active')
            }
            catalogSub.append(subcategory)
        }

    })
}

// -----------------------------------------------------Main---------------------------------------------------- 
function renderMain() {
    clearMain()

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
// Кнопка информации аккаунта или входа-регистрации
logIn.addEventListener('click', () => {
    if(!currentAccount) showHideModal()
    else renderAccountPage()
})


const regForm = doc.querySelector('.reg__form')
const signInForm = doc.querySelector('.sign-in__form')

const signInButton = doc.querySelector('.sign-in button')
const regButton = doc.querySelector('.registration button')

// При регистрации
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
// При входе
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


function renderAccountPage(getPage = getSettings) {
    clearMain()

    const accountPage = createDOMElement('div', 'account-page')
    main.append(accountPage)

    const accountNav = createDOMElement('div', 'account-nav')
    accountPage.append(accountNav)
        // кнопка настроек аккаунта
        const accountSettings = createDOMElement('p', 'account-nav__settings')
        accountSettings.textContent = 'Мои данные'
        accountSettings.addEventListener('click', () => {
            accountContent.textContent = ''
            accountContent.append(getSettings())
        })
        accountNav.append(accountSettings)
        // кнопка избранных
        const accountFavorites = createDOMElement('p', 'account-nav__favorites')
        accountFavorites.textContent = 'Избранное'
        accountFavorites.addEventListener('click', () => {
            accountContent.textContent = ''
            accountContent.append(getFavorites())
        }) 
        accountNav.append(accountFavorites)
        // кнопка корзины
        const accountBasket = createDOMElement('p', 'account-nav__bucket')
        accountBasket.textContent = 'Корзина'
        accountBasket.addEventListener('click', () => {
            accountContent.textContent = ''
            accountContent.append(getBasket())
        })
        accountNav.append(accountBasket)

    const accountContent = createDOMElement('div', 'account-content')
    accountPage.append(accountContent)

    
    
    accountContent.append(getPage())
}
function getSettings() {
    const settings = createDOMElement('div', 'settings')
        //settings-heading 
        const settingsHeading = createDOMElement('h4', 'account-heading')
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
        //favorites-heading 
        const favoritesHeading = createDOMElement('h4', 'account-heading')
        favoritesHeading.textContent = 'Избранное'
        accountFavorites.append(favoritesHeading)

        //favorites-products
        const favoritesProducts = createDOMElement('div', 'favorites-products')
        accountFavorites.append(favoritesProducts)
    
    if(currentAccount.favorites[0]) {
        for(let productId of currentAccount.favorites) {
            let product = createProduct(allProducts[productId - 1])
            favoritesProducts.append(product)
        }
    }else {
        accountFavorites.append('Ничего не нашлось :(')
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
        //basket-heading 
        const basketHeading = createDOMElement('h4', 'account-heading')
        basketHeading.textContent = 'Корзина'
        accountBasket.append(basketHeading)

        //basket-products
        const basketProducts = createDOMElement('div', 'basket-products')
        accountBasket.append(basketProducts)
    
    if(currentAccount.basket[0]) {
        // Добавить продукты из массива по id товара
        for(let productId of currentAccount.basket) {
            let product = createProduct(allProducts[productId - 1])
            basketProducts.append(product)
        }
    }else {
        accountBasket.append('Ничего не нашлось :(')
    }
    return accountBasket
}

// Кнопки корзина и избранное в header
const basketButton = doc.querySelectorAll('.basket')
const favoritesButton = doc.querySelectorAll('.favorites')

for(let button of basketButton) {
    // На клик показываем избранное и корзину
    button.onclick = () => {
        if(currentAccount) {
            burgerMenu.classList.add('hide')
            main.style.display = 'block'
            renderAccountPage(getBasket)
        }else {
            burgerMenu.classList.add('hide')
            main.style.display = 'block'
            showHideModal()
        }
    }
}
for(let button of favoritesButton) {
    button.onclick = () => {
        if(currentAccount) {
            burgerMenu.classList.add('hide')
            main.style.display = 'block'
            renderAccountPage(getFavorites)
        }else {
            burgerMenu.classList.add('hide')
            main.style.display = 'block'
            showHideModal()
        }
    }
}


function renderSearchPage(category, subcategory = false) {
    clearMain()

    // Сохраним ссылку на текущую категорию
    let currentCategory = category
    let currentSubcategory = subcategory

    const searchPage = createDOMElement('div', 'search-page')
    main.append(searchPage)
        // search-page__nav
        const searchPageNav = createDOMElement('div', 'search-page__nav')
        searchPage.append(searchPageNav)
            const home = createDOMElement('span', '')
            home.textContent = 'Главная'
            home.addEventListener('click', renderMain)
            const navCategory = createDOMElement('span', '')
            navCategory.textContent = 'Все категории'
            navCategory.addEventListener('click', () => {
                renderSearchPage(allProducts)
            })
                // bottom
                const navBottom = createDOMElement('div', 'nav-bottom')
                    
            searchPageNav.append(home,navCategory, navBottom)

            const currentCategoryName = createDOMElement('h2', 'search-page__category')
            navBottom.append(currentCategoryName)
    
        const searchPageContent = createDOMElement('div', 'search-page__content')
        searchPage.append(searchPageContent)
            const searchPageParams = createDOMElement('div', 'params')
            searchPageContent.append(searchPageParams)
                // Категории слева
                const searchPageCategories = createDOMElement('div', 'categories')
                searchPageParams.append(searchPageCategories)
                    // Заглавие
                    const h4 = createDOMElement('h4', '')
                    h4.textContent = 'Категории'
                    searchPageCategories.append(h4)
                    // Подкатегории
                    const searchPageSubcategories = createDOMElement('div', 'subcategories')
                    searchPageCategories.append(searchPageSubcategories)
                       
                    // Цена
                    const price = createDOMElement('div', 'price')
                    searchPageParams.append(price)
                        // Заглавие
                        const H4 = createDOMElement('h4', '')
                        H4.textContent = 'Цена'
                        price.append(H4)
                        const minInput = createDOMElement('input', 'min')
                        minInput.placeholder = 'От'
                        minInput.value = '0'
                        const maxInput = createDOMElement('input', 'max')
                        maxInput.placeholder = 'До'
                        maxInput.value = '9999999'
                        price.append(minInput,maxInput)

                    // Кнопка поиска
                    const filterConfirm = createDOMElement('button', 'filter-confirm')
                    filterConfirm.textContent = 'Искать'
                    filterConfirm.addEventListener('click', () => {
                        if(maxInput.value > minInput.value) {
                            renderProducts(currentCategory, currentSubcategory)
                        }else {
                            alert('минимальная цена не может быть больше максимальной')
                            minInput.value = 0
                        }
                        
                    })
                    searchPageParams.append(filterConfirm)
                    
            const searchPageProducts = createDOMElement('div', 'products')
            searchPageContent.append(searchPageProducts)

        // Менять контент страницы по категории
        if(category == allProducts) {
            currentCategoryName.textContent = 'Все категории'

            searchPageSubcategories.textContent = ''
            for(let category of categories) { // categories - это массив категорий из catalog
                let subcategory = createDOMElement('div', 'categories__subcategory')
                subcategory.textContent = category.children[1].textContent // Название категории
                subcategory.id = category.id
                
                subcategory.addEventListener('click', () => {
                    currentCategory = subcategory.id
                    renderProducts(currentCategory)
                    
                    // Изменит название категории
                    currentCategoryName.textContent = subcategory.textContent
                    // Добавить название в nav 
                    let span1 = createDOMElement('span', '')
                    span1.textContent = currentCategoryName.textContent
                    searchPageNav.append(span1)
                    // Добавление подкатегорий
                    searchPageSubcategories.textContent = ''

                    // Кнопка назад
                    const previousCategory = createDOMElement('div', 'categories__subcategory')
                    searchPageSubcategories.append(previousCategory)
                        const span = createDOMElement('span', 'material-icons')
                        span.textContent = 'arrow_back_ios'
                        previousCategory.append(span, 'Все категории')
                        previousCategory.addEventListener('click', () => {
                            console.log(category);
                            renderSearchPage(allProducts)
                        })
                    
                    for(let subcategoryName of getSubCategories(subcategory.id)) {
                        let subCategory = createDOMElement('div', 'categories__subcategory')
                        subCategory.textContent = subcategoryName
                        searchPageSubcategories.append(subCategory)
        
                        subCategory.addEventListener('click', () => {
                            currentSubcategory = subcategoryName
                            renderProducts(currentCategory,subcategoryName)
                        })
                    }
                })
                searchPageSubcategories.append(subcategory)
            }
            
            for(let productObject of allProducts) {
                let product = createProduct(productObject)
                searchPageProducts.append(product)
            }
        }else {
            // Добавление подкатегорий 
            const previousCategory = createDOMElement('div', 'categories__subcategory')
            searchPageSubcategories.append(previousCategory)
                const span = createDOMElement('span', 'material-icons')
                span.textContent = 'arrow_back_ios'
                previousCategory.append(span, 'Все категории')
                previousCategory.addEventListener('click', () => {
                    renderSearchPage(allProducts)
                })

            // Показ товаров
            renderProducts(currentCategory, currentSubcategory)
            

            for(let subcategoryName of getSubCategories(currentCategory)) {
                let subcategory = createDOMElement('div', 'categories__subcategory')
                subcategory.textContent = subcategoryName
                searchPageSubcategories.append(subcategory)

                subcategory.addEventListener('click', () => {
                    currentSubcategory = subcategoryName
                    renderProducts(currentCategory, subcategoryName)
                })
            }
            

            

            

            if(category == 'electronics') {
                currentCategoryName.textContent = 'Электроника'
            }
            else if(category == 'appliances') {
                currentCategoryName.textContent = 'Бытовая техника'
            }else {
                console.log('none');
            }
            // добавить название категории в nav
            const navSpan = createDOMElement('span', '')
                navSpan.textContent = currentCategoryName.textContent
                searchPageNav.append(navSpan)
                navSpan.addEventListener('click', () => {
                    renderSearchPage(category)
                })
        }
        
        // Адаптив
        const paramsButton = createDOMElement('button', 'params-button')
            // иконка на кнопке
            const span = createDOMElement('span', 'material-icons')
            span.textContent = 'settings'
            paramsButton.append(span, 'фильтры')
        navBottom.append(paramsButton)

        const paramsMenu = createDOMElement('div', 'params-menu')
        body.append(paramsMenu)

        let windowWidth = window.innerWidth
        console.log(windowWidth);
        
        // Получаем ширину экрана при изменении
        window.addEventListener('resize', () => {
            windowWidth = window.innerWidth
            console.log(windowWidth);

            if(windowWidth < 920) {
                
            }
        })
        
      
    function renderProducts(category, subcategory = false) {
        // Очистим searchProducts
        searchPageProducts.textContent = ''

        // Достаём продукты
        let products = getProducts(category,[+minInput.value, +maxInput.value], subcategory)
        // Показываем их
        for(let product of products) {
            product = createProduct(product)
            searchPageProducts.append(product)
        }

        
    }
    function getProducts(category, price, subcategory, searchRegexp) {
        // Проверяем значения необязательных параметров
        if(isNaN(price[0])) price = [0, 100000]

        let filteredProducts = [];
        // Достаём все продукты указаноой категории
        let categoryProducts;
        
        if(category != allProducts) {
            console.log(category, allProducts);
            categoryProducts = db.products[category]
        }else {
            categoryProducts = allProducts
        }
        


        
        categoryProducts.forEach((product) => {
            // Фильтруем по цене
            if(product.price >= price[0] && product.price <= price[1]) filteredProducts.push(product)
            
        })

        if(subcategory) {
            // Фильтруем по подкатегории
            for(let i = 0; i < filteredProducts.length; i++) {
                let product = filteredProducts[i]
                if(product.subCategory != subcategory) {
                    filteredProducts.splice(i,1)
                    i--
                }
            }
        }


        // Возвращаем продукты
        return filteredProducts
    }
    
}

// Загрузка страницы после принятия ДБ
fetch('http://localhost:3000/db')
    .then(res => res.json())
    .then(res => {
        db = res
        // Добавить все продукты из ДБ в один массив
        allProducts = Object.values(db.products)
        allProducts = allProducts.flat(2)
        

        
        // Привязка к аккаунту
        currentAccount = db.users.find(user => user.active == true)
        // renderMain()
        // renderProductPage(db.products.electronics[0])
        renderSearchPage(allProducts)
        


        // Убрать слово "Войти" если аккаунт уже есть
        if(currentAccount) logIn.classList.remove('log-in')
        
    })