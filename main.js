const container = document.querySelector("#attention-container")

const TYPES = {
    info: "#0ff",
    error: "#f00",
    success: "0F0",
    warning: "#ff0"
}


class Notify {
    constructor(content, type) {
        this.lifeTime = 10000;
        this.content = content;
        this.type = type in TYPES ? type : "info";
        this.render();
    
    }


    createClose() {
        this.close = document.createElement("img");
        this.close.src = "./close.png";
        this.close.classList.add("close-icon");
        this.close.addEventListener("click", this.hideNotify.bind(this))
        
        return this.close;
    }

    lifeInterval () {
        
        this.interval = setInterval(() => {

            const currentWitdh = this.line.offsetWidth;  
            const percent = (this.width / 50);   
            if (currentWitdh - percent < 0) {
                this.hideNotify()
                return;
            }      
            this.line.style.width = `${currentWitdh - percent }px`; 
        },200)
    }

    hideNotify() {
        this.notify.classList.add("hide-right")
        setTimeout(() => {
            this.notify.remove()
        },300); //300ms потомучто анимация 3 сек
        
    }    

    createLine(){
        this.line = document.createElement("div");
        this.line.classList.add("line");
        
        return this.line;
    }

    pauseInterval() {
        clearInterval(this.interval);
    }
    
    continueInterval() {
        this.lifeInterval();
    }




    render() {
        this.notify = document.createElement("div");
        this.notify.classList.add("notify");
        this.notify.classList.add(this.type);
        this.notify.innerHTML = this.content;
        this.notify.classList.add("slide-right");
        this.notify.append(this.createClose());
        this.notify.append(this.createLine());
        container.append(this.notify);
        this.notify.addEventListener("mouseenter", this.pauseInterval.bind(this));
        this.notify.addEventListener('mouseleave', this.continueInterval.bind(this));
        this.width = this.line.offsetWidth;
        this.lifeInterval();


    }
}


new Notify("test &#x1F649", "success")

setTimeout(() =>{
    new Notify("test2 &#x1F609 ", "info ")
    new Notify("test2 &#x2755", "warning")
    new Notify("test2 &#x1F64A", "error")
 },2000);

