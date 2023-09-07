
window.onload = () => {
    const panel = document.querySelector('.panel');
    const btns = document.querySelector('.navi');

    const slider = document.querySelector('#slider'); //전체 화면의 크기를 위해 받아오기
    const panelItem = panel.querySelectorAll('li');
    const btnsItem = btns.querySelectorAll('li');
    const circle = document.querySelector('#circle');

    const btnsArr = Array.from(btnsItem);
    console.log(btnsArr);

    let enableClick = true;
    let slideSpeed = 500;
    let timer;

    btnsItem.forEach((item) => {
        console.log(item);
        item.addEventListener('click', (e) => {
            // console.log(item);
            // btnsItem.forEach((btnsItem) => {
            //     btnsItem.classList.remove('on');
            // })
            // item.classList.add('on');

            //indexOf는 특정 문자의 위치를 찾아주는 요소
            //indexOf는 일반적인 node에서 인덱스를 찾지 못하고 배열에서 찾는다
            let activeIndex = btnsArr.indexOf(item);
            //getComputedStyle(): 선택자에 있는 모든 css 속성 값을 반환
            let panelWidth = parseInt(getComputedStyle(slider).width); //panel의 width값 받아오기
            console.log(panelWidth);
            //panel은 9600이므로 맞지 않음, 화면의 크기가 나와야함 => panelItem은 배열이라 index를 뭘 받아오는지 모르므로 적절하지 않음
            // => slider로 panel 전체를 감싸고 있는 slider를 변수로 받아와 width값 받아오기

            console.log(activeIndex);

            if (enableClick) {
                activeSlide(activeIndex, btnsItem);
                activeSlide(activeIndex, panelItem);

                slideAnimation(panel, {
                    prop: 'left',
                    val: -panelWidth * activeIndex,
                    duration : slideSpeed
                })
            }
            item.enableClick = false;

            circle.className = '';
            circle.classList.add(`rot${activeIndex+1}`);
        })
    })

    function activeSlide(itemNum, item) {
        for (let el of item) {
            el.className = ''; //해당 객체의 모든 클래스를 없앰
            // el.classList.remove('on'); //해당 객체에 있는 특정 클래스명을 삭제
        }
        item[itemNum].classList.add('on');
    }

    function slideAnimation(el, opt) {
        let startActive = performance.now();
        //performance.now()  애니메이션이 실행되는데 걸리는 시간을 모니터링
        // console.log(startActive);
        let currentVal; //현재 애니메이션이 적용되는 객체의 속성을 전달할 변수
        let sel = this;
        // console.log(sel);

        if (opt.prop === 'opacity') {
            currentVal = parseFloat(getComputedStyle(el)[opt.prop])
            console.log(currentVal)
        } else {
            currentVal = parseInt(getComputedStyle(el)[opt.prop]);
            console.log(currentVal);
        }

        if (currentVal !== opt.val) {
            //css로 애니메이션을 처리가 아닌 스크립트로 애니메이션을 처리할 때 사용하는 함수
            //setInterval()로도 대체가 가능하지만 프레임을 처리하는 속도가 다르다 
            //초 당 처리하는 프레임이 setInterval()보다 많아 자연스럽게 애니메이션을 처리 
            // 1000ms / 60frames
            requestAnimationFrame(slide)
        }

        function slide(time) {
            let lastTime = time - startActive;
            let currentTime = lastTime / opt.duration;

            if (currentTime < 0) {
                currentTime = 0;
            }
            if (currentTime > 1) {
                currentTime = 1;
            }

            if (currentTime < 1) {
                timer = requestAnimationFrame(slide);
            } else {
                //cancelAnimationFrame(): 진행 중인 requestAnimationFrame을 중지
                cancelAnimationFrame(timer);

                enableClick = true;
            }
            /* 
            애니메이션이 시작되고 경과되는 시간을 0과 1로 출력
            */
            let result = currentVal + (opt.val - currentVal) * currentTime;
            console.log(result);
            if (opt.prop === 'opacity') {
                el.style[opt.prop] = result;
            } else {
                el.style[opt.prop] = result + 'px';
            }
        }
    }
}
