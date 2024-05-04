const logoutBtn = document.getElementById('logout-btn')


const handleLogout = (e) => {
  e.preventDefault()
  console.log("logout called")
  fetch('/auth/logout', {
    method: 'GET',
  })
    .then(res => {
      console.log(res.ok)
      if (res.ok) {
        localStorage.clear()
        return window.location.href = '/auth/login'
      } else {
        return alert('logout failed')
      }
    })
}


logoutBtn.addEventListener('click', handleLogout)