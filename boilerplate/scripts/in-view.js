cdn.require(['in-view']).then(() => {
  inView('[class*="animation-"]').on('enter', (el) => {
    el.classList.add('is-visible')
  })

  inView('[class*="animation-"]').on('exit', (el) => {
    el.classList.remove('is-visible')
  })
})
