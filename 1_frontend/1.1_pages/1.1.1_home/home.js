class MobileNavBar {
    constructor (mobileMenu,navList){
        this.mobileMenu = document.querySelector(mobileMenu);
        this.navList = document.querySelector(navList);
        this.navLinks = document.querySelectorAll(navLinks);
        this.activeClass = "active";

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.log(this);
        this.navList.classList.toggle(this.activeClass);
    }

    addClickEvent() {
        this.mobileMenu.addEventListener("click", this.handleClick);

    }


    init() {
        if (this.mobileMenu) {
            this.addClickEvent();
        }
        return this;
        
    }
}
const MobileNavBar = new MobileNavBar(
    ".mobile-menu",
    ".nav-list",
    ".nav-list li",
);

MobileNavBar.navList

$('.carousel').carousel({
    interval: 2000
  })