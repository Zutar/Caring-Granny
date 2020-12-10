class ClothOut {
    constructor(outerwear, light_clothing, footwear, accessory) {
        // Компоненты, в которые будет выводится одежда
        this.outerwearNtml = document.getElementById(outerwear);
        this.light_clothingHtml = document.getElementById(light_clothing);
        this.footwearHtml = document.getElementById(footwear);
        this.accessory = document.getElementById(accessory);
    }

    iconPattern(imgUrl, bgClass = '') {
        return `
            <div class="${bgClass}">
                <div class="one-clothes-component">
                    <img class="one-clothes-component-img" src="http://${imgUrl}" alt="">
                </div>
            </div>
        `;
    }
// 1	"shirt"
// 2	"pants"
// 3	"dresses"
// 4	"sweater"
// 5	"outerwear"
// 6	"foots"
// 7	"other"
    outCards(typeClothes, url) {
        switch (typeClothes) {
            case 'shirt':
                this.light_clothingHtml.innerHTML += this.iconPattern(url);
                break;

            case 'pants':
                this.footwearHtml.innerHTML += this.iconPattern(url);
                break;

            case 'dresses':
                this.footwearHtml.innerHTML += this.iconPattern(url);
                break;

            case 'sweater':
                this.light_clothingHtml.innerHTML += this.iconPattern(url);
                break;

            case 'outerwear':
                this.outerwearNtml.innerHTML += this.iconPattern(url);
                break;

            case 'foots':
                this.footwearHtml.innerHTML += this.iconPattern(url);
                break;

            case 'other':
                this.accessory = document.getElementById(accessory);
                break;

            default:
                this.accessory = document.getElementById(accessory);
                break;
        }
    }

    getClothes(temp = 0, gender = 1, res = false) {
        let response = fetch(`/clothes/findSet?temperature=${temp}&precipitation=${res}&gender=${gender}`);
        response.then((response) => {

            return response.json();
    
        }).then((data) => {
            let clothes = data.data;

            // Не баг а фича
            if(clothes.length == 0) {
                this.getClothes(temp + 1, 3)
            }

            for(let i = 0; i < clothes.length; i++) {
                let cl = clothes[i];
                this.outCards(
                    cl.descr,
                    cl.img_url
                )
            }


            console.log(clothes)
        }).catch((er) => {
            console.log(er, "error")
        })
    }
}

// outerwear, light_clothing, footwear, accessory
// let clothOut = new ClothOut("block_3","block_1","block_2","block_4" )
// clothOut.getClothes()