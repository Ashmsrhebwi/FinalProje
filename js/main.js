var _a, _b;
/** Toggle Spin Class On Icon **/
var toggleSettingsIcon = document.querySelector(".toggle-settings .icon");
var settingBox = document.querySelector('.setting-box');
toggleSettingsIcon.onclick = function () {
    // Toggle Class fa-spin From Rotation On Self
    toggleSettingsIcon.classList.toggle('fa-spin');
    // Toggle Class Open On Main Setting Box
    settingBox.classList.toggle('open');
};
/** Switch Color **/
var colorLi = document.querySelectorAll('.colors-list li');
colorLi.forEach(function (color) {
    color.addEventListener('click', function (e) {
        var target = e.target;
        var color = target.dataset.color || '';
        document.documentElement.style.setProperty('--main-color', color);
        localStorage.setItem('color-property', color);
        handleActive(e);
    });
});
// Check If There's in Local Storage Colors Options
var mainColors = localStorage.getItem('color-property');
if (mainColors !== null) {
    document.documentElement.style.setProperty('--main-color', mainColors);
    // Add Active Class From All ColorsList Items
    Array.from(document.querySelectorAll('.colors-list li')).forEach(function (element) {
        var liElement = element;
        liElement.classList.remove('active');
        if (liElement.dataset.color === mainColors) {
            liElement.classList.add('active');
        }
    });
}
/** Switch Background **/
var backgroundOption = true;
var backgroundInterval = null;
var randomBackL = document.querySelectorAll('.random span');
randomBackL.forEach(function (span) {
    span.addEventListener('click', function (e) {
        var target = e.target;
        var parent = target.parentElement;
        parent === null || parent === void 0 ? void 0 : parent.querySelectorAll('.active').forEach(function (element) {
            var el = element; // تحويل العنصر إلى HTMLElement
            el.classList.remove('active');
        });
        target.classList.add('active');
        if (target.dataset.background === 'yes') {
            backgroundOption = true;
            randomizeImg();
        }
        else {
            backgroundOption = false;
            if (backgroundInterval)
                clearInterval(backgroundInterval);
        }
    });
});
var landingPage = document.querySelector('.landing-page');
var imgArray = ['ppp.avif', '01.jpg', '02.jpg', '03.jpg', '05.jpg'];
function randomizeImg() {
    if (backgroundOption) {
        backgroundInterval = setInterval(function () {
            var randomNumber = Math.floor(Math.random() * imgArray.length);
            landingPage.style.backgroundImage = "url(\"images/".concat(imgArray[randomNumber], "\")");
        }, 1000);
    }
}
randomizeImg();
/** Skills Setting **/
var ourSkills = document.querySelector('.skills');
window.onscroll = function () {
    var skillsOffsetTop = ourSkills.offsetTop;
    var skillsOuterHeight = ourSkills.offsetHeight;
    var windowHeight = window.innerHeight;
    var windowScrollTop = window.pageYOffset;
    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight - 100)) {
        var allSkills = document.querySelectorAll('.skill-box .skill-progress span');
        allSkills.forEach(function (skill) {
            // Ensure the element is an HTMLElement
            if (skill instanceof HTMLElement) {
                skill.style.width = skill.dataset.progress || '';
            }
        });
    }
};
/** Create Popup With The Image **/
var ourGallery = document.querySelectorAll('.gallery img');
ourGallery.forEach(function (img) {
    img.addEventListener('click', function (e) {
        var imgElement = img; // Convert the element to HTMLImageElement
        var overLay = document.createElement('div');
        overLay.className = 'popup-overlay';
        document.body.appendChild(overLay);
        var popupBox = document.createElement('div');
        popupBox.className = 'popup-box';
        if (imgElement.alt !== null) {
            var imgHeading = document.createElement('h3');
            imgHeading.textContent = imgElement.alt;
            popupBox.appendChild(imgHeading);
        }
        var popupImage = document.createElement('img');
        popupImage.src = imgElement.src;
        popupBox.appendChild(popupImage);
        var popupClose = document.createElement('span');
        popupClose.textContent = 'X';
        popupClose.className = 'close-button';
        popupBox.appendChild(popupClose);
        document.body.appendChild(popupBox);
    });
});
document.addEventListener('click', function (e) {
    var _a, _b;
    if (e.target.className === 'close-button') {
        (_a = e.target.parentElement) === null || _a === void 0 ? void 0 : _a.remove();
        (_b = document.querySelector('.popup-overlay')) === null || _b === void 0 ? void 0 : _b.remove();
    }
});
/** Nav Bullets **/
var allBullets = document.querySelectorAll('.nav-bullets .bullet');
var allLinks = document.querySelectorAll('.links a');
function scrollToSomeWhere(elements) {
    elements.forEach(function (el) {
        var element = el; // تحويل العنصر إلى HTMLElement
        element.addEventListener('click', function (e) {
            var _a;
            e.preventDefault();
            var section = e.target.dataset.section;
            (_a = document.querySelector(section || '')) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: 'smooth' });
        });
    });
}
scrollToSomeWhere(allBullets);
scrollToSomeWhere(allLinks);
/** Bullets Show Or Not Section **/
var bulletsSpan = document.querySelectorAll('.bullets-option span');
var bulletsContainer = document.querySelector('.nav-bullets');
var bulletLocalItems = localStorage.getItem('bullet-option');
if (bulletLocalItems !== null) {
    bulletsSpan.forEach(function (span) {
        span.classList.remove('active');
    });
    if (bulletLocalItems === 'block') {
        bulletsContainer.style.display = 'block';
        (_a = document.querySelector('.bullets-option .yes')) === null || _a === void 0 ? void 0 : _a.classList.add('active');
    }
    else {
        bulletsContainer.style.display = 'none';
        (_b = document.querySelector('.bullets-option .no')) === null || _b === void 0 ? void 0 : _b.classList.add('active');
    }
}
bulletsSpan.forEach(function (span) {
    span.addEventListener('click', function (e) {
        var displayOption = span.dataset.display;
        if (displayOption === 'show') {
            bulletsContainer.style.display = 'block';
            localStorage.setItem('bullet-option', 'block');
        }
        else {
            bulletsContainer.style.display = 'none';
            localStorage.setItem('bullet-option', 'none');
        }
        handleActive(e);
    });
});
/** Reset Button **/
var resetButton = document.querySelector('.reset-options');
if (resetButton) {
    resetButton.onclick = function () {
        localStorage.removeItem('background-option');
        localStorage.removeItem('color-property');
        localStorage.removeItem('bullets-option');
        window.location.reload();
    };
}
/** Toggle Menu **/
var toggleButton = document.querySelector('.toggle-menu');
var tLink = document.querySelector('.links');
toggleButton.onclick = function (e) {
    e.stopPropagation();
    toggleButton.classList.toggle('menu-active');
    tLink.classList.toggle('open');
};
document.addEventListener('click', function (e) {
    if (e.target !== toggleButton && e.target !== tLink) {
        if (tLink.classList.contains('open')) {
            toggleButton.classList.toggle('menu-active');
            tLink.classList.toggle('open');
        }
    }
});
function handleActive(ev) {
    var _a;
    var target = ev.target;
    (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.querySelectorAll('.active').forEach(function (element) {
        var el = element; // تحويل العنصر إلى HTMLElement
        el.classList.remove('active'); // يمكنك الآن استخدام classList
    });
    target.classList.add('active');
}
;
