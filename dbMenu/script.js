
window.onload = () => {
    const mainMenu = document.querySelectorAll('.gnb > li');
    const subMenu = document.querySelectorAll('.subMenu');
    const gnb = document.querySelector('.gnb');

    mainMenu.forEach((el)=>{
        el.addEventListener('mouseenter', onMenuEnter);
    })

    function onMenuEnter(){
        // console.log('event!')
        // subMenu.classList.add('on');
        subMenu.forEach((subMenu)=>{
            subMenu.classList.remove('on');
        })
        const subMenus = this.children[1];
        subMenus.classList.add('on');
    }
    
    gnb.addEventListener('mouseleave', onMenuLeave);

    function onMenuLeave(){
        subMenu.forEach((subMenu)=>{
            subMenu.classList.remove('on');
        })
       
    }
}