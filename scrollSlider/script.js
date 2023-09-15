window.onload = () => {

    let wScrollTop = window.pageYOffset; //현재 창의 스크롤 위치(스크롤이 얼마쯤 되었을 때 가로 스크롤을 적용시킬 지)
    let winH = window.innerHeight; //브라우저 창의 높이, 반응형에서도 사용
    let winW = window.innerWidth; //브라우저 창의 너비

    const itemClass = 'slider';
    const itemActive = `${itemClass}-active`;
    const itemEnd = `${itemClass}-end`;

    const sliderSection = document.querySelectorAll('.horizontal-scroll');

    //슬라이더 속성 전부 다 거쳐야 하므로 forEach구문
    sliderSection.forEach((el) => {

        /* 
        1. 현재 sliderSection이 가지고 있는 위치값을 알아야 함(slider-active)
        2. sliderSection이 가지고 있는 가로 컨텐츠의 길이를 받아와야 한다(slider-end)
        */
        setActive(el);
        setScroll(el); //초기 sliderSection의 길이 값 설정 함수이므로 처음에만 매개값 필요하고 나중엔 x

    });

    window.addEventListener('scroll', () => {
        wScrollTop = window.pageYOffset;
        sliderSection.forEach((el) => {
            setActive(el);
            activeScroll(el);
        })
    })

    function setActive(el) {
        // console.log(el);
        //getBoundingClientRect(): 요소의 페이지 위치를 알아내기
        const bounding = el.getBoundingClientRect();
        // console.log(bounding);

        el.querySelectorAll(`.${itemClass}`).forEach((itemClass) => {
            //특정 요소에 있는 특정 클래스명 제거
            itemClass.classList.remove(itemActive);
            itemClass.classList.remove(itemEnd);
        })

        //요소의 특정 값을 원할 때 .속성으로 찾으면 된다
        //console.log(bounding.bottom)
        if (bounding.bottom < 0) {
            el.querySelectorAll(`.${itemClass}`).forEach((itemClassEl) => {
                itemClassEl.classList.add(itemEnd);
            })
        } else {
            el.querySelectorAll(`.${itemClass}`).forEach((itemClassEl) => {
                if (bounding.top <= 0) {
                    itemClassEl.classList.add(itemActive);
                } else if (bounding.bottom <= winH) {
                    itemClassEl.classList.add(itemEnd);
                }
            })
        }
    }

    function setScroll(el) {
        const sectionClass = el.classList[0];
        // console.log(sectionClass); //horizontal-scroll

        const contentWrapper = el.querySelector(`.${sectionClass}-item`);
        el.contentWrapper = contentWrapper;
        el.contentWrapperDom = contentWrapper;

        const contentWrapperScrollW = contentWrapper.scrollWidth; //각각의 contentWrapper가 가지고 있는 가로 스크롤 사이즈
        // console.log(contentWrapperScrollW); //li: 764.53*6 = 4587 , 1920*4 = 7680
        el.contentWrapperScrollW = contentWrapperScrollW
        //전체 가로 스크롤 길이에서 현재 보여지고 있는 화면의 크기만큼 뺀 값
        el.rightMax = -(contentWrapperScrollW - winW);
        el.style.height = `${contentWrapperScrollW}px`; //position:fixed로 인해 사람은 스크롤하면 가로로 보여져 너비로 인식하지만 컴퓨터는 너비값을 높이로 인식하기 때문에 높이로 가져와야 한다
        // console.log(el.style.height); //4587px, 7680px
        // console.log(el.offsetHeight); //4587, 7680 

        el.innerHeight = el.offsetHeight; //요소의 높이에 offsetHeight값을 대입해서 컨텐츠의 전체 높이를 저장
        // console.log(el.innerHeight); //4587, 7612
        el.init = true; //초기화 여부를 boolean으로 변환
        el.transformX = '0'; //최초 위치 값
        el.classList.add(`${sectionClass}-init`); //클래스명 지정하기 위한
        // el.offsetTop;
        // console.log(el.offsetTop); //923, 6433 각각의 요소(item2, item4)의 위치의 top값

    }

    function activeScroll(el) {
        //최초 실행할 땐 현재 스크롤 위치값을 가져오는데 
        //scroll이벤트가 발생하면 새로 받아오는 wScrollTop 값에 el가 가지고 있는 offsetTop만큼 빼서 새로 스크롤 위치를 계산
        const scrollP = wScrollTop - el.offsetTop; 

        const scrollCenter = scrollP / (el.innerHeight - (winH - winW)); //세로 스크롤 범위에서 
        // console.log(scrollCenter);
        const transformP = scrollCenter * el.contentWrapperScrollW;
        let toTransform = -(transformP);
        console.log(el.contentWrapperScrollW)
        toTransform = Math.min(0, toTransform); //처음에 스크롤을 움직이지 않았다면 min을 적용해 0
        toTransform = Math.max(toTransform, el.rightMax); //스크롤을 움직였다면 max로 적용
        /* 
        toTransform의 값이 0보다 작은지
        toTransform의 값이 현재 움직이는 toTransform이 el.rightMax값보다 큰지를 판단
        0보다 작거나 el.rightMax보다 크면 영역을 벗어나지 못하도록 제어
        */


        el.transformX = toTransform;
        //console.log(toTransform)
        if (el.init == true) { //초기값이 true이면
            el.contentWrapper.style.transform = `translateX(${el.transformX}px)`;
        }

    }
}