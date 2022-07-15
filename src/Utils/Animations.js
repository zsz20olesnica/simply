// CSSAnimationsLibrary

export const handleDownAnim = (OnAnimEnd) => {      
        const Container = document.getElementById('container')
        Container.classList.remove('animation_container_up')
        void Container.offsetWidth;
        Container.classList.add('animation_container_up_reversed')
        Container.addEventListener('animationend', () => {
            OnAnimEnd()
        })
} 


     