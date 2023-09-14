window.onload = () => {
    setDate();
    countDown("2023/09/14 13:47:59");
}

function setDate() {

    setInterval(() => {

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear(); //년도
        const currentMonth = currentDate.getMonth() + 1; //월(0부터 시작이라 1을 더해줘야 함)
        const currentDay = currentDate.getDate(); //일
        const currentWeek = currentDate.getDay(); //요일을 숫자로 반환(일요일이 0)
        const currentTime = currentDate.getTime(); //시간(ms기준으로 분해)
        const currentHour = currentDate.getHours(); //시, 24시간을 기준
        const currentMin = currentDate.getMinutes(); //분
        const currentSec = currentDate.getSeconds(); //초

        /* console.log(currentDate);
        console.log(currentYear);
        console.log(currentMonth);
        console.log(currentDay);
        console.log(currentWeek);
        console.log(currentTime);
        console.log(currentHour);
        console.log(currentMin);
        console.log(currentSec); */

        const newDate = new Date();
        const dateResult = `현재 시각은 
        ${currentYear}/
        ${String(currentMonth).padStart(2, '0')}/
        ${String(currentDay).padStart(2, '0')}/
        ${String(currentHour).padStart(2, '0')}/
        ${String(currentMin).padStart(2, '0')}/
        ${String(currentSec).padStart(2, '0')}/입니다`;

        document.querySelector('.date').textContent = dateResult;
    }, 1000)
}

function countDown(dday) {
    const countDate = new Date(dday).getTime(); //카운트다운을 받은 시간
    console.log(countDate);
    const second = 1000; //1초
    const min = second * 60; //1분
    const hour = min * 60; //1시간
    const day = hour * 24; //1일

    const timer = setInterval(() => {
        const nowTime = new Date().getTime(); //현재 시간
        const dis = countDate - nowTime;
        console.log(dis);

        let disD = Math.floor(dis / day);
        console.log(disD);
        let disH = Math.floor((dis % day) / hour);
        console.log(disH);
        let disM = Math.floor((dis % hour) / min);
        let disS = Math.floor((dis % min) / second);

        if (disD < 0) {
            disD = 0;
            disH = 0;
            disM = 0;
            disS = 0;
            clearInterval(timer);
        }

        document.querySelector('.day').textContent = disD;
        document.querySelector('.hour').textContent = disH;
        document.querySelector('.minute').textContent = disM;
        document.querySelector('.second').textContent = disS;
    }, 1000)
}