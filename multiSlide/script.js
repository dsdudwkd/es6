
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

    const speed = 500;

    let enableClick = true;

    init(slider1, slider2)
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
            onNextSlide(slider1);
            onNextSlide(slider2);
            enableClick = false;
        }

    })

    prev.addEventListener('click', function () {
        if(enableClick){
            onPrevSlide(slider1);
            onPrevSlide(slider2);
            enableClick = false;
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
}