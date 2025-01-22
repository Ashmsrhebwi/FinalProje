// Start Setting Box
const toggleSettingsIcon = document.querySelector(".toggle-settings .icon") as HTMLElement; 
const settingBox = document.querySelector('.setting-box') as HTMLElement; 

toggleSettingsIcon.onclick = function () { 
    toggleSettingsIcon.classList.toggle('fa-spin'); 
    settingBox.classList.toggle('open'); 
};
// End Setting Box

// Start Switch Color
const colorLi = document.querySelectorAll('.colors-list li'); 
colorLi.forEach(color => { 
    color.addEventListener('click', (e: Event) => { 
        const target = e.target as HTMLElement; 
        const color = target.dataset.color || ''; 
        document.documentElement.style.setProperty('--main-color', color); 
        localStorage.setItem('color-property', color); 
        handleActive(e); 
    });
});

let mainColors = localStorage.getItem('color-property'); 
if (mainColors !== null) { 
    document.documentElement.style.setProperty('--main-color', mainColors); 
    Array.from(document.querySelectorAll('.colors-list li')).forEach((element) => { 
        const liElement = element as HTMLElement; 
        liElement.classList.remove('active'); 
        if (liElement.dataset.color === mainColors) { 
            liElement.classList.add('active'); 
        }
    });
}
// End Switch Color

// Start Switch Background
let backgroundOption = true; 
let backgroundInterval: NodeJS.Timeout | null = null; 
const randomBackL = document.querySelectorAll('.random span'); 
randomBackL.forEach((span: Element) => { 
    span.addEventListener('click', (e: Event) => { 
        const target = e.target as HTMLElement; 
        const parent = target.parentElement as HTMLElement; 
        parent?.querySelectorAll('.active').forEach((element: Element) => { 
            const el = element as HTMLElement; 
            el.classList.remove('active');
        });
        target.classList.add('active'); 
        if (target.dataset.background === 'yes') { 
            backgroundOption = true; 
            randomizeImg(); 
        } else { 
            backgroundOption = false; 
            if (backgroundInterval) clearInterval(backgroundInterval); 
        }
    });
});

let landingPage = document.querySelector('.landing-page') as HTMLElement; 
let imgArray = ['ppp.avif', '01.jpg', '02.jpg', '03.jpg', '05.jpg']; 
function randomizeImg() { 
    if (backgroundOption) { 
        backgroundInterval = setInterval(() => { 
            const randomNumber = Math.floor(Math.random() * imgArray.length); 
            landingPage.style.backgroundImage = `url("images/${imgArray[randomNumber]}")`; 
        }, 1000);
    }
}

randomizeImg(); 
// End Switch Background


// Start Our Skills

let ourSkills = document.querySelector('.skills') as HTMLElement; 

window.onscroll = function () { 
    let skillsOffsetTop = ourSkills.offsetTop; 
    let skillsOuterHeight = ourSkills.offsetHeight; 
    let windowHeight = window.innerHeight; 
    let windowScrollTop = window.pageYOffset; 

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight - 100)) { 
        let allSkills = document.querySelectorAll('.skill-box .skill-progress span'); 

        allSkills.forEach(skill => { 
            if (skill instanceof HTMLElement) { 
                skill.style.width = skill.dataset.progress || ''; 
            }
        });
    }
};

// End Our Skills

// Start Popup With The Image

let ourGallery = document.querySelectorAll('.gallery img'); 

ourGallery.forEach(img => { 
    img.addEventListener('click', (e: Event) => { 
        const imgElement = img as HTMLImageElement; 
        let overLay = document.createElement('div'); 
        overLay.className = 'popup-overlay'; 
        document.body.appendChild(overLay); 
        let popupBox = document.createElement('div'); 
        popupBox.className = 'popup-box'; 
        if (imgElement.alt !== null) { 
            let imgHeading = document.createElement('h3'); 
            imgHeading.textContent = imgElement.alt; 
            popupBox.appendChild(imgHeading); 
        }

        let popupImage = document.createElement('img'); 
        popupImage.src = imgElement.src; 
        popupBox.appendChild(popupImage); 

        document.body.appendChild(popupBox); 

        let closeBtn = document.createElement('span'); 
        closeBtn.className = 'close-btn'; 

        closeBtn.textContent = 'X'; 
        popupBox.appendChild(closeBtn); 

        closeBtn.onclick = function () { 
            overLay.remove(); 
            popupBox.remove(); 
        };
    });
});

// End Popup With The Image

function handleActive(e: Event) {
    throw new Error("Function not implemented.");
}

