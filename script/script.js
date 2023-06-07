// Assets
const doc = document
const body = doc.body
const header = doc.querySelector('.header')
const main = doc.querySelector('.main')
const footer = doc.querySelector('.footer')
const arrow = createDOMElement('span', 'material-icons')
arrow.textContent = 'navigate_next'
let allProducts = [];
let windowWidth = window.innerWidth
console.log(windowWidth);
const yakor = doc.querySelector('.yakor')

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
    window.scrollTo(0,0)
}
function addScript() {
    const swiperScript = createDOMElement('script', '')
    swiperScript.scr = 'https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js'
    body.append(swiperScript)
}


const categories = doc.querySelectorAll('.category')
const catalogSub = doc.querySelector('.catalog__subcategories')


// get current window width 
window.onresize = () => {
    windowWidth = window.innerWidth
}


// ---------------------------------------------HEADER-------------------------------------------------

// изменение лого при экране < 576px 
const logo = doc.querySelector('.logo')
if(windowWidth < 576) {
    logo.src = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 346 113.06'%3e%3cdefs%3e%3cstyle%3e.cls-1%7bfill:%237000ff;%7d%3c/style%3e%3c/defs%3e%3cg id='Layer_2' data-name='Layer 2'%3e%3cg id='Layer_1-2' data-name='Layer 1'%3e%3cpath class='cls-1' d='M229.12,35.78c0,4.41-2.49,6.45-6.2,6.45s-6.11-2-6.11-6.45V21.23h-8V36.07c0,9.66,8.1,13.45,14.18,13.45s14.17-3.79,14.17-13.45V21.23h-8Z'/%3e%3cpolygon class='cls-1' points='202.04 27.98 202.04 21.23 176.04 21.23 176.04 27.98 191.43 27.98 175.42 42.26 175.42 49.01 203 49.01 203 42.26 186.06 42.26 202.04 27.98'/%3e%3cpath class='cls-1' d='M277.44,20.69c-5.06,0-8.88,2.06-10.78,5.2-1.92-3.14-6.11-5.2-10.47-5.2-8.54,0-12.95,5.46-12.95,12.18V49h8V34c0-3.22,1.7-6.05,5.58-6.05a5.6,5.6,0,0,1,5.91,5.94V49h8V33.89c0-3.22,1.89-5.94,5.74-5.94s5.69,2.83,5.69,6.05V49h8V32.87c0-6.72-4.13-12.18-12.73-12.18'/%3e%3cpath class='cls-1' d='M162.15,35.78c0,4.41-2.49,6.45-6.17,6.45s-6.14-2-6.14-6.45V21.23h-8V36.07c0,9.66,8.07,13.45,14.18,13.45s14.14-3.79,14.14-13.45V21.23h-8Z'/%3e%3cpath class='cls-1' d='M113.4,56.56A56.7,56.7,0,1,1,56.7,0a56.59,56.59,0,0,1,56.7,56.56M63.21,19.64q-3.19-.29-6.51-.28c-2.18,0-4.36.09-6.48.28V49.8h13Zm30,17.59a106.94,106.94,0,0,0-14.49-3.65V58.91c0,18.23-7.75,27.81-22,27.81s-22-9.58-22-27.81V33.58A106.2,106.2,0,0,0,20.2,37.23V59.05a36.52,36.52,0,0,0,73,0Z'/%3e%3cpath class='cls-1' d='M176,63.4c-5.06,0-8.88,2.06-10.78,5.17-1.92-3.11-6.11-5.17-10.47-5.17-8.57,0-13,5.43-13,12.15V91.69h8v-15c0-3.2,1.7-6,5.57-6a5.57,5.57,0,0,1,5.89,5.93V91.69h8V76.57c0-3.22,1.9-5.93,5.75-5.93s5.68,2.85,5.68,6v15h8V75.55c0-6.72-4.13-12.15-12.73-12.15'/%3e%3cpath class='cls-1' d='M225.39,81.94h0v-18h-7.92l.06,4.38c-1.73-2.57-4.76-4.92-10.13-4.92-9.25,0-14,7.18-14,14.39-.17,7.29,5.21,14.55,13.61,14.55,4.45,0,8.52-2,10.47-5.45a6.85,6.85,0,0,0,6.91,4.8H229V85h-1.27c-1.62,0-2.3-.6-2.3-3m-16.32,3.45c-4.56,0-7.95-3.14-7.95-7.55s3.39-7.43,7.95-7.43,8.09,3.08,8.09,7.43-3.39,7.55-8.09,7.55'/%3e%3cpath class='cls-1' d='M235.74,73.41V91.69h8V79.43a7.52,7.52,0,0,1,7.84-7.8h5.23V63.37h-3.93c-4.84,0-8.38,4.13-9.14,6.53v-6h-8Z'/%3e%3cpolygon class='cls-1' points='261.69 91.69 269.69 91.69 269.69 78.1 282.14 91.69 291.59 91.69 278.69 77.42 290.6 63.94 281.18 63.94 269.69 76.94 269.69 55.34 261.69 55.34 261.69 91.69'/%3e%3cpath class='cls-1' d='M300.57,80c0,3.06,1.59,6.14,6.71,6.14,4.69,0,5.37-2.83,5.37-2.83h8.8s-.82,9-14.17,9c-9.31,0-15.14-5.2-15.14-14.5S298,63.4,307.19,63.4s14.94,5.14,14.94,14.44A16.89,16.89,0,0,1,322,80Zm.12-4.89h12.9c0-2.26-1.3-5.48-6.4-5.48s-6.5,3.22-6.5,5.48'/%3e%3cpath class='cls-1' d='M341.05,84.73c-2.74,0-3.73-1.22-3.73-5.09V69.86H346V63.42h-8.68V57.88H333l-7.73,7.37v4.61h4.05V80.69c0,7.77,3.79,11,11.74,11H346v-7Z'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e"
}else {
    logo.src = "data:image/svg+xml,%3csvg width='215' height='32' viewBox='0 0 215 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cg clip-path='url(%23clip0_264_8440)'%3e %3cpath d='M184.63 9.9482H189.047L183.466 16.2628L189.509 22.9514H185.081L179.25 16.5839V22.9514H175.5V5.92307H179.25V16.0406L184.63 9.9482Z' fill='%237000FF'/%3e %3cpath d='M167.097 12.7422V9.94467H163.347V22.9479H167.097V17.2047C167.097 14.9787 168.713 13.55 170.769 13.55H173.221V9.66951H171.38C169.101 9.68009 167.453 11.6133 167.097 12.7422Z' fill='%237000FF'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M158.496 9.94467V18.383C158.496 19.5189 158.817 19.7976 159.576 19.7941H160.169V22.9479H158.02C157.307 22.9842 156.603 22.7825 156.017 22.3744C155.431 21.9663 154.998 21.375 154.785 20.6937C153.872 22.3235 151.963 23.2513 149.882 23.2513C145.945 23.2513 143.426 19.847 143.507 16.4322C143.507 13.0561 145.733 9.69067 150.069 9.69067C152.587 9.69067 154.006 10.7913 154.813 11.9943L154.785 9.94467H158.496ZM147.127 16.471C147.127 18.5276 148.732 19.9987 150.848 19.9987C153.05 19.9987 154.641 18.51 154.641 16.471C154.641 14.4319 153.05 12.9891 150.848 12.9891C148.718 12.9891 147.127 14.4143 147.127 16.471Z' fill='%237000FF'/%3e %3cpath d='M130.328 12.1178C131.217 10.6608 133.005 9.6942 135.376 9.6942C139.408 9.6942 141.341 12.2377 141.341 15.388V22.9408H137.591V15.9065C137.591 14.4214 136.73 13.0843 134.928 13.0843C133.125 13.0843 132.236 14.3543 132.236 15.8642V22.962H128.472V15.8748C128.472 14.3649 127.527 13.0949 125.713 13.0949C123.9 13.0949 123.103 14.4214 123.103 15.9171V22.9514H119.353V15.388C119.353 12.2377 121.406 9.6942 125.424 9.6942C127.463 9.6942 129.424 10.6608 130.328 12.1178Z' fill='%237000FF'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M196.818 9.6942C192.497 9.6942 189.763 12.1036 189.763 16.4604C189.763 20.8171 192.493 23.2548 196.853 23.2548C203.112 23.2548 203.496 19.0215 203.496 19.0215H199.376C199.376 19.0215 199.058 20.3444 196.857 20.3444C194.458 20.3444 193.717 18.9016 193.717 17.4728H203.736C203.785 17.1386 203.812 16.8016 203.817 16.4639C203.817 12.1036 201.073 9.6942 196.818 9.6942ZM193.77 15.1763C193.77 14.118 194.476 12.6081 196.818 12.6081C199.161 12.6081 199.813 14.118 199.813 15.1763H193.77Z' fill='%237000FF'/%3e %3cpath d='M215 9.70126V12.721L210.915 12.7316V17.3176C210.915 19.1309 211.395 19.6988 212.679 19.6988H215V22.9831H212.679C208.943 22.9831 207.179 21.4486 207.179 17.808V12.7351H205.285V10.5761L208.904 7.12249H210.929V9.70126H215Z' fill='%237000FF'/%3e %3cpath d='M103.623 9.68008C101.249 9.68008 99.4607 10.6467 98.5717 12.1177C97.6721 10.6467 95.7107 9.68008 93.6682 9.68008C89.6642 9.68008 87.597 12.2377 87.597 15.3879V22.9514H91.3505V15.9171C91.3505 14.4072 92.1442 13.0949 93.961 13.0949C95.7778 13.0949 96.7302 14.3649 96.7302 15.8748V22.962H100.48V15.8642C100.48 14.3543 101.369 13.0843 103.172 13.0843C104.975 13.0843 105.835 14.4072 105.835 15.9065V22.9408H109.585V15.3879C109.585 12.2377 107.652 9.68008 103.623 9.68008Z' fill='%237000FF'/%3e %3cpath d='M68.3003 9.93408V13.0985L60.8109 19.787H68.7483V22.9514H55.8263V19.787L63.3297 13.0985H56.1191V9.93408H68.3003Z' fill='%237000FF'/%3e %3cpath d='M78.0827 19.7729C79.8183 19.7729 80.9825 18.8169 80.9825 16.7532V9.94467H84.736V16.8943C84.736 21.4345 80.9401 23.1983 78.0933 23.1983C75.2464 23.1983 71.4541 21.4239 71.4541 16.8943V9.94467H75.2182V16.7532C75.2182 18.8169 76.347 19.7729 78.0827 19.7729Z' fill='%237000FF'/%3e %3cpath d='M46.7212 19.7729C48.4427 19.7729 49.6104 18.8169 49.6104 16.7532V9.94467H53.3604V16.8943C53.3604 21.4345 49.5575 23.1983 46.7353 23.1983C43.8708 23.1983 40.0926 21.4239 40.0926 16.8943V9.94467H43.8461V16.7532C43.8461 18.8169 44.9997 19.7729 46.7212 19.7729Z' fill='%237000FF'/%3e %3cpath d='M31.9896 16.0053C31.9889 19.1704 31.0498 22.2643 29.2912 24.8955C27.5326 27.5268 25.0334 29.5772 22.1098 30.7875C19.1861 31.9978 15.9693 32.3135 12.8663 31.6949C9.76321 31.0762 6.91327 29.5508 4.6769 27.3117C2.44053 25.0726 0.918195 22.2204 0.302449 19.1158C-0.313297 16.0111 0.00520068 12.7936 1.21766 9.87001C2.43012 6.94646 4.48208 4.44826 7.114 2.6914C9.74592 0.934529 12.8396 -0.00208978 16.0037 3.50108e-06C18.1047 -0.000924639 20.1854 0.412484 22.1266 1.21658C24.0679 2.02068 25.8316 3.1997 27.317 4.68621C28.8023 6.17271 29.9802 7.93754 30.7831 9.87977C31.5861 11.822 31.9985 13.9035 31.9966 16.0053H31.9896ZM17.8304 5.5597C17.2309 5.50326 16.6173 5.47856 15.9966 5.47856C15.3759 5.47856 14.7658 5.50326 14.1663 5.5597V14.0933H17.8304V5.5597ZM26.2942 10.5338C24.9588 10.0949 23.5942 9.7507 22.2104 9.5037V16.672C22.2104 21.8296 20.0239 24.5424 15.9931 24.5424C11.9622 24.5424 9.78282 21.8296 9.78282 16.672V9.5037C8.39801 9.75113 7.03224 10.0953 5.69554 10.5338V16.7108C5.67022 18.0799 5.9179 19.4402 6.42412 20.7124C6.93033 21.9845 7.68493 23.143 8.64382 24.1201C9.60271 25.0973 10.7467 25.8734 12.0088 26.4033C13.271 26.9331 14.6261 27.206 15.9949 27.206C17.3637 27.206 18.7187 26.9331 19.9809 26.4033C21.2431 25.8734 22.387 25.0973 23.3459 24.1201C24.3048 23.143 25.0594 21.9845 25.5656 20.7124C26.0718 19.4402 26.3195 18.0799 26.2942 16.7108V10.5338Z' fill='%237000FF'/%3e %3c/g%3e %3cdefs%3e %3cclipPath id='clip0_264_8440'%3e %3crect width='215' height='32' fill='white'/%3e %3c/clipPath%3e %3c/defs%3e %3c/svg%3e"
}
window.addEventListener('resize', () => {
    windowWidth = window.innerWidth

    if(windowWidth < 576) {
        logo.src = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 346 113.06'%3e%3cdefs%3e%3cstyle%3e.cls-1%7bfill:%237000ff;%7d%3c/style%3e%3c/defs%3e%3cg id='Layer_2' data-name='Layer 2'%3e%3cg id='Layer_1-2' data-name='Layer 1'%3e%3cpath class='cls-1' d='M229.12,35.78c0,4.41-2.49,6.45-6.2,6.45s-6.11-2-6.11-6.45V21.23h-8V36.07c0,9.66,8.1,13.45,14.18,13.45s14.17-3.79,14.17-13.45V21.23h-8Z'/%3e%3cpolygon class='cls-1' points='202.04 27.98 202.04 21.23 176.04 21.23 176.04 27.98 191.43 27.98 175.42 42.26 175.42 49.01 203 49.01 203 42.26 186.06 42.26 202.04 27.98'/%3e%3cpath class='cls-1' d='M277.44,20.69c-5.06,0-8.88,2.06-10.78,5.2-1.92-3.14-6.11-5.2-10.47-5.2-8.54,0-12.95,5.46-12.95,12.18V49h8V34c0-3.22,1.7-6.05,5.58-6.05a5.6,5.6,0,0,1,5.91,5.94V49h8V33.89c0-3.22,1.89-5.94,5.74-5.94s5.69,2.83,5.69,6.05V49h8V32.87c0-6.72-4.13-12.18-12.73-12.18'/%3e%3cpath class='cls-1' d='M162.15,35.78c0,4.41-2.49,6.45-6.17,6.45s-6.14-2-6.14-6.45V21.23h-8V36.07c0,9.66,8.07,13.45,14.18,13.45s14.14-3.79,14.14-13.45V21.23h-8Z'/%3e%3cpath class='cls-1' d='M113.4,56.56A56.7,56.7,0,1,1,56.7,0a56.59,56.59,0,0,1,56.7,56.56M63.21,19.64q-3.19-.29-6.51-.28c-2.18,0-4.36.09-6.48.28V49.8h13Zm30,17.59a106.94,106.94,0,0,0-14.49-3.65V58.91c0,18.23-7.75,27.81-22,27.81s-22-9.58-22-27.81V33.58A106.2,106.2,0,0,0,20.2,37.23V59.05a36.52,36.52,0,0,0,73,0Z'/%3e%3cpath class='cls-1' d='M176,63.4c-5.06,0-8.88,2.06-10.78,5.17-1.92-3.11-6.11-5.17-10.47-5.17-8.57,0-13,5.43-13,12.15V91.69h8v-15c0-3.2,1.7-6,5.57-6a5.57,5.57,0,0,1,5.89,5.93V91.69h8V76.57c0-3.22,1.9-5.93,5.75-5.93s5.68,2.85,5.68,6v15h8V75.55c0-6.72-4.13-12.15-12.73-12.15'/%3e%3cpath class='cls-1' d='M225.39,81.94h0v-18h-7.92l.06,4.38c-1.73-2.57-4.76-4.92-10.13-4.92-9.25,0-14,7.18-14,14.39-.17,7.29,5.21,14.55,13.61,14.55,4.45,0,8.52-2,10.47-5.45a6.85,6.85,0,0,0,6.91,4.8H229V85h-1.27c-1.62,0-2.3-.6-2.3-3m-16.32,3.45c-4.56,0-7.95-3.14-7.95-7.55s3.39-7.43,7.95-7.43,8.09,3.08,8.09,7.43-3.39,7.55-8.09,7.55'/%3e%3cpath class='cls-1' d='M235.74,73.41V91.69h8V79.43a7.52,7.52,0,0,1,7.84-7.8h5.23V63.37h-3.93c-4.84,0-8.38,4.13-9.14,6.53v-6h-8Z'/%3e%3cpolygon class='cls-1' points='261.69 91.69 269.69 91.69 269.69 78.1 282.14 91.69 291.59 91.69 278.69 77.42 290.6 63.94 281.18 63.94 269.69 76.94 269.69 55.34 261.69 55.34 261.69 91.69'/%3e%3cpath class='cls-1' d='M300.57,80c0,3.06,1.59,6.14,6.71,6.14,4.69,0,5.37-2.83,5.37-2.83h8.8s-.82,9-14.17,9c-9.31,0-15.14-5.2-15.14-14.5S298,63.4,307.19,63.4s14.94,5.14,14.94,14.44A16.89,16.89,0,0,1,322,80Zm.12-4.89h12.9c0-2.26-1.3-5.48-6.4-5.48s-6.5,3.22-6.5,5.48'/%3e%3cpath class='cls-1' d='M341.05,84.73c-2.74,0-3.73-1.22-3.73-5.09V69.86H346V63.42h-8.68V57.88H333l-7.73,7.37v4.61h4.05V80.69c0,7.77,3.79,11,11.74,11H346v-7Z'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e"
    }else {
        logo.src = "data:image/svg+xml,%3csvg width='215' height='32' viewBox='0 0 215 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cg clip-path='url(%23clip0_264_8440)'%3e %3cpath d='M184.63 9.9482H189.047L183.466 16.2628L189.509 22.9514H185.081L179.25 16.5839V22.9514H175.5V5.92307H179.25V16.0406L184.63 9.9482Z' fill='%237000FF'/%3e %3cpath d='M167.097 12.7422V9.94467H163.347V22.9479H167.097V17.2047C167.097 14.9787 168.713 13.55 170.769 13.55H173.221V9.66951H171.38C169.101 9.68009 167.453 11.6133 167.097 12.7422Z' fill='%237000FF'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M158.496 9.94467V18.383C158.496 19.5189 158.817 19.7976 159.576 19.7941H160.169V22.9479H158.02C157.307 22.9842 156.603 22.7825 156.017 22.3744C155.431 21.9663 154.998 21.375 154.785 20.6937C153.872 22.3235 151.963 23.2513 149.882 23.2513C145.945 23.2513 143.426 19.847 143.507 16.4322C143.507 13.0561 145.733 9.69067 150.069 9.69067C152.587 9.69067 154.006 10.7913 154.813 11.9943L154.785 9.94467H158.496ZM147.127 16.471C147.127 18.5276 148.732 19.9987 150.848 19.9987C153.05 19.9987 154.641 18.51 154.641 16.471C154.641 14.4319 153.05 12.9891 150.848 12.9891C148.718 12.9891 147.127 14.4143 147.127 16.471Z' fill='%237000FF'/%3e %3cpath d='M130.328 12.1178C131.217 10.6608 133.005 9.6942 135.376 9.6942C139.408 9.6942 141.341 12.2377 141.341 15.388V22.9408H137.591V15.9065C137.591 14.4214 136.73 13.0843 134.928 13.0843C133.125 13.0843 132.236 14.3543 132.236 15.8642V22.962H128.472V15.8748C128.472 14.3649 127.527 13.0949 125.713 13.0949C123.9 13.0949 123.103 14.4214 123.103 15.9171V22.9514H119.353V15.388C119.353 12.2377 121.406 9.6942 125.424 9.6942C127.463 9.6942 129.424 10.6608 130.328 12.1178Z' fill='%237000FF'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M196.818 9.6942C192.497 9.6942 189.763 12.1036 189.763 16.4604C189.763 20.8171 192.493 23.2548 196.853 23.2548C203.112 23.2548 203.496 19.0215 203.496 19.0215H199.376C199.376 19.0215 199.058 20.3444 196.857 20.3444C194.458 20.3444 193.717 18.9016 193.717 17.4728H203.736C203.785 17.1386 203.812 16.8016 203.817 16.4639C203.817 12.1036 201.073 9.6942 196.818 9.6942ZM193.77 15.1763C193.77 14.118 194.476 12.6081 196.818 12.6081C199.161 12.6081 199.813 14.118 199.813 15.1763H193.77Z' fill='%237000FF'/%3e %3cpath d='M215 9.70126V12.721L210.915 12.7316V17.3176C210.915 19.1309 211.395 19.6988 212.679 19.6988H215V22.9831H212.679C208.943 22.9831 207.179 21.4486 207.179 17.808V12.7351H205.285V10.5761L208.904 7.12249H210.929V9.70126H215Z' fill='%237000FF'/%3e %3cpath d='M103.623 9.68008C101.249 9.68008 99.4607 10.6467 98.5717 12.1177C97.6721 10.6467 95.7107 9.68008 93.6682 9.68008C89.6642 9.68008 87.597 12.2377 87.597 15.3879V22.9514H91.3505V15.9171C91.3505 14.4072 92.1442 13.0949 93.961 13.0949C95.7778 13.0949 96.7302 14.3649 96.7302 15.8748V22.962H100.48V15.8642C100.48 14.3543 101.369 13.0843 103.172 13.0843C104.975 13.0843 105.835 14.4072 105.835 15.9065V22.9408H109.585V15.3879C109.585 12.2377 107.652 9.68008 103.623 9.68008Z' fill='%237000FF'/%3e %3cpath d='M68.3003 9.93408V13.0985L60.8109 19.787H68.7483V22.9514H55.8263V19.787L63.3297 13.0985H56.1191V9.93408H68.3003Z' fill='%237000FF'/%3e %3cpath d='M78.0827 19.7729C79.8183 19.7729 80.9825 18.8169 80.9825 16.7532V9.94467H84.736V16.8943C84.736 21.4345 80.9401 23.1983 78.0933 23.1983C75.2464 23.1983 71.4541 21.4239 71.4541 16.8943V9.94467H75.2182V16.7532C75.2182 18.8169 76.347 19.7729 78.0827 19.7729Z' fill='%237000FF'/%3e %3cpath d='M46.7212 19.7729C48.4427 19.7729 49.6104 18.8169 49.6104 16.7532V9.94467H53.3604V16.8943C53.3604 21.4345 49.5575 23.1983 46.7353 23.1983C43.8708 23.1983 40.0926 21.4239 40.0926 16.8943V9.94467H43.8461V16.7532C43.8461 18.8169 44.9997 19.7729 46.7212 19.7729Z' fill='%237000FF'/%3e %3cpath d='M31.9896 16.0053C31.9889 19.1704 31.0498 22.2643 29.2912 24.8955C27.5326 27.5268 25.0334 29.5772 22.1098 30.7875C19.1861 31.9978 15.9693 32.3135 12.8663 31.6949C9.76321 31.0762 6.91327 29.5508 4.6769 27.3117C2.44053 25.0726 0.918195 22.2204 0.302449 19.1158C-0.313297 16.0111 0.00520068 12.7936 1.21766 9.87001C2.43012 6.94646 4.48208 4.44826 7.114 2.6914C9.74592 0.934529 12.8396 -0.00208978 16.0037 3.50108e-06C18.1047 -0.000924639 20.1854 0.412484 22.1266 1.21658C24.0679 2.02068 25.8316 3.1997 27.317 4.68621C28.8023 6.17271 29.9802 7.93754 30.7831 9.87977C31.5861 11.822 31.9985 13.9035 31.9966 16.0053H31.9896ZM17.8304 5.5597C17.2309 5.50326 16.6173 5.47856 15.9966 5.47856C15.3759 5.47856 14.7658 5.50326 14.1663 5.5597V14.0933H17.8304V5.5597ZM26.2942 10.5338C24.9588 10.0949 23.5942 9.7507 22.2104 9.5037V16.672C22.2104 21.8296 20.0239 24.5424 15.9931 24.5424C11.9622 24.5424 9.78282 21.8296 9.78282 16.672V9.5037C8.39801 9.75113 7.03224 10.0953 5.69554 10.5338V16.7108C5.67022 18.0799 5.9179 19.4402 6.42412 20.7124C6.93033 21.9845 7.68493 23.143 8.64382 24.1201C9.60271 25.0973 10.7467 25.8734 12.0088 26.4033C13.271 26.9331 14.6261 27.206 15.9949 27.206C17.3637 27.206 18.7187 26.9331 19.9809 26.4033C21.2431 25.8734 22.387 25.0973 23.3459 24.1201C24.3048 23.143 25.0594 21.9845 25.5656 20.7124C26.0718 19.4402 26.3195 18.0799 26.2942 16.7108V10.5338Z' fill='%237000FF'/%3e %3c/g%3e %3cdefs%3e %3cclipPath id='clip0_264_8440'%3e %3crect width='215' height='32' fill='white'/%3e %3c/clipPath%3e %3c/defs%3e %3c/svg%3e"
    }
})

// главная при клике на лого
logo.onclick = () => {
    renderMain()
    console.log('lol')
}

//------------------Burger--------------------

const burgerButton = doc.querySelector('.burger')
const burgerMenu = doc.querySelector('.burger-menu')
const burgerClose = doc.querySelector('.menu__close')
burgerButton.addEventListener('click', () => {
    burgerMenu.classList.remove('hide')
    main.style = 'display:none;'
    footer.style = 'display:none;'
})
burgerClose.addEventListener('click', () => {
    burgerMenu.classList.add('hide')
    main.style = 'dispaly:block;'
    footer.style = 'display:flex;'
})

const burgerProfile = doc.querySelector('.burger-profile')
burgerProfile.onclick = () => {
    if(currentAccount) {
        burgerMenu.classList.add('hide')
        main.style.display = 'block'
        footer.style.display = 'flex'
        renderAccountPage()
    }else {
        burgerMenu.classList.add('hide')
        main.style.display = 'block'
        footer.style.display = 'flex'
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
        footer.style.display = 'flex'
        console.log('worked')
    }
}


//search-bar
const searchBar = doc.querySelector('.search-bar')
const searchBarInput = doc.querySelector('.search-bar input')
const searchBarButton = doc.querySelector('.search__button')
const searchMenu = doc.querySelector('.search-menu')
{// Анимация выпадения подсказок в поиске
searchBarInput.addEventListener('focus', () => {
    searchMenu.classList.remove('hide')
})
main.onclick = () => {
    searchMenu.classList.add('hide')
}

}

{// Поиск товаров при нажатии на кнопку поиска
    searchBarButton.onclick = (event) => {
        event.preventDefault()
        console.log(searchBarInput.value);
        renderSearchPage(allProducts, false, searchBarInput.value)
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
                    renderProductPage(allProducts[newSuggestion.id - 1])
                    
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

window.addEvent 

let searchBarAdaptSuggestion = doc.querySelector('.request')
const searchBarBottom = doc.querySelector('.search-bar__bottom')
// Добавление подсказок
searchBarAdaptInput.addEventListener('input', () => {
    // Обнуляем после каждого ввода
    let allReq = doc.querySelectorAll('.request')
    allReq.forEach(request => {
        request.remove()
    })
    // Создаём Regex
    let regex = new RegExp(searchBarAdaptInput.value, 'gi')
    
    // Получаем совпадения
    for(let product of allProducts) {
        if(product.name.match(regex)) {
            allReq = doc.querySelectorAll('.request')
            console.log(allReq.length)
            if(allReq.length < 5) {
                let newSuggestion = searchBarAdaptSuggestion.cloneNode(true)
                newSuggestion.children[1].textContent = product.name
                newSuggestion.id = product.id
                newSuggestion.addEventListener('click', () => {
                    clearMain()
                    renderProductPage(allProducts[newSuggestion.id])
                    
                    searchBarAdapt.classList.remove('search-bar-adapt__focus')
                    searchBarClose.style = 'display:none;'
                })
                searchBarBottom.append(newSuggestion)
            }
            
        }
    }
})

// Искать при нажатии на enter 
searchBarAdaptInput.addEventListener('keypress', (event) => {
    
    if(event.key === 'Enter') {
        console.log('worked');

        renderSearchPage(allProducts, false, searchBarAdaptInput.value)

        searchBarAdapt.classList.remove('search-bar-adapt__focus')
        searchBarClose.style.display = 'none'
    } 
})


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

    renderSwiper()
    renderCompilation('Электроника', 'electronics')
    renderBanner(0)

    
    renderCompilation('Бытовая техника', 'appliances')
    renderBanner(1)

    renderCompilation('Обувь', 'shoes')
    renderBanner(3)

    renderCompilation('Одежда', 'clothes')

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
    console.log(category);
    compHeading.onclick = () => {
        renderSearchPage(category)
    }     
    compHeading.append(arrow)
    comp.append(compHeading)
    
    // Товары
    const compContent = createDOMElement('div', 'comp__content')

    // Добавление товаров
    for(let i = 0; i < 5; i++) {
        let dbProduct = db.products[category][i]
        let product = createProduct(dbProduct)
        compContent.append(product)
    }
    comp.append(compContent)


    // Кнопка 'ещё'
    const compMore = createDOMElement('button', 'comp__more')
    compMore.textContent = 'ещё'
    compMore.onclick = () => {
        // Если колво товаров равно 5 - добавить
        if(compContent.children.length == 5) {
            for(let i = 5; i < 10; i++) {
                let dbProduct = db.products[category][i]
                let product = createProduct(dbProduct)
                compContent.append(product)
            }
            compMore.textContent = 'скрыть'
        }else {
            for(let i = 9; i > 4; i--) {
                compContent.children[i].remove()
            }
            compMore.textContent = 'ещё'
        }
        
    }
    comp.append(compMore)
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

            if(addToUser(dbProduct, 'basket')) {
                // Менять значки на кнопке после нажатия
                if(productSetBasket.textContent == '+') {
                    alert('Продукт успешно добавлен в корзину')
                    productSetBasket.textContent = '-'
                }
                else {
                    alert('Продукт успешно удален из корзины')
                    productSetBasket.textContent = '+'
                } 
            }

            
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

            if(addToUser(dbProduct, 'favorites')) {
                // Менять значки на кнопке после нажатия
                if(productSetFavorite.textContent == 'favorite_border') {
                    alert('Продукт успешно добавлен в избранное')
                    productSetFavorite.textContent = 'favorite'
                }
                else {
                    alert('Продукт успешно удален из избранных')
                    productSetFavorite.textContent = 'favorite_border'
                }
            }

            
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

        return true
    }else {
        showHideModal()

        return false
    }
}
// Product page

function renderProductPage (product) {
    clearMain()
    // Product page
    const productPage = createDOMElement('div', 'product-page')
    main.append(productPage)

        // nav
        const productPageNav = createDOMElement('div', 'search-page__nav')
        productPage.append(productPageNav)
            const home = createDOMElement('span', '')
            home.textContent = 'Главная'
            home.addEventListener('click', renderMain)
            const allCategories = createDOMElement('span', '')
            allCategories.textContent = 'Все категории'
            allCategories.addEventListener('click', () => {
                renderSearchPage(allProducts)
            })
            let currentCategory;
            const currentCategorySpan = createDOMElement('span', '')
            if(product.id <= 10) {
                currentCategorySpan.textContent = 'Электроника'
                currentCategory = 'electronics'
                currentCategorySpan.onclick = () => {
                    renderSearchPage(currentCategory)
                }
            }
            else if (product.id <= 20) {
                currentCategorySpan.textContent = 'Бытовая техника'
                currentCategory = 'appliances'
                currentCategorySpan.onclick = () => {
                    renderSearchPage('appliances')
                }
            }
            else if (product.id <= 30) {
                currentCategorySpan.textContent = 'Одежда'
                currentCategory = 'clothes'
                currentCategorySpan.onclick = () => {
                    renderSearchPage('appliances')
                }
            }
            else if (product.id <= 50) {
                currentCategorySpan.textContent = 'Аксессуары'
                currentCategory = 'accessories'
                currentCategorySpan.onclick = () => {
                    renderSearchPage('appliances')
                }
                
            }
            else if (product.id <= 60) {
                currentCategorySpan.textContent = 'Красота'
                currentCategory = 'beauty'
                currentCategorySpan.onclick = () => {
                    renderSearchPage('appliances')
                }
            }
            else if (product.id <= 70) {
                currentCategorySpan.textContent = 'Здоровье'
                currentCategory = 'health'
                currentCategorySpan.onclick = () => {
                    renderSearchPage('appliances')
                }
            }
            else if (product.id <= 80) {
                currentCategorySpan.textContent = 'Товары для дома'
                currentCategory = 'home'
                currentCategorySpan.onclick = () => {
                    renderSearchPage('appliances')
                }
            }
            else if (product.id <= 90) {
                currentCategorySpan.textContent = 'Строительство и ремонт'
                currentCategory = 'repair'
                currentCategorySpan.onclick = () => {
                    renderSearchPage('appliances')
                }
            }
            else if (product.id <= 100) {    
                currentCategorySpan.textContent = 'Автотовары'
                currentCategory = 'car'
                currentCategorySpan.onclick = () => {
                    renderSearchPage('appliances')
                }
            }

            const currentSubcategory = createDOMElement('span', '')
            currentSubcategory.textContent = product.subCategory
            currentSubcategory.onclick = () => {
                renderSearchPage(currentCategory,product.subCategory)
            }
            productPageNav.append(home,allCategories, currentCategorySpan, currentSubcategory)
        

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

                        if(addToUser(product, 'basket')) {
                            if(productPageBasket.textContent == 'Убрать из корзины') {
                                alert('Успешно удаленно из корзины')
                                productPageBasket.textContent = 'Добавить в корзину'
                            }else {
                                alert('Успешно добавлено в корзину')
                                productPageBasket.textContent = 'Убрать из корзины'
                            }
                        }
                        
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
                if(product.reviews) {
                    for(let reviewId of product.reviews) {
                        addReview(productPageReviews, db.reviews[reviewId - 1])
                    }
                }else {
                    productPageReviews.append('Нету отзывов :(')
                }
                
            productPageBottom.append(productPageReviews)

        const writeReview = createDOMElement('form', 'write-review')
        productPage.append(writeReview)
            // left (text)
            const writeReviewText = createDOMElement('textarea', 'write-text')
            writeReviewText.type = 'textarea'
            writeReviewText.placeholder = 'Введите свой отзыв'
            writeReviewText.required = true
            writeReviewText.minLength = '15'
            writeReview.append(writeReviewText)
            // right
            const writeReviewRight = createDOMElement('div', 'write-right')
            writeReview.append(writeReviewRight)  
                    //rating
                    const writeReviewRating = createDOMElement('div', 'write-rating')
                        //input
                        const input = createDOMElement ('input', '')
                        input.id = 'rating'
                        input.type = 'number'
                        input.max = '5'
                        input.min = '0'
                        input.required = true
                    
                        const label2 = createDOMElement('label', 'label')
                        label2.for = 'rating'
                        label2.textContent = 'рейтинг'
                        writeReviewRating.append(label2, input)
                    // submit
                    const writeReviewSubmit = createDOMElement('button', 'write-submit')
                    writeReview.onsubmit = (event) => {
                        event.preventDefault()

                        if(currentAccount) {
                            
                            

                            if(productPageReviews.textContent == 'Нету отзывов :(') {
                                productPageReviews.textContent = ''
                            }

                            addReview(productPageReviews, {author:currentAccount.name,rating:input.value,text:writeReviewText.value, date:date})
                        }else {
                            showHideModal()
                        }
                        

                        { // Добавляем id отзыва к объекту продукта
                            if(product.reviews) {
                                if(!product.reviews.includes(db.reviews.length + 1)) {
                                    product.reviews.push(db.reviews.length + 1)

                                    fetch('http://localhost:3000/products', {
                                    method:'PATCH',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(db.products)
                                    })
                                    .then(res => res.json())
                                    .then(res => console.log(res))
                                }

                                
                            }else {
                                product.reviews = [db.reviews.length + 1]

                                fetch('http://localhost:3000/products', {
                                    method:'PATCH',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(db.products)
                                })
                                .then(res => res.json())
                                .then(res => console.log(res))
                            }
                        }

                        {// Отправим отзыв на ДБ
                            let form = {
                            author:currentAccount.name,
                            rating:input.value,
                            text:writeReviewText.value,
                            date:date
                            }

                        fetch('http://localhost:3000/reviews', {
                            method:'POST',
                            headers: {
                                'Content-Type': 'application/json',
                             },
                            body: JSON.stringify(form)
                            })
                            .then(res => res.json())
                            .then(res => console.log(res))
                        }

                        
                    }
                    writeReviewSubmit.textContent = 'Отправить'
                    writeReviewRight.append(writeReviewRating, writeReviewSubmit)

                


        

}
const date = new Date()
const months = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь']
function addReview(reviews,reviewDB) {

        const review = createDOMElement('div', 'review')
        
            //review__author
            const reviewAuthor = createDOMElement('h3', 'review__author')
            reviewAuthor.textContent = reviewDB.author
            // div
            const div = createDOMElement('div', 'hz')
            
                //review__rating
                const reviewRating = createDOMElement('div', 'review__rating')
                    // star
                    const productRatingStar = createDOMElement('img', 'product__star');
                    productRatingStar.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Gold_Star.svg/2048px-Gold_Star.svg.png';
                    
                    //span inside
                    const span = createDOMElement('span', '')
                    span.textContent = reviewDB.rating
                reviewRating.append(productRatingStar, span)
                //review__date
                const reviewDate = createDOMElement('div', 'review__date')
                let dateFromDB = new Date(reviewDB.date)
                console.log(dateFromDB, reviewDB.date);
                reviewDate.textContent = `${dateFromDB.getDate()} ${months[dateFromDB.getMonth()]} 2023 г.`
            div.append(reviewRating, reviewDate)
            //review__text
            const reviewText = createDOMElement('p', 'review__text')
            reviewText.textContent = reviewDB.text
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
    currentAccount.id = db.users.length + 2
    formData.email = '';
    formData.tel = '';
    
    db.users.push(currentAccount)

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
                
                exitAccount()
                logIn.classList.add('log-in')
                alert('Вы успешно вышли из системы!')

                renderMain()
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


function renderSearchPage(category, subcategory = false, searchWord = false) {
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

            // Адаптив
        
        const paramsButton = createDOMElement('button', 'params-button')
        // иконка на кнопке
        const span = createDOMElement('span', 'material-icons')
        span.textContent = 'settings'
        paramsButton.append(span, 'фильтры')

        paramsButton.onclick = () => {
            paramsMenu.style.display = 'flex'
            searchPage.style.display = 'none'
            footer.style.display = 'none'
        }
    navBottom.append(paramsButton)

    const paramsMenu = createDOMElement('div', 'params-menu')
    main.append(paramsMenu)

    let windowWidth = window.innerWidth
    console.log(windowWidth);
    
    if(windowWidth < 920) {
        paramsMenu.append(searchPageParams)
    }

    // Получаем ширину экрана при изменении
    window.addEventListener('resize', () => {
        windowWidth = window.innerWidth
        console.log(windowWidth);

        if(windowWidth < 920) {
            paramsMenu.append(searchPageParams)
        }
    })

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
                    renderProducts(currentCategory,false,searchWord)
                    
                    // Изменить название категории
                    currentCategoryName.textContent = subcategory.textContent
                    // Добавить название в nav 
                    let span1 = createDOMElement('span', '')
                    span1.textContent = currentCategoryName.textContent
                    searchPageNav.insertBefore(span1, navBottom)
                    span1.onclick = () => {
                        renderSearchPage(currentCategory, false, searchWord)
                    } 
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
                            renderProducts(currentCategory,subcategoryName, searchWord)

                            if(doc.querySelectorAll('.search-page__nav span').length >= 4) {
                                doc.querySelectorAll('.search-page__nav span')[3].remove()
                            }

                            // Добавить название подкатегории в nav
                            const span = createDOMElement('span', '')
                            span.textContent = subcategoryName
                            searchPageNav.insertBefore(span, navBottom)
                        })
                    }
                })
                searchPageSubcategories.append(subcategory)
            }
            
            renderProducts(allProducts,false, searchWord)
        }else {
            // Кнопка "Все категории"
            const previousCategory = createDOMElement('div', 'categories__subcategory')
            searchPageSubcategories.append(previousCategory)
                const span = createDOMElement('span', 'material-icons')
                span.textContent = 'arrow_back_ios'
                previousCategory.append(span, 'Все категории')
                previousCategory.addEventListener('click', () => {
                    renderSearchPage(allProducts)
                })

            

            // Добавление подкатегорий
            for(let subcategoryName of getSubCategories(currentCategory)) {
                let subcategory = createDOMElement('div', 'categories__subcategory')
                subcategory.textContent = subcategoryName
                searchPageSubcategories.append(subcategory)

                subcategory.addEventListener('click', () => {
                    currentSubcategory = subcategoryName
                    currentCategoryName.textContent = subcategoryName

                    renderProducts(currentCategory, subcategoryName)
            
                    if(doc.querySelectorAll('.search-page__nav span').length >= 4) {
                        doc.querySelectorAll('.search-page__nav span')[3].remove()
                    }

                    // Добавить название подкатегории в nav
                    const span = createDOMElement('span', '')
                    span.textContent = subcategoryName
                    searchPageNav.insertBefore(span, navBottom)
                })
            }

            // Показ товаров
            renderProducts(currentCategory, currentSubcategory, searchWord)
            

            
            

            

            

            if(category == 'electronics') {
                currentCategoryName.textContent = 'Электроника'
            }
            else if(category == 'appliances') {
                currentCategoryName.textContent = 'Бытовая техника'
            }
            else if(category == 'clothes') {
                currentCategoryName.textContent = 'Одежда'
            }
            else if(category == 'shoes') {
                currentCategoryName.textContent = 'Обувь'
            }
            else if(category == 'accessories') {
                currentCategoryName.textContent = 'Аксессуары'
            }
            else if(category == 'beauty') {
                currentCategoryName.textContent = 'Красота'
            }
            else if(category == 'health') {
                currentCategoryName.textContent = 'Здоровье'
            }
            else if(category == 'home') {
                currentCategoryName.textContent = 'Товары для дома'
            }
            else if(category == 'repair') {
                currentCategoryName.textContent = 'Строительство и ремонт'
            }
            else if(category == 'car') {
                currentCategoryName.textContent = 'Автотовары'
            }
            else {
                console.log('none');
            }
            // добавить название категории в nav
            const navSpan = createDOMElement('span', '')
                navSpan.textContent = currentCategoryName.textContent
                searchPageNav.insertBefore(navSpan, navBottom)
                navSpan.addEventListener('click', () => {
                    renderSearchPage(category)
                    console.log('clicked');
                })

            // Добавить название подкатегории в nav
            if(currentSubcategory) {
                // Добавить название подкатегории в nav
                const span = createDOMElement('span', '')
                span.textContent = currentSubcategory
                searchPageNav.insertBefore(span, navBottom)
                currentCategoryName.textContent = currentSubcategory
            }
        }
        
        
        
      
    function renderProducts(category, subcategory = false, searchWord = false) {
        // Очистим searchProducts
        searchPageProducts.textContent = ''

        // Адаптив
        if(paramsMenu){
            paramsMenu.style.display = 'none'
            searchPage.style.display = 'block'
        }

        // Достаём продукты
        let products = getProducts(category,[+minInput.value, +maxInput.value], subcategory, searchWord)
        // Показываем их
        for(let product of products) {
            product = createProduct(product)
            searchPageProducts.append(product)
        }

        
    }
    function getProducts(category, price, subcategory, searchWord) {
        // Проверяем значения необязательных параметров
        if(isNaN(price[0])) price = [0, 9999999]

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
        console.log('По цене: ' + filteredProducts);

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

        if(searchWord) {
            // Фильтруем по поиску
            let searchRegexp = new RegExp(searchWord, 'gi')
            for(let i = 0; i < filteredProducts.length; i++) {
                let product = filteredProducts[i]
                if(!product.name.match(searchRegexp)) {
                    filteredProducts.splice(i,1)
                    i--
                }else {
                    
                }
            }
        }


        // Возвращаем продукты
        return filteredProducts
    }
    
}


if(window.pageYOffset > 200) {
    yakor.style.bottom = '10px'
}else {
    yakor.style.bottom = '-100px'
}

yakor.onclick = () => {
    window.scrollTo({
        top:0,
        left:0,
        behavior:"smooth"
    })
}

window.onscroll = () => {
    if(window.pageYOffset > 200) {
        yakor.style.bottom = '10px'
    }else {
        yakor.style.bottom = '-100px'
    }
}



// footer
const columnHeadings = doc.querySelectorAll('.column-heading')
for(let heading of columnHeadings) {
    heading.addEventListener('click', () => {
        if(windowWidth < 768) {
            heading.parentElement.classList.toggle('opened')
        }  
    })
    
    
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
        renderMain()
        // renderProductPage(db.products.electronics[0])
        // renderSearchPage(allProducts)
        


        // Убрать слово "Войти" если аккаунт уже есть
        if(currentAccount) logIn.classList.remove('log-in')
    })