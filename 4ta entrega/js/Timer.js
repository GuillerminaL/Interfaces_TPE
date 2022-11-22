class Timer {

    defaultTime = 5;

    constructor(root) {
        this.el = root;
    
        this.el = {
            minutes: root.querySelector(".timer__part--minutes"),
            seconds: root.querySelector(".timer__part--seconds"),
            control: root.querySelector(".timer__btn--control"),
            reset: root.querySelector(".timer__btn--reset")
        };
  
        this.interval = null;
        this.remainingSeconds = this.defaultTime*60;   //seteado en 5 minutos
        this.setEvents();
    }

    setEvents() {
        this.el.control.addEventListener("click", () => {
            if (this.interval === null) this.start();
            else this.stop();
        });
  
        this.el.reset.addEventListener("click", () => {
            this.showTimerResetInput();
        });
    }

    showTimerResetInput() {
        let input = `<div class="time-input-box">
                        <div>
                            <label for="input">Minutos a jugar: </label>
                            <input id="minutes-input" type="number" name="minutes" min=1 max =60 value="">
                        </div>
                        <div>
                            <button type="button" id="done-btn"><span class="material-icons">done_alt</span></button>
                            <button type="button" id="input-close-btn"><span class="material-icons">close_alt</span></button>
                        </div>
                    </div>`;
        MSG_BOX.innerHTML = input;
        this.setInputBtnsEvents();
    }

    setInputBtnsEvents() {
        let doneBtn = document.querySelector("#done-btn");
        doneBtn.addEventListener("click", () => {
            let input = document.querySelector("#minutes-input");
            let inputMinutes = input.value;
            if(inputMinutes > 0 && inputMinutes < 60) {
                this.stop();
                this.remainingSeconds = inputMinutes * 60;
                this.updateInterfaceTime();
                MSG_BOX.innerHTML = "Presiona el botón de inicio para activar el contador";
                setTimeout(() => { showTurn(); }, 3000);
            } else {
                input.style.border = "2px solid red";
                setTimeout(() => {input.style.border = "unset"; return;}, 100);
            }
        });

        let closeBtn = document.querySelector("#input-close-btn");
        closeBtn.addEventListener("click", () => {
            showTurn();
        });
    }

    updateInterfaceTime() {
        const minutes = Math.floor(this.remainingSeconds / 60);
        const seconds = this.remainingSeconds % 60;
    
        this.el.minutes.textContent = minutes.toString().padStart(2, "0");
        this.el.seconds.textContent = seconds.toString().padStart(2, "0");
    }
  
    updateInterfaceControls() {
        if (this.interval === null) {
            this.el.control.innerHTML = `<span class="material-icons">play_arrow</span>`;
            this.el.control.classList.add("timer__btn--start");
            this.el.control.classList.remove("timer__btn--stop");
        } else {
            this.el.control.innerHTML = `<span class="material-icons">pause</span>`;
            this.el.control.classList.add("timer__btn--stop");
            this.el.control.classList.remove("timer__btn--start");
        }
    }
  
    start() {
        if (this.remainingSeconds === 0) return;
    
        this.interval = setInterval(() => {
            this.remainingSeconds--;
            this.updateInterfaceTime();
    
            if (this.remainingSeconds === 0) {
                this.stop();
                timeOver();
            }
        }, 1000);
    
        this.updateInterfaceControls();
    }
  
    stop() {
        clearInterval(this.interval);
        this.interval = null;
        this.updateInterfaceControls();
    }
  
}