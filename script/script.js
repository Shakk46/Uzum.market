// Assets
const doc = document
const body = doc.body
const header = doc.querySelector('.header')
const main = doc.querySelector('.main')
//search-bar 
const searchBarInput = doc.querySelector('.search-bar input')
const searchMenu = doc.querySelector('.search-menu')
// Адаптивный search-bar
const searchBarAdapt = doc.querySelector('.search-bar-adapt')
const searchBarAdaptInput = doc.querySelector('.search-bar-adapt input')
const searchBarClose = doc.querySelector('.search__close')
// Каталог комп версия 
const catalog = doc.querySelector('.catalog')
// Линк "Ещё"
const more = doc.querySelector('#more')
const catalogMenu = doc.querySelector('.catalog-menu')
const categories = doc.querySelectorAll('.category')
const catalogSub = doc.querySelector('.catalog__subcategories')
const arrow = createDOMElement('span', 'material-icons')
arrow.textContent = 'navigate_next'
const date = new Date()
const registration = doc.querySelector('.registration')
const signIn = doc.querySelector('.sign-in')
const changeP = doc.querySelector('.change')
const changeText = doc.querySelector('.change span')
const changeSpan = doc.querySelector('#change')
const months = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь']
let db;

fetch('http://localhost:3000/database')
    .then(res => res.json())
    .then(res => {
        db = res
        console.log('db is ready');

        // renderMain()
        renderProductPage(db.products.electronics[0])


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

function createDOMElement(type, className) {
    const element = doc.createElement(type)
    element.className = className
    return element
}



{// Анимация расширения поиска
searchBarAdaptInput.addEventListener('click', () => {
    searchBarAdapt.classList.add('search-bar-adapt__focus')
    searchBarClose.style = 'display:block'
})

searchBarClose.addEventListener('click', () => {
    searchBarAdapt.classList.remove('search-bar-adapt__focus')
    searchBarClose.style = 'display:none;'
})}

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


function clearMain() {
    main.innerHTML = ''
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

// Main 
function renderMain() {
    renderSwiper()
    renderCompilation('Электроника', 'appliances')
    renderBanner(2)

}
function renderSwiper() {
    // Свайпер
        const divSwiper = createDOMElement('div', 'swiper')
        main.append(divSwiper)

        const swiperWrapper = createDOMElement('div', 'swiper-wrapper')
        divSwiper.append(swiperWrapper)

        // Слайды
        for(let count = 0; count < 3; count++) {
            let swiperSlide = createDOMElement('div', 'swiper-slide')
            let slideImg = createDOMElement('img', 'slide-image')
            slideImg.src = db.banners.src[count]
            swiperSlide.append(slideImg)
            swiperWrapper.append(swiperSlide)
        }

        // Пагинация
        const pagination = createDOMElement('div', 'swiper-pagination')
        divSwiper.append(pagination)

        // Кнопки
        const buttonPrev = createDOMElement('div', 'swiper-button-prev')
        const buttonNext = createDOMElement('div', 'swiper-button-next')
        divSwiper.append(buttonPrev, buttonNext)
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
    for(let i = 0; i < 4; i++) {
        let dbProduct = db.products[category][i]
        console.log(dbProduct)
        let product = createProduct(dbProduct)
        compContent.append(product)
    }
    comp.append(compContent)

}
function createProduct(dbProduct) {
    // Product-div
    const product = createDOMElement('div', 'product')
    
    //product-image 
    const productImage = createDOMElement('img', 'product__image')
    productImage.src = dbProduct.imgURL
    product.append(productImage)

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
                    //product-page__bucket
                    const productPageBucket = createDOMElement('button', 'product-page__bucket')
                    productPageBucket.textContent = 'Добавить в корзину'
                    productPageActions.append(productPageBucket)
                    //product-page__favorite
                    const productPageFavorite = createDOMElement('button', 'product-page__favorite')
                    productPageFavorite.textContent = 'Добавить в избранное'
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



{// Анимация выпадения подсказок в поиске
searchBarInput.addEventListener('focus', () => {
    searchMenu.classList.toggle('hide')
})
searchBarInput.addEventListener('blur', () => {
    searchMenu.classList.toggle('hide')
})
}


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

