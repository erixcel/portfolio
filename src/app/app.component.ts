import { afterNextRender, Component } from '@angular/core'
import { RouterOutlet } from '@angular/router';
import { Navigation, Pagination } from 'swiper/modules';
import Swiper from 'swiper'
import Typed from 'typed.js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html'
})
export class AppComponent {

  language: string = 'en'
  theme: string = ''

  constructor() {
    afterNextRender(() => {

      this.configProjects()
      this.configTestimonials()
      this.configNavScroll()
      this.configTypedText()
      this.configMenuBar()
    })
  }

  changeTheme(type:string){
    this.theme = type
    const bodyElement = document.body
    bodyElement.classList.remove('light-theme', 'dark-theme');
    if (type) bodyElement.classList.add(type)
  }

  configProjects(){
    window.addEventListener('load',()=>{
      let alltab = document.querySelectorAll('.tab')
      let allproject = document.querySelectorAll('.project')

      const removeActive = () => {
        alltab.forEach(tab=>{
          tab.classList.remove('tab-active')
        })
      }

      alltab.forEach(tab=>{
        tab.addEventListener('click',(event)=>{
          removeActive()
          tab.classList.add('tab-active')
          let filterName = ((event.target) as Element).getAttribute('data-name')
          allproject.forEach(project => {
            let projectName = project.getAttribute('data-name')
            if((projectName === filterName) || filterName === 'All'){
              (project as HTMLElement).style.display= 'flex'
            } else {
              (project as HTMLElement).style.display= 'none'
            }
          })
        })
      })
    })
  }

  configTestimonials(){
    let swiper = new Swiper('.swiper-testimonial',{
      modules: [Navigation, Pagination],
      slidesPerView: 3,
      loop: true,
      spaceBetween: 20,
      breakpoints:{
        0: {
          slidesPerView: 1,
        },
        600: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 20,
        }
      },
      pagination:{
        el: '.swiper-pagination',
        clickable: true
      }
    })
  }

  configNavScroll(){
    window.addEventListener('scroll', ()=>{
      let nav = document.querySelector('nav')
      nav?.classList.toggle('nav-scroll', window.scrollY>0)
    })
  }

  configTypedText(){
    let typed = new Typed('.typed-text',{
      strings:['Web Developer','Apps Developer'],
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 1000,
      loop: true
    })
  }

  configMenuBar(){
    let menuBar = document.querySelector('.menu-bar')
    let menuButton = document.querySelector('.menu-button')
    menuButton?.addEventListener('click',()=>{
      menuBar?.classList.toggle('menu-none')
    })
  }
}
