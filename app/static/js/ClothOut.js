class ClothOut {
    constructor(outerwear, light_clothing, footwear, accessory) {
        // Компоненты, в которые будет выводится одежда
        this.outerwearNtml = document.getElementById(outerwear);
        this.light_clothingHtml = document.getElementById(light_clothing);
        this.footwearHtml = document.getElementById(footwear);
        this.accessory = document.getElementById(accessory);
    }

    iconPattern(imgUrl, bgClass = 'clothes-card-bg') {
        return `
            <div class="clothes-card-bg">
                <div class="one-clothes-component">
                    <img class="one-clothes-component-img" src="${imgUrl}" alt="">
                </div>
            </div>
        `;
    }

    getClothes() {
        let response = fetch(`/clothes/findSet?temperature=2precipitation=false&gender=1`);
        response.then((response) => {

            return response.json();
    
        }).then((data) => {
    
            console.log(data.data)
    
        }).catch((er) => {
            console.log(er, "error")
        })
    }
}

let clothOut = new ClothOut()
clothOut.getClothes()