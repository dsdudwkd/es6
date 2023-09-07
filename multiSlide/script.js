
window.onload = () => {
    /* 
    1. 버튼 클릭 시 슬라이드 구현
    - 버튼을 클릭하면 두 개의 슬라이드 동시에 넘어가야 함
    - 슬라이드는 마지막 슬라이드가 되면 처음으로 돌아가는게 아니라 무한 루프 되는 슬라이드로 구현
    - 이전 버튼(<)을 눌렀을 때에는 마지막에 있던 슬라이드가 제일 처음으로 이동
    - 다음 버튼(>)을 눌렀을 때에는 처음에 있던 슬라이드가 제일 마지막으로 이동

    2. 자동 슬라이드 구현
    */

    const slider1 = document.querySelector('#slider');
    const slider2 = document.querySelector('#slider2');

    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');

    const speed = 500; //transition speed
    const intervalSpeed = 2000; //setInterval Speed
    
    let enableClick = true; //버튼을 클릭할 때 상태 값을 이용해서 중복 실행을 막아줌
    let timer; //자동 실행에 대입할 변수라 const가 아닌 let으로 설정
    let nextTimer; //버튼을 클릭해서 자동 슬라이드를

    //함수 실행
    init(slider1, slider2);
    autoSlide();

    function init(...items) {
        // console.log(items);
        items.forEach(el => {
            const itemSize = el.querySelectorAll('li').length; //각각 아이템의 갯수 구하기

            //ul 설정
            const ul = el.querySelector('ul'); //영역의 크기를 잡아줄 ul을 설정
            ul.style.width = `${100 * itemSize}%`;
            ul.style.height = '100%';
            ul.style.marginLeft = '-100%';

            //li 설정
            const list = el.querySelectorAll('li');
            list.forEach(el => {
                el.style.width = `${100 / itemSize}%`;
                el.style.height = '100%';
                el.style.float = 'left';
            })
            ul.insertBefore(list[itemSize - 1], ul.firstChild)
            //아이템의 갯수와 node의 순번은 서로 다르다
        })
    }

    next.addEventListener('click', function () {
        if (enableClick) {
            clearTimeout(nextTimer);
            stopSlide();
            onNextSlide(slider1);
            onNextSlide(slider2);
            enableClick = false;
            
            nextTimer = setTimeout(()=> {
                autoSlide()
            }, intervalSpeed);
            /* 
            autoSlide() 실행 시 버튼 이벤트가 실행되었을 때
            오토 슬라이드와 이벤트가 겹치는 것을 방지하기 위해 
            오토 슬라이드를 중지 시키는 작업이 필요

            setTimeout은 시작되면 자동으로 리셋되지 않으므로 이벤트가 중첩되는 현상이 자주 발생
            항상 이벤트 시작 전에 setTimeout을 리셋하는 clearTimeout을 우선 실행해서
            기존 timeOut을 초기화하고 새로 이벤트를 받아오게 해야 한다
            */
        }

    })

    function stopSlide(){
        clearInterval(timer);
    }

    prev.addEventListener('click', function () {
        if(enableClick){
            clearTimeout(nextTimer);
            stopSlide();
            onPrevSlide(slider1);
            onPrevSlide(slider2);
            enableClick = false;

            nextTimer = setTimeout(()=>{
                autoSlide();
            }, intervalSpeed);S
        }
        
    })

    function onNextSlide(el) {
        const ul = el.querySelector('ul');
        const listW = ul.querySelector('li').offsetWidth;
        // console.log(listW);

        ul.style.transition = `margin-left ${speed}ms`;
        ul.style.marginLeft = `-${listW * 2}px`;

        setTimeout(() => {
            ul.appendChild(ul.querySelector('li:first-child'));
            ul.style.marginLeft = `-${listW}px`;
            ul.style.transition = '';
            enableClick = true;
        }, speed)
    }

    function onPrevSlide(el) {
        const ul = el.querySelector('ul');
        const listW = ul.querySelector('li').offsetWidth;

        ul.style.transition = `margin-left ${speed}ms`;
        ul.style.marginLeft = '0px';


        setTimeout(() => {
            ul.prepend(ul.querySelector('li:last-child'));
            ul.style.marginLeft = `-${listW}px`;
            ul.style.transition = '';
            enableClick = true;
        }, speed)

    }

    function autoSlide(){
        timer = setInterval(()=>{
            onNextSlide(slider1);
            onNextSlide(slider2);
        },intervalSpeed)
    }
}