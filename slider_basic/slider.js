

class Slider {
    constructor(el, opt) {
        this.init(el, opt); //class에서의 this는 생성자에서 그때그때 새롭게 생성되는 객체
        this.bindingEvent();
    }

    init(el, opt) {
        let elOpt = {
            panel: this.panel, //인스턴스에서 설정할 panel
            btns: this.btns,
            slideSpeed: this.slideSpeed
        }
        //assign(): 선택자 객체에서 나열이 가능한 속성으로 복사해서 객체로 변환
        this.opt = Object.assign({}, elOpt, opt);
        this.frame = document.querySelector(el);
        this.panel = this.frame.querySelector(this.opt.panel);
        this.panelItem = this.panel.querySelectorAll('li');

        this.btns = this.frame.querySelector(this.opt.btns);
        this.btnsItem = this.btns.querySelectorAll('li');

        this.btnsArr = Array.from(this.btnsItem);
        this.slideSpeed = this.opt.slideSpeed;
        this.enableClick = true;
        this.timer;
    }

    bindingEvent() {
        this.btnsItem.forEach((item) => {
            item.addEventListener('click', (e) => {
                //contains(): 문자열을 찾아주는 메서드
                let isOn = item.classList.contains('on');
                let activeIndex = this.btnsArr.indexOf(item);
                let panelWidth = parseInt(getComputedStyle(this.frame).width);

                if (isOn) {
                    return;
                }
                if (this.enableClick) {
                    /* this.animate(this.panel,{
                        prop : 'left',
                        val : -panelWidth * activeIndex,
                        duration : this.slideSpeed
                    }) */
                    this.activeSlide(activeIndex, this.btnsItem);
                    this.activeSlide(activeIndex, this.panelItem);

                    // this.enableClick = false;


                }
            })
        })
    }
    activeSlide(itemNum, item) {
        for (let el of item) {
            el.className = '';
        }
        item[itemNum].classList.add('on');
    }
}
