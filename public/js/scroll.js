const targets = document.querySelectorAll('.target')

const options = {
    threshold:0.3
}

const callback = (entries)=> {
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.classList.add('active')
        }
        else{
            entry.target.classList.remove('active')
        }
    })
}


const observer = new IntersectionObserver(callback,options)

targets.forEach((target)=>{
    observer.observe(target)
})